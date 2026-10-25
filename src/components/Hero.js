"use client";

import { useState } from "react";
import BookingForm from "./BookingForm";

export default function Hero() {
  const [showCelebration, setShowCelebration] = useState(false);

  return (
    <section
      id="top"
      className={`jaali relative overflow-hidden bg-maroon-deep pt-24 pb-20 text-ivory sm:pt-36 lg:pb-28 lg:pt-28 ${
        showCelebration ? "hero-celebrating" : ""
      }`}
    >
      {/* Original background glow */}
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Celebration glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(212,175,112,0.2),transparent_65%)] transition-opacity duration-1000 ${
          showCelebration ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Hero-only celebration particles */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-20 overflow-hidden transition-opacity duration-700 ${
          showCelebration ? "opacity-100" : "opacity-0"
        }`}
      >
        {showCelebration &&
          Array.from({ length: 24 }, (_, i) => (
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

      {/* Main hero content */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Intro */}
        <div
          className={`animate-rise hero-celebration-intro ${
            showCelebration ? "hero-celebration-active" : ""
          }`}
        >
          <h1 className="text-4xl leading-[1.05] md:text-5xl lg:text-7xl">
            Where
            <br />
            traditions become{" "}
            <span className="italic text-gold-light">memories</span>.
          </h1>

          <p className="mt-4 text-sm font-medium tracking-wide text-gold-light">
            A Wedding &amp; Event Venue in Rajpur Sonarpur
          </p>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ivory/80 md:mt-7">
            From the joy of a wedding to the warmth of a family gathering, Palki
            Garden is where loved ones come together, traditions find their
            place, and beautiful memories begin.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#book" className="btn-gold">
              Check availability
            </a>
            <a href="#gallery" className="btn-outline">
              See past events
            </a>
          </div>
        </div>

        {/* Booking card */}
        <div
          id="book-quick"
          className={`animate-rise mx-auto w-full min-w-0 max-w-3xl transition-[filter] duration-1000 [animation-delay:200ms] ${
            showCelebration ? "hero-celebration-card-active" : ""
          }`}
        >
          <div className="arch w-full min-w-0 border border-gold/50 p-1.5 sm:p-2">
            <div className="arch w-full min-w-0 bg-maroon/80 px-4 pb-8 pt-16 backdrop-blur min-[430px]:max-sm:px-8 sm:px-12 md:px-16 lg:px-10">
              <h2 className="text-center text-2xl text-gold-light lg:text-3xl">
                Plan your date
              </h2>

              <p className="mb-5 mt-2 text-center text-sm text-ivory/70 md:mb-6 md:text-base">
                Tell us about your event and we will call you back.
              </p>

              <BookingForm
                id="hero"
                tone="dark"
                onRevealChange={setShowCelebration}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
