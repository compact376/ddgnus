"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  // 1. Intersection Observer to track scroll position
  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const sectionIds = ["mission", "offerings", "about"];
    
    const observerOptions = {
      root: null,
      // Adjust rootMargin to trigger when the section is closer to the top/center
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // 2. Scroll listener to reset to HOME at the very top
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome, pathname]); // Re-run if path changes

  const navLinks = [
    { href: "/", label: "HOME", active: isHome && activeSection === "" },
    { href: "/#mission", label: "MISSION", active: isHome && activeSection === "mission" },
    { href: "/#offerings", label: "OFFERINGS", active: isHome && activeSection === "offerings" },
    { href: "/#about", label: "ABOUT", active: isHome && activeSection === "about" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-neutral-950/40 backdrop-blur-xl border-b border-white/5">
      <nav className="flex justify-between items-center px-8 py-6 w-full max-w-screen-2xl mx-auto">
        
        {/* Left Side: Burger + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary hover:text-primary/70 transition-colors md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <Link href="/" className="font-headline italic text-primary text-xl font-bold tracking-tight">
            DIDA GLOBAL NETWORKS
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(({ href, label, active }) => (
            <Link
              key={label}
              href={href}
              className={`font-label text-xs tracking-widest uppercase transition-colors duration-300 relative py-1 ${
                active ? "text-primary" : "text-neutral-400 hover:text-primary"
              }`}
            >
              {label}
              {active && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <button className="text-white/60 hover:text-primary transition-colors" aria-label="Search">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
          <Link
            href="/services"
            className="hidden lg:block px-6 py-2 bg-white text-black rounded-full text-xs font-bold tracking-widest uppercase hover:bg-primary hover:text-white transition-all"
          >
            BOOK SESSION
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-neutral-900 border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-8 py-8 gap-6">
              {navLinks.map(({ href, label, active }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm tracking-[0.2em] uppercase transition-colors ${
                    active ? "text-primary font-bold" : "text-neutral-400"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/services"
                onClick={() => setIsOpen(false)}
                className="mt-2 inline-block px-8 py-3 bg-primary text-white rounded-full text-xs font-bold tracking-widest uppercase w-fit"
              >
                BOOK SESSION
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}