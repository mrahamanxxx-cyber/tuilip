import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Award, 
  Globe2, 
  Heart,
  Sparkles
} from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="bg-[#240408] text-[#FAF7F2] border-t-2 border-[#C5A059]/40 relative overflow-hidden">
      {/* Decorative Ornate Top Border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 text-left">
          
          {/* Col 1: Brand & Legacy (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center bg-[#4A0E17] font-display font-bold text-lg text-[#D4AF37]">
                TI
              </div>
              <div>
                <span className="font-display font-bold text-lg tracking-wider text-[#FAF7F2]">
                  TULIP INTERNATIONAL
                </span>
                <span className="block text-[11px] text-[#C5A059] uppercase font-serif-sub tracking-widest">
                  Est. 1987 &bull; Indian Antiques & Heritage Collectibles
                </span>
              </div>
            </div>

            <p className="text-xs text-[#FAF7F2]/80 leading-relaxed font-serif-sub max-w-sm">
              <em>“Preserving India’s Stories, One Relic at a Time.”</em> Founded in 1987 by <strong>Franchisko Gamini Paluwe</strong>. 
              European flagship salon in Munich (Augustenstraße 41) & conservation archive in Jaipur, Rajasthan.
            </p>

            <div className="flex items-center gap-3 text-xs text-[#E5C07B] pt-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>100% Certified Lifetime Provenance & Legal Title</span>
            </div>
          </div>

          {/* Col 2: Navigation & Sections (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#D4AF37] border-b border-[#C5A059]/30 pb-1.5">
              Curatorial Portals
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/80">
              <li>
                <button onClick={() => onNavigate('collection')} className="hover:text-[#FFF3B0] transition-colors">
                  Rare Artifacts Catalog (15+ Items)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-[#FFF3B0] transition-colors">
                  Heritage Photographic Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('provenance')} className="hover:text-[#FFF3B0] transition-colors">
                  CoA Certificate Verification
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="hover:text-[#FFF3B0] transition-colors">
                  Munich Showroom & Directions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#FFF3B0] transition-colors">
                  About Founder Franchisko Gamini Paluwe
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="text-[#FFF3B0] font-semibold hover:underline">
                  Book VIP Salon Viewing &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact & Showroom (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#D4AF37] border-b border-[#C5A059]/30 pb-1.5">
              Munich Flagship Salon
            </h4>
            
            <div className="space-y-2 text-xs text-[#FAF7F2]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Augustenstraße 41, 80333 München, Germany</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="tel:9083531892" className="text-[#FFF3B0] font-semibold hover:underline">
                  Direct Curator: 9083531892
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="mailto:munich@tulip-international.com" className="hover:underline">
                  munich@tulip-international.com
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1 text-[11px] text-[#E5C07B]">
                <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>Tue–Sat: 10:30–18:30 (CET) &bull; Private Appointments Available</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal & Cultural Compliance Bar */}
        <div className="mt-12 pt-6 border-t border-[#C5A059]/20 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#FAF7F2]/60">
          <p>
            &copy; 1987 – 2026 <strong>Tulip International</strong>. All rights reserved. Registered Antiquarian Salon München (Augustenstraße 41).
          </p>
          <div className="flex items-center gap-4 text-[10px]">
            <span>Ethical Heritage Stewardship</span>
            <span>&bull;</span>
            <span>UNESCO Convention Compliant</span>
            <span>&bull;</span>
            <span>Direct Line: 9083531892</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
