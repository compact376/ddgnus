"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export function CTA() {
  return (
    <section id="cta" className="py-32 relative overflow-hidden bg-surface">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-8 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div className="space-y-6">
            <span className="text-primary font-label text-xs tracking-[0.4em] uppercase">Begin Today</span>
            <h2 className="font-headline text-5xl md:text-6xl text-on-surface leading-tight">
              Your Path to<br />
              <span className="italic text-primary">Liberation Awaits.</span>
            </h2>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Whether through soul restoration or uncovering hidden truths, your next step
              toward healing and awareness starts here.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
            <Link
              href="/wellness"
              className="px-10 py-4 bg-primary-container text-on-primary-container rounded-full font-bold tracking-wide hover:bg-primary transition-all shadow-xl shadow-primary/10"
            >
              Begin Wellness Journey
            </Link>
            <Link
              href="/book"
              className="px-10 py-4 border border-primary/20 text-on-surface rounded-full font-bold tracking-wide hover:bg-primary/5 transition-all"
            >
              Purchase The Book
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
