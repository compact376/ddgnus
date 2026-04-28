import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Users } from 'lucide-react';
import { Footer } from '../../components/Footer';

export default function ScoutingMovement() {
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
              <Users size={20} />
            </div>
            <span className="text-xs uppercase tracking-editorial text-sage-500">Program</span>
          </div>
          <h1 className="mt-6 text-4xl font-serif font-semibold text-heritage-red">Scouting Movement – Islamic Perspective</h1>
          <p className="mt-6 text-sm leading-7 text-on-surface-variant">
            This program brings the traditional scouting model into a faith-based, values-centered context. Participants learn leadership, service, and self-discipline from the perspective of spiritual responsibility.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="rounded-bento border border-sage-200 bg-sage-50 p-8">
              <h2 className="text-xl font-semibold text-on-surface">Core commitments</h2>
              <ul className="mt-4 space-y-3 text-sm text-on-surface-variant">
                <li>Duty to God through ritual and awareness</li>
                <li>Duty to others through service and fellowship</li>
                <li>Duty to self through physical and moral growth</li>
                <li>Community-building through shared purpose</li>
              </ul>
            </div>
            <div className="rounded-bento border border-sage-200 bg-sage-50 p-8">
              <h2 className="text-xl font-semibold text-on-surface">Program experience</h2>
              <ul className="mt-4 space-y-3 text-sm text-on-surface-variant">
                <li>Outdoor and community service learning</li>
                <li>Structured mentorship and peer leadership</li>
                <li>Faith-driven character development</li>
                <li>Rituals and practices rooted in heritage</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/payments?item=scouting"
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
