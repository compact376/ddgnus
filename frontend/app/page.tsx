import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Offerings } from "./components/Offerings";
import { Mission } from "./components/Mission";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Offerings />
        <Mission />
        <CTA />
      </main>
      <Footer />
    </>
  );
}