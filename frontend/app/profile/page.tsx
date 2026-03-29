"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Briefcase, Globe, Save, Loader2, Award, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    bio: "",
    phone: "",
    location: "",
    skills: "",
    socialLinks: "",
  });

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile")
        .then((res) => res.json())
        .then((data) => {
          setProfile({
            bio: data.bio || "",
            phone: data.phone || "",
            location: data.location || "",
            skills: data.skills || "",
            socialLinks: data.socialLinks || "",
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch profile:", err);
          setLoading(false);
        });
    } else if (status === "unauthenticated") {
      window.location.href = "/";
    }
  }, [status]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || status === "loading") {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  const userRole = (session?.user as any)?.role || "USER";

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-12 space-y-12 h-full overflow-y-auto no-scrollbar">
      {/* Profile Header */}
      <section className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-[40px] border-2 border-slate-900 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="w-32 h-32 rounded-3xl bg-slate-50 border-2 border-slate-900 flex items-center justify-center text-5xl font-black text-primary shadow-2xl relative z-10">
          {session?.user?.name?.[0] || "U"}
        </div>
        <div className="text-center md:text-left space-y-3 relative z-10 flex-1">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{session?.user?.name}</h1>
            <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-orange-500 text-white border-2 border-slate-900 shadow-sm">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">{userRole}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-500 text-sm font-bold">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>{session?.user?.email}</span>
            </div>
            {profile.location && (
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{profile.location}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
        <div className="md:col-span-2 space-y-8">
          <div className="bento-item p-8 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 border-b-2 border-slate-100 pb-4">Professional Bio</h3>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Tell us about yourself..."
              className="w-full h-40 bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 font-bold text-slate-900 focus:border-primary transition-all outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bento-item p-6 space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone Number</label>
              <div className="flex items-center gap-3 bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3">
                <Phone size={16} className="text-slate-400" />
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="+91 XXXXXXXXXX"
                  className="bg-transparent font-bold text-slate-900 outline-none w-full"
                />
              </div>
            </div>
            <div className="bento-item p-6 space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Location</label>
              <div className="flex items-center gap-3 bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3">
                <MapPin size={16} className="text-slate-400" />
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  placeholder="City, Country"
                  className="bg-transparent font-bold text-slate-900 outline-none w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bento-item p-6 space-y-6 bg-slate-900 text-white border-slate-900">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Quick Actions</h3>
            <button
              type="submit"
              disabled={saving}
              className="w-full py-4 bg-primary rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              Save Profile
            </button>
          </div>

          <div className="bento-item p-6 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Skills & Expertise</h3>
            <div className="space-y-4">
              <textarea
                value={profile.skills}
                onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                placeholder="React, Next.js, Architecture..."
                className="w-full h-32 bg-slate-50 border-2 border-slate-200 rounded-xl p-4 text-xs font-bold text-slate-900 focus:border-primary transition-all outline-none resize-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
