"use client";

import React from "react";
import { cn } from "@/lib/utils";

const NavLogo = () => (
  <a
    href="#home"
    className="flex flex-col items-start leading-none italic select-none"
  >
    <span
      className="font-black uppercase text-accent-yellow"
      style={{
        fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
        lineHeight: 1,
        textShadow:
          "1px 1px 0 #4d2a75,-1px -1px 0 #4d2a75,1px -1px 0 #4d2a75,-1px 1px 0 #4d2a75,0px 3px 0 #4d2a75",
      }}
    >
      THULLA
    </span>
    <span
      className="font-black text-[#d9cff5]"
      style={{
        fontSize: "clamp(1.25rem, 3.2vw, 2.2rem)",
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

const NAV_LINKS = [
  { name: "HOME", href: "#home", active: true },
  { name: "HOW TO PLAY", href: "#how-to-play" },
  { name: "BUY & SELL", href: "#how-to-play" },
  { name: "CONTACT", href: "#contact" },
];

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-16 xl:px-24 py-3 sm:py-4 lg:py-5">
    <NavLogo />
    <div className="flex items-center gap-3 sm:gap-6 lg:gap-10 xl:gap-14">
      {NAV_LINKS.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className={cn(
            "font-black uppercase tracking-tight transition-colors whitespace-nowrap",
            link.active
              ? "text-accent-yellow"
              : "text-white hover:text-accent-yellow",
          )}
          style={{ fontSize: "clamp(0.65rem, 2vw, 1.15rem)" }}
        >
          {link.name}
        </a>
      ))}
    </div>
  </nav>
);

export default Navbar;
