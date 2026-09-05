import React, { useState } from 'react';
import { 
  Sparkles, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  Layers, 
  Landmark,
  Calendar,
  Share2
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  era: string;
  description: string;
  imageUrl: string;
  curatorNote: string;
  provenanceHighlight: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Royal Sanctum of Mandore: 108-Wick Brass Deepam',
    category: 'Ceremonial Bronzes',
    era: 'Marwar Court, c. 1785',
    description: 'A close-up study of the lost-wax casting technique displaying intricate peacock plumage and sacred tiered ghee reservoirs.',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    curatorNote: 'Notice how the panchaloha bronze composition maintains natural olive-verdigris patination without artificial surface polishing.',
    provenanceHighlight: 'Documented in the 1920s royal haveli inventory records of Mandore.'
  },
  {
    id: 'gal-2',
    title: 'Wootz Steel Crystalline Watered Pattern on Rajput Khanda',
    category: 'Arms & Armory',
    era: 'Mewar Dynasty, c. 1815',
    description: 'High-magnification macro photography showing dendritic iron-carbide crystalline patterns forged in South Indian crucible ovens.',
    imageUrl: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=1200&q=80',
    curatorNote: 'The 24k gold fire-gilding (Koftgari) on the basket hilt has been preserved with zero modern abrasives.',
    provenanceHighlight: 'Mewar Royal Armory dispersal, acquired in Munich 1994.'
  },
  {
    id: 'gal-3',
    title: 'Shekhawati Fresco & Carved Teak Haveli Balcony (Jharokha)',
    category: 'Architectural Heritage',
    era: 'Silk Route Haveli, c. 1850',
    description: 'Architectural facade woodwork salvaged and stabilized from historic desert havelis with intricate lattice jali carvings.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    curatorNote: 'Carved from single-slab aged Indian teakwood (Sagwan) with hand-pegged structural joinery.',
    provenanceHighlight: 'Preserved by Tulip International Munich Architectural Archive.'
  },
  {
    id: 'gal-4',
    title: 'Illuminated Miniature Art with Natural Gemstone Pigments',
    category: 'Court Paintings',
    era: 'Kishangarh Atelier, c. 1770',
    description: 'Natural crushed lapis lazuli blues, malachite greens, and 22k beaten gold leaf on handmade layered wasli parchment.',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    curatorNote: 'The squirrel-hair brushstrokes achieve line widths under 0.2 millimeters for the lotus petals.',
    provenanceHighlight: 'Former collection of Dr. F. Meyer, Geneva.'
  },
  {
    id: 'gal-5',
    title: 'Tribal Thar High-Purity Silver Hansli Collar & Filigree',
    category: 'Royal & Tribal Silver',
    era: 'Circa 1890',
    description: 'Substantial solid silver neckpiece handcrafted with geometric solar motifs representing ancient desert clans.',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
    curatorNote: 'Over 600 grams of tested 925+ silver featuring original untouched tribal oxidation.',
    provenanceHighlight: 'Paluwe Family Tribal Artifact Repository (1987).'
  },
  {
    id: 'gal-6',
    title: 'Fragrant Sandalwood & Bone Inlaid Royal Dowry Casket',
    category: 'Decorative Objects',
    era: 'Mewar Court, c. 1865',
    description: 'Intricately pierced and inlaid bridal chest retaining its original lockwork and subtle aroma of aged Mysore sandalwood.',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    curatorNote: 'Every bone tessera is hand-cut and anchored with natural resin matrix.',
    provenanceHighlight: 'Rao of Bedla Private Estate.'
  }
];

interface HeritageGalleryProps {
  onOpenBooking: () => void;
}

