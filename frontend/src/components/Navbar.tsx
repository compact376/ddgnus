import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-sage-200"
      id="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="font-serif text-2xl font-bold tracking-tight text-heritage-red" id="nav-logo">
          DGNUS
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

        <button className="md:hidden" id="mobile-menu-btn">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </motion.nav>
  );
};
