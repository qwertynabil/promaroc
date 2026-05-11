'use client';

import { useState } from 'react';
import { Calendar, Users } from 'lucide-react';

type BookingWidgetProps = {
  pricePerNight: number;
  maxGuests: number;
};

export default function BookingWidget({ pricePerNight, maxGuests }: BookingWidgetProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl sticky top-28">
      
      {/* Price Header */}
      <div className="flex items-end gap-2 mb-6 border-b border-black/5 dark:border-white/5 pb-6">
        <span className="text-4xl font-sora font-bold text-promaroc-black dark:text-promaroc-white">
          ${pricePerNight}
        </span>
        <span className="text-black/50 dark:text-white/50 mb-1 font-medium">/ night</span>
      </div>

      {/* Inputs (Visual Placeholders for now) */}
      <div className="border border-black/10 dark:border-white/10 rounded-2xl mb-6 overflow-hidden bg-black/5 dark:bg-white/5">
        <div className="flex border-b border-black/10 dark:border-white/10">
          <div className="flex-1 p-3 border-r border-black/10 dark:border-white/10">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-1">Check-In</label>
            <div className="flex items-center gap-2 text-sm font-medium text-black/80 dark:text-white/80">
              <Calendar className="w-4 h-4" /> Add Date
            </div>
          </div>
          <div className="flex-1 p-3">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-1">Check-Out</label>
            <div className="flex items-center gap-2 text-sm font-medium text-black/80 dark:text-white/80">
              <Calendar className="w-4 h-4" /> Add Date
            </div>
          </div>
        </div>
        <div className="p-3">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-1">Guests</label>
          <div className="flex items-center gap-2 text-sm font-medium text-black/80 dark:text-white/80">
            <Users className="w-4 h-4" /> 1 Guest (Max {maxGuests})
          </div>
        </div>
      </div>

      {/* Book Button */}
      <button 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full bg-promaroc-green text-promaroc-white py-4 rounded-xl font-bold text-lg hover:bg-[#0a2e29] transition-all duration-300 shadow-lg shadow-promaroc-green/20 relative overflow-hidden"
      >
        <span className="relative z-10">Reserve Now</span>
        {/* Subtle shine effect on hover */}
        <div className={`absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 ease-out ${isHovered ? 'translate-y-0' : ''}`} />
      </button>

      <p className="text-center text-xs text-black/40 dark:text-white/40 mt-4">
        You won't be charged yet
      </p>
    </div>
  );
}