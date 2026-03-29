"use client";
import React, { useState, useEffect } from "react";
import CRMInventorySidebar from "@/components/crm/CRMInventorySidebar";
import Modal from "@/components/crm/Modal";
import ContactForm from "@/components/crm/ContactForm";
import { api } from "@/lib/api";
import { Search, Plus, Phone, RefreshCw, Mail, Download, Settings, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

export default function ContactsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<{ open: boolean; contact?: any }>({ open: false });

  const loadContacts = async () => {
    setLoading(true);
    try {
      const result = await api.getContacts();
      setData(result || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadContacts(); }, []);

  const filtered = data.filter((c: any) =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search)
  );

  const handleSave = async (formData: any) => {
    if (modal.contact?.id) {
      await api.updateContact(modal.contact.id, formData);
    } else {
      await api.createContact(formData);
    }
    setModal({ open: false });
    loadContacts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this contact?\n\nYou can't undo this.")) return;
    try { await api.deleteContact(id); loadContacts(); }
    catch { alert("Failed to delete contact."); }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans">
      <CRMInventorySidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <div className="h-14 border-b border-slate-200 flex items-center justify-between px-6 shrink-0 bg-white z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Contacts</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setModal({ open: true })}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm">
              <Plus size={16} strokeWidth={3} />
              <span>New Contact</span>
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Action Bar */}
        <div className="h-10 border-b border-slate-200 flex items-center justify-between px-6 bg-slate-50 shrink-0">
          <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-slate-500">
            <span className="text-blue-600 border-b-2 border-blue-600 h-10 flex items-center">All Contacts</span>
            <span className="cursor-pointer hover:text-slate-800 transition-colors h-10 flex items-center">Recently Added</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={loadContacts} className="text-slate-400 hover:text-blue-600 transition-colors">
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
            <div className="h-4 w-px bg-slate-300" />
            <button className="text-slate-400 hover:text-slate-600 transition-colors"><Download size={14} /></button>
            <button className="text-slate-400 hover:text-slate-600 transition-colors"><Settings size={14} /></button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full text-left border-collapse table-fixed min-w-[900px]">
            <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 shadow-sm">
              <tr>
                <th className="w-12 px-6 py-3"><input type="checkbox" className="rounded border-slate-300 h-4 w-4" /></th>
                <th className="w-48 px-4 py-3 text-[11px] font-black text-slate-500 uppercase tracking-wider">Contact Name</th>
                <th className="w-52 px-4 py-3 text-[11px] font-black text-slate-500 uppercase tracking-wider">Email</th>
                <th className="w-44 px-4 py-3 text-[11px] font-black text-slate-500 uppercase tracking-wider">Phone</th>
                <th className="w-44 px-4 py-3 text-[11px] font-black text-slate-500 uppercase tracking-wider">Account</th>
                <th className="w-32 px-4 py-3 text-[11px] font-black text-slate-500 uppercase tracking-wider">Date Added</th>
                <th className="w-24 px-4 py-3 text-[11px] font-black text-slate-500 uppercase tracking-wider text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13px]">
              {loading ? (
                <tr><td colSpan={7} className="text-center py-12">
                  <RefreshCw className="animate-spin text-slate-300 mx-auto" size={28} />
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-slate-400 font-medium">
                  No contacts found. Convert a lead or create one!
                </td></tr>
              ) : filtered.map((contact: any) => (
                <tr key={contact.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                  <td className="px-6 py-4"><input type="checkbox" className="rounded border-slate-300 h-4 w-4" /></td>
                  <td className="px-4 py-4">
                    <button onClick={() => setModal({ open: true, contact })}
                      className="font-bold text-blue-600 hover:underline flex items-center gap-2 text-left">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] shrink-0 font-black">
                        {contact.name.charAt(0).toUpperCase()}
                      </span>
                      {contact.name}
                    </button>
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Mail size={11} className="text-slate-300 shrink-0" />
                      {contact.email || "—"}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Phone size={11} className="text-slate-300 shrink-0" />
                      {contact.phone}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
                      {contact.accountId || "No Account"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-400 text-xs">{new Date(contact.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-4 pr-6">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setModal({ open: true, contact })} title="Edit"
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => handleDelete(contact.id)} title="Delete"
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
      </div>

      <Modal open={modal.open} onClose={() => setModal({ open: false })}
        title={modal.contact?.id ? "Edit Contact" : "Create New Contact"}>
        <ContactForm
          initial={modal.contact}
          onSave={handleSave}
          onCancel={() => setModal({ open: false })}
        />
      </Modal>
    </div>
  );
}
