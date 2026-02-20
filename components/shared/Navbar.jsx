"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const navLinks = [
    { name: "HOME", href: "#", active: true },
    { name: "HOW TO PLAY", href: "#" },
    { name: "BUY & SELL", href: "#" },
    { name: "CONTACT", href: "#" },
  ];

  const logoShadow =
    "0 1px 0 #533483, 0 2px 0 #533483, 0 3px 0 #533483, 0 4px 5px rgba(0,0,0,0.4)";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 bg-transparent">
      <div className="flex items-center">
        <Link
          href="/"
          className="flex flex-col items-center leading-[0.7] italic font-black select-none group"
        >
          <span
            className="text-2xl text-[#fecb00] uppercase tracking-tighter"
            style={{ textShadow: logoShadow }}
          >
            THULLA
          </span>
          <span
            className="text-xl text-white uppercase tracking-tighter mt-0.5"
            style={{ textShadow: logoShadow }}
          >
            MASTERS
          </span>
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-10">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "text-sm font-black transition-all hover:text-accent-yellow tracking-tight",
              link.active ? "text-accent-yellow" : "text-white",
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M4 6h16M4 12h16m-16 6h16"
          />
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;
