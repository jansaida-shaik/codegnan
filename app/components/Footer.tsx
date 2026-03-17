"use client";

import React from "react";
import {
  Globe,
  ShieldCheck,
  Cpu,
  Zap,
  Github,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Copyright,
  Sun,
  Moon,
  BookText
} from "lucide-react";

const XIcon = ({ size = 13, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z" />
  </svg>
);

const TelegramIcon = ({ size = 13, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

/*
- **Glassmorphism**: Consistent design with the rest of the application using `backdrop-blur`.

## Fixed Navigation

I have resolved the issue where the top navigation bar scrolled with the page content.
- **Fixed Header**: The navigation bar is now fixed at the top of the viewport (`z-index: 100`).
- **Global Layout Adjustment**: Added top padding to the application layout to ensure content doesn't start underneath the fixed header.

## Verification Results
*/
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

function LiveFooterClock() {
  const [dateTime, setDateTime] = React.useState("");
  
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      };
      setDateTime(now.toLocaleString('en-US', options).replace(',', ' •'));
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 text-slate-900">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      <span className="font-black uppercase tracking-widest text-[9px] whitespace-nowrap">
        {dateTime || "Initializing..."}
      </span>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const { theme, toggleTheme, toggleNotebook } = useTheme();

  if (pathname === "/") return null;

  return (
    <div className="z-[100] h-10 bg-white border-t border-slate-200 px-4 md:px-6 flex items-center justify-between text-[11px] font-bold text-slate-900 overflow-hidden select-none shrink-0 border-b-none">
      {/* Left Side: Live Date & Time */}
      <div className="flex items-center gap-4 text-slate-900">
        <LiveFooterClock />
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
            <span className="text-slate-900 group-hover:text-primary group-hover:translate-x-0.5 transition-all uppercase tracking-widest">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Right Side: Copyright & Socials */}
      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
        <div className="flex md:flex items-center gap-1 sm:gap-2 pr-2 sm:pr-4 border-r border-slate-300">
          {[
            { icon: <Github size={13} />, hoverColor: "hover:text-[#24292f]" },
            { icon: <XIcon size={11} />, hoverColor: "hover:text-black" },
            { icon: <Instagram size={13} />, hoverColor: "hover:text-[#E1306C]" },
            { icon: <Facebook size={13} />, hoverColor: "hover:text-[#1877F2]" },
            { icon: <Linkedin size={13} />, hoverColor: "hover:text-[#0077B5]" },
            { icon: <Youtube size={13} />, hoverColor: "hover:text-[#FF0000]" },
          {icon: <TelegramIcon size={13} />, hoverColor: "hover:text-[#24A1DE]"},
          {icon: <Mail size={13} />, hoverColor: "hover:text-[#EA4335]"}
        ].map((item, idx) => (
          <div key={idx} className={`text-slate-900 ${item.hoverColor} transition-all duration-300 cursor-pointer hover:-translate-y-0.5 p-0.5 sm:p-1 rounded-md hover:bg-slate-50`} title={item.hoverColor.split(':')[1]}>
            {item.icon}
          </div>
        ))}
      </div>
      
      {/* Theme & Notebook Toggles */}
      <div className="flex items-center gap-1 pr-2 border-r border-slate-300">
        <button
          onClick={toggleTheme}
          className="p-1 rounded-md hover:bg-slate-50 text-slate-900 hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
        </button>
        <div className="w-px h-3 bg-slate-200 mx-0.5" />
        <button
          onClick={toggleNotebook}
          className="p-1 rounded-md hover:bg-slate-50 text-slate-900 hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
          aria-label="Toggle Notebook"
        >
          <BookText size={14} />
        </button>
      </div>
        <div className="flex items-center gap-1.5 text-slate-900 font-black uppercase tracking-widest whitespace-nowrap">
          <span className="hidden xs:inline">{currentYear}</span>
          <span className="font-black text-slate-900 tracking-tighter group cursor-default uppercase flex items-center gap-1">
            <Copyright size={10} />
            2026 Codegnan
          </span>
        </div>
      </div>
    </div>
  );
}
