"use client";
import { motion } from "framer-motion";

export function Mission() {
  return (
    <section id="mission" className="py-24 bg-zinc-950">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-950/70 rounded-full text-emerald-400 text-sm mb-8">
            OUR PURPOSE
          </div>
          
          <h2 className="text-5xl font-bold tracking-tight mb-10">
            Our Mission
          </h2>

          <div className="text-xl text-zinc-300 leading-relaxed max-w-3xl mx-auto">
            DIDAS IDEA LLC is committed to empowering individuals through holistic wellness 
            and knowledge that challenges the status quo. 
            <br /><br />
            We believe in healing the <span className="text-emerald-400">whole person</span> — 
            body, mind, and soul — and in amplifying voices that speak truth to power.
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
        >
          {[
            { emoji: "🌿", title: "Holistic Healing", desc: "Restoring balance through divine wisdom and practical recovery." },
            { emoji: "📖", title: "Truth & Justice", desc: "Bringing hidden realities to light with courage and clarity." },
            { emoji: "🤝", title: "Community Impact", desc: "Building a network that heals and empowers together." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl"
            >
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h4 className="font-semibold mb-3 text-xl">{item.title}</h4>
              <p className="text-zinc-400">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}