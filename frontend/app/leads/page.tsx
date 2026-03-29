"use client";
import React, { useState, useEffect, useCallback } from "react";
import CRMInventorySidebar from "@/components/crm/CRMInventorySidebar";
import Modal from "@/components/crm/Modal";
import LeadForm from "@/components/crm/LeadForm";
import { api } from "@/lib/api";
import {
  Search, Plus, RefreshCw, ChevronLeft, ChevronRight,
  Phone, Mail, Trash2, Pencil, Download, Settings, MoreHorizontal,
  Filter, Smartphone, User, ArrowUpDown, LayoutGrid, List, ChevronDown,
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

const tabs = ["All Leads", "Filtration Purpose", "Filtration", "Lead Assignment to BDE's", "Bangalore Leads", "Follow-Up Leads", "DNP - Leads_Custom"];

const SAVED_FILTERS = [
  { name: "FollowUp Transfer", count: 17 },
  { name: "Walkin", count: 0 },
  { name: "Walkin Codegnan", count: 0 },
  { name: "Admin Layout", count: 0 },
  { name: "Followup Removal", count: 75 },
  { name: "Counsellor", count: 1525 }
];

const SYSTEM_FILTERS = ["Activities", "Best Time to Contact", "Cadences", "Campaigns", "Email Sentiment", "Latest Email Status", "Locked", "Record Action", "Related Records Action", "Scoring Rules"];

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
        {/* Top Professional Header */}
        <div className="h-14 border-b border-slate-200 flex items-center justify-between px-6 shrink-0 bg-white z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Leads</h1>
            <div className="relative group ml-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={14} />
              <input
                type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search leads..."
                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs w-64 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-blue-600 rounded-md shadow-sm">
               <button onClick={() => setModal({ open: true })}
                 className="flex items-center gap-2 text-white px-4 py-1.5 text-xs font-bold hover:bg-blue-700 transition-all border-r border-blue-500/50">
                 Create Lead
               </button>
               <button className="px-2 py-1.5 text-white hover:bg-blue-700 transition-all rounded-r-md">
                 <ChevronDown size={14} />
               </button>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all border border-slate-200">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* View Tabs Bar */}
        <div className="h-10 border-b border-slate-100 flex items-center justify-between px-6 bg-white shrink-0">
          <div className="flex items-center gap-5 text-[11px] font-bold text-slate-500">
            {tabs.map(t => (
              <button key={t} onClick={() => { setActiveTab(t); setPage(1); }}
                className={`h-10 flex items-center transition-colors relative ${activeTab === t ? "text-blue-600" : "hover:text-slate-800"}`}>
                {t}
                {activeTab === t && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
              </button>
            ))}
            <button className="text-slate-400 hover:text-slate-800"><MoreHorizontal size={14} /></button>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
             <button className="p-1 hover:text-blue-600"><LayoutGrid size={14} /></button>
             <button className="p-1 hover:text-blue-600 text-blue-600"><List size={14} /></button>
             <div className="w-px h-3 bg-slate-200" />
             <button className="p-1 hover:text-blue-600"><Download size={14} /></button>
          </div>
        </div>

        {/* Main Workspace: Filters + Table */}
        <div className="flex-1 flex overflow-hidden bg-[#f4f7f9]">
           
           {/* Left Filters Sidebar */}
           <div className="w-64 bg-white border-r border-slate-200 overflow-y-auto shrink-0 flex flex-col p-4 space-y-6">
              <div className="space-y-4">
                 <div className="flex items-center justify-between text-slate-400">
                    <div className="flex items-center gap-2"><Filter size={14}/><span className="text-[11px] font-black uppercase tracking-widest text-slate-700">Filter</span></div>
                    <ArrowUpDown size={14} className="cursor-pointer hover:text-blue-600"/>
                 </div>
                 
                 <div className="space-y-4">
                    <div>
                       <p className="flex items-center justify-between text-[11px] font-bold text-slate-800 mb-2 cursor-pointer group">
                          <span>SAVED FILTERS</span>
                          <span className="text-[10px] bg-slate-100 px-1 rounded text-slate-400">9</span>
                       </p>
                       <div className="space-y-1">
                          {SAVED_FILTERS.map(f => (
                             <div key={f.name} className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-slate-50 cursor-pointer group">
                                <span className="text-xs text-slate-600 group-hover:text-blue-600">{f.name}</span>
                                <span className="text-[10px] text-slate-400">{f.count > 0 ? f.count : ""}</span>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="relative group">
                       <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-300" size={12} />
                       <input type="text" placeholder="Filter Leads by" className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:border-blue-400"/>
                    </div>

                    <div>
                       <p className="text-[11px] font-bold text-slate-800 mb-2">SYSTEM DEFINED FILTERS</p>
                       <div className="space-y-1">
                          {SYSTEM_FILTERS.map(f => (
                             <div key={f} className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-slate-50 cursor-pointer group">
                                <input type="checkbox" className="rounded border-slate-300 pointer-events-none" />
                                <span className="text-xs text-slate-600 group-hover:text-blue-600">{f}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Table Right Area */}
           <div className="flex-1 flex flex-col overflow-hidden bg-white mt-4 ml-4 rounded-tl-xl border-t border-l border-slate-200 shadow-sm">
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse table-fixed min-w-[1200px]">
                  <thead className="sticky top-0 z-10 bg-[#f8fafc] border-b border-slate-200 shadow-sm">
                    <tr>
                      <th className="w-12 px-5 py-3"><input type="checkbox" className="rounded border-slate-300 h-4 w-4" checked={selectedLeads.length === data.length && data.length > 0} onChange={toggleSelectAll} /></th>
                      <th className="w-40 px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-100">Lead Owner</th>
                      <th className="w-40 px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-100">Walk-in Counsellor</th>
                      <th className="w-44 px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-100">Lead Name</th>
                      <th className="w-40 px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-100">Phone</th>
                      <th className="w-40 px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-100">Mobile</th>
                      <th className="w-36 px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lead Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[12.5px] font-medium">
                    {loading ? (
                      <tr><td colSpan={7} className="text-center py-24 text-slate-400"><RefreshCw className="animate-spin mx-auto mb-2" size={24}/>Loading Leads...</td></tr>
                    ) : data.length === 0 ? (
                      <tr><td colSpan={7} className="text-center py-20 text-slate-400">No matching records found.</td></tr>
                    ) : data.map((lead: any) => (
                      <tr key={lead.id} className="hover:bg-blue-50/30 transition-colors group cursor-pointer border-b border-slate-50">
                        <td className="px-5 py-3">
                           <div className="flex items-center gap-3">
                              <MoreHorizontal size={14} className="text-slate-300 opacity-0 group-hover:opacity-100" />
                              <input type="checkbox" className="rounded border-slate-300 h-4 w-4" checked={selectedLeads.includes(lead.id)} onChange={() => toggleSelectLead(lead.id)} />
                           </div>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{lead.assignedTo?.name || "Admin"}</td>
                        <td className="px-4 py-3 text-slate-500 italic">{lead.walkInCounsellor || "—"}</td>
                        <td className="px-4 py-3 font-bold text-blue-600 hover:underline" onClick={() => setModal({ open: true, lead })}>{lead.name}</td>
                        <td className="px-4 py-3">
                           <div className="flex items-center gap-2 group/call relative">
                              <span className="text-slate-700">{lead.phone}</span>
                              <div className="flex bg-green-500 text-white p-0.5 rounded-full opacity-0 group-hover/call:opacity-100 transition-opacity">
                                <Phone size={10} fill="currentColor" />
                              </div>
                           </div>
                        </td>
                        <td className="px-4 py-3">
                           <div className="flex items-center gap-2 group/mob relative">
                              <span className="text-slate-700">{lead.mobile || "—"}</span>
                              {lead.mobile && (
                                <div className="flex bg-emerald-500 text-white p-0.5 rounded-full opacity-0 group-hover/mob:opacity-100 transition-opacity">
                                  <Smartphone size={10} fill="currentColor" />
                                </div>
                              )}
                           </div>
                        </td>
                        <td className="px-4 py-3">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${STATUS_COLORS[lead.status] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                             {lead.status}
                           </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="h-10 border-t border-slate-200 bg-[#f8fafc] flex items-center justify-between px-6 shrink-0">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">Total Records: {pagination.total}</span>
                <div className="flex items-center gap-4 text-[11px] font-black text-slate-600">
                  <div className="flex items-center gap-1 border border-slate-200 bg-white rounded px-2 py-0.5">
                    <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                      <ChevronLeft size={16} className={page === 1 ? "text-slate-300 cursor-not-allowed" : "hover:text-blue-600 cursor-pointer"} />
                    </button>
                    <div className="w-px h-3 bg-slate-200 mx-1" />
                    <button disabled={page >= pagination.totalPages} onClick={() => setPage(p => p + 1)}>
                      <ChevronRight size={16} className={page >= pagination.totalPages ? "text-slate-300 cursor-not-allowed" : "hover:text-blue-600 cursor-pointer"} />
                    </button>
                  </div>
                  <span>1 to 50 <ChevronDown size={12}/></span>
                </div>
              </div>
           </div>
        </div>
      </div>

      <Modal open={modal.open} onClose={() => setModal({ open: false })} title={modal.lead?.id ? "Edit Lead" : "Create New Lead"}>
        <LeadForm initial={modal.lead} onSave={handleSaveLead} onCancel={() => setModal({ open: false })} />
      </Modal>
    </div>
  );
}
