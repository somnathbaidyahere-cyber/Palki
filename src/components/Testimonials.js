import SectionHeading from "./ui/SectionHeading";
import VideoCard from "./VideoCard";
import { TESTIMONIALS } from "@/data/site";

export default function Testimonials() {
  return (
 <section
  id="stories"
  className="jaali bg-maroon-deep text-ivory py-16 sm:py-24 md:py-28  lg:py-32"
>
  <div className="mx-auto max-w-7xl px-5 sm:px-8">
    <SectionHeading
      dark
      title="In our guests' words"
      text="Three families share what their celebration at Palki meant to them."
    />

    <div className="mt-10 grid gap-10 sm:mt-12 md:grid-cols-3 md:gap-8 lg:gap-10">
      {TESTIMONIALS.map((t) => (
        <VideoCard key={t.name} {...t} />
      ))}
    </div>
  </div>
</section>
  );
}
