"use client";

import { useState } from "react";
import { EVENT_TYPES, MAX_GUESTS } from "@/data/site";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  type: EVENT_TYPES[0],
  date: "",
  guests: "",
  message: "",
};

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919XXXXXXXXX";

export default function BookingForm({ id, tone = "light" }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  const dark = tone === "dark";
  const today = new Date().toISOString().split("T")[0];

  const field = dark
    ? `box-border w-full min-w-0 border border-gold/40 bg-white/5
     px-3 py-2 text-xs md:text-sm md:text-base leading-5 text-ivory
     placeholder:text-xs md:placeholder:text-sm placeholder:text-ivory/40
     focus:border-gold focus:outline-none
     md:px-4 md:py-2`
    : `box-border w-full min-w-0 border border-maroon/20 bg-white
     px-3 py-2 text-sm leading-5 text-ink
     placeholder:text-xs placeholder:text-ink/40
     focus:border-gold focus:outline-none
     md:px-4 md:py-2`;
  const label = `mb-1.5 block text-xs md:text-sm lg:text-base ${dark ? "text-ivory/80" : "text-ink/70"}`;
  const errorText = "mt-1 text-xs md:text-sm text-red-400";

  function onChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  }

  function validate() {
    const e = {};
    if (!values.name.trim()) e.name = "Please enter your name.";
    if (values.phone.replace(/\D/g, "").length < 10)
      e.phone = "Enter a 10-digit phone number.";
    if (!values.date) e.date = "Choose your event date.";
    const g = Number(values.guests);
    if (!(g >= 1 && g <= MAX_GUESTS))
      e.guests = `Enter a guest count between 1 and ${MAX_GUESTS}.`;
    return e;
  }

  function buildWhatsAppFallback(values) {
    const phone = WHATSAPP_NUMBER.replace(/\D/g, "");

    if (!/^91[6-9]\d{9}$/.test(phone)) {
      return "#";
    }

    const message = [
      "Hello Palki Garden! I'd like to enquire about booking.",
      "",
      `Name: ${values.name.trim()}`,
      `Phone: ${values.phone.trim()}`,
      `Email: ${values.email.trim() || "Not provided"}`,
      `Event type: ${values.type}`,
      `Preferred date: ${values.date}`,
      `Expected guests: ${values.guests}`,
      `Message: ${values.message.trim() || "Not provided"}`,
    ].join("\n");

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  async function onSubmit(ev) {
    ev.preventDefault();

    const e = validate();
    setErrors(e);

    if (Object.keys(e).length) return;

    setStatus("sending");

    try {
      const formData = new FormData();

      // Add the existing form values
      formData.append("name", values.name.trim());
      formData.append("phone", values.phone.trim());
      formData.append("email", values.email.trim());
      formData.append("type", values.type);
      formData.append("date", values.date);
      formData.append("guests", values.guests);
      formData.append("message", values.message.trim());

      // Web3Forms configuration
      formData.append(
        "access_key",
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KE,
      );
      formData.append(
        "subject",
        `New Palki Garden Enquiry — ${values.name.trim()}`,
      );
      formData.append("from_name", "Palki Garden Website");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Unable to submit enquiry");
      }

      setStatus("done");
      setValues(EMPTY);
      setErrors({});
    } catch (error) {
      console.error("Booking enquiry submission failed:", error);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className={`py-10 text-center ${dark ? "text-ivory" : "text-maroon"}`}
      >
        <p className="font-display text-3xl font-semibold">
          Thank you. We have your request.
        </p>
        <p className={`mt-4 text-sm ${dark ? "text-ivory/70" : "text-ink/70"}`}>
          Your enquiry has been sent successfully. Our team will contact you
          soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-gold underline underline-offset-4"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2 sm:gap-y-4"
    >
      {/* Name */}
      <div className="min-w-0">
        <label htmlFor={`${id}-name`} className={`${label} mb-1 block`}>
          Your name
        </label>

        <input
          id={`${id}-name`}
          name="name"
          value={values.name}
          onChange={onChange}
          autoComplete="name"
          className={`${field} h-10 w-full min-[500px]:max-sm:rounded-t-[2rem] sm:rounded-tl-[2rem] md:rounded-tl-[2.5rem] lg:rounded-none`}
          placeholder="Full name"
        />

        {errors.name && <p className={errorText}>{errors.name}</p>}
      </div>

      {/* Phone */}
      <div className="min-w-0">
        <label htmlFor={`${id}-phone`} className={`${label} mb-1 block`}>
          Phone
        </label>

        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          value={values.phone}
          onChange={onChange}
          autoComplete="tel"
          className={`${field} h-10 w-full sm:rounded-tr-[2rem] md:rounded-tr-[2.5rem] lg:rounded-none`}
          placeholder="10-digit mobile number"
        />

        {errors.phone && <p className={errorText}>{errors.phone}</p>}
      </div>

      {/* Event type */}
      <div className="min-w-0">
        <label htmlFor={`${id}-type`} className={`${label} mb-1 block`}>
          Type of event
        </label>

        <select
          id={`${id}-type`}
          name="type"
          value={values.type}
          onChange={onChange}
          className={`${field} h-10 w-full appearance-none text-sm`}
        >
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t} className="text-ink">
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Event date */}
      <div className="min-w-0">
        <label htmlFor={`${id}-date`} className={`${label} mb-1 block`}>
          Event date
        </label>

        <input
          id={`${id}-date`}
          name="date"
          type="date"
          min={today}
          value={values.date}
          onChange={onChange}
          className={`${field} h-10 w-full appearance-none text-sm ${
            dark ? "[color-scheme:dark]" : ""
          }`}
        />

        {errors.date && <p className={errorText}>{errors.date}</p>}
      </div>

      {/* Number of guests */}
      <div className="min-w-0">
        <label htmlFor={`${id}-guests`} className={`${label} mb-1 block`}>
          Number of guests
        </label>

        <input
          id={`${id}-guests`}
          name="guests"
          type="number"
          inputMode="numeric"
          min="1"
          max={MAX_GUESTS}
          value={values.guests}
          onChange={onChange}
          className={`${field} h-10 w-full`}
          placeholder={`Up to ${MAX_GUESTS}`}
        />

        {errors.guests && <p className={errorText}>{errors.guests}</p>}
      </div>

      {/* Email */}
      <div className="min-w-0">
        <label htmlFor={`${id}-email`} className={`${label} mb-1 block`}>
          Email (optional)
        </label>

        <input
          id={`${id}-email`}
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
          autoComplete="email"
          className={`${field} h-10 w-full`}
          placeholder="you@example.com"
        />
      </div>

      {/* Additional message */}
      <div className="min-w-0 sm:col-span-2">
        <label htmlFor={`${id}-message`} className={`${label} mb-1 block`}>
          Anything we should know? (optional)
        </label>

        <textarea
          id={`${id}-message`}
          name="message"
          rows={2}
          value={values.message}
          onChange={onChange}
          className={`${field} min-h-16 w-full resize-y sm:min-h-20 lg:min-h-24`}
          placeholder="Rituals, decoration ideas, rooms needed..."
        />
      </div>

      {/* Submit */}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-gold w-full disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Check availability"}
        </button>
        <p
          className={`mt-3 text-center text-sm ${dark ? "text-ivory/60" : "text-ink/60"}`}
        >
          By sending this, you agree to our{" "}
          <Link
            href="/privacy-policy"
            className="underline decoration-gold underline-offset-4"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/terms-and-conditions"
            className="underline decoration-gold underline-offset-4"
          >
            Terms
          </Link>
          .
        </p>
        {status === "error" && (
          <div className="mt-4 text-center">
            <p role="alert" className={errorText}>
              We couldn't submit your enquiry through the email form. You can
              send it directly through WhatsApp instead.
            </p>

            <a
              href={buildWhatsAppFallback(values)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (
                  !/^91[6-9]\d{9}$/.test(WHATSAPP_NUMBER.replace(/\D/g, ""))
                ) {
                  e.preventDefault();
                  alert(
                    "WhatsApp enquiry is temporarily unavailable. Please contact us directly.",
                  );
                }
              }}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/70 px-5 py-3 text-sm font-medium text-emerald-500 transition-colors hover:border-gold hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              Continue on WhatsApp
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </form>
  );
}
