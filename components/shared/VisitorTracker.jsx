"use client";

import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("thulla_visit_logged");
    
    if (!hasVisited) {
      const logVisit = async () => {
        try {
          const referrer = document.referrer || "Direct";
          await fetch(`/api/visit?t=${Date.now()}`, { 
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
            },
            body: JSON.stringify({ referrer })
          });
          sessionStorage.setItem("thulla_visit_logged", "true");
        } catch (err) {
        }
      };
      
      logVisit();
    }
  }, []);

  return null;
}
