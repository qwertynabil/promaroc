'use client';

import { motion } from 'framer-motion';
import { Target, Users, Zap, CheckCircle } from 'lucide-react'

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'Empower property managers with intelligent tools to simplify operations and maximize profitability.',
    },
    {
      icon: Users,
      title: 'Customer-Focused',
      description: 'Every feature is built based on real feedback from property managers like you.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Continuously evolving with cutting-edge technology and best practices in property management.',
    },
    {
      icon: CheckCircle,
      title: 'Reliability',
      description: 'Enterprise-grade infrastructure ensuring 99.9% uptime and data security.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6 } 
    },
  };

  return (
    <main className="min-h-screen bg-promaroc-white dark:bg-promaroc-black transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-promaroc-green/10 dark:bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-sora font-bold text-promaroc-black dark:text-promaroc-white tracking-tight mb-6">
              Redefining <br className="hidden md:block" />
              <span className="text-promaroc-green">Property Management.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-black/60 dark:text-white/60 font-inter max-w-3xl mx-auto leading-relaxed">
              We are a collective of hospitality experts, data scientists, and operational leaders driven by one goal: maximizing your asset's true potential.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }} 
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-sora font-bold text-promaroc-black dark:text-promaroc-white">Our Story</h2>
              <div className="space-y-6 text-lg text-black/70 dark:text-white/70 font-inter leading-relaxed">
                <p>
                  Promaroc was founded by a team of experienced property managers who recognized a critical gap in the market. Traditional property management was fragmented, inefficient, and frustrating. We set out to build a platform that would change everything.
                </p>
                <p>
                  Today, we serve thousands of property managers worldwide, helping them manage millions of square feet of commercial and residential properties. Our platform has processed billions of dollars in transactions and continues to grow exponentially.
                </p>
                <p>
                  We believe the future of property management is intelligent, automated, and accessible to everyone—from solo operators to large enterprises.
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }} 
              className="relative"
            >
              <div className="aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-promaroc-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-10">
                  <div className="text-promaroc-white space-y-2">
                    <p className="text-5xl font-sora font-bold text-promaroc-green">10K+</p>
                    <p className="text-xl font-medium">Properties Optimized</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-32 bg-promaroc-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-promaroc-green/20 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="text-4xl md:text-5xl font-sora font-bold text-promaroc-white mb-6"
            >
              Our Core Values
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.1 }} 
              className="text-xl text-promaroc-light/70 max-w-2xl mx-auto font-inter"
            >
              The principles that guide our decisions, shape our culture, and drive our commitment to excellence.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group p-10 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="w-14 h-14 bg-promaroc-green/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-promaroc-green" />
                  </div>
                  <h3 className="text-2xl font-sora font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-white/60 font-inter leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-20 bg-promaroc-green">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20">
            {[
              { label: 'Active Users', value: '10K+' },
              { label: 'Properties Managed', value: '50K+' },
              { label: 'Assets Under Mgmt', value: '$2B+' },
              { label: 'Years in Business', value: '6+' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center px-4"
              >
                <div className="text-4xl md:text-5xl font-sora font-bold text-promaroc-white mb-2">{stat.value}</div>
                <div className="text-xs md:text-sm text-promaroc-white/80 font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-32 bg-promaroc-white dark:bg-promaroc-black transition-colors duration-300">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-sora font-bold text-promaroc-black dark:text-promaroc-white mb-6">Meet the Experts</h2>
            <p className="text-xl text-black/60 dark:text-white/60 max-w-3xl mx-auto font-inter">
              A diverse team of property management veterans, software engineers, and hospitality experts united by a mission to transform the industry.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: 'Youssef B.', title: 'CEO & Founder', img: '1560250097-0b93528c311a' },
              { name: 'Amina M.', title: 'Head of Operations', img: '1573496359142-b8d87734a5a2' },
              { name: 'Omar K.', title: 'Lead Strategist', img: '1580489944761-15a19d654956' },
            ].map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative"
              >
                <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-black/5 dark:bg-white/5 mb-6 relative">
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-${member.img}?q=80&w=800&auto=format&fit=crop')` }}
                  />
                </div>
                <h3 className="text-2xl font-sora font-bold text-promaroc-black dark:text-promaroc-white mb-1">{member.name}</h3>
                <p className="text-promaroc-green font-medium">{member.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
} 
