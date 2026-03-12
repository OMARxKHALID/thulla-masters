"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_STEPS = 7;

const ArrowBtn = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className="hover:scale-110 active:scale-90 transition-transform drop-shadow-lg cursor-pointer flex-shrink-0"
    aria-label={direction === "left" ? "Previous step" : "Next step"}
  >
    <img
      src={direction === "left" ? "/ui/arrow%20l.png" : "/ui/arrow%20r.png"}
      alt={direction === "left" ? "Previous" : "Next"}
      className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 object-contain opacity-80 hover:opacity-100"
    />
  </button>
);

const Tutorial = () => {
  const [step, setStep] = useState(1);

  const prev = () => setStep((s) => (s === 1 ? TOTAL_STEPS : s - 1));
  const next = () => setStep((s) => (s === TOTAL_STEPS ? 1 : s + 1));

  return (
    <section className="pt-10 pb-16 sm:pb-20 lg:pb-32 px-4 flex flex-col items-center relative z-10 w-full text-center">
      
      {/* Container for the tutorial image with side arrows */}
      <div className="relative w-full max-w-[800px] flex items-center justify-center mt-6">
        
        <div className="absolute left-0 sm:-left-4 md:-left-12 z-20">
          <ArrowBtn direction="left" onClick={prev} />
        </div>

        <div className="w-full max-w-[600px] aspect-[4/3] rounded-[24px] overflow-hidden drop-shadow-2xl relative mx-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#0a2e82]/50 border-2 border-white/10 rounded-[24px]"
            >
              <img
                src={`/ui/tutorial%20${step}.png`}
                alt={`Tutorial Step ${step}`}
                className="w-[95%] h-[95%] object-contain drop-shadow-xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute right-0 sm:-right-4 md:-right-12 z-20">
          <ArrowBtn direction="right" onClick={next} />
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex gap-2.5 mt-8">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i + 1)}
            className="rounded-full transition-all cursor-pointer h-[12px]"
            style={{
              width: i + 1 === step ? 28 : 12,
              background: i + 1 === step ? "#fecb00" : "rgba(255,255,255,0.3)",
              boxShadow: i + 1 === step ? "0 0 10px rgba(254, 203, 0, 0.5)" : "none"
            }}
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
      </div>
      
    </section>
  );
};

export default Tutorial;
