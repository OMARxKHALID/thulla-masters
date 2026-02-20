"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PlayerAvatar = ({ name, cards, label, seed, color }) => (
  <div className="flex flex-col items-center gap-2">
    <span className="text-accent-yellow text-[10px] md:text-xs font-black uppercase text-center max-w-[80px] drop-shadow-sm">
      {label}
    </span>
    <div className="relative">
      <div
        className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl overflow-hidden border-4 border-[#0091FF] shadow-lg bg-[#0072BC] flex flex-col items-center justify-end`}
      >
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&skinColor=614335`}
          alt={name}
          className="w-[120%] h-[120%] object-cover mb-[-10%]"
        />
      </div>
      <div className="absolute top-1 -right-2 w-8 h-8 bg-accent-yellow rounded-lg flex items-center justify-center border-2 border-blue-900 shadow-md">
        <span className="text-blue-950 font-black text-sm">{cards}</span>
      </div>
    </div>
  </div>
);

const GameRules = () => {
  const h2Shadow =
    "0 2px 0 #533483, 0 4px 0 #533483, 0 6px 6px rgba(0,0,0,0.4)";

  return (
    <section className="py-32 px-4 flex flex-col items-center relative z-10">
      <h2
        className="text-5xl md:text-7xl font-black italic text-accent-yellow mb-20 tracking-tighter uppercase"
        style={{ textShadow: h2Shadow }}
      >
        GAME RULES
      </h2>

      <div className="relative w-full max-w-4xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        <button className="text-white hover:scale-110 transition-transform drop-shadow-2xl p-2 hidden md:block">
          <ChevronLeft size={64} strokeWidth={6} />
        </button>

        <div className="flex flex-1 justify-center items-end gap-3 md:gap-8">
          <PlayerAvatar
            name="Player 1"
            label="7 CARDS REMAINING"
            cards="7"
            seed="Felix"
          />

          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -10, rotate: -3 }}
            className="w-24 h-32 md:w-36 md:h-52 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 flex flex-col items-center justify-center relative translate-y-[-15px]"
          >
            <span className="absolute top-2 left-3 text-black font-black text-2xl md:text-4xl">
              3
            </span>
            <span className="text-black text-6xl md:text-9xl">♠</span>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -10, rotate: 3 }}
            className="w-24 h-32 md:w-36 md:h-52 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 flex flex-col items-center justify-center relative translate-y-[-15px]"
          >
            <span className="absolute top-2 left-3 text-black font-black text-2xl md:text-4xl">
              4
            </span>
            <span className="text-black text-6xl md:text-9xl">♠</span>
          </motion.div>

          <PlayerAvatar
            name="Player 2"
            label="DRAW CARD"
            cards="0"
            seed="Anya"
          />
        </div>

        <button className="text-white hover:scale-110 transition-transform drop-shadow-2xl p-2 hidden md:block">
          <ChevronRight size={64} strokeWidth={6} />
        </button>
      </div>

      <div className="mt-20 text-center max-w-2xl px-6">
        <p className="text-white font-black italic text-xl md:text-3xl uppercase tracking-tighter drop-shadow-2xl leading-tight">
          WHEN DRAW A CARD, THE OPPONENT MUST HAVE{" "}
          <br className="hidden md:block" />
          AT LEAST 2 CARDS IN THEIR HAND
        </p>
      </div>

      <div className="mt-16 w-full max-w-xl px-4">
        <button className="w-full bg-[#0072BC] hover:bg-[#0081d6] text-white font-black italic text-2xl md:text-3xl py-6 rounded-[24px] shadow-[0_8px_0_#004b7c] border-t-2 border-blue-300/30 transition-all hover:translate-y-[-2px] hover:shadow-[0_10px_0_#004b7c] active:translate-y-[2px] active:shadow-none uppercase tracking-tighter">
          HOW TO BUY & SELL?
        </button>
      </div>
    </section>
  );
};

export default GameRules;
