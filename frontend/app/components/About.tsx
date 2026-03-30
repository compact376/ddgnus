"use client";
import { motion } from "framer-motion";
import { Heart, BookOpen, Users } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 bg-zinc-900">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-950 rounded-full text-emerald-400 text-sm mb-6">
            🌿 DIDAS IDEA LLC
          </div>
          <h2 className="text-5xl font-bold tracking-tight mb-6">Who We Are</h2>
          <p className="max-w-2xl mx-auto text-zinc-400 text-lg">
            Dedicated to holistic healing and speaking truth with courage.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Heart, title: "Holistic Healing", desc: "Body & Soul Restoration, Recovery and Healing Centre — addressing physical, spiritual, and emotional wellbeing." },
            { icon: BookOpen, title: "Truth & Justice", desc: "Amplifying voices that speak truth to power through powerful storytelling and revelation." },
            { icon: Users, title: "Community First", desc: "Building a global network committed to healing the whole person — body, mind, and soul." }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="bg-zinc-950 border border-zinc-800 p-8 rounded-3xl hover:border-emerald-600 transition-all group"
            >
              <item.icon className="w-12 h-12 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}