import React, { useState } from 'react';
import { Heart, User, Menu, X } from 'lucide-react';

interface HeaderProps {
  wishlistCount: number;
  activeNav: 'home' | 'vehicles' | 'about';
  onNavigate: (target: 'home' | 'vehicles' | 'about') => void;
  onOpenWishlist: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  wishlistCount,
  activeNav,
  onNavigate,
  onOpenWishlist,
  onOpenProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (target: 'home' | 'vehicles' | 'about') => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Site Logo (Left) */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="text-xl font-bold tracking-tight text-zinc-950 font-display whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
        >
          MONOLITH AUTO
        </a>

        {/* Zone 2: Main Navigation Links (Center) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600"
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
              activeNav === 'home'
                ? 'text-zinc-950 border-zinc-950 font-semibold'
                : 'border-transparent hover:text-zinc-950 hover:border-zinc-400'
            }`}
          >
            Home
          </a>
          <a
            href="#latest-deals"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('vehicles');
            }}
            className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
              activeNav === 'vehicles'
                ? 'text-zinc-950 border-zinc-950 font-semibold'
                : 'border-transparent hover:text-zinc-950 hover:border-zinc-400'
            }`}
          >
            Vehicles
          </a>
          <a
            href="#about-us"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('about');
            }}
            className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
              activeNav === 'about'
                ? 'text-zinc-950 border-zinc-950 font-semibold'
                : 'border-transparent hover:text-zinc-950 hover:border-zinc-400'
            }`}
          >
            About Us
          </a>
        </nav>

        {/* Zone 3: Wishlist & User Profile Icons (Right) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenWishlist}
            aria-label={`Wishlist (${wishlistCount} saved vehicles)`}
            className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg text-zinc-800 hover:text-zinc-950 hover:bg-zinc-100 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
          >
            <Heart className="w-5 h-5" strokeWidth={1.75} />
            {wishlistCount > 0 && (
              <span
                data-testid="wishlist-count"
                className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-zinc-950 text-white text-[11px] font-mono-tabular font-semibold flex items-center justify-center"
              >
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenProfile}
            aria-label="User Profile"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-zinc-800 hover:text-zinc-950 hover:bg-zinc-100 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
          >
            <User className="w-5 h-5" strokeWidth={1.75} />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-zinc-800 hover:text-zinc-950 hover:bg-zinc-100 transition-colors duration-150"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden bg-white border-b border-zinc-200 px-4 pt-2 pb-4 space-y-1"
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-zinc-950 hover:bg-zinc-100 transition-colors"
          >
            Home
          </a>
          <a
            href="#latest-deals"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('vehicles');
            }}
            className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-zinc-950 hover:bg-zinc-100 transition-colors"
          >
            Vehicles
          </a>
          <a
            href="#about-us"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('about');
            }}
            className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-zinc-950 hover:bg-zinc-100 transition-colors"
          >
            About Us
          </a>
        </nav>
      )}
    </header>
  );
};
