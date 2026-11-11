import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { HERO_SLIDES, getNextSlideIndex, getPrevSlideIndex } from '../data/vehicles';

interface HeroCarouselProps {
  onShopNow: (targetSectionId: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onShopNow }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Auto-slide every 3 seconds (3000ms)
  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => getNextSlideIndex(prev, HERO_SLIDES.length));
    }, 3000);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const activeSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured Automotive Promotions"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[460px] sm:h-[520px] lg:h-[600px] bg-zinc-950 overflow-hidden select-none"
    >
      {/* Slides */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentIndex;
        const hasError = imageErrors[slide.id];

        return (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${HERO_SLIDES.length}: ${slide.title}`}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image or Resilient Monochromatic Fallback */}
            {!hasError ? (
              <img
                src={slide.image}
                alt={slide.title}
                referrerPolicy="no-referrer"
                onError={() =>
                  setImageErrors((prev) => ({ ...prev, [slide.id]: true }))
                }
                className={`absolute inset-0 w-full h-full object-cover ${slide.imagePosition} grayscale contrast-110 transition-transform duration-1000 ease-out ${
                  isActive ? 'scale-100' : 'scale-105'
                }`}
              />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex items-center justify-center">
                <div className="text-zinc-700 font-display text-4xl font-bold tracking-tight">
                  {slide.title}
                </div>
              </div>
            )}

            {/* Measured Contrast Scrims for 4.5:1+ Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

            {/* Slide Content Overlay */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pb-8">
              <div className="max-w-2xl space-y-4 sm:space-y-5">
                <p className="text-xs sm:text-sm font-medium text-zinc-300 tracking-wide">
                  {slide.kicker}
                </p>

                <h1
                  className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight font-display leading-[1.08]"
                  style={{ textWrap: 'balance' }}
                >
                  {slide.title}
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-zinc-200 leading-relaxed max-w-xl">
                  {slide.subtitle}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => onShopNow(slide.targetSectionId)}
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-white text-zinc-950 text-sm font-semibold tracking-tight hover:bg-zinc-200 active:scale-[0.99] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
                  >
                    <span>{slide.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <span className="text-xs sm:text-sm text-zinc-300 font-mono-tabular">
                    {slide.metricLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Bottom Controls Bar: Slide Indicators & Prev/Next Buttons */}
      <div className="absolute bottom-6 inset-x-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Slide Indicators */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Select promotional slide">
          {HERO_SLIDES.map((slide, idx) => {
            const active = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Show slide ${idx + 1}: ${slide.title}`}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  active ? 'w-10 bg-white' : 'w-4 bg-white/40 hover:bg-white/70'
                }`}
              />
            );
          })}
          <span className="ml-3 text-xs font-mono-tabular text-zinc-300 hidden sm:inline">
            0{currentIndex + 1} / 0{HERO_SLIDES.length} · {activeSlide.title}
          </span>
        </div>

        {/* Manual Prev / Next Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() =>
              setCurrentIndex((prev) => getPrevSlideIndex(prev, HERO_SLIDES.length))
            }
            className="w-10 h-10 rounded-lg border border-white/25 bg-black/50 text-white hover:bg-white hover:text-zinc-950 transition-colors duration-150 flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() =>
              setCurrentIndex((prev) => getNextSlideIndex(prev, HERO_SLIDES.length))
            }
            className="w-10 h-10 rounded-lg border border-white/25 bg-black/50 text-white hover:bg-white hover:text-zinc-950 transition-colors duration-150 flex items-center justify-center cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
