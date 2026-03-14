import TopBar from "../components/TopBar";

// Spark Home - Zoho One-style dashboard
function BundleHome() {
  const mails = [
    { initials: "SU", color: "bg-blue-700", sender: "Zoho Books", email: "support.india@zohobooks.com", subject: "Webhook failure report in books for Daily", time: "Today, 10:31 AM" },
    { initials: "HA", color: "bg-red-500", sender: "Codegnan IT Solutions", email: "ha@codegnan.com", subject: "Inbox Link to Zoho - refresh token failed", time: "Yesterday, 06:09 PM" },
    { initials: "HA", color: "bg-red-500", sender: "Codegnan IT Solutions", email: "ha@codegnan.com", subject: "Inbox Link to Zoho - refresh token failed", time: "Yesterday, 04:29 PM" },
    { initials: "MA", color: "bg-green-600", sender: "maushmi.s", email: "maushmi.s@zohocorp.com", subject: "Zoho Admin Webinar: Sales Pipelines, Views & Dashboards In CRM", time: "Yesterday, 03:01 PM" },
    { initials: "HA", color: "bg-red-500", sender: "Codegnan IT Solutions", email: "ha@codegnan.com", subject: "Inbox Link to Zoho - refresh token failed", time: "Yesterday, 02:19 PM" },
  ];
  const dotMenu = <button className="text-gray-600 hover:text-gray-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg></button>;
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col">
      {/* Dashboard */}
      <div className="p-5 flex-1 w-full max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <h1 className="text-base font-bold text-gray-900">My Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 text-gray-800 transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></button>
            <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 text-gray-800 transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg></button>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-blue-600 text-blue-700 text-xs font-semibold rounded-lg hover:bg-blue-50 transition">Edit Layout</button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-700 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition shadow"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Add Widget</button>
          </div>
        </div>
        {/* Row 1: Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[{ n: "105864", l: "All Leads Count" }, { n: "7038", l: "All Contacts Count" }, { n: "1693", l: "All Tasks Count" }].map((s) => (
            <div key={s.l} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex justify-between items-start">
              <div><p className="text-2xl font-bold text-gray-900">{s.n}</p><p className="text-xs text-gray-800 mt-1">{s.l}</p></div>
              {dotMenu}
            </div>
          ))}
        </div>
        {/* Row 2 */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 leading-none flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Total Payables
              </h3>
              <p className="text-sm text-gray-600">Record Count: <span className="font-semibold text-gray-800">48</span></p>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <p className="text-sm font-bold text-blue-700">₹1,13,774.15</p>
                  <p className="text-[10px] text-gray-700 mt-0.5 font-medium">Current</p>
                </div>
                <div className="p-2 bg-red-50 rounded-lg">
                  <p className="text-sm font-bold text-red-600">₹1,15,51,278.59</p>
                  <p className="text-[10px] text-gray-700 mt-0.5 font-medium">Overdue</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 leading-none flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Events
              </h3>
              <p className="text-sm text-gray-600">Record Count: <span className="font-semibold text-gray-800">0</span></p>
            </div>
            <div className="p-5 flex-1 flex flex-col items-center justify-center text-gray-600">
              <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <p className="text-xs font-medium text-gray-800">No results found</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 leading-none flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                All Mails
              </h3>
              <p className="text-sm text-gray-600">Record Count: <span className="font-semibold text-gray-800">{mails.length}</span></p>
            </div>
            <div className="overflow-y-auto max-h-48">
              {mails.map((mail, i) => (
                <div key={i} className="flex items-start gap-2.5 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition cursor-pointer">
                  <div className={`w-8 h-8 rounded-full ${mail.color} text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-sm`}>{mail.initials}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-gray-900 truncate">{mail.sender}</p>
                      <p className="text-[10px] text-gray-800 font-medium shrink-0">{mail.time}</p>
                    </div>
                    <p className="text-[10px] text-gray-800 truncate">{mail.email}</p>
                    <p className="text-[10px] text-gray-700 font-medium truncate mt-0.5">{mail.subject}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 leading-none flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" /></svg>
                Total Receivables
              </h3>
              <p className="text-sm text-gray-600">Record Count: <span className="font-semibold text-gray-800">12</span></p>
            </div>
            <div className="p-5 text-gray-900">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <p className="text-sm font-bold text-blue-700">₹3,32,500.00</p>
                  <p className="text-[10px] text-gray-700 mt-0.5 font-medium">Current</p>
                </div>
                <div className="p-2 bg-red-50 rounded-lg">
                  <p className="text-sm font-bold text-red-600">₹53,17,424.87</p>
                  <p className="text-[10px] text-gray-700 mt-0.5 font-medium">Overdue</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 leading-none flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
                Mentions
              </h3>
              <p className="text-sm text-gray-600">Record Count: <span className="font-semibold text-gray-800">0</span></p>
            </div>
            <div className="p-5 flex-1 flex flex-col items-center justify-center text-gray-600">
              <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <p className="text-xs font-medium text-gray-800">No results found</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 leading-none">Quick Actions</h2>
                <p className="text-sm text-gray-600 mt-2">Total Tasks: <span className="font-semibold text-gray-800">4</span></p>
              </div>
              {dotMenu}
            </div>
            <div className="p-4 space-y-1">
              {[{ label: "Add New Lead", app: "crm" }, { label: "Add New Contact", app: "crm" }, { label: "Create Task", app: "projects" }, { label: "Create Invoice", app: "finance" }].map((a) => (
                <button key={a.label} className="w-full text-left flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-lg transition text-xs font-semibold text-gray-800 hover:text-blue-700 group">
                  <svg className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-800 text-sm overflow-hidden">
      <TopBar />
      <BundleHome />
    </div>
  );
}
