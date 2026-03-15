"use client";
import TopBar from "../components/TopBar";

const sidebarItems = [
  { label: "My Projects", active: true },
  { label: "Tasks" },
  { label: "Timesheets" },
  { label: "Milestones" },
  { label: "Invoices" },
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col h-screen rich-bg overflow-hidden">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden lg:block w-56 bg-white border-r border-gray-200 shrink-0">
          <nav className="py-4">
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                className={`px-6 py-2.5 text-xs font-semibold cursor-pointer ${
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
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 rich-bg">
          <div className="w-full">
            <h1 className="text-xl font-bold text-gray-900 mb-6">Projects Dashboard</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              <div className="premium-card overflow-hidden flex flex-col">
                <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 leading-none">Project Overview</h3>
                  <p className="text-sm text-gray-600">Record Count: <span className="font-semibold text-gray-800">8</span></p>
                </div>
                <div className="p-12 flex flex-col items-center justify-center text-gray-400">
                   <p className="text-xs font-medium text-gray-500">Coming Soon</p>
                </div>
              </div>
              
              <div className="premium-card overflow-hidden flex flex-col">
                <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 leading-none">Active Tasks</h3>
                  <p className="text-sm text-gray-600">Record Count: <span className="font-semibold text-gray-800">15</span></p>
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
