"use client";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-surface flex items-center justify-center py-28">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-8 md:px-12 text-center w-full">
        {/* Check icon */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto w-24 h-24 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mb-10"
        >
          <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-12"
        >
          <span className="text-primary font-label text-xs tracking-[0.4em] uppercase">Payment Confirmed</span>
          <h1 className="font-headline text-5xl md:text-6xl text-on-surface">Thank You!</h1>
          <p className="text-on-surface-variant text-xl font-light">Your payment was successful.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel rounded-2xl p-10 border border-white/5 mb-12 text-left"
        >
          <h2 className="font-headline text-xl text-primary mb-6 italic">
            {isBook ? "Book Preorder Confirmed" : "Wellness Program Enrollment Confirmed"}
          </h2>

          <div className="space-y-1 text-sm">
            {[
              {
                label: "Item",
                value: isBook ? "My Life with the Deep State" : "Soul & Body Wellness Program",
              },
              { label: "Amount Paid", value: isBook ? "$29" : "$299" },
              { label: "Status", value: "✓ Payment Successful", highlight: true },
            ].map((row) => (
              <div
                key={row.label}
                className="flex justify-between py-4 border-b border-outline-variant/20 last:border-0"
              >
                <span className="text-on-surface-variant">{row.label}</span>
                <span className={`font-medium ${row.highlight ? "text-primary" : "text-on-surface"}`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-on-surface-variant/70">
            A confirmation email has been sent to your inbox with all the details.
            {isBook && " Your book will be shipped upon release."}
            {!isBook && " We'll contact you soon to begin your wellness journey."}
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-10 py-4 border border-outline-variant/30 text-on-surface rounded-full font-bold tracking-wide hover:bg-surface-container transition-all flex items-center justify-center gap-3"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Return to Homepage
          </Link>
          <Link
            href={isBook ? "/book" : "/wellness"}
            className="px-10 py-4 bg-primary-container text-on-primary-container rounded-full font-bold tracking-wide hover:bg-primary transition-all flex items-center justify-center gap-3"
          >
            {isBook ? "View Book Details" : "Learn About Wellness"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <p className="text-xs text-on-surface-variant/30 mt-12">
          Transaction ID: {sessionId ? sessionId.slice(0, 12) + "..." : "N/A"}<br />
          Questions? Contact us at info@dgnus.com
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" />}>
      <SuccessContent />
    </Suspense>
  );
}
