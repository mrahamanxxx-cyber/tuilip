import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  History, 
  Sparkles, 
  CheckCircle2, 
  Landmark, 
  HeartHandshake,
  Compass,
  Phone
} from 'lucide-react';

interface AboutStoryProps {
  onOpenBooking: () => void;
}

export const AboutStory: React.FC<AboutStoryProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#36080F] text-[#FAF7F2] relative border-t border-[#C5A059]/40 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#58111A] via-[#36080F] to-[#1A0306] opacity-90"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Founder Portrait & Curatorial Heritage Card */}
          <div className="lg:col-span-5 relative space-y-4">
            <div className="relative bg-[#240408] rounded-2xl border-2 border-[#D4AF37] p-3 shadow-2xl overflow-hidden">
              <div className="relative h-96 sm:h-[450px] rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80"
                  alt="Franchisko Gamini Paluwe Antique Salon"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E0407] via-transparent to-transparent"></div>

                {/* Founder Info Overlay */}
                <div className="absolute bottom-4 inset-x-4 bg-[#36080F]/95 backdrop-blur-md p-4 rounded-xl border border-[#C5A059]/50 text-left">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                    Founder & Master Antiquarian
                  </span>
                  <h4 className="font-display font-bold text-lg text-[#FAF7F2]">
                    Franchisko Gamini Paluwe
                  </h4>
                  <p className="text-xs text-[#FAF7F2]/80 font-serif-sub mt-1">
                    “True antiques are not merely ornaments of wealth; they are sacred vessels carrying the soul, spirit, and memory of India’s artisan dynasties.”
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Line Badge */}
            <div className="bg-[#4A0E17] border border-[#C5A059]/40 p-3 rounded-xl flex items-center justify-between text-xs text-[#E5C07B]">
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                Direct Curator Line: <strong>9083531892</strong>
              </span>
              <span className="text-[#FFF3B0] font-semibold">Munich Salon</span>
            </div>
          </div>

          {/* Right: The Generational Story & 4 Pillars */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4A0E17] border border-[#D4AF37]/50 shadow-inner">
                <History className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#E5C07B] font-display">
                  Est. 1987 &bull; 38+ Years of Curatorial Authority
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#FAF7F2] leading-tight">
                Preserving India’s Stories, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF3B0] via-[#E5C07B] to-[#C5A059]">
                  One Relic at a Time.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#FAF7F2]/85 font-serif-sub leading-relaxed">
                Founded in 1987 by <strong>Franchisko Gamini Paluwe</strong>, <strong>Tulip International</strong> was born out of a lifelong devotion to the timeless arts of Rajasthan, the Mughal courts, and sacred temple sanctums. What began as a boutique curatorial archive in Jaipur has blossomed into Europe’s distinguished salon for authenticated Indian heritage collectibles.
              </p>

              <p className="text-xs sm:text-sm text-[#FAF7F2]/75 leading-relaxed">
                From our European flagship gallery on <strong>Augustenstraße 41 in Munich</strong>, we serve international museums, noble family estates, and private collectors. Every relic in our custody undergoes rigorous forensic provenance verification, metallurgical analysis, and museum-grade conservation.
              </p>
            </div>

            {/* 4 Pillars of Curation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              <div className="bg-[#4A0E17]/60 p-4 rounded-xl border border-[#C5A059]/30 space-y-1.5">
                <div className="flex items-center gap-2 text-[#FFF3B0]">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider">
                    Forensic Provenance
                  </h4>
                </div>
                <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                  Every artifact is documented with uninterrupted chain-of-custody lineage and XRF metallurgical analysis.
                </p>
              </div>

              <div className="bg-[#4A0E17]/60 p-4 rounded-xl border border-[#C5A059]/30 space-y-1.5">
                <div className="flex items-center gap-2 text-[#FFF3B0]">
                  <Landmark className="w-4 h-4 text-[#D4AF37]" />
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider">
                    Museum-Grade Conservation
                  </h4>
                </div>
                <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                  Our Jaipur and Munich workshops preserve original patinas using traditional organic techniques and reversible adhesives.
                </p>
              </div>

              <div className="bg-[#4A0E17]/60 p-4 rounded-xl border border-[#C5A059]/30 space-y-1.5">
                <div className="flex items-center gap-2 text-[#FFF3B0]">
                  <HeartHandshake className="w-4 h-4 text-[#D4AF37]" />
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider">
                    Ethical Relic Stewardship
                  </h4>
                </div>
                <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                  100% compliant with international cultural heritage laws, UNESCO conventions, and heritage export protocols.
                </p>
              </div>

              <div className="bg-[#4A0E17]/60 p-4 rounded-xl border border-[#C5A059]/30 space-y-1.5">
                <div className="flex items-center gap-2 text-[#FFF3B0]">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider">
                    Lifetime Authenticity Guarantee
                  </h4>
                </div>
                <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                  Every acquisition includes an unconditional lifetime certificate signed personally by Founder Franchisko Gamini Paluwe.
                </p>
              </div>

            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#E5C07B] to-[#AA771C] text-[#2E050B] rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all font-display cursor-pointer"
              >
                Schedule Private Salon Meeting with Curator
              </button>

              <a
                href="tel:9083531892"
                className="text-xs text-[#E5C07B] hover:text-[#FFF3B0] flex items-center gap-1.5"
              >
                <span>Direct Inquiries: <strong>9083531892</strong></span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
