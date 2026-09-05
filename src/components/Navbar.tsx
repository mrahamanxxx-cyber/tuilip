import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Calendar, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles, 
  Globe2,
  Clock
} from 'lucide-react';

interface NavbarProps {
  currentCurrency: 'EUR' | 'USD' | 'INR';
  onCurrencyChange: (currency: 'EUR' | 'USD' | 'INR') => void;
  onOpenBooking: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  onOpenBooking,
  activeSection,
  setActiveSection,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { id: 'collection', label: 'Our Collection' },
    { id: 'gallery', label: 'Heritage Gallery' },
    { id: 'provenance', label: 'CoA Verification' },
    { id: 'locations', label: 'Showroom & Location' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact & Inquire' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#4A0E17] text-[#FAF7F2] shadow-xl border-b border-[#C5A059]/30">
      {/* Top Banner with Direct Details */}
      <div className="bg-[#36080F] border-b border-[#C5A059]/20 px-4 py-1.5 text-xs text-[#E5C07B] flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <strong>Munich Showroom:</strong> Augustenstraße 41, 80333 München
          </span>
          <span className="hidden md:inline-block text-[#C5A059]/50">|</span>
          <span className="hidden md:flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
            Tue–Sat 10:30–18:30 (CET)
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="tel:9083531892" 
            className="flex items-center gap-1.5 font-medium hover:text-[#FFF3B0] transition-colors"
            title="Call Curator Directly"
          >
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-semibold tracking-wide">Direct: 9083531892</span>
          </a>
          <span className="text-[#C5A059]/50">|</span>
          <div className="flex items-center gap-1 bg-[#4A0E17] px-2 py-0.5 rounded border border-[#C5A059]/30 text-xs">
            <Globe2 className="w-3 h-3 text-[#C5A059]" />
            <select
              value={currentCurrency}
              onChange={(e) => onCurrencyChange(e.target.value as 'EUR' | 'USD' | 'INR')}
              className="bg-transparent text-[#FAF7F2] text-xs focus:outline-none cursor-pointer font-medium"
              aria-label="Select Currency"
            >
              <option value="EUR" className="bg-[#4A0E17] text-[#FAF7F2]">€ EUR</option>
              <option value="USD" className="bg-[#4A0E17] text-[#FAF7F2]">$ USD</option>
              <option value="INR" className="bg-[#4A0E17] text-[#FAF7F2]">₹ INR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] p-1 flex items-center justify-center bg-gradient-to-br from-[#58111A] to-[#2E050B] shadow-inner group-hover:border-[#FFF3B0] transition-colors">
              <span className="font-display font-bold text-xl text-[#D4AF37] group-hover:scale-110 transition-transform">
                TI
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl sm:text-2xl font-bold tracking-wider text-[#FAF7F2] group-hover:text-[#FFF3B0] transition-colors">
                  TULIP INTERNATIONAL
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase tracking-widest bg-[#C5A059]/20 text-[#E5C07B] rounded border border-[#C5A059]/40">
                  Est. 1987
                </span>
              </div>
              <p className="text-[11px] text-[#C5A059] tracking-widest uppercase font-serif-sub">
                Indian Antiques & Heritage Collectibles • Munich & Jaipur
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                  activeSection === link.id
                    ? 'text-[#FFF3B0] font-semibold'
                    : 'text-[#FAF7F2]/85 hover:text-[#D4AF37]'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37] rounded-full"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Search Bar Toggle */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-[#36080F] rounded-full border border-[#C5A059] px-3 py-1 text-xs">
                  <Search className="w-3.5 h-3.5 text-[#C5A059] mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search relics, brass, swords..."
                    className="bg-transparent text-[#FAF7F2] placeholder-[#FAF7F2]/50 text-xs focus:outline-none w-44"
                    autoFocus
                  />
                  <button 
                    onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                    className="text-[#FAF7F2]/60 hover:text-white ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-[#FAF7F2]/80 hover:text-[#D4AF37] transition-colors rounded-full hover:bg-white/5"
                  title="Search Antiques"
                  aria-label="Search Antiques"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Book Private Viewing CTA */}
            <button
              onClick={onOpenBooking}
              id="nav-book-viewing-btn"
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#E5C07B] to-[#AA771C] text-[#2E050B] rounded-md shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer font-display"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Private Viewing</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider bg-[#D4AF37] text-[#2E050B] rounded"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#FAF7F2] hover:text-[#D4AF37]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#36080F] border-t border-[#C5A059]/30 px-4 py-4 space-y-3">
          <div className="mb-3">
            <div className="flex items-center bg-[#4A0E17] rounded-md border border-[#C5A059]/40 px-3 py-2">
              <Search className="w-4 h-4 text-[#C5A059] mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search antiques, era, materials..."
                className="bg-transparent text-sm text-white placeholder-white/50 w-full focus:outline-none"
              />
            </div>
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left py-2 text-sm text-[#FAF7F2] hover:text-[#D4AF37] border-b border-white/5"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="tel:9083531892"
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold bg-[#4A0E17] text-[#E5C07B] border border-[#C5A059]/40 rounded-md"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              Call Curator: 9083531892
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-[#2E050B] rounded-md shadow"
            >
              Schedule VIP Viewing / Appraisal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
