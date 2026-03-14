"use client";
import TopBar from "../components/TopBar";
import Image from "next/image";

export default function FinancePage() {
  const sidebarItems = [
    { label: "Home", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>, active: true },
    { label: "Items", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> },
    { label: "Inventory", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
    { label: "Sales", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { label: "Purchases", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg> },
    { label: "Time Tracking", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { label: "Banking", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m4 0h1m-7 4h12a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
    { label: "Filing & Compliance", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
    { label: "Accountant", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    { label: "Reports", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
    { label: "Documents", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
  ];

  return (
    <div className="flex flex-col h-screen bg-white">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-gray-50 border-r border-gray-200 flex flex-col shrink-0">

          
          <nav className="flex-1 overflow-y-auto py-2">
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 px-4 py-2 text-xs font-semibold cursor-pointer transition-colors ${
                  item.active 
                    ? "text-blue-600 bg-blue-50 border-r-4 border-blue-600" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span className={item.active ? "text-blue-600" : "text-gray-400"}>{item.icon}</span>
                {item.label}
              </div>
            ))}
            
            <div className="mt-8 px-4 mb-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Apps</p>
            </div>
            {["Zoho Payroll", "Zoho Payments"].map((app) => (
              <div
                key={app}
                className="flex items-center gap-3 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer transition-colors"
              >
                <div className="w-4 h-4 rounded bg-gray-300"></div>
                {app}
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-400 shadow-sm">
                <svg className="w-6 h-6 font-thin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Welcome Jan Saida Shaik</h1>
                <p className="text-xs text-gray-500">Codegnan IT Solutions Pvt Ltd • All Locations</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-gray-200 mb-6 text-xs font-semibold text-gray-500">
            <button className="pb-2 border-b-2 border-blue-600 text-blue-600">Dashboard</button>
            <button className="pb-2 hover:text-gray-800 transition">Getting Started</button>
            <button className="pb-2 hover:text-gray-800 transition">Recent Updates</button>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Total Receivables */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-800">Total Receivables</h3>
                <button className="text-[10px] text-blue-600 hover:underline flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                  New
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mb-1">Total Unpaid Invoices</p>
              <p className="text-2xl font-bold text-gray-900 mb-4">₹56,49,924.87</p>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-orange-500 w-[60%]"></div>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-gray-500">Current : <span className="text-gray-900 font-bold">₹3,62,500.00</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="text-gray-500">Overdue : <span className="text-gray-900 font-bold">₹52,87,424.87</span></span>
                </div>
              </div>
            </div>

            {/* Total Payables */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-800">Total Payables</h3>
                <button className="text-[10px] text-blue-600 hover:underline flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                  New
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mb-1">Total Unpaid Bills</p>
              <p className="text-2xl font-bold text-gray-900 mb-4">₹1,15,55,155.71</p>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-orange-500 w-[85%]"></div>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-gray-500">Current : <span className="text-gray-900 font-bold">₹29,474.75</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="text-gray-500">Overdue : <span className="text-gray-900 font-bold">₹1,15,25,680.96</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Cash Flow */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-gray-800">Cash Flow</h3>
              <select className="text-[10px] border border-gray-200 rounded px-2 py-1 bg-white outline-none">
                <option>This Fiscal Year</option>
              </select>
            </div>
            
            <div className="h-48 relative flex items-end gap-1 px-2 border-b border-gray-100 mb-4">
               {/* Mock chart area */}
               {[40, 45, 42, 48, 55, 60, 58, 20, 15, 12, 10, 8].map((h, i) => (
                 <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                   <div className="w-full bg-blue-100 rounded-t h-full absolute bottom-0 -z-10 group-hover:bg-blue-200 transition-colors" style={{ height: `${h}%` }}></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mb-1" style={{ marginBottom: `${h}%` }}></div>
                 </div>
               ))}
               <div className="absolute top-0 right-0 p-4 text-right">
                  <p className="text-[10px] text-gray-400">Cash as on 01/04/2025</p>
                  <p className="text-sm font-bold text-gray-900">₹3,29,783.75</p>
                  
                  <div className="mt-4 space-y-2">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase">Incoming</p>
                      <p className="text-xs font-bold text-gray-900 flex items-center justify-end gap-1">₹22,20,32,780.42 <span className="text-green-500 text-[10px]">( + )</span></p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase">Outgoing</p>
                      <p className="text-xs font-bold text-gray-900 flex items-center justify-end gap-1">₹26,97,76,542.57 <span className="text-red-500 text-[10px]">( - )</span></p>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-[10px] text-gray-400">Cash as on 31/03/2026</p>
                      <p className="text-sm font-bold text-gray-900">₹-4,74,13,978.40 <span className="text-orange-500 text-[10px]">( = )</span></p>
                    </div>
                  </div>
               </div>
            </div>
            <div className="flex justify-between px-2 text-[10px] text-gray-400">
               <span>Apr 2025</span>
               <span>Jul 2025</span>
               <span>Oct 2025</span>
               <span>Jan 2026</span>
               <span>Mar 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Income and Expense */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-800">Income and Expense</h3>
                <select className="text-[10px] border border-gray-200 rounded px-2 py-1 bg-white outline-none">
                  <option>This Fiscal Year</option>
                </select>
              </div>
              
              <div className="flex items-center gap-6 mb-6">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    <span className="text-[10px] text-gray-500">Total Income</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">₹15,00,61,66...</p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                    <span className="text-[10px] text-gray-500">Total Expenses</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">₹13,49,95,432.46</p>
                </div>
                <div className="ml-auto flex border border-gray-200 rounded overflow-hidden shadow-sm">
                  <button className="px-3 py-1 text-[10px] bg-gray-50 font-bold border-r border-gray-200 hover:bg-gray-100">Accrual</button>
                  <button className="px-3 py-1 text-[10px] text-gray-400 font-bold hover:bg-gray-100">Cash</button>
                </div>
              </div>

              <div className="h-48 flex items-end gap-1.5 px-2">
                {[
                  { i: 30, e: 25 }, { i: 50, e: 35 }, { i: 70, e: 40 }, { i: 70, e: 55 },
                  { i: 60, e: 65 }, { i: 45, e: 45 }, { i: 35, e: 52 }, { i: 20, e: 48 },
                  { i: 42, e: 55 }, { i: 35, e: 38 }, { i: 10, e: 15 }, { i: 5, e: 18 }
                ].map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end gap-0.5 group">
                    <div className="w-full bg-rose-500 rounded-t-sm transition-all group-hover:opacity-80" style={{ height: `${d.e}%` }}></div>
                    <div className="w-full bg-emerald-500 rounded-t-sm transition-all group-hover:opacity-80" style={{ height: `${d.i}%` }}></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between px-2 text-[9px] text-gray-400 mt-2">
                <span>Apr 2025</span>
                <span>Jul 2025</span>
                <span>Oct 2025</span>
                <span>Jan 2026</span>
                <span>Mar 2026</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-6">* Income and expense values displayed are exclusive of taxes.</p>
            </div>

            {/* Top Expenses */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-semibold text-gray-800">Top Expenses</h3>
                <select className="text-[10px] border border-gray-200 rounded px-2 py-1 bg-white outline-none">
                  <option>This Fiscal Year</option>
                </select>
              </div>

              <div className="flex items-center gap-8">
                {/* Donut Chart Mockup */}
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#E2E8F0" strokeWidth="3"></circle>
                    <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#10B981" strokeWidth="3" strokeDasharray="40 100" strokeDashoffset="0"></circle>
                    <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#F97316" strokeWidth="3" strokeDasharray="25 100" strokeDashoffset="-40"></circle>
                    <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#3B82F6" strokeWidth="3" strokeDasharray="15 100" strokeDashoffset="-65"></circle>
                    <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#EAB308" strokeWidth="3" strokeDasharray="10 100" strokeDashoffset="-80"></circle>
                    <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#A855F7" strokeWidth="3" strokeDasharray="5 100" strokeDashoffset="-90"></circle>
                    <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#06B6D4" strokeWidth="3" strokeDasharray="5 100" strokeDashoffset="-95"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-medium">All Expenses</p>
                    <p className="text-xs font-bold text-gray-900">₹139497772.50</p>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex-1 space-y-4">
                  {[
                    { label: "Salaries and Employe...", amount: "₹5,76,08,7...", color: "bg-emerald-500" },
                    { label: "Advertising And Mar...", amount: "₹3,35,01,07...", color: "bg-orange-500" },
                    { label: "Rent Expense", amount: "₹1,53,61,853.00", color: "bg-blue-500" },
                    { label: "Training & Developm...", amount: "₹33,59,011....", color: "bg-yellow-500" },
                    { label: "Event Expenses", amount: "₹29,04,477.21", color: "bg-purple-500" },
                    { label: "Others", amount: "₹2,67,62,597.62", color: "bg-cyan-500" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${item.color}`}></div>
                        <span className="text-gray-600 truncate max-w-[120px]">{item.label}</span>
                      </div>
                      <span className="font-bold text-gray-900">{item.amount}</span>
                    </div>
                  ))}
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
