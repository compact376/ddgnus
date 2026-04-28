import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

export default function Contact() {
  return (
    <main className="min-h-screen bg-sage-50 pt-28">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-heritage-red hover:text-heritage-red-light transition-colors">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mt-10 rounded-bento bg-white p-10 shadow-editorial"
        >
          <div className="mb-8">
            <span className="text-[10px] tracking-editorial uppercase text-sage-500">Get in touch</span>
            <h1 className="mt-4 text-4xl font-serif font-semibold text-heritage-red">Contact the Sanctuary Team</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-on-surface-variant">
              Have a question about our programs, partnerships, or events? Send us a message and a member of our community team will respond shortly.
            </p>
          </div>

          <form className="grid gap-6">
            <label className="grid gap-2 text-sm text-on-surface">
              Name
              <input type="text" placeholder="Your name" className="w-full rounded-sm border border-sage-200 bg-sage-50 px-4 py-3 focus:border-heritage-red focus:outline-none" />
            </label>
            <label className="grid gap-2 text-sm text-on-surface">
              Email
              <input type="email" placeholder="you@example.com" className="w-full rounded-sm border border-sage-200 bg-sage-50 px-4 py-3 focus:border-heritage-red focus:outline-none" />
            </label>
            <label className="grid gap-2 text-sm text-on-surface">
              Message
              <textarea rows={6} placeholder="Tell us what you'd like to discuss" className="w-full rounded-sm border border-sage-200 bg-sage-50 px-4 py-3 focus:border-heritage-red focus:outline-none" />
            </label>
            <button type="submit" className="inline-flex items-center justify-center rounded-sm bg-heritage-red px-6 py-3 text-xs font-bold uppercase tracking-editorial text-white transition hover:bg-heritage-red-light">
              Send message
            </button>
          </form>
        </motion.section>
      </div>
      <Footer />
    </main>
  );
}
