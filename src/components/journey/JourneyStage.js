"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import JourneyBadges from "./JourneyBadges";
import styles from "./journey.module.css";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Shows ONE image at a time. When the active stop changes the new image slides in
// (direction follows scroll direction) while the old one fades out beneath it.
// When only the room option changes, the image cross-fades instead.
export default function JourneyStage({ stop, index, total, image, alt }) {
  const key = `${stop.id}|${image}`;
  const make = (mode, dir) => ({ key, image, alt, index, stopId: stop.id, mode, dir });

  const [layers, setLayers] = useState(() => ({ cur: make("initial", 1), prev: null }));

  // Derive the next layer during render so each activation triggers exactly once.
  if (layers.cur.key !== key) {
    const stopChanged = layers.cur.stopId !== stop.id;
    setLayers({
      cur: make(stopChanged ? "slide" : "fade", index >= layers.cur.index ? 1 : -1),
      prev: layers.cur,
    });
  }

  // Drop the outgoing layer once its fade has finished.
  useEffect(() => {
    if (!layers.prev) return;
    const t = setTimeout(() => setLayers((l) => ({ ...l, prev: null })), 1000);
    return () => clearTimeout(t);
  }, [layers.prev]);

  const { cur, prev } = layers;
  const motionClass = cur.mode === "slide" ? styles.slideIn : cur.mode === "fade" ? styles.fadeIn : "";

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-[#32151D] shadow-[0_30px_80px_-30px_rgba(50,21,29,0.55)] ring-1 ring-[#967441]/30">
      {prev && !reducedMotion() && (
        <div key={`p-${prev.key}`} className={`absolute inset-0 ${styles.fadeOut}`}>
          <Image src={prev.image} alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        </div>
      )}

      <div key={cur.key} className={`absolute inset-0 ${motionClass}`} style={{ "--from": `${cur.dir * 64}px` }}>
        <Image
          src={cur.image}
          alt={cur.alt}
          fill
          priority={cur.index === 0}
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      </div>

      {/* soft scrim so badges stay readable on any photo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#32151D]/55 via-transparent to-[#32151D]/15" />

      <JourneyBadges stop={stop} index={index} total={total} />
    </div>
  );
}
