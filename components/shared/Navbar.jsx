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
