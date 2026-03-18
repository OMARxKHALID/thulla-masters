"use client";

import {
  BarChart3,
  RotateCcw,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Globe2,
  Users,
  Download,
} from "lucide-react";

export default function InsightsSection({
  settings,
  syncing,
  fetchLatestData,
  setShowResetModal,
}) {
  const history = settings.downloadHistory || [];
  const visitorHistory = settings.visitorHistory || [];

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

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
  const yesterdayDownloads = getDayCount(history, yesterday);
  const downloadGrowth = todayDownloads - yesterdayDownloads;

  const todayVisitors = getDayCount(visitorHistory, today);
  const yesterdayVisitors = getDayCount(visitorHistory, yesterday);
  const visitorGrowth = todayVisitors - yesterdayVisitors;

  const totalVisitors = settings.visitorCount || 0;
  const totalDownloads = settings.downloadCount || 0;

  const countryCounts = history.reduce((acc, curr) => {
    if (!curr || !curr.country) return acc;
    acc[curr.country] = (acc[curr.country] || 0) + 1;
    return acc;
  }, {});

  const topLocations = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);

  const DetailedTrend = ({ data, colorClass, label }) => {
    const days = Array.from({ length: 14 }, (_, i) => {
      const d = new Date();
      d.setDate(today.getDate() - (13 - i));
      return d.toDateString();
    });
    const counts = days.map(dStr => getDayCount(data, new Date(dStr)));
    const maxVal = Math.max(...counts, 1);

    return (
      <div className="flex items-end gap-1 sm:gap-1.5 h-16 sm:h-24 w-full mt-6 pb-2">
        {counts.map((c, i) => (
          <div key={i} className="flex-1 bg-white/[0.03] rounded-t-sm sm:rounded-t-md relative group/mbar transition-all hover:bg-white/[0.08]" style={{ height: `${Math.max((c / maxVal) * 100, 8)}%` }}>
            <div className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/mbar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 z-20`}>
              {c} {label}
            </div>
            {c > 0 && <div className={`absolute inset-0 ${colorClass} rounded-t-sm sm:rounded-t-md shadow-[0_0_15px_rgba(255,255,255,0.1)]`} />}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-zinc-600 text-[12px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-yellow-500" /> Platform Insights
        </h3>
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => setShowResetModal(true)}
            className="flex items-center gap-3 text-zinc-600 hover:text-red-400 transition-all group"
            title="Reset Counter"
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

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 content-start">
        <div className="xl:col-span-3 space-y-6">
          {/* DOWNLOADS */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-10 relative overflow-hidden group min-h-[250px] sm:min-h-[300px] flex flex-col justify-between transition-all hover:border-white/10">
            <Download className="absolute -right-8 -top-8 w-32 sm:w-48 h-32 sm:h-48 text-white/[0.015] pointer-events-none" />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <p className="text-zinc-500 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-black">Total Downloads</p>
                <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-black self-start sm:self-auto ${downloadGrowth >= 0 ? "text-emerald-400 bg-emerald-400/5 border border-emerald-400/10" : "text-rose-400 bg-rose-400/5 border border-rose-400/10"}`}>
                  {downloadGrowth >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {Math.abs(downloadGrowth)} <span className="hidden xs:inline">Today</span>
                </div>
              </div>
              <h4 className="text-white text-6xl sm:text-8xl font-black tracking-tighter leading-none mb-4 sm:mb-6">
                {totalDownloads.toLocaleString()}
              </h4>
            </div>
            <DetailedTrend data={history} colorClass="bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)]" label="Downloads" />
          </div>

          {/* VISITORS */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-10 relative overflow-hidden group min-h-[250px] sm:min-h-[300px] flex flex-col justify-between transition-all hover:border-white/10">
            <Users className="absolute -right-8 -top-8 w-32 sm:w-48 h-32 sm:h-48 text-white/[0.015] rotate-12 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <p className="text-zinc-500 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-black">Unique Visitors</p>
                <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-black self-start sm:self-auto ${visitorGrowth >= 0 ? "text-blue-400 bg-blue-400/5 border border-blue-400/10" : "text-rose-400 bg-rose-400/5 border border-rose-400/10"}`}>
                  {visitorGrowth >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {Math.abs(visitorGrowth)} <span className="hidden xs:inline">Today</span>
                </div>
              </div>
              <h4 className="text-white text-6xl sm:text-8xl font-black tracking-tighter leading-none mb-4 sm:mb-6">
                {totalVisitors.toLocaleString()}
              </h4>
            </div>
            <DetailedTrend data={visitorHistory} colorClass="bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]" label="Visits" />
          </div>
        </div>

        <div className="xl:col-span-1 flex flex-col gap-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col flex-1 overflow-hidden min-h-[500px]">
            <div className="flex items-center gap-2 mb-6 sm:mb-8">
              <Globe2 className="w-4 sm:w-5 h-4 sm:h-5 text-indigo-400 opacity-80" />
              <h4 className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-zinc-400">Top Locations</h4>
            </div>
            <div className="space-y-4 sm:space-y-5">
              {topLocations.length === 0 ? (
                <div className="py-20 sm:py-32 flex flex-col items-center justify-center text-[10px] font-bold text-zinc-600 uppercase tracking-widest gap-4">
                   <div className="w-12 h-1 bg-white/5 rounded-full" />
                   No Traffic Data
                </div>
              ) : (
                topLocations.map(([country, count], idx) => (
                  <div key={country} className="flex items-center justify-between group/loc">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="text-[10px] sm:text-[12px] font-black text-white/5 group-hover/loc:text-yellow-500/50 w-3 sm:w-4">{idx + 1}</span>
                      <span className="text-[12px] sm:text-[13px] font-bold text-zinc-300 truncate max-w-[120px] sm:max-w-[140px] group-hover/loc:text-white transition-colors">{country !== "Unknown" ? country : "Hidden"}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[13px] sm:text-[14px] font-black text-white">{count}</span>
                      <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-zinc-600 font-bold">Hits</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
