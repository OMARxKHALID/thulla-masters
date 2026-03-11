"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

/* ── shared card base styles ────────────────────────────── */
const cardBase = {
  background: "white",
  overflow: "hidden",
  position: "relative",
  userSelect: "none",
  flexShrink: 0,
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  border: "1.5px solid #e5e7eb",
};

/* ── AceCard ────────────────────────────────────────────── */
const AceCard = () => (
  <div
    className="w-[130px] h-[170px] rounded-[10px] sm:w-[148px] sm:h-[193px] lg:w-[165px] lg:h-[215px] lg:rounded-[14px]"
    style={cardBase}
  >
    <span className="absolute top-[5%] left-[8%] text-[18px] lg:text-[24px] font-black leading-none text-red-500">A</span>
    <span className="absolute top-[20%] left-[8%] text-[11px] lg:text-[14px] leading-none text-red-500">♦</span>
    <div className="flex h-full items-center justify-center">
      <span className="text-[50px] lg:text-[68px] text-red-500">♦</span>
    </div>
    <span className="absolute bottom-[5%] right-[8%] text-[18px] lg:text-[24px] font-black leading-none text-red-500 rotate-180">A</span>
  </div>
);

/* ── JackCard ───────────────────────────────────────────── */
const JackCard = () => (
  <div
    className="w-[130px] h-[170px] rounded-[10px] sm:w-[148px] sm:h-[193px] lg:w-[165px] lg:h-[215px] lg:rounded-[14px]"
    style={cardBase}
  >
    <span className="absolute top-[5%] left-[8%] text-[18px] lg:text-[24px] font-black leading-none text-gray-900 z-10">J</span>
    <span className="absolute top-[20%] left-[8%] text-[11px] lg:text-[14px] leading-none text-gray-900 z-10">♠</span>
    <div style={{
      position: "absolute", bottom: 0, left: "12%", right: "12%", height: "80%",
      background: "linear-gradient(180deg,#2060c8 0%,#1a4da8 100%)",
      borderRadius: "9999px 9999px 0 0", border: "2px solid #1540a0", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "28%", background: "#12308a", borderRadius: "9999px 9999px 0 0", borderBottom: "2px solid #0d2470" }} />
      <div style={{ position: "absolute", top: "1.5%", left: "50%", transform: "translateX(-50%)", width: "36%", height: "8%", background: "#f0c000", borderRadius: "2px 2px 0 0" }} />
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: "56%", height: "30%", background: "#d4956a", borderRadius: "9999px", border: "2px solid #b5724a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6%" }}>
        <div style={{ display: "flex", gap: "14%", width: "100%", justifyContent: "center" }}>
          <div style={{ width: "16%", aspectRatio: "1", background: "#1a1a1a", borderRadius: "9999px 9999px 50% 50%" }} />
          <div style={{ width: "16%", aspectRatio: "1", background: "#1a1a1a", borderRadius: "9999px 9999px 50% 50%" }} />
        </div>
        <div style={{ width: "36%", height: "12%", background: "#a05030", borderRadius: 9999 }} />
      </div>
    </div>
    <span className="absolute bottom-[5%] right-[8%] text-[18px] lg:text-[24px] font-black leading-none text-gray-900 rotate-180">J</span>
  </div>
);

