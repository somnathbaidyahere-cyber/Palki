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

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {ROOMS.map((r) => (
            <article key={r.title} className="text-center">
              <div className="arch mx-auto aspect-[3/4] max-w-xs border border-gold p-2">
                <img src={r.image} alt={r.title} className="arch h-full w-full object-cover" loading="lazy" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-maroon">{r.title}</h3>
              <p className="mx-auto mt-2 max-w-xs leading-relaxed text-ink/70">{r.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
