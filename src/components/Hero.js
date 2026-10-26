"use client";

import { useState } from "react";
import Image from "next/image";
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

      {/* Editorial photo collage — right side of hero */}

     
      {/* Main hero content */}
      <div className="relative z-10 mx-auto grid min-h-[540px] max-w-7xl items-center gap-12 px-5 py-10 sm:px-8 sm:py-14 lg:min-h-[620px] lg:grid-cols-[1fr_0.95fr] lg:gap-8 lg:py-12 xl:gap-14">
        {/* Intro */}
        <div
          className={`relative z-10 animate-rise hero-celebration-intro ${
            showCelebration ? "hero-celebration-active" : ""
          }`}
        >
          <h1 className="text-4xl leading-[1.05] md:text-5xl lg:text-6xl xl:text-7xl">
            Where
            <br />
            traditions become{" "}
            <span className="italic text-gold-light">memories</span>.
          </h1>

          <p className="mt-4 text-sm font-medium tracking-wide text-gold-light">
            A Wedding &amp; Event Venue in Rajpur Sonarpur
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/80 md:mt-7 md:text-lg">
            From the joy of a wedding to the warmth of a family gathering, Palki
            Garden is where loved ones come together, traditions find their
            place, and beautiful memories begin.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <a href="#book" className="btn-gold">
              Check availability
            </a>
            <a href="#gallery" className="btn-outline">
              See past events
            </a>
          </div>
        </div>

        {/* Editorial photo collage */}
        <div
          className={`relative mx-auto h-[390px] w-full max-w-[540px] animate-rise sm:h-[480px] lg:h-[530px] lg:max-w-none [animation-delay:200ms] ${
            showCelebration ? "hero-celebration-card-active" : ""
          }`}
        >
          {/* Soft ambient glow */}
          <div
            aria-hidden="true"
            className="absolute inset-[12%] rounded-full bg-gold-light/[0.09] blur-3xl"
          />

          {/* Back photo — guest room */}
          <div className="absolute left-[5%] top-[9%] z-0 w-[49%] -rotate-[9deg] transition-transform duration-500 hover:-rotate-[5deg]">
            <div className="relative aspect-[4/5] bg-[#F8F0DF] p-2.5 pb-9 shadow-[0_22px_55px_rgba(0,0,0,0.4)] sm:p-3 sm:pb-11">
              <div className="relative aspect-[3/4] overflow-hidden bg-maroon-deep">
                <Image
                  src="/images/guest-room.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 260px, (min-width: 1024px) 220px, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-2 left-1/2 h-6 w-14 -translate-x-1/2 rotate-[-5deg] bg-[#D9BD80]/85 shadow-sm sm:w-16" />
            </div>
          </div>

          {/* Front photo — bridal room */}
          <div className="absolute right-[4%] top-[5%] z-10 w-[49%] rotate-[7deg] transition-transform duration-500 hover:rotate-[4deg]">
            <div className="relative aspect-[4/5] bg-[#F8F0DF] p-2.5 pb-9 shadow-[0_25px_65px_rgba(0,0,0,0.45)] sm:p-3 sm:pb-11">
              <div className="relative aspect-[3/4] overflow-hidden bg-maroon-deep">
                <Image
                  src="/images/bridal-room.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 270px, (min-width: 1024px) 230px, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-2 left-1/2 h-6 w-14 -translate-x-1/2 rotate-[4deg] bg-[#E8D9B7]/90 shadow-sm sm:w-16" />
            </div>
          </div>

          {/* Foreground photo — marriage hall */}
          <div className="absolute bottom-[4%] left-[23%] z-20 w-[57%] -rotate-[3deg] transition-transform duration-500 hover:rotate-0">
            <div className="relative aspect-[4/3] bg-[#F8F0DF] p-2.5 pb-8 shadow-[0_25px_60px_rgba(0,0,0,0.45)] sm:p-3 sm:pb-9">
              <div className="relative aspect-[5/3] overflow-hidden bg-maroon-deep">
                <Image
                  src="/images/marriage-hall1.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 320px, (min-width: 1024px) 280px, 55vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-2 left-1/2 h-6 w-14 -translate-x-1/2 rotate-[3deg] bg-[#D9BD80]/85 shadow-sm sm:w-16" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
