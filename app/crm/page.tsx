"use client";
import { 
  Users, 
  TrendingUp,
  Zap,
  MoreHorizontal,
  ChevronRight,
  ArrowUpRight,
  TrendingDown,
  Contact,
  DollarSign,
  Briefcase,
  History,
  PhoneCall,
  Mail,
  Plus,
  BarChart3,
  Search,
  Filter
} from "lucide-react";

function CRMWorkbench() {
  const leadUpdates = [
    { name: "Priya Sharma", company: "DataFlow Inc", value: "₹4.5L", status: "Negotiation", time: "10m ago", color: "bg-blue-500" },
    { name: "Rahul Verma", company: "Global Tech", value: "₹1.2L", status: "New Lead", time: "45m ago", color: "bg-emerald-500" },
    { name: "Suresh Reddy", company: "Creative Co", value: "₹8.8L", status: "Closing", time: "2h ago", color: "bg-amber-500" },
  ];

  const workbenchActions = [
    { label: "Add Lead", icon: <Plus size={16} />, color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    { label: "Log Call", icon: <PhoneCall size={16} />, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    { label: "Send Email", icon: <Mail size={16} />, color: "bg-primary/10 text-primary border-primary/20" },
    { label: "New Task", icon: <Briefcase size={16} />, color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 lg:px-12 py-8 lg:py-12 bg-transparent scrollbar-hide relative">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* CRM Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/5">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <Users size={20} className="text-blue-400" />
              </div>
              <h1 className="text-3xl font-black tracking-tight text-white uppercase tracking-widest text-[20px]">CRM Workbench</h1>
            </div>
            <p className="text-sm text-white/40 font-medium">Pipeline Management & Sales Intelligence</p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="relative group">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                <input type="text" placeholder="Search leads..." className="bg-white/5 pl-9 pr-4 py-2 text-[12px] font-bold text-white outline-none rounded-xl border border-white/5 w-48 focus:w-64 transition-all" />
             </div>
             <button className="p-2 bg-white/5 border border-white/5 rounded-xl text-white/40 hover:text-white transition-all">
                <Filter size={18} />
             </button>
          </div>
        </div>

        {/* Primary Pipeline Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: "Total Revenue", value: "₹14.2M", icon: <DollarSign size={20} />, trend: "+24%", trendUp: true },
             { label: "Conversion Rate", value: "18.5%", icon: <Zap size={20} />, trend: "+2.1%", trendUp: true },
             { label: "Active Deals", value: "142", icon: <Briefcase size={20} />, trend: "-4", trendUp: false },
             { label: "Avg Deal Size", value: "₹3.2L", icon: <BarChart3 size={20} />, trend: "+12%", trendUp: true },
           ].map((stat, i) => (
             <div key={i} className="bento-item group overflow-hidden">
                <div className="p-6 space-y-4">
                   <div className="flex items-center justify-between">
                      <div className="p-2 bg-white/5 rounded-lg text-white/40 group-hover:text-primary transition-colors">
                         {stat.icon}
                      </div>
                      <div className={`flex items-center gap-1 text-[10px] font-black ${stat.trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                         {stat.trendUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                         {stat.trend}
                      </div>
                   </div>
                   <div>
                      <h3 className="text-sm font-black text-white/20 uppercase tracking-widest">{stat.label}</h3>
                      <p className="text-2xl font-black text-white">{stat.value}</p>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Workbench Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {workbenchActions.map((action, i) => (
             <button key={i} className={`p-4 rounded-3xl border ${action.color} flex flex-col items-center justify-center gap-3 hover:scale-[1.02] transition-all hover:bg-current/[0.05]`}>
                <div className="p-3 rounded-2xl bg-current/[0.1] items-center justify-center">
                   {action.icon}
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest">{action.label}</span>
             </button>
           ))}
        </div>

        {/* Lead Feed & Conversion Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Recent Lead Pipeline */}
           <div className="lg:col-span-2 bento-item">
              <div className="p-8 space-y-8">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <History size={16} className="text-white/20" />
                       <h2 className="text-[12px] font-black text-white uppercase tracking-[0.2em]">Active Lead Pipeline</h2>
                    </div>
                    <button className="text-[10px] font-black text-primary uppercase tracking-widest">View All Leads</button>
                 </div>
                 
                 <div className="space-y-2">
                    {leadUpdates.map((lead, i) => (
                      <div key={i} className="flex items-center justify-between p-5 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-pointer group border border-transparent hover:border-white/5">
                         <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl ${lead.color} flex items-center justify-center text-white font-black text-sm`}>
                               {lead.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                               <p className="text-[14px] font-black text-white truncate">{lead.name}</p>
                               <p className="text-[11px] text-white/20 font-bold uppercase truncate">{lead.company}</p>
                            </div>
                         </div>
                         <div className="hidden md:block text-right">
                            <p className="text-[14px] font-black text-white">{lead.value}</p>
                            <p className="text-[10px] text-emerald-400 font-bold uppercase">{lead.status}</p>
                         </div>
                         <div className="flex items-center gap-4 ml-8">
                            <span className="text-[10px] text-white/10 font-bold uppercase">{lead.time}</span>
                            <ArrowUpRight size={14} className="text-white/10 group-hover:text-primary transition-colors" />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Conversion Trends */}
           <div className="bento-item">
              <div className="p-8 space-y-8">
                 <h2 className="text-[12px] font-black text-white/40 uppercase tracking-[0.2em]">Goal Progression</h2>
                 
                 <div className="space-y-6">
                    {[
                      { l: "Monthly Goal", v: "₹85L / ₹1.2Cr", p: 70, c: "bg-blue-500" },
                      { l: "Lead Target", v: "420 / 500", p: 84, c: "bg-emerald-500" },
                      { l: "New Deals", v: "18 / 25", p: 72, c: "bg-amber-500" },
                    ].map((goal, i) => (
                      <div key={i} className="space-y-2">
                         <div className="flex justify-between items-baseline">
                            <p className="text-[11px] font-black text-white/40 uppercase tracking-widest">{goal.l}</p>
                            <p className="text-[11px] font-black text-white tracking-widest">{goal.v}</p>
                         </div>
                         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full ${goal.c} rounded-full transition-all duration-1000`} style={{ width: `${goal.p}%` }} />
                         </div>
                      </div>
                    ))}
                 </div>

                 <div className="p-6 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-center space-y-2 mt-4">
                    <p className="text-[13px] font-black text-white tracking-tighter">Accelerated Growth Phase</p>
                    <p className="text-[11px] text-blue-400/60 font-medium">You are trending 14% higher than last month.</p>
                 </div>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}

export default function CRMPage() {
  return (
    <div className="h-full deep-space-bg text-white text-sm overflow-hidden font-sans selection:bg-primary/30 selection:text-white">
      <CRMWorkbench />
    </div>
  );
}
