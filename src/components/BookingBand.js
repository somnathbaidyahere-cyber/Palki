import BookingForm from "./BookingForm";
import SectionHeading from "./ui/SectionHeading";

export default function BookingBand() {
  return (
    <section id="book" className="bg-ivory-dark py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          title="Reserve your date"
          text="Dates fill early in the wedding season. Share a few details and we will confirm availability and arrange a visit."
        />

        <div className="mx-auto mt-8 max-w-3xl border border-gold/60 bg-ivory p-4 sm:mt-10 sm:p-6 lg:p-8">
          <BookingForm id="band" tone="light" />
        </div>
      </div>
    </section>
  );
}
