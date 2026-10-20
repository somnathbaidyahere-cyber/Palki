"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import { GALLERY } from "@/data/site";

export default function Gallery() {
  const track = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i) => {
    const el = track.current;
    if (!el) return;
    const slide = el.children[i];
    if (slide) el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, []);

  const next = useCallback(() => goTo((index + 1) % GALLERY.length), [goTo, index]);
  const prev = () => goTo((index - 1 + GALLERY.length) % GALLERY.length);

  // keep the active dot in sync with swipes / scrolling
  function onScroll() {
    const el = track.current;
    if (!el) return;
    const slideW = el.children[0].getBoundingClientRect().width;
    setIndex(Math.round(el.scrollLeft / (slideW + 24)));
  }

  // gentle autoplay, paused on hover/focus and skipped for reduced motion
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section id="gallery" className="py-16 sm:py-24  md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading title="Moments from past events" text="A few of the celebrations we have been proud to host." />
      </div>

      <div
        className="relative mx-auto mt-14 max-w-[1500px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        role="region"
        aria-roledescription="carousel"
        aria-label="Event photo gallery"
      >
        <div ref={track} onScroll={onScroll} className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 sm:px-8">
          {GALLERY.map((g, i) => (
            <figure key={g.src} className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]" aria-label={`${i + 1} of ${GALLERY.length}`}>
              <div className="aspect-[4/5] overflow-hidden border border-gold/60 p-2">
                <img src={g.src} alt={g.caption} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <figcaption className="mt-3 text-center font-display text-xl text-maroon">{g.caption}</figcaption>
            </figure>
          ))}
        </div>

        <button onClick={prev} aria-label="Previous photo" className="absolute left-2 top-[40%] hidden h-12 w-12 items-center justify-center bg-maroon text-gold-light shadow-lg transition hover:bg-maroon-soft sm:flex">
          <ChevronLeft />
        </button>
        <button onClick={next} aria-label="Next photo" className="absolute right-2 top-[40%] hidden h-12 w-12 items-center justify-center bg-maroon text-gold-light shadow-lg transition hover:bg-maroon-soft sm:flex">
          <ChevronRight />
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-2" role="tablist" aria-label="Choose photo">
        {GALLERY.map((g, i) => (
          <button
            key={g.src}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to photo ${i + 1}`}
            className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-gold" : "w-2 bg-maroon/25 hover:bg-maroon/50"}`}
          />
        ))}
      </div>
    </section>
  );
}
