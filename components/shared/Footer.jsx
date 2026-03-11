"use client";

import React from "react";

const SocialIcon = ({ href, label, children }) => (
  <a
    href={href}
    aria-label={label}
    className="text-white hover:text-accent-yellow transition-colors"
    style={{ padding: "4px" }}
  >
    {children}
  </a>
);

const FooterLogo = () => (
  <div
    className="flex flex-col items-center select-none"
    style={{ lineHeight: 0.88 }}
  >
    <span
      className="font-black uppercase italic text-accent-yellow text-3d-thulla"
      style={{
        fontSize: "clamp(1.5rem, 6vw, 2.4rem)",
        letterSpacing: "-0.03em",
      }}
    >
      THULLA
    </span>
    <span
      className="font-black italic text-[#d9cff5] text-3d-masters"
      style={{ fontSize: "clamp(1.2rem, 5vw, 2rem)", letterSpacing: "-0.02em" }}
    >
      MasterS
    </span>
  </div>
);

const CardCharacter = ({
  side,
  bodyColor,
  bodyBorder,
  crownColor,
  crownBorder,
  suit,
  suitColor,
}) => {
  const W = "clamp(110px, 30vw, 185px)";
  const isLeft = side === "left";

  return (
    <div
      className="absolute bottom-0 z-20 pointer-events-none overflow-hidden"
      style={{ width: W, [isLeft ? "left" : "right"]: 0 }}
    >
      <div
        className="relative flex flex-col items-center"
        style={{ paddingTop: "clamp(28px, 8vw, 50px)" }}
      >
        <div
          className="relative z-30 flex-shrink-0"
          style={{
            width: "52%",
            height: "clamp(18px, 5vw, 30px)",
            background: crownColor,
            borderRadius: "0 0 5px 5px",
            borderBottom: `3px solid ${crownBorder}`,
          }}
        >
          {[5, "50%", "calc(100% - 10px)"].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top:
                  i === 1
                    ? "clamp(-11px,-3vw,-7px)"
                    : "clamp(-8px,-2.2vw,-5px)",
                left: i === 2 ? undefined : i === 0 ? 5 : "50%",
                right: i === 2 ? 5 : undefined,
                transform: i === 1 ? "translateX(-50%)" : undefined,
                width: 0,
                height: 0,
                borderLeft: `${i === 1 ? 6 : 5}px solid transparent`,
                borderRight: `${i === 1 ? 6 : 5}px solid transparent`,
                borderBottom: `${i === 1 ? "clamp(11px,3vw,15px)" : "clamp(8px,2.2vw,12px)"} solid ${crownColor}`,
              }}
            />
          ))}
        </div>

        <div
          className="relative flex flex-col items-center overflow-hidden flex-shrink-0"
          style={{
            width: "100%",
            height: "clamp(165px, 45vw, 260px)",
            background: bodyColor,
            borderRadius: "9999px 9999px 0 0",
            borderTop: `clamp(4px, 1vw, 7px) solid ${bodyBorder}`,
            borderLeft: `clamp(4px, 1vw, 7px) solid ${bodyBorder}`,
            borderRight: `clamp(4px, 1vw, 7px) solid ${bodyBorder}`,
          }}
        >
          {isLeft && (
            <>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "2%",
                  width: "24%",
                  height: "65%",
                  background: "#eba817",
                  borderRadius: "0 0 9999px 9999px",
                  border: "2px solid #b5800f",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "2%",
                  width: "24%",
                  height: "65%",
                  background: "#eba817",
                  borderRadius: "0 0 9999px 9999px",
                  border: "2px solid #b5800f",
                }}
              />
            </>
          )}

          <div
            className="z-10 flex flex-col items-center justify-center flex-shrink-0"
            style={{
              width: "clamp(38px, 10vw, 58px)",
              height: "clamp(38px, 10vw, 58px)",
              background: "#fcd4b6",
              borderRadius: "9999px",
              border: "2px solid #de9f74",
              marginTop: "clamp(12px, 3.5vw, 22px)",
            }}
          >
            {isLeft ? (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: "clamp(3px,1vw,5px)",
                    marginBottom: 2,
                  }}
                >
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      background: "#222",
                      borderRadius: "9999px",
                    }}
                  />
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      background: "#222",
                      borderRadius: "9999px",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: 12,
                    height: 2,
                    borderBottom: "2px solid #e87474",
                    borderRadius: "9999px",
                  }}
                />
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: "clamp(3px,1vw,6px)",
                    marginBottom: 3,
                  }}
                >
                  <div
                    style={{
                      width: "clamp(7px,2vw,11px)",
                      height: "clamp(2px,0.6vw,3px)",
                      background: "#222",
                      borderRadius: "9999px",
                    }}
                  />
                  <div
                    style={{
                      width: "clamp(7px,2vw,11px)",
                      height: "clamp(2px,0.6vw,3px)",
                      background: "#222",
                      borderRadius: "9999px",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "clamp(16px,4.5vw,24px)",
                    height: "clamp(5px,1.5vw,8px)",
                    background: crownColor,
                    borderRadius: "9999px",
                  }}
                />
              </>
            )}
          </div>

          <div
            className="z-20 flex items-center justify-center rounded-full bg-white flex-shrink-0"
            style={{
              width: "clamp(16px, 5vw, 28px)",
              height: "clamp(16px, 5vw, 28px)",
              marginTop: "clamp(4px, 1.2vw, 8px)",
              border: isLeft ? "2px solid #c00" : "4px solid #000",
            }}
          >
            <span
              style={{
                color: suitColor,
                fontSize: "clamp(0.55rem, 2vw, 0.9rem)",
                marginTop: isLeft ? 0 : "-3px",
              }}
            >
              {suit}
            </span>
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
    svg: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ width: 22, height: 22 }}
      >
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    svg: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ width: 22, height: 22 }}
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    svg: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ width: 22, height: 22 }}
      >
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.72a4.85 4.85 0 01-1-.03z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    svg: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 22, height: 22 }}
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "#",
    svg: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 22, height: 22 }}
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

