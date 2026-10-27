import {
  Allura,
  Great_Vibes,
  Cormorant_Garamond,
  Mukta,
} from "next/font/google";

export const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const body = Mukta({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});