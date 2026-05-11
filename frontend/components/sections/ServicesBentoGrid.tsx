'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Variants } from 'framer-motion';
import { 
  MonitorSmartphone, 
  TrendingUp, 
  Home, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import { Variant } from 'framer-motion';
const SERVICES = [
  {
    id: 'digital',
    title: 'Digital Presence',
    description: 'We build your digital storefront and manage your distribution across global platforms to maximize visibility.',
    icon: MonitorSmartphone,
    features: ['Custom Direct Booking Sites', 'Airbnb & Booking.com Setup', 'Media Buying & Content Creation'],
    href: '/services/digital-presence',
    className: 'md:col-span-2', // Takes up 2 columns on medium screens
  },
  {
    id: 'revenue',
    title: 'Revenue Optimization',
    description: 'Data-driven pricing strategies that ensure you never leave money on the table.',
    icon: TrendingUp,
    features: ['Dynamic Pricing', 'Strategic Promotions', 'Identity Separation'],
    href: '/services/revenue-optimization',
    className: 'md:col-span-1', // Takes up 1 column
  },
  {
    id: 'onsite',
    title: 'On-Site Management',
    description: 'Flawless operational execution on the ground so your guests experience true luxury.',
    icon: Home,
    features: ['Property Supply & Cleaning', 'Transport & Logistics', 'Staff Onboarding & Training'],
    href: '/services/on-site-management',
    className: 'md:col-span-3', // Stretches across the entire bottom row
  }
];

export default function ServicesBentoGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } 
    },
  };

  return (
    <section className="bg-promaroc-white dark:bg-promaroc-black py-32 relative overflow-hidden transition-colors duration-300">
      {/* Cinematic Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-promaroc-green/5 dark:bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-promaroc-orange/5 dark:bg-promaroc-green/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-sora font-bold text-promaroc-black dark:text-promaroc-white mb-6"
          >
            A 360° Approach to <br/>
            <span className="text-promaroc-green dark:text-promaroc-white">Property Management.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-black/70 dark:text-white/70 font-inter"
          >
            From the first click on a booking platform to the final checkout at your Riad, we optimize every touchpoint.
          </motion.p>
        </div>

        {/* The Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {SERVICES.map((service) => (
            <motion.div 
              key={service.id}
              variants={cardVariants}
              className={`group relative bg-white/60 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col justify-between ${service.className}`}
            >
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-promaroc-green/10 to-transparent dark:from-white/10 dark:to-transparent border border-promaroc-green/10 dark:border-white/5 flex items-center justify-center text-promaroc-green dark:text-white mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
                  <service.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-sora font-bold text-promaroc-black dark:text-promaroc-white mb-4">
                  {service.title}
                </h3>
                
                <p className="text-black/70 dark:text-white/70 font-inter mb-8 line-clamp-2 md:line-clamp-none">
                  {service.description}
                </p>

                <ul className="space-y-4 mb-10">
                  {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-promaroc-black dark:text-promaroc-white font-medium group/item">
                    <CheckCircle2 className="w-5 h-5 text-promaroc-green dark:text-white group-hover/item:scale-110 transition-transform" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Link 
                href={service.href}
              className="inline-flex items-center gap-2 font-bold text-sm text-promaroc-black dark:text-promaroc-white group-hover:text-promaroc-green dark:group-hover:text-white/80 transition-colors z-10 w-fit mt-auto"
              >
                Explore this service
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>

              {/* Decorative subtle background element that appears on hover */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-promaroc-green/5 dark:bg-white/5 rounded-full blur-3xl group-hover:bg-promaroc-green/20 dark:group-hover:bg-white/10 group-hover:scale-150 transition-all duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}