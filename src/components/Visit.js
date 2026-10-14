import { MapPin, Phone, Mail } from "lucide-react";
import BookingForm from "./BookingForm";
import SectionHeading from "./ui/SectionHeading";
import { VENUE } from "@/data/site";

export default function Visit() {
  const q = encodeURIComponent(VENUE.address);

  return (
    <section id="visit">
      <div className="py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading align="left" title="Visit us before you decide" text="Walk the hall, see the rooms and talk through your plans with our team." />
            <ul className="mt-8 space-y-5 text-lg">
              <li className="flex gap-4"><MapPin className="mt-1 shrink-0 text-gold-dark" strokeWidth={1.5} /><span>{VENUE.address}</span></li>
              <li className="flex gap-4"><Phone className="mt-1 shrink-0 text-gold-dark" strokeWidth={1.5} /><a href={`tel:${VENUE.phone.replace(/\s/g, "")}`} className="hover:text-maroon">{VENUE.phone}</a></li>
              <li className="flex gap-4"><Mail className="mt-1 shrink-0 text-gold-dark" strokeWidth={1.5} /><a href={`mailto:${VENUE.email}`} className="hover:text-maroon">{VENUE.email}</a></li>
            </ul>
            <p className="mt-6 text-ink/60">{VENUE.hours}</p>
          </div>

          <div className="border border-gold/60 bg-white/50 p-6 sm:p-10">
            <h3 className="mb-6 text-3xl font-semibold text-maroon">Request a visit or a date</h3>
            <BookingForm id="visit" tone="light" />
          </div>
        </div>
      </div>

      {/* Large interactive map, full width, directly above the footer */}
      <div className="relative h-[50vh] min-h-[440px] w-full bg-ivory-dark">
        <iframe
          title={`Map showing ${VENUE.name}`}
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 p-4 sm:p-8">
          <div className="pointer-events-auto max-w-sm border border-gold bg-maroon-deep p-6 text-ivory shadow-2xl">
            <p className="font-display text-3xl font-semibold text-gold-light">{VENUE.name}</p>
            <p className="mt-2 text-ivory/80">{VENUE.address}</p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${q}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-5 !py-2"
            >
              Get directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
