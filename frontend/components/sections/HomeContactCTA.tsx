'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { BRAND } from '@/lib/constants';

export default function HomeContactCTA() {
  return (
    <section className="bg-promaroc-white py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* The CTA Box */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-promaroc-black rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-promaroc-green/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-sora font-bold text-promaroc-white mb-6 leading-tight tracking-tight">
              Ready to maximize <br className="hidden md:block"/>
              your <span className="text-promaroc-green">property returns?</span>
            </h2>
            
            <p className="text-lg md:text-xl text-promaroc-light/80 font-inter mb-12">
              Let's discuss how our data-driven insights and operational excellence can transform your hospitality asset into a high-yielding business.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              {/* Primary Contact Button */}
              <Link 
                href="/contact"
                className="group flex items-center justify-center gap-2 bg-promaroc-green text-promaroc-white px-8 py-4 rounded-full font-semibold text-base hover:bg-promaroc-white hover:text-promaroc-black transition-all duration-300 w-full sm:w-auto shadow-[0_0_30px_rgba(15,61,55,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                Start Optimization
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary WhatsApp Button */}
              <a 
                href={BRAND.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 bg-transparent border border-promaroc-white/20 text-promaroc-white px-8 py-4 rounded-full font-medium text-base hover:bg-promaroc-white/10 transition-all duration-300 w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}