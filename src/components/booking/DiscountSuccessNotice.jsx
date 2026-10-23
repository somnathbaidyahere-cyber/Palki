
"use client";

import { useState } from "react";
import Link from "next/link";

export default function DiscountSuccessNotice({
  discountCode,
  onDone,
}) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(discountCode);
      setCopied(true);
    } catch (error) {
      console.error("Unable to copy discount code:", error);
      setCopied(false);
    }
  }

  return (
    <div
      role="status"
      aria-labelledby="discount-success-title"
      className="relative animate-in fade-in slide-in-from-bottom-2 duration-500 rounded-2xl border border-gold-light/40 bg-maroon-deep p-5 text-ivory shadow-lg sm:p-6"
    >
      <p className="pr-9 text-sm font-medium text-gold-light">
        A little something for your celebration!
      </p>

      <h3
        id="discount-success-title"
        className="mt-2 font-display text-2xl font-semibold sm:text-3xl"
      >
        Enquiry sent successfully!
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-ivory/75">
        Thank you for considering Palki Garden. Enjoy 5% off
        your eligible booking with the voucher below.
      </p>

      <div className="mt-5 rounded-xl border border-gold-light/40 bg-white/5 p-4 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-gold-light">
          Your discount code
        </p>

        <p className="mt-2 break-all font-mono text-xl font-bold tracking-wider sm:text-2xl">
          {discountCode}
        </p>

        <button
          type="button"
          onClick={copyCode}
          className="mt-3 rounded-full border border-gold-light/50 px-4 py-2 text-sm transition-colors hover:bg-gold-light hover:text-maroon-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light"
        >
          {copied ? "Code copied!" : "Copy discount code"}
        </button>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-ivory/60">
        Keep this code for your booking. The 5% discount applies
        only to a successfully confirmed eligible booking.{" "}
        <Link
          href="/terms-and-conditions"
          className="text-gold-light underline underline-offset-2 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light"
        >
          T&Cs apply
        </Link>.
      </p>

      <div className="mt-5">
        <button
          type="button"
          onClick={onDone}
          className="inline-flex w-full items-center justify-center rounded-full bg-gold-light px-5 py-3 text-sm font-semibold text-maroon-deep transition hover:bg-gold"
        >
          Done
        </button>
      </div>
    </div>
  );
}
