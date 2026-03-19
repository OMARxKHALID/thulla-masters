"use client";

import { User as UserIcon, Mail, KeyRound } from "lucide-react";

export default function AccountSection({ userProfile, setUserProfile }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-8">
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-10 space-y-12">
          
          <div className="space-y-6">
            <div className="flex items-center gap-3 px-1">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <UserIcon className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h4 className="text-white text-[13px] font-black uppercase tracking-widest leading-none">Profile Identity</h4>
                <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mt-1">Manage your public display information</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              <div className="flex flex-col">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1 mb-2.5">Display Name</label>
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-4.5 h-4.5 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                    className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-5 py-4 text-[13px] outline-none focus:border-white/20 transition-all text-zinc-300"
                    placeholder="Admin Name"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1 mb-2.5">Email Account</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-4.5 h-4.5 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                    className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-5 py-4 text-[13px] outline-none focus:border-white/20 transition-all font-mono text-zinc-300"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          <div className="space-y-6">
            <div className="flex items-center gap-3 px-1">
              <div className="w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center border border-yellow-400/20">
                <KeyRound className="w-4 h-4 text-yellow-500" />
              </div>
              <div>
                <h4 className="text-white text-[13px] font-black uppercase tracking-widest leading-none">Security & Security</h4>
                <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mt-1">Update your authentication credentials</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="flex flex-col">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1 mb-2.5">Current Password</label>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-4.5 h-4.5 group-focus-within:text-yellow-400 transition-colors" />
                  <input
                    type="password"
                    value={userProfile.currentPassword}
                    onChange={(e) => setUserProfile({ ...userProfile, currentPassword: e.target.value })}
                    className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-5 py-4 text-[13px] outline-none focus:border-white/20 transition-all text-zinc-300"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1 mb-2.5">New Password</label>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-4.5 h-4.5 group-focus-within:text-yellow-400 transition-colors" />
                  <input
                    type="password"
                    value={userProfile.newPassword}
                    onChange={(e) => setUserProfile({ ...userProfile, newPassword: e.target.value })}
                    className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-5 py-4 text-[13px] outline-none focus:border-white/20 transition-all text-zinc-300"
                    placeholder="Min. 8 chars"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1 mb-2.5">Verify Pass</label>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-4.5 h-4.5 group-focus-within:text-yellow-400 transition-colors" />
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
