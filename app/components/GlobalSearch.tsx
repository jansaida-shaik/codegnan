"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Clock, 
  X, 
  ChevronDown, 
  Users, 
  CreditCard, 
  CheckCircle2, 
  BarChart3,
  ArrowRight,
  Command
} from 'lucide-react';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const recentSearches = [
  { id: 1, text: "Badugu venkat viswas", Category: "Converted Leads", subText: "CRM" },
  { id: 2, text: "ponugoti koteshwara Rao", Category: "Converted Leads", subText: "CRM" },
  { id: 3, text: "Doddipatla Sai Teja", Category: "Converted Leads", subText: "CRM" },
  { id: 4, text: "Kolli Vamsi", Category: "Converted Leads", subText: "CRM" },
  { id: 5, text: "Duba Praveen", Category: "Converted Leads", subText: "CRM" },
];

const suggestions = [
  { id: 6, text: "Quarterly Revenue Report", Category: "Finance", subText: "Financials" },
  { id: 7, text: "Sales Pipeline 2026", Category: "CRM", subText: "Deals" },
  { id: 8, text: "Customer Retention Strategy", Category: "Docs", subText: "Knowledge Base" },
];

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState('All Modules');
  const [isModuleOpen, setIsModuleOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4">
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
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
          >
            {/* Search Header */}
            <div className="flex items-center p-4 border-b border-slate-100 gap-3">
              <div className="relative">
                <button 
                  onClick={() => setIsModuleOpen(!isModuleOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-[11px] font-black text-slate-900 hover:bg-slate-200 transition-colors"
                >
                  {selectedModule}
                  <ChevronDown size={12} />
                </button>
                
                <AnimatePresence>
                  {isModuleOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute top-full left-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-10 py-2"
                    >
                      {['All Modules', 'CRM', 'Finance', 'Help Desk', 'Analytics'].map(mod => (
                        <button
                          key={mod}
                          onClick={() => {
                            setSelectedModule(mod);
                            setIsModuleOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-[11px] font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                        >
                          {mod}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Press # for specific search or / for Ask Zia"
                  className="w-full pl-10 pr-4 py-2 bg-transparent text-[13px] font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Results Canvas */}
            <div className="max-h-[60vh] overflow-y-auto p-2 no-scrollbar">
              {/* Recent Search Section */}
              <div className="mb-4">
                <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Search History</p>
                <div className="space-y-0.5">
                  {recentSearches.map(item => (
                    <button
                      key={item.id}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-50 group transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <Clock size={14} className="text-slate-300 group-hover:text-primary transition-colors" />
                        <div className="text-left">
                          <p className="text-[13px] font-black text-slate-900 tracking-tight">{item.text}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-bold text-slate-500">{item.Category}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <span className="text-[10px] font-black text-primary uppercase tracking-tighter">{item.subText}</span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Suggestions Section */}
              <div className="mb-2">
                <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Portal Suggestions</p>
                <div className="space-y-0.5">
                  {suggestions.map(item => (
                    <button
                      key={item.id}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-50 group transition-all"
                    >
                      <div className="flex items-center gap-4">
                        {item.Category === 'CRM' ? <Users size={14} className="text-blue-500" /> : 
                         item.Category === 'Finance' ? (
                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                             <path d="M6 3h12"/>
                             <path d="M6 8h12"/>
                             <path d="m6 13 8.5 8"/>
                             <path d="M6 13h3"/>
                             <path d="M9 13c6.667 0 6.667-10 0-10"/>
                           </svg>
                         ) : 
                         <CheckCircle2 size={14} className="text-primary" />}
                        <div className="text-left">
                          <p className="text-[13px] font-black text-slate-900 tracking-tight">{item.text}</p>
                          <p className="text-[10px] font-bold text-slate-500 mt-0.5">{item.subText}</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-black text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">SUGGESTION</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-black shadow-sm">ESC</span>
                  <span className="text-[10px] font-bold text-slate-400">to close</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-black shadow-sm">↵</span>
                  <span className="text-[10px] font-bold text-slate-400">to select</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Command size={12} className="text-slate-400" />
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Global Portal Search</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
