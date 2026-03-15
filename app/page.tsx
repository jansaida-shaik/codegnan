"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Mail, Lock, ShieldCheck, ArrowRight, Code, GraduationCap, Cpu, Globe, BookOpen, Database, Sparkle } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    if (email === "" || password === "") {
      setError("Please enter your email and password");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex bg-white font-sans selection:bg-blue-100 selection:text-primary">

      {/* Left Panel - Brand */}
      <div className="hidden lg:flex w-1/2 bg-sapphire flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Abstract Background Decor */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute -top-1/4 -left-1/4 w-full h-full bg-blue-600/20 blur-[120px] rounded-full"></div>
          <div className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-indigo-600/20 blur-[120px] rounded-full"></div>
        </div>

        {/* Tech & EdTech Floating Icons */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.08] text-white">
          <div className="absolute top-[10%] left-[15%] animate-drift"><Code size={80} strokeWidth={1} /></div>
          <div className="absolute top-[20%] right-[20%] animate-float duration-[18s]"><GraduationCap size={100} strokeWidth={1} /></div>
          <div className="absolute bottom-[20%] left-[25%] animate-drift duration-[30s] delay-700"><Cpu size={70} strokeWidth={1} /></div>
          <div className="absolute bottom-[10%] right-[15%] animate-float duration-[22s] delay-1000"><BookOpen size={90} strokeWidth={1} /></div>
          <div className="absolute top-[45%] left-[5%] animate-drift duration-[20s] delay-500"><Globe size={60} strokeWidth={1} /></div>
          <div className="absolute top-[60%] right-[10%] animate-float duration-[16s]"><Database size={75} strokeWidth={1} /></div>
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-md w-full animate-in fade-in zoom-in-95 duration-1000">
          {/* Static Logo Section - Maximum Clarity, Clean Geometry */}
          <div className="relative mb-12 flex justify-center items-center">
            {/* Subtle backlight */}
            <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full scale-150"></div>
            
            <div className="relative w-48 h-48 bg-white rounded-full shadow-2xl border border-gray-100/50 flex items-center justify-center overflow-hidden">
              <Image
                src="/logo.png"
                alt="Codegnan Logo"
                width={800}
                height={800}
                unoptimized
                priority
                className="object-contain w-full h-full rounded-full"
              />
            </div>
          </div>

          <div className="space-y-6 text-center">
            <h2 className="text-white text-5xl font-extrabold tracking-tight leading-[1.1]">
              Elevating your <span className="text-blue-400">daily workflow</span>.
            </h2>
            <p className="text-blue-100/60 text-lg font-medium">
              The central portal for your daily professional needs and operational excellence at Codegnan.
            </p>
          </div>

          {/* Interactive Indicators */}
          <div className="flex gap-4 mt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === 1 ? 'w-10 bg-blue-500' : 'w-2 bg-white/20'}`}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-8 lg:p-12 relative overflow-y-auto">
        <div className="w-full max-w-sm animate-in fade-in slide-in-from-right-8 duration-700">

          {/* Mobile logo */}
          <div className="flex lg:hidden justify-center mb-10">
            <Image
              src="/logo.png"
              alt="Codegnan Logo"
              width={140}
              height={140}
            />
          </div>

          {/* Heading */}
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Welcome back</h1>
            <p className="text-gray-500 font-semibold">Log in to manage your workspace</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 px-4 py-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-sm font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
               <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
               {error}
            </div>
          )}

          {/* Form */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 text-gray-900 rounded-2xl border border-transparent focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all font-semibold outline-none placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Password</label>
                <button className="text-[11px] font-bold text-primary hover:text-primary-dark transition-colors uppercase tracking-widest">Forgot?</button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 text-gray-900 rounded-2xl border border-transparent focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all font-semibold outline-none placeholder:text-gray-300"
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-4 bg-primary hover:bg-primary-dark active:scale-[0.98] text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 mt-4"
            >
              Sign In
              <ArrowRight size={18} strokeWidth={2.5} />
            </button>
          </div>


          <footer className="text-center text-gray-400 font-medium text-[11px] mt-12 tracking-wide">
             POWERED BY <span className="text-gray-900 font-bold tracking-tighter">Codegnan Ecosystem™</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
