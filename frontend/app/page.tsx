'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans overflow-x-hidden">
      <Header />

      <main className="pt-16">
        <HeroSection />

        <section className="py-20 px-4 border-y border-zinc-900 bg-zinc-950/50 relative z-20">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="group">
              <div className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-2 transition-transform group-hover:scale-110">10K+</div>
              <div className="text-xs sm:text-sm font-medium text-zinc-500 uppercase tracking-wider">Properties</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-2 transition-transform group-hover:scale-110">50K+</div>
              <div className="text-xs sm:text-sm font-medium text-zinc-500 uppercase tracking-wider">Tenants</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-2 transition-transform group-hover:scale-110">99.9%</div>
              <div className="text-xs sm:text-sm font-medium text-zinc-500 uppercase tracking-wider">Uptime</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-2 transition-transform group-hover:scale-110">24/7</div>
              <div className="text-xs sm:text-sm font-medium text-zinc-500 uppercase tracking-wider">Support</div>
            </div>
          </div>
        </section>

        <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto space-y-8 relative z-20">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tight">
              Powerful Features. <br className="md:hidden" /> Everything you need.
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Hover over the cards below to see the interactive 3D perspective in action.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-[2000px]">
            <div className="md:col-span-2 bg-gradient-to-br from-zinc-900 to-black rounded-[2.5rem] p-10 md:p-14 border border-zinc-800 relative overflow-hidden group">
              <div className="relative z-10 w-full md:w-3/4 flex flex-col justify-between h-full min-h-[300px]">
                <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-white">Tenant Management.</h3>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Complete lifecycle management from screening to move-out. Automate your lease agreements, applications, and maintenance requests seamlessly.
                </p>
              </div>
              <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
            </div>

            <div className="bg-zinc-900 rounded-[2.5rem] p-10 border border-zinc-800 relative overflow-hidden">
              <div className="flex flex-col justify-center h-full min-h-[300px]">
                <h3 className="text-4xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  Financial Tracking.
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  Automated rent collection, expense tracking, and comprehensive reporting.
                </p>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-[2.5rem] p-10 border border-zinc-800">
              <div className="flex flex-col justify-center h-full min-h-[300px]">
                <h3 className="text-3xl font-semibold mb-4 text-white">Property Analytics.</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Data-driven insights with occupancy rates, performance analytics, and market trend analysis.
                </p>
              </div>
            </div>

            <div className="md:col-span-2 bg-gradient-to-br from-zinc-900 to-black rounded-[2.5rem] p-10 md:p-14 border border-zinc-800 relative overflow-hidden group">
              <div className="relative z-10 w-full md:w-3/4 flex flex-col justify-between h-full min-h-[300px]">
                <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-white">Maintenance Coordination.</h3>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Streamlined workflows with work order management, contractor coordination, and emergency response tracking all in one place.
                </p>
              </div>
              <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
            </div>
          </div>
        </section>

        <section className="py-32 px-4 text-center relative z-20">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white">Ready to transform?</h2>
            <p className="text-xl text-zinc-400">
              Join thousands of property managers who have streamlined their operations with Promaroc.
            </p>
            <div className="pt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button className="w-full sm:w-auto rounded-full px-10 py-6 text-xl bg-green-500 text-black hover:bg-green-400 transition-transform hover:scale-105">
                Start your 14-day free trial
              </Button>
            </div>
            <p className="text-zinc-500 text-sm">No credit card required. Cancel anytime.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
