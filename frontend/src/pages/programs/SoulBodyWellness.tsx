import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, HeartPulse, Sparkles, Users, Calendar, Award } from 'lucide-react';
import { Footer } from '../../components/Footer';

export default function SoulBodyWellness() {
  return (
    <main className="min-h-screen bg-sage-50 pt-28">
      <div className="max-w-6xl mx-auto px-6 py-16">
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-heritage-red hover:text-heritage-red-light transition-colors mb-10"
        >
          <ArrowLeft size={18} /> Return to Sanctuary
        </Link>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Hero Section */}
          <div className="relative h-[520px] bg-black">
            <div className="absolute inset-0 bg-[radial-gradient(at_center,#00000088_30%,#00000022)]" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-6">
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold tracking-widest border border-white/20 mb-6">
                  REKINDLING FAITH & PURPOSE
                </div>
                <h1 className="text-5xl lg:text-6xl font-serif font-semibold leading-tight max-w-4xl mx-auto">
                  Soul & Body Wellness
                </h1>
                <p className="mt-6 text-xl max-w-2xl mx-auto text-white/90">
                  A sacred journey for Muslim youth who have lost their drive, purpose, 
                  and connection with Allah — and are ready to return home to themselves.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-10 lg:p-16">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg leading-relaxed text-on-surface-variant">
                This is more than a wellness program. It is a gentle, faith-centered journey 
                of spiritual restoration. Designed specifically for young Muslims who feel 
                disconnected, lost, or burned out — we walk with them as they rediscover their 
                purpose and rekindle their relationship with Allah.
              </p>
            </div>

            {/* Program Essence */}
            <div className="mt-20 grid md:grid-cols-3 gap-8">
              <div className="bg-sage-50 rounded-2xl p-8 text-center">
                <Sparkles className="mx-auto text-heritage-red mb-5" size={36} />
                <h3 className="font-semibold text-xl mb-3">Spiritual Rekindling</h3>
                <p className="text-sm text-on-surface-variant">
                  Gentle guidance to rebuild your connection with Allah through prayer, reflection, 
                  and remembrance.
                </p>
              </div>
              <div className="bg-sage-50 rounded-2xl p-8 text-center">
                <HeartPulse className="mx-auto text-heritage-red mb-5" size={36} />
                <h3 className="font-semibold text-xl mb-3">Mind & Body Healing</h3>
                <p className="text-sm text-on-surface-variant">
                  Blend of clinical wellness practices and Islamic traditions to restore energy, 
                  clarity, and inner peace.
                </p>
              </div>
              <div className="bg-sage-50 rounded-2xl p-8 text-center">
                <Users className="mx-auto text-heritage-red mb-5" size={36} />
                <h3 className="font-semibold text-xl mb-3">Brotherhood & Sisterhood</h3>
                <p className="text-sm text-on-surface-variant">
                  A safe, supportive community of peers walking the same path of renewal.
                </p>
              </div>
            </div>

            {/* Journey Description */}
            <div className="mt-20 bg-sage-50 rounded-3xl p-12 lg:p-16">
              <h2 className="text-3xl font-serif font-semibold text-heritage-red text-center mb-8">
                The Journey of Return
              </h2>
              <div className="max-w-3xl mx-auto text-on-surface-variant leading-relaxed space-y-6 text-[15.5px]">
                <p>
                  Many young Muslims today feel lost — disconnected from their faith, drained of motivation, 
                  and unsure of their purpose. This program creates a nurturing space where they are not judged, 
                  but gently guided back to reality and back to Allah.
                </p>
                <p>
                  Through a carefully designed blend of spiritual practices, emotional healing, physical wellness, 
                  and sincere companionship, participants experience a profound transformation — from confusion to clarity, 
                  from emptiness to purpose, and from spiritual distance to closeness with their Creator.
                </p>
              </div>
            </div>

            {/* What Participants Receive */}
            <div className="mt-20">
              <h2 className="text-2xl font-semibold text-heritage-red mb-10 text-center">What You Will Gain</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  "A renewed and living connection with Allah",
                  "Restored sense of purpose and direction in life",
                  "Practical tools for emotional and mental resilience",
                  "Healthy habits that honor both body and soul",
                  "A supportive faith-based community",
                  "Clarity on your unique role in this world"
                ].map((benefit, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-heritage-red mt-1">✦</div>
                    <p className="text-on-surface-variant">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-20 pt-12 border-t border-sage-200">
              <div className="bg-gradient-to-br from-heritage-red/5 to-sage-50 rounded-3xl p-12 lg:p-16 text-center">
                <h3 className="text-3xl font-serif font-semibold text-heritage-red">
                  Ready to Return to Your Purpose?
                </h3>
                <p className="mt-4 text-on-surface-variant max-w-md mx-auto">
                  If you are a young Muslim feeling lost and longing for reconnection — 
                  this journey was made for you.
                </p>

                <Link
                  to="/payments?item=soul_body"
                  className="mt-10 inline-flex items-center justify-center bg-heritage-red hover:bg-heritage-red-light transition-all 
                             text-white font-bold uppercase tracking-widest px-14 py-6 rounded-2xl text-base shadow-lg active:scale-[0.985]"
                >
                  Enroll in Soul & Body Wellness
                </Link>

                <p className="text-xs text-sage-500 mt-8">
                  Limited spots per cohort • Next intake begins soon
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </main>
  );
}