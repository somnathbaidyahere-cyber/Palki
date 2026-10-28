
"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

export default function VideoCard({
  name,
  event,
  video,
  poster,
  nextPoster,
  folding = false,
}) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  async function toggle() {
    const v = ref.current;
    if (!v || folding) return;

    if (v.paused) {
      try {
        await v.play();
      } catch (error) {
        console.error("Unable to play testimonial video:", error);
      }
    } else {
      v.pause();
    }
  }

  return (
    <figure className="text-center">
      <div className="arch relative mx-auto aspect-[4/5] w-full max-w-[15rem] overflow-hidden border border-gold p-1.5 sm:aspect-[3/4] sm:max-w-[16rem] lg:aspect-[3/5] lg:max-w-[17rem] xl:max-w-[18rem]">
        <div className="arch relative h-full w-full overflow-hidden bg-maroon-deep">
          {/* The next thumbnail sits underneath the current image. */}
          {folding && nextPoster && (
            <img
              src={nextPoster}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 z-10 h-full w-full object-cover"
            />
          )}

          <video
            ref={ref}
            src={video}
            poster={poster}
            playsInline
            preload="none"
            controls={playing && !folding}
            onPlay={() => setPlaying(true)}
            onEnded={() => setPlaying(false)}
            className="absolute inset-0 z-0 h-full w-full object-cover"
          />

          {/* Current thumbnail split into two independent panels. */}
          {folding && poster && (
            <div
              className="testimonial-fold-overlay absolute inset-0 z-20"
              aria-hidden="true"
            >
              <div className="testimonial-fold-panel testimonial-fold-top">
                <img
                  src={poster}
                  alt=""
                  className="testimonial-fold-image testimonial-fold-image-top"
                />
              </div>

              <div className="testimonial-fold-panel testimonial-fold-bottom">
                <img
                  src={poster}
                  alt=""
                  className="testimonial-fold-image testimonial-fold-image-bottom"
                />
              </div>
            </div>
          )}

          {!playing && !folding && (
            <button
              type="button"
              onClick={toggle}
              aria-label={`Play video from ${name}`}
              className="absolute inset-0 z-30 flex items-center justify-center bg-maroon-deep/30 transition-colors duration-300 hover:bg-maroon-deep/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-maroon-deep shadow-xl transition-transform duration-300 hover:scale-105 sm:h-16 sm:w-16">
                <Play
                  className="ml-1 h-6 w-6 sm:h-7 sm:w-7"
                  fill="currentColor"
                  aria-hidden="true"
                />
              </span>
            </button>
          )}
        </div>
      </div>

      <figcaption className="mt-4">
        <p className="font-display text-xl font-semibold text-gold-light sm:text-2xl">
          {name}
        </p>
        <p className="mt-0.5 text-sm text-ivory/70">
          {event} at Palki
        </p>
      </figcaption>
    </figure>
  );
}
