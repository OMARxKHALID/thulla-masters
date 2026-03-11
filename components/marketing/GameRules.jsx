"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RULES = [
  {
    player1: { title: "7 CARDS REMAINING", badge: 7,  avatar: "/ui/Avatar%20boy.png" },
    player2: { title: "DRAW CARD",          badge: 0,  avatar: "/ui/avatar%20girl.png" },
    cards: [
      { value: "3", suit: "♠", red: false },
      { value: "4", suit: "♠", red: false },
    ],
    rule: "WHEN DRAW A CARD, THE OPPONENT MUST HAVE ATLEAST 2 CARDS IN THIER HAND",
  },
  {
    player1: { title: "PLAY ANY CARD",  badge: 5, avatar: "/ui/avatar%20girl.png" },
    player2: { title: "THULLA CHANCE", badge: 3, avatar: "/ui/Avatar%20boy.png" },
    cards: [{ value: "A", suit: "♥", red: true }],
    rule: "PLAYING AN ACE FORCES THE NEXT PLAYER TO DRAW 4 CARDS UNLESS THEY ALSO HAVE AN ACE",
  },
  {
    player1: { title: "LAST CARD", badge: 1, avatar: "/ui/Avatar%20boy.png" },
    player2: { title: "CHALLENGE",  badge: 8, avatar: "/ui/avatar%20girl.png" },
    cards: [
      { value: "K", suit: "♦", red: true },
      { value: "Q", suit: "♦", red: true },
    ],
    rule: "THE PLAYER WITH THE MOST CARDS AT THE END IS THE BHABHI AND LOSES THE ROUND",
  },
];

const PlayerAvatar = ({ title, badge, avatar }) => (
  <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
    <span
      className="text-accent-yellow font-black uppercase text-center text-border-black
                 text-[0.55rem] sm:text-[0.68rem] lg:text-[0.82rem]
                 w-[70px] sm:w-[100px] lg:w-[130px]"
      style={{ lineHeight: 1.2 }}
    >
      {title}
    </span>
    <div className="relative">
      <div
        className="w-[64px] h-[78px] sm:w-[88px] sm:h-[108px] lg:w-[120px] lg:h-[146px] relative overflow-hidden rounded-[12px] flex items-end justify-center"
        style={{
          background: "linear-gradient(180deg,#1da1f2 0%,#0d59a5 100%)",
          border: "3px solid #0a74d2",
          boxShadow: "0 4px 0 rgba(10,116,210,0.5)",
        }}
      >
        <img src={avatar} alt="Avatar" className="w-[110%] h-[110%] object-contain object-bottom translate-y-[5%]" />
      </div>
      <div
        className="absolute top-[26%] flex items-center justify-center
                   w-6 h-6 sm:w-[30px] sm:h-[30px] lg:w-[36px] lg:h-[36px]
                   -right-3 sm:-right-[15px] lg:-right-[18px]"
      >
        <img src="/ui/ItemFrame%20Single_Yellow.png" alt="Badge" className="absolute inset-0 w-full h-full object-contain drop-shadow" />
        <span className="relative z-10 text-black font-black leading-none text-[12px] sm:text-[14px] lg:text-[18px] mt-[1px]">
          {badge}
        </span>
      </div>
    </div>
  </div>
);

const PlayingCard = ({ value, suit, red }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.04 }}
    className="flex-shrink-0 bg-white relative flex items-center justify-center
               w-[68px] h-[92px] rounded-[7px] mx-[3px]
               sm:w-[96px] sm:h-[130px] sm:rounded-[9px] sm:mx-[5px]
               lg:w-[136px] lg:h-[185px] lg:rounded-[12px] lg:mx-[8px]"
    style={{
      boxShadow: "0 8px 18px rgba(0,0,0,0.35)",
      border: "1.5px solid #e5e7eb",
    }}
  >
    <span
      className="absolute top-[5%] left-[8%] font-black leading-none
                 text-[1rem] sm:text-[1.3rem] lg:text-[1.7rem]"
      style={{ color: red ? "#ef4444" : "#111" }}
    >
      {value}
    </span>
    <span
      className="text-[2.2rem] sm:text-[3rem] lg:text-[4.2rem]"
      style={{ color: red ? "#ef4444" : "#111", marginTop: "4%" }}
    >
      {suit}
    </span>
    <span
      className="absolute bottom-[5%] right-[8%] font-black leading-none rotate-180
                 text-[1rem] sm:text-[1.3rem] lg:text-[1.7rem]"
      style={{ color: red ? "#ef4444" : "#111" }}
    >
      {value}
    </span>
  </motion.div>
);

const ArrowBtn = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className="hover:scale-110 active:scale-90 transition-transform drop-shadow-lg cursor-pointer flex-shrink-0"
    aria-label={direction === "left" ? "Previous rule" : "Next rule"}
  >
    <img 
      src={direction === "left" ? "/ui/arrow%20l.png" : "/ui/arrow%20r.png"} 
      alt={direction === "left" ? "Previous" : "Next"}
      className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 object-contain" 
    />
  </button>
);

const GameRules = () => {
  const [index, setIndex] = useState(0);
  const rule = RULES[index];
  const prev = () => setIndex((i) => (i - 1 + RULES.length) % RULES.length);
  const next = () => setIndex((i) => (i + 1) % RULES.length);

  return (
    <section id="how-to-play" className="pt-8 pb-10 sm:pb-16 lg:pb-24 px-4 flex flex-col items-center relative z-10 w-full text-center">
      <div className="mb-6 lg:mb-14 flex justify-center w-[200px] sm:w-[280px] lg:w-[380px]">
        <img src="/ui/game%20rules.png" alt="Game Rules" className="w-full h-auto object-contain drop-shadow-xl" />
      </div>

      <div className="relative w-full px-10 sm:px-14 lg:px-16 max-w-[760px]">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <ArrowBtn direction="left" onClick={prev} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-between gap-2 sm:gap-4"
          >
            <PlayerAvatar title={rule.player1.title} badge={rule.player1.badge} avatar={rule.player1.avatar} />
            <div className="flex items-center justify-center flex-shrink-0">
              {rule.cards.map((c) => <PlayingCard key={c.value + c.suit} value={c.value} suit={c.suit} red={c.red} />)}
            </div>
            <PlayerAvatar title={rule.player2.title} badge={rule.player2.badge} avatar={rule.player2.avatar} />
          </motion.div>
        </AnimatePresence>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <ArrowBtn direction="right" onClick={next} />
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-4">
        {RULES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="rounded-full transition-all cursor-pointer h-[10px]"
            style={{
              width:  i === index ? 24 : 10,
              background: i === index ? "#fecb00" : "rgba(255,255,255,0.4)",
            }}
            aria-label={`Rule ${i + 1}`}
          />
        ))}
      </div>

      {/* Rule text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-6 px-2 w-[95%] max-w-[560px]"
        >
          <p
            className="text-white font-black uppercase text-center drop-shadow-lg
                       text-[0.88rem] sm:text-[1.05rem] lg:text-[1.35rem]"
            style={{ letterSpacing: "0.02em", lineHeight: 1.4 }}
          >
            {rule.rule}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 w-[95%] max-w-lg">
        <button className="btn-secondary-blue">HOW TO BUY &amp; SELL?</button>
      </div>
    </section>
  );
};

export default GameRules;
