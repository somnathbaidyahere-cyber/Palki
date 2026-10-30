
import {
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { NAV_LINKS, VENUE } from "@/data/site";
import Ornament from "./ui/Ornament";
import Link from "next/link";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

const CONTACT_LINKS = [
  {
    label: "WhatsApp",
    href: WHATSAPP_NUMBER
      ? `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent("Hi palki Garden, I have a query!")}`
      : null,
    Icon: MessageCircle,
  },
  {
    label: "Email",
    href: VENUE.email ? `mailto:${VENUE.email}` : null,
    Icon: Mail,
  },
  {
    label: "Call",
    href: VENUE.phone
      ? `tel:${VENUE.phone.replace(/[^\d+]/g, "")}`
      : null,
    Icon: Phone,
  },
  {
    label: "Instagram",
    href: VENUE.instagram || null,
    Icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: VENUE.facebook || null,
    Icon: FaFacebookF,
  },
];

export default function Footer() {
  return (
    <footer className="bg-maroon-deep px-5 py-12 text-center text-ivory/75 sm:py-14">
      <a href="/#top" className="flex items-center justify-center gap-2">
          {/* Palki Icon / Illustration */}
          <img
            src="/images/logo/palki.png"
            alt="Palki Garden Logo"
            className="h-7 md:h-8 lg:h-[45px] w-auto object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
          />

          {/* Venue Name Text PNG */}
          <img
            src="/images/logo/logo-txt.png"
            alt={VENUE.name}
            className="h-8 md:h-10 lg:h-[50px] w-auto object-contain mt-1 md:mt-2"
          />
        </a>

      <p className="mt-1 text-xs sm:text-sm md:text-base">{VENUE.tagline}</p>

      {/* Contact and social links */}
      <ul
        aria-label="Contact and social media"
        className="mt-6 flex flex-wrap items-center justify-center gap-3"
      >
        {CONTACT_LINKS.filter((item) => item.href).map(
          ({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={
                  label === "WhatsApp" ||
                  label === "Instagram" ||
                  label === "Facebook"
                    ? "_blank"
                    : undefined
                }
                rel={
                  label === "WhatsApp" ||
                  label === "Instagram" ||
                  label === "Facebook"
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={label}
                title={label}
                className="group flex size-10 items-center justify-center rounded-full border border-gold-light/30 text-gold-light transition-all duration-300 hover:border-gold-light hover:bg-gold-light hover:text-maroon-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-maroon-deep sm:size-11"
              >
                <Icon className="size-[17px] transition-transform duration-300 group-hover:scale-110 sm:size-[18px]" />
              </a>
            </li>
          )
        )}
      </ul>

      <Ornament className="my-6" />

      <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2">
        {NAV_LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-sm transition hover:text-gold-light md:text-base"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <ul className="mt-5 md:mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs md:text-sm">
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
