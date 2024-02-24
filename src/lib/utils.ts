import { type ClassValue, clsx } from "clsx";
import { TContinentCode } from "countries-list";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toKebabCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, '-')
    .toLowerCase()
}

export function toTitleCase(str: string) {
  return str
    .split('-')
    .map(word => {
      return word.slice(0, 1).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

export function getContinentName(continentCode: TContinentCode) {
  switch (continentCode) {
    case "AF":
      return "Africa";
    case "AN":
      return "Antarctica";
    case "AS":
      return "Asia";
    case "EU":
      return "Europe";
    case "NA":
      return "North America";
    case "OC":
      return "Oceania";
    case "SA":
      return "South America";
    default:
      throw new Error("Invalid continent code");
  }
}
