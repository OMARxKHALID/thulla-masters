import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatLocation(code) {
  if (!code) return "Unknown";
  if (code === "Local") return "Localhost";
  if (code === "Unknown") return "Hidden Location";
  
  try {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return regionNames.of(code) || code;
  } catch (error) {
    return code;
  }
}
