"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const cardBase = {
  background: "white",
  overflow: "hidden",
  position: "relative",
  userSelect: "none",
  flexShrink: 0,
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  border: "1.5px solid #e5e7eb",
};

const AceCard = () => (
  <div
    style={{
      ...cardBase,
      width: "clamp(130px, 34vw, 165px)",
      height: "clamp(170px, 44vw, 215px)",
      borderRadius: "clamp(10px, 2.2vw, 14px)",
    }}
  >
    <span
      style={{
        position: "absolute",
        top: "5%",
        left: "8%",
        fontSize: "clamp(18px, 4.6vw, 24px)",
        color: "#ef4444",
        fontWeight: 900,
        lineHeight: 1,
      }}
    >
      A
    </span>
    <span
      style={{
        position: "absolute",
        top: "20%",
        left: "8%",
        fontSize: "clamp(11px, 2.8vw, 14px)",
        color: "#ef4444",
        lineHeight: 1,
      }}
    >
      ♦
    </span>
    <div
      style={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ fontSize: "clamp(50px, 13vw, 68px)", color: "#ef4444" }}>
        ♦
      </span>
    </div>
    <span
      style={{
        position: "absolute",
        bottom: "5%",
        right: "8%",
        fontSize: "clamp(18px, 4.6vw, 24px)",
        color: "#ef4444",
        fontWeight: 900,
        lineHeight: 1,
        transform: "rotate(180deg)",
      }}
    >
      A
    </span>
  </div>
);

const JackCard = () => (
  <div
    style={{
      ...cardBase,
      width: "clamp(130px, 34vw, 165px)",
      height: "clamp(170px, 44vw, 215px)",
      borderRadius: "clamp(10px, 2.2vw, 14px)",
    }}
  >
    <span
      style={{
        position: "absolute",
        top: "5%",
        left: "8%",
        fontSize: "clamp(18px, 4.6vw, 24px)",
        color: "#111",
        fontWeight: 900,
        lineHeight: 1,
        zIndex: 10,
      }}
    >
      J
    </span>
    <span
      style={{
        position: "absolute",
        top: "20%",
        left: "8%",
        fontSize: "clamp(11px, 2.8vw, 14px)",
        color: "#111",
        lineHeight: 1,
        zIndex: 10,
      }}
    >
      ♠
    </span>
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: "12%",
        right: "12%",
        height: "80%",
        background: "linear-gradient(180deg,#2060c8 0%,#1a4da8 100%)",
        borderRadius: "9999px 9999px 0 0",
        border: "2px solid #1540a0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "28%",
          background: "#12308a",
          borderRadius: "9999px 9999px 0 0",
          borderBottom: "2px solid #0d2470",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "1.5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "36%",
          height: "8%",
          background: "#f0c000",
          borderRadius: "2px 2px 0 0",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "56%",
          height: "30%",
          background: "#d4956a",
          borderRadius: "9999px",
          border: "2px solid #b5724a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "6%",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "14%",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "16%",
              aspectRatio: "1",
              background: "#1a1a1a",
              borderRadius: "9999px 9999px 50% 50%",
            }}
          />
          <div
            style={{
              width: "16%",
              aspectRatio: "1",
              background: "#1a1a1a",
              borderRadius: "9999px 9999px 50% 50%",
            }}
          />
        </div>
        <div
          style={{
            width: "36%",
            height: "12%",
            background: "#a05030",
            borderRadius: 9999,
          }}
        />
      </div>
    </div>
    <span
      style={{
        position: "absolute",
        bottom: "5%",
        right: "8%",
        fontSize: "clamp(18px, 4.6vw, 24px)",
        color: "#111",
        fontWeight: 900,
        lineHeight: 1,
        transform: "rotate(180deg)",
      }}
    >
      J
    </span>
  </div>
);

