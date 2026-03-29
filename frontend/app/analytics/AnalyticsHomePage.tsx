"use client";
import Header from "@/components/Header";
import { BarChart3, ChevronRight } from "lucide-react";

import React, { useState, useEffect } from "react";

const sidebarItems = [
  { label: "All Dashboards", active: true },
  { label: "Sales Analytics" },
  { label: "Financial Reports" },
  { label: "Activity Logs" },
];

export default function AnalyticsHomePage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await fetch("/api/analytics/reports");
        if (response.ok) {
          const data = await response.json();
          setReports(data);
        }
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r border-gray-200 shrink-0">
          <nav className="py-4">
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                className={`px-6 py-2.5 text-xs font-semibold cursor-pointer transition-colors ${
                  item.active 
                    ? "text-blue-700 bg-blue-50 border-r-2 border-blue-600" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </div>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-slate-50">
          <div className="max-w-7xl">
            <h1 className="text-xl font-bold text-gray-900 mb-6">Analytics Dashboard</h1>
            
            <div className="grid grid-cols-1 gap-8">
              <div className="premium-card overflow-hidden flex flex-col">
                <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 leading-none">Business Performance Analytics</h3>
                  <p className="text-sm text-gray-600">Record Count: <span className="font-semibold text-gray-800">{reports.length} Reports</span></p>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reports.map((report) => (
                    <div key={report.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold text-slate-900">{report.title}</h4>
                        <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform">
                          <BarChart3 size={14} />
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 mb-4">{report.description}</p>
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-indigo-600">View Detail</span>
                        <ChevronRight size={12} />
                      </div>
                    </div>
                  ))}
                  {reports.length === 0 && (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-400">
                      <p className="text-xs font-medium text-gray-500">No reports found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
