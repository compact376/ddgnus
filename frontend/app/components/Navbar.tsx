"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-lg border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
            D
          </div>
          <div>
            <div className="font-semibold text-xl tracking-tight">DIDA GLOBAL NETWORKS</div>
            <div className="text-[10px] text-zinc-500 -mt-1">DIDAS IDEA LLC</div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-9 text-sm font-medium">
          <Link href="#about" className="hover:text-emerald-400 transition-colors">Who We Are</Link>
          <Link href="#offerings" className="hover:text-emerald-400 transition-colors">What We Offer</Link>
          <Link href="/book" className="hover:text-emerald-400 transition-colors">The Book</Link>
          <Link href="/wellness" className="hover:text-emerald-400 transition-colors">Wellness</Link>
        </div>

        {/* CTA Button */}
      <Link 
  href="/services" 
  className="hidden md:block px-7 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-full text-sm font-medium transition-all"
>
  Begin Your Journey
</Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-zinc-300"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950 border-t border-zinc-800 py-6">
          <div className="flex flex-col px-6 gap-6 text-lg">
            <Link href="#about" onClick={() => setIsOpen(false)}>Who We Are</Link>
            <Link href="#offerings" onClick={() => setIsOpen(false)}>What We Offer</Link>
            <Link href="/book" onClick={() => setIsOpen(false)}>The Book</Link>
            <Link href="/wellness" onClick={() => setIsOpen(false)}>Wellness Program</Link>
           <Link href="/services" onClick={() => setIsOpen(false)} className="text-emerald-400 font-medium">
                Begin Your Journey
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}