"use client";

import React from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "HOME",        href: "#home",       active: true },
  { name: "HOW TO PLAY", href: "#how-to-play" },
  { name: "BUY & SELL",  href: "#how-to-play" },
  { name: "CONTACT",     href: "#contact" },
];

const NavLogo = () => (
  <a href="#home" className="flex flex-col items-start leading-none italic select-none">
    <span
      className="font-black uppercase text-accent-yellow text-[1.6rem] sm:text-[2rem] lg:text-[2.8rem]"
      style={{
        lineHeight: 1,
        textShadow:
          "1px 1px 0 #4d2a75,-1px -1px 0 #4d2a75,1px -1px 0 #4d2a75,-1px 1px 0 #4d2a75,0px 3px 0 #4d2a75",
      }}
    >
      THULLA
    </span>
    <span
      className="font-black text-[#d9cff5] text-[1.25rem] sm:text-[1.6rem] lg:text-[2.2rem]"
      style={{
        lineHeight: 1,
        marginTop: "1px",
        textShadow:
          "1.5px 1.5px 0 #4d2a75,-1.5px -1.5px 0 #4d2a75,1.5px -1.5px 0 #4d2a75,-1.5px 1.5px 0 #4d2a75,0px 4px 0 #4d2a75",
      }}
    >
      MasterS
    </span>
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
            "font-black uppercase tracking-tight transition-colors whitespace-nowrap text-[0.6rem] sm:text-[0.85rem] lg:text-[1.1rem]",
            link.active ? "text-accent-yellow" : "text-white hover:text-accent-yellow"
          )}
        >
          {link.name}
        </a>
      ))}
    </div>
  </nav>
);

export default Navbar;
