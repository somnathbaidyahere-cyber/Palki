"use client";

import { useState } from "react";
import { EVENT_TYPES, MAX_GUESTS } from "@/data/site";

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  type: EVENT_TYPES[0],
  date: "",
  guests: "",
  message: "",
};

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

  async function onSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      setValues(EMPTY);
    } catch {
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
        <p className={`mt-3 ${dark ? "text-ivory/75" : "text-ink/70"}`}>
          Our team will call you within one working day to confirm your date and
          arrange a visit.
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
      className="grid gap-2 md:gap-4 sm:grid-cols-2"
    >
      <div>
        <label htmlFor={`${id}-name`} className={label}>
          Your name
        </label>
        <input
          id={`${id}-name`}
          name="name"
          value={values.name}
          onChange={onChange}
          autoComplete="name"
          className={field}
          placeholder="Full name"
        />
        {errors.name && <p className={errorText}>{errors.name}</p>}
      </div>
      <div>
        <label htmlFor={`${id}-phone`} className={label}>
          Phone
        </label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          value={values.phone}
          onChange={onChange}
          autoComplete="tel"
          className={field}
          placeholder="10-digit mobile number"
        />
        {errors.phone && <p className={errorText}>{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor={`${id}-type`} className={label}>
          Type of event
        </label>

        <select
          id={`${id}-type`}
          name="type"
          value={values.type}
          onChange={onChange}
          className={`${field} appearance-none text-sm`}
        >
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t} className="text-ink">
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${id}-date`} className={label}>
          Event date
        </label>

        <input
          id={`${id}-date`}
          name="date"
          type="date"
          min={today}
          value={values.date}
          onChange={onChange}
          className={`${field} appearance-none text-sm ${
            dark ? "[color-scheme:dark]" : ""
          }`}
        />

        {errors.date && <p className={errorText}>{errors.date}</p>}
      </div>
      <div>
        <label htmlFor={`${id}-guests`} className={label}>
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
          className={field}
          placeholder={`Up to ${MAX_GUESTS}`}
        />
        {errors.guests && <p className={errorText}>{errors.guests}</p>}
      </div>
      <div>
        <label htmlFor={`${id}-email`} className={label}>
          Email (optional)
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
          autoComplete="email"
          className={field}
          placeholder="you@example.com"
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-message`} className={label}>
          Anything we should know? (optional)
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          // rows={3}
          value={values.message}
          onChange={onChange}
         className={`${field} h-16 resize-y sm:h-20 lg:h-24`}
          placeholder="Rituals, decoration ideas, rooms needed..."
        />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-gold w-full disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Check availability"}
        </button>
        {status === "error" && (
          <p role="alert" className={`mt-3 text-center ${errorText}`}>
            We could not send your request. Please try again or call us.
          </p>
        )}
      </div>
    </form>
  );
}
