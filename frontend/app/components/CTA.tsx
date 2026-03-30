"use client";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section id="cta" className="py-28 border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-zinc-400 text-xl mb-12 max-w-2xl mx-auto">
            Whether through soul restoration or uncovering hidden truths, 
            your next step toward healing and awareness starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <motion.a 
              href="/wellness"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-lg font-medium rounded-2xl transition-all"
            >
              Join Soul & Body Wellness
            </motion.a>
            
            <motion.a 
              href="/book"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 border border-amber-500 hover:bg-amber-950 text-lg font-medium rounded-2xl transition-all"
            >
              Preorder the Book
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}