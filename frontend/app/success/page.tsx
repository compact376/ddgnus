"use client";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [service, setService] = useState<"wellness" | "book">("wellness");

  useEffect(() => {
    const storedService = localStorage.getItem("lastPurchasedService");
    if (storedService === "book") {
      setService("book");
    }
  }, []);

  const isBook = service === "book";

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center py-12">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mx-auto w-24 h-24 bg-emerald-900/50 rounded-full flex items-center justify-center mb-8">
            <CheckCircle className="w-16 h-16 text-emerald-400" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
        >
          Thank You!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl text-zinc-300 mb-4"
        >
          Your payment was successful
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-12"
        >
          <h2 className="text-xl font-semibold mb-6 text-emerald-400">
            {isBook ? "Book Preorder Confirmed" : "Wellness Program Enrollment Confirmed"}
          </h2>

          <div className="space-y-4 text-left text-zinc-300">
            <div className="flex justify-between py-3 border-b border-zinc-800">
              <span>Item</span>
              <span className="font-medium">
                {isBook ? "My Life with the Deep State" : "Soul & Body Wellness Program"}
              </span>
            </div>
            <div className="flex justify-between py-3 border-b border-zinc-800">
              <span>Amount Paid</span>
              <span className="font-medium">{isBook ? "$29" : "$299"}</span>
            </div>
            <div className="flex justify-between py-3">
              <span>Status</span>
              <span className="text-emerald-400 font-medium">✓ Payment Successful</span>
            </div>
          </div>

          <div className="mt-8 text-sm text-zinc-400">
            A confirmation email has been sent to your inbox with all the details.
            {isBook && " Your book will be shipped upon release."}
            {!isBook && " We'll contact you soon to begin your wellness journey."}
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-zinc-800 hover:bg-zinc-700 rounded-2xl font-medium flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              <Home className="w-5 h-5" />
              Return to Homepage
            </motion.button>
          </Link>

          <Link href={isBook ? "/book" : "/wellness"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-medium flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              {isBook ? "View Book Details" : "Learn About Wellness"}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>

        <p className="text-xs text-zinc-500 mt-12">
          Transaction ID: {sessionId ? sessionId.slice(0, 12) + "..." : "N/A"}<br />
          If you have any questions, please contact us at info@dgnus.com
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950" />}>
      <SuccessContent />
    </Suspense>
  );
}
