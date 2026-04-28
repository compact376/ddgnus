import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, HeartPulse } from 'lucide-react';
import { Footer } from '../../components/Footer';

export default function SoulBodyWellness() {
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
              <HeartPulse size={20} />
            </div>
            <span className="text-xs uppercase tracking-editorial text-sage-500">Program</span>
          </div>
          <h1 className="mt-6 text-4xl font-serif font-semibold text-heritage-red">Soul & Body Wellness</h1>
          <p className="mt-6 text-sm leading-7 text-on-surface-variant">
            The Soul & Body Wellness program blends clinical wellness with spiritual restoration. It is designed to help participants recover balance through nutrition, movement, guided reflection, and structured rituals rooted in tradition.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="rounded-bento border border-sage-200 bg-sage-50 p-8">
              <h2 className="text-xl font-semibold text-on-surface">What you will explore</h2>
              <ul className="mt-4 space-y-3 text-sm text-on-surface-variant">
                <li>Mind-body grounding practices and breath work</li>
                <li>Restorative rituals for emotional resilience</li>
                <li>Community support sessions and guided reflections</li>
                <li>Nutrition frameworks aligned with spiritual health</li>
              </ul>
            </div>
            <div className="rounded-bento border border-sage-200 bg-sage-50 p-8">
              <h2 className="text-xl font-semibold text-on-surface">Program outcomes</h2>
              <ul className="mt-4 space-y-3 text-sm text-on-surface-variant">
                <li>Renewed energy and mental clarity</li>
                <li>Stronger connection between mind, body, and faith</li>
                <li>Practical tools for everyday wellbeing</li>
                <li>Access to a supportive wellness community</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/payments?item=soul_body"
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
