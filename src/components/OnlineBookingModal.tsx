import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Sparkles, 
  CheckCircle, 
  Phone, 
  Download, 
  Share2, 
  ShieldCheck,
  Building,
  Video,
  Scale,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AppointmentType, Booking, Artifact } from '../types';
import { ARTIFACTS } from '../data/artifactsData';

interface OnlineBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedArtifactId?: string | null;
}

export const OnlineBookingModal: React.FC<OnlineBookingModalProps> = ({
  isOpen,
  onClose,
  preselectedArtifactId,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [appointmentType, setAppointmentType] = useState<AppointmentType>('Private Salon Viewing (Munich)');
  const [selectedLocation, setSelectedLocation] = useState<string>('Munich Salon (Augustenstraße 41, 80333 München)');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:30 AM');
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [selectedArtifactIds, setSelectedArtifactIds] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Set default minimum date (tomorrow)
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setSelectedDate(dateStr);
  }, []);

  // Sync preselected artifact
  useEffect(() => {
    if (preselectedArtifactId && !selectedArtifactIds.includes(preselectedArtifactId)) {
      setSelectedArtifactIds(prev => [...prev, preselectedArtifactId]);
    }
  }, [preselectedArtifactId]);

  if (!isOpen) return null;

  const timeSlots = [
    '10:30 AM (Morning Salon)',
    '11:30 AM (Curator Walkthrough)',
    '02:00 PM (Afternoon Viewing)',
    '03:30 PM (Private Appraisal Session)',
    '05:00 PM (Twilight Viewing)',
    '06:30 PM (VIP Private Vault Hour)',
  ];

  const experienceOptions: {
    type: AppointmentType;
    title: string;
    description: string;
    icon: any;
    locationNote: string;
  }[] = [
    {
      type: 'Private Salon Viewing (Munich)',
      title: 'Munich Flagship Private Salon Viewing',
      description: 'Exclusive private access to our Augustenstraße 41 showroom with curated relic presentations and tea service.',
      icon: Building,
      locationNote: 'Augustenstraße 41, 80333 München, Germany'
    },
    {
      type: 'Virtual HD Video Walkthrough',
      title: 'Virtual Live HD Curator Walkthrough',
      description: 'Ultra-high-definition multi-camera live video walkthrough with Master Curator Franchisko Gamini Paluwe.',
      icon: Video,
      locationNote: 'Private Encrypted Video Stream (Zoom / Google Meet)'
    },
    {
      type: 'Antique Appraisal & Valuation',
      title: 'Antique Appraisal & Forensic Valuation',
      description: 'Bring or present your Indian antiques for material analysis, age verification, and auction valuation.',
      icon: Scale,
      locationNote: 'Munich Salon Forensic Desk / Virtual Report'
    },
    {
      type: 'Curator Private Consultation',
      title: 'Bespoke Collection & Interior Acquisition Consultation',
      description: 'Private 1-on-1 session for interior architects, royal art collectors, and museum institutions.',
      icon: Award,
      locationNote: 'Munich Salon or Private Residence Visit'
    },
  ];

  const handleToggleArtifact = (id: string) => {
    if (selectedArtifactIds.includes(id)) {
      setSelectedArtifactIds(selectedArtifactIds.filter(item => item !== id));
    } else {
      setSelectedArtifactIds([...selectedArtifactIds, id]);
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !email || !phone) {
      alert('Please fill in your name, email, and phone number.');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const confirmationCode = `TLP-MUN-${randomSuffix}`;

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      confirmationCode,
      customerName,
      email,
      phone,
      appointmentType,
      location: selectedLocation,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      guestsCount,
      interestedArtifactIds: selectedArtifactIds,
      notes: specialNotes,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    setConfirmedBooking(newBooking);
    setStep(5);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#58111A', '#FFF3B0', '#AA771C']
      });
    } catch (e) {
      // ignore
    }
  };

  const handleDownloadCalendar = () => {
    if (!confirmedBooking) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Tulip International//Antique Viewing Booking//EN
BEGIN:VEVENT
SUMMARY:Tulip International - ${confirmedBooking.appointmentType}
DESCRIPTION:VIP Antique & Heritage Viewing at Augustenstraße 41\\nCode: ${confirmedBooking.confirmationCode}\\nDirect line: 9083531892
LOCATION:${confirmedBooking.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Tulip-International-Booking-${confirmedBooking.confirmationCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative bg-[#FAF7F2] text-[#1E1412] w-full max-w-3xl rounded-xl shadow-2xl border-2 border-[#D4AF37] overflow-hidden my-auto max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#4A0E17] text-[#FAF7F2] px-6 py-4 border-b border-[#C5A059]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h3 className="font-display font-bold text-base tracking-wider text-[#FFF3B0]">
                TULIP INTERNATIONAL &bull; PRIVATE VIEWING RESERVATION
              </h3>
              <p className="text-[11px] text-[#E5C07B] font-serif-sub">
                Augustenstraße 41, 80333 München &bull; Direct Curator Line: 9083531892
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#FAF7F2] hover:text-[#D4AF37] p-1 rounded-full hover:bg-white/10"
            aria-label="Close booking modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Wizard Steps Progress (only if not confirmed) */}
        {step < 5 && (
          <div className="bg-[#36080F] px-6 py-2.5 border-b border-[#C5A059]/30 flex items-center justify-between text-xs text-[#FAF7F2]/80">
            <span className={`font-semibold ${step >= 1 ? 'text-[#FFF3B0]' : ''}`}>
              1. Experience
            </span>
            <span>&rarr;</span>
            <span className={`font-semibold ${step >= 2 ? 'text-[#FFF3B0]' : ''}`}>
              2. Date & Time
            </span>
            <span>&rarr;</span>
            <span className={`font-semibold ${step >= 3 ? 'text-[#FFF3B0]' : ''}`}>
              3. Relics of Interest
            </span>
            <span>&rarr;</span>
            <span className={`font-semibold ${step >= 4 ? 'text-[#FFF3B0]' : ''}`}>
              4. Collector Info
            </span>
          </div>
        )}

        {/* Body Container */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          
          {/* STEP 1: Select Experience Type */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-left">
                <h4 className="font-display font-bold text-lg text-[#4A0E17]">
                  Select Your Private Viewing Experience
                </h4>
                <p className="text-xs text-neutral-600">
                  Please choose how you would like to experience Tulip International's royal Indian collection.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {experienceOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = appointmentType === opt.type;
                  return (
                    <div
                      key={opt.type}
                      onClick={() => {
                        setAppointmentType(opt.type);
                        setSelectedLocation(opt.locationNote);
                      }}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#4A0E17]/5 shadow-md ring-2 ring-[#D4AF37]/30'
                          : 'border-neutral-200 bg-white hover:border-[#C5A059]'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#4A0E17] text-[#FFF3B0]' : 'bg-[#F5EFEB] text-[#4A0E17]'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          {isSelected && (
                            <span className="text-[10px] font-bold uppercase bg-[#D4AF37] text-[#2E050B] px-2 py-0.5 rounded">
                              Selected
                            </span>
                          )}
                        </div>
                        <h5 className="font-display font-bold text-sm text-[#4A0E17]">
                          {opt.title}
                        </h5>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {opt.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-neutral-100 text-[11px] text-[#AA771C] font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{opt.locationNote}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#4A0E17] hover:bg-[#58111A] text-[#FFF3B0] rounded-lg shadow cursor-pointer font-display"
                >
                  Continue to Date & Time &rarr;
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Date & Time Slot */}
          {step === 2 && (
            <div className="space-y-5 text-left">
              <div>
                <h4 className="font-display font-bold text-lg text-[#4A0E17]">
                  Select Date, Time & Party Size
                </h4>
                <p className="text-xs text-neutral-600">
                  Salon appointments are scheduled with 90-minute private intervals to guarantee complete discretion.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Date Picker */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#4A0E17] uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#AA771C]" />
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#C5A059]/40 rounded-lg text-sm text-[#1E1412] focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  />
                  <span className="text-[11px] text-neutral-500 block">
                    Munich Showroom opens Tuesday through Saturday.
                  </span>
                </div>

                {/* Guests Count */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#4A0E17] uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#AA771C]" />
                    Number of Attendees
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full p-2.5 bg-white border border-[#C5A059]/40 rounded-lg text-sm text-[#1E1412] focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  >
                    <option value={1}>1 Collector (Private Viewing)</option>
                    <option value={2}>2 Persons (Couple / Delegation)</option>
                    <option value={3}>3 Persons</option>
                    <option value={4}>4 Persons (Family / Curatorial Board)</option>
                    <option value={6}>5-6 Persons (VIP Delegation)</option>
                  </select>
                </div>

              </div>

              {/* Time Slots */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-[#4A0E17] uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#AA771C]" />
                  Available Time Slots
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-2.5 rounded-lg text-xs font-medium border text-center transition-all ${
                        selectedTimeSlot === slot
                          ? 'bg-[#4A0E17] text-[#FFF3B0] border-[#D4AF37] shadow font-semibold'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-[#AA771C]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                >
                  &larr; Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#4A0E17] hover:bg-[#58111A] text-[#FFF3B0] rounded-lg shadow font-display"
                >
                  Select Relics of Interest &rarr;
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Relics of Interest */}
          {step === 3 && (
            <div className="space-y-5 text-left">
              <div>
                <h4 className="font-display font-bold text-lg text-[#4A0E17]">
                  Select Relics for Presentation
                </h4>
                <p className="text-xs text-neutral-600">
                  Our conservators will prepare the selected artifacts and their corresponding provenance files prior to your arrival.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
                {ARTIFACTS.map((art) => {
                  const isChecked = selectedArtifactIds.includes(art.id);
                  return (
                    <div
                      key={art.id}
                      onClick={() => handleToggleArtifact(art.id)}
                      className={`p-2.5 rounded-lg border flex items-center gap-3 cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#4A0E17]/10 border-[#D4AF37] ring-1 ring-[#D4AF37]'
                          : 'bg-white border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <img src={art.imageUrl} alt={art.name} className="w-12 h-12 rounded object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h6 className="font-display text-xs font-bold text-[#4A0E17] truncate">
                          {art.name}
                        </h6>
                        <span className="text-[10px] text-neutral-500 block truncate">
                          {art.era} &bull; €{art.priceEUR.toLocaleString()}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded text-[#4A0E17] focus:ring-[#D4AF37] shrink-0"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="text-xs text-neutral-500 bg-[#F5EFEB] p-3 rounded-lg border border-[#C5A059]/30">
                <span>Selected <strong>{selectedArtifactIds.length}</strong> items. Uncatalogued acquisitions can also be presented upon request.</span>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                >
                  &larr; Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#4A0E17] hover:bg-[#58111A] text-[#FFF3B0] rounded-lg shadow font-display"
                >
                  Enter Collector Details &rarr;
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Collector Contact Information */}
          {step === 4 && (
            <form onSubmit={handleSubmitBooking} className="space-y-4 text-left">
              <div>
                <h4 className="font-display font-bold text-lg text-[#4A0E17]">
                  Collector & Contact Credentials
                </h4>
                <p className="text-xs text-neutral-600">
                  Please provide your contact information to receive your VIP Showroom pass and gate directions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#4A0E17] uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Lord Alexander Wright"
                    className="w-full p-2.5 bg-white border border-[#C5A059]/40 rounded-lg text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#4A0E17] uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alexander@heritage-vault.com"
                    className="w-full p-2.5 bg-white border border-[#C5A059]/40 rounded-lg text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#4A0E17] uppercase tracking-wider">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+49 170 1234567 or 9083531892"
                    className="w-full p-2.5 bg-white border border-[#C5A059]/40 rounded-lg text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#4A0E17] uppercase tracking-wider">
                    Special Hospitality / Language Preference
                  </label>
                  <input
                    type="text"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="English / German / Hindi / Royal Chai service"
                    className="w-full p-2.5 bg-white border border-[#C5A059]/40 rounded-lg text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              {/* Summary recap box */}
              <div className="bg-[#F5EFEB] p-3.5 rounded-lg border border-[#C5A059]/30 text-xs space-y-1 text-neutral-700">
                <div className="flex justify-between">
                  <span>Experience:</span>
                  <strong>{appointmentType}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Scheduled Time:</span>
                  <strong>{selectedDate} at {selectedTimeSlot}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <strong>Augustenstraße 41, München</strong>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                >
                  &larr; Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#E5C07B] to-[#AA771C] text-[#2E050B] rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all font-display cursor-pointer"
                >
                  Confirm VIP Reservation &rarr;
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: Booking Confirmed Screen */}
          {step === 5 && confirmedBooking && (
            <div className="text-center py-4 space-y-6">
              
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500 shadow-lg">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-widest text-[#AA771C]">
                  Reservation Confirmed & Registered
                </span>
                <h3 className="text-2xl font-display font-bold text-[#4A0E17]">
                  Thank You, {confirmedBooking.customerName}
                </h3>
                <p className="text-xs text-neutral-600 font-serif-sub max-w-md mx-auto">
                  Your private viewing invitation has been logged into our salon register. 
                  Founder Franchisko Gamini Paluwe looks forward to greeting you.
                </p>
              </div>

              {/* VIP Showroom Digital Pass Card */}
              <div className="max-w-md mx-auto bg-[#36080F] text-[#FAF7F2] rounded-xl border-2 border-[#D4AF37] p-5 shadow-2xl text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex justify-between items-start border-b border-[#C5A059]/30 pb-3 mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                      VIP Showroom Pass
                    </span>
                    <h5 className="font-display font-bold text-sm text-[#FAF7F2]">
                      TULIP INTERNATIONAL
                    </h5>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#FFF3B0] bg-[#4A0E17] px-2.5 py-1 rounded border border-[#C5A059]">
                    {confirmedBooking.confirmationCode}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-[#FAF7F2]/90 mb-3">
                  <div>
                    <span className="text-[10px] text-[#E5C07B] block">Date:</span>
                    <strong>{confirmedBooking.date}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#E5C07B] block">Time:</span>
                    <strong>{confirmedBooking.timeSlot}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-[#E5C07B] block">Location:</span>
                    <strong>{confirmedBooking.location}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#E5C07B] block">Attendees:</span>
                    <strong>{confirmedBooking.guestsCount} Guest(s)</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#E5C07B] block">Direct Curator Line:</span>
                    <strong>9083531892</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#C5A059]/20 text-[10px] text-[#E5C07B] flex items-center justify-between">
                  <span>Show this pass upon arrival at Augustenstr. 41</span>
                  <span className="font-semibold">Munich Salon</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadCalendar}
                  className="px-4 py-2.5 text-xs font-bold bg-[#4A0E17] text-[#FFF3B0] hover:bg-[#58111A] rounded-lg transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#D4AF37]" />
                  <span>Save to Calendar (.ics)</span>
                </button>

                <a
                  href={`https://wa.me/919083531892?text=${encodeURIComponent(
                    `Hello Franchisko! My viewing reservation ${confirmedBooking.confirmationCode} for ${confirmedBooking.date} at ${confirmedBooking.timeSlot} has been confirmed.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Notify Curator (WhatsApp)</span>
                </a>

                <button
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 border border-neutral-300 rounded-lg"
                >
                  Done
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
