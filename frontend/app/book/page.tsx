"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function BookPage() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="min-h-screen bg-surface pt-28 pb-24">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-8 md:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-12 font-label text-xs tracking-widest uppercase"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Book Cover */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-secondary/10 blur-[80px] rounded-full" />
            <div
              className="aspect-3/4 bg-surface-container-highest rounded-2xl overflow-hidden border border-white/5 shadow-2xl relative cursor-pointer"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {/* SVG placeholder — visible when not hovered */}
              <motion.div
                animate={{ opacity: hovered ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-linear-to-br from-secondary/10 via-surface-container to-surface-container-lowest flex items-center justify-center"
              >
                <div className="text-center p-8 space-y-4">
                  <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                    <svg className="w-12 h-12 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  </div>
                  <p className="font-headline italic text-secondary text-lg">My Life with the Deep State</p>
                  <p className="text-on-surface-variant text-xs tracking-widest uppercase">Mohamed Abduba Dida</p>
                </div>
              </motion.div>

              {/* Real book cover — fades in on hover */}
              <motion.div
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src="/bookcover.jpeg"
                  alt="My Life with the Deep State book cover"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <div className="absolute bottom-6 left-6 glass-panel px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-secondary z-10">
                Coming 2026
              </div>
            </div>
          </motion.div>

          {/* Book Details */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <span className="text-secondary font-label text-xs tracking-[0.3em] uppercase">Coming Soon · 2026</span>
              <h1 className="font-headline text-5xl md:text-6xl text-on-surface leading-tight">
                My Life with<br />
                <span className="italic text-secondary">the Deep State</span>
              </h1>
              <p className="text-on-surface-variant text-xl font-light">Justice in Hands of Power</p>
            </div>

            <div className="flex items-center gap-10 py-6 border-y border-outline-variant/20">
              <div>
                <div className="text-on-surface-variant text-xs tracking-widest uppercase mb-1">Author</div>
                <div className="font-headline italic text-on-surface">Mohamed Abduba Dida</div>
              </div>
              <div className="w-px h-8 bg-outline-variant" />
              <div>
                <div className="text-on-surface-variant text-xs tracking-widest uppercase mb-1">Release</div>
                <div className="font-headline italic text-on-surface">Early 2026</div>
              </div>
            </div>

            <p className="text-on-surface-variant text-lg leading-relaxed font-light">
              A raw and courageous account that exposes how power truly operates behind the scenes.
              This book reveals hidden systems of control, justice, and authority with unflinching
              honesty and spiritual insight.
            </p>

            {/* Pricing */}
            <div className="bg-surface-container-high border border-secondary/20 rounded-2xl p-8">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-secondary font-label text-xs tracking-widest uppercase mb-2">Preorder Price</div>
                  <div className="font-headline text-5xl text-on-surface">$29</div>
                </div>
                <div className="text-right text-sm text-on-surface-variant">
                  Limited early bird copies<br />
                  <span className="text-xs">Price increases after launch</span>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => (window.location.href = "/payment?service=book")}
              className="w-full py-5 bg-secondary-container text-on-secondary-container rounded-full font-bold tracking-wide text-sm flex items-center justify-center gap-3 hover:brightness-110 transition-all"
            >
              Continue to Payment — Preorder Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>

            <p className="text-center text-xs text-on-surface-variant/50">
              Secure payment powered by Stripe · Instant confirmation upon payment
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
