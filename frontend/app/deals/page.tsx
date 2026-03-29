"use client";
import React, { useState, useEffect } from "react";
import CRMInventorySidebar from "@/components/crm/CRMInventorySidebar";
import Modal from "@/components/crm/Modal";
import DealForm from "@/components/crm/DealForm";
import { api } from "@/lib/api";
import { Search, Plus, RefreshCw, IndianRupee, Trash2, Pencil } from "lucide-react";

const columns = [
  { title: "Qualified", stage: "Qualified", border: "border-blue-500", marker: "bg-blue-500", text: "text-blue-700", bg: "bg-blue-50" },
  { title: "Presentation", stage: "Presentation", border: "border-purple-500", marker: "bg-purple-500", text: "text-purple-700", bg: "bg-purple-50" },
  { title: "Proposal", stage: "Proposal", border: "border-amber-500", marker: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50" },
  { title: "Negotiation", stage: "Negotiation", border: "border-orange-500", marker: "bg-orange-500", text: "text-orange-700", bg: "bg-orange-50" },
  { title: "Closed Won", stage: "Closed Won", border: "border-emerald-500", marker: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
  { title: "Closed Lost", stage: "Closed Lost", border: "border-rose-500", marker: "bg-rose-500", text: "text-rose-700", bg: "bg-rose-50" },
];

export default function DealsKanbanPage() {
  const [deals, setDeals] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; deal?: any; defaultStage?: string }>({ open: false });

  const loadData = async () => {
    setLoading(true);
    try {
      const [d, l] = await Promise.all([api.getDeals(), api.getLeads()]);
      setDeals(d || []);
      setLeads(l?.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);

  const handleDragStart = (e: React.DragEvent, dealId: string) => e.dataTransfer.setData("dealId", dealId);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = async (e: React.DragEvent, newStage: string) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData("dealId");
    if (!dealId) return;
    const probMap: Record<string, number> = {
      "Qualified": 10, "Presentation": 30, "Proposal": 50, "Negotiation": 80, "Closed Won": 100, "Closed Lost": 0,
    };
    setDeals(cur => cur.map(d => d.id === dealId ? { ...d, stage: newStage } : d));
    try { await api.updateDeal(dealId, { stage: newStage, probability: probMap[newStage] ?? 10 }); }
    catch { loadData(); }
  };

  const handleSaveDeal = async (formData: any) => {
    if (modal.deal?.id) {
      await api.updateDeal(modal.deal.id, formData);
    } else {
      await api.createDeal({ ...formData, stage: modal.defaultStage || formData.stage });
    }
    setModal({ open: false });
    loadData();
  };

  const handleDeleteDeal = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Delete this deal?\n\nYou can't undo this.")) return;
    try { await api.deleteDeal(id); loadData(); }
    catch { alert("Failed to delete deal."); }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <CRMInventorySidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="h-14 border-b border-slate-200 flex items-center justify-between px-6 bg-white shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Deals Pipeline</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button className="px-3 py-1 bg-white shadow-sm rounded-md text-xs font-bold text-slate-700">Kanban</button>
              <button className="px-3 py-1 rounded-md text-xs font-bold text-slate-500 hover:text-slate-700 transition">List</button>
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <button onClick={() => setModal({ open: true })}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md">
              <Plus size={16} strokeWidth={3} />
              <span>New Deal</span>
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <RefreshCw size={32} className="animate-spin text-blue-400" />
            </div>
          ) : (
            <div className="flex h-full gap-5 pb-4 items-start w-max">
              {columns.map(col => {
                const colDeals = deals.filter(d => d.stage === col.stage);
                const totalValue = colDeals.reduce((s, d) => s + (d.value || 0), 0);
                return (
                  <div key={col.stage} onDragOver={handleDragOver} onDrop={e => handleDrop(e, col.stage)}
                    className="w-[300px] h-full flex flex-col bg-slate-100/50 rounded-xl border border-slate-200/60 overflow-hidden shrink-0">

                    {/* Column Header */}
                    <div className={`p-3 border-b-2 bg-white ${col.border} shrink-0`}>
                      <div className="flex justify-between items-center mb-0.5">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${col.marker}`} />
                          <h2 className="font-bold text-slate-800 text-sm">{col.title}</h2>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-0.5 rounded-full">{colDeals.length}</span>
                          <button onClick={() => setModal({ open: true, defaultStage: col.stage })}
                            className="text-slate-300 hover:text-blue-600 transition-colors">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <p className={`text-xs font-bold ${col.text}`}>₹ {totalValue.toLocaleString()}</p>
                    </div>

                    {/* Cards */}
                    <div className="flex-1 p-2 space-y-3 overflow-y-auto no-scrollbar">
                      {colDeals.map(deal => (
                        <div key={deal.id} draggable onDragStart={e => handleDragStart(e, deal.id)}
                          onClick={() => setModal({ open: true, deal })}
                          className="bg-white p-3.5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all cursor-grab active:cursor-grabbing group relative">

                          {/* Edit/Delete on hover */}
                          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={e => { e.stopPropagation(); setModal({ open: true, deal }); }}
                              className="p-1 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded transition-all">
                              <Pencil size={11} />
                            </button>
                            <button onClick={e => handleDeleteDeal(deal.id, e)}
                              className="p-1 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded transition-all">
                              <Trash2 size={11} />
                            </button>
                          </div>

                          <h3 className="font-bold text-slate-800 text-sm leading-tight pr-12 group-hover:text-blue-600 transition-colors">
                            {deal.title}
                          </h3>
                          <div className="flex items-center gap-1 text-lg font-black text-slate-700 mt-2">
                            <IndianRupee size={14} className="text-slate-400" />
                            {deal.value?.toLocaleString()}
                          </div>
                          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${col.bg} ${col.text}`}>
                              {deal.probability}%
                            </span>
                            {deal.lead && (
                              <span className="text-[10px] font-bold text-slate-400 truncate max-w-[110px]" title={deal.lead.name}>
                                {deal.lead.name}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}

                      {colDeals.length === 0 && (
                        <button onClick={() => setModal({ open: true, defaultStage: col.stage })}
                          className="w-full h-20 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-xs font-bold text-slate-300 hover:border-blue-300 hover:text-blue-400 transition-all gap-1">
                          <Plus size={16} />
                          Add deal
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Modal open={modal.open} onClose={() => setModal({ open: false })}
        title={modal.deal?.id ? "Edit Deal" : "Create New Deal"} width="max-w-xl">
        <DealForm
          initial={modal.deal || (modal.defaultStage ? { stage: modal.defaultStage } : undefined)}
          leads={leads}
          onSave={handleSaveDeal}
          onCancel={() => setModal({ open: false })}
        />
      </Modal>
    </div>
  );
}
