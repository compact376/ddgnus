import React from 'react';
import { motion } from 'motion/react';

export const About = () => {
  return (
    <section className="py-24 md:py-32 bg-sage-50" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-bold tracking-editorial text-sage-500 uppercase mb-4 block">
              DIDA GLOBAL NETWORKS
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold leading-tight text-heritage-red mb-8" id="about-title">
              Established in Pursuit of Wisdom
            </h2>
            <div className="w-16 h-1 bg-heritage-red mb-8" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-xl font-medium text-on-surface leading-snug" id="about-intro">
              This proposal outlines the development of "The One Family Community Network," a program that aims to foster solidarity, safety, and cooperative care within local communities.
            </p>
            <p className="text-on-surface-variant leading-relaxed" id="about-details">
              We believe that true healing and justice emerge only when we acknowledge the interconnectedness of our biological existence and our spiritual mandate. Through rigorous academic inquiry and faithful devotion, DGNUS leads global initiatives in wellness, ethics, and youth leadership.
            </p>
            
            {/* <a href="#" className="inline-block pt-4 text-xs font-bold tracking-editorial text-heritage-red border-b-2 border-heritage-red pb-1 hover:text-heritage-red-light hover:border-heritage-red-light transition-all">
              DISCOVER OUR HERITAGE
            </a> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
