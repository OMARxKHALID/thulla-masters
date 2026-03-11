"use client";

import React from "react";
import { cn } from "@/lib/utils";

const SocialIcon = ({ href, label, children }) => (
  <a href={href} aria-label={label} className="text-white hover:text-accent-yellow transition-colors p-1 sm:p-1.5 lg:p-2">
    {children}
  </a>
);

const FooterLogo = () => (
  <div className="flex flex-col items-center select-none" style={{ lineHeight: 0.88 }}>
    <span
      className="font-black uppercase italic text-accent-yellow text-3d-thulla text-[1.5rem] sm:text-[2.2rem] lg:text-[3.2rem]"
      style={{ letterSpacing: "-0.03em" }}
    >
      THULLA
    </span>
    <span
      className="font-black italic text-[#d9cff5] text-3d-masters text-[1.2rem] sm:text-[1.8rem] lg:text-[2.6rem]"
      style={{ letterSpacing: "-0.02em" }}
    >
      MasterS
    </span>
  </div>
);

const CardCharacter = ({ side, bodyColor, bodyBorder, crownColor, crownBorder, suit, suitColor }) => {
  const isLeft = side === "left";

  return (
    <div className="char-wrap absolute bottom-0 z-20 pointer-events-none overflow-hidden" style={{ [isLeft ? "left" : "right"]: 0 }}>
      <div className="relative flex flex-col items-center pt-7 sm:pt-10 lg:pt-16">
        {/* Crown */}
        <div
          className="char-crown relative z-30 flex-shrink-0"
          style={{ width: "52%", background: crownColor, borderRadius: "0 0 5px 5px", borderBottom: `3px solid ${crownBorder}` }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: i === 1 ? -11 : -8,
                left:       i === 0 ? 5   : i === 1 ? "50%" : undefined,
                right:      i === 2 ? 5   : undefined,
                transform:  i === 1 ? "translateX(-50%)" : undefined,
                width: 0, height: 0,
                borderLeft:   `${i === 1 ? 6 : 5}px solid transparent`,
                borderRight:  `${i === 1 ? 6 : 5}px solid transparent`,
                borderBottom: `${i === 1 ? 13 : 10}px solid ${crownColor}`,
              }}
            />
          ))}
        </div>

        {/* Body */}
        <div
          className="char-body relative flex flex-col items-center overflow-hidden flex-shrink-0"
          style={{
            width: "100%",
            background: bodyColor,
            borderRadius: "9999px 9999px 0 0",
            borderTop:   `5px solid ${bodyBorder}`,
            borderLeft:  `5px solid ${bodyBorder}`,
            borderRight: `5px solid ${bodyBorder}`,
          }}
        >
          {/* Arms (left character only) */}
          {isLeft && (
            <>
              <div style={{ position: "absolute", left: 0, top: "2%", width: "24%", height: "65%", background: "#eba817", borderRadius: "0 0 9999px 9999px", border: "2px solid #b5800f" }} />
              <div style={{ position: "absolute", right: 0, top: "2%", width: "24%", height: "65%", background: "#eba817", borderRadius: "0 0 9999px 9999px", border: "2px solid #b5800f" }} />
            </>
          )}

          {/* Face */}
          <div
            className="char-face z-10 flex flex-col items-center justify-center flex-shrink-0"
            style={{ background: "#fcd4b6", borderRadius: "9999px", border: "2px solid #de9f74" }}
          >
            {isLeft ? (
              <>
                <div style={{ display: "flex", gap: 4, marginBottom: 2 }}>
                  <div className="char-eye" style={{ background: "#222", borderRadius: "9999px" }} />
                  <div className="char-eye" style={{ background: "#222", borderRadius: "9999px" }} />
                </div>
                <div className="char-mouth" style={{ borderBottom: "2px solid #e87474", borderRadius: "9999px" }} />
              </>
            ) : (
              <>
                <div style={{ display: "flex", gap: 4, marginBottom: 3 }}>
                  <div className="char-brow" style={{ background: "#222", borderRadius: "9999px" }} />
                  <div className="char-brow" style={{ background: "#222", borderRadius: "9999px" }} />
                </div>
                <div className="char-beard" style={{ background: crownColor, borderRadius: "9999px" }} />
              </>
            )}
          </div>

          {/* Suit badge */}
          <div
            className="char-suit z-20 flex items-center justify-center rounded-full bg-white flex-shrink-0"
            style={{ border: isLeft ? "2px solid #c00" : "4px solid #000" }}
          >
            <span style={{ color: suitColor, marginTop: isLeft ? 0 : "-3px" }}>{suit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SOCIALS = [
  {
    label: "Facebook",
    href: "#",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>,
  },
  {
    label: "WhatsApp",
    href: "#",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>,
  },
  {
    label: "TikTok",
    href: "#",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.72a4.85 4.85 0 01-1-.03z" /></svg>,
  },
  {
    label: "Instagram",
    href: "#",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="social-icon"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
  },
  {
    label: "Email",
    href: "#",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="social-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  },
];

const Footer = ({ className }) => (
  <footer
    id="contact"
    className={cn("relative w-full min-h-[220px] sm:min-h-[340px] lg:min-h-[500px] pt-7 sm:pt-12 lg:pt-24", className)}
  >
    {/* Dark arc background */}
    <div
      className="absolute bottom-0 left-0 right-0 z-0"
      style={{
        top: "clamp(20px, 5vw, 44px)",
        background: "linear-gradient(180deg, #0d3b9e 0%, #0a2e82 100%)",
        borderRadius: "50% 50% 0 0 / 25% 25% 0 0",
      }}
    />

    <CardCharacter side="left"  bodyColor="#d32724" bodyBorder="#a11918" crownColor="#fecb00" crownBorder="#b5900f" suit="♥" suitColor="#e53e3e" />
    <CardCharacter side="right" bodyColor="#e19d53" bodyBorder="#a0682b" crownColor="#499d45" crownBorder="#2b6528" suit="♣" suitColor="#111" />

    <div className="relative z-30 flex flex-col items-center gap-3 sm:gap-4 lg:gap-5 pb-4 sm:pb-6 lg:pb-8 pt-3 sm:pt-5 lg:pt-6">
      <div className="flex items-center justify-center gap-3.5 sm:gap-5 lg:gap-7">
        {SOCIALS.map((s) => (
          <SocialIcon key={s.label} href={s.href} label={s.label}>
            {s.svg}
          </SocialIcon>
        ))}
      </div>
      <FooterLogo />
      <p className="text-white font-bold uppercase tracking-widest text-[0.5rem] sm:text-[0.65rem] lg:text-[0.82rem]">
        ALL RIGHTS RESERVED 2026
      </p>
    </div>
  </footer>
);

export default Footer;
