"use client";
import React, { useState } from "react";
import TopBar from "../components/TopBar";
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
  UserPlus
} from "lucide-react";

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  active: boolean;
}

const crmSidebarItems: SidebarItem[] = [
  { label: "Dashboard", icon: <Layers size={16} />, active: true },
  { label: "Leads", icon: <UserPlus size={16} />, active: false },
  { label: "Contacts", icon: <Users size={16} />, active: false },
  { label: "Accounts", icon: <Zap size={16} />, active: false },
  { label: "Deals", icon: <Target size={16} />, active: false },
  { label: "Tasks", icon: <Calendar size={16} />, active: false },
  { label: "Meetings", icon: <Phone size={16} />, active: false },
  { label: "Calls", icon: <Phone size={16} />, active: false },
  { label: "Reports", icon: <BarChart3 size={16} />, active: false },
  { label: "Analytics", icon: <PieChart size={16} />, active: false },
];

const leads = [
  { name: "John Doe", email: "john@example.com", phone: "9876543210", source: "Social Media", status: "Contacted", statusColor: "bg-blue-100 text-blue-700 border-blue-200" },
  { name: "Jane Smith", email: "jane@company.com", phone: "8765432109", source: "Website", status: "New", statusColor: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { name: "Robert Brown", email: "robert@test.com", phone: "7654321098", source: "Reference", status: "Qualified", statusColor: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  { name: "Alice Green", email: "alice@demo.com", phone: "6543210987", source: "Email Campaign", status: "Lost", statusColor: "bg-rose-100 text-rose-700 border-rose-200" },
  { name: "Mike Ross", email: "mike@legal.com", phone: "5432109876", source: "Direct", status: "In Progress", statusColor: "bg-amber-100 text-amber-700 border-amber-200" },
];

const sourceColor = (source: string) => {
  switch (source) {
    case "Social Media": return "bg-sky-50 text-sky-600 border-sky-100";
    case "Website": return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "Reference": return "bg-indigo-50 text-indigo-600 border-indigo-100";
    case "Email Campaign": return "bg-rose-50 text-rose-600 border-rose-100";
    default: return "bg-gray-50 text-gray-600 border-gray-100";
  }
};

export default function Page() {
  const [activeNav, setActiveNav] = useState("Home");

  return (
    <div className="flex flex-col h-screen rich-bg text-gray-800 text-sm overflow-hidden">
      <TopBar />

      {/* Modern Sub-Nav */}
      <div className="bg-white border-b border-gray-200 h-11 flex items-center px-8 gap-4 shrink-0 shadow-sm z-10">
        {["Home", "Lead Pipeline", "Sales Reports", "My Analytics"].map((item) => (
          <button
            key={item}
            onClick={() => setActiveNav(item)}
            className={`px-4 py-1 text-[13px] font-bold transition-all relative ${activeNav === item
              ? "text-primary"
              : "text-gray-400 hover:text-gray-900"
              }`}
          >
            {item}
            {activeNav === item && (
              <div className="absolute -bottom-[15px] left-0 right-0 h-0.5 bg-primary rounded-full shadow-sm" />
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sleek Sidebar */}
        <div className="w-60 bg-white border-r border-gray-100 flex flex-col shrink-0 overflow-y-auto pt-4">
          <nav className="flex-1 px-4 space-y-1">
            {crmSidebarItems.map((item) => (
              <button 
                key={item.label} 
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold transition-all group ${
                  item.active 
                    ? "bg-blue-50 text-primary" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className={`${item.active ? "text-primary" : "text-gray-400 group-hover:text-gray-700"}`}>
                  {item.icon}
                </span>
                {item.label}
                {item.label === "Dashboard" && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-10 space-y-8">
          <div className="max-w-[1400px] mx-auto space-y-8">
            
            {/* Header with Visual Impact */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">CRM Command Center</h1>
                <p className="text-[13px] text-gray-500 font-bold mt-1 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  System Operational • March 2026
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 shadow-sm transition-all">
                  <Download size={16} /> Export
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark shadow-lg shadow-blue-500/20 transition-all">
                  <UserPlus size={18} strokeWidth={2.5} /> Create Lead
                </button>
              </div>
            </div>

            {/* High Impact Hero Stat Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total Revenue Pipeline", value: "₹4.82 Cr", color: "text-blue-600", bg: "bg-blue-50", icon: <Target size={24} /> },
                { label: "Open Deal count", value: "1,248", color: "text-indigo-600", bg: "bg-indigo-50", icon: <Layers size={24} /> },
                { label: "Conversion rate", value: "24.5%", color: "text-emerald-600", bg: "bg-emerald-50", icon: <Zap size={24} /> },
                { label: "Average Deal Size", value: "₹3.8L", color: "text-amber-600", bg: "bg-amber-50", icon: <BarChart3 size={24} /> },
              ].map((stat, i) => (
                <div key={i} className="premium-card p-6 flex items-center justify-between group">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                    <p className={`text-2xl font-black tracking-tight ${stat.color}`}>{stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-[22px] flex items-center justify-center border border-white group-hover:scale-105 transition-transform`}>
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Column - Lead Tracking */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Leads by Status - Redesigned Analytics */}
                <div className="premium-card p-6 space-y-6">
                  <div className="flex items-center justify-between px-2">
                    <h2 className="text-lg font-black text-gray-900 tracking-tight">Leads by Status</h2>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
                      <span className="w-2 h-2 rounded-full bg-primary/20"></span>
                      Weekly Update
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-4">
                    {[
                      { l: "New", v: "420", color: "bg-emerald-500" },
                      { l: "Qualified", v: "185", color: "bg-indigo-500" },
                      { l: "Proposition", v: "92", color: "bg-blue-500" },
                      { l: "Negotiation", v: "48", color: "bg-amber-500" },
                      { l: "Won", v: "15", color: "bg-primary" },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col gap-2 p-3 rounded-2xl bg-gray-50/50 border border-transparent hover:border-gray-100 hover:bg-white transition-all text-center">
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color}`} style={{ width: `${Math.random() * 60 + 20}%` }}></div>
                        </div>
                        <p className="text-lg font-black text-gray-900 mt-1">{item.v}</p>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">{item.l}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Today's Leads Table */}
                <div className="premium-card flex flex-col">
                  <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-black text-gray-900 tracking-tight">Today's Priority Leads</h2>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Automated Assignment</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                        <button className="p-1.5 text-gray-400 hover:text-gray-900"><Filter size={14} /></button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-900"><Download size={14} /></button>
                      </div>
                      <button className="text-xs font-black text-primary hover:underline">View All Pipeline</button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50/50">
                          <th className="px-8 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Prospect Name</th>
                          <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Source Entity</th>
                          <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status / Stage</th>
                          <th className="px-8 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {leads.map((lead, i) => (
                          <tr key={i} className="hover:bg-gray-50/50 group">
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-xs">
                                  {lead.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-[13px] font-black text-gray-900 group-hover:text-primary transition-colors">{lead.name}</p>
                                  <p className="text-[11px] text-gray-400 font-medium">{lead.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter border ${sourceColor(lead.source)}`}>
                                {lead.source}
                              </span>
                            </td>
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${lead.status === 'Won' ? 'bg-emerald-500' : lead.status === 'Lost' ? 'bg-rose-500' : 'bg-primary'}`} />
                                <span className="text-[12px] font-black text-gray-800">{lead.status}</span>
                              </div>
                            </td>
                            <td className="px-8 py-5 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><MessageSquare size={16} /></button>
                                <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"><Phone size={16} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Sidebar Column - Insights */}
              <div className="space-y-8">
                
                {/* Visual Lead Source Chart */}
                <div className="premium-card p-8 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-primary" />
                   <h2 className="text-lg font-black text-gray-900 tracking-tight">Leads by Source</h2>
                   
                   <div className="relative w-48 h-48 flex items-center justify-center">
                     <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                       <circle cx="18" cy="18" r="14" fill="transparent" stroke="#f1f5f9" strokeWidth="4"></circle>
                       <circle cx="18" cy="18" r="14" fill="transparent" stroke="#2563eb" strokeWidth="4" strokeDasharray="45 100" strokeDashoffset="0"></circle>
                       <circle cx="18" cy="18" r="14" fill="transparent" stroke="#6366f1" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-45"></circle>
                       <circle cx="18" cy="18" r="14" fill="transparent" stroke="#10b981" strokeWidth="4" strokeDasharray="30 100" strokeDashoffset="-70"></circle>
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Conversion</p>
                        <p className="text-2xl font-black text-gray-900">82%</p>
                     </div>
                   </div>

                   <div className="w-full space-y-3">
                     {[
                       { l: "Social Media", p: "45%", c: "bg-blue-500" },
                       { l: "Direct Traffic", p: "30%", c: "bg-emerald-500" },
                       { l: "Referrals", p: "25%", c: "bg-indigo-500" },
                     ].map((item, i) => (
                       <div key={i} className="flex items-center justify-between text-[11px] font-bold">
                         <div className="flex items-center gap-2">
                           <div className={`w-2 h-2 rounded-full ${item.c}`} />
                           <span className="text-gray-500 uppercase tracking-tighter">{item.l}</span>
                         </div>
                         <span className="text-gray-900">{item.p}</span>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Highlights / Alerts */}
                <div className="premium-card p-6 bg-primary overflow-hidden relative group">
                  <div className="absolute inset-0 bg-blue-600/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <div className="relative z-10 space-y-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white border border-white/10">
                      <Zap size={20} fill="currentColor" />
                    </div>
                    <div className="space-y-1">
                       <h3 className="text-white font-black text-lg">Daily Goal Alert</h3>
                       <p className="text-blue-100/70 text-[12px] font-medium leading-relaxed">
                         You are only 5 leads away from hitting your weekly qualification target. Keep going!
                       </p>
                    </div>
                    <button className="w-full py-2.5 bg-white text-primary rounded-xl font-black text-xs hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                       View My Targets <ChevronRight size={14} strokeWidth={3} />
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
