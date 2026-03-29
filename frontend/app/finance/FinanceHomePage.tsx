"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import {
  Home,
  Package,
  Box,
  TrendingUp,
  ShoppingCart,
  Clock,
  Landmark,
  FileText,
  UserRound,
  BarChart3,
  FileStack,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  ChevronRight,
  Filter,
  Download,
  Calendar,
  Zap,
  DollarSign,
  PieChart,
  Wallet
} from "lucide-react";
import { motion } from "framer-motion";

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

const financeSidebarItems: SidebarItem[] = [
  { label: "Home", icon: <Home size={18} />, active: true },
  { label: "Items", icon: <Package size={18} /> },
  { label: "Inventory", icon: <Box size={18} /> },
  { label: "Sales", icon: <TrendingUp size={18} /> },
  { label: "Purchases", icon: <ShoppingCart size={18} /> },
  { label: "Time Tracking", icon: <Clock size={18} /> },
  { label: "Banking", icon: <Landmark size={18} /> },
  { label: "Compliance", icon: <FileText size={18} /> },
  { label: "Accountant", icon: <UserRound size={18} /> },
  { label: "Reports", icon: <BarChart3 size={18} /> },
  { label: "Documents", icon: <FileStack size={18} /> },
];

export default function FinanceHomePage() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [financeData, setFinanceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFinanceData() {
      try {
        const response = await fetch("/api/finance/data");
        if (response.ok) {
          const data = await response.json();
          setFinanceData(data);
        }
      } catch (error) {
        console.error("Failed to fetch finance data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFinanceData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const { invoices = [], expenses = [], bankAccounts = [] } = financeData || {};
  const totalReceivables = invoices.filter((i: any) => i.status !== "Paid").reduce((acc: number, i: any) => acc + i.amount, 0);
  const totalPayables = expenses.reduce((acc: number, e: any) => acc + e.amount, 0);
  const totalBalance = bankAccounts.reduce((acc: number, b: any) => acc + b.balance, 0);

  return (
    <div className="flex flex-col h-full bg-slate-100 text-slate-900 overflow-hidden font-sans selection:bg-blue-200 relative">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Premium Sidebar */}
        <div className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col shrink-0 overflow-y-auto pt-6 px-4">
          <nav className="flex-1 space-y-1.5">
            {financeSidebarItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-bold transition-all group ${item.active
                  ? "bg-slate-100 text-slate-900 border border-slate-200 shadow-sm"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
                  }`}
              >
                <span className={`${item.active ? "text-blue-600" : "text-slate-600 group-hover:text-blue-600"} transition-colors`}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </nav>

          {/*<div className="mt-auto p-4 mb-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 font-black">?</div>
              <div>
                <p className="text-[11px] font-black text-slate-900">Finance Help</p>
                <p className="text-[10px] text-slate-400 font-bold">Support Desk Active</p>
              </div>
            </div>
            <button className="w-full py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-black text-slate-600 hover:bg-slate-100 shadow-sm transition-all">Support Center</button>
          </div>*/}
        </div>

        {/* Main Dashboard Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50 P-4 md:p-8">
          <div className="max-w-[1800px] mx-auto space-y-8">

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-2">
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-100 shrink-0">
                    <TrendingUp size={20} />
                  </div>
                  Finance <span className="text-blue-600">Commander</span>
                </h1>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] ml-[52px]">
                  Real-time Fiscal Intel
                </p>
              </div>

              {/*<div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-[12px] hover:bg-slate-50 transition-all shadow-sm">
                  <Download size={16} /> Export Data
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-black text-[12px] shadow-lg shadow-blue-100 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <Zap size={16} /> Bulk Settle
                </button>
              </div>*/}
            </div>

            {/* Premium Metric Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  l: "Total Receivables",
                  v: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalReceivables),
                  c: "text-emerald-700",
                  bg: "bg-emerald-50",
                  icon: <ArrowUpRight size={20} />,
                  sub: "From unpaid invoices",
                  p: 60
                },
                {
                  l: "Total Payables",
                  v: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalPayables),
                  c: "text-blue-700",
                  bg: "bg-blue-50",
                  icon: <ArrowDownRight size={20} />,
                  sub: "Total expenses",
                  p: 85
                },
                {
                  l: "Total Balance",
                  v: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalBalance),
                  c: "text-rose-700",
                  bg: "bg-rose-50",
                  icon: <TrendingUp size={20} />,
                  sub: "Across all accounts",
                  p: 45
                }
              ].map((m, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative group overflow-hidden">
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className={`w-12 h-12 rounded-2xl ${m.bg} flex items-center justify-center ${m.c} shadow-inner`}>
                      {m.icon}
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{m.l}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-50 text-[10px] font-black text-slate-600 border border-slate-100">Live</span>
                    </div>
                  </div>
                  <div className="space-y-4 relative z-10">
                    <p className="text-3xl font-black text-slate-900 tracking-tighter leading-none">
                      {m.v}
                    </p>
                    <div className="space-y-2">
                      <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${m.p}%` }}
                          className={`h-full ${m.c.replace('text', 'bg')}`}
                        />
                      </div>
                      <p className="text-[11px] font-black text-slate-500 flex justify-between">
                        <span>{m.sub}</span>
                        <span className="text-slate-900">{m.p}% Target</span>
                      </p>
                    </div>
                  </div>
                  <div className={`absolute -bottom-6 -right-6 w-24 h-24 ${m.bg} rounded-full blur-3xl opacity-30`} />
                </div>
              ))}
            </div>

            {/* Performance Analysis - Main Bento Block */}
            <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm overflow-hidden relative">
              <div className="flex items-center justify-between mb-10 relative z-10">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Cash Flow Analysis</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.1em]">Growth Variance Matrix</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
                  {["Monthly", "Quarterly", "Annually"].map(opt => (
                    <button key={opt} className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${opt === 'Monthly' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
                <div className="lg:col-span-3 h-80 relative flex items-end justify-between px-2 pt-8">
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] font-bold text-slate-500 pr-6 border-r border-slate-500 pb-2">
                    <span>100M</span>
                    <span>75M</span>
                    <span>50M</span>
                    <span>25M</span>
                    <span>0</span>
                  </div>
                  <div className="flex-1 flex items-end justify-around gap-4 ml-12 h-full border-b border-slate-500 pb-2">
                    {[40, 55, 48, 65, 75, 90, 82, 45, 35, 28, 20, 16].map((h, i) => (
                      <div key={i} className="flex-1 group relative h-full flex flex-col justify-end max-w-[40px]">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          whileHover={{ scaleX: 1.1 }}
                          className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg shadow-lg shadow-blue-50 cursor-pointer relative"
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            ₹{h}L
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner group">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-blue-600 transition-colors">Starting Balance</p>
                    <p className="text-2xl font-black text-slate-900 tracking-tight leading-none group-hover:scale-105 transition-transform origin-left">₹3,29,783.75</p>
                  </div>
                  <div className="space-y-5 px-1">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Inbound</span>
                      </div>
                      <p className="text-xl font-black text-slate-900 tracking-tight leading-none">₹22.25 Cr</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Outbound</span>
                      </div>
                      <p className="text-xl font-black text-rose-600 tracking-tight leading-none">₹27.04 Cr</p>
                    </div>
                  </div>
                  <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black tracking-widest uppercase hover:bg-slate-800 hover:translate-y-[-2px] active:translate-y-[0] transition-all shadow-xl shadow-slate-200">
                    Reconcile Ledger
                  </button>
                </div>
              </div>
              <div className="flex justify-between ml-20 mt-6 text-[11px] font-black text-slate-500 uppercase tracking-tighter w-[calc(75%-80px)]">
                {["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map(m => <span key={m}>{m}</span>)}
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
              {/* Revenue Flow - Advanced Comparison */}
              <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900">Cash Flow</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Income vs Expense Variance</p>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 text-[10px] font-black uppercase text-slate-500">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Income</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-400" /> Expense</div>
                  </div>
                </div>

                <div className="h-56 flex items-end gap-3 px-2">
                  {[
                    { i: 35, e: 25 }, { i: 55, e: 35 }, { i: 75, e: 45 }, { i: 88, e: 60 },
                    { i: 95, e: 55 }, { i: 100, e: 40 }, { i: 82, e: 48 }, { i: 85, e: 45 },
                    { i: 65, e: 50 }, { i: 50, e: 40 }, { i: 35, e: 20 }, { i: 25, e: 15 }
                  ].map((d, i) => (
                    <div key={i} className="flex-1 flex items-end gap-1 h-full group">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${d.e}%` }}
                        className="flex-1 bg-rose-200 rounded-sm group-hover:bg-rose-300 transition-colors"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${d.i}%` }}
                        className="flex-1 bg-emerald-500 rounded-sm group-hover:bg-emerald-600 transition-colors shadow-sm"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between px-2 mt-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                  {["Q1", "Q2", "Q3", "Q4"].map(q => <span key={q}>{q} Performance</span>)}
                </div>
              </div>

              {/* Expense Allocation - Refined Donut */}
              <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900">Total Expenses</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Expenditure Segments</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                    <PieChart size={18} />
                  </div>
                </div>

                <div className="flex-1 flex flex-col lg:flex-row items-center gap-10">
                  <div className="relative w-44 h-44 shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      <circle cx="18" cy="18" r="16" fill="transparent" stroke="#f8fafc" strokeWidth="3.5" />
                      <circle cx="18" cy="18" r="16" fill="transparent" stroke="#10B981" strokeWidth="3.5" strokeDasharray="40 100" />
                      <circle cx="18" cy="18" r="16" fill="transparent" stroke="#F59E0B" strokeWidth="3.5" strokeDasharray="25 100" strokeDashoffset="-40" />
                      <circle cx="18" cy="18" r="16" fill="transparent" stroke="#3B82F6" strokeWidth="3.5" strokeDasharray="35 100" strokeDashoffset="-65" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total</p>
                      <p className="text-xl font-black text-slate-900 leading-none">₹14.8Cr</p>
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-1 gap-3 w-full">
                    {[
                      { l: "Salaries & Benefits", v: "₹6.4Cr", c: "bg-emerald-500", p: "40%" },
                      { l: "Marketing Assets", v: "₹3.4Cr", c: "bg-amber-500", p: "25%" },
                      { l: "Operational Infra", v: "₹1.5Cr", c: "bg-blue-500", p: "35%" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all group cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${item.c} group-hover:scale-150 transition-transform`} />
                          <div className="flex flex-col">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter leading-none mb-1">{item.l}</span>
                            <span className="text-[13px] font-black text-slate-900 leading-none">{item.v}</span>
                          </div>
                        </div>
                        <div className="px-2 py-1 bg-white rounded-lg border border-slate-200 text-[10px] font-black text-slate-900 shadow-sm">
                          {item.p}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
