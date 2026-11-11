export type VehicleSection = 'latest-deals' | 'top-deals' | 'cheap-deals';

export const DEAL_SECTIONS_ORDER: VehicleSection[] = [
  'latest-deals',
  'top-deals',
  'cheap-deals',
];

export interface HeroSlide {
  id: string;
  title: string;
  kicker: string;
  subtitle: string;
  ctaLabel: string;
  targetSectionId: string;
  image: string;
  imagePosition: string;
  metricLabel: string;
}

export interface Vehicle {
  id: string;
  section: VehicleSection;
  title: string;
  year: number;
  bodyStyle: string;
  drivetrain: string;
  mileage: string;
  horsepower: string;
  acceleration: string;
  transmission: string;
  exteriorTone: string;
  price: number;
  originalPrice?: number;
  savingsNote?: string;
  image: string;
  imagePosition: string;
  summary: string;
  vinCode: string;
}

export interface TrustBadge {
  id: string;
  title: string;
  subtitle: string;
  metric: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-special-offers',
    title: 'Special Offers',
    kicker: '01 · Executive Fleet Incentives',
    subtitle:
      'Up to $14,500 off factory-certified grand tourers and performance coupes with zero-down bespoke financing.',
    ctaLabel: 'Shop Now',
    targetSectionId: 'top-deals',
    image: '/src/assets/images/hero_special_offers_coupe_1794408228116.jpg',
    imagePosition: 'object-center',
    metricLabel: '0.9% APR · 48 Months · Certified Inspection',
  },
  {
    id: 'slide-latest-arrivals',
    title: 'Latest Car Arrivals',
    kicker: '02 · 2026 Architectural Series',
    subtitle:
      'Next-generation dual-motor electric flagships and precision-engineered sedans delivered direct from European ateliers.',
    ctaLabel: 'Shop Now',
    targetSectionId: 'latest-deals',
    image: '/src/assets/images/hero_latest_arrivals_ev_1794408229725.jpg',
    imagePosition: 'object-center',
    metricLabel: '800V Architecture · 410 Mi Range · Immediate Allocation',
  },
  {
    id: 'slide-general-promos',
    title: 'General Promos',
    kicker: '03 · Nationwide White-Glove Delivery',
    subtitle:
      'Complimentary enclosed carrier transport, 24-month comprehensive powertrain coverage, and verified trade-in valuation.',
    ctaLabel: 'Shop Now',
    targetSectionId: 'cheap-deals',
    image: '/src/assets/images/hero_general_promos_suv_1794408232118.jpg',
    imagePosition: 'object-center',
    metricLabel: '7-Day Trial Guarantee · 160-Point Mechanical Audit',
  },
];

