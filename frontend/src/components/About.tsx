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
              DIDA GLOBAL NETWORK
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold leading-tight text-heritage-red mb-8" id="about-title">
              Dida Global Network (DGN) – Where Knowledge Meets Purpose
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
              Welcome to DGN, a global movement dedicated to building leaders, strengthening families, empowering youth, and guiding generations with clarity, purpose, and integrity.
            </p>
            <p className="text-on-surface-variant leading-relaxed" id="about-details">
              Today’s world is full of noise. What we need are voices of integrity, wisdom, and direction.
              That is why DGN exists.
            </p>
            
            <div className="border-t border-b border-sage-200 py-8">
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-heritage-red mb-6">
                🌟 WHY DGN?
              </h3>
              <ul className="list-disc list-inside space-y-2 text-on-surface-variant">
                <li>Because the world needs voices of integrity</li>
                <li>Because families need guidance</li>
                <li>Because youth need leadership</li>
                <li>Because generations need unity</li>
              </ul>
              
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-heritage-red mt-6 mb-4">
                DGN brings together:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-on-surface-variant">
                <li>Leadership & governance</li>
                <li>Islamic research</li>
                <li>Family & health guidance</li>
                <li>Global revert support</li>
                <li>One Nation Under One God</li>
                <li>Dida Academy training the world</li>
              </ul>
              <p className="mt-4 text-on-surface-variant font-medium">
                All under one powerful global network.
              </p>
            </div>
            
            <div className="border-t border-b border-sage-200 py-8">
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-heritage-red mb-6">
                🌍 OUR MISSION
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                To create impact through knowledge, purpose, and practice — helping individuals and communities rise with clarity, strength, and wisdom.
              </p>
            </div>
            
            <div className="border-t border-b border-sage-200 py-8">
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-heritage-red mb-6">
                ✨ JOIN THE MOVEMENT
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                Be part of something global.
              </p>
              <p className="text-on-surface-variant leading-relaxed">
                Be part of something meaningful.
              </p>
              <p className="text-on-surface-variant leading-relaxed font-bold">
                Be part of DGN.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};