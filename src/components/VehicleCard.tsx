import React, { useState } from 'react';
import { Heart, ArrowUpRight } from 'lucide-react';
import { Vehicle, formatCurrency } from '../data/vehicles';

interface VehicleCardProps {
  vehicle: Vehicle;
  isWishlisted: boolean;
  onToggleWishlist: (vehicleId: string) => void;
  onViewDetails: (vehicle: Vehicle) => void;
  surfaceVariant?: 'white' | 'grey';
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  isWishlisted,
  onToggleWishlist,
  onViewDetails,
  surfaceVariant = 'white',
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      className={`group relative flex flex-col rounded-xl border transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md ${
        surfaceVariant === 'white'
          ? 'bg-white border-zinc-200 hover:border-zinc-900'
          : 'bg-white border-zinc-200/90 hover:border-zinc-900'
      } overflow-hidden`}
    >
      {/* Image Container (4:3 aspect ratio) */}
      <div className="relative aspect-[4/3] w-full bg-zinc-900 overflow-hidden">
        {!imgError ? (
          <img
            src={vehicle.image}
            alt={vehicle.title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover ${vehicle.imagePosition} grayscale contrast-110 group-hover:scale-105 transition-transform duration-300 ease-out`}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 flex flex-col items-center justify-center p-4 text-center">
            <span className="text-xs font-mono-tabular text-zinc-400">
              {vehicle.vinCode}
            </span>
            <span className="mt-1 text-sm font-semibold text-zinc-200">
              {vehicle.title}
            </span>
          </div>
        )}

        {/* Subtle Dark Gradient Scrim at Top for Wishlist Button Contrast */}
        <div className="
          absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent pointer-events-none
        " />

        {/* Wishlist Toggle Icon Button */}
        <button
          type="button"
          onClick={() => onToggleWishlist(vehicle.id)}
          aria-label={
            isWishlisted
              ? `Remove ${vehicle.title} from wishlist`
              : `Add ${vehicle.title} to wishlist`
          }
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-150 cursor-pointer ${
            isWishlisted
              ? 'bg-zinc-950 text-white shadow-sm'
              : 'bg-white/90 text-zinc-900 hover:bg-white'
          }`}
        >
          <Heart
            className="w-4 h-4"
            fill={isWishlisted ? 'currentColor' : 'none'}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-1.5">
          {/* Unboxed Clean Metadata (Zero-Pill Discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
            <span className="font-mono-tabular">{vehicle.year}</span>
            <span aria-hidden="true">·</span>
            <span>{vehicle.bodyStyle}</span>
            <span aria-hidden="true">·</span>
            <span>{vehicle.mileage}</span>
          </div>

          {/* Vehicle Title */}
          <h3 className="text-base font-semibold text-zinc-950 tracking-tight leading-snug line-clamp-1">
            {vehicle.title}
          </h3>

          {/* Secondary Technical Specs */}
          <p className="text-xs text-zinc-500 line-clamp-1">
            {vehicle.horsepower} · {vehicle.drivetrain} · {vehicle.acceleration}
          </p>
        </div>

        {/* Price & View Details Action */}
        <div className="pt-3 border-t border-zinc-100 flex items-end justify-between gap-3">
          <div>
            <div className="text-lg font-bold text-zinc-950 font-mono-tabular leading-none">
              {formatCurrency(vehicle.price)}
            </div>
            {vehicle.originalPrice && (
              <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
                <span className="line-through font-mono-tabular">
                  {formatCurrency(vehicle.originalPrice)}
                </span>
                {vehicle.savingsNote && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-700 font-medium">
                      {vehicle.savingsNote}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => onViewDetails(vehicle)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-950 text-white text-xs font-semibold tracking-tight hover:bg-zinc-800 active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
