"use client";

import React from "react";
import { motion } from "framer-motion";

const BuySell = () => {
  return (
    <section id="buy-sell" className="pt-16 pb-12 sm:pb-16 lg:pb-24 px-4 flex flex-col items-center relative z-10 w-full text-center">
      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, margin: "-100px" }}
        className="mb-8 lg:mb-12 flex justify-center w-[260px] sm:w-[340px] lg:w-[480px]"
      >
        <img 
          src="/ui/HOW%20TO%20BUY%20&%20SELL_.png" 
          alt="How to Buy and Sell" 
          className="w-full h-auto object-contain drop-shadow-xl" 
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="max-w-2xl mx-auto space-y-4 px-6 py-8 rounded-3xl"
        style={{
          background: "linear-gradient(180deg, rgba(29, 161, 242, 0.15) 0%, rgba(13, 89, 165, 0.3) 100%)",
          border: "2px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(4px)"
        }}
      >
        <p className="text-white font-bold leading-relaxed tracking-wide text-[0.95rem] sm:text-[1.1rem] lg:text-[1.25rem] drop-shadow-md">
          Join the exclusive Thulla Masters marketplace! Trade your rare cards, avatars, and special badges securely.
        </p>
        <p className="text-white/80 font-medium leading-relaxed tracking-wide text-[0.85rem] sm:text-[0.95rem] lg:text-[1.1rem]">
          Marketplace feature coming soon. Keep honing your skills and stacking up your card collection in the meantime.
        </p>
        <div className="pt-4">
            <button className="btn-primary-purple max-w-[200px] mx-auto opacity-70 cursor-not-allowed">
              MARKETPLACE COMING SOON
            </button>
        </div>
      </motion.div>
    </section>
  );
};

export default BuySell;
