"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentPage() {
  const [service, setService] = useState<"wellness" | "book">("wellness");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Read service from URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");

    if (serviceParam === "book") {
      setService("book");
    } else {
      setService("wellness");
    }
  }, []);

  const serviceInfo = service === "wellness" 
    ? {
        title: "Soul & Body Wellness Program",
        subtitle: "8–12 Weeks Holistic Healing Journey",
        price: "$299",
        color: "emerald",
        description: "Complete restoration of body, mind, and soul"
      }
    : {
        title: "My Life with the Deep State",
        subtitle: "Justice in Hands of Power",
        price: "$29",
        color: "amber",
        description: "Book Preorder by Mohamed Abduba Dida"
      };

  const handleCheckout = async () => {
    if (!email.trim()) {
      alert("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/create-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: service,
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (data.url) {
        localStorage.setItem("lastPurchasedService", service);
        window.location.href = data.url; // Redirect to Stripe Checkout
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
    <div className="min-h-screen bg-zinc-950 py-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Back Button */}
        <Link 
          href={service === "wellness" ? "/wellness" : "/book"} 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-10 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to {service === "wellness" ? "Wellness" : "Book"} Details
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold tracking-tight mb-4">Complete Your Purchase</h1>
          <p className="text-zinc-400">Secure checkout powered by Stripe</p>
        </motion.div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 shadow-xl">
          {/* Order Summary */}
          <div className="mb-10 pb-8 border-b border-zinc-800">
            <div className="text-sm text-zinc-400 mb-2">YOU ARE PURCHASING</div>
            <h2 className="text-2xl font-semibold mb-2">{serviceInfo.title}</h2>
            <p className="text-zinc-400 mb-6">{serviceInfo.subtitle}</p>

            <div className="flex justify-between items-end">
              <div>
                <span className="text-5xl font-bold text-white">{serviceInfo.price}</span>
              </div>
              <div className="text-right">
                <div className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${service === "wellness" ? "bg-emerald-900/50 text-emerald-400" : "bg-amber-900/50 text-amber-400"}`}>
                  {service === "wellness" ? "Program" : "Preorder"}
                </div>
              </div>
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-10">
            <label className="block text-sm text-zinc-400 mb-3">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-6 py-4 bg-zinc-950 border border-zinc-700 rounded-2xl focus:outline-none focus:border-emerald-600 text-lg transition-all"
            />
            <p className="text-xs text-zinc-500 mt-2">You'll receive confirmation and access details here</p>
          </div>

          {/* Pay Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckout}
            disabled={loading || !email.trim()}
            className={`w-full py-5 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-all
              ${service === "wellness" 
                ? "bg-emerald-600 hover:bg-emerald-500" 
                : "bg-amber-600 hover:bg-amber-500"} 
              disabled:bg-zinc-700 disabled:cursor-not-allowed`}
          >
            {loading ? (
              "Processing Payment..."
            ) : (
              <>
                Pay {serviceInfo.price} Securely with Stripe
                <CheckCircle className="w-5 h-5" />
              </>
            )}
          </motion.button>

          {/* Trust Signals */}
          <div className="flex items-center justify-center gap-8 mt-10 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              🔒 Secure Payment
            </div>
            <div>Powered by Stripe</div>
            <div>SSL Encrypted</div>
          </div>
        </div>

        <p className="text-center text-[10px] text-zinc-600 mt-8">
          Your payment information is never stored on our servers. All transactions are handled securely by Stripe.
        </p>
      </div>
    </div>
  );
}