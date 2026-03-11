"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RULES = [
  {
    player1: { title: "7 CARDS REMAINING", badge: 7,  skin: "#7a4520", hair: "#1a1209" },
    player2: { title: "DRAW CARD",          badge: 0,  skin: "#c8845a", hair: "#3d1f0a" },
    cards: [
      { value: "3", suit: "♠", red: false },
      { value: "4", suit: "♠", red: false },
    ],
    rule: "WHEN DRAW A CARD, THE OPPONENT MUST HAVE ATLEAST 2 CARDS IN THIER HAND",
  },
  {
    player1: { title: "PLAY ANY CARD",  badge: 5, skin: "#c8845a", hair: "#3d1f0a" },
    player2: { title: "THULLA CHANCE", badge: 3, skin: "#7a4520",  hair: "#1a1209" },
    cards: [{ value: "A", suit: "♥", red: true }],
    rule: "PLAYING AN ACE FORCES THE NEXT PLAYER TO DRAW 4 CARDS UNLESS THEY ALSO HAVE AN ACE",
  },
  {
    player1: { title: "LAST CARD", badge: 1, skin: "#7a4520", hair: "#1a1209" },
    player2: { title: "CHALLENGE",  badge: 8, skin: "#c8845a", hair: "#3d1f0a" },
    cards: [
      { value: "K", suit: "♦", red: true },
      { value: "Q", suit: "♦", red: true },
    ],
    rule: "THE PLAYER WITH THE MOST CARDS AT THE END IS THE BHABHI AND LOSES THE ROUND",
  },
];

const CartoonFace = ({ skinColor, hairColor }) => (
  <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", bottom: "-5%", left: "50%", transform: "translateX(-50%)", width: "110%", height: "110%" }}>
    <rect x="38" y="78" width="24" height="22" rx="6" fill={skinColor} />
    <ellipse cx="50" cy="115" rx="35" ry="18" fill="#1a3d8f" />
    <ellipse cx="50" cy="54" rx="28" ry="30" fill={skinColor} />
    <ellipse cx="50" cy="30" rx="28" ry="14" fill={hairColor} />
    <rect x="22" y="26" width="56" height="14" rx="6" fill={hairColor} />
    <ellipse cx="39" cy="52" rx="5" ry="5.5" fill="white" />
    <ellipse cx="61" cy="52" rx="5" ry="5.5" fill="white" />
    <circle cx="40" cy="53" r="3" fill="#111" />
    <circle cx="62" cy="53" r="3" fill="#111" />
    <circle cx="41" cy="51" r="1" fill="white" />
    <circle cx="63" cy="51" r="1" fill="white" />
    <path d="M42 70 Q50 76 58 70" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

const PlayerAvatar = ({ title, badge, skin, hair }) => (
  <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
    <span className="avatar-title text-accent-yellow font-black uppercase text-center text-border-black">
      {title}
    </span>
    <div className="relative">
      <div
        className="avatar-box"
        style={{
          background: "linear-gradient(180deg,#1da1f2 0%,#0d59a5 100%)",
          border: "3px solid #0a74d2",
          boxShadow: "0 4px 0 rgba(10,116,210,0.5)",
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <CartoonFace skinColor={skin} hairColor={hair} />
      </div>
      <div
        className="avatar-badge absolute flex items-center justify-center border-2 border-black rounded"
        style={{ background: "#fecb00", boxShadow: "0 2px 0 rgba(0,0,0,0.4)", position: "absolute" }}
      >
        <span className="text-black font-black leading-none" style={{ fontSize: "inherit" }}>{badge}</span>
      </div>
    </div>
  </div>
);

const PlayingCard = ({ value, suit, red }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.04 }}
    className="game-card flex-shrink-0 bg-white"
    style={{
      boxShadow: "0 8px 18px rgba(0,0,0,0.35)",
      border: "1.5px solid #e5e7eb",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <span className="game-card-rank" style={{ position: "absolute", top: "5%", left: "8%", color: red ? "#ef4444" : "#111" }}>{value}</span>
    <span className="game-card-suit" style={{ color: red ? "#ef4444" : "#111", marginTop: "4%" }}>{suit}</span>
    <span className="game-card-rank" style={{ position: "absolute", bottom: "5%", right: "8%", color: red ? "#ef4444" : "#111", transform: "rotate(180deg)" }}>{value}</span>
  </motion.div>
);

const ArrowBtn = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className="text-white hover:scale-110 active:scale-90 transition-transform drop-shadow-lg cursor-pointer"
    aria-label={direction === "left" ? "Previous rule" : "Next rule"}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14">
      {direction === "left" ? (
        <path fillRule="evenodd" d="M15.28 5.22a.75.75 0 010 1.06L9.56 12l5.72 5.72a.75.75 0 01-1.06 1.06l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.75.75 0 011.06 0z" clipRule="evenodd" />
      ) : (
        <path fillRule="evenodd" d="M8.72 5.22a.75.75 0 011.06 0l6.25 6.25a.75.75 0 010 1.06l-6.25 6.25a.75.75 0 01-1.06-1.06L14.44 12 8.72 6.28a.75.75 0 010-1.06z" clipRule="evenodd" />
      )}
    </svg>
  </button>
);

const GameRules = () => {
  const [index, setIndex] = useState(0);
  const rule = RULES[index];
  const prev = () => setIndex((i) => (i - 1 + RULES.length) % RULES.length);
  const next = () => setIndex((i) => (i + 1) % RULES.length);

  return (
    <section id="how-to-play" className="pt-8 pb-10 sm:pb-16 lg:pb-24 px-4 flex flex-col items-center relative z-10 w-full text-center">
      <h2
        className="font-black uppercase text-accent-yellow text-border-black mb-6 lg:mb-14 text-[1.8rem] sm:text-[2.6rem] lg:text-[4.5rem]"
        style={{ letterSpacing: "-0.02em", lineHeight: 1 }}
      >
        GAME RULES
      </h2>

      <div className="relative w-full px-10 sm:px-14 lg:px-16" style={{ maxWidth: "min(98%, 760px)" }}>
        <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", zIndex: 10 }}>
          <ArrowBtn direction="left" onClick={prev} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-between gap-2 sm:gap-4"
          >
            <PlayerAvatar title={rule.player1.title} badge={rule.player1.badge} skin={rule.player1.skin} hair={rule.player1.hair} />
            <div className="flex items-center justify-center flex-shrink-0">
              {rule.cards.map((c) => <PlayingCard key={c.value + c.suit} value={c.value} suit={c.suit} red={c.red} />)}
            </div>
            <PlayerAvatar title={rule.player2.title} badge={rule.player2.badge} skin={rule.player2.skin} hair={rule.player2.hair} />
          </motion.div>
        </AnimatePresence>

        <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 10 }}>
          <ArrowBtn direction="right" onClick={next} />
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-4">
        {RULES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="rounded-full transition-all cursor-pointer"
            style={{
              width:  i === index ? 24 : 10,
              height: 10,
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
          <p className="text-white font-black uppercase text-center drop-shadow-lg text-[0.88rem] sm:text-[1.05rem] lg:text-[1.35rem]"
            style={{ letterSpacing: "0.02em", lineHeight: 1.4 }}>
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
