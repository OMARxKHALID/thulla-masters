"use client";

import {
  Package,
  SquarePlay,
  Settings as SettingsIcon,
  Link as LinkIcon,
} from "lucide-react";

export default function GeneralSection({
  settings,
  setSettings,
}) {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <section className="space-y-8">
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-10 space-y-12">
          
          <div className="space-y-6">
            <div className="flex items-center gap-3 px-1">
              <div className="w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center border border-yellow-400/20">
                <SettingsIcon className="w-4 h-4 text-yellow-500" />
              </div>
              <div>
                <h4 className="text-white text-[13px] font-black uppercase tracking-widest leading-none">Core Configuration</h4>
                <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mt-1">Manage global application parameters</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 pt-2">
              <div className="flex flex-col">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1 mb-2.5 flex items-center gap-2">
                   <Package className="w-3.5 h-3.5 text-yellow-400" /> APK Distribution URL
                </label>
                <div className="relative group">
                   <input
                     type="text"
                     value={settings.apkDownloadUrl}
                     onChange={(e) =>
                       setSettings({ ...settings, apkDownloadUrl: e.target.value })
                     }
                     className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-[13px] focus:border-white/20 transition-all font-mono outline-none text-zinc-300"
                     placeholder="Direct APK link…"
                   />
                </div>
                <p className="text-[9px] text-zinc-600 px-1 font-bold uppercase tracking-widest mt-2">
                  This URL will be linked to the primary download action
                </p>
              </div>

              <div className="h-px bg-white/5" />

              <div className="flex flex-col">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1 mb-2.5 flex items-center gap-2">
                   <SquarePlay className="w-3.5 h-3.5 text-red-500" /> Help Resource
                </label>
                <div className="relative group">
                   <input
                     type="text"
                     value={settings.buySellUrl}
                     onChange={(e) =>
                       setSettings({ ...settings, buySellUrl: e.target.value })
                     }
                     className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-[13px] focus:border-white/20 transition-all font-mono outline-none text-zinc-300"
                     placeholder="YouTube / Documentation link…"
                   />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-10 space-y-12">
          
          <div className="space-y-6">
            <div className="flex items-center gap-3 px-1">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <LinkIcon className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <h4 className="text-white text-[13px] font-black uppercase tracking-widest leading-none">Traffic Bridge</h4>
                <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mt-1">Infrastructure and redirect management</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-10 pt-2">
              <div className="flex flex-col">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1 mb-2.5 flex items-center gap-2">
                   <LinkIcon className="w-3.5 h-3.5 text-blue-400" /> Redirect Bridge URL
                </label>
                <div className="relative group">
                   <input
                     type="text"
                     value={settings.redirectUrl}
                     onChange={(e) =>
                       setSettings({ ...settings, redirectUrl: e.target.value })
                     }
                     className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-[13px] focus:border-white/20 transition-all font-mono outline-none text-zinc-300"
                     placeholder="External Redirect URL (Optional)…"
                   />
                </div>
                <p className="text-[9px] text-zinc-600 px-1 font-bold uppercase tracking-widest mt-2">
                  When active, visitors will be bridged to this destination automatically
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
