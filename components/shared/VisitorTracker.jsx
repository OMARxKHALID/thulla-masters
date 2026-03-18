"use client";

import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    // Only track visitors if they haven't been tracked yet in the current session
    const hasVisited = sessionStorage.getItem("thulla_visit_logged");
    
    if (!hasVisited) {
      const logVisit = async () => {
        try {
          await fetch(`/api/visit?t=${Date.now()}`, { 
            method: "POST",
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache'
            }
          });
          sessionStorage.setItem("thulla_visit_logged", "true");
        } catch (err) {
          // silent fail
        }
      };
      
      logVisit();
    }
  }, []);

  return null;
}
