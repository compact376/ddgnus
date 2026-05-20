import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../../components/Footer';

interface Publication {
  id: number;
  title: string;
  description: string;
  image: string;
  status: string;
  highlights: string[];
  preorderLink?: string;
  price?: string;
}

export default function Publications() {
  const publications: Publication[] = [
    {
      id: 1,
      title: "My Life with the Deep State: Justice in the Hands of Power",
      description: "A powerful memoir of faith, resilience, and courage in the face of hidden powers.",
      image: "/deep.png",
      status: "LIMITED LAUNCH EDITION",
      price: "$20.00",
      preorderLink: "/payments?item=book_preorder",
      highlights: [
        "The hidden mechanics of power and how they shape our lives",
        "How faith becomes a shield and compass in turbulent times",
        "Personal stories of resistance, betrayal, and redemption",
        "Practical wisdom for maintaining integrity under pressure",
        "The intersection between spirituality, leadership, and justice",
        "A rare insider perspective on systems most people never see"
      ]
    },
    {
      id: 2,
      title: "Don't Call Them Jews",
      description: "An eye-opening exploration of identity, faith, and the misconceptions surrounding religious and ethnic labels.",
      image: "#",
      status: "COMING SOON",
      highlights: [
        "Challenging conventional narratives about identity",
        "Understanding the difference between faith and politics",
        "Historical context and contemporary implications",
        "A call for honest dialogue and understanding"
      ]
    },
    {
      id: 3,
      title: "Don't Call Them Christians",
      description: "A profound examination of what it truly means to follow Christ beyond denominational boundaries.",
      image: "#",
      status: "COMING SOON",
      highlights: [
        "Rediscovering authentic Christian faith",
        "Beyond institutional religion to personal relationship",
        "Scriptural foundations for genuine discipleship",
        "Building bridges across denominational divides"
      ]
    }
  ];

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
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="p-10 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-16"
            >
              <span className="text-[10px] font-bold tracking-editorial text-sage-500 uppercase mb-4 block">
                PUBLISHED WORKS
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold text-heritage-red mb-6">
                Publications
              </h1>
              <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
                Thought-provoking works exploring faith, identity, and the intersection of spirituality with contemporary challenges.
              </p>
            </motion.div>

            <div className="space-y-20">
              {publications.map((pub, index) => (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
                  className="bg-sage-50 rounded-3xl p-10 lg:p-16"
                >
                  <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1">
                      <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden shadow-xl">
                        <img
                          src={pub.image}
                          alt={pub.title}
                          className="w-full h-full object-cover opacity-80"
                        />
                      </div>
                      <div className="mt-6 text-center">
                        <span className="inline-block px-4 py-2 bg-heritage-red text-white text-xs font-bold tracking-widest rounded-full">
                          {pub.status}
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-2">
                      <h2 className="font-serif text-3xl font-semibold text-heritage-red mb-4">
                        {pub.title}
                      </h2>
                      <p className="text-lg text-on-surface-variant mb-8">
                        {pub.description}
                      </p>

                      <h3 className="font-semibold text-xl text-heritage-red mb-4">What You'll Discover</h3>
                      <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                        {pub.highlights.map((item, idx) => (
                          <div key={idx} className="flex gap-3">
                            <div className="w-2 h-2 mt-2.5 rounded-full bg-heritage-red flex-shrink-0" />
                            <p className="text-sm leading-relaxed text-on-surface-variant">{item}</p>
                          </div>
                        ))}
                      </div>

{pub.id === 1 && pub.preorderLink && pub.price && (
                        <div className="mt-8">
                          <Link
                            to={pub.preorderLink}
                            className="inline-flex items-center justify-center bg-heritage-red hover:bg-heritage-red-light transition-all text-white font-bold uppercase tracking-widest px-12 py-4 rounded-2xl text-base shadow-lg active:scale-[0.985]"
                          >
                            Preorder Now — {pub.price}
                          </Link>
                          <p className="text-xs text-sage-500 mt-4">
                            Secure payment via Stripe • Immediate confirmation • Ships on launch day
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </main>
  );
}