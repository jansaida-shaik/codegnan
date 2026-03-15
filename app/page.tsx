"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Mail, Lock, ShieldCheck, ArrowRight, Code, GraduationCap, Cpu, Globe, BookOpen, Database, Sparkle } from "lucide-react";

// --- Shuffling Animation Component ---
const ShufflingLogo = ({
  children,
  initialTop,
  initialLeft,
  className = "",
}: {
  children: React.ReactNode;
  initialTop: number;
  initialLeft: number;
  className?: string;
}) => {
  const [position, setPosition] = useState({ top: initialTop, left: initialLeft });

  useEffect(() => {
    // Randomize movement every 12 to 20 seconds
    const intervalTime = Math.floor(Math.random() * 8000) + 12000;
    
    const interval = setInterval(() => {
      // Keep logos within 10% to 85% to avoid edges
      const newTop = Math.floor(Math.random() * 75) + 10;
      const newLeft = Math.floor(Math.random() * 75) + 10;
      setPosition({ top: newTop, left: newLeft });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`absolute transition-all ease-in-out ${className}`}
      style={{
        top: `${position.top}%`,
        left: `${position.left}%`,
        transitionDuration: "18s", // Very slow, smooth glide
      }}
    >
      {children}
    </div>
  );
};

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

        {/* Branded Programming Stack - High Density Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Python (Top Left) */}
          <div className="absolute top-[10%] left-[8%] animate-float duration-[25s]">
            <svg width="55" height="55" viewBox="0 0 32 32">
              <defs>
                <linearGradient id="py-A" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0" stopColor="#366a96"/><stop offset="1" stopColor="#3679b0"/></linearGradient>
                <linearGradient id="py-B" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0" stopColor="#ffc836"/><stop offset="1" stopColor="#ffe873"/></linearGradient>
              </defs>
              <g transform="scale(0.04) translate(80, 80)">
                <path d="M716.255 544.487c0-13.623 3.653-21.034 23.822-24.563 13.693-2.4 31.25-2.7 47.627 0 12.935 2.135 23.822 11.77 23.822 24.563v44.945c0 13.182-10.57 23.98-23.822 23.98h-47.627c-16.164 0-29.787 13.782-29.787 29.363v21.564h-16.376c-13.852 0-21.917-9.988-25.305-23.964-4.57-18.776-4.376-29.963 0-47.945 3.794-15.687 15.917-23.964 29.77-23.964h65.52v-6h-47.645v-17.98z" fill="url(#py-A)"/>
                <path d="M811.527 688.32c0 13.623-11.823 20.523-23.822 23.964-18.052 5.188-32.54 4.394-47.627 0-12.6-3.67-23.822-11.17-23.822-23.964v-44.945c0-12.935 10.782-23.98 23.822-23.98h47.627c15.864 0 29.787-13.71 29.787-29.963v-20.964h17.858c13.87 0 20.4 10.305 23.822 23.964 4.764 18.97 4.976 33.157 0 47.945-4.817 14.364-9.97 23.964-23.822 23.964H763.9v6h47.627v17.98z" fill="url(#py-B)"/>
                <circle cx="737.166" cy="541.505" r="8.93" fill="white"/>
                <circle cx="798.166" cy="691.32" r="8.93" fill="white"/>
              </g>
            </svg>
          </div>

          {/* MySQL (Top Center-Right) */}
          <div className="absolute top-[18%] right-[15%] animate-drift duration-[30s] opacity-90">
             <svg width="65" height="65" viewBox="0 0 25.6 25.6">
               <path d="M179.1 94.9c-3.6-.1-6.3.3-8.7 1.3-.7.3-1.7.3-1.8 1.1.4.4.4.9.7 1.4.5.9 1.5 2.1 2.3 2.7l2.9 2.1c1.7 1.1 3.7 1.7 5.4 2.8 1 .6 2 1.4 2.9 2.1.5.4.8.9 1.4 1.2v-.1c-.3-.4-.4-1-.7-1.4l-1.3-1.3c-1.3-1.7-2.9-3.3-4.6-4.5-1.4-1-4.6-2.3-5.1-4l-.1-.1c1-.1 2.1-.4 3.1-.7 1.5-.4 2.9-.3 4.4-.7l2.1-.6v-.4c-.8-.8-1.4-1.9-2.2-2.6-2.3-2-4.8-3.9-7.4-5.5-1.4-.9-3.2-1.5-4.6-2.2-.5-.3-1.4-.4-1.7-.8-.8-1-1.3-2.3-1.8-3.4l-3.7-7.8c-.8-1.7-1.3-3.5-2.3-5.1C148.6 44 143.6 39.4 136 34.9c-1.7-.9-3.6-1.3-5.7-1.8l-3.3-.2c-.7-.3-1.4-1.2-2.1-1.6C122.4 29.7 115.8 26.2 114 30.7c-1.2 2.9 1.8 5.8 2.8 7.2.8 1 1.7 2.2 2.3 3.3.3.8.4 1.6.7 2.4.7 2 1.4 4.1 2.3 6 .5.9 1 1.9 1.7 2.8.4.5 1 .7 1.1 1.5-.6.9-.7 2.2-1 3.3-1.6 5-1 11.3 1.3 15 .7 1.1 2.4 3.6 4.7 2.6 2-.8 1.6-3.3 2.1-5.6.1-.5 0-.9.3-1.3v.1l1.8 3.7c1.4 2.2 3.8 4.5 5.8 6 1.1.8 1.9 2.2 3.3 2.7v-.1l-.1-.4-.6-.6-2.3-2.7c-1.9-2.5-3.5-5.3-5-8.1-.7-1.4-1.3-3-1.9-4.3-.3-.5-.3-1.3-.7-1.6-.7 1-1.7 1.8-2.1 3-.8 1.9-.9 4.3-1.2 6.7v.1c-1.4-.4-1.9-1.8-2.5-3.1-1.3-3.2-1.6-8.3-.4-11.9.3-.9 1.7-3.9 1.1-4.8-.3-.8-1.2-1.3-1.7-2-.6-.8-1.2-1.9-1.6-2.9-1.1-2.5-1.6-5.3-2.8-7.8-.5-1.2-1.5-2.4-2.2-3.4-.8-1.2-1.8-2.1-2.5-3.5-.2-.5-.5-1.3-.2-1.8.1-.4.3-.5.6-.6.6-.5 2.2.1 2.8.4 1.7.7 3 1.3 4.4 2.2.6.4 1.3 1.3 2.1 1.5h.9c1.4.3 3 .1 4.4.5 2.4.8 4.5 1.9 6.4 3.1 5.8 3.7 10.7 9 13.9 15.3.5 1 .8 2 1.3 3 1 2.2 2.1 4.4 3 6.6.9 2.1 1.8 4.2 3.2 6 .7.9 3.3 1.4 4.6 1.9.9.4 2.3.8 3.1 1.3 1.5.9 3 2 4.5 3 .7.5 2.9 1.7 3 2.5z" transform="scale(0.1)" fill="#00678c"/>
             </svg>
          </div>

          {/* JavaScript (Center Right) */}
          <div className="absolute top-[42%] right-[5%] animate-float duration-[18s]">
            <svg width="60" height="60" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="#f7df1e"/>
              <path d="m 67.3 213.9 19.6 -11.9 c 3.8 6.7 7.2 12.4 15.5 12.4 7.9 0 12.9 -3.1 12.9 -15.1 v -81.8 h 24 v 81.8 c 0 24.9 -14.6 36.3 -35.9 36.3 -19.2 0 -30.4 -10 -36.1 -22" fill="#000000"/>
              <path d="m 152.4 211.4 19.6 -11.3 c 5.2 8.4 11.9 14.6 23.7 14.6 10 0 16.3 -5 16.3 -11.9 0 -8.2 -6.5 -11.2 -17.5 -16 l -6 -2.6 c -17.4 -7.4 -28.9 -16.7 -28.9 -36.3 0 -18 13.7 -31.8 35.2 -31.8 15.3 0 26.3 5.3 34.2 19.2 l -18.7 12 c -4.1 -7.4 -8.6 -10.3 -15.5 -10.3 -7 0 -11.5 4.5 -11.5 10.3 0 7.2 4.5 10.1 14.8 14.6 l 6 2.6 c 20.4 8.8 32 17.7 32 37.8 0 21.7 -17 33.5 -39.9 33.5 -22.3 0 -36.8 -10.7 -43.8 -24.6" fill="#000000"/>
            </svg>
          </div>

          {/* Java (Bottom Left) */}
          <div className="absolute bottom-[10%] left-[5%] animate-drift duration-[22s]">
            <svg width="70" height="70" viewBox="0 0 32 32">
              <path d="M11.622 24.74s-1.23.748.855.962c2.51.32 3.847.267 6.625-.267a10.02 10.02 0 0 0 1.763.855c-6.25 2.672-14.16-.16-9.244-1.55zm-.8-3.473s-1.336 1.015.748 1.23c2.725.267 4.862.32 8.55-.427a3.26 3.26 0 0 0 1.282.801c-7.534 2.244-15.976.214-10.58-1.603zm14.747 6.09s.908.748-1.015 1.336c-3.58 1.07-15.014 1.39-18.22 0-1.122-.48 1.015-1.175 1.7-1.282.695-.16 1.07-.16 1.07-.16-1.23-.855-8.175 1.763-3.526 2.51 12.77 2.084 23.296-.908 19.983-2.404zM12.2 17.633s-5.824 1.39-2.084 1.87c1.603.214 4.755.16 7.694-.053 2.404-.214 4.81-.64 4.81-.64s-.855.374-1.443.748c-5.93 1.55-17.312.855-14.052-.748 2.778-1.336 5.076-1.175 5.076-1.175zm10.42 5.824c5.984-3.1 3.206-6.09 1.282-5.717-.48.107-.695.214-.695.214s.16-.32.534-.427c3.794-1.336 6.786 4.007-1.23 6.09 0 0 .053-.053.107-.16zm-9.83 8.442c5.77.374 14.587-.214 14.8-2.94 0 0-.427 1.07-4.755 1.87-4.916.908-11.007.8-14.587.214 0 0 .748.64 4.542.855z" fill="#4e7896"/>
              <path d="M18.996.001s3.313 3.366-3.152 8.442c-5.183 4.114-1.175 6.465 0 9.137-3.046-2.725-5.236-5.13-3.74-7.373C14.294 6.893 20.332 5.3 18.996.001zm-1.7 15.335c1.55 1.763-.427 3.366-.427 3.366s3.954-2.03 2.137-4.542c-1.656-2.404-2.94-3.58 4.007-7.587 0 0-10.953 2.725-5.717 8.763z" fill="#f58219"/>
            </svg>
          </div>

          {/* React (Bottom Right) */}
          <div className="absolute bottom-[20%] right-[10%] animate-float duration-[24s]">
            <svg width="75" height="75" viewBox="0 0 32 32">
              <g transform="matrix(.05696 0 0 .05696 .647744 2.43826)">
                <circle r="50" cy="237" cx="269" fill="#00d8ff"/>
                <g stroke="#00d8ff" strokeWidth="24" fill="none">
                  <path d="M269 135c67 0 130 10 177 26 57 20 92 49 92 76 0 28-37 60-98 80-46 15-107 23-171 23-66 0-128-7-174-23-59-20-95-52-95-80 0-27 33-56 89-76 47-17 111-26 179-26z"/>
                  <path d="M181 187c34-58 73-108 111-140 45-39 89-55 112-41 24 14 33 62 20 125-10 48-33 104-65 160-33 57-70 107-107 139-47 41-92 56-116 42-23-13-32-57-21-115 9-49 33-110 67-169z" transform="rotate(120, 269, 237)"/>
                  <path d="M181 187c34-58 73-108 111-140 45-39 89-55 112-41 24 14 33 62 20 125-10 48-33 104-65 160-33 57-70 107-107 139-47 41-92 56-116 42-23-13-32-57-21-115 9-49 33-110 67-169z" transform="rotate(240, 269, 237)"/>
                </g>
              </g>
            </svg>
          </div>

          {/* MongoDB (Center) */}
          <div className="absolute top-[30%] left-[30%] animate-drift duration-[28s] opacity-90">
             <svg width="60" height="60" viewBox="0 0 32 32">
               <path d="M15.9.1l.9 1.6c.2.3.4.6.6.8.7.7 1.4 1.5 2 2.3 1.4 1.9 2.4 4 3.1 6.3.4 1.4.6 2.8.7 4.3.1 4.3-1.4 8-4.4 11.1-.5.5-1 .9-1.6 1.3-.3 0-.4-.2-.6-.4-.2-.4-.4-.8-.4-1.3-.1-.5-.2-1-.1-1.6v-.2C16.1 24.2 15.8.2 15.9.1z" fill="#599636"/>
               <path d="M15.9 0c0-.1-.1 0-.1 0 0 .4-.1.7-.3 1-.2.3-.5.5-.8.8-1.5 1.3-2.8 3-3.7 4.8-1.3 2.4-2 5.1-2.2 7.8-.1 1 .3 4.5.6 5.5.9 2.7 2.4 4.9 4.4 6.9.5.5 1 .9 1.6 1.3.1 0 .2-.1.2-.2v-.7l.4-2.6L15.9 0z" fill="#6cac48"/>
               <path d="M16.8 28.8c0-.4.2-.7.4-1.1-.2-.1-.4-.3-.5-.5l-.3-.6c-.2-.7-.3-1.5-.4-2.2v-.5c-.1.1-.1.7-.1.8l-.3 2.4c0 .3-.1.6-.3.9 0 0 0 .1 0 .1.3.9.4 1.9.5 2.8v.3c0 .4 0 .3.3.5.1.1.3.1.4.2.1 0 .1-.1.1-.2l-.1-.6v-1.6c.1-.3.1-.6.1-.8z" fill="#c2bfbf"/>
             </svg>
          </div>

          {/* AWS (Top Center) */}
          <div className="absolute top-[8%] left-[45%] animate-float duration-[21s] opacity-90">
             <svg width="65" height="65" viewBox="0 0 32 32">
               <path d="M15.6 31.4l-7.1-2.6v-10.4l7.1 2.4zm1.3 0l7.1-2.6v-10.4l-7.1 2.4zM9.2 17.6l7.2-2L23.1 17.8l-6.7 2.3zm-2.1-.8L0 14.2V3.8l7.1 2.4zm1.3 0l7.1-2.6V3.8L8.4 6.2zm-7.7-13.8l7.2-2 6.7 2.2-6.7 2.3zm23.1 13.8l-7.1-2.6V3.8l7.1 2.4zm1.3 0l7.1-2.6V3.8l-7.1 2.4zm-7.7-13.8l7.2-2 6.7 2.2-6.7 2.3z" fill="#f90"/>
             </svg>
          </div>

          {/* Node.js (Center Left) */}
          <div className="absolute top-[60%] left-[15%] animate-drift duration-[26s] opacity-90">
            <svg width="60" height="60" viewBox="0 0 32 32" fill="#8cc84b">
              <path d="M14.7.4c.8-.4 1.8-.4 2.6 0l11.9 6.8c.7.4 1.2 1.3 1.2 2.1v13.5c0 .9-.5 1.7-1.3 2.2l-11.9 6.7c-.8.5-1.8.5-2.6-.1l-3.6-2.1c-.2-.1-.5-.3-.7-.5.2-.2.4-.2.6-.3.5-.2 1-.4 1.4-.7.1-.1.3-.1.4 0l3 1.8c.2.1.4 0 .6-.1l11.7-6.6c.1-.1.2-.2.2-.4V9.3c0-.2-.1-.3-.3-.4l-11.7-6.7c-.1-.1-.3-.1-.5 0L3.9 8.9c-.2.1-.3.2-.3.4v13.4c0 .2.1.3.2.4l3.2 1.8c.6.3 1.3.5 2 .3.4-.1.7-.3 1-1.4l.1-13.3c0-.2.2-.4.4-.3h1.5c.2 0 .4.2.3.4l-.5 13.8c0 1.2-.5 2.5-1.6 3.1-1.4.7-3 .6-4.4-.1l-3.4-1.9c-.8-.4-1.3-1.3-1.3-2.2v-13.5C0 7 1 6.2 2.3 5.3l12.4-4.9zM18.1 9.8c1.7-.1 3.6-.1 5.1.8 1.2.7 1.9 2 1.9 3.4-.1.2-.2.3-.4.3-.5 0-1 0-1.5 0-.2 0-.3-.2-.4-.4-.1-.6-.5-1.3-1.1-1.6-.9-.5-2-.4-3-.4-.7.1-1.5.1-2.2.5-.5.3-.6 1-.5 1.5.2.4.6.5 1 .6 2.1.5 4.3.5 6.3 1.2.8.3 1.7.9 2 1.7.4 1.2.2 2.6-.6 3.6-.7.8-1.7 1.2-2.7 1.4-1.3.3-2.7.3-4 .2-1.3-.1-2.6-.5-3.6-1.3-.8-.7-1.2-1.9-1.2-2.9 0-.2.2-.3.4-.3h1.5c.2 0 .4.2.4.4.1.6.3 1.3.9 1.6 1 .7 2.3.6 3.5.6 1 0 2.1-.1 2.9-.7.4-.4.5-1 .4-1.5-.1-.4-.6-.7-1-.8-2.1-.7-4.3-.4-6.3-1.2-.8-.3-1.6-.8-1.9-1.7-.4-1.2-.2-2.7.7-3.6.9-.9 2.2-1.3 3.5-1.4z"/>
            </svg>
          </div>

          {/* MySQL Small (Bottom Center) */}
          <div className="absolute bottom-[25%] left-[40%] animate-float duration-[27s] opacity-80">
            <svg width="45" height="45" viewBox="0 0 25.6 25.6">
               <path d="M179.1 94.9c-3.6-.1-6.3.3-8.7 1.3-.7.3-1.7.3-1.8 1.1.4.4.4.9.7 1.4.5.9 1.5 2.1 2.3 2.7l2.9 2.1c1.7 1.1 3.7 1.7 5.4 2.8 1 .6 2 1.4 2.9 2.1.5.4.8.9 1.4 1.2v-.1c-.3-.4-.4-1-.7-1.4l-1.3-1.3c-1.3-1.7-2.9-3.3-4.6-4.5-1.4-1-4.6-2.3-5.1-4l-.1-.1c1-.1 2.1-.4 3.1-.7 1.5-.4 2.9-.3 4.4-.7l2.1-.6v-.4c-.8-.8-1.4-1.9-2.2-2.6-2.3-2-4.8-3.9-7.4-5.5-1.4-.9-3.2-1.5-4.6-2.2-.5-.3-1.4-.4-1.7-.8-.8-1-1.3-2.3-1.8-3.4l-3.7-7.8c-.8-1.7-1.3-3.5-2.3-5.1C148.6 44 143.6 39.4 136 34.9c-1.7-.9-3.6-1.3-5.7-1.8l-3.3-.2c-.7-.3-1.4-1.2-2.1-1.6C122.4 29.7 115.8 26.2 114 30.7c-1.2 2.9 1.8 5.8 2.8 7.2.8 1 1.7 2.2 2.3 3.3.3.8.4 1.6.7 2.4.7 2 1.4 4.1 2.3 6 .5.9 1 1.9 1.7 2.8.4.5 1 .7 1.1 1.5-.6.9-.7 2.2-1 3.3-1.6 5-1 11.3 1.3 15 .7 1.1 2.4 3.6 4.7 2.6 2-.8 1.6-3.3 2.1-5.6.1-.5 0-.9.3-1.3v.1l1.8 3.7c1.4 2.2 3.8 4.5 5.8 6 1.1.8 1.9 2.2 3.3 2.7v-.1l-.1-.4-.6-.6-2.3-2.7c-1.9-2.5-3.5-5.3-5-8.1-.7-1.4-1.3-3-1.9-4.3-.3-.5-.3-1.3-.7-1.6-.7 1-1.7 1.8-2.1 3-.8 1.9-.9 4.3-1.2 6.7v.1c-1.4-.4-1.9-1.8-2.5-3.1-1.3-3.2-1.6-8.3-.4-11.9.3-.9 1.7-3.9 1.1-4.8-.3-.8-1.2-1.3-1.7-2-.6-.8-1.2-1.9-1.6-2.9-1.1-2.5-1.6-5.3-2.8-7.8-.5-1.2-1.5-2.4-2.2-3.4-.8-1.2-1.8-2.1-2.5-3.5-.2-.5-.5-1.3-.2-1.8.1-.4.3-.5.6-.6.6-.5 2.2.1 2.8.4 1.7.7 3 1.3 4.4 2.2.6.4 1.3 1.3 2.1 1.5h.9c1.4.3 3 .1 4.4.5 2.4.8 4.5 1.9 6.4 3.1 5.8 3.7 10.7 9 13.9 15.3.5 1 .8 2 1.3 3 1 2.2 2.1 4.4 3 6.6.9 2.1 1.8 4.2 3.2 6 .7.9 3.3 1.4 4.6 1.9.9.4 2.3.8 3.1 1.3 1.5.9 3 2 4.5 3 .7.5 2.9 1.7 3 2.5z" transform="scale(0.1)" fill="#00678c"/>
            </svg>
          </div>
          {/* VS Code (Bottom Center-Left) */}
          <div className="absolute bottom-[25%] left-[30%] animate-float duration-[27s] opacity-90">
             <svg width="55" height="55" viewBox="0 0 64 64" fill="#007acc">
               <path d="M48 0v55L0 47.84 48 64l16-6.66V6.65zM31.2 9.36L16.5 23.9l-8.85-6.67L4 18.45l9 8.9-9 8.9 3.65 1.22 8.85-6.67 14.7 14.53L40 41.6V13.1zm0 10.37V35l-10.1-7.65z"/>
             </svg>
          </div>

          {/* GitHub (Top Center-Left) */}
          <div className="absolute top-[25%] left-[25%] animate-drift duration-[20s] opacity-80 mix-blend-screen bg-white rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 24 24">
              <path fill="#24292e" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
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
