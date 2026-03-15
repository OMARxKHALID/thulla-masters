"use client";

import { BarChart3, RotateCcw, RefreshCw, Package, Upload, Loader2, SquarePlay, HardDrive, AlertCircle } from "lucide-react";

export default function GeneralSection({ 
  settings, 
  setSettings, 
  syncing, 
  fetchLatestData, 
  setShowResetModal, 
  uploading, 
  uploadProgress, 
  handleFileUpload,
  storageQuota
}) {
  const isStorageCritical = storageQuota.percentage > 85;
  const isStorageFull = storageQuota.percentage >= 100;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Storage Alert */}
      {(isStorageCritical || isStorageFull) && (
        <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${
          isStorageFull 
            ? "bg-red-500/10 border-red-500/20 text-red-500" 
            : "bg-orange-500/10 border-orange-500/20 text-orange-400"
        }`}>
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-widest">
              {isStorageFull ? "Storage Limit Reached" : "Storage Almost Full"}
            </p>
          </div>
        </div>
      )}

      <section className="space-y-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-zinc-600 text-[13px] font-black uppercase tracking-[0.2em]">Insights</h3>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setShowResetModal(true)}
              className="flex items-center gap-3 text-zinc-600 hover:text-red-400 transition-all group"
              title="Reset Counter"
            >
              <RotateCcw className="w-4.5 h-4.5 group-hover:rotate-[-90deg] transition-transform" />
              <span className="text-[11px] font-black uppercase tracking-widest">Reset</span>
            </button>
            <button 
              onClick={fetchLatestData}
              disabled={syncing}
              className="flex items-center gap-3 text-zinc-600 hover:text-yellow-400 transition-all disabled:opacity-50 group"
            >
              <RefreshCw className={`w-4.5 h-4.5 ${syncing ? 'animate-spin text-yellow-500' : 'group-hover:rotate-180 transition-transform'}`} />
              <span className="text-[11px] font-black uppercase tracking-widest">Reload</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Downloads Card */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 sm:p-12 relative overflow-hidden group min-h-[300px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-10 opacity-[0.05]">
              <BarChart3 className="w-56 h-56 text-white" />
            </div>
            
            <div className="relative z-10">
              <p className="text-zinc-500 text-[12px] uppercase tracking-[0.2em] font-black mb-3">Total Downloads</p>
              <h4 className="text-white text-8xl font-black tracking-tighter leading-none">
                {settings.downloadCount.toLocaleString()}
              </h4>
            </div>

            <div className="mt-10 flex items-end gap-3.5 h-28 relative z-10">
              {(() => {
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const today = new Date();
                const last7Days = Array.from({length: 7}, (_, i) => {
                  const d = new Date();
                  d.setDate(today.getDate() - (6 - i));
                  return d.toDateString();
                });
                
                const counts = last7Days.map(dateStr => {
                  const targetDate = new Date(dateStr);
                  return (settings.downloadHistory || []).filter(h => {
                    if (!h || !h.timestamp) return false;
                    const hDate = new Date(h.timestamp);
                    return hDate.getDate() === targetDate.getDate() && 
                           hDate.getMonth() === targetDate.getMonth() && 
                           hDate.getFullYear() === targetDate.getFullYear();
                  }).length;
                });
                
                const maxCount = Math.max(...counts, 1);
                
                return counts.map((count, i) => (
                  <div key={i} className="flex-1 h-full flex flex-col justify-end items-center gap-3 group/bar relative">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-all scale-90 group-hover/bar:scale-100 whitespace-nowrap z-20 pointer-events-none border border-white/10 shadow-3xl">
                      {count} Downloads
                    </div>
                    <div className="w-full flex-1 flex flex-col justify-end">
                      <div 
                        className="w-full bg-white/5 group-hover/bar:bg-yellow-400/20 rounded-[8px] transition-all relative overflow-hidden" 
                        style={{ height: `${Math.max((count / maxCount) * 100, 5)}%` }}
                      >
                        {count > 0 && <div className="w-full h-full bg-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.7)]" />}
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{days[new Date(last7Days[i]).getDay()]}</span>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Quota Card */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 sm:p-12 relative overflow-hidden min-h-[300px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-10 opacity-[0.05]">
              <HardDrive className="w-56 h-56 text-white" />
            </div>
            
            <div className="relative z-10">
              <p className="text-zinc-500 text-[12px] uppercase tracking-[0.2em] font-black mb-3">Storage Status</p>
              <div className="flex items-baseline gap-4">
                <h4 className="text-white text-8xl font-black tracking-tighter leading-none">
                  {storageQuota.percentage}%
                </h4>
                <span className="text-zinc-600 text-[12px] font-black uppercase tracking-[0.2em]">Usage</span>
              </div>
            </div>

            <div className="mt-10 space-y-6 relative z-10">
              <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-1">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    storageQuota.percentage > 90 ? 'bg-red-500 shadow-[0_0_20px_#ef4444]' : storageQuota.percentage > 70 ? 'bg-orange-500' : 'bg-yellow-400 shadow-[0_0_20px_#facc15]'
                  }`}
                  style={{ width: `${storageQuota.percentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">
                <span className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">{(storageQuota.used / (1024 * 1024)).toFixed(1)} MB USED</span>
                <span className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">{(storageQuota.limit / (1024 * 1024)).toFixed(0)} MB TOTAL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <h3 className="text-zinc-600 text-[11px] font-black uppercase tracking-[0.2em]">Management</h3>
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-7 sm:p-9 space-y-7">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2.5 px-1">
              <Package className="w-4 h-4 text-yellow-400/80" /> APK Distribution
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={settings.apkDownloadUrl}
                onChange={(e) => setSettings({...settings, apkDownloadUrl: e.target.value})}
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-5 py-3 text-[13px] focus:border-yellow-400/40 transition-all font-mono outline-none text-zinc-400"
                placeholder="APK URL"
              />
              <label className="bg-yellow-400 hover:bg-yellow-300 text-zinc-900 rounded-xl px-6 py-3 flex items-center justify-center cursor-pointer transition-all active:scale-95 shadow-xl shadow-yellow-400/10 active:shadow-none">
                {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                <span className="ml-2.5 text-[11px] font-black uppercase tracking-wider">Update</span>
                <input type="file" className="hidden" accept=".apk" onChange={handleFileUpload} disabled={isStorageFull} />
              </label>
            </div>

            {uploading && (
              <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 animate-in zoom-in-95 duration-500">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeWidth="3" className="text-white/5" />
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={125.6}
                        strokeDashoffset={125.6 - (125.6 * uploadProgress) / 100}
                        strokeLinecap="round"
                        className="text-yellow-400"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[9px] font-black text-white">{uploadProgress}%</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-[10px] font-black uppercase tracking-widest mb-0.5">Syncing Asset</p>
                    <p className="text-zinc-500 text-[9px] truncate tracking-tight">thulla-masters.apk</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="h-px bg-white/5" />

          <div className="space-y-3">
            <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2 px-1">
              <SquarePlay className="w-3.5 h-3.5 text-red-500/70" /> Help Resource
            </label>
            <input
              type="text"
              value={settings.buySellUrl}
              onChange={(e) => setSettings({...settings, buySellUrl: e.target.value})}
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs focus:border-yellow-400/30 transition-all font-mono outline-none text-zinc-400"
              placeholder="YouTube URL"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
