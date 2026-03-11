"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NavLogo = () => (
  <Link
    href="/"
    className="flex flex-col items-start leading-none italic select-none"
  >
    <span
      className="font-black uppercase text-accent-yellow"
      style={{
        fontSize: "clamp(1.25rem, 4vw, 2rem)",
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
        fontSize: "clamp(1rem, 3.2vw, 1.6rem)",
        lineHeight: 1,
        marginTop: "1px",
        textShadow:
          "1.5px 1.5px 0 #4d2a75,-1.5px -1.5px 0 #4d2a75,1.5px -1.5px 0 #4d2a75,-1.5px 1.5px 0 #4d2a75,0px 4px 0 #4d2a75",
      }}
    >
      MasterS
    </span>
  </Link>
);

const Navbar = () => {
  const navLinks = [
    { name: "HOME", href: "#", active: true },
    { name: "HOW TO PLAY", href: "#" },
    { name: "BUY & SELL", href: "#" },
    { name: "CONTACT", href: "#" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-16 py-3 sm:py-4">
      <NavLogo />
      <div className="flex items-center gap-3 sm:gap-6 lg:gap-10">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "font-black uppercase tracking-tight transition-colors whitespace-nowrap",
              link.active
                ? "text-accent-yellow"
                : "text-white hover:text-accent-yellow",
            )}
            style={{ fontSize: "clamp(0.58rem, 2vw, 1rem)" }}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
