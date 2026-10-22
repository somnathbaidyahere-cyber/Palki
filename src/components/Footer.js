import { NAV_LINKS, VENUE } from "@/data/site";
import Ornament from "./ui/Ornament";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-maroon-deep px-5 sm:px-0 py-14 text-center text-ivory/75">
      <p className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-gold-light">
        {VENUE.name}
      </p>
      <p className="mt-1">{VENUE.tagline}</p>
      <Ornament className="my-6" />
      <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2">
        {NAV_LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="text-sm md:text-base transition hover:text-gold-light">
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs md:text-sm">
        <li>
          <Link
            href="/privacy-policy"
            className="group relative inline-block py-1 transition-colors duration-300 hover:text-gold-light"
          >
            Privacy Policy
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold-light transition-transform duration-300 ease-out group-hover:scale-x-100"
            />
          </Link>
        </li>

        <li>
          <Link
            href="/terms-and-conditions"
            className="group relative inline-block py-1 transition-colors duration-300 hover:text-gold-light"
          >
            Terms &amp; Conditions
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold-light transition-transform duration-300 ease-out group-hover:scale-x-100"
            />
          </Link>
        </li>
      </ul>
      <p className="mt-4 text-sm text-ivory/50">
        © {new Date().getFullYear()} {VENUE.name}. All rights reserved.
      </p>
    </footer>
  );
}
