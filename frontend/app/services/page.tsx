"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-surface pt-28 pb-24">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 space-y-6"
        >
          <span className="text-primary font-label text-xs tracking-[0.4em] uppercase">Our Pathways</span>
          <h1 className="font-headline text-5xl md:text-6xl text-on-surface">
            Begin Your<br />
            <span className="italic text-primary">Journey</span>
          </h1>
          <p className="text-on-surface-variant text-lg font-light max-w-xl mx-auto">
            Choose how you want to start your healing and awakening path.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Wellness Card */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="group relative overflow-hidden rounded-2xl bg-surface-container-highest border border-white/5 p-10 flex flex-col"
          >
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative space-y-6 flex flex-col h-full">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <div className="flex-1">
                <span className="text-primary font-label text-xs tracking-widest uppercase">Core Program</span>
                <h2 className="font-headline text-3xl text-on-surface mt-2 mb-3">Soul &amp; Body Wellness</h2>
                <p className="text-on-surface-variant leading-relaxed font-light">
                  Join our comprehensive 8–12 week program focused on physical recovery,
                  spiritual cleansing, emotional healing, and inner peace.
                </p>
              </div>
              <Link
                href="/wellness"
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary-container text-on-primary-container rounded-full font-bold text-sm tracking-wide hover:bg-primary transition-all w-full justify-center"
              >
                Learn More About Wellness
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Book Card */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="group relative overflow-hidden rounded-2xl bg-secondary-container border border-white/5 p-10 flex flex-col"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent)]" />
            <div className="relative space-y-6 flex flex-col h-full">
              <div className="w-14 h-14 rounded-full bg-on-secondary-container/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-on-secondary-container" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <div className="flex-1">
                <span className="text-on-secondary-container/70 font-label text-xs tracking-widest uppercase">Flagship Publication</span>
                <h2 className="font-headline text-3xl text-on-secondary-container mt-2 mb-3">The Healing Truth</h2>
                <p className="text-on-secondary-container/80 leading-relaxed font-light">
                  Preorder &quot;My Life with the Deep State&quot; — a powerful exposé written by
                  Mohamed Abduba Dida exploring justice, power, and truth.
                </p>
              </div>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-8 py-3 bg-on-secondary-container/10 text-on-secondary-container border border-on-secondary-container/20 rounded-full font-bold text-sm tracking-wide hover:bg-on-secondary-container/20 transition-all w-full justify-center"
              >
                View Book Details
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>

        <p className="text-center text-on-surface-variant/40 text-sm mt-16 font-label tracking-widest uppercase">
          Both options include secure payment via Stripe
        </p>
      </div>
    </div>
  );
}
