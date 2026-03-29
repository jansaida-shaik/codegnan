"use client";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/api";

const SOURCES = ["Direct Call", "Just Dial", "Website", "Referral", "Walk-In", "Google Ads", "Instagram", "Facebook", "Other"];
const STATUSES = ["New", "Follow-Up", "Branch Visit", "Interested", "Not Interested", "DNP", "Converted"];

interface LeadFormProps {
  initial?: any;
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
}

export default function LeadForm({ initial, onSave, onCancel }: LeadFormProps) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", source: "Direct Call", status: "New", userId: "", ...initial,
  });
  const [users, setUsers] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getUsers().then(setUsers).catch(() => {});
  }, []);

  useEffect(() => {
    if (initial) setForm({ name: "", email: "", phone: "", source: "Direct Call", status: "New", userId: "", ...initial });
  }, [initial]);

  const set = (k: string, v: string) => setForm((f: any) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("Name is required");
    if (!form.phone.trim()) return setError("Phone is required");
    setSaving(true);
    try {
      await onSave(form);
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
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Full Name <span className="text-red-500">*</span></label>
          <input
            value={form.name} onChange={e => set("name", e.target.value)}
            placeholder="e.g. Vivek Kumar"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Phone <span className="text-red-500">*</span></label>
          <input
            value={form.phone} onChange={e => set("phone", e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Email</label>
          <input
            type="email" value={form.email} onChange={e => set("email", e.target.value)}
            placeholder="email@example.com"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Lead Source</label>
          <select
            value={form.source} onChange={e => set("source", e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
          >
            {SOURCES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Lead Status</label>
          <select
            value={form.status} onChange={e => set("status", e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
          >
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Lead Owner</label>
          <select
            value={form.userId} onChange={e => set("userId", e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
          >
            <option value="">— Select Owner —</option>
            {users.map((u: any) => (
              <option key={u.id} value={u.id}>
                {u.name || u.email} {u.role ? `(${u.role})` : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-600 font-medium bg-red-50 px-3 py-2 rounded-lg border border-red-100">
          {error}
        </p>
      )}

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
        <button type="button" onClick={onCancel}
          className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
          Cancel
        </button>
        <button type="submit" disabled={saving}
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-60 shadow-sm">
          {saving && <Loader2 size={14} className="animate-spin" />}
          {initial?.id ? "Save Changes" : "Create Lead"}
        </button>
      </div>
    </form>
  );
}
