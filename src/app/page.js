import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Accommodations from "@/components/Accommodations";
import BookingBand from "@/components/BookingBand";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Visit from "@/components/Visit";
import Footer from "@/components/Footer";

import LocalBusinessSchema from "@/components/SEO/LocalBusinessSchema";

export const metadata = {
  title: "Wedding & Event Venue in Rajpur Sonarpur",
  description:
    "Celebrate weddings, family gatherings and special occasions at Palki Garden in Rajpur Sonarpur, South 24 Parganas, West Bengal. Explore our event facilities and guest accommodation.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <LocalBusinessSchema />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Accommodations />
        <BookingBand />
        <Gallery />
        <Testimonials />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
