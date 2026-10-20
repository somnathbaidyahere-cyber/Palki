import SectionHeading from "./ui/SectionHeading";
import FeatureIcon from "./ui/FeatureIcon";
import { FEATURES } from "@/data/site";

export default function Features() {
  return (
    <section id="features" className="jaali bg-maroon text-ivory py-16 sm:py-24  md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          dark
          title="Everything your event needs"
          text="Space, comfort and safety, with the details planned so your family can focus on the day."
        />

        <ul className="mt-16 grid gap-px overflow-hidden border border-gold/30 bg-gold/30 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <li key={f.title} className="bg-maroon p-8 transition hover:bg-maroon-soft">
              <FeatureIcon name={f.icon} className="h-9 w-9 text-gold" />
              <h3 className="mt-5 text-2xl font-semibold text-gold-light">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-ivory/75">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
