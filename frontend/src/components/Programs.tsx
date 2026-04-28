import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { HeartPulse, BookOpen, GraduationCap, Users } from 'lucide-react';

const ProgramCard = ({ 
  title, 
  description, 
  icon: Icon, 
  variant = 'default',
  index = 0,
  to,
}: { 
  title: string; 
  description: string; 
  icon: any; 
  variant?: 'default' | 'primary';
  index?: number;
  to: string;
}) => {
  const isPrimary = variant === 'primary';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.7, 
        ease: "easeOut",
        delay: index * 0.1,
      }}
      whileHover={{ y: -8 }}
      className="p-10 rounded-bento flex flex-col justify-between h-full shadow-editorial bg-white transition-all"
    >
      <div>
        <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-10 bg-heritage-red text-white">
          <Icon size={24} />
        </div>

        {isPrimary && (
          <span className="text-[10px] font-bold tracking-editorial text-heritage-red uppercase mb-2 block">
            FEATURED PUBLICATION
          </span>
        )}

        <h3 className="font-serif text-2xl font-semibold mb-4 leading-tight text-on-surface">
          {title}
        </h3>

        <p className="text-sm leading-relaxed text-on-surface-variant">
          {description}
        </p>
      </div>

      <Link
        to={to}
        className="mt-10 self-start px-6 py-3 border border-heritage-red text-heritage-red text-[10px] font-bold tracking-editorial uppercase rounded-sm hover:bg-heritage-red hover:text-white transition-all"
      >
        Learn More
      </Link>
    </motion.div>
  );
};

export const Programs = () => {
  return (
    <section className="py-24 md:py-32 bg-sage-50" id="programs">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-[10px] font-bold tracking-editorial text-sage-500 uppercase mb-4 block">
            CURATED PATHWAYS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-heritage-red">
            Our Programs
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <ProgramCard 
              title="Soul & Body Wellness"
              description="A comprehensive framework for holistic mind-body-spirit restoration, integrating clinical insights with spiritual practices."
              icon={HeartPulse}
              index={0}
              to="/programs/soul-body-wellness"
            />
          </div>

          <div className="lg:col-span-7">
            <ProgramCard 
              title="My Life with the Deep State"
              description="An inspirational journey by our founder exploring the intersection of personal faith and structural environments."
              icon={BookOpen}
              variant="primary"
              index={1}
              to="/programs/my-life-with-the-deep-state"
            />
          </div>

          <div className="lg:col-span-7">
            <ProgramCard 
              title="Global Islamic Research Ethical"
              description="Research bridging faith and science, including our pioneering Infant Urine Research Project and ethical bio-frameworks."
              icon={GraduationCap}
              index={2}
              to="/programs/global-islamic-research-ethical"
            />
          </div>

          <div className="lg:col-span-5">
            <ProgramCard 
              title="Scouting Movement – Islamic Perspective"
              description="Fostering youth development through the triple mandate: Duty to God, Duty to Others, and Duty to Self."
              icon={Users}
              index={3}
              to="/programs/scouting-movement"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
