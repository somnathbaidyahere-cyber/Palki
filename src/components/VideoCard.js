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
      {/* Video frame */}
      <div className="arch relative mx-auto aspect-[4/5] w-full max-w-[15rem] overflow-hidden border border-gold p-1.5 sm:aspect-[3/4] sm:max-w-[16rem] lg:aspect-[3/5] lg:max-w-[17rem] xl:max-w-[18rem]">
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
              className="absolute inset-0 flex items-center justify-center bg-maroon-deep/30 transition-colors duration-300 hover:bg-maroon-deep/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-maroon-deep shadow-xl transition-transform duration-300 hover:scale-105 sm:h-16 sm:w-16">
                <Play
                  className="ml-1 h-6 w-6 sm:h-7 sm:w-7"
                  fill="currentColor"
                />
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Caption */}
      <figcaption className="mt-4">
        <p className="font-display text-xl font-semibold text-gold-light sm:text-2xl">
          {name}
        </p>

        <p className="mt-0.5 text-sm text-ivory/70">{event} at Palki</p>
      </figcaption>
    </figure>
  );
}
