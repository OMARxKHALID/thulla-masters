"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const tutorialImage = `/ui/tutorial ${index + 1}.png`;
  const Rules = [1, 2, 3, 4, 5, 6, 7];
  const prev = () => setIndex((i) => (i - 1 + 7) % 7);
  const next = () => setIndex((i) => (i + 1) % 7);

  return (
    <section
      id="how-to-play"
      className="pt-8 pb-10 sm:pb-16 lg:pb-24 px-4 flex flex-col items-center relative z-10 w-full text-center"
    >
      <div className="mb-6 lg:mb-14 flex justify-center w-[200px] sm:w-[280px] lg:w-[380px]">
        <img
          src="/ui/game%20rules.png"
          alt="Game Rules"
          className="w-full h-auto object-contain drop-shadow-xl"
        />
      </div>

      <div className="relative w-full px-10 sm:px-14 lg:px-16 max-w-[1050px]">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <ArrowBtn direction="left" onClick={prev} />
        </div>

        {/* Carousel Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center p-2"
          >
            <div className="relative w-full max-w-[850px]">
              <img
                src={tutorialImage}
                alt={`Tutorial step ${index + 1}`}
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <ArrowBtn direction="right" onClick={next} />
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-6">
        {Rules.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="rounded-full transition-all cursor-pointer h-[10px]"
            style={{
              width: i === index ? 24 : 10,
              background: i === index ? "#fecb00" : "rgba(255,255,255,0.4)",
            }}
            aria-label={`Rule ${i + 1}`}
          />
        ))}
      </div>

      {/* Rule text is intentionally omitted here because it is baked into the tutorial X.png images */}

      <div className="mt-8 w-[95%] max-w-lg">
        <button className="btn-secondary-blue">
          <img src="/ui/HOW%20TO%20BUY%20&%20SELL_.png" alt="HOW TO BUY & SELL?" className="h-[12px] sm:h-[16px] lg:h-[20px] object-contain drop-shadow-sm" />
        </button>
      </div>
    </section>
  );
};

export default GameRules;
