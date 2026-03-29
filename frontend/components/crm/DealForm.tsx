"use client";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const STAGES = ["Qualified", "Presentation", "Proposal", "Negotiation", "Closed Won", "Closed Lost"];

interface DealFormProps {
  initial?: any;
  leads?: any[];
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
}

export default function DealForm({ initial, leads = [], onSave, onCancel }: DealFormProps) {
  const [form, setForm] = useState({
    title: "", value: "", stage: "Qualified", probability: "10", closeDate: "", leadId: "", ...initial,
    value: initial?.value?.toString() || "",
    probability: initial?.probability?.toString() || "10",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initial) setForm({
      title: "", value: "", stage: "Qualified", probability: "10", closeDate: "", leadId: "",
      ...initial,
      value: initial.value?.toString() || "",
      probability: initial.probability?.toString() || "10",
    });
  }, [initial]);

  const set = (k: string, v: string) => setForm((f: any) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim()) return setError("Title is required");
    setSaving(true);
    try {
      await onSave({ ...form, value: Number(form.value) || 0, probability: Number(form.probability) || 10 });
    } catch (err: any) {
      setError(err?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Deal Title *</label>
          <input
            value={form.title} onChange={e => set("title", e.target.value)}
            placeholder="e.g. Full Stack Web Dev Course"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Value (₹)</label>
          <input
            type="number" value={form.value} onChange={e => set("value", e.target.value)}
            placeholder="50000"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Probability (%)</label>
          <input
            type="number" min="0" max="100" value={form.probability} onChange={e => set("probability", e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Stage</label>
          <select
            value={form.stage} onChange={e => set("stage", e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
          >
            {STAGES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Close Date</label>
          <input
            type="date" value={form.closeDate ? form.closeDate.split("T")[0] : ""} onChange={e => set("closeDate", e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        {leads.length > 0 && (
          <div className="col-span-2">
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Linked Lead</label>
            <select
              value={form.leadId} onChange={e => set("leadId", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
            >
              <option value="">— None —</option>
              {leads.map((l: any) => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-600 font-medium bg-red-50 px-3 py-2 rounded-lg border border-red-100">{error}</p>}

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
        <button type="button" onClick={onCancel}
          className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
          Cancel
        </button>
        <button type="submit" disabled={saving}
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-60 shadow-sm">
          {saving && <Loader2 size={14} className="animate-spin" />}
          {initial?.id ? "Save Changes" : "Create Deal"}
        </button>
      </div>
    </form>
  );
}
