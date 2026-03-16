"use client";
import { 
  Users, 
  CreditCard, 
  MessageSquare,
  LayoutGrid,
  Zap,
  TrendingUp,
  Clock,
  ChevronRight,
  HandMetal,
  Shapes,
  PieChart,
  CloudSun,
  MapPin,
  CheckCircle2,
  Circle,
  Filter,
  Users2,
  TrendingDown,
  ArrowRight,
  Gamepad2
} from "lucide-react";
import { useState, useEffect } from "react";

function DigitalClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-sm">
      <Clock size={12} className="text-primary" />
      <span className="text-[11px] font-black tracking-tighter">{time}</span>
    </div>
  );
}

function WeatherWidget() {
  return (
    <div className="flex items-center gap-4 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-sm">
      <div className="flex items-center gap-2">
        <MapPin size={12} className="text-primary" />
        <span className="text-[11px] font-black uppercase tracking-widest">Hyderabad, IN</span>
      </div>
      <div className="w-px h-3 bg-slate-200" />
      <div className="flex items-center gap-2">
        <CloudSun size={12} className="text-amber-500" />
        <span className="text-[11px] font-black uppercase tracking-widest text-slate-900">28°C • Sunny</span>
      </div>
    </div>
  );
}

function HomeOverview() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Quarterly alignment meeting", time: "10:30 AM", priority: "high", completed: false },
    { id: 2, text: "Review CRM leads migration", time: "1:15 PM", priority: "medium", completed: true },
    { id: 3, text: "Security audit - Q1 protocol", time: "4:00 PM", priority: "high", completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 lg:p-10 space-y-10">
      {/* Personalized Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 px-2">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <DigitalClock />
            <div className="w-2 h-2 rounded-full bg-slate-400" />
            <WeatherWidget />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Hello, Jan <span className="inline-block animate-bounce-subtle text-primary cursor-default">🤘</span>
            </h1>
            <p className="text-slate-600 font-bold text-lg max-w-xl">
              Your workspace is optimized and ready for today's goals.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bento-item p-6 flex flex-col items-center justify-center min-w-[140px]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-2">Engagement Pulse</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-slate-900">+14.2%</span>
              <TrendingUp size={16} className="text-emerald-500" />
            </div>
            <div className="mt-4 flex items-end gap-1 h-8">
              {[4, 7, 5, 8, 6, 9, 7].map((h, i) => (
                <div key={i} className="w-2 bg-primary rounded-full shadow-[0_0_8px_rgba(34,109,180,0.2)]" style={{ height: `${h * 10}%` }} />
              ))}
            </div>
          </div>
          <div className="bento-item p-6 flex flex-col items-center justify-center min-w-[140px]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-2">Active Goals</p>
            <div className="text-2xl font-black text-slate-900">12 / 15</div>
            <div className="mt-4 flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-900 shadow-sm">
                  {i === 4 ? "+3" : String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Feature Hub */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white border-2 border-slate-900 text-slate-900 shadow-sm">
              <LayoutGrid size={18} />
            </div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900">Application Hub</h2>
          </div>
          <button className="text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-primary transition-colors border-b border-slate-900 pb-0.5">Customize Grid</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 'crm', title: 'CRM', desc: 'Manage leads & deals', icon: <Users size={24} />, color: 'bg-blue-600' },
            { id: 'finance', title: 'Finance', desc: 'Accounts & invoices', icon: <CreditCard size={24} />, color: 'bg-emerald-600' },
            { id: 'helpdesk', title: 'Help Desk', desc: 'Support & tickets', icon: <MessageSquare size={24} />, color: 'bg-orange-600' },
            { id: 'analytics', title: 'Analytics', desc: 'Reports & insights', icon: <PieChart size={24} />, color: 'bg-rose-600' },
          ].map((app) => (
            <div key={app.id} className="bento-item p-8 group cursor-pointer">
              <div className={`w-12 h-12 rounded-2xl ${app.color} text-white flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300 mb-6`}>
                {app.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">{app.title}</h3>
              <p className="text-slate-950 text-sm font-black mb-6 uppercase tracking-wider">{app.desc}</p>
              <div className="flex items-center gap-2 group/btn cursor-pointer">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary group-hover/btn:mr-2 transition-all">Go to App</span>
                <ChevronRight size={10} className="text-primary opacity-0 group-hover/btn:opacity-100 transition-all border border-primary rounded-full p-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Content Layer */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Activity Feed */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center gap-3 px-2">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900">Live Activity Hub</h2>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-[10px] font-black text-emerald-600 uppercase tracking-tighter border border-emerald-100 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Update
            </div>
          </div>
          <div className="bento-item divide-y divide-slate-100 overflow-hidden">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-slate-900 flex items-center justify-center text-slate-900 group-hover:bg-primary group-hover:text-white transition-all">
                    <Zap size={18} />
                  </div>
                  <div>
                    <p className="text-[13px] font-black text-slate-900">System maintenance completed successfully</p>
                    <p className="text-[11px] text-slate-950 font-black uppercase tracking-tight">Auto-pilot processed • 2 mins ago</p>
                  </div>
                </div>
                <div className="flex -space-x-1">
                  {[1, 2].map(j => (
                    <div key={j} className="w-6 h-6 rounded-full border border-slate-900 bg-slate-200" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900">Priority Tasks</h2>
            <Filter size={14} className="text-slate-900" />
          </div>
          <div className="bento-item p-4 space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer ${task.completed ? "bg-slate-50 opacity-60" : "bg-white border border-slate-50 shadow-sm hover:border-primary/20"}`}
              >
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${task.completed ? "bg-primary border-primary" : "border-slate-200"}`}>
                  {task.completed && <CheckCircle2 size={12} className="text-white" />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-black ${task.completed ? "text-slate-400 line-through" : "text-slate-900"}`}>{task.text}</p>
                  <p className="text-[10px] text-slate-950 font-black uppercase tracking-[0.2em]">{task.time}</p>
                </div>
                {!task.completed && <div className={`w-1.5 h-1.5 rounded-full ${task.priority === 'high' ? 'bg-rose-500' : 'bg-amber-500'}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Creative Banner */}
      <div className="bento-item p-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="relative z-10 space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-100 text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
            Premium Access
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none italic">
            Empower your team with <span className="text-primary">advanced neural insights.</span>
          </h2>
          <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-primary transition-all duration-300 shadow-xl shadow-slate-900/10 active:scale-95">
            Upgrade Intelligence
          </button>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border-[40px] border-slate-100/50 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 selection:bg-primary/20 selection:text-primary animate-entrance overflow-x-hidden">
      <HomeOverview />
    </div>
  );
}
