import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Ornament from "./ui/Ornament";
import { VENUE } from "@/data/site";

// Shared layout for Privacy Policy and Terms & Conditions.
export default function LegalPage({ title, updated, intro, sections, other }) {
  return (
    <>
      <Navbar solid />
      <main>
        <header className="jaali bg-maroon-deep px-5 pb-16 pt-32 text-center text-ivory sm:pb-20 sm:pt-40">
          <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
          <Ornament className="mt-4 md:mt-6" />
          <p className="mt-4 md:mt-5 text-ivory/70">Last updated: {updated}</p>
        </header>

        <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
          {intro && <p className="text-lg md:text-xl leading-relaxed text-ink/85">{intro}</p>}

          {sections.map((s) => (
            <section key={s.title} className="mt-8 md:mt-12 border-t border-gold/40 pt-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-maroon">{s.title}</h2>
              {s.body?.map((para) => (
                <p key={para} className="mt-3 md:mt-4 text-base md:text-lg leading-[1.8] text-ink/80">{para}</p>
              ))}

              {s.contact && (
                <address className="mt-5 border border-gold/60 bg-white/50 p-6 text-base md:text-lg not-italic leading-relaxed text-ink/85">
                  <p className="font-display text-xl md:text-2xl font-semibold text-maroon">{VENUE.name}</p>
                  <p className="mt-2"><span className="text-ink/60">Operated by:</span> {VENUE.name}</p>
                  <p><span className="text-ink/60">Address:</span> {VENUE.address}</p>
                  <p><span className="text-ink/60">Email:</span>{" "}
                    <a href={`mailto:${VENUE.email}`} className="text-maroon underline decoration-gold underline-offset-4">{VENUE.email}</a>
                  </p>
                  <p><span className="text-ink/60">Phone:</span>{" "}
                    <a href={`tel:${VENUE.phone.replace(/\s/g, "")}`} className="text-maroon underline decoration-gold underline-offset-4">{VENUE.phone}</a>
                  </p>
                </address>
              )}
            </section>
          ))}

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-gold/40 pt-8">
            <Link href="/" className="text-maroon underline decoration-gold underline-offset-8 hover:text-gold-dark">Back to home</Link>
            {other && (
              <Link href={other.href} className="text-maroon underline decoration-gold underline-offset-8 hover:text-gold-dark">
                Read our {other.label}
              </Link>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