export const HeritageGallery: React.FC<HeritageGalleryProps> = ({ onOpenBooking }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + 1) % GALLERY_ITEMS.length);
  };

  const prevImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#36080F] text-[#FAF7F2] relative border-b border-[#C5A059]/40">
      {/* Subtle gold grid overlay */}
      <div className="absolute inset-0 bg-maroon-pattern opacity-15 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4A0E17] border border-[#D4AF37]/60 shadow-inner">
            <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E5C07B] font-display">
              Heritage Visual Exhibition
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#FAF7F2]">
            The Heritage Photographic Gallery
          </h2>
          <p className="text-[#FAF7F2]/80 font-serif-sub text-base sm:text-lg">
            A photographic celebration of rare Indian craftsmanship, metallurgical mastery, 
            and royal salon aesthetics preserved in our Munich and Jaipur vaults.
          </p>
        </div>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative bg-[#240408] rounded-xl border border-[#C5A059]/40 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:border-[#D4AF37]"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E0407] via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>

                {/* Floating Tags */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#4A0E17]/90 text-[#FFF3B0] rounded border border-[#D4AF37]/50 shadow">
                    {item.category}
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-black/60 text-[#E5C07B] rounded backdrop-blur-sm">
                    {item.era}
                  </span>
                </div>

                {/* Hover prompt */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <div className="px-4 py-2 bg-[#D4AF37] text-[#2E050B] rounded-full text-xs font-bold font-display uppercase tracking-wider flex items-center gap-1.5 shadow-xl">
                    <Eye className="w-4 h-4" />
                    <span>Expand Artifact Study</span>
                  </div>
                </div>
              </div>

              {/* Caption Card */}
              <div className="p-5 space-y-2 text-left">
                <h3 className="font-display font-bold text-base text-[#FAF7F2] group-hover:text-[#FFF3B0] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#FAF7F2]/70 line-clamp-2">
                  {item.description}
                </p>
                <div className="pt-2 border-t border-[#C5A059]/20 text-[11px] text-[#E5C07B] flex items-center justify-between">
                  <span>Archival Documentation</span>
                  <span className="text-[#FFF3B0] font-semibold">Inspect &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Footer Callout */}
        <div className="mt-12 p-6 rounded-xl bg-[#4A0E17]/80 border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-base text-[#FFF3B0]">
              Desire High-Resolution Archival Folios for Research or Institution?
            </h4>
            <p className="text-xs text-[#FAF7F2]/80 font-serif-sub">
              Our Munich curatorial desk provides 4K macro photography dossiers and historical provenance essays upon formal request.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-[#2E050B] rounded-lg shadow whitespace-nowrap font-display cursor-pointer"
          >
            Request Private Archival Access
          </button>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="relative max-w-5xl w-full bg-[#240408] rounded-xl border-2 border-[#D4AF37] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            
            {/* Header */}
            <div className="bg-[#4A0E17] px-6 py-3 border-b border-[#C5A059]/40 flex items-center justify-between text-[#FAF7F2]">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-xs uppercase tracking-widest text-[#D4AF37]">
                  TULIP INTERNATIONAL &bull; EXHIBITION STUDY
                </span>
                <span className="text-xs text-[#FAF7F2]/50">|</span>
                <span className="text-xs text-[#FFF3B0]">
                  {selectedImageIndex + 1} of {GALLERY_ITEMS.length}
                </span>
              </div>
              <button
                onClick={closeLightbox}
                className="text-[#FAF7F2] hover:text-[#D4AF37] p-1"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Image & Info */}
            <div className="overflow-y-auto flex-1 p-6 space-y-6">
              <div className="relative aspect-16/9 max-h-[55vh] rounded-lg overflow-hidden bg-black border border-[#C5A059]/40 mx-auto flex items-center justify-center">
                <img
                  src={GALLERY_ITEMS[selectedImageIndex].imageUrl}
                  alt={GALLERY_ITEMS[selectedImageIndex].title}
                  className="max-h-full max-w-full object-contain"
                />

                {/* Left/Right Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-[#C5A059] transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-[#C5A059] transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Study Commentary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left bg-[#36080F] p-4 rounded-lg border border-[#C5A059]/30">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                    {GALLERY_ITEMS[selectedImageIndex].category} &bull; {GALLERY_ITEMS[selectedImageIndex].era}
                  </span>
                  <h3 className="font-display font-bold text-lg text-[#FAF7F2]">
                    {GALLERY_ITEMS[selectedImageIndex].title}
                  </h3>
                  <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">
                    {GALLERY_ITEMS[selectedImageIndex].description}
                  </p>
                </div>

                <div className="space-y-2 border-t md:border-t-0 md:border-l border-[#C5A059]/30 pt-3 md:pt-0 md:pl-4">
                  <div className="text-xs">
                    <strong className="text-[#FFF3B0] block mb-0.5">Curator's Analytical Note:</strong>
                    <span className="text-[#FAF7F2]/85">{GALLERY_ITEMS[selectedImageIndex].curatorNote}</span>
                  </div>
                  <div className="text-xs">
                    <strong className="text-[#E5C07B] block mb-0.5">Provenance Record:</strong>
                    <span className="text-[#FAF7F2]/70">{GALLERY_ITEMS[selectedImageIndex].provenanceHighlight}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="bg-[#4A0E17] px-6 py-3 border-t border-[#C5A059]/40 flex items-center justify-between text-xs text-[#FAF7F2]">
              <span>Curated by Franchisko Gamini Paluwe &bull; Munich Augustenstraße 41</span>
              <button
                onClick={() => {
                  closeLightbox();
                  onOpenBooking();
                }}
                className="px-4 py-1.5 bg-[#D4AF37] text-[#2E050B] font-bold rounded uppercase tracking-wider text-[11px] font-display"
              >
                Schedule Salon Viewing
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
