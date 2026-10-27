import HeroFrameSequence from "./hero/HeroFrameSequence";

export default function Hero() {
  return (
    <section
      id="top"
      className="jaali relative overflow-hidden bg-maroon-deep pt-24 pb-20 text-ivory sm:pt-36 lg:pb-28 lg:pt-28"
    >
      {/* Original background glow */}
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Main hero content */}
      <div className="relative z-10 mx-auto grid min-h-[540px] max-w-7xl items-center gap-12 px-5 py-10 sm:px-8 sm:py-14 lg:min-h-[620px] lg:grid-cols-[1fr_0.95fr] lg:gap-8 lg:py-12 xl:gap-14">
        {/* Intro (above the animation so copy and CTAs are always on top) */}
        <div className="relative z-10 animate-rise hero-celebration-intro">
          <h1 className="text-4xl leading-[1.05] md:text-5xl lg:text-6xl xl:text-7xl">
            Where
            <br />
            traditions become{" "}
            <span className="italic text-gold-light">memories</span>.
          </h1>

          <p className="mt-4 text-sm font-medium tracking-wide text-gold-light">
            A Wedding &amp; Event Venue in Rajpur Sonarpur
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/80 md:mt-7 md:text-lg">
            From the joy of a wedding to the warmth of a family gathering, Palki
            Garden is where loved ones come together, traditions find their
            place, and beautiful memories begin.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <a href="#book" className="btn-gold">
              Check availability
            </a>
            <a href="#gallery" className="btn-outline">
              See past events
            </a>
          </div>
        </div>

        {/* Frame sequence stage: same footprint as the old collage */}
        <div className="relative z-0 mx-auto h-[390px] w-full max-w-[540px] animate-rise sm:h-[480px] lg:h-[530px] lg:max-w-none [animation-delay:200ms]">
          <HeroFrameSequence />
        </div>
      </div>
    </section>
  );
}
