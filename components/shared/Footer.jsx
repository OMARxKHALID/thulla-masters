"use client";

import React from "react";
import { Facebook, Instagram, Mail, MessageCircle, Music } from "lucide-react";

const Footer = () => {
  const logoShadow =
    "0 1px 0 #533483, 0 2px 0 #533483, 0 3px 0 #533483, 0 4px 6px rgba(0,0,0,0.5)";

  return (
    <footer className="relative w-full pt-40 pb-12 px-6 bg-transparent overflow-hidden mt-20">
      {/* Detailed Queen Illustration (Left) */}
      <div className="absolute bottom-0 left-0 w-40 md:w-80 group z-20">
        <div className="relative flex flex-col items-center">
          {/* Crown */}
          <div className="w-16 h-8 md:w-24 md:h-12 bg-gradient-to-b from-yellow-300 to-yellow-600 rounded-t-full relative z-30 border-b-2 border-red-900 shadow-xl flex items-center justify-center -mb-1">
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 md:w-3 md:h-3 bg-orange-400 rounded-full border border-yellow-800"
                ></div>
              ))}
            </div>
          </div>
          {/* Head/Body */}
          <div className="w-32 h-44 md:w-64 md:h-[350px] bg-[#C1262B] rounded-t-[100px] border-x-[12px] border-t-[12px] border-[#A01E22] relative overflow-hidden shadow-2xl transition-transform group-hover:scale-105 duration-500">
            {/* Face Area */}
            <div className="absolute top-10 md:top-16 left-1/2 -translate-x-1/2 w-24 h-24 md:w-40 md:h-40 bg-[#FFD7BA] rounded-full border-4 border-[#8B1A1E] flex flex-col items-center pt-8 md:pt-12">
              <div className="flex gap-4 md:gap-8 mb-4">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-[#4A2C2A] rounded-full"></div>
                <div className="w-3 h-3 md:w-4 md:h-4 bg-[#4A2C2A] rounded-full"></div>
              </div>
              <div className="w-10 h-5 border-b-4 border-red-500 rounded-full"></div>
            </div>
            {/* Suit Symbol */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/10 text-[100px] md:text-[180px] leading-none font-black select-none pointer-events-none">
              ♥
            </div>
          </div>
        </div>
      </div>

      {/* Detailed King Illustration (Right) */}
      <div className="absolute bottom-0 right-0 w-40 md:w-80 group z-20">
        <div className="relative flex flex-col items-center">
          {/* Crown */}
          <div className="w-16 h-8 md:w-24 md:h-12 bg-gradient-to-b from-yellow-400 to-yellow-700 rounded-t-lg relative z-30 border-b-2 border-green-900 shadow-xl flex items-center justify-center -mb-1">
            <div className="w-4 h-4 md:w-6 md:h-6 bg-green-400 rounded-sm border border-yellow-800 rotate-45"></div>
          </div>
          {/* Head/Body */}
          <div className="w-32 h-44 md:w-64 md:h-[350px] bg-[#1E6B2D] rounded-t-[100px] border-x-[12px] border-t-[12px] border-[#144D1F] relative overflow-hidden shadow-2xl transition-transform group-hover:scale-105 duration-500">
            {/* Face Area */}
            <div className="absolute top-10 md:top-16 left-1/2 -translate-x-1/2 w-24 h-24 md:w-40 md:h-40 bg-[#FFD7BA] rounded-full border-4 border-[#0D3B11] flex flex-col items-center pt-8 md:pt-12">
              <div className="flex gap-4 md:gap-8 mb-3">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-[#4A2C2A] rounded-full"></div>
                <div className="w-3 h-3 md:w-4 md:h-4 bg-[#4A2C2A] rounded-full"></div>
              </div>
              <div className="w-12 h-3.5 bg-[#0D3B11] rounded-full mb-1"></div>
              <div className="w-8 h-2 md:w-10 md:h-3 border-b-2 border-green-800 rounded-full"></div>
            </div>
            {/* Suit Symbol */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/10 text-[100px] md:text-[180px] leading-none font-black select-none pointer-events-none">
              ♣
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-30 flex flex-col items-center gap-12">
        {/* Social Icons */}
        <div className="flex items-center gap-6 md:gap-10">
          {[
            { icon: <Facebook />, label: "Facebook" },
            { icon: <MessageCircle />, label: "WhatsApp" },
            { icon: <Music />, label: "TikTok" },
            { icon: <Instagram />, label: "Instagram" },
            { icon: <Mail />, label: "Email" },
          ].map((social, idx) => (
            <a
              key={idx}
              href="#"
              aria-label={social.label}
              className="text-white/80 hover:text-white hover:scale-110 transition-all"
            >
              {React.cloneElement(social.icon, {
                size: 28,
                strokeWidth: 2.5,
              })}
            </a>
          ))}
        </div>

        {/* Logo & Copyright */}
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center leading-[0.7] italic font-black uppercase select-none">
            <span
              className="text-4xl md:text-5xl text-[#fecb00]"
              style={{ textShadow: logoShadow }}
            >
              THULLA
            </span>
            <span
              className="text-3xl md:text-4xl text-white mt-1"
              style={{ textShadow: logoShadow }}
            >
              MASTERS
            </span>
          </div>
          <p className="text-xs md:text-sm font-black text-white/50 tracking-[0.4em] uppercase">
            ALL RIGHTS RESERVED 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
