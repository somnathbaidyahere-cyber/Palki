"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Ornament from "../ui/Ornament";
import JourneyRail from "./JourneyRail";
import JourneyStage from "./JourneyStage";
import JourneyStep from "./JourneyStep";
import RoomSwitcher from "./RoomSwitcher";
import { JOURNEY_STOPS } from "@/data/journey";
import { ROOMS, VENUE } from "@/data/site";

export default function JourneyExplorer() {
  const stops = JOURNEY_STOPS;
  const [active, setActive] = useState(0);
  const [roomIndex, setRoomIndex] = useState(0);

  const stepRefs = useRef([]);
  const lock = useRef(null); // index we are programmatically scrolling to
  const lockTimer = useRef(null);

  // Scroll tracking: a thin band through the middle of the viewport activates the step it crosses.
  // Works the same scrolling up or down.
  useEffect(() => {
    const els = stepRefs.current.filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = Number(entry.target.dataset.index);
          if (lock.current !== null) {
            if (lock.current !== i) continue; // ignore steps we are just passing during a rail click
            lock.current = null;
          }
          setActive(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));

    // user takes over scrolling: stop ignoring steps
    const release = () => {
      lock.current = null;
    };
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchstart", release, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
      clearTimeout(lockTimer.current);
    };
  }, []);

  const goTo = useCallback((i) => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    lock.current = i;
    setActive(i);
    stepRefs.current[i]?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
    });
    clearTimeout(lockTimer.current);
    lockTimer.current = setTimeout(() => {
      lock.current = null;
    }, 1500);
  }, []);

  // Rooms stop reads from ROOMS; every other stop reads its own image.
  const media = (stop) =>
    stop.id === "rooms" && ROOMS.length
      ? { image: ROOMS[roomIndex].image, alt: ROOMS[roomIndex].title }
      : { image: stop.image, alt: stop.alt };

  const current = media(stops[active]);

  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="bg-[#F8F4EC] py-24 text-[#32151D] sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <h2
            id="journey-title"
            className="font-display text-4xl font-semibold leading-tight sm:text-5xl"
          >
            A day at {VENUE.name}
          </h2>
          <Ornament className="mt-5" />
          <p className="mt-5 text-lg leading-relaxed text-[#32151D]/75">
            Follow the path your guests will take, from arrival to the last
            quiet moments of the evening.
          </p>
        </header>

        <div className="mt-14 lg:mt-20 lg:grid lg:grid-cols-[10rem_minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-12">
          <JourneyRail stops={stops} active={active} onSelect={goTo} />

          <ol className="list-none">
            {stops.map((stop, i) => {
              const m = media(stop);
              return (
                <JourneyStep
                  key={stop.id}
                  stop={stop}
                  index={i}
                  total={stops.length}
                  active={i === active}
                  image={m.image}
                  alt={m.alt}
                  registerRef={(el) => (stepRefs.current[i] = el)}
                >
                  {stop.id === "rooms" && ROOMS.length > 0 && (
                    <RoomSwitcher
                      rooms={ROOMS}
                      value={roomIndex}
                      onChange={setRoomIndex}
                    />
                  )}
                </JourneyStep>
              );
            })}
          </ol>

          {/* Pinned featured image (desktop only): one image at a time */}
          <div className="hidden lg:sticky lg:top-24 lg:block lg:h-[calc(100vh-8rem)] lg:max-h-[800px] lg:self-start">
            <JourneyStage
              stop={stops[active]}
              index={active}
              total={stops.length}
              image={current.image}
              alt={current.alt}
            />
          </div>
        </div>

        {/* Closing CTA */}
        <div className="jaali cta-reveal group relative isolate mt-12 md:mt-16 lg:mt-20 overflow-hidden rounded-[2rem] bg-[#32151D] px-6 py-10 md:py-14 text-center text-[#F8F4EC] lg:py-20">
          {/* Background image */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[url('/images/palki-garden-venue-og.jpg')] bg-cover bg-center"
          />

          {/* Dark tint over the photo */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[#32151D]/35"
          />

          {/* Jaali overlay: initially covers the right half */}
          <div
            aria-hidden="true"
            className="cta-jaali absolute inset-y-0 right-0 z-0 w-full lg:w-4/5 bg-[#32151D] transition-transform duration-1000 ease-in-out group-hover:translate-x-full"
          />

          {/* CTA content */}
          <div className="relative z-10">
            <h3 className="mx-auto max-w-2xl font-display text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight lg:text-5xl">
              Every special moment deserves a Palki.
            </h3>

            <a href="#book" className="btn-gold mt-9 gap-2">
              Check availability
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
