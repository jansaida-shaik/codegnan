"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { 
  Home, 
  Search, 
  Bell, 
  ChevronDown, 
  Settings, 
  LayoutGrid, 
  MessageSquare, 
  Menu, 
  X 
} from "lucide-react";
import { useState, useEffect } from "react";

const apps = [
  {
    id: "home",
    href: "/home",
    label: "Home",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    color: "text-[#226DB4]",
    bg: "bg-[#226DB4]/10",
    activeBg: "bg-[#226DB4]",
  },
  {
    id: "crm",
    href: "/crm",
    label: "CRM",
    icon: (
      <svg width="15" height="15" viewBox="0 0 1024 1024" fill="currentColor">
        <path d="M701.8,834.2c-85.4,0-165.9-33.1-226.6-93.2l-0.1-0.1L297.8,563.6c-20.6-20.7-32-48.1-31.9-77.3s11.6-56.6,32.4-77.1c20.5-20.3,47.7-31.4,76.5-31.4c0.1,0,0.2,0,0.3,0c29,0.1,56.2,11.4,76.7,31.9l162.5,162.5c19,19,50.1,19.1,69.2,0.2c9.3-9.2,14.5-21.6,14.6-34.8c0-13.2-5.1-25.5-14.4-34.8L506.5,325.5c-49.4-48.8-114.8-75.7-184.3-75.7c-0.2,0-0.4,0-0.6,0c-71.1,0.2-137.5,28.1-186.9,78.6c-49.5,50.6-76,117.7-74.6,188.8c1.4,68.9,29.2,133.5,78.5,181.8c49.3,48.4,114.5,75.1,183.7,75.1c25.3,0,50.4-3.6,74.4-10.7c15.9-4.7,32.6,4.4,37.3,20.3c4.7,15.9-4.4,32.6-20.3,37.3c-29.6,8.7-60.3,13.2-91.4,13.2c-84.9,0-165.1-32.8-225.7-92.2C36,682.5,1.7,603.2,0.1,518.5c-0.9-44.1,7-87,23.3-127.5c15.8-39.1,38.8-74.2,68.3-104.5c29.5-30.2,64.1-53.9,102.8-70.6c40.1-17.2,82.8-26,126.9-26.1c0.2,0,0.5,0,0.8,0c85.4,0,165.9,33.1,226.6,93.1l0.1,0.1l177.2,177.2c20.7,20.7,32,48.2,31.9,77.4s-11.6,56.7-32.3,77.2c-42.5,42.1-111.5,41.9-153.8-0.4L409.4,452c-19-19-49.9-19-68.9-0.2c-9.3,9.2-14.5,21.5-14.5,34.6s5,25.5,14.3,34.7l177.2,177.2c49.3,48.8,114.8,75.7,184.3,75.7c70,0,135.8-27.2,185.3-76.7s76.8-115.2,76.9-185.2c0.1-70-27.2-135.9-76.8-185.5s-115.4-77-185.4-77c-22.3,0-44.5,2.8-65.8,8.3c-3.1,0.8-6.2,1.7-9.3,2.6c-15.9,4.7-32.6-4.3-37.3-20.2s4.3-32.6,20.2-37.3c3.8-1.1,7.6-2.2,11.4-3.2c26.3-6.8,53.5-10.2,80.9-10.2c43.5,0,85.7,8.5,125.4,25.4c38.4,16.3,72.8,39.5,102.4,69.2c29.6,29.6,52.8,64.1,69,102.5c16.8,39.8,25.3,82,25.3,125.5c-0.1,86-33.7,166.8-94.5,227.6C868.7,800.7,787.8,834.2,701.8,834.2z"/>
      </svg>
    ),
    color: "text-blue-600",
    bg: "bg-blue-50/50",
    activeBg: "bg-blue-600",
  },
  {
    id: "finance",
    href: "/finance",
    label: "Finance",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12"/>
        <path d="M6 8h12"/>
        <path d="m6 13 8.5 8"/>
        <path d="M6 13h3"/>
        <path d="M9 13c6.667 0 6.667-10 0-10"/>
      </svg>
    ),
    color: "text-sky-600",
    bg: "bg-sky-50/50",
    activeBg: "bg-emerald-600",
  },
  {
    id: "helpdesk",
    href: "/helpdesk",
    label: "Help Desk",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    color: "text-orange-600",
    bg: "bg-orange-50/50",
    activeBg: "bg-orange-600",
  },
  {
    id: "analytics",
    href: "/analytics",
    label: "Analytics",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
        <path d="M22 12A10 10 0 0 0 12 2v10z"/>
      </svg>
    ),
    color: "text-rose-600",
    bg: "bg-rose-50/50",
    activeBg: "bg-rose-600",
  },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [modifierKey, setModifierKey] = useState("");

  useEffect(() => {
    const isMac = typeof window !== "undefined" && 
      (/Mac|iPod|iPhone|iPad/.test(navigator.userAgent) || navigator.platform.includes('Mac'));
    setModifierKey(isMac ? "⌘" : "Ctrl");
  }, []);

  if (pathname === "/") return null;

  return (
    <>
      <div className="z-[100] h-[64px] flex items-center px-4 lg:px-6 bg-white border-b border-slate-200 shrink-0">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 -ml-2 mr-2 text-slate-400 hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Logo */}
        <div
          className="flex items-center shrink-0 cursor-pointer mr-2 lg:mr-6 hover:opacity-80 transition-opacity"
          onClick={() => router.push("/home")}
        >
          <Image
            src="/Codegnan Logo R New.png"
            alt="Codegnan"
            width={200}
            height={56}
            className="object-contain h-7 w-auto"
            priority
            unoptimized
          />
        </div>

        <div className="hidden lg:block w-4" />

        {/* App Switcher - Desktop Only */}
        <div className="hidden lg:flex items-center gap-1 flex-1 overflow-x-auto no-scrollbar py-2">
          {apps.map((app) => {
            const isActive = pathname.startsWith(app.href);
            return (
              <div key={app.id} className="p-1">
                <button
                  onClick={() => router.push(app.href)}
                  className={`
                    relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-black whitespace-nowrap shrink-0 group transition-all duration-300
                    ${isActive 
                      ? `${app.activeBg} text-white shadow-md shadow-black/10 scale-105` 
                      : "text-slate-900 hover:bg-slate-200/50"}
                  `}
                >
                  <span className={`shrink-0 transition-colors duration-300 ${isActive ? "text-white" : "text-slate-900 group-hover:text-primary"}`}>
                    {app.icon}
                  </span>
                  {app.label}
                </button>
              </div>
            );
          })}
        </div>

        {/* Mobile Active App Indicator */}
        <div className="flex-1 lg:hidden flex items-center justify-center">
            {apps.map(app => pathname.startsWith(app.href) && (
                <div key={app.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-black ${app.activeBg} text-white shadow-sm`}>
                    {app.icon}
                    {app.label}
                </div>
            ))}
        </div>

        {/* Right Side */}
        {/* Desktop Search & Actions */}
        <div className="hidden lg:flex items-center gap-4 ml-6">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-900 group-focus-within:text-primary transition-colors" size={14} />
            <input 
              type="text" 
              placeholder="Search command..."
              className="pl-9 pr-12 py-2 bg-white border border-slate-400 rounded-xl text-[12px] font-black text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all w-64 shadow-sm"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-300 bg-slate-50 text-[10px] text-slate-900 font-black uppercase tracking-tighter">
              {modifierKey} K
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-900 hover:text-primary hover:bg-slate-200/50 rounded-xl transition-all relative group">
              <Settings size={18} />
            </button>
            <button className="p-2 text-slate-900 hover:text-primary hover:bg-slate-200/50 rounded-xl transition-all relative group">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white shadow-sm"></span>
            </button>
          </div>

          <div className="w-2" />

          <div className="flex items-center gap-3 pl-2 group cursor-pointer">
            <div className="text-right">
              <p className="text-[11px] font-black text-slate-900 tracking-tight group-hover:text-primary transition-colors">Jan Saida Shaik</p>
              <p className="text-[9px] font-black text-slate-900 uppercase tracking-widest leading-none mt-0.5 opacity-80">Super Admin</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center text-[13px] font-black text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-all duration-300">
              J
            </div>
            <ChevronDown size={14} className="text-slate-900 group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
            <div className="absolute inset-0 bg-sapphire/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="absolute top-0 left-0 w-[280px] h-full bg-white shadow-2xl flex flex-col">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <Image src="/Codegnan Logo R New.png" alt="Codegnan" width={220} height={60} unoptimized className="h-8 w-auto" />
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-gray-900"><X size={20} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    <p className="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Applications</p>
                    {apps.map((app) => {
                        const isActive = pathname.startsWith(app.href);
                        return (
                            <button
                                key={app.id}
                                onClick={() => {
                                    router.push(app.href);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`
                                    w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[14px] font-bold transition-all
                                    ${isActive ? `${app.bg} ${app.color}` : "text-gray-600 hover:bg-gray-50"}
                                `}
                            >
                                <span className="shrink-0">{app.icon}</span>
                                {app.label}
                                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-current" />}
                            </button>
                        );
                    })}
                </div>
                <div className="p-6 border-t border-gray-100 bg-white">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold">J</div>
                        <div>
                            <p className="text-sm font-bold text-gray-900 leading-none">Jan Saida Shaik</p>
                            <p className="text-[11px] text-gray-500 font-medium">Super Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </>
  );
}