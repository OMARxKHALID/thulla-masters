"use client";

import React from "react";
import { motion } from "framer-motion";

const cardBase = {
  background: "white",
  overflow: "hidden",
  position: "relative",
  userSelect: "none",
  flexShrink: 0,
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  border: "1px solid #e5e7eb",
};

const AceCard = () => (
  <div
    style={{
      ...cardBase,
      width: "clamp(78px, 11vw, 200px)",
      height: "clamp(102px, 14.3vw, 260px)",
      borderRadius: "clamp(8px, 1.1vw, 18px)",
    }}
  >
    <span
      style={{
        position: "absolute",
        top: "4.5%",
        left: "8%",
        fontSize: "clamp(15px, 2.1vw, 40px)",
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
        top: "19%",
        left: "8%",
        fontSize: "clamp(9px, 1.3vw, 24px)",
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
      <span style={{ fontSize: "clamp(38px, 5.5vw, 100px)", color: "#ef4444" }}>
        ♦
      </span>
    </div>
    <span
      style={{
        position: "absolute",
        bottom: "4.5%",
        right: "8%",
        fontSize: "clamp(15px, 2.1vw, 40px)",
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
      width: "clamp(78px, 11vw, 200px)",
      height: "clamp(102px, 14.3vw, 260px)",
      borderRadius: "clamp(8px, 1.1vw, 18px)",
    }}
  >
    <span
      style={{
        position: "absolute",
        top: "4.5%",
        left: "8%",
        fontSize: "clamp(15px, 2.1vw, 40px)",
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
        top: "19%",
        left: "8%",
        fontSize: "clamp(9px, 1.3vw, 24px)",
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
        bottom: "4.5%",
        right: "8%",
        fontSize: "clamp(15px, 2.1vw, 40px)",
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
      width: "clamp(92px, 13vw, 230px)",
      height: "clamp(118px, 16.7vw, 295px)",
      borderRadius: "clamp(8px, 1.1vw, 18px)",
    }}
  >
    <span
      style={{
        position: "absolute",
        top: "4%",
        left: "7%",
        fontSize: "clamp(15px, 2.1vw, 40px)",
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
        fontSize: "clamp(9px, 1.3vw, 24px)",
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
        overflow: "hidden",
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
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-evenly",
          padding: "0 5%",
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderBottom: "9px solid #f0c000",
            marginTop: "-9px",
          }}
        />
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderBottom: "12px solid #f0c000",
            marginTop: "-12px",
          }}
        />
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderBottom: "9px solid #f0c000",
            marginTop: "-9px",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: "-1%",
          top: "17%",
          width: "20%",
          height: "48%",
          background: "#f0c000",
          borderRadius: "0 0 9999px 9999px",
          border: "1px solid #c09000",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "-1%",
          top: "17%",
          width: "20%",
          height: "48%",
          background: "#f0c000",
          borderRadius: "0 0 9999px 9999px",
          border: "1px solid #c09000",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "52%",
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
            width: "32%",
            height: "10%",
            borderBottom: "2px solid #e87474",
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
        fontSize: "clamp(15px, 2.1vw, 40px)",
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
      width: "clamp(92px, 13vw, 230px)",
      height: "clamp(118px, 16.7vw, 295px)",
      borderRadius: "clamp(8px, 1.1vw, 18px)",
    }}
  >
    <span
      style={{
        position: "absolute",
        top: "4%",
        left: "7%",
        fontSize: "clamp(15px, 2.1vw, 40px)",
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
        fontSize: "clamp(9px, 1.3vw, 24px)",
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
        overflow: "hidden",
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
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-evenly",
          padding: "0 5%",
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderBottom: "9px solid #f0c000",
            marginTop: "-9px",
          }}
        />
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderBottom: "12px solid #f0c000",
            marginTop: "-12px",
          }}
        />
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderBottom: "9px solid #f0c000",
            marginTop: "-9px",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "52%",
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
            width: "46%",
            height: "13%",
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
          fontSize: "clamp(8px, 1.2vw, 18px)",
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
        fontSize: "clamp(15px, 2.1vw, 40px)",
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
        fontSize: "clamp(3.5rem, 17vw, 9rem)",
        letterSpacing: "-0.03em",
      }}
    >
      THULLA
    </span>
    <span
      className="font-black italic text-[#d9cff5] text-3d-masters block"
      style={{
        fontSize: "clamp(2.8rem, 14vw, 7.5rem)",
        letterSpacing: "-0.02em",
        marginTop: "-6px",
      }}
    >
      MasterS
    </span>
  </div>
);

const Hero = () => (
  <section className="relative flex flex-col items-center pt-[4.5rem] sm:pt-[5.5rem] lg:pt-[7rem] pb-10 sm:pb-16 lg:pb-28 px-4 overflow-hidden text-center z-10">
    <motion.div
      className="absolute z-0"
      style={{ top: "8%", left: "2%" }}
      initial={{ rotate: -28 }}
      animate={{ y: [0, -10, 0], rotate: [-28, -22, -28] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <AceCard />
    </motion.div>

    <motion.div
      className="absolute z-0"
      style={{ top: "7%", right: "2%" }}
      initial={{ rotate: 18 }}
      animate={{ y: [0, 14, 0], rotate: [18, 24, 18] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <JackCard />
    </motion.div>

    <motion.div
      className="absolute z-0"
      style={{ top: "36%", left: "-1%" }}
      initial={{ rotate: -18 }}
      animate={{ x: [0, 6, 0], y: [0, -8, 0], rotate: [-18, -12, -18] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <QueenCard />
    </motion.div>

    <motion.div
      className="absolute z-0"
      style={{ top: "40%", right: "-1%" }}
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
      className="relative z-10 flex flex-col items-center px-2 mt-4 sm:mt-8 lg:mt-10 w-full"
      style={{ maxWidth: "min(88%, 620px)" }}
    >
      <HeroLogo />

      <div
        className="mt-5 mb-7 space-y-1.5"
        style={{ maxWidth: "min(90%, 440px)" }}
      >
        {[
          "Think you can hold the ace and still get away?",
          "Can you avoid being the Bhabhi?",
          "Thulla Expert? Let\u2019s challenge your skills!",
        ].map((line) => (
          <p
            key={line}
            className="font-bold text-white drop-shadow tracking-wide"
            style={{ fontSize: "clamp(0.82rem, 3vw, 1.15rem)" }}
          >
            {line}
          </p>
        ))}
      </div>

      <button
        className="btn-primary-purple"
        style={{
          width: "clamp(160px, 45vw, 280px)",
          paddingTop: "0.9rem",
          paddingBottom: "0.9rem",
        }}
      >
        DOWNLOAD
      </button>
    </motion.div>
  </section>
);

export default Hero;
