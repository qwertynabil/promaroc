'use client';

import { motion } from 'framer-motion';

const PLATFORMS = ['Booking.com', 'Airbnb', 'Expedia', 'Agoda', 'TripAdvisor', 'Viator'];

export default function TrustBar() {
  return (
    <section className="bg-promaroc-black border-t border-promaroc-white/10 py-10 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <p className="text-promaroc-white/50 text-sm font-medium tracking-widest uppercase mb-8">
          Optimising presence across global platforms
        </p>
        
        {/* Simple flex layout for desktop, scrolling/wrapping on mobile */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
          {PLATFORMS.map((platform, index) => (
            <motion.div
              key={platform}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="text-xl md:text-2xl font-sora font-bold text-promaroc-white/80 hover:text-promaroc-white transition-colors cursor-default"
            >
              {platform}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}