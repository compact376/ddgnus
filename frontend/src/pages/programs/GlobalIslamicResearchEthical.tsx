import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { Footer } from '../../components/Footer';

export default function GlobalIslamicResearchEthical() {
  return (
    <main className="min-h-screen bg-sage-50 pt-28">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-heritage-red hover:text-heritage-red-light transition-colors">
          <ArrowLeft size={16} /> Return to Sanctuary home
        </Link>

        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mt-10 rounded-bento bg-white p-10 shadow-editorial"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-heritage-red text-white">
              <GraduationCap size={20} />
            </div>
            <span className="text-xs uppercase tracking-editorial text-sage-500">Program</span>
          </div>
          <h1 className="mt-6 text-4xl font-serif font-semibold text-heritage-red">Global Islamic Research Ethical</h1>
          <p className="mt-6 text-sm leading-7 text-on-surface-variant">
            This program centers on ethical research at the intersection of faith, science, and community. It focuses on pioneering studies like the Infant Urine Research Project while maintaining a strong ethical framework.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="rounded-bento border border-sage-200 bg-sage-50 p-8">
              <h2 className="text-xl font-semibold text-on-surface">What participants learn</h2>
              <ul className="mt-4 space-y-3 text-sm text-on-surface-variant">
                <li>Best practices for ethical research in faith communities</li>
                <li>Frameworks that honor scientific rigor and spiritual values</li>
                <li>Historical and contemporary case studies</li>
                <li>Collaborative methods for cross-disciplinary inquiry</li>
              </ul>
            </div>
            <div className="rounded-bento border border-sage-200 bg-sage-50 p-8">
              <h2 className="text-xl font-semibold text-on-surface">Program benefits</h2>
              <ul className="mt-4 space-y-3 text-sm text-on-surface-variant">
                <li>A deeper understanding of ethical research design</li>
                <li>Practical tools for community-centered inquiry</li>
                <li>Access to a network of scholars and faith leaders</li>
                <li>Grounding in the latest ethical research conversations</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/payments?item=research"
              className="inline-flex items-center justify-center rounded-sm bg-heritage-red px-8 py-4 text-xs font-bold uppercase tracking-editorial text-white transition hover:bg-heritage-red-light"
            >
              Enroll in this program
            </Link>
          </div>
        </motion.section>
      </div>
      <Footer />
    </main>
  );
}
