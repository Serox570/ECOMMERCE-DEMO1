import React from 'react';

interface FooterProps {
  onOpenLegal: (doc: 'terms' | 'privacy') => void;
  onTrigger404: () => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLegal,
  onTrigger404,
  onNavigateHome,
}) => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-zinc-800/80">
          <div className="space-y-2 max-w-md">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="text-xl font-bold tracking-tight text-white font-display inline-block"
            >
              MONOLITH AUTO
            </a>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Architectural automotive retail. Factory-verified grand tourers, electric flagships, and curated urban commuters in a transparent monochromatic showroom.
            </p>
          </div>

          {/* Footer Navigation Links: Terms & Conditions, Privacy Policy, 404 Page Not Found demo */}
          <nav
            aria-label="Footer Legal and Demo Links"
            className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm font-medium"
          >
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="text-zinc-300 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="text-zinc-300 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={onTrigger404}
              className="text-zinc-300 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer underline underline-offset-4 decoration-zinc-700 hover:decoration-white"
            >
              404 Page Not Found
            </button>
          </nav>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} MONOLITH Automotive Group Inc. All rights reserved.
          </p>
          <p className="font-mono-tabular">
            Monochrome Edition · Direct-to-Client Showroom
          </p>
        </div>
      </div>
    </footer>
  );
};
