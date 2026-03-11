"use client";

import React from "react";
import { cn } from "@/lib/utils";

const SocialIcon = ({ href, label, src }) => (
  <a
    href={href}
    aria-label={label}
    className="hover:opacity-80 transition-opacity p-1 sm:p-1.5 lg:p-2 block"
  >
    <img src={src} alt={label} className="w-[22px] h-[22px] sm:w-7 sm:h-7 lg:w-[34px] lg:h-[34px] object-contain" />
  </a>
);

const FooterLogo = () => (
  <div className="flex flex-col items-center select-none pt-2 lg:pt-4">
    <img src="/ui/logo%20bottom.png" alt="Thulla Masters" className="w-[180px] sm:w-[260px] lg:w-[360px] h-auto object-contain drop-shadow-xl" />
  </div>
);

const SOCIALS = [
  { label: "Facebook", href: "#", src: "/ui/facebook.png" },
  { label: "WhatsApp", href: "#", src: "/ui/whatsapp.png" },
  { label: "TikTok", href: "#", src: "/ui/tiktok.png" },
  { label: "Instagram", href: "#", src: "/ui/instagram.png" },
  { label: "Email", href: "#", src: "/ui/email.png" },
];

const Footer = ({ className }) => (
  <footer
    id="contact"
    className={cn(
      "relative w-full min-h-[220px] sm:min-h-[340px] lg:min-h-[500px] pt-7 sm:pt-12 lg:pt-24",
      className
    )}
  >
    {/* Dark arc background */}
    <div
      className="absolute bottom-0 left-0 right-0 z-0"
      style={{
        top: 20,
        background: "linear-gradient(180deg, #0d3b9e 0%, #0a2e82 100%)",
        borderRadius: "50% 50% 0 0 / 25% 25% 0 0",
      }}
    />

    <div className="absolute bottom-0 left-0 z-20 pointer-events-none w-[120px] sm:w-[200px] lg:w-[280px]">
      <img src="/ui/botm%20red%20queen.png" alt="Red Queen" className="w-full h-auto object-contain object-bottom" />
    </div>
    
    <div className="absolute bottom-0 right-0 z-20 pointer-events-none w-[120px] sm:w-[200px] lg:w-[280px]">
      <img src="/ui/bottom%20green%20joker.png" alt="Green Joker" className="w-full h-auto object-contain object-bottom" />
    </div>

    <div className="relative z-30 flex flex-col items-center gap-3 sm:gap-4 lg:gap-5 pt-3 sm:pt-5 lg:pt-6 pb-4 sm:pb-6 lg:pb-8">
      {/* Social links */}
      <div className="flex items-center justify-center gap-3.5 sm:gap-5 lg:gap-7">
        {SOCIALS.map((s) => (
          <SocialIcon key={s.label} href={s.href} label={s.label} src={s.src} />
        ))}
      </div>

      <FooterLogo />

      <p className="text-white font-bold uppercase tracking-widest text-[0.5rem] sm:text-[0.65rem] lg:text-[0.82rem] mt-2 lg:mt-4">
        ALL RIGHTS RESERVED 2026
      </p>
    </div>
  </footer>
);

export default Footer;
