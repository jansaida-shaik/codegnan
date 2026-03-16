"use client";

import React from "react";
import { 
  Globe, 
  ShieldCheck, 
  Cpu, 
  Zap,
  Github,
  Twitter,
  Linkedin,
  Mail
} from "lucide-react";

/*
- **Glassmorphism**: Consistent design with the rest of the application using `backdrop-blur`.

## Fixed Navigation

I have resolved the issue where the top navigation bar scrolled with the page content.
- **Fixed Header**: The navigation bar is now fixed at the top of the viewport (`z-index: 100`).
- **Global Layout Adjustment**: Added top padding to the application layout to ensure content doesn't start underneath the fixed header.

## Verification Results
*/
import { usePathname } from "next/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <div className="z-[100] h-10 bg-slate-100 border-t border-slate-200 px-4 md:px-6 flex items-center justify-between text-[11px] font-bold text-slate-900 overflow-hidden select-none shrink-0 border-b-none">
      {/* Left Side: System Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-2 py-0.5 rounded-lg bg-emerald-500 text-white shadow-sm shadow-emerald-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="font-black uppercase tracking-widest text-[9px]">Systems Operational</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-slate-900 font-black group">
          <Cpu size={12} className="group-hover:text-primary transition-colors" />
          <span>V 4.2.0 STABLE</span>
        </div>
      </div>

      {/* Center: Connectivity/Quick Info */}
      <div className="hidden lg:flex items-center gap-8">
        {[
          { icon: <Globe size={12} />, label: "Global Network" },
          { icon: <ShieldCheck size={12} />, label: "Secure Connection" },
          { icon: <Zap size={12} />, label: "Edge Optimized" }
        ].map((item, idx) => (
          <div key={idx} className="flex items-center gap-1.5 hover:text-primary transition-all duration-300 cursor-pointer group">
            <span className="text-slate-900 group-hover:text-primary transition-colors">{item.icon}</span>
            <span className="group-hover:translate-x-0.5 transition-transform uppercase tracking-widest">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Right Side: Copyright & Socials */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4 pr-4 border-r border-slate-300">
          {[Github, Twitter, Linkedin, Mail].map((Icon, idx) => (
            <Icon key={idx} size={13} className="text-slate-900 hover:text-primary transition-all duration-300 cursor-pointer hover:-translate-y-0.5" />
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-slate-900 font-black uppercase tracking-widest">
          <span className="">&copy; {currentYear}</span>
          <span className="font-black text-slate-900 tracking-tighter group cursor-default">
            Codegnan
            <span className="hidden xs:inline ml-1 text-slate-600 font-medium tracking-normal">Labs</span>
          </span>
        </div>
      </div>
    </div>
  );
}
