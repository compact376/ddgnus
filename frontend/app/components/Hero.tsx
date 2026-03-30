"use client";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="hero-bg min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 bg-emerald-900/60 backdrop-blur-md rounded-full text-emerald-400 text-sm mb-6"
          >
            DIDAS IDEA LLC
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6">
            Heal the Soul.<br />
            <span className="text-emerald-400">Expand the Mind.</span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto mb-10"
          >
            Holistic healing programs rooted in divine wisdom.<br />
            And a book that speaks truth to power.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a 
              href="#offerings"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 transition rounded-full font-medium text-lg"
            >
              Explore Wellness
            </motion.a>
            <motion.a 
              href="book"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 border border-emerald-500 hover:bg-emerald-950 transition rounded-full font-medium text-lg"
            >
              Reserve the Book
            </motion.a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-emerald-400"
      >
        <ArrowDown size={32} />
      </motion.div>
    </section>
  );
}