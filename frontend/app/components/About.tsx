"use client";
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-32 bg-surface overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-8 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Portrait side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[120px] rounded-full" />
            <div className="w-full aspect-4/5 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-linear-to-br from-surface-container to-surface-container-high flex items-center justify-center">
              <div className="text-center space-y-6 p-12">
                <div className="w-28 h-28 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                  <svg className="w-14 h-14 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <p className="font-headline italic text-on-surface-variant text-lg">Mohamed Abduba Dida</p>
                <p className="text-on-surface-variant/60 text-xs tracking-widest uppercase">Author · Visionary · Advocate</p>
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full lg:w-1/2 space-y-10"
          >
            <div className="space-y-4">
              <span className="text-primary font-label text-xs tracking-[0.4em] uppercase">The Visionary</span>
              <h2 className="font-headline text-5xl text-on-surface">Rooted in Purpose.</h2>
            </div>

            <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed font-light">
              <p>
                Founded on the belief that personal healing is inseparable from collective
                transformation, DIDAS IDEA was born from years of navigating the intersections
                of psychology, art, and justice.
              </p>
              <p>
                We don&apos;t just provide services; we craft environments. Every program, every word
                in our publications, and every session is an architectural endeavor to build a
                world where the soul can finally breathe.
              </p>
            </div>

            <div className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-px bg-outline-variant" />
                <span className="font-headline italic text-2xl text-on-surface">Didas Idea Founder</span>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-outline-variant/20">
              {[
                { value: "2024", label: "Established" },
                { value: "3+", label: "Programs" },
                { value: "1", label: "Flagship Book" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-headline text-3xl text-primary mb-1">{stat.value}</div>
                  <div className="text-on-surface-variant text-xs tracking-widest uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
