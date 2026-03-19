"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  RotateCcw,
  RefreshCw,
  Globe2,
  Users,
  Download,
  Link2,
  ArrowRight
} from "lucide-react";
import RollingNumber from "@/components/shared/RollingNumber";
import { formatLocation } from "@/lib/utils";

export default function InsightsSection({
  settings,
  syncing,
  fetchLatestData,
  setShowResetModal,
}) {
  const [trigger, setTrigger] = useState(false);
  const history = settings.downloadHistory || [];
  const visitorHistory = settings.visitorHistory || [];

  useEffect(() => {
    if (syncing) {
      setTrigger(true);
      const timer = setTimeout(() => setTrigger(false), 50);
      return () => clearTimeout(timer);
    }
  }, [syncing]);

  const today = new Date();
  const getDayCount = (data, date) => data.filter((h) => {
    if (!h || !h.timestamp) return false;
    const hd = new Date(h.timestamp);
    return (
      hd.getDate() === date.getDate() &&
      hd.getMonth() === date.getMonth() &&
      hd.getFullYear() === date.getFullYear()
    );
  }).length;

  const todayDownloads = getDayCount(history, today);
  const todayVisitors = getDayCount(visitorHistory, today);
  const totalVisitors = settings.visitorCount || 0;
  const totalDownloads = settings.downloadCount || 0;
  const conversionRate = totalVisitors > 0 ? (totalDownloads / totalVisitors) * 100 : 0;

  const combinedHistory = [...history, ...visitorHistory];
  
  const countryCounts = combinedHistory.reduce((acc, curr) => {
    if (!curr || !curr.country) return acc;
    acc[curr.country] = (acc[curr.country] || 0) + 1;
    return acc;
  }, {});

  const topLocations = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const refererCounts = combinedHistory.reduce((acc, curr) => {
    if (!curr || !curr.referer) return acc;
    let domain = "Direct";
    try {
      if (curr.referer !== "Direct") {
        const url = new URL(curr.referer);
        domain = url.hostname.replace('www.', '');
      }
    } catch {
      domain = curr.referer;
    }
    acc[domain] = (acc[domain] || 0) + 1;
    return acc;
  }, {});

  const topSources = Object.entries(refererCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const DetailedTrend = ({ data, colorClass, label }) => {
    const days = Array.from({ length: 14 }, (_, i) => {
      const d = new Date();
      d.setDate(today.getDate() - (13 - i));
      return d.toDateString();
    });
    const counts = days.map(dStr => getDayCount(data, new Date(dStr)));
    const maxVal = Math.max(...counts, 1);

    return (
      <div className="flex items-end gap-1.5 h-16 w-full mt-4 pb-1">
        {counts.map((c, i) => (
          <div key={i} className="flex-1 bg-white/[0.03] rounded-t-sm relative group/mbar transition-all hover:bg-white/[0.08]" style={{ height: `${Math.max((c / maxVal) * 100, 8)}%` }}>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/mbar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 z-20">
              <RollingNumber value={c} refreshTrigger={trigger} /> {label}
            </div>
            {c > 0 && <div className={`absolute inset-0 ${colorClass} rounded-t-sm`} />}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex items-center justify-between gap-6 pb-4">
        <div className="flex items-center gap-3.5 px-1 truncate">
          <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center border border-yellow-400/20 shrink-0">
            <BarChart3 className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="truncate">
            <h4 className="text-white text-[14px] font-black uppercase tracking-widest leading-none">Analytics Overview</h4>
            <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mt-1.5 truncate">Real-time performance metrics</p>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <button
            onClick={() => setShowResetModal(true)}
            className="flex items-center gap-3 text-zinc-600 hover:text-red-400 transition-all group"
          >
            <RotateCcw className="w-4 h-4 group-hover:rotate-[-90deg] transition-transform" />
            <span className="text-[11px] font-black uppercase tracking-widest hidden sm:inline-block">
              Reset
            </span>
          </button>
          <button
            onClick={fetchLatestData}
            disabled={syncing}
            className="flex items-center gap-3 text-zinc-600 hover:text-yellow-400 transition-all disabled:opacity-50 group"
          >
            <RefreshCw
              className={`w-4 h-4 ${syncing ? "animate-spin text-yellow-500" : "group-hover:rotate-180 transition-transform"}`}
            />
            <span className="text-[11px] font-black uppercase tracking-widest hidden sm:inline-block">
              Reload
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-3 bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-around gap-10 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.02] via-transparent to-yellow-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex flex-col items-center text-center z-10 shrink-0">
               <div className="p-4 rounded-2xl bg-blue-500/5 mb-4 border border-blue-500/10">
                  <Users className="w-6 h-6 text-blue-400" />
               </div>
               <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mb-1">Total Visitors</p>
               <h4 className="text-white text-4xl font-black tabular-nums">
                  <RollingNumber value={totalVisitors} refreshTrigger={trigger} />
               </h4>
               <p className="text-blue-400/60 text-[9px] font-bold uppercase mt-1">
                 +<RollingNumber value={todayVisitors} refreshTrigger={trigger} /> today
               </p>
            </div>

            <div className="flex flex-col items-center text-center z-10 shrink-0">
               <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 border-dashed border-white/5 flex items-center justify-center relative">
                  <div className="absolute inset-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 flex flex-col items-center justify-center">
                     <span className="text-yellow-400 text-2xl font-black">
                        <RollingNumber value={conversionRate} precision={1} refreshTrigger={trigger} />%
                     </span>
                     <span className="text-zinc-600 text-[8px] font-black uppercase tracking-tighter">Conv. Rate</span>
                  </div>
                  <ArrowRight className="absolute -right-8 text-zinc-700 hidden sm:block" />
               </div>
            </div>

            <div className="flex flex-col items-center text-center z-10 shrink-0">
               <div className="p-4 rounded-2xl bg-yellow-400/5 mb-4 border border-yellow-400/10">
                  <Download className="w-6 h-6 text-yellow-400" />
               </div>
               <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mb-1">Downloads</p>
               <h4 className="text-white text-4xl font-black tabular-nums">
                  <RollingNumber value={totalDownloads} refreshTrigger={trigger} />
               </h4>
               <p className="text-yellow-500/60 text-[9px] font-bold uppercase mt-1">
                 +<RollingNumber value={todayDownloads} refreshTrigger={trigger} /> today
               </p>
            </div>
         </div>

         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8">
               <div className="flex items-center gap-2 mb-8">
                  <Globe2 className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-zinc-400">Top Locations</h4>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
                  {topLocations.map(([country, count], idx) => (
                    <div key={country} className="flex items-center justify-between group/loc hover:bg-white/[0.01] p-1.5 rounded-lg transition-all border border-transparent hover:border-white/5">
                      <div className="flex items-center gap-4 truncate">
                        <span className="text-[12px] font-black text-white/5 group-hover/loc:text-yellow-500/50 w-4">{idx + 1}</span>
                        <span className="text-[13px] font-bold text-zinc-300 truncate group-hover/loc:text-white transition-colors">
                          {formatLocation(country)}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[16px] font-black text-white">
                          <RollingNumber value={count} refreshTrigger={trigger} />
                        </span>
                        <span className="text-[8px] uppercase tracking-widest text-zinc-600 font-bold">Hits</span>
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                   <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-black mb-1">Downloads Trend</p>
                   <DetailedTrend data={history} colorClass="bg-yellow-400" label="Downloads" />
               </div>
               <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                   <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-black mb-1">Traffic Trend</p>
                   <DetailedTrend data={visitorHistory} colorClass="bg-blue-400" label="Visits" />
               </div>
            </div>
         </div>

         <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-8">
               <Link2 className="w-5 h-5 text-indigo-400" />
               <h4 className="text-[11px] font-black uppercase tracking-widest text-zinc-400">Top Sources</h4>
            </div>
            <div className="space-y-6 flex-1">
               {topSources.length === 0 ? (
                 <div className="flex flex-col items-center justify-center h-full opacity-20 py-20">
                    <Link2 className="w-10 h-10 mb-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Collecting Data...</span>
                 </div>
               ) : (
                 topSources.map(([domain, count], idx) => (
                    <div key={domain} className="group/src">
                       <div className="flex items-center justify-between mb-2">
                          <span className="text-[12px] font-bold text-zinc-300 group-hover/src:text-white transition-colors truncate max-w-[150px]">
                            {domain}
                          </span>
                          <span className="text-[14px] font-black text-white">
                             <RollingNumber value={count} refreshTrigger={trigger} />
                          </span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div 
                             className={`h-full ${idx === 0 ? "bg-indigo-400" : idx === 1 ? "bg-indigo-500" : "bg-zinc-600"} group-hover/src:opacity-100 transition-opacity`}
                             style={{ width: `${(count / topSources[0][1]) * 100}%` }}
                          />
                       </div>
                    </div>
                 ))
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
