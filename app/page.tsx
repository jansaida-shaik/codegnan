"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";


export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setError("");

    if (email === "" || password === "") {
      setError("Please enter your email and password");
      return;
    }

    setIsLoading(true);
    // Simulate API delay for a premium feel
    await new Promise((resolve) => setTimeout(resolve, 800));
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


        {/* Tech Stack Logos - Subtle Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.12]">

          {/* Python – Top Left */}
          <div className="absolute top-[8%] left-[8%] animate-float duration-[25s]">
            <svg width="52" height="52" viewBox="0 0 128 128" fill="white">
              <path d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"/>
              <path d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"/>
            </svg>
          </div>


          {/* Java – Center Left */}
          <div className="absolute top-[40%] left-[5%] animate-drift duration-[22s]">
            <svg width="52" height="52" viewBox="0 0 32 32" fill="white">
              <path d="M11.6 24.7s-1.2.7.9 1c2.5.3 3.8.3 6.6-.3a10 10 0 0 0 1.8.9c-6.3 2.7-14.2-.2-9.3-1.6zm-.8-3.5s-1.3 1 .7 1.2c2.7.3 4.9.3 8.6-.4a3.3 3.3 0 0 0 1.3.8c-7.5 2.2-16 .2-10.6-1.6zm14.7 6.1s.9.7-1 1.3c-3.6 1.1-15 1.4-18.2 0-1.1-.5 1-1.2 1.7-1.3.7-.2 1-.2 1-.2-1.2-.9-8.2 1.8-3.5 2.5 12.8 2.1 23.3-.9 20-2.3zm-15-12.5s-5.8 1.4-2.1 1.9c1.6.2 4.8.2 7.7 0 2.4-.2 4.8-.6 4.8-.6s-.8.4-1.4.7c-5.9 1.6-17.3.9-14-.7 2.8-1.4 5-1.3 5-1.3zm10.4 5.8c6-3.1 3.2-6.1 1.3-5.7-.5.1-.7.2-.7.2s.2-.3.5-.4c3.8-1.3 6.8 4-.7 6.1 0 0 .1-.1.1-.2zm-9.8 8.4c5.8.4 14.6-.2 14.8-2.9 0 0-.4 1.1-4.8 1.9-4.9.9-11 .8-14.6.2 0 0 .7.6 4.6.8z"/>
              <path fill="white" d="M19 0s3.3 3.4-3.2 8.4c-5.2 4.1-1.2 6.5 0 9.1C12.8 15 10.6 12.5 12 10c2.4-3.6 8.5-5.2 7-10zm-1.7 15.3c1.6 1.8-.4 3.4-.4 3.4s4-2 2.1-4.5C17.3 12 16 10.8 23 6.8c0 0-11 2.7-5.7 8.5z"/>
            </svg>
          </div>

          {/* MongoDB – Right Middle (Between GitHub and React) */}
          <div className="absolute top-[40%] right-[9%] animate-float duration-[20s]">
            <svg width="48" height="48" viewBox="0 0 32 32" fill="white">
              <path d="M16 2c-.2 0-.3.1-.4.2-1.5 1.7-6.3 7.7-6.3 13.3 0 3.7 2.8 6.8 6.3 7.3v5.7c0 .5.2.5.4.5s.4 0 .4-.5v-5.7c3.5-.5 6.3-3.6 6.3-7.3C22.7 9.9 17.6 3.7 16 2z"/>
            </svg>
          </div>

          {/* Django – Bottom Left */}
          <div className="absolute bottom-[25%] left-[8%] animate-drift duration-[27s]">
            <svg width="50" height="50" viewBox="0 0 32 32" fill="white">
              <path d="M11.5 5h3.7v15.4c-1.9.4-3.3.5-4.8.5-4.5 0-6.9-2-6.9-5.9 0-3.7 2.5-6.1 6.5-6.1.6 0 1 .1 1.5.2V5zm0 7.5c-.4-.1-.7-.2-1.2-.2-1.9 0-3 1.2-3 3.2 0 2 1 3.1 3 3.1.4 0 .7 0 1.2-.1v-6zm5.7-7.5H21v16.6c0 5.7-4.1 7.9-10.1 7.4l-.5-3.1c4 .5 6.8-.1 6.8-4.3V5z"/>
            </svg>
          </div>

          {/* React – Right Center-Bottom */}
          <div className="absolute bottom-[30%] right-[8%] animate-float duration-[24s]">
            <svg width="52" height="52" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.5">
              <circle cx="16" cy="16" r="2.5" fill="white"/>
              <ellipse cx="16" cy="16" rx="14" ry="5.5"/>
              <ellipse cx="16" cy="16" rx="14" ry="5.5" transform="rotate(60 16 16)"/>
              <ellipse cx="16" cy="16" rx="14" ry="5.5" transform="rotate(120 16 16)"/>
            </svg>
          </div>
          
          {/* GitHub – Top Right */}
          <div className="absolute top-[10%] right-[10%] animate-drift duration-[23s]">
            <svg width="52" height="52" viewBox="0 0 24 24" fill="white">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>





        </div>


        <div className="relative z-10 flex flex-col items-center max-w-md w-full animate-in fade-in zoom-in-95 duration-1000">
          
          {/* Static Logo Section - Maximum Clarity, Clean Geometry */}
          <div className="relative mb-12 flex justify-center items-center">
            {/* Subtle backlight */}
            <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full scale-150"></div>


            {/* Central Codegnan logo */}
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
          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-700 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 text-gray-900 rounded-2xl border border-transparent focus:bg-white focus:border-blue-700/30 focus:ring-4 focus:ring-blue-700/10 transition-all font-semibold outline-none placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                <button type="button" className="text-[11px] font-bold text-blue-700 hover:text-blue-800 transition-colors uppercase tracking-widest">Forgot?</button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-700 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 text-gray-900 rounded-2xl border border-transparent focus:bg-white focus:border-blue-700/30 focus:ring-4 focus:ring-blue-700/10 transition-all font-semibold outline-none placeholder:text-gray-300"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-700/70 active:scale-[0.98] text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-700/25 flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <Loader2 size={18} strokeWidth={2.5} className="animate-spin text-white" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>


          <footer className="text-center text-gray-400 font-medium text-[11px] mt-12 tracking-wide">
            POWERED BY <span className="text-gray-900 font-bold tracking-tighter">Codegnan Ecosystem™</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
