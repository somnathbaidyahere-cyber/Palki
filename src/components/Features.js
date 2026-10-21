"use client";

import { useRef } from "react";
import SectionHeading from "./ui/SectionHeading";
import FeatureIcon from "./ui/FeatureIcon";
import { FEATURES } from "@/data/site";

export default function Features() {
  const gridRef = useRef(null);

  // Desktop 3D tilt effect
  const handleMouseMove = (e) => {
    if (window.innerWidth < 640) return;

    const cards = gridRef.current?.querySelectorAll(".feature-card");

    cards?.forEach((card) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xc = rect.width / 2;
      const yc = rect.height / 2;

      const dx = (x - xc) / xc;
      const dy = (y - yc) / yc;

      card.style.setProperty("--rotate-x", `${(-dy * 4).toFixed(2)}deg`);

      card.style.setProperty("--rotate-y", `${(dx * 4).toFixed(2)}deg`);
    });
  };

  const handleMouseLeave = () => {
    const cards = gridRef.current?.querySelectorAll(".feature-card");

    cards?.forEach((card) => {
      card.style.setProperty("--rotate-x", "0deg");
      card.style.setProperty("--rotate-y", "0deg");
    });
  };

  return (
    <section
      id="features"
      className="jaali relative bg-maroon py-16 text-ivory sm:py-24 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          dark
          title="Everything your event needs"
          text="Space, comfort and safety, with the details planned so your family can focus on the day."
        />

        <ul
          ref={gridRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="
  features-grid
  mt-16
  flex flex-col gap-0
  sm:grid sm:grid-cols-2 sm:gap-px
  sm:overflow-hidden sm:border sm:border-gold/30 sm:bg-gold/30
  md:grid-cols-3
"
        >
          {FEATURES.map((f, index) => (
            <li
              key={f.title}
              style={{
                "--card-index": index,
                "--stack-index": index + 1,
              }}
              className="
                feature-card
                group relative isolate
                overflow-hidden
                rounded-2xl border border-gold/35
                bg-maroon p-8
                shadow-2xl
                transition-colors duration-500
                hover:bg-maroon-soft
                sm:rounded-none sm:border-0 sm:shadow-none
              "
            >
              {/* Existing gold shimmer */}
              <span
                aria-hidden="true"
                className="feature-card__sweep pointer-events-none absolute inset-0 -z-10"
              />

              {/* Feature icon */}
              <div className="relative z-10">
                <FeatureIcon
                  name={f.icon}
                  className="
                    feature-card__icon
                    h-5 w-5
                    md:h-7 md:w-7
                    lg:h-9 lg:w-9 text-gold
                    transition-all duration-500
                    group-hover:scale-110
                    group-hover:text-gold-light
                  "
                />
              </div>

              {/* Feature title */}
              <h3
                className="
                  relative z-10 mt-2 md:mt-3 lg:mt-5
                  text-lg
                  md:text-xl
                  lg:text-2xl font-semibold
                  text-gold-light
                  transition-colors duration-300
                "
              >
                {f.title}
              </h3>

              {/* Feature description */}
              <p className="relative z-10 mt-2 text-sm md:text-base leading-relaxed text-ivory/75">
                {f.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
