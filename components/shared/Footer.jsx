"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SocialIcon = ({ href, label, src }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:opacity-80 transition-opacity p-1 sm:p-1.5 lg:p-2 block"
  >
    <Image 
      src={src} 
      alt={label} 
      width={34} 
      height={34} 
      className="w-[22px] h-[22px] sm:w-7 sm:h-7 lg:w-[34px] lg:h-[34px] object-contain" 
    />
  </a>
);

const FooterLogo = () => (
  <div className="flex flex-col items-center select-none pt-2 lg:pt-4">
    <Image 
      src="/ui/logo bottom.png" 
      alt="Thulla Masters" 
      width={360} 
      height={120} 
      className="w-[180px] sm:w-[260px] lg:w-[360px] h-auto object-contain drop-shadow-xl" 
    />
  </div>
);

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/", src: "/ui/facebook.png" },
  { label: "WhatsApp", href: "https://www.whatsapp.com/", src: "/ui/whatsapp.png" },
  { label: "TikTok", href: "https://www.tiktok.com/", src: "/ui/tiktok.png" },
  { label: "Instagram", href: "https://www.instagram.com/", src: "/ui/instagram.png" },
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
      <Image 
        src="/ui/botm red queen.png" 
        alt="Red Queen Decoration" 
        width={280} 
        height={400} 
        className="w-full h-auto object-contain object-bottom" 
      />
    </div>
    
    <div className="absolute bottom-0 right-0 z-20 pointer-events-none w-[120px] sm:w-[200px] lg:w-[280px]">
      <Image 
        src="/ui/bottom green joker.png" 
        alt="Green Joker Decoration" 
        width={280} 
        height={400} 
        className="w-full h-auto object-contain object-bottom" 
      />
    </div>

    <div className="relative z-30 flex flex-col items-center gap-3 sm:gap-4 lg:gap-5 pt-3 sm:pt-5 lg:pt-6 pb-4 sm:pb-6 lg:pb-8">
      {/* Social links */}
      <div className="flex items-center justify-center gap-3.5 sm:gap-5 lg:gap-7">
        {SOCIALS.map((s) => (
          <SocialIcon key={s.label} href={s.href} label={s.label} src={s.src} />
        ))}
      </div>

      <FooterLogo />

      <Image 
        src="/ui/ALL RIGHTS RESERVED 2026.png" 
        alt="ALL RIGHTS RESERVED 2026" 
        width={200}
        height={13}
        className="h-[8px] sm:h-[10px] lg:h-[13px] w-auto object-contain mt-2 lg:mt-4 opacity-80" 
      />
    </div>
  </footer>
);

export default Footer;
