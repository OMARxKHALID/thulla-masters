"use client";

import { 
  ShieldCheck, X, AppWindow, Globe2, HardDrive, User as UserIcon, LogOut, Home
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Sidebar({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen, logout }) {
  const router = useRouter();

  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setIsSidebarOpen(false);
      }}
      className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all font-bold text-xs ${
        activeTab === id 
          ? "bg-yellow-400 text-zinc-900 shadow-lg shadow-yellow-400/10" 
          : "text-zinc-500 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <>
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[270px] bg-[#0a0a1f] border-r border-white/5 flex flex-col p-6 
        transition-transform duration-300 transform lg:static lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex items-center justify-between mb-8 px-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-yellow-400 rounded-lg flex items-center justify-center border border-yellow-500/50 shadow-lg shadow-yellow-400/20">
              <ShieldCheck className="text-zinc-900 w-5 h-5" />
            </div>
            <div>
              <h1 className="text-white font-black tracking-tight leading-none text-base">THULLA</h1>
              <p className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold mt-1 whitespace-nowrap">Control Center</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => router.push("/")}
              className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-zinc-500 hover:text-yellow-400 hover:bg-white/10 transition-all group"
              title="Return to Website"
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1.5 text-zinc-500 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-black mb-4 px-2">Management</p>
          <NavItem id="content" icon={AppWindow} label="General" />
          <NavItem id="social" icon={Globe2} label="Social Links" />
          <NavItem id="storage" icon={HardDrive} label="Cloud Storage" />
          <NavItem id="account" icon={UserIcon} label="Account Settings" />
        </div>

        <div className="mt-auto pt-6 border-t border-white/5">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-zinc-600 hover:text-red-400 hover:bg-red-400/5 transition-all font-bold text-xs"
          >
            <LogOut className="w-4 h-4" />
            Logout Session
          </button>
        </div>
      </aside>
    </>
  );
}
