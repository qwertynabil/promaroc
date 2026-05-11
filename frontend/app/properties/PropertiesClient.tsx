'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MapPin, BedDouble, Bath, Users } from 'lucide-react';

// Define the Property type based on our Prisma schema
type Property = {
  id: string;
  title: string;
  propertyType: string;
  location: string;
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  heroImage: string | null;
  isManagedByPromaroc: boolean;
};

export default function PropertiesClient({ initialProperties }: { initialProperties: Property[] }) {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  // The categories we want to show on the filter bar
  const categories = ['ALL', 'RIAD', 'VILLA', 'APARTMENT'];

  // Filter the properties based on the selected tab
  const filteredProperties = initialProperties.filter((property) => {
    if (activeFilter === 'ALL') return true;
    return property.propertyType === activeFilter;
  });

  return (
    <div>
      {/* 1. Filter Tabs */}
      <div className="flex flex-wrap gap-2 md:gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeFilter === category
                ? 'bg-promaroc-green text-promaroc-white shadow-lg'
                : 'bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10'
            }`}
          >
            {category === 'ALL' ? 'All Properties' : category.charAt(0) + category.slice(1).toLowerCase() + 's'}
          </button>
        ))}
      </div>

      {/* 2. Properties Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProperties.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="col-span-full py-20 text-center text-black/50 dark:text-white/50"
            >
              No properties found in this category yet.
            </motion.div>
          ) : (
            filteredProperties.map((property) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={property.id}
              >
                <Link href={`/properties/${property.id}`} className="group block h-full">
                  <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                    
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-black/5 dark:bg-white/5">
                      {property.heroImage ? (
                        <img 
                          src={property.heroImage} 
                          alt={property.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-black/20 dark:text-white/20">
                          No Image
                        </div>
                      )}
                      
                      {/* Promaroc Premium Badge */}
                      {property.isManagedByPromaroc && (
                        <div className="absolute top-4 left-4 bg-promaroc-black/80 backdrop-blur-md text-promaroc-green text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                          Promaroc Managed
                        </div>
                      )}

                      {/* Price Tag */}
                      <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md text-promaroc-black dark:text-promaroc-white font-bold px-4 py-2 rounded-xl shadow-lg">
                        ${property.pricePerNight} <span className="text-xs font-normal opacity-70">/ night</span>
                      </div>
                    </div>

                    {/* Content Container */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-xs font-semibold text-promaroc-green mb-2 uppercase tracking-wider">
                        {property.propertyType}
                      </div>
                      
                      <h3 className="text-xl font-sora font-bold text-promaroc-black dark:text-promaroc-white mb-2 line-clamp-1 group-hover:text-promaroc-green transition-colors">
                        {property.title}
                      </h3>
                      
                      <div className="flex items-center gap-1.5 text-black/60 dark:text-white/60 text-sm mb-6">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{property.location}</span>
                      </div>

                      {/* Divider */}
                      <div className="mt-auto pt-4 border-t border-black/5 dark:border-white/10 flex justify-between text-sm text-black/60 dark:text-white/60">
                        <div className="flex items-center gap-1.5"><BedDouble className="w-4 h-4"/> {property.bedrooms}</div>
                        <div className="flex items-center gap-1.5"><Bath className="w-4 h-4"/> {property.bathrooms}</div>
                        <div className="flex items-center gap-1.5"><Users className="w-4 h-4"/> {property.maxGuests}</div>
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}