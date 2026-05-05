'use client';

import { motion } from 'framer-motion';

export default function ValuePropSection() {
  return (
    <section className="bg-promaroc-white py-32 md:py-48 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-sora font-bold text-promaroc-black leading-tight tracking-tight">
            We <span className="text-promaroc-green">Manage.</span><br />
            We <span className="text-promaroc-green">Optimize.</span><br />
            You <span className="text-promaroc-green">Profit.</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-promaroc-dark/70 font-inter font-light leading-relaxed max-w-3xl mx-auto mt-8">
            Stop worrying about daily operations and algorithmic updates. 
            We take full control of your hospitality asset, turning it from a property into a high-performing business.
          </p>
        </motion.div>

      </div>
    </section>
  );
}