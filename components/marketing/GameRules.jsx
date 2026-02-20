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
    <section className="py-20 md:py-32 px-4 flex flex-col items-center relative z-10 w-full overflow-hidden">
      <h2
        className="text-4xl md:text-7xl font-black italic text-accent-yellow mb-12 md:mb-20 tracking-tighter uppercase text-center"
        style={{ textShadow: h2Shadow }}
      >
        GAME RULES
      </h2>

      <div className="relative w-full max-w-5xl mx-auto flex items-center justify-between gap-1 md:gap-4">
        {/* Navigation Buttons visible on mobile but smaller */}
        <button className="text-white hover:scale-110 transition-transform drop-shadow-2xl p-1 md:p-3 flex-shrink-0">
          <ChevronLeft className="w-8 h-8 md:w-16 md:h-16" strokeWidth={6} />
        </button>

        <div className="flex flex-1 justify-center items-end gap-1.5 md:gap-8 min-w-0">
          <PlayerAvatar
            name="Player 1"
            label="7 CARDS REMAINING"
            cards="7"
            seed="Felix"
          />

          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -5, rotate: -2 }}
            className="w-14 h-20 md:w-36 md:h-[200px] bg-white rounded-lg md:rounded-2xl shadow-xl border md:border-2 border-gray-100 flex flex-col items-center justify-center relative translate-y-[-10px] md:translate-y-[-15px] flex-shrink-0"
          >
            <span className="absolute top-1 left-1.5 md:top-2 md:left-3 text-black font-black text-sm md:text-4xl">
              3
            </span>
            <span className="text-black text-3xl md:text-9xl">♠</span>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -5, rotate: 2 }}
            className="w-14 h-20 md:w-36 md:h-[200px] bg-white rounded-lg md:rounded-2xl shadow-xl border md:border-2 border-gray-100 flex flex-col items-center justify-center relative translate-y-[-10px] md:translate-y-[-15px] flex-shrink-0"
          >
            <span className="absolute top-1 left-1.5 md:top-2 md:left-3 text-black font-black text-sm md:text-4xl">
              4
            </span>
            <span className="text-black text-3xl md:text-9xl">♠</span>
          </motion.div>

          <PlayerAvatar
            name="Player 2"
            label="DRAW CARD"
            cards="0"
            seed="Anya"
          />
        </div>

        <button className="text-white hover:scale-110 transition-transform drop-shadow-2xl p-1 md:p-3 flex-shrink-0">
          <ChevronRight className="w-8 h-8 md:w-16 md:h-16" strokeWidth={6} />
        </button>
      </div>

      <div className="mt-12 md:mt-20 text-center max-w-2xl px-4 md:px-6">
        <p className="text-white font-black italic text-lg md:text-3xl uppercase tracking-tighter drop-shadow-2xl leading-tight">
          WHEN DRAW A CARD, THE OPPONENT MUST HAVE{" "}
          <br className="hidden md:block" />
          AT LEAST 2 CARDS IN THEIR HAND
        </p>
      </div>

      <div className="mt-12 md:mt-16 w-full max-w-[320px] md:max-w-xl px-4">
        <button className="w-full bg-[#0072BC] hover:bg-[#0081d6] text-white font-black italic text-xl md:text-3xl py-4 md:py-6 rounded-[16px] md:rounded-[24px] shadow-[0_6px_0_#004b7c] md:shadow-[0_8px_0_#004b7c] border-t-2 border-blue-300/30 transition-all hover:translate-y-[-2px] hover:shadow-[0_8px_0_#004b7c] md:hover:shadow-[0_10px_0_#004b7c] active:translate-y-[2px] active:shadow-none uppercase tracking-tighter">
          HOW TO BUY & SELL?
        </button>
      </div>
    </section>
  );
};

export default GameRules;
