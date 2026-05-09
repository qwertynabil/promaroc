'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPin, TrendingUp, Star } from 'lucide-react';

// We keep the mock data here as a safe fallback for when the database is empty!
const FALLBACK_PROJECTS = [
  {
    id: 'riad-al-maqam',
    title: 'Riad Al Maqam',
    category: 'Riad',
    location: 'Marrakech Medina',
    metric: '+45%',
    metricLabel: 'Revenue Increase',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2000&auto=format&fit=crop',
    slug: 'riad-al-maqam'
  },
  {
    id: 'villa-palmeraie',
    title: 'Villa Palmeraie',
    category: 'Villa',
    location: 'La Palmeraie, Marrakech',
    metric: '98%',
    metricLabel: 'Peak Occupancy Rate',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2000&auto=format&fit=crop',
    slug: 'villa-palmeraie'
  },
  {
    id: 'riad-yasmine',
    title: 'Riad Yasmine',
    category: 'Riad',
    location: 'Mouassine, Marrakech',
    metric: '4.96',
    metricLabel: 'Average OTA Rating',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop',
    slug: 'riad-yasmine'
  },
  {
    id: 'villa-atlas',
    title: 'Atlas View Villa',
    category: 'Villa',
    location: 'Ourika Valley',
    metric: '3.5x',
    metricLabel: 'Direct Booking Growth',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop',
    slug: 'villa-atlas'
  }
];

const CATEGORIES = ['All', 'Riad', 'Villa'];

// Notice the prop we are receiving from the Server Component!
export default function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
  const [activeCategory, setActiveCategory] = useState('All');

  // Smart Fallback: If DB is empty, use the beautiful mock data. 
  // If DB has data, map it to ensure it matches our UI expectations.
  const projectsToDisplay = initialProjects && initialProjects.length > 0 
    ? initialProjects 
    : FALLBACK_PROJECTS;

  // Filter projects based on the selected tab
  const filteredProjects = projectsToDisplay.filter(project => 
    activeCategory === 'All' ? true : project.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-promaroc-white dark:bg-promaroc-black pt-32 pb-20 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-sora font-bold text-promaroc-black dark:text-promaroc-white tracking-tight mb-6">
              Our <span className="text-promaroc-green dark:text-promaroc-white">Portfolio.</span>
            </h1>
            <p className="text-xl text-black/70 dark:text-white/70 font-inter font-light leading-relaxed">
              We don't just manage properties; we transform them into market leaders. Explore our case studies to see the exact returns we generate for our partners.
            </p>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center gap-3 mb-12"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-promaroc-black text-promaroc-white dark:bg-promaroc-white dark:text-promaroc-black shadow-md' 
                  : 'bg-black/5 text-black/70 hover:bg-black/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                {/* Note: We fallback to project.id if project.slug isn't in the DB yet */}
                <Link href={`/projects/${project.slug || project.id}`} className="group block relative rounded-3xl overflow-hidden aspect-[4/3] shadow-sm hover:shadow-2xl transition-all duration-500">
                  
                  {/* Image Background */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image || project.imageUrl})` }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-promaroc-black/90 via-promaroc-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    
                    {/* Top Row: Category Badge */}
                    <div className="flex justify-between items-start">
                      <span className="bg-promaroc-white/20 backdrop-blur-md text-promaroc-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-promaroc-white/10">
                        {project.category || 'Portfolio'}
                      </span>
                      
                      <div className="w-10 h-10 rounded-full bg-promaroc-white/20 backdrop-blur-md flex items-center justify-center text-promaroc-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Bottom Row: Details & Metric */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div>
                    <div className="flex items-center gap-2 text-promaroc-green dark:text-promaroc-white font-medium text-sm mb-2">
                          <MapPin className="w-4 h-4" />
                          {project.location || 'Morocco'}
                        </div>
                    <h2 className="text-3xl font-sora font-bold text-promaroc-white"> {/* Stays white over dark image overlay */}
                          {project.title}
                        </h2>
                      </div>

                      {/* ROI Metric Box */}
                      {project.metric && (
                        <div className="bg-promaroc-white/10 backdrop-blur-md border border-promaroc-white/10 rounded-2xl p-4 shrink-0">
                          <div className="flex items-center gap-3">
                        <div className="bg-black/20 text-promaroc-white p-2 rounded-xl">
                              {project.metricLabel?.includes('Rating') ? <Star className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                            </div>
                            <div>
                              <div className="text-promaroc-white font-sora font-bold text-xl leading-none">
                                {project.metric}
                              </div>
                              <div className="text-promaroc-light/70 text-[10px] uppercase tracking-wider mt-1">
                                {project.metricLabel}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}