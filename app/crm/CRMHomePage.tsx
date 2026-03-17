"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import {
  Users,
  Target,
  BarChart3,
  PieChart,
  Phone,
  Mail,
  MessageSquare,
  ChevronRight,
  Filter,
  Download,
  Calendar,
  Layers,
  Zap,
  UserPlus,
  ArrowRight
} from "lucide-react";

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  active: boolean;
}

const crmSidebarItems: SidebarItem[] = [
  { label: "Leads", icon: <UserPlus size={16} />, active: false },
  { label: "Converted Leads", icon: <Target size={16} />, active: false },
  { label: "Batch Master", icon: <Layers size={16} />, active: false },
  { label: "Invoices", icon: <BarChart3 size={16} />, active: false },
  { label: "Customer Payments", icon: <Zap size={16} />, active: false },
  { label: "Tasks", icon: <Calendar size={16} />, active: false },
  { label: "Meetings", icon: <Calendar size={16} />, active: false },
  { label: "Calls", icon: <Phone size={16} />, active: false },
  { label: "Products", icon: <Layers size={16} />, active: false },
  { label: "Campaigns", icon: <Zap size={16} />, active: false },
];

const leads = [
  { name: "Varun", email: "varun@example.com", phone: "+917842678078", source: "Direct Call", status: "Follow-up", statusColor: "bg-orange-100 text-orange-700 border-orange-200" },
  { name: "Prashanth", email: "prashanth@example.com", phone: "+916302838097", source: "Just Dial", status: "New", statusColor: "bg-blue-100 text-blue-700 border-blue-200" },
  { name: "Sonteena Divya", email: "divya@example.com", phone: "+918886268479", source: "WhatsApp", status: "New", statusColor: "bg-blue-100 text-blue-700 border-blue-200" },
  { name: "Nanubala", email: "nanubala@example.com", phone: "+917395380508", source: "Suman TV", status: "Follow-up", statusColor: "bg-orange-100 text-orange-700 border-orange-200" },
  { name: "Maji Sai Nikhil", email: "nikhil@example.com", phone: "+913298471504", source: "WhatsApp", status: "DNP", statusColor: "bg-rose-100 text-rose-700 border-rose-200" },
];

const sourceColor = (source: string) => {
  switch (source) {
    case "Direct Call": return "bg-blue-50 text-blue-600 border-blue-100";
    case "Just Dial": return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "WhatsApp": return "bg-green-50 text-green-600 border-green-100";
    case "Suman TV": return "bg-purple-50 text-purple-600 border-purple-100";
    default: return "bg-gray-50 text-gray-600 border-gray-100";
  }
};