const QueenCard = () => (
  <div
    style={{
      ...cardBase,
      width: "clamp(150px, 40vw, 185px)",
      height: "clamp(196px, 52vw, 240px)",
      borderRadius: "clamp(10px, 2.2vw, 14px)",
    }}
  >
    <span
      style={{
        position: "absolute",
        top: "4%",
        left: "7%",
        fontSize: "clamp(18px, 4.6vw, 24px)",
        color: "#ef4444",
        fontWeight: 900,
        lineHeight: 1,
        zIndex: 10,
      }}
    >
      Q
    </span>
    <span
      style={{
        position: "absolute",
        top: "17%",
        left: "7%",
        fontSize: "clamp(11px, 2.8vw, 14px)",
        color: "#ef4444",
        lineHeight: 1,
        zIndex: 10,
      }}
    >
      ♦
    </span>
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: "10%",
        right: "10%",
        height: "82%",
        background: "linear-gradient(180deg,#d9592c 0%,#c04422 100%)",
        borderRadius: "9999px 9999px 0 0",
        border: "2px solid #a03518",
        overflow: "visible",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "20%",
          background: "#f0c000",
          borderBottom: "2px solid #c09000",
          overflow: "visible",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-evenly",
          padding: "0 8%",
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderBottom: "11px solid #f0c000",
            marginTop: "-11px",
          }}
        />
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderBottom: "14px solid #f0c000",
            marginTop: "-14px",
          }}
        />
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderBottom: "11px solid #f0c000",
            marginTop: "-11px",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: "-3%",
          top: "16%",
          width: "21%",
          height: "50%",
          background: "#f5c800",
          borderRadius: "0 0 9999px 9999px",
          border: "1.5px solid #c09000",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "-3%",
          top: "16%",
          width: "21%",
          height: "50%",
          background: "#f5c800",
          borderRadius: "0 0 9999px 9999px",
          border: "1.5px solid #c09000",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "21%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "54%",
          height: "30%",
          background: "#f5c9a0",
          borderRadius: "9999px",
          border: "2px solid #d4936a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "5%",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "14%",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "12%",
              aspectRatio: "1",
              background: "#333",
              borderRadius: "9999px",
            }}
          />
          <div
            style={{
              width: "12%",
              aspectRatio: "1",
              background: "#333",
              borderRadius: "9999px",
            }}
          />
        </div>
        <div
          style={{
            width: "30%",
            height: "10%",
            borderBottom: "2.5px solid #e87474",
            borderRadius: 9999,
          }}
        />
      </div>
    </div>
    <span
      style={{
        position: "absolute",
        bottom: "3.5%",
        right: "7%",
        fontSize: "clamp(18px, 4.6vw, 24px)",
        color: "#ef4444",
        fontWeight: 900,
        lineHeight: 1,
        transform: "rotate(180deg)",
      }}
    >
      Q
    </span>
  </div>
);

const KingCard = () => (
  <div
    style={{
      ...cardBase,
      width: "clamp(150px, 40vw, 185px)",
      height: "clamp(196px, 52vw, 240px)",
      borderRadius: "clamp(10px, 2.2vw, 14px)",
    }}
  >
    <span
      style={{
        position: "absolute",
        top: "4%",
        left: "7%",
        fontSize: "clamp(18px, 4.6vw, 24px)",
        color: "#ef4444",
        fontWeight: 900,
        lineHeight: 1,
        zIndex: 10,
      }}
    >
      K
    </span>
    <span
      style={{
        position: "absolute",
        top: "17%",
        left: "7%",
        fontSize: "clamp(11px, 2.8vw, 14px)",
        color: "#ef4444",
        lineHeight: 1,
        zIndex: 10,
      }}
    >
      ♥
    </span>
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: "10%",
        right: "10%",
        height: "82%",
        background: "linear-gradient(180deg,#cc2020 0%,#a81818 100%)",
        borderRadius: "9999px 9999px 0 0",
        border: "2px solid #901010",
        overflow: "visible",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "20%",
          background: "#f0c000",
          borderBottom: "2px solid #c09000",
          overflow: "visible",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-evenly",
          padding: "0 8%",
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderBottom: "11px solid #f0c000",
            marginTop: "-11px",
          }}
        />
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderBottom: "14px solid #f0c000",
            marginTop: "-14px",
          }}
        />
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderBottom: "11px solid #f0c000",
            marginTop: "-11px",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "54%",
          height: "28%",
          background: "#f5c9a0",
          borderRadius: "9999px",
          border: "2px solid #d4936a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "5%",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12%",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "14%",
              aspectRatio: "4/3",
              background: "#1a1a1a",
              borderRadius: "9999px 9999px 50% 50%",
            }}
          />
          <div
            style={{
              width: "14%",
              aspectRatio: "4/3",
              background: "#1a1a1a",
              borderRadius: "9999px 9999px 50% 50%",
            }}
          />
        </div>
        <div
          style={{
            width: "48%",
            height: "14%",
            background: "#5c2a1a",
            borderRadius: 9999,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "clamp(10px, 2.5vw, 14px)",
          color: "rgba(255,255,255,0.35)",
        }}
      >
        ♥
      </div>
    </div>
    <span
      style={{
        position: "absolute",
        bottom: "3.5%",
        right: "7%",
        fontSize: "clamp(18px, 4.6vw, 24px)",
        color: "#ef4444",
        fontWeight: 900,
        lineHeight: 1,
        transform: "rotate(180deg)",
      }}
    >
      K
    </span>
  </div>
);

