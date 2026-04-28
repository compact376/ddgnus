import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!menuOpen) {
        return;
      }

      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [menuOpen]);

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-sage-200"
      id="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="font-serif text-2xl font-bold tracking-tight text-heritage-red" id="nav-logo">
          DIDA GLOBAL NETWORKS
        </div>

        <div className="hidden md:flex items-center gap-10" id="nav-links">
          <Link to="/" className="text-xs font-bold tracking-editorial text-on-surface hover:text-heritage-red-light transition-colors">
            HOME
          </Link>
          <a href="/#about" className="text-xs font-bold tracking-editorial text-on-surface hover:text-heritage-red-light transition-colors">
            ABOUT
          </a>
          <a href="/#programs" className="text-xs font-bold tracking-editorial text-on-surface hover:text-heritage-red-light transition-colors">
            PROGRAMS
          </a>
          <Link to="/contact" className="text-xs font-bold tracking-editorial text-on-surface hover:text-heritage-red-light transition-colors">
            CONTACT
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-sage-200 bg-white/90 p-2 text-on-surface shadow-sm transition hover:bg-sage-100 md:hidden"
          id="mobile-menu-btn"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-sage-200 bg-white/95 shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-3">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-bold tracking-editorial text-on-surface hover:text-heritage-red-light transition-colors"
            >
              HOME
            </Link>
            <a
              href="/#about"
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-bold tracking-editorial text-on-surface hover:text-heritage-red-light transition-colors"
            >
              ABOUT
            </a>
            <a
              href="/#programs"
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-bold tracking-editorial text-on-surface hover:text-heritage-red-light transition-colors"
            >
              PROGRAMS
            </a>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-bold tracking-editorial text-on-surface hover:text-heritage-red-light transition-colors"
            >
              CONTACT
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
