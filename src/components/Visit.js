"use client";

import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import BookingForm from "./BookingForm";
import SectionHeading from "./ui/SectionHeading";
import { VENUE } from "@/data/site";

export default function Visit() {
  const q = encodeURIComponent(VENUE.address);
  const [showVisitCelebration, setShowVisitCelebration] = useState(false);

  return (
    <section
      id="visit"
      className={`relative overflow-hidden ${
        showVisitCelebration ? "visit-celebrating" : ""
      }`}
    >
      {/* Visit celebration glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_65%_45%,rgba(212,175,112,0.22),transparent_65%)] transition-opacity duration-1000 ${
          showVisitCelebration ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Visit celebration particles */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-20 overflow-hidden transition-opacity duration-700 ${
          showVisitCelebration ? "opacity-100" : "opacity-0"
        }`}
      >
        {showVisitCelebration &&
          Array.from({ length: 18 }, (_, i) => (
            <span
              key={i}
              className="hero-celebration-particle"
              style={{
                left: `${(i * 41 + 7) % 100}%`,
                animationDelay: `${(i % 8) * 0.2}s`,
                animationDuration: `${4 + (i % 4)}s`,
                fontSize: `${12 + (i % 3) * 6}px`,
              }}
            >
              {i % 3 === 0 ? "🌸" : i % 3 === 1 ? "✦" : "✨"}
            </span>
          ))}
      </div>
      <div className="py-16 sm:py-24  md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              align="left"
              title="Visit us before you decide"
              text="Walk the hall, see the rooms and talk through your plans with our team."
            />
            <ul className="mt-6 space-y-3 text-sm leading-relaxed sm:mt-7 sm:space-y-3.5 sm:text-base">
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-gold-dark"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span>{VENUE.address}</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="shrink-0 text-gold-dark"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <a
                  href={`tel:${VENUE.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-maroon"
                >
                  {VENUE.phone}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="shrink-0 text-gold-dark"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${VENUE.email}`}
                  className="break-all transition-colors hover:text-maroon"
                >
                  {VENUE.email}
                </a>
              </li>
            </ul>
            <p className="mt-6 text-ink/60">{VENUE.hours}</p>
          </div>

          <div
            id="book"
            className="border border-gold/60 bg-white/50 p-6 sm:p-10"
          >
            <h3 className="mb-6 text-3xl font-semibold text-maroon">
              Plan your special day
            </h3>
            <BookingForm id="visit" tone="light"  onRevealChange={setShowVisitCelebration} />
          </div>
        </div>
      </div>

      {/* Large interactive map, full width, directly above the footer */}
      <div className="relative h-[50vh] min-h-[440px] w-full bg-ivory-dark">
        <iframe
          title={`Map showing ${VENUE.name}`}
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 p-3 sm:p-5 lg:p-8">
          <div
            className="
      pointer-events-auto
      w-fit max-w-[min(17rem,100%)]
      border border-gold/70
      bg-maroon-deep
      p-3.5
      text-ivory
      shadow-xl
      sm:max-w-xs sm:p-4
      lg:max-w-sm lg:p-6
    "
          >
            <p className="font-display text-xl font-semibold text-gold-light sm:text-2xl lg:text-3xl">
              {VENUE.name}
            </p>

            <p className="mt-1.5 text-xs leading-relaxed text-ivory/80 sm:mt-2 sm:text-sm">
              {VENUE.address}
            </p>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${q}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-3 !px-4 !py-2 text-xs sm:mt-4 sm:text-sm"
            >
              Get directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
