"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import RollingNumber from "@/components/shared/RollingNumber";

const HeroLogo = () => (
  <div className="flex flex-col items-center select-none w-[220px] sm:w-[320px] md:w-[420px] lg:w-[560px] xl:w-[680px] mb-4 lg:mb-8">
    <Image
      src="/ui/Big mid logo.png"
      alt="Thulla Masters Card Game Logo"
      width={680}
      height={213}
      priority
      className="w-full h-auto object-contain drop-shadow-2xl"
    />
  </div>
);

const Hero = ({ apkUrl = "/thulla-masters.apk" }) => {
  const [downloading, setDownloading] = useState(false);
  const [counts, setCounts] = useState({ downloads: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data && typeof data.downloadCount === 'number') {
          setCounts({ downloads: data.downloadCount });
        }
      } catch (err) {}
    };

    fetchCounts();
    const interval = setInterval(fetchCounts, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    window.location.href = "/api/download";
    setTimeout(() => {
      setDownloading(false);
      window.location.href = "/#home";
    }, 1500);
  };

  return (
    <section id="home" className="relative z-10 pt-20 sm:pt-28 lg:pt-36">
      <div
        className="relative w-full mx-auto px-5 pt-16 sm:pt-20 lg:pt-28 pb-10 sm:pb-14 lg:pb-20"
        style={{ maxWidth: "min(96%, 700px)", minHeight: 460 }}
      >
        <motion.div
          className="absolute z-0 -left-[4%] sm:-left-[8%] lg:-left-[18%] xl:-left-[24%]"
          style={{ top: 20 }}
          initial={{ rotate: -28 }}
          animate={{ y: [0, -10, 0], rotate: [-28, -22, -28] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/ui/A of diamonds.png"
            alt="Ace of Diamonds"
            width={170}
            height={240}
            className="w-[120px] sm:w-[140px] lg:w-[170px] h-auto drop-shadow-2xl object-contain"
          />
        </motion.div>

        <motion.div
          className="absolute z-0 -right-[4%] sm:-right-[8%] lg:-right-[18%] xl:-right-[24%]"
          style={{ top: 20 }}
          initial={{ rotate: 18 }}
          animate={{ y: [0, 14, 0], rotate: [18, 24, 18] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/ui/JS.png"
            alt="Jack of Spades"
            width={170}
            height={240}
            className="w-[120px] sm:w-[140px] lg:w-[170px] h-auto drop-shadow-2xl object-contain"
          />
        </motion.div>

        <motion.div
          className="absolute z-0 -left-[4%] sm:-left-[8%] lg:-left-[18%] xl:-left-[24%]"
          style={{ top: 210 }}
          initial={{ rotate: -18 }}
          animate={{ x: [0, 6, 0], y: [0, -8, 0], rotate: [-18, -12, -18] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/ui/QD.png"
            alt="Queen of Diamonds"
            width={190}
            height={265}
            className="w-[140px] sm:w-[160px] lg:w-[190px] h-auto drop-shadow-2xl object-contain"
          />
        </motion.div>

        <motion.div
          className="absolute z-0 -right-[4%] sm:-right-[8%] lg:-right-[18%] xl:-right-[24%]"
          style={{ top: 220 }}
          initial={{ rotate: 22 }}
          animate={{ scale: [1, 1.04, 1], rotate: [22, 28, 22] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/ui/KH.png"
            alt="King of Hearts"
            width={190}
            height={265}
            className="w-[140px] sm:w-[160px] lg:w-[190px] h-auto drop-shadow-2xl object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 flex flex-col items-center text-center w-full"
        >
          <h1 className="sr-only">Thulla Masters</h1>
          <HeroLogo />

          <div className="mt-4 mb-6 sm:mb-8 flex justify-center w-[250px] sm:w-[350px] lg:w-[480px]">
            <Image
              src="/ui/Think you can hold the ace and still get away_ Can you avoid be.png"
              alt="Challenge your skills"
              width={480}
              height={120}
              className="w-full h-auto object-contain drop-shadow-xl"
            />
          </div>

          <div className="flex flex-col items-center gap-6">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="btn-primary-purple w-[220px] sm:w-[260px] lg:w-[310px] drop-shadow-lg"
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {downloading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5 text-white/50" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  </svg>
                  ...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3 italic font-black">
                   DOWNLOAD
                </span>
              )}
            </button>

            {counts.downloads > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40">
                    Live Players
                  </span>
                </div>
                <div className="text-2xl font-black text-white tracking-tighter tabular-nums">
                   <RollingNumber value={counts.downloads} />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
