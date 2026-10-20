import BookingForm from "./BookingForm";
import SectionHeading from "./ui/SectionHeading";

export default function BookingBand() {
  return (
    <section id="book" className="bg-ivory-dark py-16 sm:py-24  md:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          title="Reserve your date"
          text="Dates fill early in the wedding season. Share a few details and we will confirm availability and arrange a visit."
        />
        <div className="mt-12 border border-gold/60 bg-ivory p-6 sm:p-10">
          <BookingForm id="band" tone="light" />
        </div>
      </div>
    </section>
  );
}
