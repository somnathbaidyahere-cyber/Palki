"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import JourneyBadges from "./JourneyBadges";
import { pad } from "@/data/journey";
import styles from "./journey.module.css";

// One-time reveal for the mobile image panel.
function useRevealOnce() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, seen];
}

export default function JourneyStep({ stop, index, total, active, image, alt, registerRef, children }) {
  const [revealRef, seen] = useRevealOnce();

  return (
    <li
      ref={registerRef}
      data-index={index}
      aria-current={active ? "step" : undefined}
      className="py-8 lg:flex lg:min-h-[82vh] lg:flex-col lg:justify-center lg:py-0"
    >
      {/* Mobile / tablet: the photo lives in the flow. On desktop it lives in the pinned stage. */}
      <div
        ref={revealRef}
        className={`transition duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none lg:hidden ${
          seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[#32151D] shadow-xl sm:aspect-[16/11]">
          <div key={image} className={`absolute inset-0 ${styles.fadeIn}`}>
            <Image src={image} alt={alt} fill sizes="(min-width: 640px) 90vw, 100vw" className="object-cover" />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#32151D]/55 via-transparent to-[#32151D]/10" />
          <JourneyBadges stop={stop} index={index} total={total} />
        </div>
      </div>

      <div className={`mt-6 transition-opacity duration-500 lg:mt-0 ${active ? "" : "lg:opacity-30"}`}>
        <p className="font-display text-5xl text-[#967441]">{pad(index + 1)}</p>
        <h3 className="mt-1 font-display text-4xl font-semibold sm:text-5xl">{stop.name}</h3>
        <p className="mt-2 font-display text-2xl italic text-[#967441]">{stop.tagline}</p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </li>
  );
}
