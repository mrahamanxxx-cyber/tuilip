import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Award, 
  FileCheck, 
  CheckCircle2, 
  Sparkles, 
  QrCode, 
  Lock, 
  Printer, 
  Building, 
  History
} from 'lucide-react';
import { PROVENANCE_CERTIFICATES, ARTIFACTS } from '../data/artifactsData';
import { ProvenanceCertificate } from '../types';

interface ProvenanceVerificationProps {
  initialCoaNumber?: string | null;
  onOpenBooking: () => void;
}

export const ProvenanceVerification: React.FC<ProvenanceVerificationProps> = ({
  initialCoaNumber,
  onOpenBooking,
}) => {
  const [searchCode, setSearchCode] = useState<string>(initialCoaNumber || 'TLP-1987-L01');
  const [activeCertificate, setActiveCertificate] = useState<ProvenanceCertificate | null>(
    PROVENANCE_CERTIFICATES[initialCoaNumber || 'TLP-1987-L01'] || PROVENANCE_CERTIFICATES['TLP-1987-L01']
  );
  const [searched, setSearched] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  const sampleCodes = [
    { code: 'TLP-1987-L01', title: 'Temple Brass Lamp' },
    { code: 'TLP-1987-W02', title: 'Rajput Wootz Khanda' },
    { code: 'TLP-1987-P04', title: 'Kishangarh Miniature' },
    { code: 'TLP-1987-M07', title: 'Sanskrit Palm-Leaf Folio' },
  ];

  const handleSearch = (codeToSearch: string) => {
    const cleanCode = codeToSearch.trim().toUpperCase();
    setSearchCode(cleanCode);
    setSearched(true);

    if (PROVENANCE_CERTIFICATES[cleanCode]) {
      setActiveCertificate(PROVENANCE_CERTIFICATES[cleanCode]);
      setNotFound(false);
    } else {
      // Check if it matches an artifact without custom cert
      const matchedArt = ARTIFACTS.find(a => a.coaNumber.toUpperCase() === cleanCode);
      if (matchedArt) {
        setActiveCertificate({
          coaNumber: matchedArt.coaNumber,
          artifactName: matchedArt.name,
          period: matchedArt.era,
          region: matchedArt.origin,
          curatorName: 'Franchisko Gamini Paluwe',
          inspectionDate: '10 January 2026',
          metallurgyOrMediumTest: `Physical & material examination confirms authentic ${matchedArt.materials.join(', ')} consistent with ${matchedArt.era} artisan craft.`,
          heritageRating: `${matchedArt.rareClassification} — Archival Guarantee`,
          acquisitionHistory: matchedArt.provenance.join(' → '),
          certifiedGenuine: true,
        });
        setNotFound(false);
      } else {
        setActiveCertificate(null);
        setNotFound(true);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="provenance" className="py-16 sm:py-24 bg-[#FAF7F2] text-[#1E1412] relative border-y border-[#C5A059]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EFEB] border border-[#C5A059]/40">
            <ShieldCheck className="w-3.5 h-3.5 text-[#AA771C]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#4A0E17] font-display">
              Authentication & Archival Registry
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#4A0E17]">
            Certificate of Authenticity (CoA) Verification
          </h2>
          <p className="text-neutral-700 font-serif-sub text-base sm:text-lg">
            Every relic acquired or exhibited by Tulip International is cataloged with a tamper-evident Certificate of Authenticity, 
            guaranteeing metallurgical, artistic, and historical legitimacy.
          </p>
        </div>

        {/* Verification Search Bar */}
        <div className="max-w-2xl mx-auto bg-white p-4 rounded-xl border-2 border-[#D4AF37] shadow-lg mb-8">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchCode);
            }} 
            className="flex flex-col sm:flex-row gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#AA771C] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Enter CoA Number (e.g. TLP-1987-L01)"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] rounded-lg border border-[#C5A059]/40 text-sm font-mono font-semibold text-[#4A0E17] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-[#2E050B] rounded-lg shadow hover:brightness-110 active:scale-95 transition-all font-display cursor-pointer"
            >
              Verify Certificate
            </button>
          </form>

          {/* Quick Demo Certificate Buttons */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-100 flex-wrap text-xs">
            <span className="text-neutral-500 font-medium">Sample Certificates:</span>
            {sampleCodes.map((sample) => (
              <button
                key={sample.code}
                onClick={() => handleSearch(sample.code)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors border ${
                  searchCode === sample.code
                    ? 'bg-[#4A0E17] text-[#FFF3B0] border-[#D4AF37]'
                    : 'bg-[#F5EFEB] text-[#4A0E17] border-[#C5A059]/30 hover:bg-[#EBE2DC]'
                }`}
              >
                {sample.code} ({sample.title})
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Display Area */}
        {notFound && (
          <div className="max-w-xl mx-auto text-center py-10 px-6 bg-[#F5EFEB] rounded-xl border border-red-300 text-neutral-700 space-y-2">
            <ShieldCheck className="w-10 h-10 text-red-500 mx-auto" />
            <h4 className="font-display font-bold text-base text-[#4A0E17]">
              Certificate ID Not Found in Online Archive
            </h4>
            <p className="text-xs text-neutral-600">
              For older physical certificates issued prior to 1995 or private vault commissions, please contact our Munich registrar at <strong>9083531892</strong>.
            </p>
          </div>
        )}

        {activeCertificate && (
          <div className="max-w-4xl mx-auto bg-[#FAF7F2] rounded-2xl border-4 border-[#C5A059] p-6 sm:p-10 shadow-2xl relative overflow-hidden parchment-texture">
            
            {/* Ornate Gold Filigree Corners */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]"></div>
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]"></div>
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]"></div>

            {/* Certificate Header */}
            <div className="text-center space-y-2 pb-6 border-b-2 border-[#D4AF37]/50 relative">
              <div className="flex items-center justify-center gap-2 text-[#4A0E17]">
                <Award className="w-6 h-6 text-[#D4AF37]" />
                <span className="font-display font-bold text-xl sm:text-2xl tracking-widest">
                  TULIP INTERNATIONAL
                </span>
                <Award className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <p className="text-xs uppercase font-serif-sub tracking-widest text-[#8C2333] font-semibold">
                Munich Salon: Augustenstraße 41, Germany &bull; Jaipur Archive &bull; Est. 1987
              </p>
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#4A0E17] uppercase tracking-wider pt-2">
                Official Certificate of Provenance & Authenticity
              </h3>
              
              <div className="inline-block bg-[#4A0E17] text-[#FFF3B0] px-4 py-1 rounded-full text-xs font-mono font-bold tracking-widest border border-[#D4AF37]">
                REGISTRY CODE: {activeCertificate.coaNumber}
              </div>
            </div>

            {/* Certificate Body Grid */}
            <div className="py-6 space-y-6 text-left">
              
              {/* Artifact Designation */}
              <div className="bg-white/80 p-4 rounded-xl border border-[#C5A059]/40 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#AA771C]">
                  Authenticated Relic Designation
                </span>
                <h4 className="font-display font-bold text-lg sm:text-xl text-[#4A0E17]">
                  {activeCertificate.artifactName}
                </h4>
                <div className="flex flex-wrap gap-4 text-xs text-neutral-700 pt-1">
                  <span><strong>Historical Period:</strong> {activeCertificate.period}</span>
                  <span>&bull;</span>
                  <span><strong>Origin Region:</strong> {activeCertificate.region}</span>
                  <span>&bull;</span>
                  <span><strong>Rating:</strong> <span className="text-[#8C2333] font-bold">{activeCertificate.heritageRating}</span></span>
                </div>
              </div>

              {/* Forensic & Scientific Metallurgy Test */}
              <div className="space-y-2">
                <h5 className="font-display font-bold text-xs uppercase tracking-wider text-[#4A0E17] flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-[#D4AF37]" />
                  Scientific Material & Composition Verification
                </h5>
                <div className="p-3.5 bg-white/90 rounded-lg border border-[#C5A059]/30 text-xs text-neutral-800 leading-relaxed font-mono">
                  {activeCertificate.metallurgyOrMediumTest}
                </div>
              </div>

              {/* Archival Lineage */}
              <div className="space-y-2">
                <h5 className="font-display font-bold text-xs uppercase tracking-wider text-[#4A0E17] flex items-center gap-1.5">
                  <History className="w-4 h-4 text-[#D4AF37]" />
                  Documented Chain of Custody & Lineage
                </h5>
                <div className="p-3.5 bg-white/90 rounded-lg border border-[#C5A059]/30 text-xs text-neutral-800 leading-relaxed">
                  {activeCertificate.acquisitionHistory}
                </div>
              </div>

              {/* Signatures & Seal */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t-2 border-[#D4AF37]/50 items-end">
                
                {/* Curator Signature */}
                <div className="text-center space-y-1">
                  <div className="font-serif italic text-base sm:text-lg text-[#4A0E17] font-semibold">
                    Franchisko G. Paluwe
                  </div>
                  <div className="h-0.5 bg-[#4A0E17] w-36 mx-auto"></div>
                  <span className="text-[10px] uppercase font-bold text-neutral-600 block">
                    Franchisko Gamini Paluwe
                  </span>
                  <span className="text-[9px] text-neutral-500">Master Antiquarian & Founder (1987)</span>
                </div>

                {/* Official Gold Seal Badge */}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#FFF3B0] to-[#AA771C] mx-auto p-1 shadow-lg flex items-center justify-center">
                    <div className="w-full h-full rounded-full border-2 border-dashed border-[#4A0E17] flex flex-col items-center justify-center text-[#4A0E17] p-1">
                      <ShieldCheck className="w-5 h-5 text-[#4A0E17]" />
                      <span className="text-[7px] font-bold uppercase tracking-tighter">GENUINE RELIC</span>
                      <span className="text-[6px] font-mono">EST. 1987</span>
                    </div>
                  </div>
                </div>

                {/* Verification Date & Status */}
                <div className="text-center sm:text-right space-y-1">
                  <div className="flex items-center justify-center sm:justify-end gap-1 text-emerald-700 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>STATUS: VALID & ACTIVE</span>
                  </div>
                  <span className="text-[10px] text-neutral-600 block">
                    Inspection Date: {activeCertificate.inspectionDate}
                  </span>
                  <span className="text-[9px] text-neutral-500">Munich Central Registry Archive</span>
                </div>

              </div>

            </div>

            {/* Certificate Footer Buttons */}
            <div className="bg-[#F5EFEB] p-3 rounded-lg border border-[#C5A059]/30 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-neutral-600">
                Direct Inquiries: <strong>9083531892</strong> &bull; Augustenstraße 41, München
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-white border border-[#C5A059] text-[#4A0E17] hover:bg-neutral-100 rounded text-xs font-semibold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Dossier</span>
                </button>
                <button
                  onClick={onOpenBooking}
                  className="px-3 py-1.5 bg-[#4A0E17] text-[#FFF3B0] hover:bg-[#58111A] rounded text-xs font-bold font-display"
                >
                  Book Private Viewing
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
