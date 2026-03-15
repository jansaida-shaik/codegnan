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
import { useState } from "react";

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
    color: "text-blue-600",
    bg: "bg-blue-50/50",
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
  },
  {
    id: "finance",
    href: "/finance",
    label: "Finance",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M15 9.5a4 4 0 0 0-6 3.5c0 2 1.5 3 3 3.5s3 1.5 3 3.5a4 4 0 0 1-6 0"/>
        <line x1="12" y1="7" x2="12" y2="17"/>
      </svg>
    ),
    color: "text-sky-600",
    bg: "bg-sky-50/50",
  },
  {
    id: "hr",
    href: "/hr",
    label: "HR",
    icon: (
      <svg width="15" height="15" viewBox="0 0 1024 1024" fill="currentColor">
        <path d="M512,1024c-7.7,0-15.4-2.9-21.2-8.8L367,891.4c-5.6-5.6-8.8-13.3-8.8-21.2s3.2-15.6,8.8-21.2l123.8-123.8c11.7-11.7,30.7-11.7,42.4,0L657,849c5.6,5.6,8.8,13.3,8.8,21.2s-3.2,15.6-8.8,21.2l-123.8,123.8C527.4,1021.1,519.7,1024,512,1024z M430.6,870.2l81.4,81.4l81.4-81.4L512,788.8L430.6,870.2z"/>
        <path d="M755.9,780.6c-7.7,0-15.4-2.9-21.2-8.8L611.1,648.3c-5.6-5.6-8.8-13.3-8.8-21.2s3.2-15.6,8.8-21.2l38.4-38.3c36.7-36.7,56.9-85.4,56.9-137.3c0-51.8-20.2-100.6-56.9-137.3l-0.2-0.2c-75.7-75.7-198.8-75.7-274.5,0l-0.1,0.1c-30.1,30.1-49.1,68.1-55,110.1c-5.7,40.6,1.7,82.8,21,118.7c7.8,14.6,2.3,32.8-12.3,40.6c-14.6,7.8-32.8,2.3-40.6-12.3c-25.2-47.1-34.9-102.3-27.5-155.4c7.7-55,32.6-104.8,72-144.1l0.1-0.1c48-48,111.9-74.5,179.7-74.5c67.9,0,131.7,26.4,179.7,74.4l0.2,0.2c48,48,74.4,111.8,74.4,179.7c0,67.9-26.4,131.7-74.4,179.7l-17.1,17.1l81.1,81.1l17.4-17.4c69.8-69.8,108.2-162.6,108.2-261.3S843.1,238,773.3,168.2C703.5,98.4,610.7,60,512,60S320.5,98.4,250.7,168.2C180.9,238,142.5,330.8,142.5,429.5c0,98.7,38.4,191.5,108.2,261.3l17.4,17.4l102.3-102.3c11.7-11.7,30.7-11.7,42.4,0c11.7,11.7,11.7,30.7,0,42.4L289.3,771.8c-11.7,11.7-30.7,11.7-42.4,0l-38.7-38.6c-41-41-72.7-88.8-94.4-142.1C93,539.6,82.5,485.3,82.5,429.5c0-55.8,10.6-110.1,31.5-161.6c21.6-53.3,53.4-101.1,94.4-142.1c41-41,88.8-72.7,142.1-94.3C401.8,10.6,456.2,0,512,0c55.8,0,110.2,10.6,161.6,31.5c53.3,21.6,101.1,53.4,142.1,94.3c41,41,72.7,88.8,94.4,142.1c20.9,51.5,31.5,105.8,31.5,161.6c0,55.8-10.6,110.1-31.5,161.6c-21.6,53.3-53.4,101.1-94.4,142.1l-38.7,38.7C771.2,777.7,763.5,780.6,755.9,780.6z"/>
      </svg>
    ),
    color: "text-red-600",
    bg: "bg-red-50/50",
  },
  {
    id: "projects",
    href: "/projects",
    label: "Projects",
    icon: (
      <svg width="15" height="15" viewBox="0 0 1024 1024">
        <path fill="#F7B21B" d="M395.9,928c-7.7,0-15.4-2.9-21.2-8.8L182.9,727.4c-11.7-11.7-11.7-30.7,0-42.4c11.7-11.7,30.7-11.7,42.4,0l191.8,191.8c11.7,11.7,11.7,30.7,0,42.4C411.3,925.1,403.6,928,395.9,928z"/>
        <path fill="#F7B21B" d="M396.1,579.7c-7.7,0-15.3-2.9-21.2-8.8l-192-191.5c-11.7-11.7-11.8-30.7-0.1-42.4c11.7-11.7,30.7-11.8,42.4-0.1l192,191.5c11.7,11.7,11.8,30.7,0.1,42.4C411.5,576.8,403.8,579.7,396.1,579.7z"/>
        <path fill="#F7B21B" d="M395.9,754c-7.7,0-15.4-2.9-21.2-8.8L183.3,553.8c-11.7-11.7-11.7-30.7,0-42.4c11.7-11.7,30.7-11.7,42.4,0l191.4,191.4c11.7,11.7,11.7,30.7,0,42.4C411.3,751,403.6,754,395.9,754z"/>
        <path fill="#236EB4" d="M619.5,704.4c-7.7,0-15.4-2.9-21.2-8.8c-11.7-11.7-11.7-30.7,0-42.4l374.4-374.4c11.7-11.7,30.7-11.7,42.4,0c11.7,11.7,11.7,30.7,0,42.4L640.7,695.6C634.9,701.5,627.2,704.4,619.5,704.4z"/>
        <path fill="#236EB4" d="M619.5,530.4c-7.7,0-15.4-2.9-21.2-8.8c-11.7-11.7-11.7-30.7,0-42.4L864.5,213l-44.6-44.6L640.8,347.5c-11.7,11.7-30.7,11.7-42.4,0c-11.7-11.7-11.7-30.7,0-42.4l200.3-200.3c5.6-5.6,13.3-8.8,21.2-8.8c8,0,15.6,3.2,21.2,8.8l87,87c11.7,11.7,11.7,30.7,0,42.4L640.7,521.6C634.9,527.4,627.2,530.4,619.5,530.4z"/>
        <path fill="#049949" d="M396.1,579.7c-7.7,0-15.4-2.9-21.2-8.8c-11.7-11.7-11.7-30.7,0-42.4l223.4-223.4c11.7-11.7,30.7-11.7,42.4,0c11.7,11.7,11.7,30.7,0,42.4L417.4,570.9C411.5,576.8,403.8,579.7,396.1,579.7z"/>
        <path fill="#049949" d="M395.9,754c-7.7,0-15.4-2.9-21.2-8.8c-11.7-11.7-11.7-30.7,0-42.4l223.6-223.6c11.7-11.7,30.7-11.7,42.4,0c11.7,11.7,11.7,30.7,0,42.4L417.1,745.2C411.3,751,403.6,754,395.9,754z"/>
        <path fill="#049949" d="M395.9,928c-7.7,0-15.4-2.9-21.2-8.8c-11.7-11.7-11.7-30.7,0-42.4l223.6-223.6c11.7-11.7,30.7-11.7,42.4,0c11.7,11.7,11.7,30.7,0,42.4L417.1,919.2C411.3,925.1,403.6,928,395.9,928z"/>
        <path fill="#E32628" d="M204.1,736.2c-7.7,0-15.4-2.9-21.2-8.8l-174-174c-5.6-5.6-8.8-13.3-8.8-21.2s3.2-15.6,8.8-21.2l174-174c11.7-11.7,30.7-11.7,42.4,0c11.7,11.7,11.7,30.7,0,42.4L72.5,532.2L225.3,685c11.7,11.7,11.7,30.7,0,42.4C219.5,733.3,211.8,736.2,204.1,736.2z"/>
      </svg>
    ),
    color: "text-amber-600",
    bg: "bg-amber-50/50",
  },
  {
    id: "helpdesk",
    href: "/helpdesk",
    label: "Help Desk",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
        <circle cx="12" cy="12" r="10"/>
      </svg>
    ),
    color: "text-emerald-600",
    bg: "bg-emerald-50/50",
  },
  {
    id: "analytics",
    href: "/analytics",
    label: "Analytics",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    color: "text-rose-600",
    bg: "bg-rose-50/50",
  },
  {
    id: "marketing",
    href: "/marketing",
    label: "Marketing",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5L6 9H2v6h4l5 4V5z"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      </svg>
    ),
    color: "text-pink-600",
    bg: "bg-pink-50/50",
  },
];

