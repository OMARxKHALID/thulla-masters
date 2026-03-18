"use client";

import {
  Package,
  SquarePlay,
} from "lucide-react";

export default function GeneralSection({
  settings,
  setSettings,
}) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-5">
        <h3 className="text-zinc-600 text-[12px] font-black uppercase tracking-[0.2em] mb-4">
          Management
        </h3>
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-8">

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2.5 px-1">
              <Package className="w-4 h-4 text-yellow-400" /> APK Distribution URL
            </label>
            <input
              type="text"
              value={settings.apkDownloadUrl}
              onChange={(e) =>
                setSettings({ ...settings, apkDownloadUrl: e.target.value })
              }
              className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-[13px] focus:border-white/20 transition-all font-mono outline-none text-zinc-300"
              placeholder="Paste APK download URL here…"
            />
            <p className="text-[10px] text-zinc-600 px-1 font-bold uppercase tracking-wider">
              Paste any direct download URL here
            </p>
          </div>

          <div className="h-px bg-white/5" />

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2.5 px-1">
              <SquarePlay className="w-4 h-4 text-red-500" /> Help Resource
            </label>
            <input
              type="text"
              value={settings.buySellUrl}
              onChange={(e) =>
                setSettings({ ...settings, buySellUrl: e.target.value })
              }
              className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-[13px] focus:border-white/20 transition-all font-mono outline-none text-zinc-300"
              placeholder="YouTube URL"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
