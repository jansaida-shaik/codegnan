"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  BarChart3,
  UserPlus,
  Target,
  Layers,
  Zap,
  Calendar,
  Phone,
  Search,
  ChevronRight,
  ChevronDown,
  Box,
  MessageSquare,
  Clock,
  Briefcase,
  Users,
  MoreHorizontal,
} from "lucide-react";

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const mainSidebarItems: SidebarItem[] = [
  { label: "Home", icon: <Home size={18} />, href: "/home" },
  { label: "Reports", icon: <FileText size={18} />, href: "/reports" },
  { label: "Analytics", icon: <BarChart3 size={18} />, href: "/analytics" },
  { label: "My Requests", icon: <Clock size={18} />, href: "/requests" },
];

const crmSidebarItems: SidebarItem[] = [
  { label: "Leads", icon: <UserPlus size={16} />, href: "/leads" },
  { label: "Converted Leads", icon: <Target size={16} />, href: "/converted-leads" },
  { label: "Batch Master", icon: <Layers size={16} />, href: "/batch-master" },
  { label: "Finance", icon: <Briefcase size={16} />, href: "/finance" },
  { label: "Customer Payments", icon: <Zap size={16} />, href: "/payments" },
  { label: "SalesInbox", icon: <MessageSquare size={16} />, href: "/inbox" },
  { label: "Tasks", icon: <Calendar size={16} />, href: "/tasks" },
  { label: "Meetings", icon: <Calendar size={16} />, href: "/meetings" },
  { label: "Calls", icon: <Phone size={16} />, href: "/calls" },
  { label: "Products", icon: <Layers size={16} />, href: "/products" },
  { label: "Quotes", icon: <FileText size={16} />, href: "/quotes" },
  { label: "Sales Orders", icon: <Box size={16} />, href: "/orders" },
  { label: "Purchase Orders", icon: <Box size={16} />, href: "/purchase-orders" },
  { label: "Invoices", icon: <FileText size={16} />, href: "/invoices" },
  { label: "Campaigns", icon: <Zap size={16} />, href: "/campaigns" },
  { label: "Vendors", icon: <Users size={16} />, href: "/vendors" },
];

export default function CRMInventorySidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex w-64 bg-[#1e2230] flex-col shrink-0 overflow-y-auto no-scrollbar text-slate-400">
      {/* Sidebar Header */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white shadow-lg">
          <Box size={18} fill="currentColor" />
        </div>
        <span className="text-sm font-bold text-white tracking-tight">Codegnan CRM</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <ChevronDown size={14} className="text-slate-500" />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="px-2 space-y-0.5 mb-6">
        {mainSidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                isActive ? "bg-[#2d3345] text-white" : "hover:bg-[#2d3345]/50 hover:text-white"
              }`}
            >
              <span className={isActive ? "text-blue-400" : "text-slate-500"}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* CRM Section Header */}
      <div className="px-5 mb-3 flex items-center justify-between group cursor-pointer">
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 rounded bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-[10px]">CT</div>
           <span className="text-[11px] font-bold text-white">CRM Tea...</span>
           <ChevronDown size={12} className="text-slate-500" />
        </div>
        <MoreHorizontal size={14} className="text-slate-600 group-hover:text-slate-400" />
      </div>



      {/* CRM Tools Navigation */}
      <nav className="px-2 space-y-0.5 pb-20">
        <div className="flex items-center gap-3 px-3 py-2 text-[12px] font-bold text-slate-400 cursor-pointer hover:bg-[#2d3345]/50 rounded-lg">
           <Layers size={16} />
           <span>Workqueue</span>
           <span className="ml-auto text-amber-500">✨</span>
        </div>
        
        {crmSidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all relative ${
                isActive ? "bg-[#2d3345] text-white font-bold" : "hover:bg-[#2d3345]/50 hover:text-white"
              }`}
            >
              {isActive && <div className="absolute left-0 top-1 bottom-1 w-1 bg-blue-500 rounded-r" />}
              <span className={isActive ? "text-blue-400" : "text-slate-500"}>{item.icon}</span>
              <span className="truncate">{item.label}</span>
              {item.label === "Leads" && (
                <span className="ml-auto text-[10px] text-slate-500">1525</span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
