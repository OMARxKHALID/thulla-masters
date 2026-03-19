"use client";

import { useEffect, useRef } from "react";
import { useSpring, useTransform } from "framer-motion";

export default function RollingNumber({ value, precision = 0, refreshTrigger = false }) {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => 
    current.toLocaleString(undefined, { 
      minimumFractionDigits: precision, 
      maximumFractionDigits: precision 
    })
  );

  useEffect(() => {
    if (refreshTrigger) {
      spring.set(0, false);
    }
    spring.set(value);
  }, [value, refreshTrigger, spring]);

  const displayRef = useRef(null);

  useEffect(() => {
    const unsubscribe = display.on("change", (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = latest;
      }
    });
    return () => unsubscribe();
  }, [display]);

  return <span ref={displayRef}>{value.toLocaleString(undefined, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  })}</span>;
}
