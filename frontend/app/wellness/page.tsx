"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  "Physical Recovery & Detoxification",
  "Spiritual Cleansing & Mindful Practice",
  "Emotional & Mental Healing",
  "Long-term Inner Peace & Balance",
  "Community Support & Follow-up Care",
];

export default function WellnessPage() {
  return (
    <div className="min-h-screen bg-surface pt-28 pb-24">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-[100px]" />
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

        {/* Hero header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="text-primary font-label text-xs tracking-[0.4em] uppercase mb-4 block">Core Program</span>
          <h1 className="font-headline text-5xl md:text-7xl text-on-surface leading-tight mb-6">
            Wellness<br />
            <span className="italic text-primary">Ecosystems</span>
          </h1>
          <p className="text-on-surface-variant text-xl font-light max-w-xl">
            Body &amp; Soul Restoration, Recovery and Healing Centre
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main content */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="font-headline text-3xl text-on-surface">A Complete Healing Journey</h2>
              <div className="w-16 h-px bg-outline-variant" />
              <p className="text-on-surface-variant text-lg leading-relaxed font-light">
                Our program is designed to heal the whole person — physically, emotionally, and
                spiritually. Rooted in ancestral wisdom and guided by experienced healers, each
                pathway is tailored to your unique restoration needs.
              </p>
            </motion.div>

            <div className="space-y-5">
              {features.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex gap-5 items-center p-5 rounded-xl bg-surface-container border border-white/5"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-on-surface font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-5 h-fit sticky top-28"
          >
            <div className="glass-panel rounded-2xl p-10 border border-primary/10 space-y-8">
              <div>
                <span className="text-primary font-label text-xs tracking-widest uppercase">Program Details</span>
                <h3 className="font-headline text-2xl text-on-surface mt-2">Soul &amp; Body Wellness</h3>
              </div>

              <div className="space-y-6">
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-primary text-xs tracking-widest uppercase mb-1">Duration</div>
                    <div className="text-on-surface font-headline text-xl">8 – 12 Weeks</div>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-primary text-xs tracking-widest uppercase mb-1">Group Size</div>
                    <div className="text-on-surface font-headline text-xl">Small &amp; Intimate</div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-outline-variant/20">
                <div className="text-on-surface-variant text-xs tracking-widest uppercase mb-2">Investment</div>
                <div className="font-headline text-5xl text-primary mb-1">$299</div>
                <p className="text-on-surface-variant text-sm">One-time investment for the full program</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => (window.location.href = "/payment?service=wellness")}
                className="w-full py-5 bg-primary-container text-on-primary-container rounded-full font-bold tracking-wide text-sm flex items-center justify-center gap-3 hover:bg-primary transition-all"
              >
                Continue to Payment
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
