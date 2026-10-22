import BookingForm from "./BookingForm";

export default function Hero() {
  return (
    <section
      id="top"
      className="jaali relative overflow-hidden bg-maroon-deep pt-24 lg:pt-28 pb-20 text-ivory sm:pt-36 lg:pb-28"
    >
      {/* soft glow behind the form */}
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-rise">
          <h1 className="text-4xl font-semibold leading-[1.05] md:text-5xl lg:text-7xl">
            Where
            <br />
            traditions become{" "}
            <span className="italic text-gold-light">memories</span>.
          </h1>
          <p className="mt-4 text-sm font-medium tracking-wide text-gold-light">
            A Wedding &amp; Event Venue in Rajpur Sonarpur
          </p>
          <p className="mt-5 md:mt-7 max-w-xl text-lg leading-relaxed text-ivory/80">
            From the joy of a wedding to the warmth of a family gathering, Palki
            Garden is where loved ones come together, traditions find their
            place, and beautiful memories begin. .
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#book" className="btn-gold">
              Check availability
            </a>
            <a href="#gallery" className="btn-outline">
              See past events
            </a>
          </div>
        </div>

        {/* arch-framed booking card */}
        <div
          id="book-quick"
          className="animate-rise mx-auto w-full min-w-0 max-w-3xl [animation-delay:200ms]"
        >
          <div className="arch w-full min-w-0 border border-gold/50 p-1.5 sm:p-2">
            <div className="arch w-full min-w-0 bg-maroon/80 pb-8 pt-16 backdrop-blur px-4 min-[430px]:max-sm:px-8 sm:px-12 md:px-16 lg:px-10">
              <h2 className="text-center text-2xl font-semibold text-gold-light lg:text-3xl">
                Plan your date
              </h2>

              <p className="mt-2 mb-5 text-center text-sm text-ivory/70 md:mb-6 md:text-base">
                Tell us about your event and we will call you back.
              </p>

              <BookingForm id="hero" tone="dark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
