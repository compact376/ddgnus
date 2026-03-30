"use client";
import { motion } from "framer-motion";
import { Leaf, BookOpen } from "lucide-react";

export function Offerings() {
  return (
    <section id="offerings" className="py-24 bg-zinc-950">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold tracking-tight mb-4">What We Offer</h2>
          <p className="text-zinc-400 text-lg">Choose your path to healing and truth</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Wellness */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -10 }}
            className="bg-linear-to-br from-emerald-950 to-zinc-950 border border-emerald-800/60 p-10 rounded-3xl group"
          >
            <Leaf className="w-16 h-16 text-emerald-400 mb-8" />
            <h3 className="text-3xl font-semibold mb-4">Soul & Body Wellness</h3>
            <p className="text-zinc-300 text-lg mb-10 leading-relaxed">
              Holistic healing program for complete restoration of body, mind, and soul.
            </p>
            <motion.a
              href="/wellness"
              whileHover={{ scale: 1.03 }}
              className="inline-block px-8 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-full font-medium transition"
            >
              Learn More →
            </motion.a>
          </motion.div>

          {/* Book */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            whileHover={{ y: -10 }}
            className="bg-zinc-950 border border-amber-800/40 p-10 rounded-3xl group"
          >
            <BookOpen className="w-16 h-16 text-amber-400 mb-8" />
            <h3 className="text-3xl font-semibold mb-3">My Life with the Deep State</h3>
            <p className="text-amber-400 mb-8">Justice in Hands of Power</p>
            <motion.a
              href="/book"
              whileHover={{ scale: 1.03 }}
              className="inline-block px-8 py-4 border border-amber-500 hover:bg-amber-950 rounded-full font-medium transition"
            >
              Preorder the Book →
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}