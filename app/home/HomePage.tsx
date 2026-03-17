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
  Gamepad2,
  Mail,
  Search,
  MoreVertical,
  Calendar,
  AtSign,
  Globe,
  ChevronDown,
  ChevronUp,
  X,
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  Video,
  Star,
  Trophy,
  Medal,
  Award,
  Phone,
  Copy
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";



const getWeatherConfig = (code: number) => {
  // WMO Weather interpretation codes (WW)
  if (code === 0) return { label: 'Sunny', icon: <Sun size={12} className="text-amber-500" /> };
  if (code <= 3) return { label: 'Cloudy', icon: <CloudSun size={12} className="text-amber-500" /> };
  if (code <= 48) return { label: 'Foggy', icon: <Cloud size={12} className="text-slate-400" /> };
  if (code <= 67) return { label: 'Rainy', icon: <CloudRain size={12} className="text-blue-400" /> };
  if (code <= 77) return { label: 'Snowy', icon: <Snowflake size={12} className="text-blue-200" /> };
  if (code <= 82) return { label: 'Showers', icon: <CloudRain size={12} className="text-blue-500" /> };
  if (code <= 99) return { label: 'Stormy', icon: <CloudLightning size={12} className="text-purple-500" /> };
  return { label: 'Sunny', icon: <Sun size={12} className="text-amber-500" /> };
};

function WeatherWidget() {
  const [weather, setWeather] = useState<{ temp: number; code: number } | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=16.50&longitude=80.64&current_weather=true');
        const data = await res.json();
        if (data.current_weather) {
          setWeather({
            temp: Math.round(data.current_weather.temperature),
            code: data.current_weather.weathercode
          });
        }
      } catch (err) {
        console.error('Weather fetch error:', err);
      }
    };
    fetchWeather();
    // Refresh weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const config = weather ? getWeatherConfig(weather.code) : { label: 'Sunny', icon: <Sun size={12} className="text-amber-500" /> };

  return (
    <div className="flex items-center gap-4 px-3 py-1.5 rounded-xl bg-white border-2 border-slate-200 text-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-2">
        <MapPin size={12} className="text-primary" />
        <span className="text-[11px] font-black uppercase tracking-widest">Vijayawada, IN</span>
      </div>
      <div className="w-px h-3 bg-slate-200" />
      <div className="flex items-center gap-2">
        {config.icon}
        <span className="text-[11px] font-black uppercase tracking-widest text-slate-900">
          {weather ? `${weather.temp}°C` : '28°C'} • {config.label}
        </span>
      </div>
    </div>
  );
}

