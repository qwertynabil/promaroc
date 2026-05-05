'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { BRAND } from 'frontend/lib/constants';

export default function HeroSection() {
  // Animation variants for Apple-style smooth revealing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delays each child animation by 0.2s for a cascading effect
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }, // Custom easing for premium feel
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-promaroc-black pt-20">
      
      {/* BACKGROUND: 
        Currently a premium dark gradient. 
        Later, you can replace the div below with a Next.js <Image /> of a beautiful Riad 
        with object-fit="cover" and a dark overlay. 
      */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-promaroc-black via-[#111111] to-promaroc-dark opacity-100" />
        {/* Subtle radial glow to draw the eye to the center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-promaroc-green/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-5xl text-center flex flex-col items-center justify-center">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center w-full"
        >
          {/* Eyebrow Tagline */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block py-1 px-3 rounded-full border border-promaroc-green/30 bg-promaroc-green/10 text-promaroc-green font-medium text-sm tracking-widest uppercase">
              {BRAND.tagline}
            </span>
          </motion.div>

          {/* Main Cinematic Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-sora font-bold text-promaroc-white tracking-tight leading-[1.1] mb-8"
          >
            Maximising property <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-promaroc-white to-promaroc-light/50">
              performance.
            </span>
            <br />
            Optimising every return.
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

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-promaroc-white/50"
      >
        <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

    </section>
  );
}