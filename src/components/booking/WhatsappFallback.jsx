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

export default function WhatsAppFallback({ values, connectionError }) {
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
  <div className="mt-5 rounded-xl border border-gold-light/20 bg-white/5 p-4 text-center">
  {isOffline ? (
    <>
      <WifiOff
        className="mx-auto size-5 text-gold-light"
        aria-hidden="true"
      />

      <p
        role="alert"
        className="mt-2 text-sm font-semibold text-gold-light"
      >
        No internet connection
      </p>

      {callHref && (
        <div className="mt-4">
          <a
            href={callHref}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold-light px-5 py-3 text-sm font-semibold text-maroon-deep transition-colors hover:bg-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light"
          >
            <Phone className="size-4" aria-hidden="true" />
            Call us directly
          </a>
        </div>
      )}
    </>
  ) : (
    <>
      <p role="alert" className="text-sm font-medium text-red-300">
        We couldn't submit your enquiry.
      </p>

      <p className="mt-1 text-xs leading-relaxed text-ivory/70">
        Please try again or contact us directly to discuss your event.
      </p>

      <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
        {whatsappAvailable && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-emerald-500/70 px-5 py-3 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            WhatsApp us
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        )}

        {callHref && (
          <a
            href={callHref}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-gold-light/50 px-5 py-3 text-sm font-medium text-gold-light transition-colors hover:bg-gold-light/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light"
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
