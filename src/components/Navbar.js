"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, VENUE } from "@/data/site";
import { allura } from "@/lib/fonts";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

useEffect(() => {
  // Homepage sections exist only on the homepage.
  if (window.location.pathname !== "/") {
    setActiveSection("");
    return;
  }

  const updateActiveSection = () => {
    // Activation line: 30% down the viewport.
    const activationPoint = window.innerHeight * 0.3;

    let currentSection = "";

    for (const link of NAV_LINKS) {
      // Extract "#about" from "/#about".
      const targetId = new URL(
        link.href,
        window.location.origin,
      ).hash.slice(1);

      if (!targetId) continue;

      const section = document.getElementById(targetId);

      if (!section) continue;

      const rect = section.getBoundingClientRect();

      if (rect.top <= activationPoint) {
        currentSection = link.href;
      }
    }

    setActiveSection(currentSection);
  };

  updateActiveSection();

  window.addEventListener("scroll", updateActiveSection, {
    passive: true,
  });

  window.addEventListener("resize", updateActiveSection);

  return () => {
    window.removeEventListener("scroll", updateActiveSection);
    window.removeEventListener("resize", updateActiveSection);
  };
}, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid ? "bg-maroon-deep/95 shadow-lg backdrop-blur" : "bg-transparent"}`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Main"
      >
        <a href="/#top" className="flex gap-2 md:gap-3">
          <svg
            viewBox="0 0 72 34"
            fill="none"
            aria-hidden="true"
            className="mt-[5px] md:mt-1 lg:mt-0 h-5 w-auto sm:h-6 lg:h-8"
          >
            <path
              d="M5 24h62M17 24V14h38v10M20 14l6-8h20l6 8M24 24l-3 5m27-5 3 5M26 7V4m20 3V4M31 14v10m10-10v10"
              stroke="white"
              stroke-width="0.9"
            ></path>
            <path d="M26 7q10-9 20 0" stroke="white" stroke-width="0.9"></path>
          </svg>
          <p className={`${allura.className} font-display text-xl md:text-2xl lg:3xl font-semibold font-great tracking-wide text-gold-light`}>
            {VENUE.name}
          </p>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => {
            const isActive = activeSection === l.href;

            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative py-2 transition-colors duration-300 ${
                    isActive
                      ? "text-gold-light"
                      : "text-ivory/85 hover:text-gold-light"
                  }`}
                >
                  {l.label}

                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-px bg-gold-light transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}

          <li>
            <a href="#book" className="btn-gold !py-2">
              Celebrate at Palki
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="text-ivory lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <ul className="space-y-1 border-t border-gold/20 px-5 pb-6 pt-3 lg:hidden">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-lg text-ivory/90"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-3">
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="btn-gold w-full"
            >
              Celebrate at Palki
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
