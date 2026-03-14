"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

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
    <div className="min-h-screen flex bg-white">

      {/* Left Panel - Brand */}
      <div className="hidden lg:flex w-1/2 bg-blue-700 flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-red-500 blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-white p-6 rounded-3xl shadow-2xl mb-12">
            <Image
              src="/logo.png"
              alt="Codegnan Logo"
              width={180}
              height={180}
              className="object-contain"
            />
          </div>
          <h2 className="text-white text-4xl font-extrabold text-center leading-tight mb-6">
            Everything you need,<br />in one place.
          </h2>

          {/* Decorative dots */}
          <div className="flex gap-3 mt-8">
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-blue-300"></div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-8 lg:p-12 relative">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex lg:hidden justify-center mb-10">
            <Image
              src="/logo.png"
              alt="Codegnan Logo"
              width={120}
              height={120}
            />
          </div>

          {/* Heading */}
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-blue-900 mb-3">Welcome back</h1>
            <p className="text-blue-600 font-medium">Sign in to your Codegnan account</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            <div>
              <label className="text-sm font-bold text-blue-900 uppercase tracking-wider">Email address</label>
              <input
                type="email"
                placeholder="you@codegnan.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-4 py-3.5 bg-white text-blue-900 rounded-xl border-2 border-blue-100 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium placeholder:text-blue-300"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-blue-900 uppercase tracking-wider">Password</label>
                <a href="#" className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors">Forgot password?</a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-white text-blue-900 rounded-xl border-2 border-blue-100 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium placeholder:text-blue-300"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-500/30 transform hover:-translate-y-0.5"
            >
              Sign In to Codegnan Spark
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-blue-100"></div>
            <span className="text-blue-400 font-medium text-sm px-2">OR</span>
            <div className="flex-1 h-px bg-blue-100"></div>
          </div>

          {/* SSO */}
          <button className="w-full py-3.5 border-2 border-blue-100 text-blue-900 font-bold rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all flex items-center justify-center gap-3">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            Continue with Single Sign-On
          </button>

          <p className="text-center text-blue-400 font-medium text-sm mt-12">
            © 2025 Codegnan®. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
