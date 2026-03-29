"use client";
import Header from "@/components/Header";

import React, { useState, useEffect } from "react";

const sidebarItems = [
  { label: "Tickets", active: true },
  { label: "Knowledge Base" },
  { label: "Customers" },
  { label: "Reports" },
];

export default function HelpdeskHomePage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await fetch("/api/helpdesk/tickets");
        if (response.ok) {
          const data = await response.json();
          setTickets(data);
        }
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#030712]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22d3ee]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full rich-bg overflow-hidden font-sans selection:bg-[#22d3ee]/30 selection:text-white">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 bg-[#030712] border-r border-white/5 shrink-0">
          <nav className="py-4">
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                className={`px-6 py-2.5 text-xs font-semibold cursor-pointer transition-colors ${
                  item.active 
                    ? "text-[#22d3ee] bg-white/5 border-r-2 border-[#22d3ee]" 
                    : "text-white/40 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </div>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 rich-bg">
          <div className="max-w-7xl">
            <h1 className="text-xl font-bold text-gray-900 mb-6">Help Desk Dashboard</h1>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="premium-card overflow-hidden flex flex-col">
                <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 leading-none">Recent Tickets</h3>
                  <p className="text-sm text-gray-600">Record Count: <span className="font-semibold text-gray-800">{tickets.length}</span></p>
                </div>
                <div className="p-4 space-y-3">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{ticket.subject}</p>
                        <p className="text-[10px] text-slate-500 font-medium">Requester: {ticket.requesterName}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                        ticket.priority === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>
                  ))}
                  {tickets.length === 0 && (
                    <div className="p-12 flex flex-col items-center justify-center text-gray-400">
                      <p className="text-xs font-medium text-gray-500">No tickets found</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="premium-card overflow-hidden flex flex-col">
                <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 leading-none">SLA Health</h3>
                  <p className="text-sm text-gray-600">Record Count: <span className="font-semibold text-gray-800">98%</span></p>
                </div>
                <div className="p-12 flex flex-col items-center justify-center text-gray-400">
                   <p className="text-xs font-medium text-gray-500">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
