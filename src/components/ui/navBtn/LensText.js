
"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./LensText.module.css";

const TRAVEL = 1.25;

export default function LensText({ text, className = "" }) {
  const rootRef = useRef(null);
  const charRefs = useRef([]);
  const [delays, setDelays] = useState(null);

  const chars = Array.from(text);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const measure = () => {
      const W = root.offsetWidth;
      if (!W) return;

      const nextDelays = chars.map((_, i) => {
        const el = charRefs.current[i];
        if (!el) return 0;

        const center = el.offsetLeft + el.offsetWidth / 2;

        return (center / W) * TRAVEL;
      });

      setDelays(nextDelays);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(root);

    document.fonts?.ready.then(measure);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span
      ref={rootRef}
      className={`${styles.root} ${delays ? styles.ready : ""} ${className}`}
    >
      <span className="sr-only">{text}</span>

      <b aria-hidden="true" className={`${styles.text} font-[inherit]`}>
        {chars.map((ch, i) => (
          <b
            key={i}
            ref={(el) => (charRefs.current[i] = el)}
            className={styles.char}
            style={{
              fontWeight: "inherit",
              ...(delays
                ? { "--d": `${delays[i].toFixed(3)}s` }
                : {}),
            }}
          >
            {ch}
          </b>
        ))}
      </b>
    </span>
  );
}
