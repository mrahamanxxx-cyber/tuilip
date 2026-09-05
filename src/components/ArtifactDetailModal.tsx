import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Calendar, 
  Phone, 
  MapPin, 
  Sparkles, 
  Layers, 
  Scale, 
  History, 
  Maximize2,
  FileText,
  Share2,
  CheckCircle,
  MessageSquare
} from 'lucide-react';
import { Artifact } from '../types';

interface ArtifactDetailModalProps {
  artifact: Artifact | null;
  onClose: () => void;
  onBookViewing: (artifactId: string) => void;
  onVerifyCoA: (coaNumber: string) => void;
  currency: 'EUR' | 'USD' | 'INR';
}

export const ArtifactDetailModal: React.FC<ArtifactDetailModalProps> = ({
  artifact,
  onClose,
  onBookViewing,
  onVerifyCoA,
  currency,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!artifact) return null;

  const allImages = [artifact.imageUrl, ...(artifact.additionalImages || [])];

  const formatPrice = () => {
    if (currency === 'EUR') return `€${artifact.priceEUR.toLocaleString()}`;
    if (currency === 'USD') return `$${artifact.priceUSD.toLocaleString()}`;
    return `₹${artifact.priceINR.toLocaleString()}`;
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Tulip International! I am interested in inquiring about "${artifact.name}" (CoA: ${artifact.coaNumber}). Is it available for private viewing or acquisition?`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="relative bg-[#FAF7F2] text-[#1E1412] w-full max-w-5xl rounded-xl shadow-2xl border-2 border-[#D4AF37] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header Bar */}
        <div className="bg-[#4A0E17] text-[#FAF7F2] px-6 py-4 border-b border-[#C5A059]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-sm tracking-widest text-[#D4AF37] uppercase">
              Tulip International • Archive Dossier
            </span>
            <span className="text-xs text-[#FAF7F2]/60 hidden sm:inline">|</span>
            <span className="text-xs text-[#FFF3B0] font-mono font-semibold hidden sm:inline">
              Certificate: {artifact.coaNumber}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-1.5 text-[#E5C07B] hover:text-[#FFF3B0] transition-colors rounded hover:bg-white/10 text-xs flex items-center gap-1"
              title="Copy dossier link"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#FAF7F2] hover:text-[#D4AF37] transition-colors rounded-full hover:bg-white/10"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Image Showcase with Gallery Thumbnails */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-4/3 rounded-lg overflow-hidden border border-[#C5A059]/40 shadow-md bg-[#1E1412]">
                <img
                  src={allImages[selectedImageIndex] || artifact.imageUrl}
                  alt={artifact.name}
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Status & Classification Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-[#36080F]/90 text-[#FFF3B0] rounded-md border border-[#D4AF37] shadow">
                    {artifact.rareClassification}
                  </span>
                  <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-emerald-900/90 text-emerald-200 rounded border border-emerald-500/50">
                    {artifact.status}
                  </span>
                </div>
              </div>

              {/* Thumbnails if multiple */}
              {allImages.length > 1 && (
                <div className="flex gap-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative w-20 h-16 rounded border-2 overflow-hidden ${
                        selectedImageIndex === index ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50' : 'border-neutral-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Physical Properties Grid */}
              <div className="bg-[#F5EFEB] p-4 rounded-lg border border-[#C5A059]/30 space-y-2 text-xs">
                <h4 className="font-display font-bold text-[#4A0E17] uppercase tracking-wider border-b border-[#C5A059]/30 pb-1">
                  Physical Specifications & Provenance
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[#36080F]">
                  <div>
                    <span className="text-neutral-600 block">Era / Century:</span>
                    <strong className="text-sm">{artifact.era}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-600 block">Estimated Age:</span>
                    <strong className="text-sm">{artifact.estimatedYear}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-600 block">Region of Origin:</span>
                    <strong>{artifact.origin}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-600 block">Weight:</span>
                    <strong>{artifact.weight}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-neutral-600 block">Dimensions:</span>
                    <strong>{artifact.dimensions}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-neutral-600 block">Materials & Metallurgical Composition:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {artifact.materials.map((m, idx) => (
                        <span key={idx} className="bg-white px-2 py-0.5 rounded border border-[#C5A059]/40 text-[11px] font-medium text-[#4A0E17]">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Detailed Narrative & Inquiries */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#AA771C]">
                  {artifact.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#4A0E17] mt-1 leading-tight">
                  {artifact.name}
                </h2>
                {artifact.hindiName && (
                  <p className="text-sm text-[#721c24] font-serif italic mt-0.5">
                    {artifact.hindiName}
                  </p>
                )}
              </div>

              {/* Price Block */}
              <div className="bg-[#4A0E17] text-[#FAF7F2] p-4 rounded-lg border border-[#D4AF37]/50 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#E5C07B]">Acquisition Valuation</span>
                  <div className="text-2xl sm:text-3xl font-display font-bold text-[#FFF3B0]">
                    {formatPrice()}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#FAF7F2]/70 block">Includes Museum CoA</span>
                  <span className="text-[10px] text-emerald-300 font-semibold flex items-center gap-1 justify-end">
                    <CheckCircle className="w-3 h-3" /> Fully Insured Global Freight
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-[#4A0E17] uppercase tracking-wider">
                  Curatorial Description
                </h4>
                <p className="text-sm text-neutral-800 leading-relaxed font-serif-sub">
                  {artifact.description}
                </p>
              </div>

              {/* Historical Significance */}
              <div className="space-y-2 bg-[#F5EFEB] p-4 rounded-lg border-l-4 border-[#D4AF37]">
                <h4 className="font-display font-bold text-xs text-[#4A0E17] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Historical Significance & Royal Heritage
                </h4>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  {artifact.historicalSignificance}
                </p>
              </div>

              {/* Provenance Lineage */}
              <div className="space-y-2">
                <h4 className="font-display font-bold text-xs text-[#4A0E17] uppercase tracking-wider flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-[#4A0E17]" />
                  Verified Provenance Lineage
                </h4>
                <ol className="relative border-l border-[#C5A059] ml-2.5 space-y-2 text-xs text-neutral-700">
                  {artifact.provenance.map((step, idx) => (
                    <li key={idx} className="ml-4">
                      <div className="absolute w-2 h-2 bg-[#D4AF37] rounded-full -left-1 border border-white"></div>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Condition Report */}
              <div className="text-xs text-neutral-600 bg-white p-3 rounded border border-neutral-200">
                <strong className="text-[#4A0E17] block mb-1">Conservation & Condition Report:</strong>
                {artifact.conditionReport}
              </div>

              {/* Actions & Booking */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onBookViewing(artifact.id);
                  }}
                  className="flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#E5C07B] to-[#AA771C] text-[#2E050B] rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer font-display"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Private Salon Viewing</span>
                </button>

                <a
                  href={`https://wa.me/919083531892?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 text-xs font-bold uppercase tracking-wider bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Inquire</span>
                </a>
                
                <button
                  onClick={() => {
                    onClose();
                    onVerifyCoA(artifact.coaNumber);
                  }}
                  className="py-3 px-3 text-xs font-semibold text-[#4A0E17] hover:bg-[#F5EFEB] border border-[#C5A059] rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  title="Verify Certificate of Authenticity"
                >
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Inspect CoA</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="bg-[#F5EFEB] px-6 py-3 border-t border-[#C5A059]/30 flex flex-wrap items-center justify-between text-xs text-neutral-600">
          <span>Munich Showroom: Augustenstraße 41 &bull; Direct Curator Line: <strong>9083531892</strong></span>
          <span className="font-serif-sub italic">Every artifact backed by our unconditional lifetime provenance guarantee.</span>
        </div>

      </div>
    </div>
  );
};
