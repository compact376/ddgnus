import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Shield, CreditCard, Trash2, Star } from 'lucide-react';
import { Footer } from '../components/Footer';
import {
  ApiResponse,
  CheckoutPayload,
  DEFAULT_SELECTED_ITEMS,
  PAGE_COPY,
  Product,
  ProductKey,
  PRODUCT_LIST,
  PRODUCTS,
} from '../shared/constants';

export default function Payments() {
  const [searchParams] = useSearchParams();
  const [selectedItems, setSelectedItems] = useState<ProductKey[]>(DEFAULT_SELECTED_ITEMS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const success = searchParams.get('success') === 'true';
  const canceled = searchParams.get('canceled') === 'true';

  // Initialize from URL (?item=book_preorder)
  useEffect(() => {
    const itemFromUrl = searchParams.get('item') as ProductKey | null;

    if (itemFromUrl && PRODUCTS[itemFromUrl]) {
      setSelectedItems([itemFromUrl]);
    }
  }, [searchParams]);

  const totalAmount = useMemo(() => {
    return selectedItems.reduce((sum, key) => sum + PRODUCTS[key].priceCents, 0);
  }, [selectedItems]);

  const selectedProductsList = useMemo(() => {
    return selectedItems.map((key) => PRODUCTS[key]);
  }, [selectedItems]);

  const formatPrice = (priceCents: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(priceCents / 100);
  };

  const toggleItem = (key: ProductKey) => {
    setSelectedItems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const removeItem = (key: ProductKey) => {
    setSelectedItems((prev) => prev.filter((k) => k !== key));
  };

  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      setError(PAGE_COPY.noSelectionError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Using process.env as requested (loaded via dotenv)
      const apiBaseUrl = process.env.VITE_API_URL || 'http://localhost:8080';

      const requestBody: CheckoutPayload = {
        items: selectedItems,
      };

      const response = await fetch(`${apiBaseUrl}/api/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error || 'Failed to create checkout session.');
      }

      const responseData = (await response.json()) as ApiResponse<{ url: string }>;
      const url = responseData?.data?.url || responseData?.url;

      if (!url) throw new Error('No checkout URL received from server.');

      window.location.href = url;
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-sage-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-heritage-red hover:text-heritage-red-light mb-8"
        >
          <ArrowLeft size={18} /> Back to Sanctuary
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white shadow-2xl overflow-hidden"
        >
          <div className="p-10 lg:p-16">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-heritage-red/10 text-heritage-red text-xs font-bold tracking-widest rounded-full">
                {PAGE_COPY.limitedCohorts}
              </span>
              <h1 className="text-5xl font-serif font-semibold text-heritage-red mt-6 leading-tight">
                {PAGE_COPY.heading}
              </h1>
              <p className="mt-5 text-lg text-on-surface-variant">
                {PAGE_COPY.subheading}
              </p>
            </div>

            {success && (
              <div className="mb-10 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center text-emerald-900">
                {PAGE_COPY.successMessage}
              </div>
            )}

            {canceled && (
              <div className="mb-10 p-6 bg-amber-50 border border-amber-200 rounded-2xl text-center text-amber-900">
                {PAGE_COPY.cancelMessage}
              </div>
            )}

            <div className="grid lg:grid-cols-12 gap-12">
              {/* Product Selection */}
              <div className="lg:col-span-7">
                <h2 className="text-2xl font-semibold mb-8">{PAGE_COPY.selectYourPath}</h2>

                <div className="space-y-6">
                  {PRODUCT_LIST.map((product: Product) => {
                    const isSelected = selectedItems.includes(product.key);
                    const isPopular = product.highlight === 'Most Popular';

                    return (
                      <div
                        key={product.key}
                        onClick={() => toggleItem(product.key)}
                        className={`group border-2 rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                          isSelected
                            ? 'border-heritage-red bg-heritage-red/5 shadow-md'
                            : 'border-sage-200 hover:border-sage-300'
                        }`}
                      >
                        <div className="flex items-start gap-6">
                          <div className="text-5xl flex-shrink-0 mt-1">{product.icon}</div>

                          <div className="flex-1">
                            {isPopular && (
                              <div className="inline-flex items-center gap-1 text-amber-600 text-sm font-medium mb-3">
                                <Star size={18} fill="currentColor" /> Most Popular
                              </div>
                            )}

                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-2xl font-semibold leading-tight pr-4">
                                  {product.title}
                                </h3>
                                <p className="text-sm text-sage-500 mt-2">
                                  {product.category} • Released {product.releaseDate} • Updated {product.updatedDate}
                                </p>
                              </div>
                              <p className="text-2xl font-bold text-heritage-red whitespace-nowrap">
                                {formatPrice(product.priceCents, product.currency)}
                              </p>
                            </div>

                            <p className="text-on-surface-variant mt-4 leading-relaxed text-[15px]">
                              {product.description}
                            </p>
                          </div>

                          <div
                            className={`w-8 h-8 rounded-2xl border-2 flex items-center justify-center mt-2 transition-all flex-shrink-0 ${
                              isSelected
                                ? 'bg-heritage-red border-heritage-red'
                                : 'border-sage-300 group-hover:border-heritage-red/50'
                            }`}
                          >
                            {isSelected && <Check size={20} className="text-white" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-5">
                <div className="sticky top-10 bg-sage-50 border border-sage-200 rounded-3xl p-9">
                  <h3 className="font-semibold text-xl mb-6">Your Investment</h3>

                  {selectedProductsList.length > 0 ? (
                    <div className="space-y-5 mb-8">
                      {selectedProductsList.map((product) => (
                        <div key={product.key} className="flex justify-between items-center bg-white p-5 rounded-2xl">
                          <div className="pr-4">
                            <p className="font-medium leading-tight">{product.title}</p>
                            <p className="text-xs text-sage-500 mt-1">{product.feature}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="font-semibold text-lg">
                              {formatPrice(product.priceCents, product.currency)}
                            </p>
                            <button
                              onClick={(e) => { e.stopPropagation(); removeItem(product.key); }}
                              className="text-red-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={19} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sage-500 py-12 text-center">{PAGE_COPY.noProgramsSelectedYet}</p>
                  )}

                  <div className="border-t border-sage-300 pt-6 mt-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-lg font-medium">{PAGE_COPY.investmentTitle}</span>
                      <span className="text-3xl font-bold text-heritage-red">
                        {formatPrice(totalAmount, 'USD')}
                      </span>
                    </div>
                    <p className="text-xs text-sage-500 mt-1">{PAGE_COPY.paymentNote}</p>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={loading || selectedItems.length === 0}
                    className="mt-10 w-full bg-heritage-red hover:bg-heritage-red-light disabled:bg-heritage-red/70 text-white font-bold uppercase tracking-widest py-6 rounded-2xl text-lg transition-all active:scale-[0.985]"
                  >
                    {loading ? PAGE_COPY.loadingText : PAGE_COPY.checkoutButton}
                  </button>

                  {error && <p className="text-red-600 text-sm text-center mt-4">{error}</p>}

                  <div className="flex items-center justify-center gap-8 mt-8 text-xs text-sage-500">
                    <div className="flex items-center gap-2"><Shield size={18} /> 256-bit SSL Secured</div>
                    <div className="flex items-center gap-2"><CreditCard size={18} /> Powered by Stripe</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}