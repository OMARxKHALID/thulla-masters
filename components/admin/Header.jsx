"use client";

import { Menu, Home, Save, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header({ activeTab, saving, onSave, onMenuOpen }) {
  const router = useRouter();

  const getTitle = () => {
    switch (activeTab) {
      case 'content': return 'Dashboard';
      case 'social': return 'Social Links';
      case 'storage': return 'Cloud Storage';
      case 'account': return 'Account';
      default: return 'Admin';
    }
  };

  return (
    <header className="h-14 lg:h-16 border-b border-white/5 bg-black/20 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuOpen}
          className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white shadow-xl transition-all active:scale-95"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-white flex items-center gap-2.0">
            {getTitle()}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-900 font-black rounded-lg transition-all active:scale-95 disabled:opacity-50 text-[10px] sm:text-xs shadow-xl shadow-yellow-400/10"
        >
          {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
          {saving ? "SAVING..." : activeTab === 'account' ? "UPDATE PROFILE" : "SAVE CHANGES"}
        </button>
      </div>
    </header>
  );
}
