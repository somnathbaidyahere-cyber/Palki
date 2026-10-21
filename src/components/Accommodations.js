import SectionHeading from "./ui/SectionHeading";
import { ROOMS } from "@/data/site";

export default function Accommodations() {
  return (
    <section id="stay" className="py-16 sm:py-24  md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          title="Rooms for your family to stay"
          text="Four to five guest rooms on the premises, so the couple and close relatives can rest, dress and gather without leaving the venue."
        />

        <ul className="mt-10 grid gap-10 sm:mt-12 sm:gap-12 md:grid-cols-3">
          {ROOMS.map((r) => (
            <li key={r.title}>
              <article className="text-center">
                {/* Room image */}
                <div
                  className="
            arch mx-auto
            aspect-[4/5] w-full max-w-[250px]
            border border-gold p-1.5
            sm:aspect-[3/4] sm:max-w-xs sm:p-2
          "
                >
                  <img
                    src={r.image}
                    alt={r.title}
                    className="arch h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Room title */}
                <h3 className="mt-4 text-xl font-semibold text-maroon sm:mt-6 sm:text-2xl">
                  {r.title}
                </h3>

                {/* Room description */}
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink/70 sm:text-base">
                  {r.text}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
