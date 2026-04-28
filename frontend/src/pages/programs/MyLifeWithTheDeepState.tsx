import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Footer } from '../../components/Footer';

export default function MyLifeWithTheDeepState() {
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
              <BookOpen size={20} />
            </div>
            <span className="text-xs uppercase tracking-editorial text-sage-500">Program</span>
          </div>
          <h1 className="mt-6 text-4xl font-serif font-semibold text-heritage-red">My Life with the Deep State</h1>
          <p className="mt-6 text-sm leading-7 text-on-surface-variant">
            This immersive program invites participants into a personal narrative of faith, power, and resilience. Learn how spiritual discipline and courageous leadership can shape a life of positive transformation.
          </p>

          <img
            src="/deep.png"
            alt="My Life with the Deep State"
            className="mt-10 w-full rounded-bento object-cover shadow-lg"
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="rounded-bento border border-sage-200 bg-sage-50 p-8">
              <h2 className="text-xl font-semibold text-on-surface">Key themes</h2>
              <ul className="mt-4 space-y-3 text-sm text-on-surface-variant">
                <li>Leadership through conviction and compassion</li>
                <li>Faith-informed resilience in modern systems</li>
                <li>Navigating social influence with ethics</li>
                <li>Personal stories of struggle and renewal</li>
              </ul>
            </div>
            <div className="rounded-bento border border-sage-200 bg-sage-50 p-8">
              <h2 className="text-xl font-semibold text-on-surface">Who this is for</h2>
              <ul className="mt-4 space-y-3 text-sm text-on-surface-variant">
                <li>Faith leaders seeking clarity in complex environments</li>
                <li>Activists focused on ethical transformation</li>
                <li>Anyone drawn to personal growth through purpose</li>
                <li>Readers of spiritual memoir and modern ethics</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/payments?item=deep_state"
              className="inline-flex items-center justify-center rounded-sm bg-heritage-red px-8 py-4 text-xs font-bold uppercase tracking-editorial text-white transition hover:bg-heritage-red-light"
            >
              Enroll in this program
            </Link>
            <Link
              to="/payments?item=book_preorder"
              className="inline-flex items-center justify-center rounded-sm border border-white bg-white px-8 py-4 text-xs font-bold uppercase tracking-editorial text-heritage-red transition hover:bg-sage-100"
            >
              Preorder the book
            </Link>
          </div>
        </motion.section>
      </div>
      <Footer />
    </main>
  );
}
