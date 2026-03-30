import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black pt-16 pb-10 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Left - Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl">
                D
              </div>
              <div>
                <div className="font-semibold text-2xl tracking-tight">DIDA GLOBAL NETWORKS</div>
                <div className="text-zinc-500">DIDAS IDEA LLC</div>
              </div>
            </div>

            <p className="text-zinc-400 max-w-xs">
              Healing the Soul. Expanding the Mind.<br />
              Body & Soul Restoration, Recovery and Healing Centre.
            </p>
          </div>

          {/* Right - Links & Contact */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <h4 className="font-medium mb-4 text-zinc-300">Quick Links</h4>
              <div className="space-y-3 text-sm text-zinc-400">
                <a href="#about" className="block hover:text-white">Who We Are</a>
                <a href="#offerings" className="block hover:text-white">What We Offer</a>
                <a href="/wellness" className="block hover:text-white">Wellness Program</a>
                <a href="/book" className="block hover:text-white">The Book</a>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4 text-zinc-300">Contact</h4>
              <div className="space-y-3 text-sm text-zinc-400">
                <p>Email: info@dgnus.com</p>
                <p>Phone: +254 XXX XXX XXX</p>
                <p>Nairobi, Kenya</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4 text-zinc-300">Follow Us</h4>
              <div className="space-y-3 text-sm text-zinc-400">
                <p>Facebook</p>
                <p>Instagram</p>
                <p>YouTube</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} DIDA GLOBAL NETWORKS (DIDAS IDEA LLC). All Rights Reserved.
          </div>
          <div className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> for truth and healing
          </div>
        </div>
      </div>
    </footer>
  );
}