export const VEHICLES: Vehicle[] = [
  // Section 1: Top Deals (4 Featured Items)
  {
    id: 'top-1',
    section: 'top-deals',
    title: 'Aston V12 Obsidian GT Coupe',
    year: 2025,
    bodyStyle: 'Grand Tourer',
    drivetrain: 'RWD',
    mileage: '1,840 mi',
    horsepower: '715 hp',
    acceleration: '3.2s 0–60 mph',
    transmission: '8-Speed ZF Automatic',
    exteriorTone: 'Satin Obsidian Black',
    price: 168900,
    originalPrice: 184000,
    savingsNote: 'Save $15,100',
    image: '/src/assets/images/hero_special_offers_coupe_1794408228116.jpg',
    imagePosition: 'object-[65%_60%]',
    summary:
      'Hand-built twin-turbo V12 grand tourer finished in Satin Obsidian Black over full anthracite semi-aniline leather.',
    vinCode: 'MN-V12GT-8901',
  },
  {
    id: 'top-2',
    section: 'top-deals',
    title: 'McLaren Artura Gunmetal Edition',
    year: 2025,
    bodyStyle: 'Mid-Engine Coupe',
    drivetrain: 'RWD Hybrid',
    mileage: '920 mi',
    horsepower: '690 hp',
    acceleration: '2.9s 0–60 mph',
    transmission: '8-Speed SSG Dual-Clutch',
    exteriorTone: 'Liquid Gunmetal Grey',
    price: 194500,
    originalPrice: 212000,
    savingsNote: 'Save $17,500',
    image: '/src/assets/images/vehicle_gt_supercar_mono_1794408233806.jpg',
    imagePosition: 'object-center',
    summary:
      'Carbon lightweight architecture paired with a high-output twin-turbo V6 hybrid powertrain and forged titanium exhaust.',
    vinCode: 'MN-ART690-4412',
  },
  {
    id: 'top-3',
    section: 'top-deals',
    title: 'EQS 580 Pinnacle Monolith Sedan',
    year: 2025,
    bodyStyle: 'Executive EV',
    drivetrain: 'AWD Dual-Motor',
    mileage: '2,410 mi',
    horsepower: '516 hp',
    acceleration: '4.1s 0–60 mph',
    transmission: 'Single-Speed Direct',
    exteriorTone: 'High-Tech Silver Metallic',
    price: 92400,
    originalPrice: 104900,
    savingsNote: 'Save $12,500',
    image: '/src/assets/images/hero_latest_arrivals_ev_1794408229725.jpg',
    imagePosition: 'object-center',
    summary:
      'Whisper-quiet flagship electric saloon featuring rear-axle steering, acoustic laminated glass, and executive rear lounge seating.',
    vinCode: 'MN-EQS580-3109',
  },
  {
    id: 'top-4',
    section: 'top-deals',
    title: 'Q8 e-tron Sportback Black Edition',
    year: 2025,
    bodyStyle: 'Performance SUV',
    drivetrain: 'Quattro AWD',
    mileage: '3,150 mi',
    horsepower: '402 hp',
    acceleration: '5.1s 0–60 mph',
    transmission: 'Dual-Stage Planetary',
    exteriorTone: 'Glacier White / Onyx Trim',
    price: 74800,
    originalPrice: 83500,
    savingsNote: 'Save $8,700',
    image: '/src/assets/images/hero_general_promos_suv_1794408232118.jpg',
    imagePosition: 'object-[32%_62%]',
    summary:
      'Adaptive air suspension, black-optic exterior styling package, and 114 kWh extended battery capacity for effortless grand touring.',
    vinCode: 'MN-Q8ET-7720',
  },

  // Section 2: Cheap Deals (4 Budget-Friendly Items)
  {
    id: 'cheap-1',
    section: 'cheap-deals',
    title: 'A-Class 220 Urban Sport Hatch',
    year: 2022,
    bodyStyle: 'Compact Hatchback',
    drivetrain: 'FWD',
    mileage: '28,400 mi',
    horsepower: '188 hp',
    acceleration: '6.8s 0–60 mph',
    transmission: '7-Speed Dual-Clutch',
    exteriorTone: 'Polar White',
    price: 21900,
    originalPrice: 25400,
    savingsNote: 'Under $22k',
    image: '/src/assets/images/vehicle_compact_urban_mono_1794408233344.jpg',
    imagePosition: 'object-[28%_58%]',
    summary:
      'Agile city hatchback with dual widescreen digital cockpit, panoramic sunroof, and complete single-owner service documentation.',
    vinCode: 'MN-A220-1084',
  },
  {
    id: 'cheap-2',
    section: 'cheap-deals',
    title: 'UX 250h F-Sport Hybrid Crossover',
    year: 2022,
    bodyStyle: 'Compact Crossover',
    drivetrain: 'AWD Hybrid',
    mileage: '31,200 mi',
    horsepower: '181 hp',
    acceleration: '8.1s 0–60 mph',
    transmission: 'E-CVT Sequential',
    exteriorTone: 'Chalk Pearl / Obsidian',
    price: 24500,
    originalPrice: 27900,
    savingsNote: '42 MPG Combined',
    image: '/src/assets/images/vehicle_compact_urban_mono_1794408233344.jpg',
    imagePosition: 'object-[78%_55%]',
    summary:
      'Self-charging hybrid urban crossover delivering 42 MPG combined efficiency, heated NuLuxe seating, and blind-spot monitoring.',
    vinCode: 'MN-UX250-5591',
  },
  {
    id: 'cheap-3',
    section: 'cheap-deals',
    title: 'Golf GTI MK8 Clubsport Spec',
    year: 2021,
    bodyStyle: 'Hot Hatchback',
    drivetrain: 'FWD Differential',
    mileage: '36,750 mi',
    horsepower: '241 hp',
    acceleration: '5.9s 0–60 mph',
    transmission: '6-Speed Manual',
    exteriorTone: 'Moonstone Grey',
    price: 23400,
    originalPrice: 26800,
    savingsNote: 'Enthusiast Spec',
    image: '/src/assets/images/vehicle_compact_urban_mono_1794408233344.jpg',
    imagePosition: 'object-[22%_60%]',
    summary:
      'Driver-focused 6-speed manual hot hatch equipped with electronically controlled torque-sensing limited-slip differential.',
    vinCode: 'MN-GTI8-9320',
  },
  {
    id: 'cheap-4',
    section: 'cheap-deals',
    title: 'Model 3 Long Range Stealth Monochrome',
    year: 2021,
    bodyStyle: 'Compact EV Sedan',
    drivetrain: 'Dual-Motor AWD',
    mileage: '39,100 mi',
    horsepower: '346 hp',
    acceleration: '4.2s 0–60 mph',
    transmission: 'Single-Speed Direct',
    exteriorTone: 'Midnight Silver Metallic',
    price: 22800,
    originalPrice: 26200,
    savingsNote: 'EV Tax Eligible',
    image: '/src/assets/images/hero_latest_arrivals_ev_1794408229725.jpg',
    imagePosition: 'object-[55%_55%]',
    summary:
      'Dual-motor all-wheel drive electric commuter with heat-pump thermal system, satin black trim delete, and battery health certification.',
    vinCode: 'MN-M3LR-6142',
  },

  // Section 3: Latest Deals (4 Newly Added Items)
  {
    id: 'latest-1',
    section: 'latest-deals',
    title: 'Taycan Turbo S Monolith Weissach',
    year: 2026,
    bodyStyle: 'Electric Sports Saloon',
    drivetrain: 'AWD Dual-Motor',
    mileage: '140 mi',
    horsepower: '938 hp',
    acceleration: '2.3s 0–60 mph',
    transmission: '2-Speed Rear / Direct',
    exteriorTone: 'Ice Grey Metallic',
    price: 158000,
    originalPrice: 165000,
    savingsNote: 'Arrived 4 Hours Ago',
    image: '/src/assets/images/hero_latest_arrivals_ev_1794408229725.jpg',
    imagePosition: 'object-[42%_54%]',
    summary:
      '2026 delivery-mileage electric flagship with Active Ride suspension, ceramic composite brakes, and monochrome Pepita interior.',
    vinCode: 'MN-TAY26-0018',
  },
  {
    id: 'latest-2',
    section: 'latest-deals',
    title: 'DBS 770 Ultimate Carbon Volante',
    year: 2026,
    bodyStyle: 'Super GT Coupe',
    drivetrain: 'RWD',
    mileage: '290 mi',
    horsepower: '759 hp',
    acceleration: '3.2s 0–60 mph',
    transmission: '8-Speed Calibration',
    exteriorTone: 'Xenon Satin Grey',
    price: 249000,
    originalPrice: 262000,
    savingsNote: 'Arrived Today',
    image: '/src/assets/images/hero_special_offers_coupe_1794408228116.jpg',
    imagePosition: 'object-[70%_58%]',
    summary:
      'Final-edition collector specification with exposed 2x2 twill carbon roof panel and 21-inch multi-spoke forged satin black wheels.',
    vinCode: 'MN-DBS770-0402',
  },
  {
    id: 'latest-3',
    section: 'latest-deals',
    title: '750S Coupe Track Pack Carbon',
    year: 2026,
    bodyStyle: 'Lightweight Supercar',
    drivetrain: 'RWD',
    mileage: '410 mi',
    horsepower: '740 hp',
    acceleration: '2.7s 0–60 mph',
    transmission: '7-Speed SSG',
    exteriorTone: 'Blade Silver',
    price: 232000,
    originalPrice: 244000,
    savingsNote: 'New Arrival',
    image: '/src/assets/images/vehicle_gt_supercar_mono_1794408233806.jpg',
    imagePosition: 'object-[58%_52%]',
    summary:
      'Proactive Chassis Control III, ultra-lightweight carbon racing buckets, and electrochromic glass roof panel.',
    vinCode: 'MN-750S-0819',
  },
  {
    id: 'latest-4',
    section: 'latest-deals',
    title: 'SQ8 e-tron Tri-Motor Edition One',
    year: 2026,
    bodyStyle: 'Flagship Electric SUV',
    drivetrain: 'Tri-Motor Torque Vectoring',
    mileage: '680 mi',
    horsepower: '496 hp',
    acceleration: '4.2s 0–60 mph',
    transmission: 'Tri-Motor Direct',
    exteriorTone: 'Suzuka Grey Metallic',
    price: 88900,
    originalPrice: 94500,
    savingsNote: 'Just Cataloged',
    image: '/src/assets/images/hero_general_promos_suv_1794408232118.jpg',
    imagePosition: 'object-[25%_65%]',
    summary:
      'Twin rear electric motors with active torque vectoring, flared wheel arches, and Valcona leather contour seats with massage.',
    vinCode: 'MN-SQ8-1129',
  },
];

