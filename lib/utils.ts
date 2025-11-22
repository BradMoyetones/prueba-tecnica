import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utilidad para transformar la hora actual en del aeropuerto
export function getLocalTime(timezone: string) {
  try {
    return new Intl.DateTimeFormat("es-CO", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(new Date());
  } catch (error) {
    console.log(error);
    
    return "N/A";
  }
}