const HeroLogo = () => (
  <div
    className="flex flex-col items-center select-none"
    style={{ lineHeight: 0.88 }}
  >
    <span
      className="font-black uppercase italic text-accent-yellow text-3d-thulla block"
      style={{
        fontSize: "clamp(3.5rem, 17vw, 11rem)",
        letterSpacing: "-0.03em",
      }}
    >
      THULLA
    </span>
    <span
      className="font-black italic text-[#d9cff5] text-3d-masters block"
      style={{
        fontSize: "clamp(2.8rem, 14vw, 9rem)",
        letterSpacing: "-0.02em",
        marginTop: "-6px",
      }}
    >
      MasterS
    </span>
  </div>
);

const Hero = () => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    if (downloading) return;
    setDownloading(true);

    try {
      const link = document.createElement("a");
      link.href = "/thulla-masters.apk";
      link.download = "ThullaMasters.apk";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      console.error("Download failed");
    } finally {
      setTimeout(() => setDownloading(false), 2000);
    }
  };

  return (
    <>
      <section id="home" className="relative z-10 overflow-x-hidden">
        <div
          className="relative w-full mx-auto"
          style={{
            maxWidth: "min(96%, 700px)",
            minHeight: "clamp(560px, 145vw, 820px)",
            paddingTop: "clamp(72px, 18vw, 110px)",
            paddingBottom: "clamp(40px, 8vw, 80px)",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <motion.div
            className="absolute z-0"
            style={{ top: "5%", left: "-4%" }}
            initial={{ rotate: -28 }}
            animate={{ y: [0, -10, 0], rotate: [-28, -22, -28] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <AceCard />
          </motion.div>

          <motion.div
            className="absolute z-0"
            style={{ top: "4%", right: "-4%" }}
            initial={{ rotate: 18 }}
            animate={{ y: [0, 14, 0], rotate: [18, 24, 18] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <JackCard />
          </motion.div>

          <motion.div
            className="absolute z-0"
            style={{ top: "42%", left: "-6%" }}
            initial={{ rotate: -18 }}
            animate={{ x: [0, 6, 0], y: [0, -8, 0], rotate: [-18, -12, -18] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <QueenCard />
          </motion.div>

          <motion.div
            className="absolute z-0"
            style={{ top: "46%", right: "-6%" }}
            initial={{ rotate: 22 }}
            animate={{ scale: [1, 1.04, 1], rotate: [22, 28, 22] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <KingCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 flex flex-col items-center text-center w-full"
          >
            <HeroLogo />

            <div
              className="mt-5 mb-7 space-y-1.5"
              style={{ maxWidth: "min(88%, 420px)" }}
            >
              {[
                "Think you can hold the ace and still get away?",
                "Can you avoid being the Bhabhi?",
                "Thulla Expert? Let\u2019s challenge your skills!",
              ].map((line) => (
                <p
                  key={line}
                  className="font-bold text-white drop-shadow tracking-wide"
                  style={{ fontSize: "clamp(0.85rem, 3vw, 1.2rem)" }}
                >
                  {line}
                </p>
              ))}
            </div>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="btn-primary-purple"
              style={{
                width: "clamp(220px, 58vw, 310px)",
                opacity: downloading ? 0.75 : 1,
                transition: "opacity 0.2s",
              }}
            >
              {downloading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin"
                    style={{
                      width: "clamp(14px, 3vw, 18px)",
                      height: "clamp(14px, 3vw, 18px)",
                    }}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeOpacity="0.3"
                    />
                    <path
                      d="M12 2a10 10 0 0 1 10 10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  DOWNLOADING…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg
                    style={{
                      width: "clamp(14px, 3vw, 18px)",
                      height: "clamp(14px, 3vw, 18px)",
                    }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  DOWNLOAD
                </span>
              )}
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