export const TRUST_BADGES: TrustBadge[] = [
  {
    id: 'verified-vehicles',
    title: 'Verified Vehicles',
    subtitle:
      'Every vehicle undergoes a rigorous 160-point mechanical, structural, and digital diagnostics audit with full provenance documentation.',
    metric: '160-Point Inspection · Clean Title Guarantee',
  },
  {
    id: 'secure-payments',
    title: 'Secure Payments',
    subtitle:
      'Bank-grade escrow settlement, instant wire verification, and transparent zero-hidden-fee financing contracts backed by tier-one lenders.',
    metric: '256-Bit Escrow · 7-Day Money-Back Protection',
  },
  {
    id: 'support-24-7',
    title: '24/7 Support',
    subtitle:
      'Dedicated automotive concierge specialists available around the clock for live video walkarounds, logistics tracking, and roadside assistance.',
    metric: 'Under 3 Min Response · Nationwide Concierge',
  },
];

export function getNextSlideIndex(current: number, total: number): number {
  if (total <= 0) return 0;
  return (current + 1) % total;
}

export function getPrevSlideIndex(current: number, total: number): number {
  if (total <= 0) return 0;
  return (current - 1 + total) % total;
}

export function getVehiclesBySection(section: VehicleSection): Vehicle[] {
  return VEHICLES.filter((v) => v.section === section);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function toggleWishlistId(currentIds: string[], vehicleId: string): string[] {
  if (currentIds.includes(vehicleId)) {
    return currentIds.filter((id) => id !== vehicleId);
  }
  return [...currentIds, vehicleId];
}

export function validateReservationForm(input: {
  fullName: string;
  email: string;
  phone: string;
}): { valid: boolean; error?: string } {
  const name = input.fullName.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();

  if (name.length < 2) {
    return { valid: false, error: 'Please enter your full name.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  if (phone.replace(/\D/g, '').length < 7) {
    return { valid: false, error: 'Please enter a valid 7+ digit phone number.' };
  }
  return { valid: true };
}
