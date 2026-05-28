'use client';

import { motion } from 'framer-motion';

export default function ValuePropSection() {
  return (
    <section className="bg-promaroc-black py-32 md:py-48 relative overflow-hidden transition-colors duration-300">
      {/* Ambient Green Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-promaroc-green/20 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="space-y-8 relative z-10"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-sora font-bold text-promaroc-white leading-tight tracking-tight transition-colors duration-300">
            We <span className="text-promaroc-green">Manage.</span><br />
            We <span className="text-promaroc-green">Optimize.</span><br />
            You <span className="text-promaroc-green">Profit.</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-promaroc-light/80 font-inter font-light leading-relaxed max-w-3xl mx-auto mt-8 transition-colors duration-300">
            Stop worrying about daily operations and algorithmic updates. 
            We take full control of your hospitality asset, turning it from a property into a high-performing business.
          </p>
        </motion.div>

      </div>
    </section>
  );
}