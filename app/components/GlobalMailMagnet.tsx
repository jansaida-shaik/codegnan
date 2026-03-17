"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Search, Inbox, Send, Archive, Trash2, Clock, Star, Circle } from "lucide-react";

interface GlobalMailMagnetProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = "All" | "Unread";

const emails = [
    {
        id: 1,
        sender: "Battula Kranthi Kumar",
        initials: "BK",
        subject: "Hyderabad Students Enrollment - March Q1",
        preview: "Hello Jan, I've attached the latest enrollment reports for the Hyderabad campus...",
        time: "10:30 AM",
        unread: true,
        bg: "bg-emerald-100",
        color: "text-emerald-600"
    },
    {
        id: 2,
        sender: "Monika",
        initials: "MT",
        subject: "Vijayawada Lead follow-up",
        preview: "The follow-up with the recent batch of students from Vijayawada is complete...",
        time: "Yesterday",
        unread: false,
        bg: "bg-orange-100",
        color: "text-orange-600"
    },
    {
        id: 3,
        sender: "Anush Kumar",
        initials: "AK",
        subject: "Internal Sync: CRM Migration",
        preview: "Just a quick update that the CRM leads migration is now 85% complete...",
        time: "Tuesday",
        unread: false,
        bg: "bg-blue-100",
        color: "text-blue-600"
    },
    {
        id: 4,
        sender: "Sushmitha",
        initials: "SM",
        subject: "Front Desk Query: Fee Structure",
        preview: "A student enquiry regarding the new Python Full Stack batch fee structure...",
        time: "Monday",
        unread: true,
        bg: "bg-rose-100",
        color: "text-rose-600"
    }
];

export default function GlobalMailMagnet({ isOpen, onClose }: GlobalMailMagnetProps) {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [modifierKey, setModifierKey] = useState("⌘");

  useEffect(() => {
    const isMac = typeof window !== "undefined" && 
      (/Mac|iPod|iPhone|iPad/.test(navigator.userAgent) || navigator.platform.includes('Mac'));
    setModifierKey(isMac ? "⌘" : "Ctrl");
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[150]"
          />

          {/* Mail Magnet Modal (Mac Notification Style) */}
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed top-20 right-6 w-full max-w-[400px] bg-white rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200 z-[160] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 pb-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-[0_8px_20px_rgba(37,99,235,0.3)] shrink-0 relative">
                  <Mail size={20} />
                  <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] px-1 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm flex items-center justify-center text-[8px] text-white font-black group-hover:scale-110 transition-transform">4</span>
                </div>
                  <div>
                    <h2 className="text-sm font-black text-slate-900 tracking-tight leading-none">Mail Magnet</h2>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Notification</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-6 relative px-1">
                {(["All", "Unread"] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 text-[12px] font-bold transition-all relative ${
                      activeTab === tab ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="mail-tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto p-4 pt-2 no-scrollbar space-y-3 pb-6">
              {emails.filter(e => activeTab === "All" || (activeTab === "Unread" && e.unread)).map((email) => (
                <motion.div
                  key={email.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex gap-4 cursor-pointer hover:bg-slate-100 hover:border-slate-200 transition-all group"
                >
                  <div className={`w-10 h-10 rounded-xl ${email.bg} flex items-center justify-center shrink-0 border border-slate-100 group-hover:rotate-6 transition-transform shadow-sm`}>
                    <span className={`text-[12px] font-black ${email.color}`}>{email.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-[12px] font-black text-slate-900 truncate tracking-tight">{email.sender}</h3>
                      <div className="flex items-center gap-2">
                        {email.unread && <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />}
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter shrink-0">{email.time}</span>
                      </div>
                    </div>
                    <p className="text-[11px] font-black text-slate-950 truncate leading-none mb-1.5">
                      {email.subject}
                    </p>
                    <p className="text-[10px] font-bold text-slate-500 leading-snug line-clamp-1 opacity-70">
                      {email.preview}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sticky Search Footer (Mac style pill) */}
            <div className="p-4 pt-0">
              <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-2xl p-2.5 px-4">
                <div className="flex items-center gap-3">
                  <Search size={14} className="text-slate-400" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Search Mail...</p>
                </div>
                <div className="flex items-center gap-1.5 px-1.5 py-0.5 bg-white border border-slate-200 rounded-md shadow-sm">
                   <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{modifierKey} /</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
