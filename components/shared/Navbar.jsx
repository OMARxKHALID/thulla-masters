"use client";

import React from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "HOME",        href: "#home",       src: "/ui/HOME.png", active: true },
  { name: "HOW TO PLAY", href: "#how-to-play", src: "/ui/HOW%20TO%20PLAY.png" },
  { name: "BUY & SELL",  href: "#how-to-play", src: "/ui/BUY%20&%20SELL.png" },
  { name: "CONTACT",     href: "#contact",    src: "/ui/CONTACT.png" },
];

const NavLogo = () => (
  <a href="#home" className="flex flex-col items-start leading-none select-none">
    <img src="/ui/logo.png" alt="Thulla Masters" className="h-[36px] sm:h-[46px] lg:h-[60px] object-contain drop-shadow-lg" />
  </a>
);

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-16 xl:px-24 py-3 sm:py-4 lg:py-5">
    <NavLogo />
    <div className="flex items-center gap-2 sm:gap-6 lg:gap-10 xl:gap-14">
      {NAV_LINKS.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className={cn(
            "transition-transform hover:scale-105 active:scale-95 px-1 sm:px-2 flex items-center justify-center"
          )}
        >
          <img 
            src={link.src} 
            alt={link.name} 
            className="h-[10px] sm:h-[13px] lg:h-[16px] object-contain drop-shadow-md" 
            style={{ filter: link.active ? 'drop-shadow(0 2px 4px rgba(254,203,0,0.4))' : 'brightness(0.9) hover:brightness(1.1)' }}
          />
        </a>
      ))}
    </div>
  </nav>
);

export default Navbar;
