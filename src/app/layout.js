import { Alex_Brush, Great_Vibes, Cormorant_Garamond, Mukta } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/data/site";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const alexBrush = Alex_Brush({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-cursive',
  display: 'swap',
});
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Mukta({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Palki Garden | Wedding & Event Venue",
    template: "%s | Palki Garden",
  },

  description:
    "Celebrate weddings, family gatherings and special occasions at Palki Garden. Explore our air-conditioned event hall, guest rooms and event facilities.",

  applicationName: "Palki Garden",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Palki Garden | Wedding & Event Venue",
    description:
      "A welcoming venue for weddings, family celebrations and special occasions, with an air-conditioned event hall and guest accommodation.",
    url: "/",
    siteName: "Palki Garden",
    locale: "en_IN",
    type: "website",
      images: [
    {
      url: "/images/palki-garden-og.jpg",
      width: 1200,
      height: 630,
      alt: "Palki Garden — wedding and event venue",
    },
  ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Palki Garden | Wedding & Event Venue",
    description:
      "Discover Palki Garden for weddings, family gatherings and special celebrations.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${greatVibes.variable} ${alexBrush.variable}`}>
      <body>{children}</body>
    </html>
  );
}