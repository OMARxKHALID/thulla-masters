"use client";

import { User as UserIcon, Mail, KeyRound } from "lucide-react";

export default function AccountSection({ userProfile, setUserProfile }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-3">
        <h3 className="text-zinc-600 text-[12px] font-black uppercase tracking-[0.2em] mb-4">Profile Settings</h3>

        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1">Display Name</label>
              <div className="relative group">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-4.5 h-4.5 transition-colors" />
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                  className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-5 py-4 text-[13px] outline-none focus:border-white/20 transition-all text-zinc-300"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1">Email Account</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-4.5 h-4.5 transition-colors" />
                <input
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                  className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-5 py-4 text-[13px] outline-none focus:border-white/20 transition-all font-mono text-zinc-300"
                  placeholder="admin@example.com"
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          <div className="space-y-6">
            <h4 className="text-white text-[11px] font-black px-1 uppercase tracking-[0.25em] opacity-40">Security Clearance</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1">Current Pass</label>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-4.5 h-4.5 transition-colors" />
                  <input
                    type="password"
                    value={userProfile.currentPassword}
                    onChange={(e) => setUserProfile({ ...userProfile, currentPassword: e.target.value })}
                    className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-5 py-4 text-[13px] outline-none focus:border-white/20 transition-all text-zinc-300"
                    placeholder="Verify"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1">New Password</label>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-4.5 h-4.5 transition-colors" />
                  <input
                    type="password"
                    value={userProfile.newPassword}
                    onChange={(e) => setUserProfile({ ...userProfile, newPassword: e.target.value })}
                    className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-5 py-4 text-[13px] outline-none focus:border-white/20 transition-all text-zinc-300"
                    placeholder="New Pass"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1">Confirm New</label>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-4.5 h-4.5 transition-colors" />
                  <input
                    type="password"
                    value={userProfile.confirmPassword}
                    onChange={(e) => setUserProfile({ ...userProfile, confirmPassword: e.target.value })}
                    className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-5 py-4 text-[13px] outline-none focus:border-white/20 transition-all text-zinc-300"
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
