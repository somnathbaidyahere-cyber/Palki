
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SectionHeading from "./ui/SectionHeading";
import VideoCard from "./VideoCard";
import { TESTIMONIALS } from "@/data/site";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DESKTOP_PAGE_SIZE = 3;
const FOLD_DURATION = 1000;

export default function Testimonials() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DESKTOP_PAGE_SIZE);
  const [pendingPage, setPendingPage] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  const timerRef = useRef(null);
  const pageRef = useRef(0);
  const transitioningRef = useRef(false);

  const total = TESTIMONIALS.length;
  const totalPages = Math.ceil(total / pageSize);

  // Keep refs synchronized so rapid clicks cannot start
  // overlapping transitions.
  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    transitioningRef.current = transitioning;
  }, [transitioning]);

  // Responsive pagination: three videos on desktop,
  // one video at a time on smaller screens.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    function updatePageSize() {
      const nextSize = media.matches ? 3 : 1;

      window.clearTimeout(timerRef.current);
      transitioningRef.current = false;

      setPageSize(nextSize);
      setPage(0);
      setPendingPage(null);
      setTransitioning(false);
      pageRef.current = 0;
    }

    updatePageSize();
    media.addEventListener("change", updatePageSize);

    return () => {
      media.removeEventListener("change", updatePageSize);
      window.clearTimeout(timerRef.current);
    };
  }, []);

  const navigate = useCallback(
    (direction) => {
      if (transitioningRef.current || total === 0) return;

      const currentPage = pageRef.current;
      const nextPage = currentPage + direction;

      if (nextPage < 0 || nextPage >= totalPages) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // No animation needed when reduced motion is preferred.
      if (reducedMotion) {
        pageRef.current = nextPage;
        setPage(nextPage);
        setPendingPage(null);
        return;
      }

      // Prepare the destination BEFORE starting the fold.
      // This makes its poster available underneath the old one.
      transitioningRef.current = true;
      setPendingPage(nextPage);
      setTransitioning(true);

      window.clearTimeout(timerRef.current);

      timerRef.current = window.setTimeout(() => {
        pageRef.current = nextPage;
        setPage(nextPage);
        setPendingPage(null);
        setTransitioning(false);
        transitioningRef.current = false;
      }, FOLD_DURATION);
    },
    [total, totalPages]
  );

  if (total === 0) return null;

  // Keep the current cards mounted throughout the animation.
  const currentItems = TESTIMONIALS.slice(
    page * pageSize,
    page * pageSize + pageSize
  );

  // Resolve destination cards from the pending page, not
  // from page + 1. This also handles backwards navigation.
  const destinationPage = pendingPage ?? page;
  const targetItems = TESTIMONIALS.slice(
    destinationPage * pageSize,
    destinationPage * pageSize + pageSize
  );

  return (
    <section
      id="stories"
      className="jaali overflow-hidden bg-maroon-deep py-16 text-ivory sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          dark
          // title="In our guests' words"
          title="Palki, our Guests and some beautiful memories."
          // text="Hear what our guests' celebrations at Palki meant to them."
          text="This is how our guests enjoyed at Palki Garden."
        />

        <div
          className="relative mt-12 sm:mt-16"
          role="region"
          aria-label="Guest video testimonials"
          aria-roledescription="carousel"
        >
          <div
            className={`grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 ${
              transitioning ? "testimonial-folding" : ""
            }`}
          >
            {currentItems.map((testimonial, i) => (
              <VideoCard
                key={`${page}-${testimonial.name}`}
                {...testimonial}
                nextPoster={targetItems[i]?.poster ?? null}
                folding={transitioning}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={page === 0 || transitioning}
                aria-label="Previous testimonials"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-gold-light transition duration-300 hover:-translate-x-1 hover:bg-gold hover:text-maroon-deep disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft
                  className="h-5 w-5 transition-transform group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
              </button>

              <span
                className="min-w-24 text-center text-sm text-ivory/75"
                aria-live="polite"
              >
                {page + 1} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() => navigate(1)}
                disabled={
                  page >= totalPages - 1 || transitioning
                }
                aria-label="Next testimonials"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-gold-light transition duration-300 hover:translate-x-1 hover:bg-gold hover:text-maroon-deep disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
