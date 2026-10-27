"use client";

import { ArrowRight, Phone, WifiOff } from "lucide-react";
import { buildWhatsAppFallback, isValidWhatsAppNumber } from "@/lib/whatsapp";

const CONTACT_NUMBER = process.env.NEXT_PUBLIC_TELEPHONE || "";

function getCallHref() {
  const digits = CONTACT_NUMBER.replace(/\D/g, "");

  if (!digits) return null;

  const indianNumber = digits.startsWith("91") ? digits : `91${digits}`;
  console.log(indianNumber);

  return `tel:+${indianNumber}`;
}

export default function WhatsAppFallback({ values, connectionError, tone="dark" }) {
  const callHref = getCallHref();
  const whatsappHref = buildWhatsAppFallback(values);
  const whatsappAvailable = isValidWhatsAppNumber();

  const isOffline = connectionError === "offline";
  // console.log(connectionError);
  // console.log(isOffline);

  console.log("[Fallback Debug]", {
  connectionError,
  isOffline,
  component: "WhatsAppFallback",
});

  return (

<div
  className={`mt-5 rounded-xl border p-4 text-center sm:p-5 ${
    tone === "light"
      ? "border-gold/40 bg-white/80 shadow-sm"
      : "border-gold-light/20 bg-white/5"
  }`}
>
  {isOffline ? (
    <>
      <WifiOff
        className={`mx-auto size-5 ${
          tone === "light" ? "text-red-500" : "text-gold-light"
        }`}
        aria-hidden="true"
      />

      <p
        role="alert"
        className={`mt-2 text-sm font-semibold ${
          tone === "light" ? "text-maroon-deep" : "text-gold-light"
        }`}
      >
        No internet connection
      </p>

      <p
        className={`mt-1 text-xs leading-relaxed ${
          tone === "light" ? "text-stone-700" : "text-ivory/75"
        }`}
      >
        Your enquiry couldn't be sent because your internet connection
        appears to be unavailable. Please reconnect or contact us directly.
      </p>

      {callHref && (
        <div className="mt-4">
          <a
            href={callHref}
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 ${
              tone === "light"
                ? "bg-maroon-deep text-ivory hover:bg-maroon-deep/90 focus-visible:ring-maroon-deep"
                : "bg-gold-light text-maroon-deep hover:bg-gold focus-visible:ring-gold-light"
            }`}
          >
            <Phone className="size-4" aria-hidden="true" />
            Call us directly
          </a>
        </div>
      )}
    </>
  ) : (
    <>
      <p
        role="alert"
        className={`text-sm font-semibold ${
          tone === "light" ? "text-red-600" : "text-red-300"
        }`}
      >
        We couldn't submit your enquiry.
      </p>

      <p
        className={`mt-1 text-xs leading-relaxed ${
          tone === "light" ? "text-stone-600" : "text-ivory/75"
        }`}
      >
        Please try again or contact us directly to discuss your event.
      </p>

      <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
        {whatsappAvailable && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
              tone === "light"
                ? "border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                : "border-emerald-500/70 text-emerald-400 hover:bg-emerald-500/10"
            }`}
          >
            WhatsApp us
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        )}

        {callHref && (
          <a
            href={callHref}
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 ${
              tone === "light"
                ? "border-gold-dark text-gold-dark hover:bg-amber-50 focus-visible:ring-gold-dark"
                : "border-gold-light/50 text-gold-light hover:bg-gold-light/10 focus-visible:ring-gold-light"
            }`}
          >
            <Phone className="size-4" aria-hidden="true" />
            Call us directly
          </a>
        )}
      </div>
    </>
  )}
</div>

  );
}
