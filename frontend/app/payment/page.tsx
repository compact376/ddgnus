"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PaymentPage() {
  const [service, setService] = useState<"wellness" | "book">("wellness");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    if (serviceParam === "book") {
      setService("book");
    } else {
      setService("wellness");
    }
  }, []);

  const serviceInfo =
    service === "wellness"
      ? {
          title: "Soul & Body Wellness Program",
          subtitle: "8–12 Weeks Holistic Healing Journey",
          price: "$299",
          tag: "Program",
          description: "Complete restoration of body, mind, and soul",
        }
      : {
          title: "My Life with the Deep State",
          subtitle: "Justice in Hands of Power",
          price: "$29",
          tag: "Preorder",
          description: "Book Preorder by Mohamed Abduba Dida",
        };

  const handleCheckout = async () => {
    if (!email.trim()) {
      alert("Please enter your email address");
      return;
    }

    setLoading(true);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

    try {
      const response = await fetch(`${backendUrl}/api/create-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, email: email.trim() }),
      });

      const data = await response.json();

      if (data.url) {
        localStorage.setItem("lastPurchasedService", service);
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to create payment session. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface py-28">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-8 md:px-12">
        <Link
          href={service === "wellness" ? "/wellness" : "/book"}
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-12 font-label text-xs tracking-widest uppercase"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to {service === "wellness" ? "Wellness" : "Book"} Details
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 space-y-4"
        >
          <span className="text-primary font-label text-xs tracking-[0.4em] uppercase">Secure Checkout</span>
          <h1 className="font-headline text-4xl md:text-5xl text-on-surface">Complete Your Purchase</h1>
          <p className="text-on-surface-variant text-sm">Secure checkout powered by Stripe</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel rounded-2xl p-10 border border-white/5 shadow-2xl space-y-10"
        >
          {/* Order Summary */}
          <div className="pb-8 border-b border-outline-variant/20 space-y-4">
            <div className="text-on-surface-variant font-label text-xs tracking-widest uppercase">You Are Purchasing</div>
            <h2 className="font-headline text-2xl text-on-surface">{serviceInfo.title}</h2>
            <p className="text-on-surface-variant text-sm">{serviceInfo.subtitle}</p>

            <div className="flex justify-between items-end pt-2">
              <div className="font-headline text-5xl text-on-surface">{serviceInfo.price}</div>
              <span
                className={`px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase ${
                  service === "wellness"
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "bg-secondary/10 text-secondary border border-secondary/20"
                }`}
              >
                {serviceInfo.tag}
              </span>
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-3">
            <label className="block text-on-surface-variant font-label text-xs tracking-widest uppercase">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-6 py-4 bg-surface-container-high border border-outline-variant/30 rounded-xl focus:outline-none focus:border-primary/50 text-on-surface text-base transition-all placeholder:text-on-surface-variant/30"
            />
            <p className="text-xs text-on-surface-variant/50">
              You&apos;ll receive confirmation and access details here
            </p>
          </div>

          {/* Pay Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckout}
            disabled={loading || !email.trim()}
            className={`w-full py-5 rounded-full font-bold tracking-wide text-sm flex items-center justify-center gap-3 transition-all
              ${
                service === "wellness"
                  ? "bg-primary-container text-on-primary-container hover:bg-primary"
                  : "bg-secondary-container text-on-secondary-container hover:brightness-110"
              }
              disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {loading ? (
              "Processing Payment..."
            ) : (
              <>
                Pay {serviceInfo.price} Securely with Stripe
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </>
            )}
          </motion.button>

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-8 text-xs text-on-surface-variant/50">
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure Payment
            </div>
            <div>Powered by Stripe</div>
            <div>SSL Encrypted</div>
          </div>
        </motion.div>

        <p className="text-center text-xs text-on-surface-variant/30 mt-8">
          Your payment information is never stored on our servers. All transactions are handled securely by Stripe.
        </p>
      </div>
    </div>
  );
}
