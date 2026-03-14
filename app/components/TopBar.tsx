"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

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
  },
  {
    id: "crm",
    href: "/crm",
    label: "CRM",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M15 7h1c2.76 0 5 2.24 5 5s-2.24 5-5 5h-1" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M9 17H8c-2.76 0-5-2.24-5-5s2.24-5 5-5h1" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M8 12h8" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "finance",
    href: "/finance",
    label: "Finance",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="3" y="3" width="18" height="18" rx="4" strokeWidth="2.5"/>
        <path d="M9 8h3a2 2 0 012 2v0a2 2 0 01-2 2H9m0 0h3a2 2 0 012 2v0a2 2 0 01-2 2H9m0-8v8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "hr",
    href: "/hr",
    label: "HR",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" strokeWidth="2"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 3.13a4 4 0 010 7.75" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "projects",
    href: "/projects",
    label: "Projects",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 13l2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "helpdesk",
    href: "/helpdesk",
    label: "Help Desk",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 11-7.6-7.6 8.38 8.38 0 013.8.9L22 4l-2.5 7.5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "analytics",
    href: "/analytics",
    label: "Analytics",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <line x1="18" y1="20" x2="18" y2="10" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="12" y1="20" x2="12" y2="4" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="6" y1="20" x2="6" y2="14" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "marketing",
    href: "/marketing",
    label: "Marketing",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function TopBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="bg-white border-b border-gray-200 h-12 flex items-center px-4 gap-2 shrink-0 shadow-sm">
      {/* Logo — clicking goes to Spark home */}
      <div
        className="flex items-center shrink-0 mr-3 cursor-pointer"
        onClick={() => router.push("/home")}
      >
        <Image
          src="/Codegnan Logo R New.png"
          alt="Codegnan Logo"
          width={150}
          height={40}
          className="object-contain"
        />
      </div>

      {/* App Switcher */}
      <div className="flex items-center gap-2 border-r border-gray-200 pr-3 mr-2">
        {apps.map((app) => {
          const isActive = pathname.startsWith(app.href);
          return (
            <button
              key={app.id}
              onClick={() => router.push(app.href)}
              title={app.label}
              className={`flex items-center justify-center px-4 py-1.5 rounded-lg text-sm font-medium transition-all gap-2 ${
                isActive
                  ? "bg-blue-700 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <div className={
                isActive 
                  ? "text-white" 
                  : app.id === "home" ? "text-blue-700" :
                    app.id === "crm" ? "text-blue-700" :
                    app.id === "finance" ? "text-blue-700" :
                    app.id === "hr" ? "text-red-600" :
                    app.id === "projects" ? "text-green-600" :
                    app.id === "helpdesk" ? "text-cyan-600" :
                    app.id === "analytics" ? "text-orange-600" :
                    app.id === "marketing" ? "text-red-700" : ""
              }>
                {app.icon}
              </div>
              <span>{app.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right icons + user */}
      <div className="flex-1" />
      <div className="flex items-center gap-3 text-gray-600">
        <svg className="w-4 h-4 cursor-pointer hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <svg className="w-4 h-4 cursor-pointer hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <svg className="w-4 h-4 cursor-pointer hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center">J</div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-800 group-hover:text-blue-700 transition-colors leading-none">Jan Saida Shaik</span>
            <span className="text-[10px] text-gray-600 font-medium mt-0.5">Super Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
