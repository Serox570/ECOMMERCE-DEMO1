/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Lock, Headphones } from 'lucide-react';
import {
  VEHICLES,
  TRUST_BADGES,
  Vehicle,
  getVehiclesBySection,
  toggleWishlistId,
} from './data/vehicles';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { VehicleCard } from './components/VehicleCard';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import {
  WishlistDrawer,
  ProfileDrawer,
  LegalModal,
  NotFoundView,
} from './components/Drawers';
import { Footer } from './components/Footer';

export default function App() {
  const [activeNav, setActiveNav] = useState<'home' | 'vehicles' | 'about'>('home');
  const [show404Demo, setShow404Demo] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['top-1']);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [legalDoc, setLegalDoc] = useState<'terms' | 'privacy' | null>(null);
  const [reservations, setReservations] = useState<
    Array<{
      vehicle: Vehicle;
      fullName: string;
      email: string;
      phone: string;
      referenceCode: string;
    }>
  >([]);

  const topDeals = getVehiclesBySection('top-deals');
  const cheapDeals = getVehiclesBySection('cheap-deals');
  const latestDeals = getVehiclesBySection('latest-deals');

  const wishlistedVehicles = VEHICLES.filter((v) => wishlistIds.includes(v.id));

  const handleToggleWishlist = (vehicleId: string) => {
    setWishlistIds((prev) => toggleWishlistId(prev, vehicleId));
  };

  const scrollToSection = (sectionId: string) => {
    setShow404Demo(false);
    window.requestAnimationFrame(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  const handleNavigate = (target: 'home' | 'vehicles' | 'about') => {
    setActiveNav(target);
    if (target === 'home') {
      scrollToSection('top');
    } else if (target === 'vehicles') {
      scrollToSection('latest-deals');
    } else if (target === 'about') {
      scrollToSection('about-us');
    }
  };

  const scrollHorizontalMenu = (containerId: string, direction: 'left' | 'right') => {
    const container = document.querySelector(`[data-testid="${containerId}"]`);
    if (container) {
      const scrollAmount = direction === 'left' ? -310 : 310;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getBadgeIcon = (badgeId: string) => {
    switch (badgeId) {
      case 'verified-vehicles':
        return <ShieldCheck className="w-6 h-6 text-zinc-950" strokeWidth={1.75} />;
      case 'secure-payments':
        return <Lock className="w-6 h-6 text-zinc-950" strokeWidth={1.75} />;
      default:
        return <Headphones className="w-6 h-6 text-zinc-950" strokeWidth={1.75} />;
    }
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-white text-zinc-950">
      {/* Sticky Top Header */}
      <Header
        wishlistCount={wishlistIds.length}
        activeNav={activeNav}
        onNavigate={handleNavigate}
        onOpenWishlist={() => setWishlistDrawerOpen(true)}
        onOpenProfile={() => setProfileDrawerOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {show404Demo ? (
          <NotFoundView
            onReturnHome={() => {
              setShow404Demo(false);
              setActiveNav('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <>
            {/* Hero Banner Carousel (Auto-slides every 3 seconds) */}
            <HeroCarousel
              onShopNow={(targetSectionId) => {
                setActiveNav('vehicles');
                scrollToSection(targetSectionId);
              }}
            />

            {/* Section 1: Latest Deals (Horizontal side-scroll on mobile, 4-column grid on desktop) */}
            <section
              id="latest-deals"
              aria-labelledby="heading-latest-deals"
              className="scroll-mt-16 py-14 sm:py-20 bg-white border-b border-zinc-200/70"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
                  <div className="space-y-1.5">
                    <p className="text-xs font-mono-tabular text-zinc-500">
                      01 · 2026 Delivery-Mileage Allocations
                    </p>
                    <h2
                      id="heading-latest-deals"
                      className="text-2xl sm:text-3xl font-bold text-zinc-950 font-display tracking-tight"
                    >
                      Latest Deals
                    </h2>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <p className="text-sm text-zinc-600 max-w-md">
                      Newly cataloged collector specifications and high-output electric flagships available for immediate private viewing.
                    </p>
                    <div className="lg:hidden flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => scrollHorizontalMenu('latest-deals-grid', 'left')}
                        aria-label="Scroll Latest Deals left"
                        className="w-8 h-8 rounded-lg border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 flex items-center justify-center text-xs font-mono-tabular"
                      >
                        &larr;
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollHorizontalMenu('latest-deals-grid', 'right')}
                        aria-label="Scroll Latest Deals right"
                        className="w-8 h-8 rounded-lg border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 flex items-center justify-center text-xs font-mono-tabular"
                      >
                        &rarr;
                      </button>
                    </div>
                  </div>
                </div>

                {/* Horizontal side-scroll on mobile/tablet, 4-column grid on desktop */}
                <div
                  data-testid="latest-deals-grid"
                  className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pb-0 no-scrollbar"
                >
                  {latestDeals.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="w-[82vw] max-w-[310px] sm:w-[300px] lg:w-auto lg:max-w-none shrink-0 snap-start"
                    >
                      <VehicleCard
                        vehicle={vehicle}
                        isWishlisted={wishlistIds.includes(vehicle.id)}
                        onToggleWishlist={handleToggleWishlist}
                        onViewDetails={setSelectedVehicle}
                        surfaceVariant="white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 2: Top Deals (Horizontal side-scroll on mobile, 4-column grid on desktop) */}
            <section
              id="top-deals"
              aria-labelledby="heading-top-deals"
              className="scroll-mt-16 py-14 sm:py-20 bg-white"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
                  <div className="space-y-1.5">
                    <p className="text-xs font-mono-tabular text-zinc-500">
                      02 · Curated Showroom Selection
                    </p>
                    <h2
                      id="heading-top-deals"
                      className="text-2xl sm:text-3xl font-bold text-zinc-950 font-display tracking-tight"
                    >
                      Top Deals
                    </h2>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <p className="text-sm text-zinc-600 max-w-md">
                      Executive grand tourers and flagship electric saloons with immediate factory-backed incentives.
                    </p>
                    <div className="lg:hidden flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => scrollHorizontalMenu('top-deals-grid', 'left')}
                        aria-label="Scroll Top Deals left"
                        className="w-8 h-8 rounded-lg border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 flex items-center justify-center text-xs font-mono-tabular"
                      >
                        &larr;
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollHorizontalMenu('top-deals-grid', 'right')}
                        aria-label="Scroll Top Deals right"
                        className="w-8 h-8 rounded-lg border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 flex items-center justify-center text-xs font-mono-tabular"
                      >
                        &rarr;
                      </button>
                    </div>
                  </div>
                </div>

                {/* Horizontal side-scroll on mobile/tablet, 4-column grid on desktop */}
                <div
                  data-testid="top-deals-grid"
                  className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pb-0 no-scrollbar"
                >
                  {topDeals.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="w-[82vw] max-w-[310px] sm:w-[300px] lg:w-auto lg:max-w-none shrink-0 snap-start"
                    >
                      <VehicleCard
                        vehicle={vehicle}
                        isWishlisted={wishlistIds.includes(vehicle.id)}
                        onToggleWishlist={handleToggleWishlist}
                        onViewDetails={setSelectedVehicle}
                        surfaceVariant="white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 3: Cheap Deals (Visually distinct light grey background, horizontal side-scroll on mobile, 4-column grid on desktop) */}
            <section
              id="cheap-deals"
              aria-labelledby="heading-cheap-deals"
              className="scroll-mt-16 py-14 sm:py-20 bg-zinc-100 border-y border-zinc-200/80"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
                  <div className="space-y-1.5">
                    <p className="text-xs font-mono-tabular text-zinc-500">
                      03 · Accessible Urban Mobility · Under $25,000
                    </p>
                    <h2
                      id="heading-cheap-deals"
                      className="text-2xl sm:text-3xl font-bold text-zinc-950 font-display tracking-tight"
                    >
                      Cheap Deals
                    </h2>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <p className="text-sm text-zinc-600 max-w-md">
                      Single-owner compact hatchbacks, self-charging hybrids, and daily electric commuters audited to the same 160-point standard.
                    </p>
                    <div className="lg:hidden flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => scrollHorizontalMenu('cheap-deals-grid', 'left')}
                        aria-label="Scroll Cheap Deals left"
                        className="w-8 h-8 rounded-lg border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 flex items-center justify-center text-xs font-mono-tabular"
                      >
                        &larr;
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollHorizontalMenu('cheap-deals-grid', 'right')}
                        aria-label="Scroll Cheap Deals right"
                        className="w-8 h-8 rounded-lg border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 flex items-center justify-center text-xs font-mono-tabular"
                      >
                        &rarr;
                      </button>
                    </div>
                  </div>
                </div>

                {/* Horizontal side-scroll on mobile/tablet, 4-column grid on desktop */}
                <div
                  data-testid="cheap-deals-grid"
                  className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pb-0 no-scrollbar"
                >
                  {cheapDeals.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="w-[82vw] max-w-[310px] sm:w-[300px] lg:w-auto lg:max-w-none shrink-0 snap-start"
                    >
                      <VehicleCard
                        vehicle={vehicle}
                        isWishlisted={wishlistIds.includes(vehicle.id)}
                        onToggleWishlist={handleToggleWishlist}
                        onViewDetails={setSelectedVehicle}
                        surfaceVariant="grey"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Trust Badges / Value Proposition (3-Column Icon-and-Text Section Above Footer) */}
            <section
              id="about-us"
              aria-labelledby="heading-trust-badges"
              className="scroll-mt-16 py-16 sm:py-24 bg-zinc-50 border-t border-zinc-200"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mb-12 space-y-2">
                  <p className="text-xs font-mono-tabular text-zinc-500">
                    04 · About MONOLITH &amp; Client Guarantees
                  </p>
                  <h2
                    id="heading-trust-badges"
                    className="text-2xl sm:text-3xl font-bold text-zinc-950 font-display tracking-tight"
                  >
                    Engineered for Complete Transparency
                  </h2>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Every acquisition through MONOLITH AUTO is backed by independent mechanical verification, insured escrow settlement, and round-the-clock specialist support.
                  </p>
                </div>

                <div
                  data-testid="trust-badges-grid"
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
                >
                  {TRUST_BADGES.map((badge) => (
                    <div
                      key={badge.id}
                      className="p-6 sm:p-8 rounded-xl bg-white border border-zinc-200 flex flex-col justify-between space-y-6 transition-colors hover:border-zinc-900"
                    >
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                          {getBadgeIcon(badge.id)}
                        </div>
                        <h3 className="text-lg font-bold text-zinc-950 font-display tracking-tight">
                          {badge.title}
                        </h3>
                        <p className="text-sm text-zinc-600 leading-relaxed">
                          {badge.subtitle}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-zinc-100 text-xs font-mono-tabular text-zinc-500">
                        {badge.metric}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Dark Grey / Black Footer */}
      <Footer
        onOpenLegal={(doc) => setLegalDoc(doc)}
        onTrigger404={() => {
          setShow404Demo(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateHome={() => handleNavigate('home')}
      />

      {/* Vehicle Detail & Reservation Modal */}
      <VehicleDetailModal
        vehicle={selectedVehicle}
        isWishlisted={
          selectedVehicle ? wishlistIds.includes(selectedVehicle.id) : false
        }
        onClose={() => setSelectedVehicle(null)}
        onToggleWishlist={handleToggleWishlist}
        onReserveSuccess={(newRes) => {
          setReservations((prev) => [newRes, ...prev]);
        }}
      />

      {/* Saved Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistDrawerOpen}
        wishlistedVehicles={wishlistedVehicles}
        onClose={() => setWishlistDrawerOpen(false)}
        onRemove={handleToggleWishlist}
        onSelectVehicle={(v) => setSelectedVehicle(v)}
      />

      {/* User Profile Drawer */}
      <ProfileDrawer
        isOpen={profileDrawerOpen}
        reservations={reservations}
        wishlistCount={wishlistIds.length}
        onClose={() => setProfileDrawerOpen(false)}
      />

      {/* Terms & Conditions / Privacy Policy Modal */}
      <LegalModal activeDoc={legalDoc} onClose={() => setLegalDoc(null)} />
    </div>
  );
}
