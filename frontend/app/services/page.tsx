"use client";
import { motion } from "framer-motion";
import { Leaf, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold tracking-tight mb-4">Begin Your Journey</h1>
          <p className="text-zinc-400 text-xl">Choose how you want to start your healing and awakening path</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Wellness Program Card */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group bg-zinc-900 border border-emerald-800/60 hover:border-emerald-600 rounded-3xl p-10 flex flex-col"
          >
            <div className="mb-8">
              <Leaf className="w-16 h-16 text-emerald-400" />
            </div>
            
            <h2 className="text-3xl font-semibold mb-3">Soul & Body Wellness</h2>
            <p className="text-emerald-400 mb-6">Holistic Healing Program</p>
            
            <p className="text-zinc-300 flex-1 leading-relaxed mb-10">
              Join our comprehensive 8-12 week program focused on physical recovery, 
              spiritual cleansing, emotional healing, and inner peace.
            </p>

            <Link href="/wellness">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-medium flex items-center justify-center gap-3 group-hover:gap-4 transition-all"
              >
                Learn More About Wellness
                <ArrowRight className="group-hover:translate-x-1 transition" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Book Card */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group bg-zinc-900 border border-amber-800/40 hover:border-amber-600 rounded-3xl p-10 flex flex-col"
          >
            <div className="mb-8">
              <BookOpen className="w-16 h-16 text-amber-400" />
            </div>
            
            <h2 className="text-3xl font-semibold mb-3">The Book</h2>
            <p className="text-amber-400 mb-6">My Life with the Deep State</p>
            
            <p className="text-zinc-300 flex-1 leading-relaxed mb-10">
              Preorder "Justice in Hands of Power" — a powerful exposé written by Mohamed Abduba Dida.
            </p>

            <Link href="/book">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-5 border border-amber-500 hover:bg-amber-950 rounded-2xl font-medium flex items-center justify-center gap-3 group-hover:gap-4 transition-all"
              >
                View Book Details
                <ArrowRight className="group-hover:translate-x-1 transition" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <p className="text-center text-zinc-500 text-sm mt-16">
          Both options include secure payment via Stripe
        </p>
      </div>
    </div>
  );
}