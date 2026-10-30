"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { playSound } from "@/lib/sounds";
import { setConfig } from "next/config";

export default function DiscountSuccessNotice({
  discountCode,
  onDone,
  tone = "dark",
  onRevealChange,
}) {
  const [copied, setCopied] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const dark = tone === "dark";

  const theme = {
    card: dark
      ? "border-gold-light/60 bg-maroon-deep text-ivory shadow-2xl shadow-gold/15"
      : "border-gold/50 bg-[#FFFCF6] text-ink shadow-xl shadow-maroon/10",

    heading: dark ? "text-gold-light" : "text-maroon-deep",

    body: dark ? "text-ivory/80" : "text-ink/75",

    muted: dark ? "text-ivory/60" : "text-ink/60",

    voucher: dark
      ? "border-[#D4AF70] bg-white/5"
      : "border-gold/70 bg-maroon/90",

    code: dark ? "text-gold-light" : "text-gold-light",

    button: "bg-gold-light text-maroon-deep hover:bg-gold",
  };

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

  // Passing a boolean prop upward for animating the hero section
  useEffect(() => {
    onRevealChange?.(isRevealed);
  }, [isRevealed, onRevealChange]);

  useEffect(() => {
    if (copied) {
      playSound("codeCopied");
    }
  }, [copied, setCopied]);

  return (
    <div
      role="status"
      aria-labelledby="discount-success-title"
      className={`relative mx-auto max-w-md overflow-hidden rounded-2xl border p-5 sm:p-6 ${theme.card}`}
    >
      {/* 1. Regal Ribbon Cutting Stage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center overflow-hidden"
      >
        {/* Left ribbon strap */}
        <div
          className={`absolute left-0 top-1/2 h-8 w-1/2 -translate-y-1/2 border-y border-gold-light/80 bg-gradient-to-r from-gold via-gold-light to-gold shadow-lg ${
            isRevealed ? "animate-ribbon-cut-left" : ""
          }`}
        />

        {/* Right ribbon strap */}
        <div
          className={`absolute right-0 top-1/2 h-8 w-1/2 -translate-y-1/2 border-y border-gold-light/80 bg-gradient-to-r from-gold via-gold-light to-gold shadow-lg ${
            isRevealed ? "animate-ribbon-cut-right" : ""
          }`}
        />

        {/* Center bow */}
        <div
          className={`absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center ${
            isRevealed ? "animate-bow-pop" : ""
          }`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold bg-gold-light text-xs font-bold text-maroon-deep shadow-xl">
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

      {/* 3. Falling Flower Petals */}
      <div
        className={`absolute inset-0 z-10 overflow-hidden pointer-events-none
    transition-all duration-700 ease-out
    ${isRevealed ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        aria-hidden="true"
      >
        <span
          className="absolute animate-fall text-xs opacity-50"
          style={{
            left: "15%",
            animationDuration: "4.2s",
            animationDelay: "0.2s",
          }}
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
          style={{
            left: "72%",
            animationDuration: "4.6s",
            animationDelay: "0.5s",
          }}
        >
          🌸
        </span>
        <span
          className="absolute animate-fall text-xs opacity-35"
          style={{
            left: "28%",
            animationDuration: "5.8s",
            animationDelay: "1.8s",
          }}
        >
          🌼
        </span>
        <span
          className="absolute animate-fall text-xs opacity-40"
          style={{
            left: "88%",
            animationDuration: "5.1s",
            animationDelay: "1.4s",
          }}
        >
          🌸
        </span>
      </div>

      {/* 3. Falling Flower Petals */}
      <div
        className={`absolute inset-0 z-10 overflow-hidden pointer-events-none
    transition-all duration-700 ease-out
    ${isRevealed ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        aria-hidden="true"
      >
        <span
          className="absolute bottom-0 animate-float-bottom-up text-4xl sm:text-5xl opacity-90"
          style={{
            left: "8%",
            animationDuration: "5.5s",
            animationDelay: "0s",
          }}
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
          style={{
            left: "62%",
            animationDuration: "5s",
            animationDelay: "0.4s",
          }}
        >
          🎈
        </span>
        <span
          className="absolute bottom-0 animate-float-bottom-up text-5xl sm:text-6xl opacity-80"
          style={{
            left: "84%",
            animationDuration: "7.5s",
            animationDelay: "1.5s",
          }}
        >
          🎈
        </span>
      </div>

      {/* 5. Main Modal Content - Fades into view as ribbon reveals */}
      <div
        className={`relative z-20 transition-all duration-700 ease-out transform ${
          isRevealed
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2"
        }`}
      >
        {/* Subtle background glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold-light/10 rounded-full blur-xl pointer-events-none" />

        {/* Celebration Header Tag */}
        <div
          className={`inline-flex items-center gap-1.5 rounded-full text-xs sm:text-sm font-medium ${theme.heading} mb-1`}
        >
          <span>🎉</span> A little something for your celebration!
        </div>

        {/* Premium Heading */}
        <h3
          id="discount-success-title"
          className={`mt-1 flex items-center gap-2 text-2xl font-bold tracking-wide sm:text-3xl ${theme.heading}`}
        >
          Exclusive Offer Unlocked! ✨
        </h3>

        <p className={`mt-2 text-sm leading-relaxed ${theme.body}`}>
          Thank you for choosing Palki Garden. Enjoy{" "}
          <strong className="text-gold-light font-bold">5% off</strong>an
          eligible booking with your exclusive voucher.
        </p>

        {/* Voucher Code Box */}
        <div
          className={`relative mt-4 overflow-hidden rounded-xl border-2 border-dotted p-4 text-center shadow-inner ${theme.voucher}`}
        >
          {/* Subtle light shimmer line */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-light/15 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />

          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gold-light/80 font-semibold">
            Your Exclusive Discount Code
          </p>

          <p
            className={`mt-1.5 break-all font-mono text-2xl font-extrabold tracking-widest sm:text-3xl ${theme.code}`}
          >
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
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

        <p className={`mt-3 text-xs leading-relaxed ${theme.muted}`}>
          Keep this code for your booking. Valid for{" "}
          <strong className="font-semibold text-gold-light">
            72 hours from successful enquiry submission.
          </strong>{" "}
          The 5% discount applies only to an eligible, successfully confirmed
          booking.{" "}
          <Link
            href="/terms-and-conditions"
            className={`underline underline-offset-2 transition-colors ${
              dark
                ? "text-gold-light hover:text-gold"
                : "text-maroon-deep hover:text-gold"
            }`}
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
            className={`inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition-all duration-300 hover:shadow-lg active:scale-[0.98] ${theme.button}`}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
