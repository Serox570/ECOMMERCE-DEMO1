import React, { useState } from 'react';
import { X, Heart, CheckCircle2, ShieldCheck } from 'lucide-react';
import {
  Vehicle,
  formatCurrency,
  validateReservationForm,
} from '../data/vehicles';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (vehicleId: string) => void;
  onReserveSuccess: (reservation: {
    vehicle: Vehicle;
    fullName: string;
    email: string;
    phone: string;
    referenceCode: string;
  }) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onReserveSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  if (!vehicle) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateReservationForm({ fullName, email, phone });
    if (!validation.valid) {
      setErrorMsg(validation.error || 'Please check your input.');
      return;
    }
    setErrorMsg(null);
    const refCode = `RES-${vehicle.vinCode.slice(-4)}-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedRef(refCode);
    onReserveSuccess({
      vehicle,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      referenceCode: refCode,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="vehicle-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-white border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Top Close Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-zinc-50">
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-zinc-500">
            <span>{vehicle.vinCode}</span>
            <span aria-hidden="true">·</span>
            <span>{vehicle.year} Model Year</span>
            <span aria-hidden="true">·</span>
            <span>160-Point Verified</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close vehicle details"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Split Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Image & Technical Specs */}
          <div className="lg:col-span-7 p-6 space-y-6 border-b lg:border-b-0 lg:border-r border-zinc-200">
            <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-900">
              <img
                src={vehicle.image}
                alt={vehicle.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover ${vehicle.imagePosition} grayscale contrast-110`}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <h2
                  id="vehicle-modal-title"
                  className="text-2xl font-bold text-zinc-950 font-display tracking-tight"
                >
                  {vehicle.title}
                </h2>
                <button
                  type="button"
                  onClick={() => onToggleWishlist(vehicle.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isWishlisted
                      ? 'bg-zinc-950 text-white border-zinc-950'
                      : 'bg-white text-zinc-800 border-zinc-300 hover:border-zinc-950'
                  }`}
                >
                  <Heart
                    className="w-3.5 h-3.5"
                    fill={isWishlisted ? 'currentColor' : 'none'}
                  />
                  <span>{isWishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
                </button>
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {vehicle.summary}
              </p>
            </div>

            {/* Technical Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-200 text-xs">
              <div>
                <span className="text-zinc-500 block">Powertrain Output</span>
                <span className="font-semibold text-zinc-950 font-mono-tabular mt-0.5 block">
                  {vehicle.horsepower}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">Acceleration</span>
                <span className="font-semibold text-zinc-950 font-mono-tabular mt-0.5 block">
                  {vehicle.acceleration}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">Drivetrain</span>
                <span className="font-semibold text-zinc-950 mt-0.5 block">
                  {vehicle.drivetrain}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">Transmission</span>
                <span className="font-semibold text-zinc-950 mt-0.5 block">
                  {vehicle.transmission}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">Odometer</span>
                <span className="font-semibold text-zinc-950 font-mono-tabular mt-0.5 block">
                  {vehicle.mileage}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">Exterior Finish</span>
                <span className="font-semibold text-zinc-950 mt-0.5 block">
                  {vehicle.exteriorTone}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase & Reservation Module */}
          <div className="lg:col-span-5 p-6 bg-zinc-50/70 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs text-zinc-500 font-medium">
                  Direct Showroom Price
                </span>
                <div className="mt-1 flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-zinc-950 font-mono-tabular">
                    {formatCurrency(vehicle.price)}
                  </span>
                  {vehicle.originalPrice && (
                    <span className="text-sm text-zinc-400 line-through font-mono-tabular">
                      {formatCurrency(vehicle.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-zinc-500">
                  Includes 160-point inspection certificate & 7-day return guarantee.
                </p>
              </div>

              {confirmedRef ? (
                <div className="p-5 rounded-xl bg-zinc-950 text-white space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                    <h3 className="text-sm font-semibold">
                      Allocation Hold Confirmed
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Your complimentary 48-hour showroom hold and private viewing request for the{' '}
                    <strong className="text-white">{vehicle.title}</strong> is registered under reference{' '}
                    <span className="font-mono-tabular text-white font-semibold">
                      {confirmedRef}
                    </span>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2.5 px-4 rounded-lg bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                  <h3 className="text-sm font-semibold text-zinc-950">
                    Request Private Viewing or Allocation Hold
                  </h3>

                  {errorMsg && (
                    <p
                      role="alert"
                      className="text-xs font-medium text-zinc-950 bg-zinc-200/80 px-3 py-2 rounded-lg"
                    >
                      {errorMsg}
                    </p>
                  )}

                  <div>
                    <label
                      htmlFor="res-fullname"
                      className="block text-xs font-medium text-zinc-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="res-fullname"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Alex Mercer"
                      className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="res-email"
                      className="block text-xs font-medium text-zinc-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      id="res-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@monolith.auto"
                      className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="res-phone"
                      className="block text-xs font-medium text-zinc-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      id="res-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 839-2001"
                      className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 px-4 rounded-lg bg-zinc-950 text-white text-xs font-semibold tracking-tight hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    Reserve 48-Hour Hold (No Obligation)
                  </button>
                </form>
              )}
            </div>

            <div className="pt-4 border-t border-zinc-200 flex items-center gap-2.5 text-xs text-zinc-500">
              <ShieldCheck className="w-4 h-4 text-zinc-800 shrink-0" />
              <span>
                Escrow-protected transaction · Free enclosed delivery over $50,000
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
