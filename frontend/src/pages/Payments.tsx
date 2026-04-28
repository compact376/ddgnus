import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, GraduationCap, HeartPulse, Users } from 'lucide-react';
import { Footer } from '../components/Footer';

const products = {
  soul_body: {
    title: 'Soul & Body Wellness',
    description: 'A holistic wellness program integrating clinical practice and spiritual restoration.',
    priceText: 'Program enrollment',
    feature: 'Program',
    icon: HeartPulse,
  },
//   deep_state: {
//     title: 'My Life with the Deep State',
//     description: 'A transformative program based on personal faith, leadership, and ethical power.',
//     priceText: 'Program enrollment',
//     feature: 'Program',
//     icon: BookOpen,
//   },
  research: {
    title: 'Global Islamic Research Ethical',
    description: 'A research-centered program focused on ethical inquiry and community impact.',
    priceText: 'Program enrollment',
    feature: 'Program',
    icon: GraduationCap,
  },
  scouting: {
    title: 'Scouting Movement – Islamic Perspective',
    description: 'A faith-based scouting program that combines leadership, service, and self-discipline.',
    priceText: 'Program enrollment',
    feature: 'Program',
    icon: Users,
  },
  book_preorder: {
    title: 'Book Preorder',
    description: 'Reserve the companion book for My Life with the Deep State and be first to receive the launch edition.',
    priceText: 'Preorder',
    feature: 'Book',
    icon: BookOpen,
  },
};

type ProductKey = keyof typeof products;

export default function Payments() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const selectedKey = (searchParams.get('item') as ProductKey) ?? 'soul_body';
  const selectedProduct = products[selectedKey] ?? products.soul_body;

  const success = searchParams.get('success') === 'true';
  const canceled = searchParams.get('canceled') === 'true';

  const itemOptions = useMemo(() => Object.entries(products) as [ProductKey, typeof products[ProductKey]][], []);

  const handleCheckout = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item: selectedKey }),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body?.error || 'Failed to create checkout session.');
      }

      const { url } = await response.json();

      if (!url) {
        throw new Error('Stripe session did not return a redirect URL.');
      }

      window.location.href = url;
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-sage-50 pt-28">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-heritage-red hover:text-heritage-red-light transition-colors">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mt-10 rounded-bento bg-white p-10 shadow-editorial"
        >
          <div className="space-y-4">
            <span className="text-[10px] font-bold tracking-editorial uppercase text-sage-500">Payment</span>
            <h1 className="text-4xl font-serif font-semibold text-heritage-red">Checkout and preorder</h1>
            <p className="max-w-2xl text-sm leading-7 text-on-surface-variant">
              Complete your registration or preorder securely through Stripe. Select a program or preorder the book, then continue to checkout.
            </p>
          </div>

          {success && (
            <div className="mt-8 rounded-sm border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
              Payment completed successfully. Thank you for your order.
            </div>
          )}

          {canceled && (
            <div className="mt-8 rounded-sm border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
              Payment was canceled. You can retry below or choose a different option.
            </div>
          )}

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
            <div>
              <div className="rounded-bento border border-sage-200 bg-sage-50 p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-heritage-red text-white flex items-center justify-center">
                    {React.createElement(selectedProduct.icon, { size: 22 })}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-editorial text-sage-500">{selectedProduct.feature}</p>
                    <h2 className="mt-2 text-3xl font-serif font-semibold text-on-surface">{selectedProduct.title}</h2>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-7 text-on-surface-variant">{selectedProduct.description}</p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-sm bg-heritage-red px-8 py-4 text-xs font-bold uppercase tracking-editorial text-white transition hover:bg-heritage-red-light disabled:opacity-50"
                  >
                    {loading ? 'Redirecting…' : `Pay with Stripe`}
                  </button>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-sm border border-sage-200 bg-white px-8 py-4 text-xs font-bold uppercase tracking-editorial text-on-surface transition hover:bg-sage-100"
                  >
                    Choose a different item
                  </Link>
                </div>

                {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
              </div>
            </div>

            <aside className="space-y-6">
              {itemOptions.map(([key, product]) => (
                <Link
                  key={key}
                  to={`/payments?item=${key}`}
                  className={`block rounded-bento border p-6 transition ${key === selectedKey ? 'border-heritage-red bg-heritage-red/10' : 'border-sage-200 bg-white hover:border-heritage-red hover:bg-sage-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-heritage-red text-white flex items-center justify-center">
                      {React.createElement(product.icon, { size: 18 })}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-editorial text-sage-500">{product.feature}</p>
                      <h3 className="mt-1 text-lg font-semibold text-on-surface">{product.title}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-on-surface-variant">{product.description}</p>
                </Link>
              ))}
            </aside>
          </div>
        </motion.section>
      </div>
      <Footer />
    </main>
  );
}
