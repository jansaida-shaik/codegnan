"use client";
import { 
  Users, 
  CreditCard, 
  Calendar, 
  MessageSquare,
  ArrowRight,
  LayoutGrid,
  Zap,
  TrendingUp,
  Mail,
  Clock,
  ChevronRight,
  HandMetal,
  Shapes,
  Gamepad2,
  PieChart
} from "lucide-react";
import { useState, useEffect } from "react";

function DigitalClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex items-center gap-2 text-white/40 font-black tracking-tighter text-[11px]">
      <Clock size={12} className="text-primary" />
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </div>
  );
}

function HomeOverview() {
  const appShortcuts = [
    { id: "crm", label: "CRM", desc: "Manage Leads & Deals", icon: <Users size={20} />, color: "from-blue-500 to-indigo-600", href: "/crm" },
    { id: "finance", label: "Finance", desc: "Accounts & Invoices", icon: <CreditCard size={20} />, color: "from-emerald-500 to-teal-600", href: "/finance" },
    { id: "helpdesk", label: "Help Desk", desc: "Support & Tickets", icon: <MessageSquare size={20} />, color: "from-amber-500 to-orange-600", href: "/helpdesk" },
    { id: "analytics", label: "Analytics", desc: "Reports & Insights", icon: <PieChart size={20} />, color: "from-rose-500 to-pink-600", href: "/analytics" },
  ];

  const recentActivity = [
    { type: "lead", user: "Maushmi", action: "converted a lead", target: "Tech Solutions", time: "2m ago", icon: <Zap size={10} />, color: "bg-emerald-500" },
    { type: "finance", user: "Finance Team", action: "generated invoice", target: "#INV-8024", time: "15m ago", icon: <CreditCard size={10} />, color: "bg-blue-500" },
    { type: "support", user: "System", action: "new ticket from", target: "John Doe", time: "1h ago", icon: <MessageSquare size={10} />, color: "bg-amber-500" },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 lg:px-12 py-8 lg:py-12 bg-transparent scrollbar-hide relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Welcome Hero */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-4">
          <div className="space-y-3">
             <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full w-fit">
                <DigitalClock />
             </div>
             <div className="flex items-center gap-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter flex items-center gap-3">
                  Hello, Jan <HandMetal className="text-amber-400 rotate-12" size={32} />
                </h1>
             </div>
             <p className="text-lg text-white/30 font-medium">Your workspace is optimized and ready for today's goals.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-md flex flex-col gap-2 min-w-[160px]">
                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Team Performance</p>
                <div className="flex items-baseline gap-2">
                   <p className="text-2xl font-black text-white">94%</p>
                   <TrendingUp size={14} className="text-emerald-400" />
                </div>
             </div>
             <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-md flex flex-col gap-2 min-w-[160px]">
                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Active Goals</p>
                <p className="text-2xl font-black text-white">12 / 15</p>
             </div>
          </div>
        </div>

        {/* Application Hub */}
        <div className="space-y-6">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-primary/10 rounded-xl text-primary">
                    <LayoutGrid size={20} />
                 </div>
                 <h2 className="text-xl font-black text-white tracking-tight uppercase tracking-widest text-[14px]">Application Hub</h2>
              </div>
              <button className="text-[11px] font-black text-white/20 hover:text-primary transition-colors uppercase tracking-widest">Customize Grid</button>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {appShortcuts.map((app) => (
                <div key={app.id} className="bento-item group cursor-pointer">
                   <div className="p-8 space-y-6 relative overflow-hidden h-full flex flex-col justify-between">
                      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity animate-pulse`} />
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center text-white shadow-xl shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
                         {app.icon}
                      </div>
                      <div>
                         <h3 className="text-lg font-black text-white leading-none mb-2">{app.label}</h3>
                         <p className="text-[11px] text-white/30 font-bold group-hover:text-white/50 transition-colors uppercase tracking-tight">{app.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-black text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                         GO TO APP <ArrowRight size={14} />
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Home Specific Content: Feed & Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Activity Feed */}
           <div className="lg:col-span-2 bento-item">
              <div className="p-8 space-y-8">
                 <div className="flex items-center justify-between">
                    <h2 className="text-[12px] font-black text-white/40 uppercase tracking-[0.2em]">Live Activity Hub</h2>
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-[9px] font-black text-emerald-500 uppercase">Live Update</span>
                    </div>
                 </div>
                 
                 <div className="space-y-1">
                    {recentActivity.map((act, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/[0.03] transition-all group cursor-pointer border border-transparent hover:border-white/5">
                         <div className={`w-8 h-8 rounded-lg ${act.color}/20 flex items-center justify-center text-white`}>
                            {act.icon}
                         </div>
                         <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-medium text-white/60">
                               <span className="font-black text-white">{act.user}</span> {act.action} <span className="font-black text-white">{act.target}</span>
                            </p>
                            <p className="text-[10px] text-white/20 font-bold uppercase mt-0.5">{act.time}</p>
                         </div>
                         <ChevronRight size={14} className="text-white/10 group-hover:translate-x-1 group-hover:text-white transition-all" />
                      </div>
                    ))}
                 </div>
                 
                 <button className="w-full py-4 border border-white/5 rounded-2xl text-[11px] font-black text-white/20 hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest">
                    View Full System Activity
                 </button>
              </div>
           </div>

           {/* Personal Schedule */}
           <div className="bento-item">
              <div className="p-8 h-full flex flex-col justify-between space-y-8">
                 <div className="space-y-4">
                    <h2 className="text-[12px] font-black text-white/40 uppercase tracking-[0.2em]">Personal Schedule</h2>
                    <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 text-center space-y-4">
                       <div className="w-16 h-16 bg-white/5 rounded-full mx-auto flex items-center justify-center text-white/10">
                          <Calendar size={32} />
                       </div>
                       <div>
                          <p className="text-[14px] font-black text-white">No Meetings Remaining</p>
                          <p className="text-[11px] text-white/20 font-medium py-1">Enjoy your focused afternoon, Jan.</p>
                       </div>
                    </div>
                 </div>
                 
                 <div className="p-6 rounded-3xl bg-primary/10 border border-primary/20 space-y-4">
                    <div className="flex items-center gap-3 text-primary">
                       <Shapes size={20} />
                       <span className="text-[12px] font-black uppercase tracking-wider">Quick Note</span>
                    </div>
                    <textarea 
                      placeholder="Type a quick thought..."
                      className="w-full bg-transparent border-none outline-none text-white/60 text-[13px] font-medium placeholder:text-white/10 resize-none h-20"
                    />
                 </div>
              </div>
           </div>

        </div>

        {/* Bottom Banner */}
        <div className="p-12 bento-item bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent relative overflow-hidden group">
           <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-colors" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left">
                 <div className="p-3 bg-white/5 w-fit rounded-2xl mx-auto md:mx-0">
                    <Gamepad2 className="text-primary" size={24} />
                 </div>
                 <h2 className="text-2xl font-black text-white tracking-tighter">Codegnan Labs</h2>
                 <p className="text-[13px] text-white/30 font-medium max-w-md">Explore our playground of internal experimental tools and productivity hacks.</p>
              </div>
              <button className="px-8 py-4 bg-white text-black text-[12px] font-black rounded-2xl hover:scale-105 transition-transform flex items-center gap-3">
                OPEN LABS <ArrowRight size={16} />
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="h-full deep-space-bg text-white text-sm overflow-hidden font-sans selection:bg-primary/30 selection:text-white">
      <HomeOverview />
    </div>
  );
}
