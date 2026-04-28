import React from 'react';
import { Share2, Globe, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-heritage-red text-white py-20 border-t border-white/10" id="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl font-bold mb-8 tracking-tight">DGNUS</h3>
            <div className="text-white/70 text-sm space-y-4">
              <p>
                Dida Global Network<br />
                200 West Lake Street #465<br />
                Minneapolis, MN 50508
              </p>
              <p>Phone: 512-456-2512</p>
              <p>Email: didaglobalnetwork@gmail.com</p>
            </div>
            
            <div className="flex items-center gap-4 mt-8">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Share2 size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Globe size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Mail size={16} />
              </a>
            </div>
          </div>
          
          <div className="hidden lg:block lg:col-span-1"></div>
          
          <div>
            <h4 className="text-[10px] font-bold tracking-editorial uppercase mb-8 text-white/50">ECOSYSTEM</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#programs" className="hover:text-heritage-red-light transition-colors">Programs</a></li>
              <li><a href="#research" className="hover:text-heritage-red-light transition-colors">Research</a></li>
              <li><a href="#publications" className="hover:text-heritage-red-light transition-colors">Publications</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold tracking-editorial uppercase mb-8 text-white/50">CONNECT</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-heritage-red-light transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-heritage-red-light transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-heritage-red-light transition-colors">Spirituality & Wellness</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold tracking-editorial text-white/40 uppercase">
            © 2025 DGNUS Sanctuary Editorial. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
