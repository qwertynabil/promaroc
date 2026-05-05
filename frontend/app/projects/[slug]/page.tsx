'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, MapPin, TrendingUp, CalendarCheck, Globe, Star } from 'lucide-react';
import { notFound } from 'next/navigation';

// Mock Database for your Case Studies
// Later, you will fetch this data from your PostgreSQL backend!
const PROJECTS_DB: Record<string, any> = {
  'riad-al-maqam': {
    title: 'Riad Al Maqam',
    location: 'Marrakech Medina',
    heroImage: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2000&auto=format&fit=crop',
    challenge: 'Despite its stunning authentic architecture, Riad Al Maqam suffered from severe low-season drop-offs. They were heavily reliant on a single OTA (Booking.com), paying massive commissions, and had zero direct bookings due to an outdated website.',
    solution: 'We deployed a complete digital overhaul. We built a high-converting direct booking engine, separated their brand identity, and implemented a dynamic pricing strategy that adjusted daily based on Marrakech market demand. We also introduced targeted promotions during the low season.',
    metrics: [
      { id: 1, label: 'Revenue Increase', value: '+45%', icon: TrendingUp },
      { id: 2, label: 'Direct Bookings', value: '32%', icon: Globe },
      { id: 3, label: 'Avg. Occupancy', value: '88%', icon: CalendarCheck },
    ],
    widgetId: 'YOUR_ELFSIGHT_OR_TRUSTINDEX_WIDGET_ID' // Placeholder for the review widget
  },
  'villa-palmeraie': {
    title: 'Villa Palmeraie',
    location: 'La Palmeraie, Marrakech',
    heroImage: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2000&auto=format&fit=crop',
    challenge: 'A newly built luxury asset that had no digital footprint. The owners lacked the operational staff to maintain 5-star standards and were struggling to position the property in the ultra-competitive luxury villa segment.',
    solution: 'We executed a full On-Site Management & Digital pipeline. We onboarded premium cleaning and transport staff, arranged high-end media creation (drone & video), and distributed the property across Airbnb Luxe and high-ticket exclusive channels.',
    metrics: [
      { id: 1, label: 'First Year Revenue', value: '€120k+', icon: TrendingUp },
      { id: 2, label: 'Peak Occupancy', value: '98%', icon: CalendarCheck },
      { id: 3, label: 'Guest Rating', value: '4.98', icon: Star },
    ],
    widgetId: 'YOUR_ELFSIGHT_OR_TRUSTINDEX_WIDGET_ID'
  }
};

export default function ProjectCaseStudy({ params }: { params: { slug: string } }) {
  // Find the project based on the URL slug
  const project = PROJECTS_DB[params.slug];

  // If the URL is wrong (e.g., /projects/fake-riad), show a 404 page automatically
  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-promaroc-white pb-20">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-end pb-12 md:pb-24">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-promaroc-black via-promaroc-black/40 to-transparent opacity-90" />

        <div className="container relative z-10 mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/projects" className="inline-flex items-center gap-2 text-promaroc-white/70 hover:text-promaroc-white mb-8 transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>
            
            <div className="flex items-center gap-2 text-promaroc-green font-medium mb-4">
              <MapPin className="w-5 h-5" />
              {project.location}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-sora font-bold text-promaroc-white tracking-tight mb-6">
              {project.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 2. THE METRICS (ROI BENTO BAR) */}
      <section className="container mx-auto px-6 max-w-5xl -mt-10 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-promaroc-white rounded-3xl shadow-xl border border-promaroc-light p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-promaroc-light"
        >
          {project.metrics.map((metric: any) => (
            <div key={metric.id} className="flex flex-col items-center text-center pt-6 md:pt-0 first:pt-0">
              <div className="w-12 h-12 bg-promaroc-green/10 rounded-full flex items-center justify-center text-promaroc-green mb-4">
                <metric.icon className="w-6 h-6" />
              </div>
              <div className="text-4xl font-sora font-bold text-promaroc-black mb-1">
                {metric.value}
              </div>
              <div className="text-sm font-medium text-promaroc-dark/60 uppercase tracking-widest">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* 3. BEFORE & AFTER (CHALLENGE VS SOLUTION) */}
      <section className="container mx-auto px-6 max-w-5xl py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* The Challenge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-600 font-semibold text-sm tracking-widest uppercase">
              The Challenge
            </div>
            <h3 className="text-3xl font-sora font-bold text-promaroc-black">
              Underperforming Asset
            </h3>
            <p className="text-lg text-promaroc-dark/70 font-inter leading-relaxed">
              {project.challenge}
            </p>
          </motion.div>

          {/* The Solution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-promaroc-green/10 text-promaroc-green font-semibold text-sm tracking-widest uppercase">
              The Promaroc Solution
            </div>
            <h3 className="text-3xl font-sora font-bold text-promaroc-black">
              Strategic Optimization
            </h3>
            <p className="text-lg text-promaroc-dark/70 font-inter leading-relaxed">
              {project.solution}
            </p>
          </motion.div>

        </div>
      </section>

      {/* 4. LIVE BOOKING.COM REVIEWS INTEGRATION */}
      <section className="bg-promaroc-light/20 py-24 border-y border-promaroc-light">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-sora font-bold text-promaroc-black mb-4">
              Guest Experience. <span className="text-promaroc-green">Verified.</span>
            </h2>
            <p className="text-promaroc-dark/70 font-inter mb-12 max-w-2xl mx-auto">
              We manage the entire guest lifecycle. Here is what real guests are saying about {project.title} on Booking.com and Airbnb right now.
            </p>

            {/* WIDGET CONTAINER */}
            <div className="bg-promaroc-white rounded-3xl p-8 md:p-12 shadow-sm border border-promaroc-light min-h-[300px] flex items-center justify-center relative overflow-hidden">
              
              {/* HOW TO ADD YOUR REAL REVIEWS:
                1. Go to Elfsight.com or Trustindex.io
                2. Connect your property's Booking.com/Airbnb link
                3. Copy the HTML <div> or <script> code they give you
                4. Paste it right here replacing the placeholder text!
              */}
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-4 text-yellow-400">
                  <Star className="w-6 h-6 fill-current" /><Star className="w-6 h-6 fill-current" /><Star className="w-6 h-6 fill-current" /><Star className="w-6 h-6 fill-current" /><Star className="w-6 h-6 fill-current" />
                </div>
                <p className="text-promaroc-dark font-medium italic">
                  "[Live Booking.com / Airbnb Widget Integration goes here]"
                </p>
                <p className="text-sm text-promaroc-dark/50 mt-2">
                  Powered by Trustindex / Elfsight
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. BOTTOM CALL TO ACTION */}
      <section className="container mx-auto px-6 max-w-4xl py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-sora font-bold text-promaroc-black mb-8">
          Want these kinds of returns for your property?
        </h2>
        <Link 
          href="/contact"
          className="inline-flex items-center justify-center gap-2 bg-promaroc-black text-promaroc-white px-8 py-4 rounded-full font-semibold text-base hover:bg-promaroc-green transition-all duration-300 shadow-xl"
        >
          Book a Free Portfolio Audit
        </Link>
      </section>

    </div>
  );
}