import { NAV_LINKS, VENUE } from "@/data/site";
import Ornament from "./ui/Ornament";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-maroon-deep py-14 text-center text-ivory/75">
      <p className="font-display text-4xl font-semibold text-gold-light">{VENUE.name}</p>
      <p className="mt-1">{VENUE.tagline}</p>
      <Ornament className="my-6" />
      <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2">
        {NAV_LINKS.map((l) => (
          <li key={l.href}><a href={l.href} className="transition hover:text-gold-light">{l.label}</a></li>
        ))}
      </ul>
       <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        <li><Link href="/privacy-policy" className="transition hover:text-gold-light">Privacy Policy</Link></li>
        <li><Link href="/terms-and-conditions" className="transition hover:text-gold-light">Terms &amp; Conditions</Link></li>
      </ul>
      <p className="mt-8 text-sm text-ivory/50">© {new Date().getFullYear()} {VENUE.name}. All rights reserved.</p>
    </footer>
  );
}
