"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  Plus,
  ArrowRight,
  Target,
  Users
} from 'lucide-react';

interface GlobalCalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

const upcomingEvents = [
  { id: 1, title: "Vijayawada Team Sync", time: "10:30 AM", type: "Meeting", color: "text-blue-600", bg: "bg-blue-50" },
  { id: 2, title: "Q1 Financial Review", time: "1:45 PM", type: "Strategy", color: "text-emerald-600", bg: "bg-emerald-50" },
  { id: 3, title: "Lead Management Audit", time: "4:30 PM", type: "Internal", color: "text-amber-600", bg: "bg-amber-50" },
];

export default function GlobalCalendar({ isOpen, onClose }: GlobalCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));

  const renderDays = () => {
    const totalDays = daysInMonth(year, month);
    const startOffset = firstDayOfMonth(year, month);
    const days = [];

    // Empty spaces for previous month
    for (let i = 0; i < startOffset; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 md:h-12" />);
    }

    // Actual days
    for (let d = 1; d <= totalDays; d++) {
      const isToday = today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;
      const hasEvent = [10, 15, 22].includes(d); // Mock data for events

      days.push(
        <div key={d} className="h-10 md:h-12 flex flex-col items-center justify-center relative group cursor-pointer">
          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-[13px] font-black transition-all ${isToday ? 'bg-primary text-white shadow-lg shadow-primary/30 ring-2 ring-primary/20' : 'text-slate-900 hover:bg-slate-100'}`}>
            {d}
          </div>
          {hasEvent && !isToday && (
            <div className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[600px]"
          >
            {/* Left Sidebar: Events & Management */}
            <div className="w-full md:w-72 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col">
              <div className="p-6 border-b border-slate-100 bg-white">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    <CalendarIcon size={16} />
                  </div>
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Events Hub</h2>
                </div>
                <p className="text-[10px] font-bold text-slate-400">Total 12 events this month</p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 no-scrollbar space-y-4">
                <div className="space-y-2">
                  <p className="px-2 text-[9px] font-black uppercase tracking-widest text-slate-400">Today's Schedule</p>
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="p-3 bg-white rounded-2xl border-2 border-slate-100 hover:border-primary/20 hover:shadow-md transition-all group cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${event.bg} ${event.color}`}>{event.type}</span>
                        <Clock size={10} className="text-slate-300" />
                      </div>
                      <h4 className="text-[11px] font-black text-slate-900 group-hover:text-primary transition-colors">{event.title}</h4>
                      <p className="text-[10px] font-bold text-slate-500 mt-0.5">{event.time}</p>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                  <Plus size={14} /> Schedule Event
                </button>
              </div>

              <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-around">
                <button className="flex flex-col items-center gap-1 group">
                  <Target size={18} className="text-slate-400 group-hover:text-primary transition-colors" />
                  <span className="text-[8px] font-black uppercase text-slate-400 group-hover:text-slate-900 transition-colors">Goals</span>
                </button>
                <div className="w-px h-6 bg-slate-100" />
                <button className="flex flex-col items-center gap-1 group">
                  <Users size={18} className="text-slate-400 group-hover:text-primary transition-colors" />
                  <span className="text-[8px] font-black uppercase text-slate-400 group-hover:text-slate-900 transition-colors">Invites</span>
                </button>
              </div>
            </div>

            {/* Right Side: Main Calendar */}
            <div className="flex-1 flex flex-col bg-white">
              <div className="p-6 flex items-center justify-between border-b border-slate-50">
                <div className="space-y-0.5">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{monthName} {year}</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Portal Operations</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={prevMonth} className="p-2 hover:bg-slate-50 rounded-xl border border-slate-100 text-slate-900 transition-all"><ChevronLeft size={18} /></button>
                  <button onClick={nextMonth} className="p-2 hover:bg-slate-50 rounded-xl border border-slate-100 text-slate-900 transition-all"><ChevronRight size={18} /></button>
                  <button onClick={onClose} className="p-2 ml-2 hover:bg-rose-50 rounded-xl border border-slate-100 text-slate-400 hover:text-rose-600 transition-all"><X size={18} /></button>
                </div>
              </div>

              <div className="flex-1 p-6 flex flex-col">
                {/* Header Days */}
                <div className="grid grid-cols-7 mb-4">
                  {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                    <div key={day} className="text-center text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{day}</div>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-y-2">
                  {renderDays()}
                </div>

                {/* Bottom Footer Stats */}
                <div className="mt-auto grid grid-cols-3 gap-4 pt-6">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">Mails</p>
                    <p className="text-lg font-black text-slate-900">24 <span className="text-[10px] text-emerald-500 font-bold ml-1">+2</span></p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">Invoices</p>
                    <p className="text-lg font-black text-slate-900">08 <span className="text-[10px] text-primary font-bold ml-1">PAID</span></p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Progress</p>
                      <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-primary" />
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-slate-300" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
