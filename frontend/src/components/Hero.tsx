
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]); 
  const opacityText = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-start justify-center pt-10 md:pt-20 pb-12 overflow-hidden" 
      id="hero"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070" 
          alt="Peaceful Mountains"
          className="w-full h-full object-cover"
          id="hero-bg"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-heritage-red/80 via-heritage-red/50 to-sage-50/20" />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-white text-center md:text-left w-full">
        <motion.div 
          style={{ y: yText, opacity: opacityText }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="font-serif text-3xl md:text-6xl lg:text-[7rem] font-bold leading-[1.1] mb-3 drop-shadow-2xl" id="hero-title">
            The One Family <br className="hidden md:block" />Community Network
          </h1>
          <p className="text-sm md:text-base lg:text-lg font-light mb-5 text-white/90 max-w-xl leading-relaxed" id="hero-subtitle">
            Neighbors by place, family by creation. A Community Integration Initiative.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4" id="hero-actions">
            <a
              href="#programs"
              aria-label="Jump to programs"
              className="inline-flex items-center justify-center px-7 py-3 bg-white text-heritage-red font-bold text-[10px] sm:text-xs tracking-editorial uppercase rounded-sm hover:bg-sage-100 transition-all shadow-xl active:scale-95 cursor-pointer"
            >
              Explore Programs
            </a>
            <a
              href="#about"
              aria-label="Jump to about section"
              className="inline-flex items-center justify-center px-7 py-3 border border-white text-white font-bold text-[10px] sm:text-xs tracking-editorial uppercase rounded-sm hover:bg-white/10 transition-all backdrop-blur-sm active:scale-95 cursor-pointer"
            >
              Our Mission
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};
