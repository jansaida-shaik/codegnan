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
  Mail,
  HelpCircle,
  LogOut,
  User,
  Menu,
  X,
  Plus,
  Calendar,
  Sparkles,
  MessageSquare,
  Copy,
  Phone,
  Check
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import GlobalSearch from "./GlobalSearch";
import GlobalCalendar from "./GlobalCalendar";
import { useTheme } from "./ThemeProvider";

// Apps array removed as the portal is now a dedicated CRM

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const { toggleMailMagnet, toggleNotificationCenter } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [modifierKey, setModifierKey] = useState("");
  const [settingsRotation, setSettingsRotation] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const isMac = typeof window !== "undefined" && 
      (/Mac|iPod|iPhone|iPad/.test(navigator.userAgent) || navigator.platform.includes('Mac'));
    setModifierKey(isMac ? "⌘" : "Ctrl");

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
            className="object-contain h-6 sm:h-7 w-auto"
            priority
            unoptimized
          />
        </div>

        <div className="hidden lg:block w-4" />

        <div className="flex-1" />

        {/* Right Side */}
        {/* Desktop Search & Actions */}
        <div className="hidden lg:flex items-center gap-4 ml-6">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-3 pl-3 pr-12 py-2 bg-white border border-slate-400 rounded-xl text-[12px] font-black text-slate-500 hover:border-primary transition-all shadow-sm w-56 text-left relative group"
          >
            <Search className="text-slate-900 group-hover:text-primary transition-colors" size={14} />
            Search records
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-300 bg-slate-50 text-[10px] text-slate-900 font-black uppercase tracking-tighter">
              {modifierKey} K
            </div>
          </button>

          <div className="flex items-center gap-4">
            <button className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all">
              <Plus size={16} />
            </button>
            <button className="p-2 text-slate-900 hover:text-primary hover:bg-slate-200/50 rounded-xl transition-all">
              <Sparkles size={18} />
            </button>
            <button 
              onClick={toggleNotificationCenter}
              className="p-2 text-slate-900 hover:text-primary hover:bg-slate-200/50 rounded-xl transition-all relative group"
            >
              <Bell size={18} />
              <span className="absolute top-1 right-1 min-w-[12px] h-[12px] px-0.5 bg-rose-500 rounded-full border border-white shadow-sm flex items-center justify-center text-[6px] text-white font-black group-hover:scale-110 transition-transform">6</span>
            </button>
            <button 
              onClick={() => setIsCalendarOpen(true)}
              className="p-2 text-slate-900 hover:text-primary hover:bg-slate-200/50 rounded-xl transition-all"
            >
              <Calendar size={18} />
            </button>
            <button 
              onClick={toggleMailMagnet}
              className="p-2 text-slate-900 hover:text-primary hover:bg-slate-200/50 rounded-xl transition-all relative group"
            >
              <Mail size={18} />
              <span className="absolute top-1 right-1 min-w-[12px] h-[12px] px-0.5 bg-sky-500 rounded-full border border-white shadow-sm flex items-center justify-center text-[6px] text-white font-black group-hover:scale-110 transition-transform">4</span>
            </button>
            <button 
              onClick={() => setSettingsRotation(prev => prev + 360)}
              className="p-2 text-slate-900 hover:text-primary hover:bg-slate-200/50 rounded-xl transition-all"
            >
              <motion.div
                animate={{ rotate: settingsRotation }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <Settings size={18} />
              </motion.div>
            </button>
          </div>

          <div className="flex items-center gap-3 pl-2 group h-full relative" ref={profileRef}>
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="flex flex-col items-end justify-center hidden xl:flex">
                <p className="text-[11px] font-black text-slate-900 tracking-tight leading-none group-hover:text-primary transition-colors">
                  {session?.user?.name || "User"}
                </p>
                <span className="text-[7px] font-black text-white uppercase tracking-widest bg-orange-500 px-1.5 py-0.5 rounded-md shadow-sm mt-1">
                  {(session?.user as any)?.role || "USER"}
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center text-[13px] font-black text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-all duration-300">
                {session?.user?.name?.[0] || "U"}
              </div>
              <ChevronDown size={14} className={`text-slate-900 group-hover:text-primary transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`} />
            </div>

            {/* Profile Dropdown Overlay */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-[110]"
                >
                  {/* Branded Header Area */}
                  <div className="bg-gradient-to-br from-primary to-blue-700 p-6 text-white text-left relative">
                    <div className="absolute top-4 right-4 group/help">
                      <HelpCircle size={16} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-xl font-black text-white shadow-xl shrink-0">
                        {session?.user?.name?.[0] || "U"}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-black tracking-tight leading-tight mb-1 truncate">{session?.user?.name}</h3>
                        <div className="flex items-center gap-2 px-2 py-0.5 bg-black/20 rounded-full border border-white/10 w-fit">
                          <span className="text-[9px] font-medium text-white/80 whitespace-nowrap">User Id:</span>
                          <span className="text-[9px] font-black tracking-wider truncate max-w-[100px]">{(session?.user as any)?.id}</span>
                        <button 
                          onClick={() => handleCopy((session?.user as any)?.id, "userid")}
                          className="hover:text-amber-400 text-white/90 transition-colors"
                        >
                          {copiedId === "userid" ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Options */}
                  <div className="p-3 bg-white space-y-1">
                    <button
                      onClick={() => {
                        router.push("/profile");
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100"
                    >
                      <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        <User size={16} />
                      </div>
                      <div className="text-left">
                        <p className="text-[11px] font-black text-slate-900 tracking-tight">View Profile</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mt-0.5">Edit Personal Details</p>
                      </div>
                    </button>

                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
                      <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                        <Mail size={16} />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                        <p className="text-[11px] font-black text-slate-900 truncate">{session?.user?.email}</p>
                      </div>
                      <button 
                        onClick={() => handleCopy(session?.user?.email || "", "email")}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 transition-all"
                      >
                        {copiedId === "email" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      </button>
                    </div>

                    <div className="h-px bg-slate-100 my-1 mx-2" />

                    <button 
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-rose-50 text-rose-600 transition-all group"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-all">
                        <LogOut size={16} />
                      </div>
                      <span className="text-[12px] font-black uppercase tracking-widest">Sign out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
                {/* Mobile Navigation Links Removed for CRM-centric hub */}
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

      {/* Global Search Palette */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Global Calendar Overlay */}
      <GlobalCalendar isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </>
  );
}