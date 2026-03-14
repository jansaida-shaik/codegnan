"use client";
import TopBar from "../components/TopBar";

const sidebarItems = [
  { label: "Home", active: true },
  { label: "Employee Management" },
  { label: "Attendance" },
  { label: "Leave Tracker" },
  { label: "Performance" },
  { label: "Recruitment" },
];

export default function HRPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-48 bg-white border-r border-gray-200 shrink-0">
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
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl">
            <h1 className="text-xl font-bold text-gray-900 mb-6">HR Dashboard</h1>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 leading-none">Attendance Summary</h3>
                  <p className="text-sm text-gray-600">Record Count: <span className="font-semibold text-gray-800">12</span></p>
                </div>
                <div className="p-10 flex flex-col items-center justify-center text-gray-400">
                   <p className="text-xs font-medium text-gray-500">Coming Soon</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 leading-none">Leave Applications</h3>
                  <p className="text-sm text-gray-600">Record Count: <span className="font-semibold text-gray-800">5</span></p>
                </div>
                <div className="p-10 flex flex-col items-center justify-center text-gray-400">
                   <p className="text-xs font-medium text-gray-500">Coming Soon</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 leading-none">Upcoming Birthdays</h3>
                  <p className="text-sm text-gray-600">Record Count: <span className="font-semibold text-gray-800">2</span></p>
                </div>
                <div className="p-10 flex flex-col items-center justify-center text-gray-400">
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
