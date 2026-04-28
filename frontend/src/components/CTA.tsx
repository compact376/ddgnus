import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const CTA = () => {
  return (
    <section className="py-24 md:py-32 bg-heritage-red relative overflow-hidden" id="cta">
      {/* Decorative subtle texture or gradient */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-8" id="cta-title">
            Begin Your Transformation Today
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-12 font-light leading-relaxed" id="cta-text">
            Join a global network dedicated to the pursuit of justice, ethical discovery, and spiritual wholeness.
          </p>
          
          <Link to="/contact" className="inline-flex items-center justify-center px-12 py-5 bg-white text-heritage-red font-bold text-xs tracking-editorial uppercase rounded-sm hover:bg-sage-100 transition-all hover:scale-105">
            Get In Touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
