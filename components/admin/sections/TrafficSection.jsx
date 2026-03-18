"use client";

import { useState } from "react";
import {
  Activity,
  MapPin,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Search,
  RefreshCw,
} from "lucide-react";

export default function TrafficSection({ 
  settings, 
  syncing, 
  fetchLatestData 
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const itemsPerPage = 8;

  const baseData = settings.downloadHistory
    ? [...settings.downloadHistory].reverse()
    : [];

  const filteredData = baseData.filter((entry) => {
    const searchMatch =
      !searchQuery ||
      [entry.ip, entry.country, entry.city, entry.browser, entry.os].some(
        (val) => val && val.toLowerCase().includes(searchQuery.toLowerCase())
      );
    if (!searchMatch) return false;

    if (dateRange === "all") return true;
    if (!entry.timestamp) return false;

    const entryDate = new Date(entry.timestamp);
    const today = new Date();

    if (dateRange === "today") {
      return (
        entryDate.getDate() === today.getDate() &&
        entryDate.getMonth() === today.getMonth() &&
        entryDate.getFullYear() === today.getFullYear()
      );
    }

    if (dateRange === "7days") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      return entryDate >= sevenDaysAgo;
    }

    return true;
  });

  const trafficData = filteredData;
  const totalPages = Math.max(1, Math.ceil(trafficData.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const currentData = trafficData.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-6">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-2 px-1">
          <div className="flex items-center justify-between">
            <h3 className="text-zinc-600 text-[12px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" /> Recent Traffic
              Log
            </h3>
            <div className="flex items-center gap-4 xl:hidden">
               <button
                  onClick={fetchLatestData}
                  disabled={syncing}
                  className="text-zinc-600 hover:text-yellow-400 transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin text-yellow-500" : ""}`} />
                </button>
               <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                Found: {trafficData.length}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:flex items-center gap-4">
            <div className="flex bg-black/40 border border-white/5 rounded-xl p-1 shrink-0">
              {["all", "7days", "today"].map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setDateRange(range);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                    dateRange === range
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {range === "all"
                    ? "All Time"
                    : range === "7days"
                      ? "7 Days"
                      : "Today"}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 transition-colors group-focus-within:text-white" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search IPs, Locations..."
                className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-5 py-3.5 text-[12px] font-mono outline-none focus:border-white/20 transition-all text-zinc-300"
              />
            </div>

            <div className="hidden xl:flex items-center gap-4 ml-2">
              <button
                onClick={fetchLatestData}
                disabled={syncing}
                className="flex items-center gap-2.5 text-zinc-600 hover:text-yellow-400 transition-all disabled:opacity-50 group/sync"
                title="Sync Database"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin text-yellow-500" : "group-hover/sync:rotate-180 transition-transform"}`} />
                <span className="text-[10px] font-black uppercase tracking-widest">Reload</span>
              </button>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 border-l border-white/10 pl-4 py-1">
                Matches: <span className="text-zinc-400">{trafficData.length}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
          <div className="hidden md:block overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white/[0.02] text-[10px] font-black uppercase tracking-widest text-zinc-500 border-b border-white/5">
                <tr>
                  <th className="px-8 py-6">Time / Date</th>
                  <th className="px-8 py-6">Location Detail</th>
                  <th className="px-8 py-6">System / OS</th>
                  <th className="px-8 py-6">IP Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-400">
                {currentData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-8 py-20 text-center text-[11px] text-zinc-600 font-bold uppercase tracking-widest"
                    >
                      No traffic data matched your filters.
                    </td>
                  </tr>
                ) : (
                  currentData.map((entry, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-white/[0.015] transition-colors group/row"
                    >
                      <td className="px-8 py-5.5 text-[11px] font-mono">
                        <span className="text-zinc-300 font-bold">
                          {new Date(entry.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <span className="text-zinc-600 ml-2 uppercase font-black text-[9px] tracking-tighter">
                          {new Date(entry.timestamp).toLocaleDateString([], {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </td>
                      <td className="px-8 py-5.5">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-zinc-600 group-hover/row:text-emerald-500/50 transition-colors" />
                          <span className="text-zinc-300 font-bold text-[13px]">
                            {entry.country || "Unknown"}
                          </span>
                          {entry.city && entry.city !== "Unknown" && (
                            <span className="text-zinc-600 text-[11px] font-bold">
                              / {entry.city}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-5.5">
                        <div className="flex items-center gap-3">
                          <Smartphone className="w-4 h-4 text-zinc-600 group-hover/row:text-blue-500/50 transition-colors" />
                          <span className="text-zinc-300 font-medium text-[12px]">
                            {entry.os || "Unknown"}
                          </span>
                          <span className="text-zinc-600 text-[9px] uppercase font-black tracking-widest bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                            {entry.browser || "Unknown"}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5.5 font-mono text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors">
                        {entry.ip || "Hidden Protocol"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="md:hidden flex flex-col divide-y divide-white/5">
            {currentData.length === 0 ? (
              <div className="p-12 text-center text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                No Results Found
              </div>
            ) : (
              currentData.map((entry, idx) => (
                <div
                  key={idx}
                  className="p-6 space-y-5 hover:bg-white/[0.015] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] font-mono text-white font-black">
                        {new Date(entry.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                        {new Date(entry.timestamp).toLocaleDateString([], {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="font-mono text-[10px] text-zinc-500 bg-black/40 px-2.5 py-1.5 rounded-lg border border-white/5 font-bold">
                      {entry.ip || "Hidden"}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-white/[0.015] rounded-xl p-4 border border-white/5">
                    <div className="space-y-1.5 overflow-hidden">
                      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 block">
                        Location
                      </span>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span className="text-[11px] text-zinc-300 font-bold truncate">
                          {entry.country || "Unknown"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 overflow-hidden">
                      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 block">
                        System
                      </span>
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span className="text-[11px] text-zinc-300 font-bold truncate flex items-center gap-1.5">
                          {entry.os || "Unknown"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {trafficData.length > 0 && (
            <div className="border-t border-white/5 p-6 flex items-center justify-between bg-black/20">
              <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest px-2">
                Page {safeCurrentPage} of {totalPages}
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={safeCurrentPage === 1}
                  className="p-3 rounded-xl bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-white disabled:opacity-30 transition-all active:scale-95 border border-white/5"
                >
                  <ChevronLeft className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={safeCurrentPage === totalPages}
                  className="p-3 rounded-xl bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-white disabled:opacity-30 transition-all active:scale-95 border border-white/5"
                >
                  <ChevronRight className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
