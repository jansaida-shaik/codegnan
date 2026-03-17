"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, CheckCircle2, AlertCircle, Clock, MessageSquare, Zap, Star, BarChart3 } from "lucide-react";

interface GlobalNotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    title: "Lead Converted",
    message: "Badugu venkat viswas has been moved to Converted Leads.",
    time: "2 mins ago",
    type: "success",
    icon: <CheckCircle2 size={16} className="text-emerald-500" />,
    bg: "bg-emerald-50/50"
  },
  {
    id: 2,
    title: "Financial Alert",
    message: "New invoice generated for batch #PY-MAR2026.",
    time: "45 mins ago",
    type: "info",
    icon: <BarChart3 size={16} className="text-blue-500" />,
    bg: "bg-blue-50/50"
  },
  {
    id: 3,
    title: "Meeting Reminder",
    message: "Quarterly alignment meeting starts in 15 minutes.",
    time: "15 mins ago",
    type: "warning",
    icon: <Clock size={16} className="text-amber-500" />,
    bg: "bg-amber-50/50"
  },
  {
    id: 4,
    title: "Support Ticket",
    message: "Monika raised a query regarding Vijayawada leads.",
    time: "3 hours ago",
    type: "message",
    icon: <MessageSquare size={16} className="text-purple-500" />,
    bg: "bg-purple-50/50"
  },
  {
    id: 5,
    title: "System Update",
    message: "CRM leads migration is now 85% complete.",
    time: "5 hours ago",
    type: "update",
    icon: <Zap size={16} className="text-indigo-500" />,
    bg: "bg-indigo-50/50"
  },
  {
    id: 6,
    title: "Achievement Unlocked",
    message: "You've reached a 92% Average Meeting Score this month!",
    time: "Today",
    type: "achievement",
    icon: <Star size={16} className="text-amber-400" />,
    bg: "bg-amber-50/50"
  }
];

export default function GlobalNotificationCenter({ isOpen, onClose }: GlobalNotificationCenterProps) {
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
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[150]"
          />

          {/* Notification Center Modal (Mac Control Center Style) */}
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed top-20 right-6 w-full max-w-[400px] bg-white rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200 z-[160] flex flex-col overflow-hidden max-h-[80vh]"
          >
            {/* Header */}
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center border border-slate-200 dark:border-white/10 shadow-sm shrink-0 relative">
                <Bell size={20} className="text-slate-900" />
                <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] px-1 bg-rose-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[8px] text-white font-black">6</span>
              </div>
                <div>
                  <h2 className="text-sm font-black text-slate-900 tracking-tight leading-none">Notifications</h2>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{notifications.length} Recent</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors mr-2">
                  Clear All
                </button>
                <button 
                  onClick={onClose}
                  className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Notification List */}
            <div className="flex-1 overflow-y-auto p-3 pt-0 no-scrollbar space-y-2 pb-6">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex gap-4 cursor-pointer hover:bg-slate-100 hover:border-slate-200 transition-all group"
                >
                  <div className={`w-10 h-10 rounded-xl ${notification.bg} flex items-center justify-center shrink-0 border border-slate-100 group-hover:scale-110 transition-transform`}>
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="text-[12px] font-black text-slate-900 truncate tracking-tight">{notification.title}</h3>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter shrink-0">{notification.time}</span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-500 leading-snug line-clamp-2">
                      {notification.message}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer Tip */}
            <div className="p-4 border-t border-slate-100 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Manage Notification Preferences in Settings
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
