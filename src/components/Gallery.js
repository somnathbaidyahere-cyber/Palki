"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import { GALLERY } from "@/data/site";

const LOOP_COPIES = 3;

function centeredScrollLeft(track, slide) {
  const trackRect = track.getBoundingClientRect();
  const slideRect = slide.getBoundingClientRect();

  return (
    track.scrollLeft +
    slideRect.left -
    trackRect.left -
    (track.clientWidth - slideRect.width) / 2
  );
}

export default function Gallery() {
  const track = useRef(null);
  const leadingSpacer = useRef(null);
  const trailingSpacer = useRef(null);
  const scrollTimer = useRef(null);
  const frame = useRef(null);

  // Physical index includes the repeated copies.
  const activePhysicalRef = useRef(GALLERY.length);
  const [activePhysical, setActivePhysical] = useState(GALLERY.length);
  const [paused, setPaused] = useState(false);

  const count = GALLERY.length;

  const index =
    count > 0
      ? ((activePhysical % count) + count) % count
      : 0;

  const slides = Array.from(
    { length: LOOP_COPIES },
    (_, copy) =>
      GALLERY.map((item, i) => ({
        ...item,
        logicalIndex: i,
        physicalIndex: copy * count + i,
        copy,
      }))
  ).flat();

  const goToPhysical = useCallback((physicalIndex) => {
    const el = track.current;
    if (!el || !count) return;

    const target = el.children[physicalIndex + 1];
    // Child 0 is the leading spacer.
    if (!target) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    el.scrollTo({
      left: centeredScrollLeft(el, target),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [count]);

  const syncActiveCard = useCallback(() => {
    const el = track.current;
    if (!el || !count) return;

    const center =
      el.getBoundingClientRect().left + el.clientWidth / 2;

    let nearest = 0;
    let nearestDistance = Infinity;

    // Ignore the two edge spacers.
    Array.from(el.children)
      .slice(1, -1)
      .forEach((slide, i) => {
        const rect = slide.getBoundingClientRect();
        const distance = Math.abs(
          rect.left + rect.width / 2 - center
        );

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = i;
        }
      });

    activePhysicalRef.current = nearest;
    setActivePhysical((current) =>
      current === nearest ? current : nearest
    );
  }, [count]);

  const recenterIfNeeded = useCallback(() => {
    const el = track.current;
    if (!el || count < 2) return;

    const physical = activePhysicalRef.current;

    // First copy -> equivalent card in the middle copy.
    // Last copy -> equivalent card in the middle copy.
    let replacement = physical;

    if (physical < count) {
      replacement = physical + count;
    } else if (physical >= count * 2) {
      replacement = physical - count;
    }

    if (replacement === physical) return;

    const target = el.children[replacement + 1];
    if (!target) return;

    // The repeated copies have identical content, so this
    // instant repositioning is visually indistinguishable.
    const left = centeredScrollLeft(el, target);

    el.scrollLeft = left;

    activePhysicalRef.current = replacement;
    setActivePhysical(replacement);
  }, [count]);

  const onScroll = useCallback(() => {
    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
    }

    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      syncActiveCard();
    });

    // Recenter only after scrolling settles, never during a swipe.
    if (scrollTimer.current !== null) {
      window.clearTimeout(scrollTimer.current);
    }

    scrollTimer.current = window.setTimeout(() => {
      recenterIfNeeded();
      syncActiveCard();
    }, 160);
  }, [recenterIfNeeded, syncActiveCard]);

  const next = useCallback(() => {
    if (count < 2) return;

    let physical = activePhysicalRef.current;

    // Keep a spare copy available in the direction of travel.
    if (physical >= count * 2 - 1) {
      physical -= count;
      activePhysicalRef.current = physical;
      setActivePhysical(physical);
      goToPhysical(physical);
    }

    goToPhysical(physical + 1);
  }, [count, goToPhysical]);

  const prev = useCallback(() => {
    if (count < 2) return;

    let physical = activePhysicalRef.current;

    if (physical <= count) {
      physical += count;
      activePhysicalRef.current = physical;
      setActivePhysical(physical);
      goToPhysical(physical);
    }

    goToPhysical(physical - 1);
  }, [count, goToPhysical]);

  const goToLogical = useCallback((logicalIndex) => {
    const physical = activePhysicalRef.current;

    // Choose the closest copy of the requested card.
    const candidates = [
      logicalIndex,
      count + logicalIndex,
      count * 2 + logicalIndex,
    ];

    const target = candidates.reduce((best, candidate) =>
      Math.abs(candidate - physical) <
      Math.abs(best - physical)
        ? candidate
        : best
    );

    goToPhysical(target);
  }, [count, goToPhysical]);

  // Calculate edge space so the first and last cards can center.
  const updateEdgeSpacers = useCallback(() => {
    const el = track.current;
    const firstSlide = el?.children[1];

    if (!el || !firstSlide) return;

    const width = Math.max(
      0,
      (el.clientWidth -
        firstSlide.getBoundingClientRect().width) /
        2
    );

    if (leadingSpacer.current) {
      leadingSpacer.current.style.width = `${width}px`;
    }

    if (trailingSpacer.current) {
      trailingSpacer.current.style.width = `${width}px`;
    }
  }, []);

  useEffect(() => {
    if (!count) return;

    const el = track.current;
    if (!el) return;

    const initialFrame = requestAnimationFrame(() => {
      updateEdgeSpacers();

      // Start at the first card of the middle copy.
      const target = el.children[count + 1];
      if (!target) return;

      el.scrollLeft = centeredScrollLeft(el, target);
      activePhysicalRef.current = count;
      setActivePhysical(count);
    });

    const observer = new ResizeObserver(() => {
      updateEdgeSpacers();

      const target =
        el.children[activePhysicalRef.current + 1];

      if (target) {
        el.scrollLeft = centeredScrollLeft(el, target);
      }
    });

    observer.observe(el);

    return () => {
      cancelAnimationFrame(initialFrame);
      observer.disconnect();
    };
  }, [count, updateEdgeSpacers]);

  useEffect(() => {
    return () => {
      if (frame.current !== null) {
        cancelAnimationFrame(frame.current);
      }

      if (scrollTimer.current !== null) {
        window.clearTimeout(scrollTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (
      paused ||
      count < 2 ||
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return;
    }

    const timer = window.setInterval(next, 3100);

    return () => window.clearInterval(timer);
  }, [paused, next, count]);

  return (
    <section id="gallery" className="py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          title="Moments from past events"
          text="A few of the celebrations we have been proud to host."
        />
      </div>

      <div
        className="relative mx-auto mt-14 max-w-[1500px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(event) => {
          if (
            !event.currentTarget.contains(event.relatedTarget)
          ) {
            setPaused(false);
          }
        }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Event photo gallery"
      >
        <div
          ref={track}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto py-4 scroll-smooth"
        >
          <div
            ref={leadingSpacer}
            aria-hidden="true"
            className="shrink-0"
          />

          {slides.map((g) => {
            const isActive =
              g.physicalIndex === activePhysical;

            const distance = Math.abs(
              g.physicalIndex - activePhysical
            );

            const cardStyle = isActive
              ? "-translate-y-2 scale-[1.03] opacity-100"
              : distance === 1
                ? "scale-[0.985] opacity-[0.84]"
                : "scale-[0.96] opacity-[0.68]";

            return (
              <figure
                key={`${g.copy}-${g.src}`}
                className={`w-[82%] shrink-0 snap-center sm:w-[46%] lg:w-[31%] transform-gpu transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${cardStyle}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${g.logicalIndex + 1} of ${count}: ${g.caption}`}
                aria-hidden={g.copy !== 1 && !isActive}
              >
                <div
                  className={`aspect-[4/5] overflow-hidden border border-gold/60 bg-white p-2 transition-shadow duration-700 motion-reduce:transition-none ${
                    isActive
                      ? "shadow-[0_18px_38px_-14px_rgba(80,30,35,0.32)]"
                      : "shadow-md"
                  }`}
                >
                  <img
                    src={g.src}
                    alt={g.caption}
                    loading={
                      g.physicalIndex === count ? "eager" : "lazy"
                    }
                    draggable="false"
                    className={`h-full w-full select-none object-cover transition-[filter] duration-700 motion-reduce:transition-none ${
                      isActive
                        ? "brightness-100"
                        : distance === 1
                          ? "brightness-[0.94]"
                          : "brightness-[0.88]"
                    }`}
                  />
                </div>

                <figcaption
                  className={`mt-3 text-center font-display text-xl ${
                    isActive ? "text-maroon" : "text-maroon/70"
                  }`}
                >
                  {g.caption}
                </figcaption>
              </figure>
            );
          })}

          <div
            ref={trailingSpacer}
            aria-hidden="true"
            className="shrink-0"
          />
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-2 top-[40%] z-20 hidden h-12 w-12 items-center justify-center bg-maroon text-gold-light shadow-lg transition hover:bg-maroon-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:flex"
        >
          <ChevronLeft />
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next photo"
          className="absolute right-2 top-[40%] z-20 hidden h-12 w-12 items-center justify-center bg-maroon text-gold-light shadow-lg transition hover:bg-maroon-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:flex"
        >
          <ChevronRight />
        </button>
      </div>

      <div
        className="mt-8 flex justify-center gap-2"
        role="group"
        aria-label="Choose gallery photo"
      >
        {GALLERY.map((g, i) => (
          <button
            key={g.src}
            type="button"
            onClick={() => goToLogical(i)}
            aria-label={`Go to photo ${i + 1}: ${g.caption}`}
            aria-current={i === index ? "true" : undefined}
            className={`h-2 rounded-full transition-all duration-500 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
              i === index
                ? "w-8 bg-gold"
                : "w-2 bg-maroon/25 hover:bg-maroon/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

