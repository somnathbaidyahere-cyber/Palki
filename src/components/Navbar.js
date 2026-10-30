"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, VENUE } from "@/data/site";
import LensText from "@/components/ui/navBtn/LensText";

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
        const targetId = new URL(link.href, window.location.origin).hash.slice(
          1,
        );

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
        className="mx-auto flex h-[60px] md:h-[72px] lg:h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Main"
      >
        <a href="/#top" className="flex items-center gap-2 md:gap-3">
          {/* Palki Icon / Illustration */}
          <img
            src="/images/logo/palki.png"
            alt="Palki Garden Logo"
            className="h-9 md:h-[45px] lg:h-[50px] w-auto object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
          />

          {/* Venue Name Text PNG */}
          <img
            src="/images/logo/logo-txt.png"
            alt={VENUE.name}
            className="h-10 md:h-14 lg:h-[60px] w-auto object-contain mt-1 md:mt-2"
          />
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
            <a href="#book" className="btn-gold-cta !py-2">
              <span className="cta-label">Celebrate at Palki</span>
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
