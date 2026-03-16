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
    <div className="z-[100] h-10 bg-slate-50 border-t border-slate-200 px-4 md:px-6 flex items-center justify-between text-[11px] font-medium text-slate-400 overflow-hidden select-none shrink-0 border-b-none shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
      {/* Left Side: System Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)] animate-pulse" />
          <span className="font-black uppercase tracking-widest text-[10px]">Systems Operational</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 opacity-60 group">
          <Cpu size={12} className="group-hover:text-primary transition-colors" />
          <span>v4.2.0-stable</span>
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
            <span className="text-slate-300 group-hover:text-primary transition-colors">{item.icon}</span>
            <span className="group-hover:translate-x-0.5 transition-transform">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Right Side: Copyright & Socials */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4 pr-4 border-r border-slate-200">
          {[Github, Twitter, Linkedin, Mail].map((Icon, idx) => (
            <Icon key={idx} size={13} className="hover:text-primary transition-all duration-300 cursor-pointer hover:-translate-y-0.5" />
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="opacity-60">&copy; {currentYear}</span>
          <span className="font-black text-slate-900 tracking-tighter uppercase group cursor-default">
            Codegnan
            <span className="hidden xs:inline ml-1 text-slate-400 font-medium lowercase tracking-normal">Resources PVT LTD.</span>
          </span>
        </div>
      </div>
    </div>
  );
}
