import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Award, 
  Compass, 
  PhoneCall, 
  ChevronRight,
  Landmark
} from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreCollection: () => void;
  onOpenProvenance: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onExploreCollection,
  onOpenProvenance,
}) => {
  return (
    <section id="hero" className="relative bg-[#36080F] text-[#FAF7F2] overflow-hidden border-b border-[#C5A059]/40">
      {/* Royal Rajputana Background Gradient & Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#58111A] via-[#36080F] to-[#1E0407] opacity-95"></div>
      
      {/* Decorative Ornate Gold Borders */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>

      {/* Subtle background visual watermark */}
      <div 
        className="absolute inset-0 opacity-10 bg-center bg-cover pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80')`
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Narrative */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Royal Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4A0E17] border border-[#D4AF37]/50 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#E5C07B] font-display">
                Curated by Franchisko Gamini Paluwe • Since 1987
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight text-[#FAF7F2]">
              Preserving India’s Stories, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF3B0] via-[#E5C07B] to-[#C5A059]">
                One Relic at a Time.
              </span>
            </h1>

            {/* Tagline & Summary */}
            <p className="text-base sm:text-lg text-[#FAF7F2]/80 font-serif-sub max-w-2xl leading-relaxed text-balance">
              Europe’s distinguished salon for authenticated Indian royal antiquities, temple bronzes, 
              Wootz steel Rajput weaponry, hand-painted miniatures, and heirloom haveli furnishings. 
              Serving esteemed museums, private vaults, and discerning international collectors.
            </p>

            {/* Location Pill */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#E5C07B] bg-[#4A0E17]/80 p-3 rounded-lg border border-[#C5A059]/30 max-w-xl">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>
                <strong>Munich Salon:</strong> Augustenstraße 41, 80333 München, Germany &bull; 
                <span className="text-[#FAF7F2]/80 ml-1">Direct: 9083531892</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                id="hero-book-viewing-cta"
                className="px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#E5C07B] to-[#AA771C] text-[#2E050B] rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer font-display"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Private Salon Viewing</span>
              </button>

              <button
                onClick={onExploreCollection}
                id="hero-explore-collection-cta"
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider bg-transparent hover:bg-[#4A0E17] text-[#FAF7F2] border border-[#C5A059] rounded-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Browse Artifact Catalog</span>
                <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <button
                onClick={onOpenProvenance}
                id="hero-verify-coa-cta"
                className="text-xs text-[#E5C07B] hover:text-[#FFF3B0] flex items-center gap-1.5 underline decoration-[#C5A059]/50 underline-offset-4 py-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Verify Certificate of Authenticity (CoA)</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#C5A059]/20 max-w-lg text-xs">
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-[#D4AF37]">1987</span>
                <span className="text-[#FAF7F2]/70 text-[11px]">38+ Yrs Heritage</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-[#D4AF37]">100%</span>
                <span className="text-[#FAF7F2]/70 text-[11px]">Certified Provenance</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-[#D4AF37]">Global</span>
                <span className="text-[#FAF7F2]/70 text-[11px]">Insured Courier</span>
              </div>
            </div>

          </div>

          {/* Featured Heritage Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-[#240408] rounded-xl border-2 border-[#D4AF37]/60 p-3 shadow-2xl overflow-hidden">
              
              {/* Corner Accents */}
              <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]"></div>
              <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]"></div>
              <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]"></div>
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]"></div>

              <div className="relative h-80 sm:h-96 rounded-lg overflow-hidden group">
                <img
                  src="/image-bainocooler-1800.jpeg"
                  alt="Royal Indian Temple Lamp Antique"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E0407] via-transparent to-transparent"></div>

                {/* Floating Status Pill */}
                <div className="absolute top-3 left-3 bg-[#36080F]/90 backdrop-blur-sm border border-[#D4AF37] px-3 py-1 rounded-full text-[11px] font-semibold text-[#FFF3B0] flex items-center gap-1.5 shadow">
                  <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Museum Grade • Marwar Court c. 1785</span>
                </div>

                {/* Item Card Details */}
                <div className="absolute bottom-3 inset-x-3 bg-[#36080F]/95 backdrop-blur-md p-4 rounded-lg border border-[#C5A059]/40 space-y-1.5 text-left">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                        Certificate No. TLP-1987-L01
                      </span>
                      <h4 className="font-display font-bold text-sm text-[#FAF7F2]">
                        108-Wick Mayur Deepalakshmi Temple Lamp
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-[#E5C07B] bg-[#4A0E17] px-2 py-1 rounded border border-[#C5A059]/30">
                      €4,850
                    </span>
                  </div>
                  
                  <p className="text-[11px] text-[#FAF7F2]/80 line-clamp-2">
                    Lost-wax cast Panchaloha brass alloy with hand-chiseled peacock finial, intact temple patina.
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[10px] text-[#E5C07B]">
                    <span className="flex items-center gap-1">
                      <Landmark className="w-3 h-3 text-[#D4AF37]" />
                      Munich Salon Vault
                    </span>
                    <button
                      onClick={onExploreCollection}
                      className="text-[#FFF3B0] hover:underline font-semibold"
                    >
                      View Provenance Dossier &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Quick Call badge */}
            <a
              href="tel:9083531892"
              className="absolute -bottom-4 right-4 sm:-right-2 bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-[#2E050B] px-4 py-2 rounded-full font-bold text-xs shadow-xl flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Inquire: 9083531892</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
