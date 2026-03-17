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
  ArrowRight,
  TrendingUp,
  MapPin,
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  Snowflake,
  CloudLightning,
  ChevronDown,
  MoreVertical,
  Star,
  Trophy,
  Award,
  Medal,
  Users2,
  TrendingDown,
  Globe,
  X,
  Copy,
  Video,
  CheckCircle2,
  CreditCard,
  AtSign,
  Search,
  LayoutGrid,
  Clock,
  Shapes,
  HandMetal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

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
    <div className="flex flex-col h-full bg-slate-100 text-slate-900 overflow-hidden font-sans selection:bg-primary/30 selection:text-slate-900 relative">

      {/* Modern Sub-Nav - Light Glass Effect */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200 h-12 flex items-center px-4 lg:px-8 gap-2 lg:gap-6 shrink-0 shadow-sm z-10 overflow-x-auto no-scrollbar">
        {["Home", "Lead Pipeline", "Sales Reports", "My Analytics"].map((item) => (
          <button
            key={item}
            onClick={() => setActiveNav(item)}
            className={`px-3 lg:px-1 py-1 text-[13px] font-bold transition-all relative whitespace-nowrap h-full flex items-center group ${activeNav === item
              ? "text-primary"
              : "text-slate-500 hover:text-slate-900"
              }`}
          >
            {item}
            {activeNav === item ? (
              <div className="absolute bottom-0 left-0 right-0 h-0.8 bg-primary rounded-full shadow-[0_0_8px_rgba(34,109,180,0.3)]" />
            ) : (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sleek Sidebar - Premium Borders */}
        <div className="hidden lg:flex w-64 bg-white border-r border-slate-300 flex-col shrink-0 overflow-y-auto pt-6 px-4">

          <nav className="flex-1 space-y-1.5">
            {crmSidebarItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-bold transition-all group ${item.active
                  ? "bg-slate-100 text-slate-900 border border-slate-900 shadow-sm"
                  : "text-slate-900 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
                  }`}
              >
                <span className={`${item.active ? "text-primary" : "text-slate-900 group-hover:text-slate-500"} transition-colors`}>
                  {item.icon}
                </span>
                {item.label}
                {item.label === "Leads" && (
                  <span className="ml-auto bg-primary/10 text-primary px-2 py-0.5 rounded-lg text-[10px] font-black">24</span>
                )}
              </button>
            ))}
          </nav>

          {/*<div className="mt-auto p-4 mb-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black">?</div>
              <div>
                <p className="text-[11px] font-black text-slate-900">Need Help?</p>
                <p className="text-[10px] text-slate-400 font-bold">CRM Support Open</p>
              </div>
            </div>
            <button className="w-full py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-black text-slate-600 hover:bg-slate-100 shadow-sm transition-all">Support Center</button>
          </div>*/}
        </div>

        {/* Main Dashboard Content - Light Bento Background */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10 space-y-10 bg-slate-100">
          <div className="max-w-[1600px] mx-auto space-y-10">


            {/* High Impact Bento Stat Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                { label: "Revenue Pipeline", value: "₹4.82 Cr", change: "+12.5%", color: "text-blue-600", bg: "bg-blue-100/50", icon: <Target size={24} /> },
                { label: "Active Deals", value: "1,248", change: "+4.2%", color: "text-primary", bg: "bg-blue-100/50", icon: <Layers size={24} /> },
                { label: "Overall Conversion", value: "24.5%", change: "+1.8%", color: "text-emerald-600", bg: "bg-emerald-100/50", icon: <Zap size={24} /> },
                { label: "Average Value", value: "₹3.8L", change: "-0.5%", color: "text-amber-600", bg: "bg-amber-100/50", icon: <BarChart3 size={24} /> },
              ].map((stat, i) => (
                <div key={i} className="bento-item p-6 flex flex-col justify-between group h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${stat.bg} border-2 border-slate-200 flex items-center justify-center shadow-sm ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                      {stat.icon}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-[10px] font-black ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Main Column - Lead Tracking */}
              <div className="xl:col-span-2 space-y-8">

                {/* Leads by Status - Bento Analytics */}
                <div className="bento-item p-6 md:p-8 space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1">Pipeline Distribution</h2>
                      <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mt-1">Lead status performance</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 shadow-sm">
                      <BarChart3 size={18} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { l: "New", v: "420", color: "bg-emerald-500" },
                      { l: "Qualified", v: "185", color: "bg-primary" },
                      { l: "Proposed", v: "92", color: "bg-blue-600" },
                      { l: "Negotiation", v: "48", color: "bg-amber-500" },
                      { l: "Won", v: "15", color: "bg-emerald-600" },
                    ].map((item, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-default">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{item.l}</p>
                        <p className="text-2xl font-black text-slate-900 tracking-tight mb-2">{item.v}</p>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color} shadow-sm`} style={{ width: `${Math.random() * 60 + 20}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Priority Leads Table - Bento Style */}
                <div className="bento-item overflow-hidden">
                  <div className="px-6 md:px-8 py-6 border-b-2 border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1">Priority Pipeline</h2>
                      <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mt-1">High conversion propensity leads</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-xl bg-white border-2 border-slate-200 text-slate-400 hover:text-slate-900 transition-colors shadow-sm"><Filter size={16} /></button>
                      <button className="p-2 rounded-xl bg-white border-2 border-slate-200 text-slate-400 hover:text-slate-900 transition-colors shadow-sm"><Download size={16} /></button>
                    </div>
                  </div>

                  <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">Contact Identity</th>
                          <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 text-center">Origin</th>
                          <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 text-center">Score</th>
                          <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right border-b border-slate-200">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y border-slate-200">
                        {leads.map((lead, i) => (
                          <tr key={i} className="hover:bg-slate-50 group transition-all duration-300">
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-900 flex items-center justify-center font-black text-slate-900 shadow-md group-hover:rotate-3 transition-transform">
                                  {lead.name.charAt(0)}
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-sm font-black text-slate-900 group-hover:text-primary transition-colors">{lead.name}</p>
                                  <p className="text-[10px] font-black text-slate-500 truncate max-w-[150px]">{lead.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border shadow-sm ${sourceColor(lead.source)}`}>
                                {lead.source}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-col items-center gap-1.5">
                                <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner">
                                  <div className="h-full bg-primary" style={{ width: `${95 - i * 12}%` }}></div>
                                </div>
                                <span className="text-[9px] font-black text-slate-900 uppercase tracking-tighter">AI: {95 - i * 12}%</span>
                              </div>
                            </td>
                            <td className="px-8 py-3">
                              <div className="flex items-center justify-end gap-2 h-12">
                                <button className="p-2 rounded-xl bg-white border-2 border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm">
                                  <MessageSquare size={16} />
                                </button>
                                <button className="p-2 rounded-xl bg-white border-2 border-slate-900 text-primary hover:bg-slate-50 transition-all shadow-md group-hover:scale-110 active:scale-95">
                                  <Phone size={16} fill="currentColor" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-6 bg-slate-50 border-t border-slate-200 text-center">
                    <button className="text-[11px] font-black text-primary hover:text-slate-900 transition-colors uppercase tracking-widest flex items-center justify-center gap-2 mx-auto border-b-2 border-transparent hover:border-slate-300 pb-0.5">
                      Expand All Leads <ChevronRight size={14} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar Column - Insights */}
              <div className="space-y-8">

                {/* Source Matrix - Bento Chart */}
                <div className="bento-item p-6 md:p-8 space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1">Source Matrix</h2>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Origin Distribution</p>
                    </div>
                    <div className="px-3 py-1 bg-slate-50 rounded-xl text-[10px] font-black text-slate-900 border-2 border-slate-200 shadow-sm">Monthly</div>
                  </div>

                  <div className="relative flex items-center justify-center py-6">
                    <div className="w-48 h-48 relative">
                      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="4"></circle>
                        <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#226db4" strokeWidth="4.5" strokeDasharray="45 100" strokeDashoffset="0"></circle>
                        <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#34d399" strokeWidth="4.5" strokeDasharray="25 100" strokeDashoffset="-45"></circle>
                        <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#a78bfa" strokeWidth="4.5" strokeDasharray="30 100" strokeDashoffset="-70"></circle>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Yield</p>
                        <p className="text-5xl font-black text-slate-900 leading-none tracking-tight">82<span className="text-xl text-primary">%</span></p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { l: "Engineering Grads", p: "43%", c: "bg-blue-600" },
                      { l: "Metro Cities", p: "32%", c: "bg-emerald-500" },
                      { l: "Organic Search", p: "25%", c: "bg-purple-500" },
                    ].map((item, i) => (
                      <div key={i} className="space-y-1.5 p-4 rounded-xl bg-slate-50 border-2 border-slate-200 transition-all hover:bg-white hover:shadow-md cursor-pointer group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-2.5 h-2.5 rounded-full ${item.c} shadow-sm`} />
                            <span className="text-[12px] font-black text-slate-700 uppercase tracking-tighter">{item.l}</span>
                          </div>
                          <span className="text-[12px] font-black text-slate-900">{item.p}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                          <div className={`h-full ${item.c} shadow-sm`} style={{ width: item.p }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Target Visual - Bento Action Card */}
                <div className="bento-item p-8 bg-primary relative group overflow-hidden border-2 border-slate-900 shadow-xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rotate-12 -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />

                  <div className="relative z-10 space-y-6">
                    <div className="w-14 h-14 bg-white border-2 border-slate-900 rounded-2xl flex items-center justify-center text-primary shadow-xl">
                      <Zap size={28} fill="currentColor" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-white font-black text-2xl tracking-tight uppercase leading-none">Sales Target</h3>
                      <p className="text-white/80 text-sm font-black leading-relaxed">
                        Precision tracking indicates you are <span className="text-white underline decoration-2 underline-offset-4">5 successful conversions</span> away from securing the elite bonus tier.
                      </p>
                    </div>
                    <button className="w-full py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-sm hover:scale-[1.03] active:scale-[0.97] shadow-xl shadow-black/10 transition-all flex items-center justify-center gap-2 group/btn">
                      Secure Bonus Tier
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
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