export default function CRMHomePage() {
  const [activeNav, setActiveNav] = useState("Home");

  return (
    <div className="flex flex-col h-full bg-[#020617] text-white overflow-hidden font-sans selection:bg-cyan-500/30 selection:text-white relative">

      {/* Modern Sub-Nav - Glass Effect */}
      <div className="bg-[#0B0F19]/80 backdrop-blur-xl border-b border-white/5 h-12 flex items-center px-4 lg:px-8 gap-2 lg:gap-6 shrink-0 shadow-lg z-10 overflow-x-auto no-scrollbar">
        {["Home", "Lead Pipeline", "Sales Reports", "My Analytics"].map((item) => (
          <button
            key={item}
            onClick={() => setActiveNav(item)}
            className={`px-3 lg:px-1 py-1 text-[13px] font-bold transition-all relative whitespace-nowrap h-full flex items-center group ${activeNav === item
              ? "text-cyan-400"
              : "text-gray-400 hover:text-white"
              }`}
          >
            {item}
            {activeNav === item ? (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            ) : (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sleek Sidebar - Premium Borders */}
        <div className="hidden lg:flex w-64 bg-[#030712] border-r border-white/5 flex-col shrink-0 overflow-y-auto pt-6 px-4">

          <nav className="flex-1 space-y-1.5">
            {crmSidebarItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-bold transition-all group ${item.active
                    ? "bg-white/5 text-white border border-white/10 shadow-sm"
                    : "text-white/40 hover:bg-white/5 hover:text-white border border-transparent"
                  }`}
              >
                <span className={`${item.active ? "text-[#22d3ee]" : "text-white/20 group-hover:text-white/60"} transition-colors`}>
                  {item.icon}
                </span>
                {item.label}
                {item.label === "Leads" && (
                  <span className="ml-auto bg-[#22d3ee]/10 text-[#22d3ee] px-2 py-0.5 rounded-lg text-[10px] font-black">24</span>
                )}
              </button>
            ))}
          </nav>
          
          <div className="mt-auto p-4 mb-4 bg-white/5 rounded-2xl border border-white/10">
             <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#22d3ee]/10 flex items-center justify-center text-[#22d3ee] font-black">?</div>
                <div>
                   <p className="text-[11px] font-black text-white/90">Need Help?</p>
                   <p className="text-[10px] text-white/30 font-bold">CRM Support Open</p>
                </div>
             </div>
             <button className="w-full py-2 bg-white/[0.03] border border-white/10 rounded-xl text-[11px] font-black text-white/70 hover:bg-white/10 shadow-sm transition-all">Support Center</button>
          </div>
        </div>

        {/* Main Dashboard Content - Rich Background */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 deep-space-bg">
          <div className="max-w-7xl space-y-8">

            {/* Header Redesign */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                   <span className="px-2.5 py-1 bg-[#22d3ee]/5 text-[#22d3ee] text-[10px] font-black uppercase tracking-wider rounded-lg border border-[#22d3ee]/10">Enterprise Portal</span>
                   <span className="w-1 h-1 rounded-full bg-white/20"></span>
                   <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Version 4.2.0</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">CRM Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-blue-600">Center</span></h1>
                <p className="text-[13px] text-white/40 font-bold mt-2 flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Active Monitoring Operational • Mar 15, 2026
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center justify-center gap-2.5 px-5 py-3 bg-white/5 border border-white/10 text-white/70 rounded-2xl font-black hover:bg-white/10 hover:text-white shadow-lg transition-all text-[13px]">
                  <Download size={18} strokeWidth={2.5} /> Report
                </button>
                <button className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl font-black hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-cyan-500/25 transition-all text-[13px]">
                  <UserPlus size={20} strokeWidth={2.5} /> Create New Lead
                </button>
              </div>
            </div>

            {/* High Impact Hero Stat Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
              {[
                { label: "Revenue Pipeline", value: "₹4.82 Cr", change: "+12.5%", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20", icon: <Target size={24} /> },
                { label: "Active Deals", value: "1,248", change: "+4.2%", color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20", icon: <Layers size={24} /> },
                { label: "Overall Conversion", value: "24.5%", change: "+1.8%", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", icon: <Zap size={24} /> },
                { label: "Average Value", value: "₹3.8L", change: "-0.5%", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", icon: <BarChart3 size={24} /> },
              ].map((stat, i) => (
                <div key={i} className="bg-[#0B0F19] relative overflow-hidden backdrop-blur-xl p-6 rounded-[32px] border border-white/5 shadow-2xl flex flex-col justify-between group hover:border-[#22d3ee]/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className={`w-14 h-14 ${stat.bg.replace('bg-', 'bg-white/')} ${stat.color} rounded-2xl flex items-center justify-center border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                      {stat.icon}
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black ${stat.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="space-y-1 relative z-10">
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                    <p className={`text-3xl font-black tracking-tight ${stat.color} drop-shadow-[0_0_8px_currentColor]`}>{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Main Column - Lead Tracking */}
              <div className="xl:col-span-2 space-y-8">

                {/* Leads by Status - Redesigned Analytics */}
                <div className="bg-[#0B0F19] relative overflow-hidden p-6 md:p-8 rounded-[32px] border border-white/5 shadow-2xl space-y-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <h2 className="text-lg md:text-xl font-black text-white tracking-tight">Lead Performance Analytics</h2>
                      <p className="text-[11px] text-white/20 font-bold uppercase tracking-widest mt-1">Real-time Pipeline Distribution</p>
                    </div>
                    <button className="p-2.5 rounded-xl border border-white/5 bg-white/5 text-white/20 hover:text-white transition-all">
                      <BarChart3 size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
                    {[
                      { l: "New", v: "420", color: "from-emerald-400 to-emerald-600", secondary: "bg-emerald-50" },
                      { l: "Qualified", v: "185", color: "from-indigo-400 to-indigo-600", secondary: "bg-indigo-50" },
                      { l: "Proposed", v: "92", color: "from-blue-400 to-blue-600", secondary: "bg-blue-50" },
                      { l: "Negotiation", v: "48", color: "from-amber-400 to-amber-600", secondary: "bg-amber-50" },
                      { l: "Won", v: "15", color: "from-primary to-blue-700", secondary: "bg-blue-50" },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col gap-3 p-5 rounded-[24px] bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:shadow-2xl transition-all group">
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest leading-none">{item.l}</p>
                        <p className="text-3xl font-black text-white tracking-tight">{item.v}</p>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-1">
                          <div className={`h-full bg-gradient-to-r ${item.color} shadow-[0_0_8px_rgba(34,211,238,0.2)]`} style={{ width: `${Math.random() * 60 + 20}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Priority Leads Table */}
                <div className="bg-[#0B0F19] relative rounded-[32px] border border-white/5 shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
                  <div className="px-6 md:px-8 py-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                    <div>
                      <h2 className="text-lg md:text-xl font-black text-white tracking-tight">Priority Pipeline</h2>
                      <p className="text-[11px] text-white/20 font-bold uppercase tracking-widest mt-1">AI-Ranked High Propensity Leads</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex bg-white/5 rounded-2xl p-1 border border-white/10">
                        <button className="w-9 h-9 flex items-center justify-center text-white/20 hover:text-[#22d3ee] transition-colors hover:bg-white/5 rounded-xl"><Filter size={16} /></button>
                        <button className="w-9 h-9 flex items-center justify-center text-white/20 hover:text-[#22d3ee] transition-colors hover:bg-white/5 rounded-xl"><Download size={16} /></button>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto relative z-10">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/[0.02]">
                          <th className="px-8 py-4 text-[10px] font-black text-white/20 uppercase tracking-widest border-b border-white/5">Contact / Identity</th>
                          <th className="px-4 py-4 text-[10px] font-black text-white/20 uppercase tracking-widest border-b border-white/5">Origin Source</th>
                          <th className="px-4 py-4 text-[10px] font-black text-white/20 uppercase tracking-widest border-b border-white/5 text-center">Propensity</th>
                          <th className="px-8 py-4 text-[10px] font-black text-white/20 uppercase tracking-widest text-right border-b border-white/5">Engagement</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.02]">
                        {leads.map((lead, i) => (
                          <tr key={i} className="hover:bg-white/5 group transition-colors">
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-[16px] bg-gradient-to-br from-[#22d3ee] to-blue-600 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-cyan-500/20">
                                  {lead.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-[14px] font-black text-white group-hover:text-[#22d3ee] transition-colors leading-none mb-1.5">{lead.name}</p>
                                  <p className="text-[11px] text-white/40 font-bold tracking-tight">{lead.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border shadow-sm ${sourceColor(lead.source)}`}>
                                {lead.source}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                               <div className="flex flex-col items-center gap-1.5">
                                  <div className="w-14 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                     <div className="h-full bg-[#22d3ee]" style={{ width: `${95 - i*12}%` }}></div>
                                  </div>
                                  <span className="text-[10px] font-black text-white/30 uppercase tracking-tighter">{95 - i*12}% Score</span>
                               </div>
                            </td>
                            <td className="px-8 py-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button className="w-9 h-9 flex items-center justify-center text-white/20 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10"><MessageSquare size={16} /></button>
                                <button className="w-9 h-9 flex items-center justify-center bg-white/5 text-[#22d3ee] hover:bg-[#22d3ee]/10 rounded-xl transition-all border border-white/10 hover:border-[#22d3ee]/20"><Phone size={16} fill="currentColor" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-6 bg-white/[0.02] border-t border-white/5 text-center relative z-10">
                     <button className="text-[11px] font-black text-[#22d3ee] hover:text-white transition-colors uppercase tracking-widest flex items-center justify-center gap-2 mx-auto">
                        View Entire Pipeline <ChevronRight size={14} strokeWidth={3} />
                     </button>
                  </div>
                </div>
              </div>

              {/* Sidebar Column - Insights */}
              <div className="space-y-8">

                {/* Visual Lead Source Chart - Premium Redesign */}
                <div className="bg-[#0B0F19] relative overflow-hidden p-6 md:p-8 rounded-[32px] border border-white/5 shadow-2xl space-y-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <h2 className="text-lg font-black text-white tracking-tight">Source Matrix</h2>
                      <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest mt-0.5">Origin Distribution</p>
                    </div>
                    <div className="px-2.5 py-1 bg-white/5 rounded-lg text-[10px] font-black text-white/30 border border-white/10">Monthly</div>
                  </div>

                  <div className="relative flex items-center justify-center py-4 z-10">
                    <div className="w-44 h-44 relative">
                       <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 filter drop-shadow-sm">
                        <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="3.5"></circle>
                        <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#2563eb" strokeWidth="4.2" strokeDasharray="45 100" strokeDashoffset="0" className="transition-all duration-1000"></circle>
                        <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#6366f1" strokeWidth="4.2" strokeDasharray="25 100" strokeDashoffset="-45" className="transition-all duration-1000"></circle>
                        <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#10b981" strokeWidth="4.2" strokeDasharray="30 100" strokeDashoffset="-70" className="transition-all duration-1000"></circle>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none mb-1">Yield</p>
                        <p className="text-4xl font-black text-white leading-none">82<span className="text-lg text-[#22d3ee]">%</span></p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2 relative z-10">
                    {[
                      { l: "Engineering Grad '25", p: "43%", c: "bg-blue-500", trend: "+5%" },
                      { l: "Metropolitan Hubs", p: "32%", c: "bg-emerald-500", trend: "+12%" },
                      { l: "Organic Discovery", p: "25%", c: "bg-indigo-500", trend: "-2%" },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col gap-1.5 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors cursor-pointer group">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2.5">
                              <div className={`w-2 h-2 rounded-full ${item.c} shadow-[0_0_8px_rgba(0,0,0,0.5)]`} />
                              <span className="text-[11px] font-black text-gray-300 uppercase tracking-tighter">{item.l}</span>
                           </div>
                           <span className="text-[11px] font-black text-white">{item.p}</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                           <div className={`h-full ${item.c}`} style={{ width: item.p }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights / Alerts - Premium Gradients */}
                <div className="p-8 bg-gradient-to-br from-primary via-blue-700 to-indigo-800 rounded-[32px] overflow-hidden relative group shadow-xl shadow-blue-500/20">
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/10 blur-[80px] rounded-full group-hover:bg-white/20 transition-all duration-700" />
                  <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-blue-300/10 blur-[60px] rounded-full group-hover:bg-blue-300/20 transition-all duration-700" />
                  
                  <div className="relative z-10 space-y-6">
                    <div className="w-12 h-12 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 shadow-lg">
                      <Zap size={24} fill="currentColor" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-white font-black text-xl tracking-tight uppercase leading-none">Weekly Objective</h3>
                      <p className="text-blue-100/80 text-[13px] font-bold leading-relaxed">
                        Precision tracking indicates you are <span className="text-white font-black">5 leads remaining</span> to secure your elite performance tier.
                      </p>
                    </div>
                    <button className="w-full py-4 bg-white text-primary rounded-[20px] font-black text-[13px] hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-black/10 transition-all flex items-center justify-center gap-2 group/btn">
                      Analyze My Targets 
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

