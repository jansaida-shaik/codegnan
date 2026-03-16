import Header from "../components/Header";
import { 
  Users, 
  CheckSquare, 
  Settings2, 
  RefreshCcw, 
  Plus, 
  Layout, 
  CreditCard, 
  Calendar, 
  Mail, 
  MoreHorizontal,
  ArrowUpRight,
  TrendingUp,
  Search
} from "lucide-react";

// Home - Premium Dashboard
function BundleHome() {
  const mails = [
    { initials: "SU", color: "bg-blue-600", sender: "Zoho Books", email: "support.india@zohobooks.com", subject: "Webhook failure report in books for Daily", time: "Today, 10:31 AM" },
    { initials: "HA", color: "bg-rose-500", sender: "Codegnan IT Solutions", email: "ha@codegnan.com", subject: "Inbox Link to Zoho - refresh token failed", time: "Yesterday, 06:09 PM" },
    { initials: "HA", color: "bg-rose-500", sender: "Codegnan IT Solutions", email: "ha@codegnan.com", subject: "Inbox Link to Zoho - refresh token failed", time: "Yesterday, 04:29 PM" },
    { initials: "MA", color: "bg-emerald-600", sender: "maushmi.s", email: "maushmi.s@zohocorp.com", subject: "Zoho Admin Webinar: Sales Pipelines, Views & Dashboards In CRM", time: "Yesterday, 03:01 PM" },
    { initials: "HA", color: "bg-rose-500", sender: "Codegnan IT Solutions", email: "ha@codegnan.com", subject: "Inbox Link to Zoho - refresh token failed", time: "Yesterday, 02:19 PM" },
  ];

  const dotMenu = (
    <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all">
      <MoreHorizontal size={16} />
    </button>
  );

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col items-start px-4 md:px-6 lg:px-8 py-6 lg:py-8 space-y-6 lg:space-y-8">
      {/* Dashboard */}
      <div className="w-full space-y-6 lg:space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary">
              <Layout size={18} strokeWidth={2.5} />
              <h1 className="text-xl font-bold tracking-tight text-gray-900">My Dashboard</h1>
            </div>
            <p className="text-[13px] text-gray-500 font-medium">Welcome back, here's what's happening today.</p>
          </div>
          
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="flex items-center bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-all"><Settings2 size={16} /></button>
              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-all"><RefreshCcw size={16} /></button>
            </div>
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 border border-blue-200 text-primary text-[13px] font-bold rounded-xl hover:bg-blue-50 transition-all shadow-sm">
              Edit Layout
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-[13px] font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-blue-500/20">
              <Plus size={16} strokeWidth={3} />
              Add Widget
            </button>
          </div>
        </div>

        {/* Row 1: Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {[
            { n: "105,864", l: "All Leads Count", icon: <Users className="text-blue-500" size={20} />, trend: "+12%" },
            { n: "7,038", l: "All Contacts Count", icon: <TrendingUp className="text-emerald-500" size={20} />, trend: "+5%" },
            { n: "1,693", l: "All Tasks Count", icon: <CheckSquare className="text-amber-500" size={20} />, trend: "-2%" }
          ].map((s) => (
            <div key={s.l} className="premium-card p-5 lg:p-6 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
                  {s.icon}
                </div>
                {dotMenu}
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">{s.n}</p>
                  <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${s.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {s.trend}
                  </span>
                </div>
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">{s.l}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Financials & Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          
          {/* Total Payables */}
          <div className="premium-card flex flex-col overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-100/50">
                  <CreditCard size={18} />
                </div>
                <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">Total Payables</h3>
              </div>
              <span className="text-[10px] font-bold text-gray-400 bg-gray-50 border border-gray-100 px-2 py-1 rounded-lg">
                48 Records
              </span>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-white rounded-2xl border border-gray-100 transition-all hover:bg-blue-50/30 hover:border-blue-100 group">
                  <p className="text-lg font-extrabold text-blue-700 tracking-tight group-hover:scale-105 transition-transform">₹1.13L</p>
                  <p className="text-[10px] text-blue-400 mt-1 font-bold uppercase tracking-widest">Current</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-gray-100 transition-all hover:bg-rose-50/30 hover:border-rose-100 group">
                  <p className="text-lg font-extrabold text-rose-600 tracking-tight group-hover:scale-105 transition-transform">₹1.15 Cr</p>
                  <p className="text-[10px] text-rose-400 mt-1 font-bold uppercase tracking-widest">Overdue</p>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-2 text-[12px] font-bold text-gray-400 hover:text-primary transition-colors">
                View Detailed Report <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* Events */}
          <div className="premium-card flex flex-col overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100/50">
                  <Calendar size={18} />
                </div>
                <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">Upcoming Events</h3>
              </div>
            </div>
            <div className="p-8 lg:p-10 flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 bg-gray-50 rounded-[22px] flex items-center justify-center text-gray-300 mb-4 border border-gray-100">
                <Calendar size={28} strokeWidth={1.5} />
              </div>
              <p className="text-[13px] font-bold text-gray-900">No events today</p>
              <p className="text-[11px] text-gray-400 mt-1 font-medium">Your schedule is looking clear.</p>
            </div>
          </div>

          {/* All Mails */}
          <div className="premium-card flex flex-col overflow-hidden md:col-span-2 lg:col-span-1">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-50 text-rose-600 rounded-lg border border-rose-100/50">
                  <Mail size={18} />
                </div>
                <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">Recent Mails</h3>
              </div>
              {dotMenu}
            </div>
            <div className="divide-y divide-gray-50 overflow-y-auto max-h-64 scrollbar-hide">
              {mails.map((mail, i) => (
                <div key={i} className="flex items-start gap-4 px-6 py-4 hover:bg-gray-50 transition-all cursor-pointer group">
                  <div className={`w-9 h-9 rounded-xl ${mail.color} text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow-lg shadow-gray-200 group-hover:scale-105 transition-transform`}>
                    {mail.initials}
                  </div>
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[13px] font-bold text-gray-900 truncate">{mail.sender}</p>
                      <p className="text-[10px] text-gray-400 font-bold shrink-0">{mail.time}</p>
                    </div>
                    <p className="text-[11px] text-gray-500 truncate font-medium">{mail.subject}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
           <div className="premium-card lg:col-span-2 p-5 lg:p-6 flex flex-col gap-6">
             <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">Quick Actions</h3>
                <div className="flex items-center gap-1.5 p-1 bg-gray-50 rounded-xl border border-gray-100 shadow-inner">
                  <button className="px-3 py-1.5 bg-white text-[10px] font-bold text-primary rounded-lg shadow-sm border border-gray-100">Common</button>
                  <button className="px-3 py-1.5 text-[10px] font-bold text-gray-400 hover:text-gray-600 transition-all">Recent</button>
                </div>
             </div>
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
                {[
                  { label: "New Lead", app: "CRM", color: "bg-blue-500" },
                  { label: "Add Contact", app: "CRM", color: "bg-indigo-500" },
                  { label: "Create Task", app: "Projects", color: "bg-amber-500" },
                  { label: "New Invoice", app: "Finance", color: "bg-sky-500" },
                  { label: "Add Employee", app: "HR", color: "bg-rose-500" },
                  { label: "New Ticket", app: "Support", color: "bg-emerald-500" },
                  { label: "Campaign", app: "Marketing", color: "bg-pink-500" },
                  { label: "View Stats", app: "Analytics", color: "bg-violet-500" }
                ].map((a) => (
                  <button key={a.label} className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white border border-gray-100 hover:border-primary/20 hover:bg-gray-50 transition-all group active:scale-95">
                    <div className={`w-9 h-9 rounded-xl ${a.color} flex items-center justify-center shadow-lg shadow-gray-200 group-hover:scale-105 transition-transform`}>
                      <Plus className="text-white" size={18} strokeWidth={3} />
                    </div>
                    <div className="text-center">
                      <p className="text-[12px] font-bold text-gray-800">{a.label}</p>
                      <p className="text-[9px] font-bold text-gray-300 uppercase tracking-tight">{a.app}</p>
                    </div>
                  </button>
                ))}
             </div>
           </div>

           <div className="premium-card p-6 flex flex-col gap-6 bg-sapphire text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/30 transition-colors"></div>
              <div className="relative z-10 space-y-4">
                <div className="p-3 bg-white/10 w-fit rounded-2xl backdrop-blur-md border border-white/10">
                  <TrendingUp className="text-blue-300" size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold tracking-tight">System Performance</h3>
                  <p className="text-[13px] text-blue-100/60 font-medium leading-relaxed">Everything is running smoothly. Your daily reports are ready.</p>
                </div>
                <div className="pt-2">
                  <button className="flex items-center gap-2 text-[13px] font-bold text-blue-400 hover:text-blue-300 transition-colors group/btn">
                    View Insights <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="h-full bg-[#020617] text-white text-sm overflow-hidden font-sans selection:bg-[#22d3ee]/30 selection:text-white">
      <BundleHome />
    </div>
  );
}
