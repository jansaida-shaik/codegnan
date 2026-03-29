"use client";
import React, { useState, useEffect, useCallback } from "react";
import CRMInventorySidebar from "@/components/crm/CRMInventorySidebar";
import Modal from "@/components/crm/Modal";
import LeadForm from "@/components/crm/LeadForm";
import { api } from "@/lib/api";
import {
  Search, Plus, RefreshCw, ChevronLeft, ChevronRight,
  Phone, Mail, Trash2, Pencil, Download, Settings, MoreHorizontal,
} from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  "Branch Visit": "bg-blue-100 text-blue-700 border-blue-200",
  "Follow-Up": "bg-amber-100 text-amber-700 border-amber-200",
  "Follow-up": "bg-amber-100 text-amber-700 border-amber-200",
  "New": "bg-green-100 text-green-700 border-green-200",
  "DNP": "bg-red-100 text-red-700 border-red-200",
  "Interested": "bg-purple-100 text-purple-700 border-purple-200",
  "Converted": "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const SOURCE_COLORS: Record<string, string> = {
  "Direct Call": "bg-amber-100 text-amber-700 border-amber-200",
  "Just Dial": "bg-blue-100 text-blue-700 border-blue-200",
  "Website": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Referral": "bg-purple-100 text-purple-700 border-purple-200",
};

const tabs = ["All Leads", "Today's Leads", "Follow-Up", "New", "Converted"];

export default function LeadsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1, limit: 50 });
  const [activeTab, setActiveTab] = useState("All Leads");
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [modal, setModal] = useState<{ open: boolean; lead?: any }>({ open: false });

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { page: String(page), limit: "50" };
      if (debouncedSearch) params.search = debouncedSearch;
      if (activeTab === "Follow-Up") params.status = "Follow-Up";
      else if (activeTab === "New") params.status = "New";
      else if (activeTab === "Converted") params.status = "Converted";
      const result = await api.getLeads(params);
      setData(result.data || []);
      setPagination(result.pagination || { total: 0, totalPages: 1, limit: 50 });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, activeTab]);

  useEffect(() => { loadLeads(); }, [loadLeads]);

  const toggleSelectAll = () =>
    setSelectedLeads(selectedLeads.length === data.length && data.length > 0 ? [] : data.map((l: any) => l.id));

  const toggleSelectLead = (id: string) =>
    setSelectedLeads(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const handleSaveLead = async (formData: any) => {
    if (modal.lead?.id) {
      await api.updateLead(modal.lead.id, formData);
    } else {
      await api.createLead(formData);
    }
    setModal({ open: false });
    loadLeads();
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Delete this lead?\n\nYou can't undo this.")) return;
    try {
      await api.deleteLead(id);
      loadLeads();
    } catch { alert("Failed to delete lead."); }
  };

  const handleConvertLead = async (id: string) => {
    if (!confirm("Convert this lead to a Contact?\n\nOnce converted, the lead record will be removed. You can't undo this.")) return;
    try {
      await api.convertLead(id);
      loadLeads();
    } catch { alert("Failed to convert lead."); }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans">
      <CRMInventorySidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <div className="h-14 border-b border-slate-200 flex items-center justify-between px-6 shrink-0 bg-white z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Leads</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setModal({ open: true })}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm">
              <Plus size={16} strokeWidth={3} />
              <span>New Lead</span>
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="h-10 border-b border-slate-200 flex items-center justify-between px-6 bg-slate-50 shrink-0">
          <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-slate-500">
            {tabs.map(t => (
              <button key={t} onClick={() => { setActiveTab(t); setPage(1); }}
                className={`h-10 flex items-center transition-colors ${activeTab === t ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-slate-800"}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={loadLeads} className="text-slate-400 hover:text-blue-600 transition-colors" title="Refresh">
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
            <div className="h-4 w-px bg-slate-300" />
            <button className="text-slate-400 hover:text-slate-600 transition-colors"><Download size={14} /></button>
            <button className="text-slate-400 hover:text-slate-600 transition-colors"><Settings size={14} /></button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full text-left border-collapse table-fixed min-w-[1000px]">
            <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 shadow-sm">
              <tr>
                <th className="w-12 px-6 py-3">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 h-4 w-4 cursor-pointer"
                    checked={selectedLeads.length === data.length && data.length > 0} onChange={toggleSelectAll} />
                </th>
                <th className="w-44 px-4 py-3 text-[11px] font-black text-slate-500 uppercase tracking-wider">Lead Name</th>
                <th className="w-48 px-4 py-3 text-[11px] font-black text-slate-500 uppercase tracking-wider">Email</th>
                <th className="w-40 px-4 py-3 text-[11px] font-black text-slate-500 uppercase tracking-wider">Phone</th>
                <th className="w-36 px-4 py-3 text-[11px] font-black text-slate-500 uppercase tracking-wider">Lead Status</th>
                <th className="w-32 px-4 py-3 text-[11px] font-black text-slate-500 uppercase tracking-wider">Lead Source</th>
                <th className="w-36 px-4 py-3 text-[11px] font-black text-slate-500 uppercase tracking-wider text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13px]">
              {loading ? (
                <tr><td colSpan={7} className="text-center py-12">
                  <RefreshCw className="animate-spin text-slate-300 mx-auto" size={28} />
                </td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-slate-400 font-medium">No leads found.</td></tr>
              ) : data.map((lead: any) => (
                <tr key={lead.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 h-4 w-4"
                      checked={selectedLeads.includes(lead.id)} onChange={() => toggleSelectLead(lead.id)} />
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => setModal({ open: true, lead })}
                      className="font-bold text-blue-600 hover:underline text-left truncate w-full">{lead.name}</button>
                  </td>
                  <td className="px-4 py-4 text-slate-500 truncate">
                    <div className="flex items-center gap-1.5">
                      <Mail size={11} className="text-slate-300 shrink-0" />
                      {lead.email || "—"}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Phone size={11} className="text-slate-300 shrink-0" />
                      {lead.phone}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${STATUS_COLORS[lead.status] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${SOURCE_COLORS[lead.source] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-4 py-4 pr-6">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setModal({ open: true, lead })} title="Edit"
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => handleConvertLead(lead.id)} title="Convert to Contact"
                        className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors rounded text-[10px] font-bold border border-emerald-200">
                        Convert
                      </button>
                      <button onClick={() => handleDeleteLead(lead.id)} title="Delete"
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="h-12 border-t border-slate-200 bg-slate-50 flex items-center justify-between px-6 shrink-0">
          <span className="text-[11px] font-bold text-slate-500">
            {pagination.total} total leads
          </span>
          <div className="flex items-center gap-4 text-[11px] font-black text-slate-600">
            <span>{(page - 1) * pagination.limit + 1} – {Math.min(page * pagination.limit, pagination.total)}</span>
            <div className="flex items-center gap-1">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                <ChevronLeft size={16} className={page === 1 ? "text-slate-300 cursor-not-allowed" : "hover:text-blue-600 cursor-pointer"} />
              </button>
              <button disabled={page >= pagination.totalPages} onClick={() => setPage(p => p + 1)}>
                <ChevronRight size={16} className={page >= pagination.totalPages ? "text-slate-300 cursor-not-allowed" : "hover:text-blue-600 cursor-pointer"} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Modal */}
      <Modal
        open={modal.open}
        onClose={() => setModal({ open: false })}
        title={modal.lead?.id ? "Edit Lead" : "Create New Lead"}
      >
        <LeadForm
          initial={modal.lead}
          onSave={handleSaveLead}
          onCancel={() => setModal({ open: false })}
        />
      </Modal>
    </div>
  );
}