const Footer = () => (
  <footer
    className="relative w-full overflow-hidden"
    style={{
      paddingTop: "clamp(40px, 10vw, 80px)",
      minHeight: "clamp(220px, 60vw, 370px)",
    }}
  >
    <div
      className="absolute bottom-0 left-0 right-0 z-0"
      style={{
        top: "clamp(20px, 5vw, 40px)",
        background: "linear-gradient(180deg, #0d3b9e 0%, #0a2e82 100%)",
        borderRadius: "50% 50% 0 0 / 25% 25% 0 0",
      }}
    />

    <CardCharacter
      side="left"
      bodyColor="#d32724"
      bodyBorder="#a11918"
      crownColor="#fecb00"
      crownBorder="#b5900f"
      suit="♥"
      suitColor="#e53e3e"
    />

    <CardCharacter
      side="right"
      bodyColor="#e19d53"
      bodyBorder="#a0682b"
      crownColor="#499d45"
      crownBorder="#2b6528"
      suit="♣"
      suitColor="#111"
    />

    <div
      className="relative z-30 flex flex-col items-center gap-4"
      style={{
        paddingBottom: "clamp(16px, 4vw, 28px)",
        paddingTop: "clamp(12px, 3vw, 20px)",
      }}
    >
      <div className="flex items-center justify-center gap-5">
        {SOCIALS.map((s) => (
          <SocialIcon key={s.label} href={s.href} label={s.label}>
            {s.svg}
          </SocialIcon>
        ))}
      </div>

      <FooterLogo />

      <p
        className="text-white font-bold uppercase tracking-widest"
        style={{ fontSize: "clamp(0.5rem, 1.8vw, 0.65rem)" }}
      >
        ALL RIGHTS RESERVED 2026
      </p>
    </div>
  </footer>
);

export default Footer;
