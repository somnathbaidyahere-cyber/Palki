import SectionHeading from "./ui/SectionHeading";
import FeatureIcon from "./ui/FeatureIcon";
import { FEATURES } from "@/data/site";

export default function Features() {
  return (
 <section
  id="features"
  className="jaali bg-maroon py-16 text-ivory sm:py-24 md:py-28 lg:py-32"
>
  <div className="mx-auto max-w-7xl px-5 sm:px-8">
    <SectionHeading
      dark
      title="Everything your event needs"
      text="Space, comfort and safety, with the details planned so your family can focus on the day."
    />

    <ul className="mt-16 grid gap-px overflow-hidden border border-gold/30 bg-gold/30 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map((f, index) => (
        <li
          key={f.title}
          style={{ "--card-index": index }}
          className="
            feature-card
            group relative isolate overflow-hidden
            bg-maroon p-8
            transition-colors duration-500
            hover:bg-maroon-soft
          "
        >
          {/* Animated gold sweep */}
          <span
            aria-hidden="true"
            className="feature-card__sweep pointer-events-none absolute inset-0 -z-10"
          />

          {/* Feature icon */}
          <div className="relative z-10">
            <FeatureIcon
              name={f.icon}
              className="
                feature-card__icon
                h-9 w-9 text-gold
                transition-all duration-500
                group-hover:scale-110
                group-hover:text-gold-light
              "
            />
          </div>

          {/* Feature title */}
          <h3
            className="
              relative z-10 mt-5
              text-2xl font-semibold
              text-gold-light
              transition-colors duration-300
            "
          >
            {f.title}
          </h3>

          {/* Description */}
          <p className="relative z-10 mt-2 leading-relaxed text-ivory/75">
            {f.text}
          </p>
        </li>
      ))}
    </ul>
  </div>
</section>
  );
}
