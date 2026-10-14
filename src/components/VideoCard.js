"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

export default function VideoCard({ name, event, video, poster }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  }

  return (
    <figure className="text-center">
      <div className="arch relative mx-auto aspect-[9/14] max-w-[18rem] overflow-hidden border border-gold p-2">
        <div className="arch relative h-full w-full overflow-hidden bg-maroon-deep">
          <video
            ref={ref}
            src={video}
            poster={poster}
            playsInline
            preload="none"
            controls={playing}
            onPlay={() => setPlaying(true)}
            onEnded={() => setPlaying(false)}
            className="h-full w-full object-cover"
          />
          {!playing && (
            <button
              type="button"
              onClick={toggle}
              aria-label={`Play video from ${name}`}
              className="absolute inset-0 flex items-center justify-center bg-maroon-deep/30 transition hover:bg-maroon-deep/10"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-maroon-deep shadow-xl">
                <Play className="ml-1 h-7 w-7" fill="currentColor" />
              </span>
            </button>
          )}
        </div>
      </div>
      <figcaption className="mt-5">
        <p className="font-display text-2xl font-semibold text-gold-light">{name}</p>
        <p className="text-ivory/70">{event} at Palki</p>
      </figcaption>
    </figure>
  );
}
