import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Clock,
  Sparkles
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryInterest, setCategoryInterest] = useState('Antique Brass Lamps & Diyas');
  const [budgetRange, setBudgetRange] = useState('€2,500 – €5,000');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Please provide your name, email, and phone.');
      return;
    }
    setSubmitted(true);
  };

  const whatsappLink = `https://wa.me/919083531892?text=${encodeURIComponent(
    `Hello Franchisko Gamini Paluwe! I would like to inquire about Indian heritage collectibles from Tulip International.`
  )}`;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#FAF7F2] text-[#1E1412] relative border-t border-[#C5A059]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EFEB] border border-[#C5A059]/40">
            <MessageSquare className="w-3.5 h-3.5 text-[#AA771C]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#4A0E17] font-display">
              Curator Direct Inquiries
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#4A0E17]">
            Connect with Master Antiquarian Franchisko Gamini Paluwe
          </h2>
          <p className="text-neutral-700 font-serif-sub text-base sm:text-lg">
            Whether seeking private salon viewing in Munich, bespoke royal artifact sourcing, or provenance appraisal, 
            our curatorial desk is at your complete disposal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Direct Contact Information & Showroom Details */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Direct Curator Phone Card */}
            <div className="bg-[#4A0E17] text-[#FAF7F2] p-6 rounded-2xl border-2 border-[#D4AF37] shadow-xl space-y-4 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-[#2E050B] flex items-center justify-center font-bold">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C07B] block">
                    Direct Curator & Acquisition Line
                  </span>
                  <a 
                    href="tel:9083531892" 
                    className="font-display font-bold text-2xl text-[#FFF3B0] hover:underline"
                  >
                    9083531892
                  </a>
                </div>
              </div>

              <p className="text-xs text-[#FAF7F2]/80 leading-relaxed font-serif-sub">
                Speak directly with Founder <strong>Franchisko Gamini Paluwe</strong> regarding confidential valuations, 
                private estate dispersals, or VIP private viewings.
              </p>

              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href="tel:9083531892"
                  className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-[#2E050B] rounded-lg text-xs font-bold uppercase tracking-wider font-display flex items-center gap-1.5 shadow"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call 9083531892</span>
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Message</span>
                </a>
              </div>
            </div>

            {/* Address & Operational Summary */}
            <div className="bg-white p-6 rounded-2xl border border-[#C5A059]/40 shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#AA771C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs uppercase tracking-wider text-[#4A0E17] block">
                    Munich Flagship Salon
                  </strong>
                  <p className="text-sm text-neutral-800 font-medium">
                    Augustenstraße 41, 80333 München, Germany
                  </p>
                  <span className="text-xs text-neutral-500 block mt-0.5">
                    U-Bahn U2 Josephsplatz / Theresienstraße
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-neutral-100">
                <Clock className="w-5 h-5 text-[#AA771C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs uppercase tracking-wider text-[#4A0E17] block">
                    Viewing Salon Hours
                  </strong>
                  <p className="text-xs text-neutral-700">
                    Tuesday – Friday: 10:30 – 18:30 (CET)<br />
                    Saturday: 11:00 – 17:00 (Private viewing by appointment)<br />
                    Sunday & Monday: Private Vault Visits Available
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-neutral-100">
                <Mail className="w-5 h-5 text-[#AA771C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs uppercase tracking-wider text-[#4A0E17] block">
                    Electronic Inquiries
                  </strong>
                  <a href="mailto:munich@tulip-international.com" className="text-xs text-[#8C2333] hover:underline font-semibold">
                    munich@tulip-international.com
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Buyer & Collector Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#C5A059]/40 shadow-lg text-left">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-display font-bold text-2xl text-[#4A0E17]">
                  Inquiry Successfully Received
                </h3>
                <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>. Founder Franchisko Gamini Paluwe will review your collecting requirements 
                  and contact you within 24 hours at <strong>{phone}</strong> / <strong>{email}</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 bg-[#4A0E17] text-[#FFF3B0] rounded-lg text-xs font-bold uppercase tracking-wider font-display"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-[#4A0E17]">
                    Bespoke Antique Acquisition & Appraisal Inquiry
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1">
                    Fill in your details below for custom royal sourcing, artifact appraisal, or catalog inquiries.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#4A0E17] uppercase tracking-wider">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Baroness Helene von Ritter"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#C5A059]/40 rounded-lg text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
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
                      placeholder="helene@heritage.com"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#C5A059]/40 rounded-lg text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#4A0E17] uppercase tracking-wider">
                      Direct Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+49 170 987654 or 9083531892"
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#C5A059]/40 rounded-lg text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#4A0E17] uppercase tracking-wider">
                      Primary Heritage Category
                    </label>
                    <select
                      value={categoryInterest}
                      onChange={(e) => setCategoryInterest(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#C5A059]/40 rounded-lg text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                    >
                      <option value="Antique Brass Lamps & Diyas">Antique Brass Lamps & Diyas</option>
                      <option value="Rajput Swords & Armor">Rajput Swords & Armor</option>
                      <option value="Vintage Rajasthani Furniture">Vintage Rajasthani Furniture</option>
                      <option value="Hand-Painted Pottery">Hand-Painted Pottery</option>
                      <option value="Traditional Silver Jewelry">Traditional Silver Jewelry</option>
                      <option value="Miniature Paintings">Miniature Paintings</option>
                      <option value="Vintage Manuscripts">Vintage Manuscripts</option>
                      <option value="Royal Boxes & Objects">Royal Boxes & Objects</option>
                      <option value="General Antique Appraisal">General Antique Appraisal</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#4A0E17] uppercase tracking-wider">
                    Estimated Acquisition Budget
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#C5A059]/40 rounded-lg text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  >
                    <option value="Under €2,500">Under €2,500</option>
                    <option value="€2,500 – €5,000">€2,500 – €5,000</option>
                    <option value="€5,000 – €10,000">€5,000 – €10,000</option>
                    <option value="€10,000 – €25,000+">€10,000 – €25,000+ (Museum & Vault Class)</option>
                    <option value="Appraisal Only">Appraisal / Valuation Only</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#4A0E17] uppercase tracking-wider">
                    Message / Specific Relic Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the era, dimensions, or specific Indian palace aesthetic you are looking to acquire..."
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#C5A059]/40 rounded-lg text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#E5C07B] to-[#AA771C] text-[#2E050B] rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 font-display cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to Founder Franchisko Gamini Paluwe</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
