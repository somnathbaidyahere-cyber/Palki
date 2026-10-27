import SectionHeading from "./ui/SectionHeading";
import { ROOMS } from "@/data/site";
import { ArrowUpRight } from "lucide-react";

export default function Accommodations() {
  return (
    <section id="stay" className="py-16 sm:py-24  md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          title="Rooms for your family to stay"
          text="Four to five guest rooms on the premises, so the couple and close relatives can rest, dress and gather without leaving the venue."
        />

        <ul className="mt-10 space-y-12 sm:mt-14 sm:space-y-16 lg:space-y-24">
          {ROOMS.map((r, index) => {
            const imageFirst = index % 2 === 0;

            return (
              <li key={r.title}>
                <article
                  className={`grid items-center gap-7 sm:gap-10 lg:grid-cols-2 lg:gap-16 ${
                    imageFirst ? "" : "lg:[&>div:first-child]:order-2"
                  }`}
                >
                  {/* Room image */}
                  <div className="group relative mx-auto w-full max-w-lg lg:max-w-none">
                    <div className="absolute -inset-3 rounded-t-[2rem] border border-gold/20" />

                    <div className="arch relative aspect-[4/3] overflow-hidden border border-gold/70 bg-maroon/5 p-1.5 sm:p-2">
                      <img
                        src={r.image}
                        alt={r.title}
                        className="arch h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                        loading="lazy"
                      />
                    </div>

                    {/* Decorative room number */}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-4 ${
                        imageFirst ? "-right-3 sm:right-5" : "-left-3 sm:left-5"
                      } grid h-14 w-14 place-items-center rounded-full border border-gold/60 bg-maroon text-sm font-semibold tracking-widest text-gold shadow-lg sm:h-16 sm:w-16 group-hover:text-gold-light`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Room details */}
                  <div className="pt-3 lg:py-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-dark">
                      Accommodation · Room {String(index + 1).padStart(2, "0")}
                    </p>

                    <h3 className="mt-3 font-serif text-2xl leading-tight text-maroon sm:text-3xl lg:text-4xl">
                      {r.title}
                    </h3>

                    <p className="mt-4 max-w-xl text-sm leading-7 text-ink/75 sm:text-base sm:leading-8">
                      {r.text}
                    </p>

                    {/* Room specifications — shown only when supplied */}
                    {(r.area || r.beds || r.capacity) && (
                      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {r.area && (
                          <div className="rounded-xl border border-gold/25 bg-white/50 p-3 sm:p-4">
                            <dt className="text-xs text-ink/60">Room area</dt>
                            <dd className="mt-1 font-semibold text-maroon">
                              {r.area}
                            </dd>
                          </div>
                        )}

                        {r.beds && (
                          <div className="rounded-xl border border-gold/25 bg-white/50 p-3 sm:p-4">
                            <dt className="text-xs text-ink/60">Beds</dt>
                            <dd className="mt-1 font-semibold text-maroon">
                              {r.beds}
                            </dd>
                          </div>
                        )}

                        {r.capacity && (
                          <div className="rounded-xl border border-gold/25 bg-white/50 p-3 sm:p-4">
                            <dt className="text-xs text-ink/60">Occupancy</dt>
                            <dd className="mt-1 font-semibold text-maroon">
                              {r.capacity}
                            </dd>
                          </div>
                        )}
                      </dl>
                    )}

                    {/* Amenities */}
                    {r.amenities?.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-sm font-semibold text-maroon">
                          Room amenities
                        </h4>

                        <ul className="mt-3 flex flex-wrap gap-2">
                          {r.amenities.map((amenity) => (
                            <li
                              key={amenity}
                              className="rounded-full border border-gold/30 bg-maroon/[0.035] px-3 py-2 text-xs font-medium text-ink/75 sm:text-sm"
                            >
                              {amenity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* CTA */}
                    <a
                      href="#book"
                      className="group mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-maroon/30 px-5 py-3 text-sm font-semibold text-maroon transition-colors hover:border-maroon hover:bg-maroon hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                    >
                      Enquire about this room
                      <ArrowUpRight className="h-4 w-4 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
                    </a>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
