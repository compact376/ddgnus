"use client";
import { motion } from "framer-motion";
import { Leaf, Heart, Users, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WellnessPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-12 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <Link href="/services" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-500 mb-10">
          ← Back to Services
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold tracking-tight mb-6">Soul & Body Wellness</h1>
          <p className="text-2xl text-emerald-400">Body & Soul Restoration, Recovery and Healing Centre</p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3 space-y-10">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-4xl font-semibold mb-6">A Complete Healing Journey</h2>
              <p className="text-zinc-300 text-lg leading-relaxed">
                Our program is designed to heal the whole person — physically, emotionally, and spiritually. 
                Rooted in divine wisdom and guided by experienced healers.
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                "Physical Recovery & Detoxification",
                "Spiritual Cleansing & Ruqyah",
                "Emotional & Mental Healing",
                "Long-term Inner Peace & Balance",
                "Community Support & Follow-up Care"
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <div className="mt-1.5 w-6 h-6 rounded-full bg-emerald-900 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-lg text-zinc-200">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 bg-zinc-900 border border-emerald-900/50 rounded-3xl p-10 h-fit"
          >
            <h3 className="text-2xl font-semibold mb-8">Program Details</h3>
            
            <div className="space-y-8">
              <div className="flex gap-5">
                <Clock className="w-7 h-7 text-emerald-400 mt-1" />
                <div>
                  <div className="text-emerald-400 text-sm">Duration</div>
                  <div className="text-xl">8 – 12 Weeks</div>
                </div>
              </div>
              <div className="flex gap-5">
                <Users className="w-7 h-7 text-emerald-400 mt-1" />
                <div>
                  <div className="text-emerald-400 text-sm">Group Size</div>
                  <div className="text-xl">Small & Intimate</div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-zinc-800">
              <div className="text-4xl font-bold text-emerald-400 mb-1">$299</div>
              <p className="text-zinc-500 text-sm">One-time investment for the full program</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.location.href = "/payment?service=wellness"}
              className="mt-10 w-full py-5 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3"
            >
              Continue to Payment
              <ArrowRight />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}