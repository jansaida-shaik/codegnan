"use client";
import Header from "../components/Header";

const sidebarItems = [
  { label: "All Dashboards", active: true },
  { label: "Sales Analytics" },
  { label: "Financial Reports" },
  { label: "Activity Logs" },
];

export default function AnalyticsPage() {
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
                  <p className="text-sm text-gray-600">Record Count: <span className="font-semibold text-gray-800">24 Reports</span></p>
                </div>
                <div className="p-20 flex flex-col items-center justify-center text-gray-400">
                   <p className="text-xs font-medium text-gray-500">Analytics Data Visualization Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