/* ── QueenCard ──────────────────────────────────────────── */
const QueenCard = () => (
  <div
    className="w-[150px] h-[196px] rounded-[10px] sm:w-[168px] sm:h-[218px] lg:w-[185px] lg:h-[240px] lg:rounded-[14px]"
    style={cardBase}
  >
    <span className="absolute top-[4%] left-[7%] text-[18px] lg:text-[24px] font-black leading-none text-red-500 z-10">Q</span>
    <span className="absolute top-[17%] left-[7%] text-[11px] lg:text-[14px] leading-none text-red-500 z-10">♦</span>
    <div style={{ position: "absolute", bottom: 0, left: "10%", right: "10%", height: "82%", background: "linear-gradient(180deg,#d9592c 0%,#c04422 100%)", borderRadius: "9999px 9999px 0 0", border: "2px solid #a03518", overflow: "visible" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "20%", background: "#f0c000", borderBottom: "2px solid #c09000", overflow: "visible", display: "flex", alignItems: "flex-start", justifyContent: "space-evenly", padding: "0 8%", zIndex: 2 }}>
        {[11, 14, 11].map((size, i) => (
          <div key={i} style={{ width: 0, height: 0, borderLeft: `${i === 1 ? 7 : 6}px solid transparent`, borderRight: `${i === 1 ? 7 : 6}px solid transparent`, borderBottom: `${size}px solid #f0c000`, marginTop: `-${size}px` }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: "-3%", top: "16%", width: "21%", height: "50%", background: "#f5c800", borderRadius: "0 0 9999px 9999px", border: "1.5px solid #c09000" }} />
      <div style={{ position: "absolute", right: "-3%", top: "16%", width: "21%", height: "50%", background: "#f5c800", borderRadius: "0 0 9999px 9999px", border: "1.5px solid #c09000" }} />
      <div style={{ position: "absolute", top: "21%", left: "50%", transform: "translateX(-50%)", width: "54%", height: "30%", background: "#f5c9a0", borderRadius: "9999px", border: "2px solid #d4936a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5%" }}>
        <div style={{ display: "flex", gap: "14%", width: "100%", justifyContent: "center" }}>
          <div style={{ width: "12%", aspectRatio: "1", background: "#333", borderRadius: "9999px" }} />
          <div style={{ width: "12%", aspectRatio: "1", background: "#333", borderRadius: "9999px" }} />
        </div>
        <div style={{ width: "30%", height: "10%", borderBottom: "2.5px solid #e87474", borderRadius: 9999 }} />
      </div>
    </div>
    <span className="absolute bottom-[3.5%] right-[7%] text-[18px] lg:text-[24px] font-black leading-none text-red-500 rotate-180">Q</span>
  </div>
);

/* ── KingCard ───────────────────────────────────────────── */
const KingCard = () => (
  <div
    className="w-[150px] h-[196px] rounded-[10px] sm:w-[168px] sm:h-[218px] lg:w-[185px] lg:h-[240px] lg:rounded-[14px]"
    style={cardBase}
  >
    <span className="absolute top-[4%] left-[7%] text-[18px] lg:text-[24px] font-black leading-none text-red-500 z-10">K</span>
    <span className="absolute top-[17%] left-[7%] text-[11px] lg:text-[14px] leading-none text-red-500 z-10">♥</span>
    <div style={{ position: "absolute", bottom: 0, left: "10%", right: "10%", height: "82%", background: "linear-gradient(180deg,#cc2020 0%,#a81818 100%)", borderRadius: "9999px 9999px 0 0", border: "2px solid #901010", overflow: "visible" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "20%", background: "#f0c000", borderBottom: "2px solid #c09000", overflow: "visible", display: "flex", alignItems: "flex-start", justifyContent: "space-evenly", padding: "0 8%", zIndex: 2 }}>
        {[11, 14, 11].map((size, i) => (
          <div key={i} style={{ width: 0, height: 0, borderLeft: `${i === 1 ? 7 : 6}px solid transparent`, borderRight: `${i === 1 ? 7 : 6}px solid transparent`, borderBottom: `${size}px solid #f0c000`, marginTop: `-${size}px` }} />
        ))}
      </div>
      <div style={{ position: "absolute", top: "22%", left: "50%", transform: "translateX(-50%)", width: "54%", height: "28%", background: "#f5c9a0", borderRadius: "9999px", border: "2px solid #d4936a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5%" }}>
        <div style={{ display: "flex", gap: "12%", width: "100%", justifyContent: "center" }}>
          <div style={{ width: "14%", aspectRatio: "4/3", background: "#1a1a1a", borderRadius: "9999px 9999px 50% 50%" }} />
          <div style={{ width: "14%", aspectRatio: "4/3", background: "#1a1a1a", borderRadius: "9999px 9999px 50% 50%" }} />
        </div>
        <div style={{ width: "48%", height: "14%", background: "#5c2a1a", borderRadius: 9999 }} />
      </div>
      <div style={{ position: "absolute", bottom: "10%", left: "50%", transform: "translateX(-50%)", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>♥</div>
    </div>
    <span className="absolute bottom-[3.5%] right-[7%] text-[18px] lg:text-[24px] font-black leading-none text-red-500 rotate-180">K</span>
  </div>
);

/* ── HeroLogo ───────────────────────────────────────────── */
const HeroLogo = () => (
  <div className="flex flex-col items-center select-none" style={{ lineHeight: 0.88 }}>
    <span
      className="font-black uppercase italic text-accent-yellow text-3d-thulla block
                 text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[9.5rem] xl:text-[11rem]"
      style={{ letterSpacing: "-0.03em" }}
    >
      THULLA
    </span>
    <span
      className="font-black italic text-[#d9cff5] text-3d-masters block
                 text-[2.6rem] sm:text-[4rem] md:text-[5.6rem] lg:text-[7.5rem] xl:text-[9rem]"
      style={{ letterSpacing: "-0.02em", marginTop: "-6px" }}
    >
      MasterS
    </span>
  </div>
);

/* ── Hero ───────────────────────────────────────────────── */
const Hero = () => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    if (downloading) return;
    setDownloading(true);
    const link = document.createElement("a");
    link.href = "/thulla-masters.apk";
    link.download = "ThullaMasters.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <section id="home" className="relative z-10">
      <div
        className="relative w-full mx-auto px-5 pt-16 sm:pt-20 lg:pt-28 pb-10 sm:pb-14 lg:pb-20 overflow-hidden"
        style={{ maxWidth: "min(96%, 700px)", minHeight: 460 }}
      >
        {/* Floating cards — fixed px positions so they never bleed outside the container */}
        <motion.div className="absolute z-0" style={{ top: 20, left: "-4%" }}
          initial={{ rotate: -28 }} animate={{ y: [0, -10, 0], rotate: [-28, -22, -28] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
          <AceCard />
        </motion.div>

        <motion.div className="absolute z-0" style={{ top: 20, right: "-4%" }}
          initial={{ rotate: 18 }} animate={{ y: [0, 14, 0], rotate: [18, 24, 18] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
          <JackCard />
        </motion.div>

        <motion.div className="absolute z-0" style={{ top: 210, left: "-4%" }}
          initial={{ rotate: -18 }} animate={{ x: [0, 6, 0], y: [0, -8, 0], rotate: [-18, -12, -18] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
          <QueenCard />
        </motion.div>

        <motion.div className="absolute z-0" style={{ top: 220, right: "-4%" }}
          initial={{ rotate: 22 }} animate={{ scale: [1, 1.04, 1], rotate: [22, 28, 22] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
          <KingCard />
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 flex flex-col items-center text-center w-full"
        >
          <HeroLogo />

          <div className="mt-4 mb-6 space-y-1.5 max-w-[88%] sm:max-w-[420px]">
            {[
              "Think you can hold the ace and still get away?",
              "Can you avoid being the Bhabhi?",
              "Thulla Expert? Let\u2019s challenge your skills!",
            ].map((line) => (
              <p key={line} className="font-bold text-white drop-shadow tracking-wide text-[0.82rem] sm:text-sm lg:text-[1.15rem]">
                {line}
              </p>
            ))}
          </div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="btn-primary-purple w-[220px] sm:w-[260px] lg:w-[310px]"
            style={{ opacity: downloading ? 0.75 : 1, transition: "opacity 0.2s" }}
          >
            {downloading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4 lg:w-[18px] lg:h-[18px]" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                DOWNLOADING…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 lg:w-[18px] lg:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                DOWNLOAD
              </span>
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
