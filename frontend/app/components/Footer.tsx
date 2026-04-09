import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface-container-lowest pt-20 pb-10">
      {/* Top border — primary tint */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-primary/30 to-transparent mb-16" />

      <div className="max-w-screen-2xl mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-outline-variant/30">
          {/* Brand */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="font-headline italic text-primary text-2xl font-bold block">
              DIDAS IDEA
            </Link>
            <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">
              Healing the Soul. Expanding the Mind.<br />
              Body &amp; Soul Restoration, Recovery and Healing Centre.
            </p>
            <div className="flex gap-3">
              {[
                {
                  label: "Facebook",
                  d: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
                },
                {
                  label: "Instagram",
                  d: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a2 2 0 002-2v-11a2 2 0 00-2-2h-11a2 2 0 00-2 2v11a2 2 0 002 2z",
                },
                {
                  label: "YouTube",
                  d: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
                },
              ].map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.d} />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div className="md:col-span-3 space-y-5">
            <h4 className="font-label text-xs tracking-widest uppercase text-on-surface">Navigate</h4>
            <div className="space-y-3 text-sm text-on-surface-variant">
              <Link href="/#mission" className="block hover:text-primary transition-colors">Mission</Link>
              <Link href="/#offerings" className="block hover:text-primary transition-colors">Offerings</Link>
              <Link href="/#about" className="block hover:text-primary transition-colors">About</Link>
              <Link href="/wellness" className="block hover:text-primary transition-colors">Wellness Program</Link>
              <Link href="/book" className="block hover:text-primary transition-colors">The Book</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 space-y-5">
            <h4 className="font-label text-xs tracking-widest uppercase text-on-surface">Contact</h4>
            <div className="space-y-3 text-sm text-on-surface-variant">
              <p>info@dgnus.com</p>
              <p>+254 XXX XXX XXX</p>
              <p>Nairobi, Kenya</p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-on-surface-variant">
            © {new Date().getFullYear()} DIDA GLOBAL NETWORKS (DIDAS IDEA LLC). All Rights Reserved.
          </div>
          <div className="font-headline italic text-primary/60 text-sm">DIDAS IDEA</div>
        </div>
      </div>
    </footer>
  );
}
