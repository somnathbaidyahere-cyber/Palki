"use client";
import "@/app/globals.css";

import { useEffect, useState } from "react";

const INTRO_KEY = "palki-pallu-intro-seen";
// const INTRO_KEY = "palki-pallu-intro-debug";

export default function PalluReveal() {
  const [visible, setVisible] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      return;
    }

    try {
      if (sessionStorage.getItem(INTRO_KEY) === "true") {
        return;
      }
      sessionStorage.setItem(INTRO_KEY, "true");
    } catch {
      // Continue if sessionStorage is unavailable.
    }

    setVisible(true);

    const openTimer = window.setTimeout(() => {
      setOpening(true);
    }, 1100);

    const finishTimer = window.setTimeout(() => {
      setVisible(false);
    }, 2200);

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(finishTimer);
    };
  }, []);

  function skipIntro() {
    setOpening(true);
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 800);
    return () => window.clearTimeout(timer);
  }

  if (!visible) return null;

  return (
    <div
      className={`ribbon-intro ${opening ? "ribbon-intro--opening" : ""}`}
      aria-hidden="true"
    >
      {/* Left Sash Flap */}
      <div className="ribbon-panel ribbon-panel--left">
        <div className="ribbon-shine" />
      </div>

      {/* Right Sash Flap */}
      <div className="ribbon-panel ribbon-panel--right">
        <div className="ribbon-shine" />
      </div>

      {/* Center Ceremonial Seal / Badge */}
      <div className="ribbon-seal">
        <div className="ribbon-seal-inner">
          <span>✨</span>
        </div>
      </div>

      {/* Skip Button */}
      <button
        type="button"
        className="ribbon-skip"
        onClick={skipIntro}
        aria-label="Skip ceremonial intro"
        tabIndex={0}
      >
        Skip intro
      </button>
    </div>
  );
}