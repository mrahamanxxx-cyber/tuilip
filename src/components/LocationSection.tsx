import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Compass, 
  Navigation, 
  Building2, 
  Train, 
  Car, 
  ExternalLink,
  Calendar,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { SHOWROOM_LOCATIONS } from '../data/artifactsData';
import { ShowroomLocation } from '../types';

interface LocationSectionProps {
  onOpenBooking: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenBooking }) => {
  const [selectedLocationId, setSelectedLocationId] = useState<string>('munich-flagship');

  const activeLoc = SHOWROOM_LOCATIONS.find(loc => loc.id === selectedLocationId) || SHOWROOM_LOCATIONS[0];

  const googleMapsUrl = selectedLocationId === 'munich-flagship'
    ? 'https://maps.google.com/?q=Augustenstraße+41,+80333+München,+Germany'
    : 'https://maps.google.com/?q=Hawa+Mahal+Marg,+Johari+Bazaar,+Jaipur,+Rajasthan';

  return (
    <section id="locations" className="py-16 sm:py-24 bg-[#FAF7F2] text-[#1E1412] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EFEB] border border-[#C5A059]/40">
            <Compass className="w-3.5 h-3.5 text-[#AA771C]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#4A0E17] font-display">
              Salon & Archive Locations
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#4A0E17]">
            Visit Our Showroom & Conservation Archives
          </h2>
          <p className="text-neutral-700 font-serif-sub text-base sm:text-lg">
            Experience Indian royal history in person at our European flagship salon in Munich or our generational restoration archive in Jaipur.
          </p>
        </div>

        {/* Location Selector Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#F5EFEB] p-1.5 rounded-xl border border-[#C5A059]/40 inline-flex gap-2 shadow-sm">
            {SHOWROOM_LOCATIONS.map((loc) => {
              const isSelected = loc.id === selectedLocationId;
              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocationId(loc.id)}
                  className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#4A0E17] text-[#FFF3B0] shadow-md'
                      : 'text-[#4A0E17] hover:bg-white/60'
                  }`}
                >
                  <MapPin className={`w-4 h-4 ${isSelected ? 'text-[#D4AF37]' : 'text-[#8C2333]'}`} />
                  <span>{loc.city}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? 'bg-[#36080F] text-[#E5C07B]' : 'bg-neutral-200 text-neutral-600'}`}>
                    {loc.id === 'munich-flagship' ? 'European Flagship' : 'Heritage Workshop'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Location Showcase Card */}
        <div className="bg-white rounded-2xl border-2 border-[#C5A059]/50 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left: Location Photo & Interactive Map View */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-neutral-900 text-white relative">
              
              {/* Photo */}
              <div className="relative h-72 sm:h-96 w-full overflow-hidden">
                <img
                  src={activeLoc.image}
                  alt={activeLoc.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                {/* Location Badge */}
                <div className="absolute top-4 left-4 bg-[#4A0E17]/90 text-[#FFF3B0] px-3 py-1.5 rounded-lg border border-[#D4AF37] text-xs font-semibold flex items-center gap-1.5 shadow">
                  <Building2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>{activeLoc.name}</span>
                </div>

                {/* Direct Google Maps Link */}
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-white text-[#4A0E17] px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>

                {/* Address overlay */}
                <div className="absolute bottom-4 left-4 text-left max-w-sm">
                  <span className="text-[10px] uppercase tracking-widest text-[#E5C07B] font-bold block">
                    Official Address
                  </span>
                  <p className="font-display text-base font-bold text-white leading-tight">
                    {activeLoc.address}, {activeLoc.postalCode} {activeLoc.city}
                  </p>
                </div>
              </div>

              {/* Transit & Access Guide */}
              <div className="p-6 bg-[#36080F] border-t border-[#C5A059]/30 space-y-3 text-left">
                <div className="flex items-start gap-3 text-xs text-[#FAF7F2]">
                  <Train className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#FFF3B0] block">Public Transit & U-Bahn:</strong>
                    <span className="text-[#FAF7F2]/80">{activeLoc.transitGuide}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-[#FAF7F2]">
                  <Car className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#FFF3B0] block">Parking & Valet Access:</strong>
                    <span className="text-[#FAF7F2]/80">{activeLoc.parkingInfo}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Operational Details, Curator Info & Booking */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 text-left bg-[#FAF7F2]">
              
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-widest text-[#AA771C]">
                    Salon Information
                  </span>
                  <h3 className="font-display font-bold text-2xl text-[#4A0E17] mt-1">
                    {activeLoc.city}
                  </h3>
                  <p className="text-xs text-neutral-700 leading-relaxed font-serif-sub mt-2">
                    {activeLoc.description}
                  </p>
                </div>

                {/* Curator in Residence */}
                <div className="bg-white p-4 rounded-xl border border-[#C5A059]/40 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#AA771C]">
                    Curator in Residence
                  </span>
                  <h4 className="font-display font-bold text-sm text-[#4A0E17]">
                    {activeLoc.curator}
                  </h4>
                  <p className="text-xs text-neutral-600">
                    {activeLoc.curatorTitle}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#8C2333]">
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <a href="tel:9083531892" className="hover:underline">
                      Direct Curator Line: 9083531892
                    </a>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#4A0E17] flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                    Viewing Hours & Access
                  </h4>
                  <div className="bg-white p-3.5 rounded-lg border border-neutral-200 text-xs space-y-1.5 text-neutral-700">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Weekdays:</span>
                      <strong className="text-neutral-800">{activeLoc.hours.weekdays}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Saturday:</span>
                      <strong className="text-neutral-800">{activeLoc.hours.saturday}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Sunday:</span>
                      <strong className="text-neutral-800">{activeLoc.hours.sunday}</strong>
                    </div>
                  </div>
                </div>

              </div>

              {/* Direct Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#E5C07B] to-[#AA771C] text-[#2E050B] rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 font-display cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Salon Appointment</span>
                </button>

                <a
                  href="tel:9083531892"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-[#4A0E17] bg-[#F5EFEB] hover:bg-[#EBE2DC] border border-[#C5A059]/40 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Call 9083531892 (Franchisko Gamini Paluwe)</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