export default function TopBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-50 h-[56px] flex items-center px-4 lg:px-6 glass border-b border-white/20 shadow-sm overflow-hidden">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 -ml-2 mr-2 text-gray-500 hover:text-gray-900 transition-colors"
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
            width={100}
            height={28}
            className="object-contain"
            priority
          />
        </div>

        {/* Divider - Desktop Only */}
        <div className="hidden lg:block h-6 w-px bg-gray-200/50 mr-6 shrink-0" />

        {/* App Switcher - Desktop Only */}
        <div className="hidden lg:flex items-center gap-1 flex-1 overflow-x-auto no-scrollbar">
          {apps.map((app) => {
            const isActive = pathname.startsWith(app.href);
            return (
              <button
                key={app.id}
                onClick={() => router.push(app.href)}
                className={`
                  relative flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-300 whitespace-nowrap shrink-0 group
                  ${isActive ? `${app.bg} ${app.color} shadow-sm border border-white/40` : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"}
                `}
              >
                <span className={`transition-all duration-300 group-hover:scale-110 shrink-0 ${isActive ? "text-current" : "text-gray-400 group-hover:text-gray-600"}`}>
                  {app.icon}
                </span>
                {app.label}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-current" />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile Active App Indicator */}
        <div className="flex-1 lg:hidden flex items-center justify-center">
            {apps.map(app => pathname.startsWith(app.href) && (
                <div key={app.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-bold ${app.bg} ${app.color}`}>
                    {app.icon}
                    {app.label}
                </div>
            ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 lg:gap-4 ml-auto shrink-0">
          {/* Search - Desktop Only */}
          <div className="relative group hidden xl:block">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <Search size={14} />
            </div>
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="h-9 w-40 bg-gray-100/50 border border-transparent focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-500/5 rounded-xl pl-9 pr-12 text-[12px] transition-all focus:w-56 outline-none font-medium text-gray-900"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-gray-200 bg-white/50 text-[10px] text-gray-400 font-mono">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>

          <div className="flex items-center gap-0.5 lg:gap-1.5">
            <button className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-white transition-all border border-transparent hover:border-gray-100 hover:shadow-sm">
              <Settings size={18} />
            </button>
            <button className="relative p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-white transition-all border border-transparent hover:border-gray-100 hover:shadow-sm">
              <Bell size={18} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-200/50 mx-1 shrink-0" />

          {/* User Profile */}
          <button className="flex items-center gap-2 p-1 rounded-2xl hover:bg-white transition-all border border-transparent hover:border-gray-100 hover:shadow-sm group">
            <div className="w-8 lg:w-9 h-8 lg:h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-md shadow-primary/20 flex items-center justify-center text-white text-[13px] font-bold shrink-0">
              J
            </div>
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-[12px] lg:text-[13px] font-bold text-gray-800 group-hover:text-primary transition-colors whitespace-nowrap">Jan Saida Shaik</span>
            </div>
            <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors hidden sm:block" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
            <div className="absolute inset-0 bg-sapphire/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="absolute top-0 left-0 w-[280px] h-full bg-white shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <Image src="/Codegnan Logo R New.png" alt="Codegnan" width={110} height={30} />
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
                <div className="p-6 border-t border-gray-100 bg-gray-50/50">
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