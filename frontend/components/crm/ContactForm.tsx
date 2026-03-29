"use client";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface ContactFormProps {
  initial?: any;
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
}

export default function ContactForm({ initial, onSave, onCancel }: ContactFormProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", accountId: "", ...initial });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initial) setForm({ name: "", email: "", phone: "", accountId: "", ...initial });
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
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Full Name *</label>
          <input
            value={form.name} onChange={e => set("name", e.target.value)}
            placeholder="e.g. Priya Sharma"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Phone *</label>
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
            placeholder="contact@email.com"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Account / Company</label>
          <input
            value={form.accountId} onChange={e => set("accountId", e.target.value)}
            placeholder="e.g. Codegnan Technologies"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
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
          {initial?.id ? "Save Changes" : "Create Contact"}
        </button>
      </div>
    </form>
  );
}
