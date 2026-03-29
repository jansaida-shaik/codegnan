"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  RefreshCw,
  MoreHorizontal,
  Plus,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  Calendar,
  Settings,
  User,
  LayoutGrid,
} from "lucide-react";
import CRMInventorySidebar from "@/components/crm/CRMInventorySidebar";
import { api } from "@/lib/api";

const STATUS_COLORS: Record<string, string> = {
  "Branch Visit": "bg-blue-100 text-blue-700 border-blue-200",
  "Follow-Up": "bg-amber-100 text-amber-700 border-amber-200",
  "Follow-up": "bg-amber-100 text-amber-700 border-amber-200",
  "New": "bg-green-100 text-green-700 border-green-200",
  "DNP": "bg-red-100 text-red-700 border-red-200",
  "Interested": "bg-purple-100 text-purple-700 border-purple-200",
  "Not Interested": "bg-slate-100 text-slate-600 border-slate-200",
  "Converted": "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const SOURCE_COLORS: Record<string, string> = {
  "Direct Call": "bg-amber-100 text-amber-700 border-amber-200",
  "Just Dial": "bg-blue-100 text-blue-700 border-blue-200",
  "Website": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Referral": "bg-purple-100 text-purple-700 border-purple-200",
};

export default function HomeDashboard() {
  const [view, setView] = useState("Codegnan's Home");
  const [showViewMenu, setShowViewMenu] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const dashboardData = await api.getDashboard();
      setData(dashboardData);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const todaysLeads = data?.todaysLeads || [];
  const leadsBySource = data?.sourceCounts || [];
  const leadsByStatus = data?.statusCounts || [];
  const stats = data?.stats || { totalLeads: 0 };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <CRMInventorySidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">



        {/* Page Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          {/* Welcome Banner */}
          <div className="bg-white border border-slate-200 rounded-xl px-6 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200 shrink-0">
                <User className="text-slate-400" size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">Welcome Codegnan</h1>
                <p className="text-xs text-slate-500 font-medium">Your daily sales overview is here.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={loadData}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all border border-slate-200"
                title="Refresh"
              >
                <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowViewMenu(!showViewMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-all"
                >
                  <span>{view}</span>
                  <ChevronDown size={12} />
                </button>
                {showViewMenu && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-20 w-44 py-1">
                    {["Codegnan's Home", "My Activities", "Team Overview"].map(v => (
                      <button key={v} onClick={() => { setView(v); setShowViewMenu(false); }}
                        className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-slate-50 transition-colors ${view === v ? 'text-blue-600 font-bold' : 'text-slate-700'}`}>
                        {v}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all border border-slate-200">
                <MoreHorizontal size={15} />
              </button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

            {/* LEFT: Today's Leads + Leads by Status */}
            <div className="xl:col-span-2 space-y-5">

              {/* Today's Leads Table */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="font-bold text-slate-800 text-sm">Today's Leads</h2>
                  <button className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded transition-all">
                    <Plus size={15} />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse table-fixed min-w-[700px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="w-36 px-5 py-2.5 text-[10px] font-black text-slate-500 uppercase tracking-wider">Lead Name</th>
                        <th className="w-40 px-4 py-2.5 text-[10px] font-black text-slate-500 uppercase tracking-wider">Email</th>
                        <th className="w-36 px-4 py-2.5 text-[10px] font-black text-slate-500 uppercase tracking-wider">Phone</th>
                        <th className="w-28 px-4 py-2.5 text-[10px] font-black text-slate-500 uppercase tracking-wider">Lead Source</th>
                        <th className="w-28 px-4 py-2.5 text-[10px] font-black text-slate-500 uppercase tracking-wider">Lead Status</th>
                        <th className="w-28 px-5 py-2.5 text-[10px] font-black text-slate-500 uppercase tracking-wider">Lead Owner</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[13px]">
                      {loading ? (
                        <tr><td colSpan={6} className="py-8 text-center"><RefreshCw className="animate-spin text-slate-300 mx-auto" size={22} /></td></tr>
                      ) : todaysLeads.length === 0 ? (
                        <tr><td colSpan={6} className="py-8 text-center text-sm text-slate-400 font-medium">No leads today yet</td></tr>
                      ) : todaysLeads.map((lead: any, i: number) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                          <td className="px-5 py-3 font-bold text-blue-600 hover:underline truncate">{lead.name}</td>
                          <td className="px-4 py-3 text-slate-500 truncate">{lead.email || "—"}</td>
                          <td className="px-4 py-3 text-slate-600 font-medium">
                            <span className="flex items-center gap-1.5">{lead.phone}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${SOURCE_COLORS[lead.source] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                              {lead.source}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${STATUS_COLORS[lead.status] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-[11px] font-bold text-slate-600 truncate">{lead.owner}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-5 py-2.5 border-t border-slate-100 bg-white flex items-center justify-end gap-3">
                  <span className="text-[11px] font-bold text-slate-400">1 – {todaysLeads.length}</span>
                  <div className="flex items-center gap-1">
                    <button className="text-slate-300 hover:text-slate-600 transition-colors"><ChevronLeft size={15} /></button>
                    <button className="text-slate-300 hover:text-slate-600 transition-colors"><ChevronRight size={15} /></button>
                  </div>
                </div>
              </div>

              {/* Leads by Status Table */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="font-bold text-slate-800 text-sm">Leads by Status</h2>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                    Record Count : {stats.totalLeads}
                  </span>
                </div>
                <div className="px-5 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Lead Status</span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Record Count</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {loading ? (
                    <div className="py-6 flex justify-center"><RefreshCw className="animate-spin text-slate-300" size={20} /></div>
                  ) : leadsByStatus.map((item: any, i: number) => (
                    <div key={i} className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                      <span className="text-[13px] font-medium text-slate-600 group-hover:text-blue-600 transition-colors">{item.name}</span>
                      <span className="text-[13px] font-bold text-slate-800">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Stat Cards + Leads by Source */}
            <div className="space-y-5">

              {/* Stat Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] mb-3">My Calls Today</p>
                  <p className="text-4xl font-black text-slate-800">0</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] mb-3">My Leads</p>
                  <p className="text-4xl font-black text-slate-800">{stats.totalLeads?.toLocaleString() || "—"}</p>
                </div>
              </div>

              {/* Leads by Source */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="font-bold text-slate-800 text-xs uppercase tracking-widest">Leads by Source</h2>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                    Record Count : {stats.totalLeads}
                  </span>
                </div>
                <div className="px-5 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Lead Source</span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Record Count</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {loading ? (
                    <div className="py-6 flex justify-center"><RefreshCw className="animate-spin text-slate-300" size={20} /></div>
                  ) : leadsBySource.map((source: any, i: number) => (
                    <div key={i} className="px-5 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                      <span className="text-[13px] font-medium text-slate-600 group-hover:text-blue-600 transition-colors">{source.name}</span>
                      <span className="text-[13px] font-bold text-slate-800">{source.value?.toLocaleString()}</span>
                    </div>
                  ))}
                  {leadsBySource.length > 0 && (
                    <div className="px-5 py-3 flex items-center justify-between bg-slate-50">
                      <span className="text-[13px] font-black text-slate-900">Total</span>
                      <span className="text-[13px] font-black text-slate-900">{stats.totalLeads?.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
