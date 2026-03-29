"use client";

import React from "react";
import { 
  X, 
  Plus, 
  Edit3, 
  CheckSquare, 
  Upload, 
  Paperclip, 
  ChevronDown,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GlobalNotebookProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalNotebook({ isOpen, onClose }: GlobalNotebookProps) {
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

          {/* Notebook Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-14 right-6 w-[400px] bg-white rounded-3xl shadow-2xl z-[160] overflow-hidden border border-slate-200 dark:bg-slate-900 dark:border-slate-800"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  <div className="w-5 h-6 bg-blue-500 rounded-sm border border-white shadow-sm" />
                  <div className="w-5 h-6 bg-slate-100 rounded-sm border border-white shadow-sm" />
                </div>
                <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Notebook</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Sub-Header: Selection & Quick Add */}
            <div className="px-6 py-4 flex items-center justify-between">
              <button className="flex items-center gap-2 group">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 transition-colors">My Notes</span>
                <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="p-1.5 text-blue-500 animate-pulse">
                  <Sparkles size={18} />
                </div>
                <button className="p-1.5 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:scale-105 transition-transform">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="px-6 pb-10 pt-12 flex flex-col items-center text-center space-y-8">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Start jotting down your ideas
              </h3>

              {/* Action Grid */}
              <div className="grid grid-cols-2 gap-4 w-full px-4">
                {[
                  { icon: <Edit3 size={18} />, label: "Write" },
                  { icon: <CheckSquare size={18} />, label: "To Do" },
                  { icon: <Upload size={18} />, label: "Upload" },
                  { icon: <Paperclip size={18} />, label: "Attach" },
                ].map((action, idx) => (
                  <button 
                    key={idx}
                    className="flex items-center justify-center gap-2 py-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 transition-all group"
                  >
                    <span className="text-slate-900 dark:text-slate-300 group-hover:scale-110 transition-transform">
                      {action.icon}
                    </span>
                    <span className="text-sm font-black text-slate-900 dark:text-white tracking-widest uppercase text-[10px]">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer / Indicator */}
            <div className="h-2 bg-slate-50 dark:bg-slate-800/30" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
