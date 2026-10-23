
"use client";

import { ArrowRight } from "lucide-react";
import {
  buildWhatsAppFallback,
  isValidWhatsAppNumber,
} from "@/lib/whatsapp";

export default function WhatsAppFallback({ values }) {
  function handleClick(event) {
    if (!isValidWhatsAppNumber()) {
      event.preventDefault();
      alert(
        "WhatsApp enquiry is temporarily unavailable. Please contact us directly."
      );
    }
  }

  return (
    <div className="mt-4 text-center">
      <p role="alert" className="mt-1 text-xs text-red-400">
        We couldn't submit your enquiry through the email form.
        You can send it directly through WhatsApp instead.
      </p>

      <a
        href={buildWhatsAppFallback(values)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/70 px-5 py-3 text-sm font-medium text-emerald-500 transition-colors hover:border-gold hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
      >
        Continue on WhatsApp
        <ArrowRight className="size-4" aria-hidden="true" />
      </a>
    </div>
  );
}
