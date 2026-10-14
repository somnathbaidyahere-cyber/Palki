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

export default function Home() {
  return (
    <>
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
