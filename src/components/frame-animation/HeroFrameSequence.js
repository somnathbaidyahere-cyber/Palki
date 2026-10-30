"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import FramedPhoto, { FRAME_SIZES } from "./FramedPhoto";
import PetalLayer from "./PetalLayer";
import { playDrop, playFrameExit } from "./frameAnimations";
import { HERO_PHOTOS } from "@/data/hero";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const START_DELAY = 500; // before the very first frame falls
const OVERLAP = 1400; // the next frame starts falling this long after the petals begin to swirl away
const REST_DEG = [-2.5, 2, -1.5, 2.5]; // each frame settles at a slightly different tilt

const frameWidth = (ratio) => (ratio > 1 ? "min(88%, 440px)" : "min(64%, 320px)");
const mq = (q) => typeof window !== "undefined" && window.matchMedia(q).matches;

/*
  drop -> shower -> disperse -> (next frame drops while the petals are still clearing) -> drop ...

  drop      frame falls, lands softly, bounces once, settles
  shower    petals start falling straight away and thicken until the frame is fully hidden
  disperse  the hidden frame fades out; the petals swirl outward/up; OVERLAP ms later the next frame enters
*/
export default function HeroFrameSequence() {
  const [reduced, setReduced] = useState(null); // null until mounted
  const [inView, setInView] = useState(true);
  const [state, setState] = useState({ round: 0, phase: "idle" });

  const stageRef = useRef(null);
  const boxRef = useRef(null);
  const shadowRef = useRef(null);
  const petalsRef = useRef(null);

  const { round, phase } = state;
  const photo = HERO_PHOTOS[round % HERO_PHOTOS.length];
  const restDeg = REST_DEG[round % REST_DEG.length];
  const go = (from, next) => setState((s) => (s.phase === from ? { ...s, ...next } : s));

  // frame position relative to the stage, for the petals
  const measure = () => {
    const stage = stageRef.current;
    const box = boxRef.current;
    if (!stage || !box) return null;
    const s = stage.getBoundingClientRect();
    const b = box.getBoundingClientRect();
    const hero = stage.closest("section")?.getBoundingClientRect();
    return {
      fx: b.left + b.width / 2 - s.left,
      fy: b.top + b.height / 2 - s.top,
      fw: b.width,
      fh: b.height,
      sh: s.height,
      heroOffset: hero ? Math.max(0, s.top - hero.top) : 0,
      compact: mq("(max-width: 1023px)"),
    };
  };

  // reduced-motion / no-WAAPI -> static image
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(m.matches || typeof Element.prototype.animate !== "function");
    apply();
    m.addEventListener("change", apply);
    return () => m.removeEventListener("change", apply);
  }, []);

  // hold the next frame back while the hero is off-screen
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
      setState({ round: 0, phase: "idle" });
      return;
    }
    const t = setTimeout(() => go("idle", { phase: "drop" }), START_DELAY);
    return () => clearTimeout(t);
  }, [reduced]);

  // 1 + 2: drop, soft landing, one gentle bounce
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
      .then(() => live && go("drop", { phase: "shower" }))
      .catch(() => {});
    return () => {
      live = false;
      anims.forEach((a) => a.cancel());
    };
  }, [phase, round]);

  // 3 + 4: the petal shower starts the moment the frame has landed and thickens until it is hidden.
  // (If the previous round's petals are still clearing, it waits for them: petals never pile up.)
  useEffect(() => {
    if (phase !== "shower") return;
    let live = true;
    const petals = petalsRef.current;
    if (!petals) return;
    petals
      .whenClear()
      .then(() => {
        if (!live) return;
        const L = measure();
        return L && petals.shower(L);
      })
      .then(() => live && go("shower", { phase: "disperse" }))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [phase, round]);

  // 5: with the frame fully hidden, it fades out unseen and the petals swirl away
  useEffect(() => {
    if (phase !== "disperse") return;
    if (boxRef.current) playFrameExit(boxRef.current);
    petalsRef.current?.disperse();
  }, [phase, round]);

  // 6: the next frame enters while the petals are still clearing
  useEffect(() => {
    if (phase !== "disperse" || !inView) return;
    const t = setTimeout(() => setState((s) => (s.phase === "disperse" ? { round: s.round + 1, phase: "drop" } : s)), OVERLAP);
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
              <div ref={shadowRef} className="absolute inset-x-[8%] -bottom-3 h-5 rounded-[50%] bg-black/50 blur-lg" />
              <div className="h-full w-full" style={{ filter: "drop-shadow(0 22px 28px rgba(0,0,0,0.45))" }}>
                <FramedPhoto src={photo.src} />
              </div>
            </div>
          )}

          {/* petals sit in front of the frame */}
          <PetalLayer ref={petalsRef} />
        </>
      )}
    </div>
  );
}
