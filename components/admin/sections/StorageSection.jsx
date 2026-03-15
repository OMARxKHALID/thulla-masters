"use client";

import { RefreshCw, Loader2, HardDrive, Package, Zap, Calendar, Trash2, Info } from "lucide-react";

export default function StorageSection({ 
  blobs, 
  loadingBlobs, 
  fetchBlobs, 
  handleDeleteBlob, 
  isDeletingBlob, 
  apkDownloadUrl 
}) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-zinc-500 text-[13px] font-black uppercase tracking-[0.2em]">Storage Management</h3>
          <button 
            onClick={fetchBlobs}
            disabled={loadingBlobs}
            className="flex items-center gap-2.5 text-zinc-500 hover:text-yellow-400 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loadingBlobs ? 'animate-spin text-yellow-500' : ''}`} />
            <span className="text-[12px] font-black uppercase tracking-widest">
              {loadingBlobs ? 'Scanning...' : 'Scan Storage'}
            </span>
          </button>
        </div>

        <div className="bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          {loadingBlobs && blobs.length === 0 ? (
            <div className="p-24 flex flex-col items-center justify-center gap-6">
              <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
              <p className="text-[13px] uppercase tracking-widest text-zinc-500 font-bold">Retrieving assets...</p>
            </div>
          ) : blobs.length === 0 ? (
            <div className="p-24 flex flex-col items-center justify-center gap-6 opacity-40">
              <HardDrive className="w-16 h-16 text-zinc-600" />
              <p className="text-[13px] uppercase tracking-widest text-zinc-500 font-bold text-center">
                Cloud storage is currently empty<br/>
                <span className="text-[10px] opacity-60">Upload an APK to start managing assets</span>
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {blobs.map((blob) => (
                <div key={blob.url} className="p-7 flex items-center gap-6 hover:bg-white/[0.02] transition-colors group">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    apkDownloadUrl === blob.url 
                      ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20" 
                      : "bg-white/5 text-zinc-500 border border-white/5"
                  }`}>
                    <Package className="w-8 h-8" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-white text-[14px] font-bold truncate tracking-tight">{blob.pathname}</h4>
                      {apkDownloadUrl === blob.url && (
                        <span className="text-[10px] font-black bg-yellow-400 text-zinc-900 px-2.5 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-yellow-400/10">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-5 text-zinc-500 text-[12px] font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        {(blob.size / (1024 * 1024)).toFixed(1)} MB
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(blob.uploadedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteBlob(blob.url)}
                    disabled={isDeletingBlob === blob.url}
                    className={`p-3.5 rounded-xl transition-all ${
                      isDeletingBlob === blob.url 
                        ? "bg-red-500/10 text-red-500" 
                        : "bg-white/5 text-zinc-500 hover:bg-red-500/10 hover:text-red-500 active:scale-95 shadow-xl"
                    }`}
                    title="Delete Permanently"
                  >
                    {isDeletingBlob === blob.url ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-start gap-4 p-6 bg-yellow-400/5 border border-yellow-400/10 rounded-2xl">
          <Info className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-[13px] leading-relaxed text-zinc-400">
            <span className="text-yellow-400 font-bold uppercase tracking-widest mr-1">Cloud Cleanup:</span>
            Files are automatically synchronized. Uploading a new APK will automatically remove the previous version from storage to optimize space.
          </p>
        </div>
      </section>
    </div>
  );
}