export function HomeOverview() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isTeamExpanded, setIsTeamExpanded] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [tasks, setTasks] = useState([
    { id: 1, text: "Quarterly alignment meeting", time: "10:30 AM", priority: "high", completed: false },
    { id: 2, text: "Review CRM leads migration", time: "1:15 PM", priority: "medium", completed: true },
    { id: 3, text: "Security audit - Q1 protocol", time: "4:00 PM", priority: "high", completed: false },
  ]);

  const teamMembers = [
    { 
      name: "Jan Saida Shaik", 
      role: "Super Admin", 
      status: "offline", 
      initial: "JS", 
      color: "text-blue-600", 
      bg: "bg-blue-50",
      email: "jansaida@codegnan.com",
      phone: "9705243061",
      userid: "600381",
      location: "Vijayawada, IN",
      rating: 5,
      badges: ["Founder", "Direct"],
      awards: [<Trophy size={12} />, <Award size={12} />]
    },
    { 
      name: "Anush Kumar", 
      role: "Associate Admin", 
      status: "offline", 
      initial: "AK", 
      color: "text-blue-600", 
      bg: "bg-blue-50",
      email: "anush@codegnan.com",
      phone: "9876543210",
      userid: "600382",
      location: "Hyderabad, IN",
      rating: 4.8,
      badges: ["Admin", "Sync"],
      awards: [<Medal size={12} />]
    },
    { 
      name: "Battula Kranthi Kumar", 
      role: "Hyderabad Counsellor", 
      status: "offline", 
      initial: "BK", 
      color: "text-emerald-600", 
      bg: "bg-emerald-50",
      email: "kranthi@codegnan.com",
      phone: "9123456789",
      userid: "600383",
      location: "Hyderabad, IN",
      rating: 4.9,
      badges: ["Top Seller", "Coach"],
      awards: [<Trophy size={12} />, <Star size={12} />]
    },
    { 
      name: "Bhanu Satish Kotha", 
      role: "Associate Admin", 
      status: "offline", 
      initial: "BS", 
      color: "text-amber-600", 
      bg: "bg-amber-50",
      email: "bhanu@codegnan.com",
      phone: "9000000000",
      userid: "600384",
      location: "Vijayawada, IN",
      rating: 4.7,
      badges: ["Lead"],
      awards: [<Award size={12} />]
    },
    { 
      name: "Deva Anil Pedda", 
      role: "Vijayawada Counsellor", 
      status: "offline", 
      initial: "DP", 
      color: "text-indigo-600", 
      bg: "bg-indigo-50",
      email: "anil@codegnan.com",
      phone: "9111111111",
      userid: "600385",
      location: "Vijayawada, IN",
      rating: 4.6,
      badges: ["Growth"],
      awards: [<Medal size={12} />]
    },
    { 
      name: "Sushmitha", 
      role: "Front Desk Vijayawada", 
      status: "offline", 
      initial: "SM", 
      color: "text-rose-600", 
      bg: "bg-rose-50",
      email: "sushmitha@codegnan.com",
      phone: "9222222222",
      userid: "600386",
      location: "Vijayawada, IN",
      rating: 4.5,
      badges: ["Support"],
      awards: [<Star size={12} />]
    },
    { 
      name: "Jaya Sri", 
      role: "Administrator", 
      status: "offline", 
      initial: "JS", 
      color: "text-cyan-600", 
      bg: "bg-cyan-50",
      email: "jayasri@codegnan.com",
      phone: "9333333333",
      userid: "600387",
      location: "Vijayawada, IN",
      rating: 4.7,
      badges: ["Admin", "Ops"],
      awards: [<Award size={12} />]
    },
    { 
      name: "Kala Sowmya Devara", 
      role: "Visakhapatnam Counsellor", 
      status: "offline", 
      initial: "KD", 
      color: "text-teal-600", 
      bg: "bg-teal-50",
      email: "kala@codegnan.com",
      phone: "9444444444",
      userid: "600388",
      location: "Vizag, IN",
      rating: 4.8,
      badges: ["Sales", "Vizag"],
      awards: [<Trophy size={12} />]
    },
    { 
      name: "Kondeti Sai Venkata Pavan", 
      role: "Hyderabad Counsellor", 
      status: "offline", 
      initial: "KP", 
      color: "text-purple-600", 
      bg: "bg-purple-50",
      email: "pavan@codegnan.com",
      phone: "9555555555",
      userid: "600389",
      location: "Hyderabad, IN",
      rating: 4.9,
      badges: ["Top Seller"],
      awards: [<Star size={12} />, <Medal size={12} />]
    },
    { 
      name: "Lakshmi Sowjanya", 
      role: "Front Desk Hyderabad", 
      status: "offline", 
      initial: "LS", 
      color: "text-pink-600", 
      bg: "bg-pink-50",
      email: "lakshmi@codegnan.com",
      phone: "9666666666",
      userid: "600390",
      location: "Hyderabad, IN",
      rating: 4.6,
      badges: ["Service"],
      awards: [<Award size={12} />]
    },
    { 
      name: "Modali Srinivas", 
      role: "Tele Caller", 
      status: "offline", 
      initial: "MS", 
      color: "text-slate-600", 
      bg: "bg-slate-50",
      email: "srinivas@codegnan.com",
      phone: "9777777777",
      userid: "600391",
      location: "Vijayawada, IN",
      rating: 4.4,
      badges: ["Leads"],
      awards: [<Star size={12} />]
    },
    { 
      name: "Monika", 
      role: "Vijayawada Counsellor", 
      status: "offline", 
      initial: "MT", 
      color: "text-orange-600", 
      bg: "bg-orange-50",
      email: "monika@codegnan.com",
      phone: "9888888888",
      userid: "600392",
      location: "Vijayawada, IN",
      rating: 4.8,
      badges: ["Top Talent"],
      awards: [<Trophy size={12} />]
    },
    { 
      name: "Narendra Modugumudi", 
      role: "Vijayawada Counsellor", 
      status: "offline", 
      initial: "NM", 
      color: "text-blue-600", 
      bg: "bg-blue-50",
      email: "narendra@codegnan.com",
      phone: "9999999999",
      userid: "600393",
      location: "Vijayawada, IN",
      rating: 4.7,
      badges: ["Sales"],
      awards: [<Medal size={12} />]
    },
    { 
      name: "Naveen Babu", 
      role: "Vijayawada Counsellor", 
      status: "offline", 
      initial: "NB", 
      color: "text-emerald-600", 
      bg: "bg-emerald-50",
      email: "naveen@codegnan.com",
      phone: "9000000001",
      userid: "600394",
      location: "Vijayawada, IN",
      rating: 4.6,
      badges: ["Support"],
      awards: [<Star size={12} />]
    },
    { 
      name: "Phanindra", 
      role: "Hyderabad Counsellor", 
      status: "offline", 
      initial: "PH", 
      color: "text-amber-600", 
      bg: "bg-amber-50",
      email: "phanindra@codegnan.com",
      phone: "9000000002",
      userid: "600395",
      location: "Hyderabad, IN",
      rating: 4.8,
      badges: ["Closing"],
      awards: [<Award size={12} />]
    },
    { 
      name: "Sasank Matta", 
      role: "Hyderabad Counsellor", 
      status: "offline", 
      initial: "SM", 
      color: "text-indigo-600", 
      bg: "bg-indigo-50",
      email: "sasank@codegnan.com",
      phone: "9000000003",
      userid: "600396",
      location: "Hyderabad, IN",
      rating: 4.7,
      badges: ["Sync"],
      awards: [<Trophy size={12} />]
    },
  ];

  const eventsData = [
    { title: "Batch Kickoff: Python Full Stack", time: "10:00 AM", date: "Today", location: "Vijayawada", icon: <Zap size={14} className="text-amber-500" /> },
    { title: "Weekly CRM Alignment", time: "02:30 PM", date: "Today", location: "Zoom Sync", icon: <Globe size={14} className="text-blue-500" /> },
    { title: "Hyderabad Campus Review", time: "04:00 PM", date: "Tomorrow", location: "Hyderabad", icon: <TrendingUp size={14} className="text-emerald-500" /> },
  ];

  const mentionsData = [
    { user: "Monika", initial: "MT", role: "Vijayawada Counsellor", text: "Jan, the Vijayawada batch leads are updated for this week.", time: "2m ago", color: "text-orange-600", bg: "bg-orange-100" },
    { user: "Battula Kranthi Kumar", initial: "BK", role: "Hyderabad Counsellor", text: "Report for Hyderabad Q1 enrollment is ready for review.", time: "15m ago", color: "text-emerald-600", bg: "bg-emerald-100" },
    { user: "Deva Anil Pedda", initial: "DP", role: "Vijayawada Counsellor", text: "New lead converted in the portal from the morning sync.", time: "2h ago", color: "text-indigo-600", bg: "bg-indigo-100" },
  ];

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 lg:p-10 space-y-10">
      {/* Personalized Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 px-2">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <WeatherWidget />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Hello, Jan Saida Shaik <span className="inline-block animate-bounce-subtle text-primary cursor-default">🤘</span>
            </h1>
            <p className="text-slate-600 font-bold text-base sm:text-lg max-w-xl">
              Your workspace is optimized and ready for today's goals.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:flex items-center gap-4">
          <div className="bento-item p-4 sm:p-6 flex flex-col items-center justify-center min-w-0 lg:min-w-[140px]">
            <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-2">Engagement Pulse</p>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-slate-900">+14.2%</span>
              <TrendingUp size={16} className="text-emerald-500" />
            </div>
            <div className="mt-4 flex items-end gap-1 h-8">
              {[4, 7, 5, 8, 6, 9, 7].map((h, i) => (
                <div key={i} className="w-1.5 sm:w-2 bg-primary rounded-full shadow-[0_0_8px_rgba(34,109,180,0.2)]" style={{ height: `${h * 10}%` }} />
              ))}
            </div>
          </div>
          <div className="bento-item p-4 sm:p-6 flex flex-col items-center justify-center min-w-0 lg:min-w-[140px]">
            <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-2">Active Goals</p>
            <div className="text-xl sm:text-2xl font-black text-slate-900">12 / 15</div>
            <div className="mt-4 flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-slate-900 bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-900 shadow-sm">
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
              <Shapes size={18} />
            </div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900">Application Hub</h2>
          </div>
          <button className="text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-primary transition-colors border-b border-slate-200 pb-0.5">Customize Grid</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              id: 'crm', title: 'CRM', desc: 'Manage leads & deals', icon: (
                <svg width="24" height="24" viewBox="0 0 1024 1024" fill="currentColor">
                  <path d="M701.8,834.2c-85.4,0-165.9-33.1-226.6-93.2l-0.1-0.1L297.8,563.6c-20.6-20.7-32-48.1-31.9-77.3s11.6-56.6,32.4-77.1c20.5-20.3,47.7-31.4,76.5-31.4c0.1,0,0.2,0,0.3,0c29,0.1,56.2,11.4,76.7,31.9l162.5,162.5c19,19,50.1,19.1,69.2,0.2c9.3-9.2,14.5-21.6,14.6-34.8c0-13.2-5.1-25.5-14.4-34.8L506.5,325.5c-49.4-48.8-114.8-75.7-184.3-75.7c-0.2,0-0.4,0-0.6,0c-71.1,0.2-137.5,28.1-186.9,78.6c-49.5,50.6-76,117.7-74.6,188.8c1.4,68.9,29.2,133.5,78.5,181.8c49.3,48.4,114.5,75.1,183.7,75.1c25.3,0,50.4-3.6,74.4-10.7c15.9-4.7,32.6,4.4,37.3,20.3c4.7,15.9-4.4,32.6-20.3,37.3c-29.6,8.7-60.3,13.2-91.4,13.2c-84.9,0-165.1-32.8-225.7-92.2C36,682.5,1.7,603.2,0.1,518.5c-0.9-44.1,7-87,23.3-127.5c15.8-39.1,38.8-74.2,68.3-104.5c29.5-30.2,64.1-53.9,102.8-70.6c40.1-17.2,82.8-26,126.9-26.1c0.2,0,0.5,0,0.8,0c85.4,0,165.9,33.1,226.6,93.1l0.1,0.1l177.2,177.2c20.7,20.7,32,48.2,31.9,77.4s-11.6,56.7-32.3,77.2c-42.5,42.1-111.5,41.9-153.8-0.4L409.4,452c-19-19-49.9-19-68.9-0.2c-9.3,9.2-14.5,21.5-14.5,34.6s5,25.5,14.3,34.7l177.2,177.2c49.3,48.8,114.8,75.7,184.3,75.7c70,0,135.8-27.2,185.3-76.7s76.8-115.2,76.9-185.2c0.1-70-27.2-135.9-76.8-185.5s-115.4-77-185.4-77c-22.3,0-44.5,2.8-65.8,8.3c-3.1,0.8-6.2,1.7-9.3,2.6c-15.9,4.7-32.6-4.3-37.3-20.2s4.3-32.6,20.2-37.3c3.8-1.1,7.6-2.2,11.4-3.2c26.3-6.8,53.5-10.2,80.9-10.2c43.5,0,85.7,8.5,125.4,25.4c38.4,16.3,72.8,39.5,102.4,69.2c29.6,29.6,52.8,64.1,69,102.5c16.8,39.8,25.3,82,25.3,125.5c-0.1,86-33.7,166.8-94.5,227.6C868.7,800.7,787.8,834.2,701.8,834.2z" />
                </svg>
              ), color: 'bg-blue-600'
            },
            {
              id: 'finance', title: 'Finance', desc: 'Accounts & invoices', icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h12" />
                  <path d="M6 8h12" />
                  <path d="m6 13 8.5 8" />
                  <path d="M6 13h3" />
                  <path d="M9 13c6.667 0 6.667-10 0-10" />
                </svg>
              ), color: 'bg-emerald-600'
            },
            { id: 'helpdesk', title: 'Help Desk', desc: 'Support & tickets', icon: <MessageSquare size={24} />, color: 'bg-orange-600' },
            { id: 'analytics', title: 'Analytics', desc: 'Reports & insights', icon: <PieChart size={24} />, color: 'bg-rose-600' },
          ].map((app) => (
            <div key={app.id} className="bento-item p-6 md:p-8 group cursor-pointer">
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl ${app.color} text-white flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300`}>
                  {app.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">{app.title}</h3>
              </div>
              <p className="text-slate-950 text-[11px] sm:text-sm font-black mb-4 sm:mb-6 uppercase tracking-wider">{app.desc}</p>
              <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-primary group-hover:translate-x-1 transition-transform">
                Go to App <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights Dashboard */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white border-2 border-slate-900 text-slate-900 shadow-sm">
              <TrendingUp size={18} />
            </div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900">Performance Insights</h2>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900">
            Across all modules
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: 'CRM Leads', value: '2,840', change: '+12.5%', detail: 'This Month Leads', color: 'text-blue-600', icon: (
                <svg width="16" height="16" viewBox="0 0 1024 1024" fill="currentColor">
                  <path d="M701.8,834.2c-85.4,0-165.9-33.1-226.6-93.2l-0.1-0.1L297.8,563.6c-20.6-20.7-32-48.1-31.9-77.3s11.6-56.6,32.4-77.1c20.5-20.3,47.7-31.4,76.5-31.4c0.1,0,0.2,0,0.3,0c29,0.1,56.2,11.4,76.7,31.9l162.5,162.5c19,19,50.1,19.1,69.2,0.2c9.3-9.2,14.5-21.6,14.6-34.8c0-13.2-5.1-25.5-14.4-34.8L506.5,325.5c-49.4-48.8-114.8-75.7-184.3-75.7c-0.2,0-0.4,0-0.6,0c-71.1,0.2-137.5,28.1-186.9,78.6c-49.5,50.6-76,117.7-74.6,188.8c1.4,68.9,29.2,133.5,78.5,181.8c49.3,48.4,114.5,75.1,183.7,75.1c25.3,0,50.4-3.6,74.4-10.7c15.9-4.7,32.6,4.4,37.3,20.3c4.7,15.9-4.4,32.6-20.3,37.3c-29.6,8.7-60.3,13.2-91.4,13.2c-84.9,0-165.1-32.8-225.7-92.2C36,682.5,1.7,603.2,0.1,518.5c-0.9-44.1,7-87,23.3-127.5c15.8-39.1,38.8-74.2,68.3-104.5c29.5-30.2,64.1-53.9,102.8-70.6c40.1-17.2,82.8-26,126.9-26.1c0.2,0,0.5,0,0.8,0c85.4,0,165.9,33.1,226.6,93.1l0.1,0.1l177.2,177.2c20.7,20.7,32,48.2,31.9,77.4s-11.6,56.7-32.3,77.2c-42.5,42.1-111.5,41.9-153.8-0.4L409.4,452c-19-19-49.9-19-68.9-0.2c-9.3,9.2-14.5,21.5-14.5,34.6s5,25.5,14.3,34.7l177.2,177.2c49.3,48.8,114.8,75.7,184.3,75.7c70,0,135.8-27.2,185.3-76.7s76.8-115.2,76.9-185.2c0.1-70-27.2-135.9-76.8-185.5s-115.4-77-185.4-77c-22.3,0-44.5,2.8-65.8,8.3c-3.1,0.8-6.2,1.7-9.3,2.6c-15.9,4.7-32.6-4.3-37.3-20.2s4.3-32.6,20.2-37.3c3.8-1.1,7.6-2.2,11.4-3.2c26.3-6.8,53.5-10.2,80.9-10.2c43.5,0,85.7,8.5,125.4,25.4c38.4,16.3,72.8,39.5,102.4,69.2c29.6,29.6,52.8,64.1,69,102.5c16.8,39.8,25.3,82,25.3,125.5c-0.1,86-33.7,166.8-94.5,227.6C868.7,800.7,787.8,834.2,701.8,834.2z" />
                </svg>
              )
            },
            {
              label: 'Finance', value: '₹12.4L', change: '+24.1%', detail: 'Revenue this month', color: 'text-emerald-600', icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h12" />
                  <path d="M6 8h12" />
                  <path d="m6 13 8.5 8" />
                  <path d="M6 13h3" />
                  <path d="M9 13c6.667 0 6.667-10 0-10" />
                </svg>
              )
            },
            { label: 'Help Desk', value: '2.4h', change: '-18.2%', detail: 'Avg Response Time', color: 'text-orange-600', icon: <MessageSquare size={16} /> },
            { label: 'Analytics', value: '1,280', change: '+8.4%', detail: 'Daily Active Users', color: 'text-rose-600', icon: <PieChart size={16} /> },
          ].map((insight, idx) => (
            <div key={idx} className="bento-item p-6 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center ${insight.color} border-2 border-slate-200 shadow-sm transition-all duration-300`}>
                    {insight.icon}
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{insight.label}</p>
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${insight.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                  {insight.change}
                </span>
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">{insight.value}</h4>
                <p className="text-[10px] font-black text-slate-950 opacity-70 flex items-center gap-1.5 uppercase tracking-tighter">
                  {insight.detail}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Counsellors Hub Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white border-2 border-slate-900 text-slate-900 shadow-sm">
              <Users2 size={18} />
            </div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900">Users Hub</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{teamMembers.filter(m => m.status === 'online').length} Online</span>
            </div>
            <button
              onClick={() => setIsTeamExpanded(!isTeamExpanded)}
              className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-slate-900 transition-colors border-b border-primary/20 pb-0.5"
            >
              {isTeamExpanded ? 'Compact View' : 'View Directory'}
            </button>
          </div>
        </div>

        <div className="bento-item p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.slice(0, 12).map((person, idx) => (
              <div key={person.name} className="relative">
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  onClick={() => setSelectedMember(selectedMember === person.name ? null : person.name)}
                  className={`bento-item p-4 flex items-center gap-4 group hover:shadow-2xl hover:border-primary transition-all duration-300 cursor-pointer relative z-10 ${selectedMember === person.name ? 'border-primary ring-2 ring-primary/10' : ''}`}
                >
                  {/* Avatar with Nested Status Dot */}
                  <div className="relative shrink-0">
                    <div className={`w-12 h-12 rounded-xl ${person.bg} border-2 border-slate-200 flex items-center justify-center text-[14px] font-black ${person.color} shadow-xs group-hover:border-primary/50 transition-colors`}>
                      {person.initial}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white shadow-xs ${person.status === 'online' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                  </div>

                  {/* Info Column */}
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[12px] font-black text-slate-900 tracking-tight uppercase truncate">
                        {person.name}
                      </h4>
                      {person.role === 'Super Admin' && (
                        <span className="text-[7px] font-black text-white bg-orange-500 px-1.5 py-0.5 rounded shadow-sm uppercase tracking-tighter">
                          Super Admin
                        </span>
                      )}
                    </div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest truncate">{person.role}</p>
                    <p className={`text-[8px] font-black uppercase tracking-widest ${person.status === 'online' ? 'text-emerald-500' : 'text-slate-400'}`}>
                      {person.status === 'online' ? 'Available' : 'Unavailable'}
                    </p>
                  </div>
                </motion.div>

                {/* Detailed Profile Card */}
                <AnimatePresence>
                  {selectedMember === person.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      className="absolute bottom-full left-0 mb-4 w-[280px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-slate-900 overflow-hidden z-[100]"
                      style={{ transformOrigin: 'bottom left' }}
                    >
                      {/* Close Button & Branded Header Area */}
                      <div className={`p-5 ${person.bg} border-b border-slate-200 relative`}>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedMember(null); }}
                          className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/80 border border-slate-200 text-slate-500 hover:text-rose-500 hover:border-rose-200 transition-all shadow-sm z-20"
                        >
                          <X size={14} />
                        </button>
                        
                        <div className="flex items-start justify-between">
                          <div className={`w-14 h-14 rounded-2xl bg-white border-2 border-slate-900 flex items-center justify-center text-xl font-black ${person.color} shadow-xl`}>
                            {person.initial}
                          </div>
                          <div className="flex gap-1.5 pt-1">
                            {person.awards?.map((award, i) => (
                              <div key={i} className="p-1.5 rounded-lg bg-white border border-slate-200 text-amber-500 shadow-sm">
                                {award}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4">
                          <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight leading-tight">{person.name}</h3>
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{person.role}</p>
                        </div>
                      </div>

                      {/* Detailed Stats Area with Copy Actions */}
                      <div className="p-5 space-y-4 bg-white">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between group/copy">
                            <div className="flex items-center gap-3">
                              <Mail size={12} className="text-slate-400" />
                              <span className="text-[10px] font-black text-slate-700">{person.email}</span>
                            </div>
                            <button 
                              onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(person.email); }}
                              className="text-slate-500 hover:text-primary transition-colors pr-1"
                            >
                              <Copy size={12} />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between group/copy">
                            <div className="flex items-center gap-3">
                              <Phone size={12} className="text-slate-400" />
                              <span className="text-[10px] font-black text-slate-700">{person.phone}</span>
                            </div>
                            <button 
                              onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(person.phone); }}
                              className="text-slate-500 hover:text-primary transition-colors pr-1"
                            >
                              <Copy size={12} />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-3 text-slate-400">
                            <MapPin size={12} />
                            <span className="text-[10px] font-black text-slate-700">{person.location}</span>
                          </div>
                        </div>

                        <div className="h-px bg-slate-100" />

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Performance</p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={10} 
                                  fill={i < Math.floor(person.rating || 0) ? "currentColor" : "none"}
                                  className={i < Math.floor(person.rating || 0) ? "text-amber-400" : "text-slate-200"} 
                                />
                              ))}
                              <span className="ml-1 text-[10px] font-black text-slate-900">{person.rating}</span>
                            </div>
                          </div>
                          <div className="text-right flex flex-col items-end">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">User ID</p>
                            <div className="flex items-center gap-1.5">
                              <p className="text-[10px] font-black text-slate-900">#{person.userid}</p>
                              <button 
                                onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(person.userid); }}
                                className="text-slate-500 hover:text-primary transition-colors"
                              >
                                <Copy size={10} />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {person.badges?.map((badge, i) => (
                            <span key={i} className="text-[8px] font-black text-slate-900 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg uppercase tracking-tighter">
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Centered Modal Directory */}
      <AnimatePresence>
        {isTeamExpanded && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTeamExpanded(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl max-h-[90vh] bento-item bg-white overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white border-2 border-slate-900 text-slate-900 shadow-sm">
                    <Users2 size={24} />
                  </div>
                  <div>
                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-900">Full Team Directory</h2>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">
                      {teamMembers.length} Members Total • {teamMembers.filter(m => m.status === 'online').length} Online Now
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsTeamExpanded(false)}
                  className="p-2 rounded-xl border-2 border-slate-200 hover:border-rose-500 hover:text-rose-500 transition-all duration-300 bg-white shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-8 no-scrollbar bg-slate-50/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {teamMembers.map((person, idx) => (
                    <div key={person.name} className="relative">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.01 }}
                        onClick={() => setSelectedMember(`modal-${person.name}`)}
                        className={`bento-item p-4 flex items-center gap-4 bg-white hover:shadow-2xl hover:border-primary transition-all duration-300 cursor-pointer relative z-10 ${selectedMember === `modal-${person.name}` ? 'border-primary ring-2 ring-primary/10' : ''}`}
                      >
                        <div className="relative shrink-0">
                          <div className={`w-12 h-12 rounded-xl ${person.bg} border-2 border-slate-200 flex items-center justify-center text-[14px] font-black ${person.color} shadow-xs`}>
                             {person.initial}
                          </div>
                          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white shadow-xs ${person.status === 'online' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                        </div>

                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h4 className="text-[12px] font-black text-slate-900 tracking-tight uppercase truncate">{person.name}</h4>
                          </div>
                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest truncate">{person.role}</p>
                          <p className={`text-[8px] font-black uppercase tracking-widest ${person.status === 'online' ? 'text-emerald-500' : 'text-slate-400'}`}>
                            {person.status === 'online' ? 'Available' : 'Unavailable'}
                          </p>
                        </div>
                      </motion.div>

                      {/* Detailed Profile Card (Modal Specific) */}
                      <AnimatePresence>
                        {selectedMember === `modal-${person.name}` && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                            className="absolute bottom-full left-0 mb-4 w-[280px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-slate-900 overflow-hidden z-[110]"
                            style={{ transformOrigin: 'bottom left' }}
                          >
                            {/* Close Button & Header */}
                            <div className={`p-5 ${person.bg} border-b border-slate-200 relative`}>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setSelectedMember(null); }}
                                className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/80 border border-slate-200 text-slate-500 hover:text-rose-500 hover:border-rose-200 transition-all shadow-sm z-20"
                              >
                                <X size={14} />
                              </button>
                              
                              <div className="flex items-start justify-between">
                                <div className={`w-14 h-14 rounded-2xl bg-white border-2 border-slate-900 flex items-center justify-center text-xl font-black ${person.color} shadow-xl`}>
                                  {person.initial}
                                </div>
                                <div className="flex gap-1.5 pt-1">
                                  {person.awards?.map((award, i) => (
                                    <div key={i} className="p-1.5 rounded-lg bg-white border border-slate-200 text-amber-500 shadow-sm">
                                      {award}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="mt-4">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight leading-tight">{person.name}</h3>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{person.role}</p>
                              </div>
                            </div>

                            <div className="p-5 space-y-4 bg-white">
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <Mail size={12} className="text-slate-400" />
                                    <span className="text-[10px] font-black text-slate-700">{person.email}</span>
                                  </div>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(person.email); }}
                                    className="text-slate-500 hover:text-primary transition-colors"
                                  >
                                    <Copy size={12} />
                                  </button>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <Phone size={12} className="text-slate-400" />
                                    <span className="text-[10px] font-black text-slate-700">{person.phone}</span>
                                  </div>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(person.phone); }}
                                    className="text-slate-500 hover:text-primary transition-colors"
                                  >
                                    <Copy size={12} />
                                  </button>
                                </div>
                              </div>
                              
                              <div className="h-px bg-slate-100" />
                              
                              <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Performance</p>
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i} 
                                        size={10} 
                                        fill={i < Math.floor(person.rating || 0) ? "currentColor" : "none"}
                                        className={i < Math.floor(person.rating || 0) ? "text-amber-400" : "text-slate-200"} 
                                      />
                                    ))}
                                    <span className="ml-1 text-[10px] font-black text-slate-900">{person.rating}</span>
                                  </div>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">User ID</p>
                                  <div className="flex items-center gap-1.5">
                                    <p className="text-[10px] font-black text-slate-900">#{person.userid}</p>
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(person.userid); }}
                                      className="text-slate-500 hover:text-primary transition-colors"
                                    >
                                      <Copy size={10} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>


            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Operations Hub - New Modules based on Reference */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white border-2 border-slate-900 text-slate-900 shadow-sm">
              <Globe size={18} />
            </div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900">Global Operations Hub</h2>
          </div>
        </div>

        {/* Top Metric Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'All Leads Count', value: '1,05,988', icon: <Users size={16} />, color: 'text-blue-600', bg: 'bg-blue-100/50' },
            { label: 'All Contacts Count', value: '7,049', icon: <Users2 size={16} />, color: 'text-emerald-600', bg: 'bg-emerald-100/50' },
            { label: 'All Tasks Count', value: '1,693', icon: <CheckCircle2 size={16} />, color: 'text-rose-600', bg: 'bg-rose-100/50' },
            { label: 'Avg Meeting Score', value: '92%', icon: <Video size={16} />, color: 'text-amber-600', bg: 'bg-amber-100/50' },
          ].map((item, i) => (
            <div key={i} className="bento-item p-4 flex flex-col items-center justify-center text-center group relative min-h-[120px]">
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg ${item.bg} border-2 border-slate-200 flex items-center justify-center shadow-sm ${item.color}`}>
                    {item.icon}
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.label}</p>
                </div>
                <button className="text-slate-300 hover:text-slate-900 transition-colors"><MoreVertical size={14} /></button>
              </div>
              <div className="mt-8">
                <h4 className="text-3xl font-black text-slate-900 tracking-tight">{item.value}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Main Operational Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Financials */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Total Payables */}
              <div className="bento-item p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900">
                    <TrendingDown size={16} className="text-rose-600" />
                    <span className="text-[11px] font-black uppercase tracking-widest">Total Payables</span>
                  </div>
                  <MoreVertical size={14} className="text-slate-300" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 sm:p-4 rounded-xl bg-blue-100/50 border-2 border-slate-200 shadow-md flex flex-col items-center justify-center text-center">
                    <p className="text-primary font-black text-base sm:text-lg">₹5,41,084</p>
                    <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Current</p>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl bg-rose-100/50 border-2 border-slate-200 shadow-md flex flex-col items-center justify-center text-center">
                    <p className="text-rose-600 font-black text-base sm:text-lg">₹1.55Cr</p>
                    <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Overdue</p>
                  </div>
                </div>
              </div>

              {/* Total Receivables */}
              <div className="bento-item p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900">
                    <TrendingUp size={16} className="text-emerald-600" />
                    <span className="text-[11px] font-black uppercase tracking-widest">Total Receivables</span>
                  </div>
                  <MoreVertical size={14} className="text-slate-300" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 sm:p-4 rounded-xl bg-blue-100/50 border-2 border-slate-200 shadow-md flex flex-col items-center justify-center text-center">
                    <p className="text-primary font-black text-base sm:text-lg">₹4,52,500</p>
                    <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Current</p>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl bg-rose-100/50 border-2 border-slate-200 shadow-md flex flex-col items-center justify-center text-center">
                    <p className="text-rose-600 font-black text-base sm:text-lg">₹51.6Cr</p>
                    <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Overdue</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Events */}
              <div className="bento-item p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900">
                    <Calendar size={16} className="text-primary" />
                    <span className="text-[11px] font-black uppercase tracking-widest">Events</span>
                  </div>
                  <MoreVertical size={14} className="text-slate-300" />
                </div>
                <div className="space-y-3">
                  {eventsData.map((event, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 4 }}
                      className="p-3 rounded-xl bg-white border border-slate-100 hover:border-primary/30 shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                          {event.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[11px] font-black text-slate-900 truncate tracking-tight">{event.title}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{event.time}</span>
                            <span className="text-[8px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded uppercase tracking-tighter">{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mentions */}
              <div className="bento-item p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900">
                    <AtSign size={16} className="text-primary" />
                    <span className="text-[11px] font-black uppercase tracking-widest">Mentions</span>
                  </div>
                  <MoreVertical size={14} className="text-slate-300" />
                </div>
                <div className="space-y-3">
                  {mentionsData.map((mention, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 4 }}
                      className="p-3 rounded-xl bg-white border border-slate-100 hover:border-primary/30 shadow-sm transition-all group"
                    >
                      <div className="flex gap-3">
                        <div className={`w-8 h-8 rounded-lg ${mention.bg} border border-slate-200 flex items-center justify-center shadow-sm text-[10px] font-black ${mention.color} shrink-0`}>
                          {mention.initial}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <h4 className="text-[10px] font-black text-slate-900 truncate tracking-tight">{mention.user}</h4>
                            <span className="text-[8px] font-bold text-slate-400 tracking-tighter">{mention.time}</span>
                          </div>
                          <p className="text-[10px] font-bold text-slate-600 leading-tight line-clamp-2">
                            "{mention.text}"
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: All Mails */}
          <div className="bento-item p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-slate-900">
                <Mail size={16} className="text-primary" />
                <span className="text-[11px] font-black uppercase tracking-widest">All Mails</span>
              </div>
              <MoreVertical size={14} className="text-slate-300" />
            </div>
            <div className="flex-1 space-y-4">
              {[
                { sender: 'Zoho Books', subject: 'Webhook failure report', date: '15 Mar, 10:31 AM', initial: 'SU', color: 'text-blue-600', bg: 'bg-blue-100' },
                { sender: 'Evaluation', subject: 'Reminder: Your Trial Is Ending', date: '14 Mar, 06:56 PM', initial: 'EV', color: 'text-amber-600', bg: 'bg-amber-100' },
                { sender: 'Zoho Books', subject: 'Webhook failure report', date: '14 Mar, 10:31 AM', initial: 'SU', color: 'text-blue-600', bg: 'bg-blue-100' },
                { sender: 'Codegnan IT Solutions', subject: 'Inbox Link to Zoho', date: '13 Mar, 06:09 PM', initial: 'HA', color: 'text-emerald-600', bg: 'bg-emerald-100' },
              ].map((mail, i) => (
                <div key={i} className="group cursor-pointer bg-white p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${mail.bg} flex items-center justify-center text-[11px] font-black ${mail.color} uppercase shadow-md border-[2.5px] border-slate-300`}>
                      {mail.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className="text-[11px] font-black text-slate-900 truncate">{mail.sender}</p>
                        <span className="text-[9px] font-black text-slate-400 whitespace-nowrap">{mail.date}</span>
                      </div>
                      <p className="text-[10px] font-black text-slate-600 line-clamp-1 truncate">{mail.subject}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
              <div key={i} className={`p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors ${i !== 3 ? 'border-b border-slate-300' : ''}`}>
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
