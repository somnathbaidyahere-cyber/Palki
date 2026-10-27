"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import FramedPhoto, { FRAME_SIZES } from "./FramedPhoto";
import { makeFragments } from "./fragments";
import { playDrop, playBreak } from "./frameAnimations";
import { HERO_PHOTOS } from "@/data/hero";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const START_DELAY = 500; // before the very first frame falls
const HOLD = 1300; // the framed photo rests, fully visible
const PAUSE = 700; // quiet beat before the next frame
const REST_DEG = [-2.5, 2, -1.5, 2.5]; // each frame settles at a slightly different tilt

const frameWidth = (ratio) => (ratio > 1 ? "min(88%, 440px)" : "min(64%, 320px)");
const mq = (q) => typeof window !== "undefined" && window.matchMedia(q).matches;

/*
  One frame at a time:  drop -> rest -> break -> gap -> (next photo) drop ...
  Each phase is an effect keyed on `phase`; the next phase starts only when the
  previous animations have finished, so frames can never overlap.
*/
export default function HeroFrameSequence() {
  const [reduced, setReduced] = useState(null); // null until mounted
  const [inView, setInView] = useState(true);
  const [state, setState] = useState({ round: 0, phase: "idle", frags: null });

  const stageRef = useRef(null);
  const boxRef = useRef(null);
  const shadowRef = useRef(null);
  const partsRef = useRef([]);

  const { round, phase, frags } = state;
  const photo = HERO_PHOTOS[round % HERO_PHOTOS.length];
  const restDeg = REST_DEG[round % REST_DEG.length];
  const go = (from, next) => setState((s) => (s.phase === from ? { ...s, ...next } : s));

  // reduced-motion / no-WAAPI -> static image
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(m.matches || typeof Element.prototype.animate !== "function");
    apply();
    m.addEventListener("change", apply);
    return () => m.removeEventListener("change", apply);
  }, []);

  // pause between frames while the hero is off-screen
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // start (or stop) the loop
  useEffect(() => {
    if (reduced === null) return;
    if (reduced) {
      setState({ round: 0, phase: "idle", frags: null });
      return;
    }
    const t = setTimeout(() => go("idle", { phase: "drop" }), START_DELAY);
    return () => clearTimeout(t);
  }, [reduced]);

  // 1 + 2: drop, impact, one bounce
  useIsoLayoutEffect(() => {
    if (phase !== "drop") return;
    const box = boxRef.current;
    if (!box) return;
    const compact = mq("(max-width: 1023px)");
    // desktop: fall from above the hero. compact: from the top edge of the stage (never over the copy)
    const ref = compact ? stageRef.current : box.closest("section") || stageRef.current;
    const fromTop = box.getBoundingClientRect().bottom - ref.getBoundingClientRect().top + 30;
    const anims = playDrop(box, shadowRef.current, {
      fromTop,
      startDeg: restDeg + (restDeg < 0 ? -11 : 11),
      restDeg,
    });
    let live = true;
    Promise.all(anims.map((a) => a.finished))
      .then(() => live && go("drop", { phase: "rest" }))
      .catch(() => {});
    return () => {
      live = false;
      anims.forEach((a) => a.cancel());
    };
  }, [phase, round]);

  // rest: let the photograph be seen
  useEffect(() => {
    if (phase !== "rest") return;
    const t = setTimeout(() => {
      const small = mq("(max-width: 639px)");
      go("rest", { phase: "break", frags: small ? makeFragments(3, 3) : makeFragments(4, 3) });
    }, HOLD);
    return () => clearTimeout(t);
  }, [phase, round]);

  // 3 + 4: tear apart, become birds, fly away
  useIsoLayoutEffect(() => {
    if (phase !== "break" || !frags) return;
    const box = boxRef.current;
    if (!box) return;
    const anims = playBreak(box, shadowRef.current, frags, partsRef.current, { compact: mq("(max-width: 1023px)") });
    let live = true;
    Promise.all(anims.map((a) => a.finished))
      .then(() => live && go("break", { phase: "gap", frags: null }))
      .catch(() => {});
    return () => {
      live = false;
      anims.forEach((a) => a.cancel());
    };
  }, [phase, round, frags]);

  // 5 + 6: short pause, then the next photograph (loops forever)
  useEffect(() => {
    if (phase !== "gap" || !inView) return;
    const t = setTimeout(() => setState((s) => (s.phase === "gap" ? { round: s.round + 1, phase: "drop", frags: null } : s)), PAUSE);
    return () => clearTimeout(t);
  }, [phase, round, inView]);

  const boxStyle = {
    width: frameWidth(photo.ratio),
    aspectRatio: String(photo.ratio),
    transform: `rotate(${restDeg}deg)`,
    transformOrigin: "50% 100%",
  };

  return (
    <div ref={stageRef} className="pointer-events-none relative flex h-full w-full items-center justify-center max-lg:overflow-hidden">
      {/* soft ambient glow */}
      <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-[#967441]/[0.12] blur-3xl" />

      {/* Reduced motion: one static framed photo */}
      {reduced === true && (
        <div className="relative" style={boxStyle}>
          <div className="absolute inset-x-[8%] -bottom-3 h-5 rounded-[50%] bg-black/50 blur-lg" />
          <div className="h-full w-full" style={{ filter: "drop-shadow(0 22px 28px rgba(0,0,0,0.45))" }}>
            <FramedPhoto src={HERO_PHOTOS[0].src} alt={HERO_PHOTOS[0].alt} priority />
          </div>
        </div>
      )}

      {reduced === false && (
        <>
          {/* warm every photo in the cache before it is needed */}
          <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-[400px] w-[330px]">
            {HERO_PHOTOS.map((p) => (
              <div key={p.src} className="relative h-full w-full">
                <Image src={p.src} alt="" fill sizes={FRAME_SIZES} loading="eager" />
              </div>
            ))}
          </div>

          {phase !== "idle" && (
            <div key={round} ref={boxRef} className="relative will-change-transform" style={boxStyle}>
              {phase !== "gap" && (
                <div ref={shadowRef} className="absolute inset-x-[8%] -bottom-3 h-5 rounded-[50%] bg-black/50 blur-lg" />
              )}

              {(phase === "drop" || phase === "rest") && (
                <div className="h-full w-full" style={{ filter: "drop-shadow(0 22px 28px rgba(0,0,0,0.45))" }}>
                  <FramedPhoto src={photo.src} />
                </div>
              )}

              {phase === "break" &&
                frags?.map((f, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      partsRef.current[i] = { ...(partsRef.current[i] || {}), wrap: el };
                    }}
                    className="absolute inset-0"
                    style={{ transformOrigin: `${f.cx}% ${f.cy}%`, filter: "drop-shadow(0 8px 10px rgba(0,0,0,0.35))" }}
                  >
                    <div
                      ref={(el) => {
                        partsRef.current[i] = { ...(partsRef.current[i] || {}), clip: el };
                      }}
                      className="absolute inset-0"
                      style={{ clipPath: `polygon(${f.poly})` }}
                    >
                      <FramedPhoto src={photo.src} />
                      <div
                        ref={(el) => {
                          partsRef.current[i] = { ...(partsRef.current[i] || {}), tint: el };
                        }}
                        className="absolute inset-0 opacity-0"
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
