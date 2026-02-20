"use client";

import React from "react";
import { motion } from "framer-motion";

const Logo = ({ className = "" }) => (
  <div
    className={`relative flex flex-col items-center select-none ${className}`}
  >
    <div className="relative">
      {/* Background Glow */}
      <div className="absolute inset-[-80%] bg-purple-600/10 blur-[100px] rounded-full -z-10 animate-pulse"></div>

      <div className="flex flex-col items-center leading-[0.6] italic font-black uppercase tracking-tighter">
        <span
          className="text-7xl md:text-[10rem] text-[#fecb00] drop-shadow-2xl"
          style={{
            textShadow:
              "0 2px 0 #533483, 0 4px 0 #533483, 0 6px 0 #533483, 0 8px 0 #533483, 0 10px 0 #533483, 0 12px 15px rgba(0,0,0,0.4)",
          }}
        >
          THULLA
        </span>
        <span
          className="text-6xl md:text-[8rem] text-white mt-4"
          style={{
            textShadow:
              "0 2px 0 #533483, 0 4px 0 #533483, 0 6px 0 #533483, 0 8px 0 #533483, 0 10px 0 #533483, 0 12px 15px rgba(0,0,0,0.4)",
          }}
        >
          MASTERS
        </span>
      </div>
    </div>
  </div>
);

const Card = ({
  children,
  className = "",
  color = "red",
  suit = "♦",
  value = "A",
  character = false,
}) => (
  <div
    className={`w-24 h-36 md:w-32 md:h-48 bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center border-2 border-gray-100/50 relative overflow-hidden ${className}`}
  >
    <div
      className={`absolute top-2 left-2 ${color === "red" ? "text-red-600" : "text-black"} font-black text-xl md:text-3xl leading-none`}
    >
      {value}
      <br />
      <span className="text-sm md:text-base">{suit}</span>
    </div>

    {character ? (
      <div className="w-full h-full pt-6 flex flex-col items-center justify-center overflow-hidden">
        {children}
      </div>
    ) : (
      <div
        className={`${color === "red" ? "text-red-500" : "text-black"} text-6xl md:text-8xl flex-shrink-0 mb-4`}
      >
        {suit}
      </div>
    )}

    <div
      className={`absolute bottom-2 right-2 ${color === "red" ? "text-red-600" : "text-black"} font-black text-xl md:text-3xl leading-none rotate-180`}
    >
      {value}
      <br />
      <span className="text-sm md:text-base">{suit}</span>
    </div>
  </div>
);

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-32 px-4 overflow-hidden text-center">
      {/* Background Decorative Elements (Floating Cards) */}
      <motion.div
        className="absolute top-[8%] left-[2%] md:left-[10%] z-0"
        animate={{ y: [0, -20, 0], rotate: [-15, -10, -15] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Card
          value="A"
          suit="♦"
          color="red"
          className="scale-[0.6] md:scale-90"
        />
      </motion.div>

      <motion.div
        className="absolute top-[5%] right-[2%] md:right-[10%] z-0"
        animate={{ y: [0, 20, 0], rotate: [15, 20, 15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Card
          value="J"
          suit="♠"
          color="black"
          className="scale-[0.55] md:scale-75"
        />
      </motion.div>

      <motion.div
        className="absolute top-[35%] left-[-5%] md:left-[5%] z-0"
        animate={{ x: [0, 10, 0], y: [0, -10, 0], rotate: [-10, -15, -10] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Card
          value="Q"
          suit="♥"
          color="red"
          character
          className="scale-[0.7] md:scale-110"
        >
          <div className="w-16 h-16 md:w-28 md:h-28 bg-[#C1262B] rounded-full border-4 border-red-900 relative flex flex-col items-center pt-2 md:pt-4">
            <div className="absolute top-0 left-0 right-0 h-6 md:h-10 bg-yellow-400 border-b-2 border-red-900"></div>
            <div className="w-12 h-12 md:w-18 md:h-18 bg-[#FFD7BA] rounded-full border-2 border-red-900 mt-1 md:mt-2 z-10 flex flex-col items-center pt-2 md:pt-3">
              <div className="flex gap-2 md:gap-4 mb-1 md:mb-2">
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-black rounded-full"></div>
              </div>
              <div className="w-4 h-1.5 md:w-6 md:h-2 border-b-2 border-red-500 rounded-full"></div>
            </div>
          </div>
          <div className="text-red-500 text-2xl md:text-3xl font-black mt-1 md:mt-2">
            ♥
          </div>
        </Card>
      </motion.div>

      <motion.div
        className="absolute top-[40%] right-[-5%] md:right-[5%] z-0"
        animate={{ scale: [1, 1.05, 1], rotate: [10, 15, 10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Card
          value="K"
          suit="♥"
          color="red"
          character
          className="scale-[0.7] md:scale-110"
        >
          <div className="w-16 h-16 md:w-28 md:h-28 bg-[#1E6B2D] rounded-full border-4 border-green-900 relative flex flex-col items-center pt-2 md:pt-4">
            <div className="absolute top-0 left-0 right-0 h-6 md:h-10 bg-yellow-400 border-b-2 border-green-900"></div>
            <div className="w-12 h-12 md:w-18 md:h-18 bg-[#FFD7BA] rounded-full border-2 border-green-900 mt-1 md:mt-2 z-10 flex flex-col items-center pt-2 md:pt-3">
              <div className="flex gap-2 md:gap-4 mb-1 md:mb-2">
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-black rounded-full"></div>
              </div>
              <div className="w-6 h-1 md:w-8 md:h-1.5 bg-green-900 rounded-full mb-0.5"></div>
              <div className="w-4 h-1 md:w-6 md:h-1.5 border-b-2 border-green-800 rounded-full"></div>
            </div>
          </div>
          <div className="text-red-500 text-2xl md:text-3xl font-black mt-1 md:mt-2">
            ♥
          </div>
        </Card>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-6xl flex flex-col items-center px-4"
      >
        <Logo className="mb-12 md:mb-20 transform scale-[0.7] md:scale-100 origin-center" />

        <div className="space-y-4 mb-12 md:mb-16 text-center">
          <p className="text-xl md:text-3xl font-black text-white drop-shadow-xl uppercase tracking-tighter max-w-lg md:max-w-none">
            Think you can hold the ace and still get away?
          </p>
          <p className="text-lg md:text-2xl font-bold text-white/90 uppercase tracking-tighter">
            Can you avoid being the Bhabhi?
          </p>
          <p className="text-lg md:text-2xl font-bold text-white uppercase tracking-tighter">
            Thulla Expert? Let's challenge your skills!
          </p>
        </div>

        <button className="btn-primary w-full max-w-[320px] md:max-w-[400px] text-2xl md:text-4xl py-5 md:py-8 rounded-[24px] md:rounded-[40px] uppercase italic">
          DOWNLOAD
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
