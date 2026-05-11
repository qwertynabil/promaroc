'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BRAND } from '@/lib/constants';

export default function HeroSection() {
  // Animation variants for Apple-style smooth revealing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delays each child animation by 0.2s for a cascading effect
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }, // Custom easing for premium feel
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* BACKGROUND IMAGE & OVERLAY */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?q=80&w=1524&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=2000&auto=format&fit=crop')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-promaroc-black via-promaroc-black/70 to-transparent z-0" />

      <div className="container relative z-10 mx-auto px-6 max-w-5xl text-center flex flex-col items-center justify-center">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center w-full"
        >
        

          {/* Main Cinematic Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-sora font-bold text-promaroc-white tracking-tight leading-[1.1] mb-8"
          >
            Property Revenue <br className="hidden md:block" />
            <span className="text-promaroc-orange">
              Optimization.
            </span>
          </motion.h1>

          {/* Mission Subheadline */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-promaroc-light/80 max-w-2xl mx-auto font-inter font-light leading-relaxed mb-12"
          >
            {BRAND.mission}
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          >
            <Link 
              href="/contact" 
              className="group flex items-center justify-center gap-2 bg-promaroc-white text-promaroc-black px-8 py-4 rounded-full font-semibold text-base hover:bg-promaroc-green hover:text-promaroc-white transition-all duration-300 w-full sm:w-auto shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(15,61,55,0.4)]"
            >
              Start Optimizing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/projects" 
              className="group flex items-center justify-center gap-2 bg-transparent border border-promaroc-white/20 text-promaroc-white px-8 py-4 rounded-full font-medium text-base hover:bg-promaroc-white/10 transition-all duration-300 w-full sm:w-auto"
            >
              View Our Portfolio
            </Link>
          </motion.div>

        </motion.div>
      </div>

    </section>
  );
}