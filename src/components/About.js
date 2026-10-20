import SectionHeading from "./ui/SectionHeading";
import { VENUE } from "@/data/site";
import HallReveal from "./ui/HallReveal";

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24  md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-md">
          <HallReveal />
        </div>

        <div>
          <SectionHeading
            align="left"
            title={`Why families choose ${VENUE.name}`}
          />
          <div className="mt-8 space-y-3 md:space-y-5 text-base md:text-lg leading-relaxed text-ink/80">
            <p>
              In many families, the palki is how a bride or groom first arrives
              at the celebration: carried carefully, with everyone watching. We
              built this venue with the same idea. Your guests should feel
              looked after from the moment they arrive.
            </p>
            <p>
              The hall is large enough for 700 guests and still feels personal.
              A dedicated kitchen keeps the feast on schedule, rooms on site
              give the family somewhere to rest, and our team designs the décor
              around your rituals, not a fixed catalogue.
            </p>
          </div>
          <a
            href="#features"
            className="mt-8 inline-block text-maroon underline decoration-gold underline-offset-8 transition hover:text-gold-dark"
          >
            See everything the venue offers
          </a>
        </div>
      </div>
    </section>
  );
}
