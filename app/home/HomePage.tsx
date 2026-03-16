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
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hours12 = (hours % 12 || 12).toString().padStart(2, '0');
      setTime(`${hours12}:${minutes} ${ampm}`);
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
        <span className="text-[11px] font-black uppercase tracking-widest">Vijayawada, IN</span>
      </div>
      <div className="w-px h-3 bg-slate-200" />
      <div className="flex items-center gap-2">
        <CloudSun size={12} className="text-amber-500" />
        <span className="text-[11px] font-black uppercase tracking-widest text-slate-900">28°C • Sunny</span>
      </div>
    </div>
  );
}

export function HomeOverview() {
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
              Hello, Jan Saida Shaik <span className="inline-block animate-bounce-subtle text-primary cursor-default">🤘</span>
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
            { id: 'crm', title: 'CRM', desc: 'Manage leads & deals', icon: (
              <svg width="24" height="24" viewBox="0 0 1024 1024" fill="currentColor">
                <path d="M701.8,834.2c-85.4,0-165.9-33.1-226.6-93.2l-0.1-0.1L297.8,563.6c-20.6-20.7-32-48.1-31.9-77.3s11.6-56.6,32.4-77.1c20.5-20.3,47.7-31.4,76.5-31.4c0.1,0,0.2,0,0.3,0c29,0.1,56.2,11.4,76.7,31.9l162.5,162.5c19,19,50.1,19.1,69.2,0.2c9.3-9.2,14.5-21.6,14.6-34.8c0-13.2-5.1-25.5-14.4-34.8L506.5,325.5c-49.4-48.8-114.8-75.7-184.3-75.7c-0.2,0-0.4,0-0.6,0c-71.1,0.2-137.5,28.1-186.9,78.6c-49.5,50.6-76,117.7-74.6,188.8c1.4,68.9,29.2,133.5,78.5,181.8c49.3,48.4,114.5,75.1,183.7,75.1c25.3,0,50.4-3.6,74.4-10.7c15.9-4.7,32.6,4.4,37.3,20.3c4.7,15.9-4.4,32.6-20.3,37.3c-29.6,8.7-60.3,13.2-91.4,13.2c-84.9,0-165.1-32.8-225.7-92.2C36,682.5,1.7,603.2,0.1,518.5c-0.9-44.1,7-87,23.3-127.5c15.8-39.1,38.8-74.2,68.3-104.5c29.5-30.2,64.1-53.9,102.8-70.6c40.1-17.2,82.8-26,126.9-26.1c0.2,0,0.5,0,0.8,0c85.4,0,165.9,33.1,226.6,93.1l0.1,0.1l177.2,177.2c20.7,20.7,32,48.2,31.9,77.4s-11.6,56.7-32.3,77.2c-42.5,42.1-111.5,41.9-153.8-0.4L409.4,452c-19-19-49.9-19-68.9-0.2c-9.3,9.2-14.5,21.5-14.5,34.6s5,25.5,14.3,34.7l177.2,177.2c49.3,48.8,114.8,75.7,184.3,75.7c70,0,135.8-27.2,185.3-76.7s76.8-115.2,76.9-185.2c0.1-70-27.2-135.9-76.8-185.5s-115.4-77-185.4-77c-22.3,0-44.5,2.8-65.8,8.3c-3.1,0.8-6.2,1.7-9.3,2.6c-15.9,4.7-32.6-4.3-37.3-20.2s4.3-32.6,20.2-37.3c3.8-1.1,7.6-2.2,11.4-3.2c26.3-6.8,53.5-10.2,80.9-10.2c43.5,0,85.7,8.5,125.4,25.4c38.4,16.3,72.8,39.5,102.4,69.2c29.6,29.6,52.8,64.1,69,102.5c16.8,39.8,25.3,82,25.3,125.5c-0.1,86-33.7,166.8-94.5,227.6C868.7,800.7,787.8,834.2,701.8,834.2z"/>
              </svg>
            ), color: 'bg-blue-600' },
            { id: 'finance', title: 'Finance', desc: 'Accounts & invoices', icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3h12"/>
                <path d="M6 8h12"/>
                <path d="m6 13 8.5 8"/>
                <path d="M6 13h3"/>
                <path d="M9 13c6.667 0 6.667-10 0-10"/>
              </svg>
            ), color: 'bg-emerald-600' },
            { id: 'helpdesk', title: 'Help Desk', desc: 'Support & tickets', icon: <MessageSquare size={24} />, color: 'bg-orange-600' },
            { id: 'analytics', title: 'Analytics', desc: 'Reports & insights', icon: <PieChart size={24} />, color: 'bg-rose-600' },
          ].map((app) => (
            <div key={app.id} className="bento-item p-8 group cursor-pointer">
              <div className={`w-12 h-12 rounded-2xl ${app.color} text-white flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300 mb-6`}>
                {app.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">{app.title}</h3>
              <p className="text-slate-950 text-sm font-black mb-6 uppercase tracking-wider">{app.desc}</p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary group-hover:translate-x-1 transition-transform">
                Go to App <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Activity & Priority Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white border-2 border-slate-900 text-slate-900 shadow-sm">
                <Zap size={18} />
              </div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900">Live Activity Hub</h2>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">Live Update</span>
            </div>
          </div>
          
          <div className="bento-item overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors ${i !== 3 ? 'border-b border-slate-100' : ''}`}>
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 uppercase text-[10px] font-black text-slate-900">
                  {i === 1 ? <Zap size={16} /> : <Clock size={16} />}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-black text-slate-900 line-clamp-1">System maintenance completed successfully</p>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-600">Auto-pilot processed • {i * 2} mins ago</p>
                </div>
                <div className="flex items-center gap-2 h-10">
                  <div className="w-8 h-4 rounded-full bg-slate-200 p-0.5 cursor-pointer">
                    <div className="w-3 h-3 rounded-full bg-white shadow-sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white border-2 border-slate-900 text-slate-900 shadow-sm">
                <CheckCircle2 size={18} />
              </div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900">Priority Tasks</h2>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <Filter size={16} />
            </button>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                onClick={() => toggleTask(task.id)}
                className={`bento-item p-4 flex items-center gap-4 cursor-pointer group transition-all duration-300 ${task.completed ? 'opacity-60 grayscale' : ''}`}
              >
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 group-hover:border-primary'}`}>
                  {task.completed && <CheckCircle2 size={12} />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-black text-slate-900 ${task.completed ? 'line-through' : ''}`}>{task.text}</p>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-600">{task.time}</p>
                </div>
                {task.priority === 'high' && !task.completed && (
                  <div className="w-1 h-1 rounded-full bg-rose-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Status Bar Footer */}
      <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Systems Operational</span>
          </div>
          <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest opacity-60">v 4.2.0 Stable</span>
        </div>
        
        <div className="flex items-center gap-8 text-[10px] font-black text-slate-900 uppercase tracking-widest opacity-80">
          <span className="flex items-center gap-2 hover:opacity-100 cursor-pointer transition-opacity">
            <Shapes size={12} className="text-primary" /> Global Network
          </span>
          <span className="flex items-center gap-2 hover:opacity-100 cursor-pointer transition-opacity">
            <Zap size={12} className="text-primary" /> Secure Connection
          </span>
          <span className="flex items-center gap-2 hover:opacity-100 cursor-pointer transition-opacity">
            <Clock size={12} className="text-primary" /> Edge Optimized
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-900">
           <div className="flex items-center gap-3 opacity-60">
             <Gamepad2 size={16} className="cursor-pointer hover:opacity-100 transition-opacity" />
             <TrendingUp size={16} className="cursor-pointer hover:opacity-100 transition-opacity" />
             <MessageSquare size={16} className="cursor-pointer hover:opacity-100 transition-opacity" />
           </div>
           <div className="w-px h-4 bg-slate-200 mx-2" />
           <span className="text-[10px] font-black uppercase tracking-[0.1em]">© 2026 Codegnan</span>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <HomeOverview />
    </div>
  );
}
