import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, Calendar, Award, Users } from 'lucide-react';
import { Footer } from '../../components/Footer';

export default function MyLifeWithTheDeepState() {
  return (
    <main className="min-h-screen bg-sage-50 pt-28">
      <div className="max-w-5xl mx-auto px-6 py-16">
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-heritage-red hover:text-heritage-red-light transition-colors mb-10"
        >
          <ArrowLeft size={18} /> Return to Sanctuary
        </Link>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Hero Section */}
          <div className="relative h-[500px] bg-black">
            <img
              src="/deep.png"
              alt="My Life with the Deep State - Book"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            <div className="absolute bottom-0 left-0 p-10 lg:p-16 text-white">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold tracking-widest border border-white/20 mb-6">
                LIMITED LAUNCH EDITION
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-serif font-semibold leading-tight">
                My Life with the Deep State
              </h1>
              <p className="mt-4 text-xl text-white/90 max-w-lg">
                A powerful memoir of faith, resilience, and courage in the face of hidden powers.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-10 lg:p-16">
            <div className="max-w-3xl">
              <p className="text-lg leading-relaxed text-on-surface-variant">
                In this deeply personal and unflinching book, Mohamed Abduba Dida takes you behind the veil 
                of power, politics, and spiritual warfare. Through raw storytelling and profound insight, 
                he reveals how faith and moral clarity can help one navigate — and rise above — the complexities 
                of our modern world.
              </p>
            </div>

            {/* Book Details */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="bg-sage-50 rounded-2xl p-8">
                <BookOpen className="text-heritage-red mb-4" size={32} />
                <h3 className="font-semibold text-xl mb-2">Launch Edition</h3>
                <p className="text-sm text-on-surface-variant">
                  First print run with exclusive foreword and author signature
                </p>
              </div>
              <div className="bg-sage-50 rounded-2xl p-8">
                <Calendar className="text-heritage-red mb-4" size={32} />
                <h3 className="font-semibold text-xl mb-2">Releasing Soon</h3>
                <p className="text-sm text-on-surface-variant">
                  Preorder now to receive your copy on launch day
                </p>
              </div>
              <div className="bg-sage-50 rounded-2xl p-8">
                <Award className="text-heritage-red mb-4" size={32} />
                <h3 className="font-semibold text-xl mb-2">Collector’s Item</h3>
                <p className="text-sm text-on-surface-variant">
                  Limited copies with special design and early access to bonus material
                </p>
              </div>
            </div>

            {/* What Readers Will Gain */}
            <div className="mt-20">
              <h2 className="text-2xl font-semibold text-heritage-red mb-8">What You’ll Discover</h2>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-on-surface-variant">
                {[
                  "The hidden mechanics of power and how they shape our lives",
                  "How faith becomes a shield and compass in turbulent times",
                  "Personal stories of resistance, betrayal, and redemption",
                  "Practical wisdom for maintaining integrity under pressure",
                  "The intersection between spirituality, leadership, and justice",
                  "A rare insider perspective on systems most people never see"
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-2 h-2 mt-2.5 rounded-full bg-heritage-red flex-shrink-0" />
                    <p className="leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Preorder CTA */}
            <div className="mt-20 bg-sage-50 rounded-3xl p-12 lg:p-16 text-center">
              <h3 className="text-3xl font-serif font-semibold text-heritage-red">
                Reserve Your Copy Today
              </h3>
              <p className="mt-4 text-on-surface-variant max-w-md mx-auto">
                Be among the first to receive the official launch edition. 
                Limited copies available.
              </p>

              <div className="mt-10">
                <Link
                  to="/payments?item=book_preorder"
                  className="inline-flex items-center justify-center bg-heritage-red hover:bg-heritage-red-light transition-all 
                             text-white font-bold uppercase tracking-widest px-16 py-6 rounded-2xl text-base shadow-lg active:scale-[0.985]"
                >
                  Preorder Now — KSh 6,500
                </Link>
              </div>

              <p className="text-xs text-sage-500 mt-8">
                Secure payment via Stripe • Immediate confirmation • Ships on launch day
              </p>
            </div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </main>
  );
}