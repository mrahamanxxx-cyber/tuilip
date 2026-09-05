import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Sword, 
  Armchair, 
  Sparkles, 
  Gem, 
  Image as ImageIcon, 
  Scroll, 
  Package, 
  Search, 
  Filter, 
  Calendar, 
  Eye, 
  Phone, 
  SlidersHorizontal,
  ArrowUpDown,
  Check,
  ShieldCheck
} from 'lucide-react';
import { Artifact, ArtifactCategory } from '../types';
import { ARTIFACTS } from '../data/artifactsData';
import { ArtifactDetailModal } from './ArtifactDetailModal';

interface ArtifactCatalogProps {
  currentCurrency: 'EUR' | 'USD' | 'INR';
  onBookViewingForArtifact: (artifactId: string) => void;
  onVerifyCoA: (coaNumber: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ArtifactCatalog: React.FC<ArtifactCatalogProps> = ({
  currentCurrency,
  onBookViewingForArtifact,
  onVerifyCoA,
  searchQuery,
  setSearchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ArtifactCategory>('All');
  const [selectedClassification, setSelectedClassification] = useState<string>('All');
  const [selectedEra, setSelectedEra] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'era'>('featured');
  const [activeModalArtifact, setActiveModalArtifact] = useState<Artifact | null>(null);

  const categories: { label: ArtifactCategory; icon: any; count: number }[] = [
    { label: 'All', icon: Sparkles, count: ARTIFACTS.length },
    { 
      label: 'Antique Brass Lamps & Diyas', 
      icon: Flame, 
      count: ARTIFACTS.filter(a => a.category === 'Antique Brass Lamps & Diyas').length 
    },
    { 
      label: 'Rajput Swords & Armor', 
      icon: Sword, 
      count: ARTIFACTS.filter(a => a.category === 'Rajput Swords & Armor').length 
    },
    { 
      label: 'Vintage Rajasthani Furniture', 
      icon: Armchair, 
      count: ARTIFACTS.filter(a => a.category === 'Vintage Rajasthani Furniture').length 
    },
    { 
      label: 'Hand-Painted Pottery', 
      icon: Sparkles, 
      count: ARTIFACTS.filter(a => a.category === 'Hand-Painted Pottery').length 
    },
    { 
      label: 'Traditional Silver Jewelry', 
      icon: Gem, 
      count: ARTIFACTS.filter(a => a.category === 'Traditional Silver Jewelry').length 
    },
    { 
      label: 'Miniature Paintings', 
      icon: ImageIcon, 
      count: ARTIFACTS.filter(a => a.category === 'Miniature Paintings').length 
    },
    { 
      label: 'Vintage Manuscripts', 
      icon: Scroll, 
      count: ARTIFACTS.filter(a => a.category === 'Vintage Manuscripts').length 
    },
    { 
      label: 'Royal Boxes & Objects', 
      icon: Package, 
      count: ARTIFACTS.filter(a => a.category === 'Royal Boxes & Objects').length 
    },
  ];

  const formatPrice = (artifact: Artifact) => {
    if (currentCurrency === 'EUR') return `€${artifact.priceEUR.toLocaleString()}`;
    if (currentCurrency === 'USD') return `$${artifact.priceUSD.toLocaleString()}`;
    return `₹${artifact.priceINR.toLocaleString()}`;
  };

  const filteredArtifacts = useMemo(() => {
    return ARTIFACTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Classification filter
      if (selectedClassification !== 'All' && item.rareClassification !== selectedClassification) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesEra = item.era.toLowerCase().includes(query);
        const matchesOrigin = item.origin.toLowerCase().includes(query);
        const matchesMaterials = item.materials.some(m => m.toLowerCase().includes(query));
        const matchesCoa = item.coaNumber.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesEra && !matchesOrigin && !matchesMaterials && !matchesCoa) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceEUR - b.priceEUR;
      if (sortBy === 'price-desc') return b.priceEUR - a.priceEUR;
      if (sortBy === 'era') return a.estimatedYear.localeCompare(b.estimatedYear);
      // default 'featured'
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [selectedCategory, selectedClassification, searchQuery, sortBy]);

  return (
    <section id="collection" className="py-16 sm:py-20 bg-[#FAF7F2] text-[#1E1412] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EFEB] border border-[#C5A059]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#AA771C]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#4A0E17] font-display">
              Curated Royal Antiquities Catalog
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#4A0E17]">
            Our Rare Indian Heritage Collection
          </h2>
          <p className="text-neutral-700 font-serif-sub text-base sm:text-lg">
            Every piece is physically inspected, scientifically verified, and backed by our lifetime Certificate of Authenticity.
          </p>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 mb-8 scrollbar-none no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#4A0E17] text-[#FFF3B0] border-[#D4AF37] shadow-md scale-105'
                    : 'bg-[#F5EFEB] text-[#4A0E17] border-[#C5A059]/30 hover:border-[#AA771C] hover:bg-[#EBE2DC]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D4AF37]' : 'text-[#8C2333]'}`} />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-[#36080F] text-[#E5C07B]' : 'bg-neutral-300/60 text-neutral-700'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Controls & Search Bar */}
        <div className="bg-[#F5EFEB] p-4 rounded-xl border border-[#C5A059]/30 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#AA771C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by era, metal, provenance..."
              className="w-full pl-10 pr-4 py-2 bg-white rounded-lg border border-[#C5A059]/40 text-xs text-[#1E1412] placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Classification & Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto flex-wrap justify-end">
            
            {/* Grade Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-neutral-600 hidden sm:inline">Grade:</span>
              <select
                value={selectedClassification}
                onChange={(e) => setSelectedClassification(e.target.value)}
                className="bg-white border border-[#C5A059]/40 rounded-lg px-2.5 py-2 text-xs text-[#4A0E17] font-medium focus:outline-none cursor-pointer"
              >
                <option value="All">All Grades</option>
                <option value="Museum Grade">Museum Grade</option>
                <option value="Royal Heritage">Royal Heritage</option>
                <option value="Collector Masterpiece">Collector Masterpiece</option>
                <option value="Rare Folio">Rare Folio</option>
              </select>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#AA771C]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#C5A059]/40 rounded-lg px-2.5 py-2 text-xs text-[#4A0E17] font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Valuation: Low to High</option>
                <option value="price-desc">Valuation: High to Low</option>
                <option value="era">Chronological Era</option>
              </select>
            </div>

          </div>
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center text-xs text-neutral-600 mb-6">
          <span>
            Displaying <strong>{filteredArtifacts.length}</strong> authenticated relics
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </span>
          <span className="text-[#4A0E17] font-medium">
            Munich Salon Viewing Available by Appointment
          </span>
        </div>

        {/* Artifacts Grid */}
        {filteredArtifacts.length === 0 ? (
          <div className="text-center py-16 bg-[#F5EFEB] rounded-xl border border-[#C5A059]/30 space-y-3">
            <Package className="w-10 h-10 text-[#C5A059] mx-auto" />
            <h3 className="font-display font-bold text-lg text-[#4A0E17]">No Antiques Matched Your Search</h3>
            <p className="text-xs text-neutral-600 max-w-md mx-auto">
              Try adjusting your search terms or category filters. Our Munich vault may have uncatalogued acquisitions matching your criteria.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setSelectedClassification('All'); }}
              className="mt-2 px-4 py-2 text-xs font-semibold bg-[#4A0E17] text-[#FFF3B0] rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtifacts.map((artifact) => (
              <div
                key={artifact.id}
                className="group bg-white rounded-xl border border-[#C5A059]/40 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col hover:border-[#D4AF37]"
              >
                {/* Image & Badges */}
                <div 
                  className="relative aspect-4/3 overflow-hidden bg-neutral-900 cursor-pointer"
                  onClick={() => setActiveModalArtifact(artifact)}
                >
                  <img
                    src={artifact.imageUrl}
                    alt={artifact.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                  {/* Top Floating Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#4A0E17]/90 text-[#FFF3B0] rounded border border-[#D4AF37]/60 shadow">
                      {artifact.rareClassification}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-black/70 text-[#E5C07B] rounded backdrop-blur-sm">
                      {artifact.estimatedYear}
                    </span>
                  </div>

                  {/* Top Right CoA Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-white/90 text-[#4A0E17] rounded shadow">
                      {artifact.coaNumber}
                    </span>
                  </div>

                  {/* Bottom Hover Preview prompt */}
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="flex items-center gap-1 text-[#FFF3B0] font-semibold">
                      <Eye className="w-3.5 h-3.5" /> View Provenance Dossier
                    </span>
                    <span className="text-[11px] bg-[#4A0E17]/90 px-2 py-0.5 rounded text-[#E5C07B]">
                      {artifact.origin}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#AA771C] font-semibold uppercase tracking-wider">
                      <span>{artifact.category}</span>
                      <span className="text-neutral-500">{artifact.era}</span>
                    </div>

                    <h3 
                      onClick={() => setActiveModalArtifact(artifact)}
                      className="font-display font-bold text-base sm:text-lg text-[#4A0E17] group-hover:text-[#8C2333] transition-colors line-clamp-2 cursor-pointer leading-snug"
                    >
                      {artifact.name}
                    </h3>

                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {artifact.description}
                    </p>

                    {/* Materials tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {artifact.materials.slice(0, 2).map((mat, idx) => (
                        <span key={idx} className="bg-[#F5EFEB] text-[#4A0E17] text-[10px] px-2 py-0.5 rounded border border-[#C5A059]/20">
                          {mat}
                        </span>
                      ))}
                      {artifact.materials.length > 2 && (
                        <span className="text-[10px] text-neutral-500 self-center">
                          +{artifact.materials.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Valuation & Action CTAs */}
                  <div className="pt-3 border-t border-neutral-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">Valuation</span>
                        <span className="font-display font-bold text-xl text-[#4A0E17]">
                          {formatPrice(artifact)}
                        </span>
                      </div>
                      <button
                        onClick={() => onVerifyCoA(artifact.coaNumber)}
                        className="text-[11px] text-[#AA771C] hover:text-[#4A0E17] font-semibold flex items-center gap-1"
                        title="Inspect Certificate of Authenticity"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>CoA Verified</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => setActiveModalArtifact(artifact)}
                        className="py-2 px-3 text-xs font-semibold text-[#4A0E17] bg-[#F5EFEB] hover:bg-[#EBE2DC] rounded-lg transition-colors border border-[#C5A059]/40 text-center"
                      >
                        Dossier & History
                      </button>

                      <button
                        onClick={() => onBookViewingForArtifact(artifact.id)}
                        className="py-2 px-3 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-[#2E050B] rounded-lg shadow hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center gap-1 font-display"
                      >
                        <Calendar className="w-3 h-3" />
                        <span>Book Viewing</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Artifact Details Modal */}
      {activeModalArtifact && (
        <ArtifactDetailModal
          artifact={activeModalArtifact}
          onClose={() => setActiveModalArtifact(null)}
          onBookViewing={(id) => {
            setActiveModalArtifact(null);
            onBookViewingForArtifact(id);
          }}
          onVerifyCoA={(coa) => {
            setActiveModalArtifact(null);
            onVerifyCoA(coa);
          }}
          currency={currentCurrency}
        />
      )}
    </section>
  );
};
