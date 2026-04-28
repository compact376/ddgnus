import React from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Programs } from '../components/Programs';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white pt-20">
      <Hero />
      <About />
      <Programs />
      <CTA />
      <Footer />
    </main>
  );
}
