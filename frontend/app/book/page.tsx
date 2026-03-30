"use client";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-12 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back Button */}
        <Link 
          href="/services" 
          className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-500 mb-10 transition-colors"
        >
          ← Back to Services
        </Link>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Book Cover Section */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="aspect-3/4 bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-700 shadow-2xl relative">
              {/* Placeholder for book cover - replace with real image later */}
              <div className="absolute inset-0 bg-linear-to-br from-amber-950 via-zinc-950 to-black flex items-center justify-center">
                <BookOpen size={140} className="text-amber-400/20" />
              </div>
              <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-md px-5 py-2 rounded-xl text-sm">
                Preorder Now
              </div>
            </div>
          </motion.div>

          {/* Book Details */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <div className="uppercase tracking-[3px] text-amber-400 text-sm font-medium mb-3">COMING SOON • 2026</div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
              My Life with the Deep State
            </h1>
            <p className="text-2xl text-amber-400 mb-10">Justice in Hands of Power</p>

            <div className="flex items-center gap-8 mb-10">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-zinc-400" />
                <div>
                  <div className="text-sm text-zinc-400">Author</div>
                  <div className="font-medium">Mohamed Abduba Dida</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-zinc-400" />
                <div>
                  <div className="text-sm text-zinc-400">Release</div>
                  <div className="font-medium">Early 2026</div>
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-zinc-300 text-lg leading-relaxed mb-12">
              A raw and courageous account that exposes how power truly operates behind the scenes. 
              This book reveals hidden systems of control, justice, and authority with unflinching honesty 
              and spiritual insight.
            </div>

            {/* Pricing Box */}
            <div className="bg-zinc-900 border border-amber-800/50 rounded-3xl p-8 mb-10">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <div className="text-emerald-400 text-sm font-medium">PREORDER PRICE</div>
                  <div className="text-5xl font-bold text-white">$29</div>
                </div>
                <div className="text-right text-sm text-zinc-500">
                  Limited early bird copies<br />
                  Price increases after launch
                </div>
              </div>
            </div>

            {/* Continue to Payment Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.location.href = "/payment?service=book"}
              className="w-full py-5 bg-amber-600 hover:bg-amber-500 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-all"
            >
              Continue to Payment - Preorder Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <p className="text-center text-xs text-zinc-500 mt-8">
              Secure payment powered by Stripe • Instant confirmation upon payment
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}