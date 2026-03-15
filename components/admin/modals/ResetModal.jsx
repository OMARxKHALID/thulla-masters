"use client";

import { RotateCcw, X, KeyRound, Loader2, ShieldCheck } from "lucide-react";

export default function ResetModal({ 
  showResetModal, 
  setShowResetModal, 
  resetPassword, 
  setResetPassword, 
  handleResetDownloads, 
  isResetting 
}) {
  if (!showResetModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#050512]/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={() => setShowResetModal(false)} />
      <form 
        onSubmit={handleResetDownloads}
        className="relative w-full max-w-md bg-[#0a0a1f] border border-white/10 rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-black text-xl flex items-center gap-3">
            <RotateCcw className="text-red-500 w-6 h-6" />
            Reset Counter
          </h3>
          <button type="button" onClick={() => setShowResetModal(false)} className="text-zinc-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
          This will permanently reset the download counter to <span className="text-white font-bold">zero</span>. Please enter your password to confirm.
        </p>
        
        <div className="space-y-4">
          <div className="relative group">
            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4 group-focus-within:text-red-400 transition-colors" />
            <input
              type="password"
              value={resetPassword}
              onChange={(e) => setResetPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-xs outline-none focus:border-red-500/30 transition-all text-white"
              placeholder="Enter admin password"
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            disabled={isResetting || !resetPassword}
            className="w-full py-4 bg-red-500 hover:bg-red-400 text-white font-black rounded-2xl transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-red-500/10 flex items-center justify-center gap-2"
          >
            {isResetting ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
            {isResetting ? "RESETTING..." : "CONFIRM RESET"}
          </button>
        </div>
      </form>
    </div>
  );
}
