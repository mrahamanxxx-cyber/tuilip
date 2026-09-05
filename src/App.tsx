/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ArtifactCatalog } from './components/ArtifactCatalog';
import { HeritageGallery } from './components/HeritageGallery';
import { ProvenanceVerification } from './components/ProvenanceVerification';
import { LocationSection } from './components/LocationSection';
import { AboutStory } from './components/AboutStory';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { OnlineBookingModal } from './components/OnlineBookingModal';
import { CuratorChatAI } from './components/CuratorChatAI';

export default function App() {
  const [currentCurrency, setCurrentCurrency] = useState<'EUR' | 'USD' | 'INR'>('EUR');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [preselectedArtifactId, setPreselectedArtifactId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCoaNumber, setActiveCoaNumber] = useState<string | null>('TLP-1987-L01');

  const handleOpenBooking = (artifactId?: string) => {
    if (artifactId) {
      setPreselectedArtifactId(artifactId);
    } else {
      setPreselectedArtifactId(null);
    }
    setIsBookingOpen(true);
  };

  const handleVerifyCoA = (coaNumber: string) => {
    setActiveCoaNumber(coaNumber);
    const element = document.getElementById('provenance');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreCollection = () => {
    const element = document.getElementById('collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreRelicByKeyword = (keyword: string) => {
    setSearchQuery(keyword);
    handleExploreCollection();
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1412] flex flex-col selection:bg-[#C5A059]/30 selection:text-[#58111A]">
      {/* Royal Header & Sticky Navigation */}
      <Navbar
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        onOpenBooking={() => handleOpenBooking()}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreCollection={handleExploreCollection}
          onOpenProvenance={() => {
            const el = document.getElementById('provenance');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 1. Our Collection (Catalog with 8 categories, search, price sorting) */}
        <ArtifactCatalog
          currentCurrency={currentCurrency}
          onBookViewingForArtifact={(id) => handleOpenBooking(id)}
          onVerifyCoA={handleVerifyCoA}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* 2. Heritage Gallery (Photographic Exhibition & Lightbox) */}
        <HeritageGallery
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 3. Provenance & CoA Verification Portal */}
        <ProvenanceVerification
          initialCoaNumber={activeCoaNumber}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 4. Showroom & Location Integration (Munich Augustenstraße 41 & Jaipur) */}
        <LocationSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 5. About Us (Story of Franchisko Gamini Paluwe & Est. 1987) */}
        <AboutStory
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 6. Contact & Direct Inquiries (Phone: 9083531892) */}
        <ContactSection />
      </main>

      {/* Royal Footer */}
      <Footer
        onNavigate={(sectionId) => {
          setActiveSection(sectionId);
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Online VIP Booking Modal */}
      <OnlineBookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setPreselectedArtifactId(null);
        }}
        preselectedArtifactId={preselectedArtifactId}
      />

      {/* Interactive AI Curator Desk Assistant */}
      <CuratorChatAI
        onOpenBooking={() => handleOpenBooking()}
        onExploreRelic={handleExploreRelicByKeyword}
      />
    </div>
  );
}
