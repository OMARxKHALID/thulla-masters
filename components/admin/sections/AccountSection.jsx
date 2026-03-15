"use client";

import { User as UserIcon, Mail, KeyRound } from "lucide-react";

export default function AccountSection({ userProfile, setUserProfile }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-3">
        <h3 className="text-zinc-600 text-[13px] font-black uppercase tracking-[0.2em]">Profile</h3>

        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-10 lg:p-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[12px] font-black uppercase tracking-widest text-zinc-600 px-1">Display Name</label>
              <div className="relative group">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-4.5 h-4.5 transition-colors" />
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-[14px] outline-none focus:border-white/20 transition-all text-zinc-400"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-black uppercase tracking-widest text-zinc-600 px-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-4.5 h-4.5 transition-colors" />
                <input
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-[14px] outline-none focus:border-white/20 transition-all font-mono text-zinc-400"
                  placeholder="admin@example.com"
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          <div className="space-y-6">
            <h4 className="text-white text-[14px] font-bold px-1 uppercase tracking-widest opacity-60">Security</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[12px] font-black uppercase tracking-widest text-zinc-600 px-1">Current</label>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-4.5 h-4.5 transition-colors" />
                  <input
                    type="password"
                    value={userProfile.currentPassword}
                    onChange={(e) => setUserProfile({ ...userProfile, currentPassword: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-[14px] outline-none focus:border-white/20 transition-all text-zinc-400"
                    placeholder="Verify"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-black uppercase tracking-widest text-zinc-600 px-1">New</label>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-4.5 h-4.5 transition-colors" />
                  <input
                    type="password"
                    value={userProfile.newPassword}
                    onChange={(e) => setUserProfile({ ...userProfile, newPassword: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-[14px] outline-none focus:border-white/20 transition-all text-zinc-400"
                    placeholder="New Pass"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-black uppercase tracking-widest text-zinc-600 px-1">Confirm</label>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-4.5 h-4.5 transition-colors" />
                  <input
                    type="password"
                    value={userProfile.confirmPassword}
                    onChange={(e) => setUserProfile({ ...userProfile, confirmPassword: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-[14px] outline-none focus:border-white/20 transition-all text-zinc-400"
                    placeholder="Confirm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
