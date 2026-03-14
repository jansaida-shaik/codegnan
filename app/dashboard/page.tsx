"use client";
import Image from "next/image";
import { useState } from "react";

const leads = [
  { name: "Varun", email: "varun@example.com", phone: "+917842678078", source: "Direct Call", status: "Follow-Up", statusColor: "bg-orange-100 text-orange-700" },
  { name: "Prashanth", email: "prashanth@example.com", phone: "+916302838097", source: "Just Dial", status: "New", statusColor: "bg-blue-100 text-blue-700" },
  { name: "Sonteena Divya", email: "divya@example.com", phone: "+918886268479", source: "WhatsApp", status: "New", statusColor: "bg-blue-100 text-blue-700" },
  { name: "Nanubala", email: "nanubala@example.com", phone: "+917395380508", source: "Suman TV", status: "Follow-Up", statusColor: "bg-orange-100 text-orange-700" },
  { name: "Maji Sai Nikhil", email: "nikhil@example.com", phone: "+913298471504", source: "WhatsApp", status: "DNP", statusColor: "bg-red-100 text-red-700" },
];

const leadsBySource = [
  { source: "None", count: 3046 },
  { source: "2025 Passed Outs", count: 45548 },
  { source: "Bangalore Leads", count: 6078 },
  { source: "Callyzer", count: 1609 },
  { source: "Custom Forms", count: 36 },
  { source: "Direct Call", count: 6482 },
  { source: "Empty", count: 2 },
  { source: "Google Ads", count: 892 },
];

