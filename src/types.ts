export type ArtifactCategory =
  | 'All'
  | 'Antique Brass Lamps & Diyas'
  | 'Rajput Swords & Armor'
  | 'Vintage Rajasthani Furniture'
  | 'Hand-Painted Pottery'
  | 'Traditional Silver Jewelry'
  | 'Miniature Paintings'
  | 'Vintage Manuscripts'
  | 'Royal Boxes & Objects';

export interface Artifact {
  id: string;
  name: string;
  hindiName?: string;
  category: Exclude<ArtifactCategory, 'All'>;
  era: string;
  estimatedYear: string;
  origin: string;
  materials: string[];
  dimensions: string;
  weight: string;
  priceEUR: number;
  priceUSD: number;
  priceINR: number;
  status: 'Available' | 'Reserved' | 'In Private Viewing' | 'Museum Loan';
  coaNumber: string;
  description: string;
  historicalSignificance: string;
  conditionReport: string;
  provenance: string[];
  imageUrl: string;
  additionalImages?: string[];
  featured?: boolean;
  rareClassification: 'Museum Grade' | 'Royal Heritage' | 'Collector Masterpiece' | 'Rare Folio';
}

export type AppointmentType =
  | 'Private Salon Viewing (Munich)'
  | 'Virtual HD Video Walkthrough'
  | 'Antique Appraisal & Valuation'
  | 'Curator Private Consultation'
  | 'Franchise & Trade Partnership';

export interface Booking {
  id: string;
  confirmationCode: string;
  customerName: string;
  email: string;
  phone: string;
  appointmentType: AppointmentType;
  location: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  interestedArtifactIds: string[];
  notes?: string;
  status: 'Confirmed' | 'Scheduled' | 'Pending Verification';
  createdAt: string;
}

export interface ShowroomLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  directMobile: string;
  email: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  curator: string;
  curatorTitle: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
  transitGuide: string;
  parkingInfo: string;
}

export interface ProvenanceCertificate {
  coaNumber: string;
  artifactName: string;
  period: string;
  region: string;
  curatorName: string;
  inspectionDate: string;
  metallurgyOrMediumTest: string;
  heritageRating: string;
  acquisitionHistory: string;
  certifiedGenuine: boolean;
}
