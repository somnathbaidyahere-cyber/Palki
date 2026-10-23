"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DiscountSuccessNotice({ discountCode, onDone }) {
  const [copied, setCopied] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(discountCode);
      setCopied(true);
    } catch (error) {
      console.error("Unable to copy discount code:", error);
      setCopied(false);
    }
  }

 // Trigger reveal animation sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 400); // Slight delay for ribbon/overlay transition

    return () => clearTimeout(timer);
  }, []);

  return (
   <div
      role="status"
      aria-labelledby="discount-success-title"
      className="relative overflow-hidden rounded-2xl border border-gold-light/60 bg-maroon-deep p-5 text-ivory shadow-2xl sm:p-6 shadow-gold/15 max-w-md mx-auto"
    >
      {/* 1. Regal Ribbon Cutting Stage */}
      <div
        className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        {/* Left Ribbon Strap */}
        <div
          className={`absolute top-1/2 left-0 h-8 -translate-y-1/2 bg-gradient-to-r from-gold via-gold-light to-gold shadow-lg border-y border-gold-light/80 transition-all duration-700 ease-in-out ${
            isRevealed ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
          }`}
        />

        {/* Right Ribbon Strap */}
        <div
          className={`absolute top-1/2 right-0 h-8 -translate-y-1/2 bg-gradient-to-r from-gold via-gold-light to-gold shadow-lg border-y border-gold-light/80 transition-all duration-700 ease-in-out ${
            isRevealed ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
          }`}
        />

        {/* Golden Ribbon Bow in Center */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center transition-all duration-500 ${
            isRevealed ? "scale-150 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <div className="h-10 w-10 rounded-full bg-gold-light border-2 border-gold shadow-xl flex items-center justify-center text-maroon-deep font-bold text-xs">
            ✨
          </div>
        </div>
      </div>

      {/* 2. Dark Overlay Reveal Screen */}
      <div
        className={`absolute inset-0 z-30 bg-black/80 transition-opacity duration-700 pointer-events-none ${
          isRevealed ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* 3. Continuous Falling Flower Petals */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-10"
        aria-hidden="true"
      >
        <span
          className="absolute animate-fall text-xs opacity-50"
          style={{ left: "15%", animationDuration: "4.2s", animationDelay: "0.2s" }}
        >
          🌸
        </span>
        <span
          className="absolute animate-fall text-xs opacity-40"
          style={{ left: "42%", animationDuration: "5s", animationDelay: "1s" }}
        >
          🌼
        </span>
        <span
          className="absolute animate-fall text-xs opacity-45"
          style={{ left: "72%", animationDuration: "4.6s", animationDelay: "0.5s" }}
        >
          🌸
        </span>
        <span
          className="absolute animate-fall text-xs opacity-35"
          style={{ left: "28%", animationDuration: "5.8s", animationDelay: "1.8s" }}
        >
          🌼
        </span>
        <span
          className="absolute animate-fall text-xs opacity-40"
          style={{ left: "88%", animationDuration: "5.1s", animationDelay: "1.4s" }}
        >
          🌸
        </span>
      </div>

  {/* 4. Large Floating Balloons (Starting from bottom and floating over card & navbar) */}
<div
  className="absolute inset-0 pointer-events-none z-50 overflow-visible"
  aria-hidden="true"
>
  <span
    className="absolute bottom-0 animate-float-bottom-up text-4xl sm:text-5xl opacity-90"
    style={{ left: "8%", animationDuration: "5.5s", animationDelay: "0s" }}
  >
    🎈
  </span>
  <span
    className="absolute bottom-0 animate-float-bottom-up text-5xl sm:text-6xl opacity-85"
    style={{ left: "32%", animationDuration: "7s", animationDelay: "1s" }}
  >
    🎈
  </span>
  <span
    className="absolute bottom-0 animate-float-bottom-up text-4xl sm:text-5xl opacity-90"
    style={{ left: "62%", animationDuration: "5s", animationDelay: "0.4s" }}
  >
    🎈
  </span>
  <span
    className="absolute bottom-0 animate-float-bottom-up text-5xl sm:text-6xl opacity-80"
    style={{ left: "84%", animationDuration: "7.5s", animationDelay: "1.5s" }}
  >
    🎈
  </span>
</div>

      {/* 5. Main Modal Content - Fades into view as ribbon reveals */}
      <div
        className={`relative z-20 transition-all duration-700 ease-out transform ${
          isRevealed ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2"
        }`}
      >
        {/* Subtle background glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold-light/10 rounded-full blur-xl pointer-events-none" />

        {/* Celebration Header Tag */}
        <div className="inline-flex items-center gap-1.5 rounded-full text-xs sm:text-sm font-medium text-gold-light/90 mb-1">
          <span>🎉</span> A little something for your celebration!
        </div>

        {/* Premium Heading */}
        <h3
          id="discount-success-title"
          className="font-display text-2xl font-bold sm:text-3xl text-gold-light tracking-wide flex items-center gap-2 mt-1"
        >
          Exclusive Offer Unlocked! ✨
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-ivory/80">
          Thank you for considering Palki Garden. Enjoy{" "}
          <strong className="text-gold-light font-bold">5% off</strong> your eligible booking with the voucher below.
        </p>

        {/* Voucher Code Box */}
        <div className="mt-4 rounded-xl border-2 border-dotted border-[#D4AF70] bg-white/5 p-4 text-center shadow-inner relative overflow-hidden">
          {/* Subtle light shimmer line */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-light/15 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />

          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gold-light/80 font-semibold">
            Your Exclusive Discount Code
          </p>

          <p className="mt-1.5 break-all font-mono text-2xl font-extrabold tracking-widest sm:text-3xl text-gold-light">
            {discountCode}
          </p>

          {/* Copy Button Inside Card */}
          <button
            type="button"
            onClick={copyCode}
            className={`mt-3 inline-flex items-center justify-center rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light active:scale-95 ${
              copied
                ? "bg-emerald-600 text-white border border-emerald-400 shadow-md"
                : "border border-gold-light/60 bg-gold-light/10 text-gold-light hover:bg-gold-light hover:text-maroon-deep shadow-sm"
            }`}
          >
            {copied ? (
              <>
                <svg
                  className="mr-1.5 h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Code Copied!
              </>
            ) : (
              <>
                <svg
                  className="mr-1.5 h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy Code
              </>
            )}
          </button>
        </div>

        {/* Terms notice */}
        <p className="mt-3 text-xs leading-relaxed text-ivory/60">
          Keep this code for your booking. The 5% discount applies only to a successfully confirmed eligible booking.{" "}
          <Link
            href="/terms-and-conditions"
            className="text-gold-light underline underline-offset-2 transition-colors hover:text-gold"
          >
            T&Cs apply
          </Link>
          .
        </p>

        {/* Done / Close Modal Button */}
        <div className="mt-5">
          <button
            type="button"
            onClick={onDone}
            className="inline-flex w-full items-center justify-center rounded-full bg-gold-light px-5 py-3 text-sm font-bold text-maroon-deep transition-all duration-300 hover:bg-gold hover:shadow-lg hover:shadow-gold/20 active:scale-[0.98]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
