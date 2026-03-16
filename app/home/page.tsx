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
  Clock,
  ChevronRight,
  HandMetal,
  Shapes,
  Gamepad2,
  PieChart,
  CloudSun,
  MapPin,
  CheckCircle2,
  Circle
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
      <Clock size={12} className="text-[#22d3ee]" />
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  );
}

function WeatherWidget() {
  return (
    <div className="flex items-center gap-4 text-white/30 font-bold text-[11px] uppercase tracking-widest">
      <div className="flex items-center gap-1.5">
        <MapPin size={12} className="text-primary" />
        <span>Hyderabad, IN</span>
      </div>
      <div className="w-px h-3 bg-white/10" />
      <div className="flex items-center gap-1.5">
        <CloudSun size={12} className="text-amber-400" />
        <span>28°C • Sunny</span>
      </div>
    </div>
  );
}

function PulseChart() {
  const points = [40, 70, 45, 90, 65, 85, 50, 75, 60, 95];
  return (
    <div className="h-24 w-full flex items-end gap-1 px-2 pt-4 group">
      {points.map((h, i) => (
        <div 
          key={i} 
          className="flex-1 bg-primary/20 rounded-t-sm group-hover:bg-primary/40 transition-all duration-500 relative"
          style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }}
        >
          <div 
            className="absolute top-0 left-0 right-0 h-1 bg-primary shadow-[0_0_8px_rgba(34,211,238,0.5)] opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
      ))}
    </div>
  );
}

function HomeOverview() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Review Q1 Sales Report", completed: false, priority: "high" },
    { id: 2, text: "Team Sync: New Portal Features", completed: true, priority: "med" },
    { id: 3, text: "Update Student Placement Logs", completed: false, priority: "high" },
    { id: 4, text: "Refresh Partner Outreach", completed: false, priority: "low" },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-4 animate-entrance">
          <div className="space-y-4">
             <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full w-fit">
                   <DigitalClock />
                </div>
                <WeatherWidget />
             </div>
             <div className="flex items-center gap-4">
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter flex items-center gap-3">
                   Hello, Jan <HandMetal className="text-amber-400" size={40} style={{ animation: "subtleFloat 4s ease-in-out infinite" }} />
                </h1>
             </div>
             <p className="text-lg text-white/30 font-medium">Your workspace is optimized and ready for today's goals.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-md flex flex-col gap-2 min-w-[160px] group overflow-hidden relative">
                <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest relative z-10">Engagement Pulse</p>
                <div className="flex items-baseline gap-2 relative z-10">
                   <p className="text-2xl font-black text-white">+14.2%</p>
                   <TrendingUp size={14} className="text-emerald-400" />
                </div>
                <PulseChart />
             </div>
             <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-md flex flex-col gap-4 min-w-[160px] group">
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Active Goals</p>
                   <p className="text-2xl font-black text-white">12 / 15</p>
                </div>
                <div className="flex -space-x-2">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020617] bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/40 shadow-xl">
                        {String.fromCharCode(64 + i)}
                     </div>
                   ))}
                   <div className="w-8 h-8 rounded-full border-2 border-[#020617] bg-primary/20 flex items-center justify-center text-[10px] font-black text-primary">
                      +3
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Application Hub */}
        <div className="space-y-6 animate-entrance [animation-delay:0.1s]">
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
              {appShortcuts.map((app, idx) => (
                <div key={app.id} className="bento-item group cursor-pointer hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.2)]" style={{ animationDelay: `${idx * 0.1}s` }}>
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

        {/* Feed & Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-entrance [animation-delay:0.2s]">
           
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

           {/* Interactive Tasks */}
           <div className="bento-item">
              <div className="p-8 h-full flex flex-col justify-between space-y-8">
                 <div className="space-y-6">
                    <div className="flex items-center justify-between">
                       <h2 className="text-[12px] font-black text-white/40 uppercase tracking-[0.2em]">Priority Tasks</h2>
                       <button className="p-1 hover:text-primary transition-colors">
                          <Shapes size={14} />
                       </button>
                    </div>
                    <div className="space-y-3">
                       {tasks.map(task => (
                         <div 
                           key={task.id} 
                           onClick={() => toggleTask(task.id)}
                           className={`p-4 rounded-2xl flex items-center gap-3 cursor-pointer transition-all border ${task.completed ? 'bg-white/[0.01] border-transparent opacity-40' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                         >
                           {task.completed ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Circle size={18} className="text-white/20" />}
                           <div className="flex-1 min-w-0">
                              <p className={`text-[12px] font-bold truncate ${task.completed ? 'line-through text-white/40' : 'text-white'}`}>
                                 {task.text}
                              </p>
                              {!task.completed && (
                                <span className={`text-[8px] font-black uppercase tracking-tighter ${task.priority === 'high' ? 'text-rose-500' : task.priority === 'med' ? 'text-amber-500' : 'text-white/20'}`}>
                                   {task.priority} Priority
                                </span>
                              )}
                           </div>
                         </div>
                       ))}
                    </div>
                 </div>
                 
                 <div className="p-6 rounded-3xl bg-primary/10 border border-primary/20 space-y-4">
                    <div className="flex items-center gap-3 text-primary">
                       <Zap size={20} />
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
        <div className="p-12 bento-item bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent relative overflow-hidden group animate-entrance [animation-delay:0.3s]">
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
