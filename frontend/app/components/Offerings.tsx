"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export function Offerings() {
  return (
    <section id="offerings" className="py-32 bg-surface-container-low">
      <div className="max-w-screen-2xl mx-auto px-8 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16"
        >
          <div className="max-w-2xl">
            <span className="text-secondary font-label text-xs tracking-[0.3em] uppercase mb-4 block">Our Pathways</span>
            <h2 className="font-headline text-4xl md:text-5xl text-on-surface">Our Programs</h2>
          </div>
          <p className="text-on-surface-variant text-sm uppercase tracking-widest hidden md:block">Scroll to explore programs</p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-150 md:h-200">
          {/* Primary: Wellness — 8 cols */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 group relative overflow-hidden rounded-xl bg-surface-container-highest border border-white/5"
          >
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-surface-container-lowest via-transparent to-transparent" />
            <div className="relative h-full p-12 flex flex-col justify-end">
              <span className="text-primary-container text-xs font-bold tracking-widest uppercase mb-4">Core Program</span>
              <h3 className="font-headline text-4xl md:text-5xl mb-6 text-on-surface">Wellness Ecosystems</h3>
              <p className="text-on-surface-variant max-w-md mb-8">
                Personalized, clinical-grade wellness journeys designed to bridge the gap between trauma and liberation.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="px-4 py-2 bg-surface/80 rounded-lg text-xs font-medium border border-primary/10 text-on-surface">Somatic Healing</span>
                <span className="px-4 py-2 bg-surface/80 rounded-lg text-xs font-medium border border-primary/10 text-on-surface">Mindful Advocacy</span>
                <span className="px-4 py-2 bg-surface/80 rounded-lg text-xs font-medium border border-primary/10 text-on-surface">8–12 Weeks</span>
              </div>
              <Link
                href="/wellness"
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary-container text-on-primary-container rounded-full font-bold text-sm tracking-wide hover:bg-primary transition-all w-fit"
              >
                Begin Wellness Journey
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Right column — 4 cols */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {/* Book card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="h-full group relative overflow-hidden rounded-xl bg-secondary-container border border-white/5"
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent)]" />
              <div className="relative h-full p-10 flex flex-col justify-between">
                <svg className="w-10 h-10 text-on-secondary-container" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                <div>
                  <h3 className="font-headline text-3xl text-on-secondary-container mb-4">The Healing Truth</h3>
                  <p className="text-on-secondary-container/80 text-sm mb-6">
                    Our flagship publication exploring the intersection of mental health and structural justice.
                  </p>
                  <Link
                    href="/book"
                    className="text-on-secondary-container font-bold text-xs tracking-widest uppercase inline-flex items-center gap-2 group/link"
                  >
                    PURCHASE VOLUME I
                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