const sidebarItems = [
  { label: "Workqueue", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>, active: false },
  { label: "Leads", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, active: false },
  { label: "Converted Leads", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, active: false },
  { label: "Batch Master", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>, active: false },
  { label: "Finance", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, active: false },
  { label: "Customer Payments", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>, active: false },
  { label: "Tasks", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>, active: false },
  { label: "Meetings", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, active: false },
  { label: "Calls", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>, active: false },
  { label: "Products", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>, active: false },
  { label: "Quotes", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, active: false },
  { label: "Sales Orders", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>, active: false },
  { label: "Purchase Orders", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, active: false },
  { label: "Invoices", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" /></svg>, active: false },
  { label: "Campaigns", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>, active: false },
  { label: "Vendors", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>, active: false },
  { label: "Price Books", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>, active: false },
  { label: "Cases", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>, active: false },
  { label: "Solutions", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, active: false },
];

const sourceColor = (source: string) => {
  const map: Record<string, string> = {
    "Direct Call": "bg-blue-100 text-blue-700",
    "Just Dial": "bg-green-100 text-green-700",
    "WhatsApp": "bg-green-100 text-green-700",
    "Suman TV": "bg-purple-100 text-purple-700",
  };
  return map[source] || "bg-gray-100 text-gray-700";
};

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("Home");

  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-800 text-sm overflow-hidden">

      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 h-12 flex items-center px-4 gap-3 shrink-0 shadow-sm">
        <div className="flex items-center mr-3">
          <Image src="/Codegnan Logo R New.png" alt="Codegnan Logo" width={160} height={44} className="object-contain" />
        </div>

        <div className="flex-1 flex items-center gap-1 ml-4">
          {["Finance", "Organization"].map((tab) => (
            <button
              key={tab}
              className="px-3 py-1 rounded text-xs font-medium transition text-gray-600 hover:bg-gray-100"
            >{tab}</button>
          ))}
          <svg className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>

        <div className="flex items-center gap-3 text-gray-400">
          <svg className="w-4 h-4 cursor-pointer hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <svg className="w-4 h-4 cursor-pointer hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          <svg className="w-4 h-4 cursor-pointer hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">J</div>
            <span className="text-xs font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">Jan Saida Shaik</span>
          </div>
        </div>
      </div>

      {/* Second Nav Bar */}
      <div className="bg-white border-b border-gray-200 h-9 flex items-center px-4 gap-1 shrink-0">
        {["Home", "Modules", "Reports", "Analytics", "My Requests"].map((item) => (
          <button
            key={item}
            onClick={() => setActiveNav(item)}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${activeNav === item ? "text-blue-700 border-b-2 border-blue-600 rounded-none font-semibold" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}
          >{item}</button>
        ))}
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <div className="w-48 bg-white border-r border-gray-200 flex flex-col shrink-0 overflow-y-auto">
          <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">CRM</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
          </div>

          <div className="px-3 py-2 border-b border-gray-100">
            <div className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 rounded-md text-gray-400 text-xs">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <span>Search</span>
            </div>
          </div>

          <nav className="flex-1 py-1">
            {sidebarItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
              >
                <span className="text-gray-400 group-hover:text-blue-600 shrink-0">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-5 bg-gray-50">

          {/* Page Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-200">
                <Image src="/logo.png" alt="avatar" width={36} height={36} />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Welcome Codegnan</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 transition text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </button>
              <select className="text-xs px-2 py-1 border border-gray-200 rounded bg-white text-gray-600">
                <option>Codegnan&apos;s Home</option>
              </select>
              <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 transition text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
              </button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="flex gap-4">

            {/* Left Column */}
            <div className="flex-1 space-y-4">

              {/* Today's Leads */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="font-semibold text-gray-800 text-sm">Today&apos;s Leads</h2>
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-blue-600 hover:underline">View All</button>
                  </div>
                </div>

                <table className="w-full text-xs">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-4 py-2.5 text-gray-500 font-medium">Lead Name</th>
                      <th className="text-left px-4 py-2.5 text-gray-500 font-medium">Email</th>
                      <th className="text-left px-4 py-2.5 text-gray-500 font-medium">Phone</th>
                      <th className="text-left px-4 py-2.5 text-gray-500 font-medium">Lead Source</th>
                      <th className="text-left px-4 py-2.5 text-gray-500 font-medium">Lead Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2.5 text-blue-600 font-medium cursor-pointer hover:underline">{lead.name}</td>
                        <td className="px-4 py-2.5 text-gray-500">{lead.email}</td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-gray-700">{lead.phone}</span>
                            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${sourceColor(lead.source)}`}>{lead.source}</span>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${lead.statusColor}`}>{lead.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="px-4 py-2.5 border-t border-gray-100 flex items-center justify-end gap-2 text-xs text-gray-500">
                  <span>1 - 10</span>
                  <button className="p-1 rounded hover:bg-gray-100 disabled:opacity-30" disabled>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button className="p-1 rounded hover:bg-gray-100">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>

              {/* Leads by Status */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                  <div>
                    <h2 className="font-semibold text-gray-800 text-sm">Leads by Status</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Record Count: <span className="font-medium">105828</span></p>
                  </div>
                </div>
                <div className="p-4 grid grid-cols-3 gap-3">
                  {[
                    { label: "New", count: 45620, color: "bg-blue-500" },
                    { label: "Follow-Up", count: 28340, color: "bg-orange-500" },
                    { label: "DNP", count: 12440, color: "bg-red-500" },
                    { label: "Converted", count: 9800, color: "bg-green-500" },
                    { label: "Not Interested", count: 6128, color: "bg-gray-400" },
                    { label: "Enrolled", count: 3500, color: "bg-purple-500" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                      <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.color}`}></div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">{s.count.toLocaleString()}</p>
                        <p className="text-[10px] text-gray-500">{s.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-72 space-y-4 shrink-0">

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                  <p className="text-xs text-gray-500 mb-1">My Calls Today</p>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                  <p className="text-xs text-gray-500 mb-1">My Leads</p>
                  <p className="text-3xl font-bold text-gray-900">18266</p>
                </div>
              </div>

              {/* Leads by Source */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">Leads by Source</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Record Count: <span className="font-medium">105828</span></p>
                </div>
                <div className="px-4 py-2">
                  <div className="flex justify-between text-[10px] text-gray-500 font-medium uppercase tracking-wider py-2 border-b border-gray-100">
                    <span>Lead Source</span>
                    <span>Record Count</span>
                  </div>
                  {leadsBySource.map((row, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 hover:bg-gray-50 transition-colors text-xs">
                      <span className="text-blue-600 cursor-pointer hover:underline">{row.source}</span>
                      <span className="font-medium text-gray-700">{row.count.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white border-t border-gray-200 h-10 flex items-center px-4 gap-6 shrink-0 text-xs text-gray-500">
        <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          Calls
        </button>
        <div className="flex-1"></div>
        <button className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-700 transition">
          💬 Need Support?
        </button>
      </div>
    </div>
  );
}