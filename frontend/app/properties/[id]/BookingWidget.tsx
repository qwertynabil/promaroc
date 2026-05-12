'use client';

import { useState } from 'react';
import { createBooking } from '@/app/actions/bookingActions';
import { Calendar, Users, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

type BookingWidgetProps = {
  propertyId: string; // NEW PROP
  pricePerNight: number;
  maxGuests: number;
};

export default function BookingWidget({ propertyId, pricePerNight, maxGuests }: BookingWidgetProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestsCount, setGuestsCount] = useState(1);

  // Dynamic Math for the UI Breakdown
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  const nights = diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;

  const nightlyTotal = nights * pricePerNight;
  const cleaningFee = nights > 0 ? 50 : 0;
  const serviceFee = nights > 0 ? Math.round(nightlyTotal * 0.10) : 0;
  const grandTotal = nightlyTotal + cleaningFee + serviceFee;

  // Get today's date in local YYYY-MM-DD format to prevent UTC time-travel bugs
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const today = new Date(now.getTime() - offset).toISOString().split('T')[0];

  const handleSubmit = async (formData: FormData) => {
    if (nights <= 0) {
      setError("Please select valid dates.");
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      await createBooking(formData);
    } catch (err: any) {
      if (err?.message === 'NEXT_REDIRECT' || err?.digest?.startsWith('NEXT_REDIRECT')) {
        throw err;
      }
      if (err?.message === 'AUTH_REQUIRED') {
        router.push('/login');
        return;
      }
      setError(err.message || "Something went wrong.");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl sticky top-28">
      
      {/* Price Header */}
      <div className="flex items-end gap-2 mb-6 border-b border-black/5 dark:border-white/5 pb-6">
        <span className="text-4xl font-sora font-bold text-promaroc-black dark:text-promaroc-white">
          ${pricePerNight}
        </span>
        <span className="text-black/50 dark:text-white/50 mb-1 font-medium">/ night</span>
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-500 text-sm font-bold px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      <form action={handleSubmit}>
        {/* Hidden inputs to pass data to Server Action */}
        <input type="hidden" name="propertyId" value={propertyId} />

        {/* Inputs */}
        <div className="border border-black/10 dark:border-white/10 rounded-2xl mb-6 overflow-hidden bg-black/5 dark:bg-white/5">
          <div className="flex border-b border-black/10 dark:border-white/10">
            
            {/* Check-In */}
            <div className="flex-1 p-3 border-r border-black/10 dark:border-white/10 relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-1">Check-In</label>
              <input 
                required 
                type="date" 
                name="checkIn"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-black/80 dark:text-white/80 outline-none cursor-pointer"
              />
            </div>

            {/* Check-Out */}
            <div className="flex-1 p-3 relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-1">Check-Out</label>
              <input 
                required 
                type="date" 
                name="checkOut"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-black/80 dark:text-white/80 outline-none cursor-pointer"
              />
            </div>
          </div>
          
          {/* Guests */}
          <div className="p-3">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-1">Guests</label>
            <select 
              name="guestsCount" 
              value={guestsCount}
              onChange={(e) => setGuestsCount(parseInt(e.target.value))}
              className="w-full bg-transparent text-sm font-medium text-black/80 dark:text-white/80 outline-none cursor-pointer appearance-none"
            >
              {Array.from({ length: maxGuests }).map((_, i) => (
                <option key={i} value={i + 1} className="text-black">
                  {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic Pricing Breakdown (Only shows if valid dates are selected) */}
        {nights > 0 && (
          <div className="space-y-3 mb-6 text-sm font-medium text-black/70 dark:text-white/70 px-2 animate-in fade-in duration-300">
            <div className="flex justify-between">
              <span>${pricePerNight} x {nights} nights</span>
              <span>${nightlyTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="underline decoration-black/20 dark:decoration-white/20 underline-offset-4">Cleaning fee</span>
              <span>${cleaningFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="underline decoration-black/20 dark:decoration-white/20 underline-offset-4">Promaroc service fee</span>
              <span>${serviceFee}</span>
            </div>
            <div className="border-t border-black/10 dark:border-white/10 pt-4 mt-4 flex justify-between font-bold text-lg text-promaroc-black dark:text-promaroc-white">
              <span>Total</span>
              <span>${grandTotal}</span>
            </div>
          </div>
        )}

        {/* Book Button */}
        <button 
          type="submit"
          disabled={isLoading}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-full bg-promaroc-green text-promaroc-white py-4 rounded-xl font-bold text-lg hover:bg-[#0a2e29] transition-all duration-300 shadow-lg shadow-promaroc-green/20 relative overflow-hidden disabled:opacity-50"
        >
          <span className="relative z-10">{isLoading ? 'Securing Dates...' : 'Reserve Now'}</span>
          <div className={`absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 ease-out ${isHovered ? 'translate-y-0' : ''}`} />
        </button>

        {/* NEW: Contact Host Button */}
        <button 
          type="button"
          onClick={() => {
            // Directs the user to the inbox and passes the property ID so we know what they are asking about!
            router.push(`/dashboard/messages?new_chat=${propertyId}`);
          }}
          className="w-full mt-3 bg-transparent border-2 border-black/10 dark:border-white/10 text-promaroc-black dark:text-promaroc-white py-3.5 rounded-xl font-bold text-base hover:border-promaroc-green dark:hover:border-promaroc-green hover:text-promaroc-green transition-all duration-300"
        >
          Contact Host
        </button>
      </form>

      <p className="text-center text-xs font-medium text-black/40 dark:text-white/40 mt-4">
        You won't be charged yet
      </p>
    </div>
  );
}