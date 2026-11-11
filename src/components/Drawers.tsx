import React from 'react';
import { X, Trash2, ArrowUpRight, UserCheck, Compass, ArrowLeft } from 'lucide-react';
import { Vehicle, formatCurrency } from '../data/vehicles';

interface WishlistDrawerProps {
  isOpen: boolean;
  wishlistedVehicles: Vehicle[];
  onClose: () => void;
  onRemove: (vehicleId: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  wishlistedVehicles,
  onClose,
  onRemove,
  onSelectVehicle,
}) => {
  if (!isOpen) return null;

  const totalValue = wishlistedVehicles.reduce((acc, v) => acc + v.price, 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Saved Wishlist"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs"
    >
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-zinc-200 flex flex-col justify-between">
        <div className="px-6 py-5 border-b border-zinc-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-zinc-950 font-display">
              Saved Wishlist
            </h2>
            <p className="text-xs text-zinc-500 font-mono-tabular">
              {wishlistedVehicles.length}{' '}
              {wishlistedVehicles.length === 1 ? 'vehicle' : 'vehicles'} curated
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close wishlist drawer"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistedVehicles.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
              <p className="text-sm font-semibold text-zinc-900">
                Your Wishlist is Empty
              </p>
              <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                Select the heart icon on any vehicle across Top Deals, Cheap Deals, or Latest Deals to compare specifications here.
              </p>
            </div>
          ) : (
            wishlistedVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50/60 flex items-center gap-4"
              >
                <img
                  src={vehicle.image}
                  alt={vehicle.title}
                  referrerPolicy="no-referrer"
                  className="w-20 h-16 rounded-lg object-cover grayscale shrink-0 bg-zinc-900"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-zinc-500 font-mono-tabular">
                    {vehicle.year} · {vehicle.bodyStyle}
                  </p>
                  <h3 className="text-sm font-semibold text-zinc-950 truncate">
                    {vehicle.title}
                  </h3>
                  <p className="text-sm font-bold text-zinc-950 font-mono-tabular mt-0.5">
                    {formatCurrency(vehicle.price)}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectVehicle(vehicle);
                    }}
                    aria-label={`Inspect ${vehicle.title}`}
                    className="p-2 rounded-lg bg-zinc-950 text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemove(vehicle.id)}
                    aria-label={`Remove ${vehicle.title} from wishlist`}
                    className="p-2 rounded-lg border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-zinc-200 bg-zinc-50 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600">Combined Fleet Value</span>
            <span className="font-bold text-zinc-950 font-mono-tabular">
              {formatCurrency(totalValue)}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 px-4 rounded-lg bg-zinc-950 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Continue Browsing Showroom
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProfileDrawerProps {
  isOpen: boolean;
  reservations: Array<{
    vehicle: Vehicle;
    fullName: string;
    email: string;
    phone: string;
    referenceCode: string;
  }>;
  wishlistCount: number;
  onClose: () => void;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  reservations,
  wishlistCount,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="User Profile"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs"
    >
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-zinc-200 flex flex-col justify-between">
        <div className="px-6 py-5 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-950 text-white flex items-center justify-center font-display font-bold text-sm">
              AM
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-950 font-display">
                Alex Mercer
              </h2>
              <p className="text-xs text-zinc-500">
                Monolith Private Client · Tier I Verified
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close user profile"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50">
              <span className="text-xs text-zinc-500 block">Saved Wishlist</span>
              <span className="text-xl font-bold text-zinc-950 font-mono-tabular mt-1 block">
                {wishlistCount}
              </span>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50">
              <span className="text-xs text-zinc-500 block">Active Holds</span>
              <span className="text-xl font-bold text-zinc-950 font-mono-tabular mt-1 block">
                {reservations.length}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-zinc-500 tracking-wide uppercase">
              Active Allocation Holds
            </h3>
            {reservations.length === 0 ? (
              <p className="text-xs text-zinc-500 py-4 border border-dashed border-zinc-200 rounded-xl text-center">
                No active vehicle holds yet. Click &ldquo;View Details&rdquo; on any vehicle to request a 48-hour showroom hold.
              </p>
            ) : (
              reservations.map((res) => (
                <div
                  key={res.referenceCode}
                  className="p-4 rounded-xl border border-zinc-200 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs text-zinc-500 font-mono-tabular">
                    <span>{res.referenceCode}</span>
                    <span>48h Hold Active</span>
                  </div>
                  <p className="text-sm font-semibold text-zinc-950">
                    {res.vehicle.title}
                  </p>
                  <p className="text-xs text-zinc-600 font-mono-tabular">
                    {formatCurrency(res.vehicle.price)} · Reserved for {res.fullName}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 text-white space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <UserCheck className="w-4 h-4" />
              <span>Dedicated Showroom Concierge</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Your pre-approved financing line up to $250,000 is active for immediate wire or escrow settlement.
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-zinc-200 bg-zinc-50">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 px-4 rounded-lg bg-zinc-950 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

interface LegalModalProps {
  activeDoc: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ activeDoc, onClose }) => {
  if (!activeDoc) return null;

  const isTerms = activeDoc === 'terms';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
    >
      <div className="w-full max-w-2xl bg-white border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <h2
            id="legal-modal-title"
            className="text-lg font-bold text-zinc-950 font-display"
          >
            {isTerms ? 'Terms & Conditions' : 'Privacy Policy'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close legal document"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-4 text-sm text-zinc-600 leading-relaxed">
          {isTerms ? (
            <>
              <p className="font-semibold text-zinc-950">
                1. Showroom Allocation & Pricing Integrity
              </p>
              <p>
                All vehicles listed on MONOLITH AUTO are subject to prior sale or active 48-hour client reservation holds. Displayed prices include the 160-point mechanical certification and exclude local state registration and title transfer fees.
              </p>
              <p className="font-semibold text-zinc-950">
                2. 7-Day / 300-Mile Return Guarantee
              </p>
              <p>
                Every delivered vehicle includes a 7-calendar-day or 300-mile inspection window. If the vehicle does not match its published inspection report, MONOLITH AUTO will arrange complimentary return transport and full escrow refund.
              </p>
              <p className="font-semibold text-zinc-950">
                3. Escrow & Payment Settlement
              </p>
              <p>
                Transactions are settled via insured wire transfer, verified cashier&rsquo;s check, or approved prime automotive financing partners.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-zinc-950">
                1. Zero-Third-Party Data Brokerage
              </p>
              <p>
                MONOLITH AUTO collects only the contact and financing telemetry strictly required to execute vehicle reservations, test-drive scheduling, and title transfer documentation.
              </p>
              <p className="font-semibold text-zinc-950">
                2. Encrypted Escrow Records
              </p>
              <p>
                Client identity verification and banking instructions are protected with 256-bit TLS encryption and purged upon completion of statutory retention periods.
              </p>
            </>
          )}
        </div>

        <div className="px-6 py-4 border-t border-zinc-200 bg-zinc-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-zinc-950 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface NotFoundViewProps {
  onReturnHome: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onReturnHome }) => {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="min-h-[72vh] bg-zinc-950 text-white flex items-center justify-center px-4 py-20"
    >
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200">
          <Compass className="w-7 h-7" strokeWidth={1.5} />
        </div>

        <p className="text-xs font-mono-tabular text-zinc-400 tracking-widest uppercase">
          HTTP 404 · Route Not Cataloged
        </p>

        <h1
          id="not-found-heading"
          className="text-4xl sm:text-5xl font-bold font-display tracking-tight text-white"
        >
          404 Page Not Found
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-md mx-auto">
          The requested vehiclebay or telemetry endpoint does not exist in the MONOLITH showroom directory. It may have been acquired or relocated.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onReturnHome}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-zinc-950 text-sm font-semibold hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Showroom</span>
          </button>
        </div>
      </div>
    </section>
  );
};
