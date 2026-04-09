"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export function Hero() {
  const { scrollY } = useScroll();

  // Parallax: background drifts upward and scales as user scrolls
  const bgY = useTransform(scrollY, [0, 700], ["0%", "28%"]);
  const bgScale = useTransform(scrollY, [0, 700], [1, 1.12]);

  // Content fades and rises on scroll
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const contentY = useTransform(scrollY, [0, 450], ["0%", "-8%"]);

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Parallax forest background */}
      <motion.div
        aria-hidden
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-10 hero-bg will-change-transform origin-center"
      />

      {/* Subtle top vignette */}
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/40 to-transparent pointer-events-none z-0" />

      {/* Ambient pollen / light-scatter orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 w-full max-w-screen-2xl mx-auto px-8 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      >
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="lg:col-span-7 space-y-8"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1 rounded-full bg-surface-container-highest/60 text-primary font-label text-xs tracking-widest uppercase backdrop-blur-md border border-outline-variant/20"
          >
            Established 2024
          </motion.span>

          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tighter text-on-surface">
            The Sanctuary<br />
            <span className="italic text-primary">of Justice.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-on-surface-variant text-lg md:text-xl max-w-xl font-light leading-relaxed"
          >
            A transformative space where ancestral wisdom meets modern clinical precision.
            Reclaim your power through high-end holistic wellness.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Link
              href="/services"
              className="px-10 py-4 bg-primary-container text-on-primary-container rounded-full font-bold tracking-wide hover:bg-primary transition-all shadow-xl shadow-primary/10"
            >
              Begin Journey
            </Link>
            <Link
              href="/book"
              className="px-10 py-4 border border-secondary/20 text-secondary rounded-full font-bold tracking-wide hover:bg-secondary/5 transition-all"
            >
              Read The Book
            </Link>
          </motion.div>
        </motion.div>

  {/* Right: Book card */}
  <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.3 }}
      className="hidden lg:block lg:col-span-5 relative"
    >
    <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />

    {/* Straight & Upright Card */}
    <div className="glass-panel p-2 rounded-xl shadow-2xl relative z-10 border border-white/5">
      <div className="rounded-lg w-full aspect-4/5 bg-surface-container-highest overflow-hidden flex items-center justify-center">
        <div className="text-center p-8 space-y-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <svg
              className="w-10 h-10 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="p-6">
        <span className="font-headline italic text-secondary text-xl">
          The Truth Within
        </span>
        <p className="text-xs text-on-surface-variant mt-2 tracking-widest uppercase">
          Chapter IV: The Ancestral Voice
        </p>
      </div>
    </div>
</motion.div>
    </motion.div>

    {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary/60 z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
