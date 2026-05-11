'use client';

import { motion } from 'framer-motion';

// Global OTA Platforms with public SVG logos
const PLATFORMS = [
  { name: 'Airbnb', url: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg', height: 'h-7 md:h-9' },
  { name: 'Booking.com', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Booking.com_Logo_2022.svg', height: 'h-5 md:h-7' },
  { name: 'Expedia', url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Expedia_logo.svg', height: 'h-6 md:h-7' },
  { name: 'Agoda', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Agoda_logo.svg', height: 'h-6 md:h-8' },
  { name: 'TripAdvisor', url: 'https://upload.wikimedia.org/wikipedia/commons/0/02/TripAdvisor_Logo.svg', height: 'h-7 md:h-8' },
  { name: 'Viator', url: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Viator_logo.svg', height: 'h-4 md:h-5' },
];

export default function TrustBar() {
  // Duplicate the array to create a seamless infinite loop effect
  const duplicatedPlatforms = [...PLATFORMS, ...PLATFORMS];

  return (
    <section className="bg-promaroc-black border-y border-promaroc-white/10 py-10 overflow-hidden relative">
      <div className="container mx-auto px-6 text-center mb-10">
        <p className="text-promaroc-white/50 text-xs md:text-sm font-medium tracking-widest uppercase">
          Optimising presence across global platforms
        </p>
      </div>
        
      {/* Gradient Masks for smooth fading on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-promaroc-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-promaroc-black to-transparent z-10 pointer-events-none" />

      <div className="w-full inline-flex flex-nowrap overflow-hidden">
        <motion.div
          className="flex items-center justify-start gap-16 md:gap-24 w-max pr-16 md:pr-24"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {duplicatedPlatforms.map((platform, index) => (
            <img 
              key={`${platform.name}-${index}`}
              src={platform.url} 
              alt={platform.name} 
              title={platform.name}
              className={`${platform.height} w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-300`} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}