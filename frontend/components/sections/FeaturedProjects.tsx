'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPin, TrendingUp } from 'lucide-react';

// Placeholder data - You will replace these images with actual photos of your properties
const PROJECTS = [
  {
    id: 'riad-al-maqam',
    title: 'Riad Al Maqam',
    location: 'Marrakech Medina',
    metric: '+45% Revenue',
    metricLabel: 'in first 6 months',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2000&auto=format&fit=crop', // Beautiful Moroccan Riad placeholder
    slug: 'riad-al-maqam'
  },
  {
    id: 'villa-majorelle',
    title: 'Villa Palmeraie',
    location: 'La Palmeraie, Marrakech',
    metric: '98%',
    metricLabel: 'Occupancy Rate',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2000&auto=format&fit=crop', // Luxury Villa placeholder
    slug: 'villa-palmeraie'
  }
];

export default function FeaturedProjects() {
  return (
    <section className="bg-promaroc-black py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-sora font-bold text-promaroc-white mb-6"
            >
              Proven Results.<br/>
              <span className="text-promaroc-green">Premium Properties.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-promaroc-light/70 font-inter"
            >
              Explore our portfolio of optimized assets and see how we turn beautiful spaces into high-yielding investments.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/projects"
              className="inline-flex items-center gap-2 text-promaroc-white hover:text-promaroc-green font-medium transition-colors"
            >
              View all case studies
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <Link href={`/projects/${project.slug}`} className="group block relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3]">
                
                {/* Background Image with Zoom Effect */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                
                {/* Dark Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-promaroc-black via-promaroc-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
                  {/* Top Badge */}
                  <div className="flex justify-end transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-promaroc-white/10 backdrop-blur-md text-promaroc-white px-4 py-2 rounded-full flex items-center gap-2 font-medium text-sm border border-promaroc-white/20">
                      View Case Study
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div>
                    <div className="flex items-center gap-2 text-promaroc-green font-medium text-sm mb-3">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-sora font-bold text-promaroc-white mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {project.title}
                    </h3>
                    
                    {/* Key Metric Box */}
                    <div className="bg-promaroc-white/10 backdrop-blur-md border border-promaroc-white/10 rounded-2xl p-4 inline-flex items-center gap-4 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <div className="bg-promaroc-green/20 p-2 rounded-xl text-promaroc-green">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-promaroc-white font-sora font-bold text-xl leading-none">
                          {project.metric}
                        </div>
                        <div className="text-promaroc-light/70 text-xs mt-1">
                          {project.metricLabel}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}