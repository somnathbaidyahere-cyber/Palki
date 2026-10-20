"use client";

import { useEffect, useRef, useState } from "react";

export default function HallReveal() {
  const revealRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const element = revealRef.current;

    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      setIsOpen(true);
      return;
    }

    let animationFrame;

    const updateDoorState = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(viewportHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        const visibleRatio = visibleHeight / Math.max(rect.height, 1);

        // Open only when the entire frame fits inside the viewport.
        const fullyVisible = rect.top >= 0 && rect.bottom <= viewportHeight;

        if (fullyVisible) {
          setIsOpen(true);
        } else if (visibleRatio <= 0.3) {
          // Close when 70% or more of the frame is outside.
          setIsOpen(false);
        }
      });
    };

    window.addEventListener("scroll", updateDoorState, {
      passive: true,
    });

    window.addEventListener("resize", updateDoorState);

    updateDoorState();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateDoorState);
      window.removeEventListener("resize", updateDoorState);
    };
  }, []);

  return (
    <div
      ref={revealRef}
      className={`hall-reveal arch ${isOpen ? "is-open" : ""}`}
    >
      {/* Hall image behind the doors */}
      <div className="hall-reveal__scene arch">
        <img
          src="/images/about.svg"
          alt="The main hall at Palki Garden, ready for a wedding celebration"
          className="hall-reveal__image"
        />

        {/* Subtle light escaping from the hall */}
        <div className="hall-reveal__glare" aria-hidden="true" />
      </div>

      {/* Left door */}
      <div
        className="hall-reveal__door hall-reveal__door--left"
        aria-hidden="true"
      >
        <div className="hall-reveal__door-face">
          <div className="hall-reveal__panel-detail">
            <span />
          </div>
        </div>
      </div>

      {/* Right door */}
      <div
        className="hall-reveal__door hall-reveal__door--right"
        aria-hidden="true"
      >
        <div className="hall-reveal__door-face">
          <div className="hall-reveal__panel-detail">
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}
