'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/sections/ContactForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />

      <main className="pt-16">
        <section className="bg-slate-900 py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm uppercase tracking-[0.32em] text-emerald-400 mb-4">Contact</p>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">Let’s connect.</h1>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              Tell us about your property goals and our team will reach out with a tailored demo and pricing details.
            </p>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <ContactForm />
        </section>
      </main>

      <Footer />
    </div>
  )
}
