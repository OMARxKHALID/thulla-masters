"use client";

import { useState, useEffect } from "react";
import {
  Activity,
  MapPin,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Search,
  RefreshCw,
  Users,
  Download,
  Link2,
  ChevronDown,
  Monitor,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RollingNumber from "@/components/shared/RollingNumber";
import { formatLocation } from "@/lib/utils";

export default function TrafficSection({ 
  settings, 
  syncing, 
  fetchLatestData 
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const itemsPerPage = 8;

  useEffect(() => {
    if (syncing) {
      setTrigger(true);
      const timer = setTimeout(() => setTrigger(false), 50);
      return () => clearTimeout(timer);
    }
  }, [syncing]);

  const downloads = (settings.downloadHistory || []).map(d => ({ ...d, type: 'download' }));
  const visits = (settings.visitorHistory || []).map(v => ({ ...v, type: 'visit' }));
  
  const baseData = [...downloads, ...visits].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  const filteredData = baseData.filter((entry) => {
    const entryDate = new Date(entry.timestamp);
    const today = new Date();
    
    if (dateRange !== "all") {
      const compareDate = new Date(entryDate);
      compareDate.setHours(0, 0, 0, 0);
      const todayStart = new Date(today);
      todayStart.setHours(0, 0, 0, 0);

      if (dateRange === "today") {
        if (compareDate.getTime() !== todayStart.getTime()) return false;
      }

      if (dateRange === "7days") {
        const weekAgo = new Date(todayStart);
        weekAgo.setDate(todayStart.getDate() - 7);
        if (entryDate < weekAgo) return false;
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const fields = [entry.ip, entry.country, entry.city, entry.browser, entry.os, formatLocation(entry.country), entry.referer, entry.type];
      return fields.some(val => val && val.toLowerCase().includes(q));
    }

    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const currentData = filteredData.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-6">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-2 px-1">
          <div className="flex items-center justify-between gap-6 w-full">
            <div className="flex items-center gap-3.5 px-1 truncate">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shrink-0">
                <Activity className="w-5 h-5 text-orange-500" />
              </div>
              <div className="truncate">
                <h4 className="text-white text-[14px] font-black uppercase tracking-widest leading-none">Activity Feed</h4>
                <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mt-1.5 truncate">Live visitor intelligence stream</p>
              </div>
            </div>
            <div className="flex items-center gap-4 xl:hidden shrink-0">
               <button onClick={fetchLatestData} disabled={syncing} className="text-zinc-600 hover:text-yellow-400">
                  <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin text-yellow-500" : ""}`} />
                </button>
               <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                Hit: <RollingNumber value={filteredData.length} refreshTrigger={trigger} />
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:flex items-center gap-4">
            <div className="flex bg-black/40 border border-white/5 rounded-xl p-1 shrink-0">
              {["all", "7days", "today"].map((range) => (
                <button
                  key={range}
                  onClick={() => { setDateRange(range); setCurrentPage(1); setExpandedIndex(null); }}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                    dateRange === range ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {range === "all" ? "All Time" : range === "7days" ? "7 Days" : "Today"}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); setExpandedIndex(null); }}
                placeholder="Search IPs, Locations..."
                className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-5 py-3.5 text-[12px] font-mono outline-none text-zinc-300"
              />
            </div>

            <div className="hidden xl:flex items-center gap-4 ml-2 text-[10px] font-black uppercase tracking-widest text-zinc-600">
              Matches: <span className="text-zinc-400 tabular-nums"><RollingNumber value={filteredData.length} refreshTrigger={trigger} /></span>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white/[0.02] text-[10px] font-black uppercase tracking-widest text-zinc-500 border-b border-white/5">
                <tr>
                  <th className="px-8 py-6">Event Type</th>
                  <th className="px-8 py-6">Time / Date</th>
                  <th className="px-8 py-6">Location</th>
                  <th className="px-8 py-6">Device Info</th>
                  <th className="px-8 py-6">Details / IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-400">
                {currentData.length === 0 ? (
                  <tr><td colSpan={5} className="px-8 py-20 text-center text-[10px] text-zinc-600 uppercase font-black tracking-widest">No activity matched your filters.</td></tr>
                ) : (
                  currentData.map((entry, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.015] transition-colors group/row">
                      <td className="px-8 py-5.5">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[9px] font-black uppercase ${
                          entry.type === 'download' ? "bg-yellow-400/5 text-yellow-400 border-yellow-400/10" : "bg-blue-400/5 text-blue-400 border-blue-400/10"
                        }`}>
                          {entry.type === 'download' ? <Download className="w-3" /> : <Users className="w-3" />}
                          {entry.type}
                        </div>
                      </td>
                      <td className="px-8 py-5.5 text-[11px] font-mono font-black">
                         <span className="text-zinc-300 uppercase">{new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                         <span className="text-zinc-600 ml-2 text-[9px] tracking-tighter">{new Date(entry.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                      </td>
                      <td className="px-8 py-5.5 text-[13px] font-bold text-zinc-300">
                        {formatLocation(entry.country)} {entry.city && entry.city !== "Unknown" && <span className="text-zinc-600 font-normal">/ {entry.city}</span>}
                      </td>
                      <td className="px-8 py-5.5 flex items-center gap-2">
                        <span className="text-zinc-300 font-bold">{entry.os || "Unknown"}</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-500 text-[9px] uppercase font-black tracking-widest">{entry.browser || "Unknown"}</span>
                      </td>
                      <td className="px-8 py-5.5">
                        <div className="flex flex-col">
                           <span className="text-[11px] text-zinc-400 font-bold flex items-center gap-1.5">
                              <Link2 className="w-3 text-indigo-400" /> {entry.referer?.replace('https://', '').replace('www.', '') || "Direct"}
                           </span>
                           <span className="text-[9px] font-mono text-zinc-700 font-black">{entry.ip}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="md:hidden flex flex-col divide-y divide-white/5">
            {currentData.length === 0 ? (
              <div className="p-12 text-center text-[10px] font-black text-zinc-600 uppercase tracking-widest">No Results Found</div>
            ) : (
              currentData.map((entry, idx) => (
                <div key={idx} className="flex flex-col">
                   <div 
                      onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                      className="p-6 bg-white/[0.01] flex items-center justify-between"
                   >
                     <div className="flex items-center gap-4">
                        <div className={`w-11 h-11 flex items-center justify-center rounded-xl border shrink-0 ${entry.type === 'download' ? "bg-yellow-400/5 text-yellow-400 border-yellow-400/10" : "bg-blue-400/5 text-blue-400 border-blue-400/10"}`}>
                           {entry.type === 'download' ? <Download className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[15px] font-black text-white">{formatLocation(entry.country)}</span>
                           <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                              {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                           </span>
                        </div>
                     </div>
                     <ChevronDown className={`w-4 h-4 text-zinc-600 transition-transform ${expandedIndex === idx ? "rotate-180" : ""}`} />
                   </div>

                   <AnimatePresence initial={false}>
                      {expandedIndex === idx && (
                        <motion.div
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: "auto", opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           transition={{ duration: 0.2, ease: "easeOut" }}
                           className="overflow-hidden px-6 pb-6"
                        >
                           <div className="pt-5 flex flex-col space-y-4">
                              <div className="bg-white/[0.02] rounded-2xl border border-white/5 p-5 space-y-4">
                                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                     <div className="space-y-1">
                                        <span className="text-[9px] font-black uppercase text-zinc-600 tracking-widest flex items-center gap-1.5"><MapPin className="w-3" /> Location</span>
                                        <p className="text-[12px] font-bold text-zinc-300">City: {entry.city || "Restricted"}</p>
                                     </div>
                                     <div className="text-right space-y-1">
                                        <span className="text-[9px] font-black uppercase text-zinc-600 tracking-widest flex items-center gap-1.5 justify-end"><Link2 className="w-3" /> Source</span>
                                        <p className="text-[11px] font-bold text-indigo-400 truncate max-w-[120px]">{entry.referer || "Direct Traffic"}</p>
                                     </div>
                                  </div>
                                 <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                       <span className="text-[9px] font-black uppercase text-zinc-600 tracking-widest flex items-center gap-1.5"><Monitor className="w-3" /> System Info</span>
                                       <p className="text-[11px] font-bold text-zinc-400">{entry.os || "Web"} <span className="text-[9px] text-zinc-600 ml-1">({entry.browser || "Unknown"})</span></p>
                                    </div>
                                    <div className="text-right space-y-1">
                                       <span className="text-[9px] font-black uppercase text-zinc-600 tracking-widest flex items-center gap-1.5 justify-end"><ShieldCheck className="w-3" /> IP Address</span>
                                       <p className="text-[10px] font-mono font-black text-zinc-700">{entry.ip}</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </motion.div>
                      )}
                   </AnimatePresence>
                </div>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="border-t border-white/5 p-6 flex items-center justify-between">
              <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Page {safeCurrentPage} / {totalPages}</p>
              <div className="flex items-center gap-3">
                <button onClick={() => { setExpandedIndex(null); setCurrentPage(p => Math.max(1, p - 1)); }} disabled={safeCurrentPage === 1} className="p-3 rounded-xl bg-white/5 disabled:opacity-30 border border-white/5"><ChevronLeft className="w-4" /></button>
                <button onClick={() => { setExpandedIndex(null); setCurrentPage(p => Math.min(totalPages, p + 1)); }} disabled={safeCurrentPage === totalPages} className="p-3 rounded-xl bg-white/5 disabled:opacity-30 border border-white/5"><ChevronRight className="w-4" /></button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
