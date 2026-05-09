'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Home, 
  Hotel, 
  MonitorSmartphone, 
  TrendingUp, 
  Briefcase, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2,
  MessageCircle
} from 'lucide-react';
import { BRAND } from '@/lib/constants';
import { Variants } from 'framer-motion';
// Step Options Data
const PROPERTY_TYPES = [
  { id: 'riad', label: 'Riad', icon: Home },
  { id: 'villa', label: 'Villa', icon: Building2 },
  { id: 'hotel', label: 'Boutique Hotel', icon: Hotel },
];

const SERVICES_NEEDED = [
  { id: 'digital', label: 'Digital Presence & Booking', icon: MonitorSmartphone },
  { id: 'onsite', label: 'On-Site Management', icon: Briefcase },
  { id: 'revenue', label: 'Revenue Optimization', icon: TrendingUp },
  { id: 'full', label: 'Full 360° Management', icon: CheckCircle2 },
];

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    propertyType: '',
    serviceNeeded: '',
    name: '',
    email: '',
    phone: '',
  });

  const updateFormData = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 🔒 SECURE CONNECTION: We call the Next.js API Proxy, NOT the backend directly.
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          // Combine the beautiful visual steps into a structured message for the DB
          message: `Property Type: ${formData.propertyType} | Service Needed: ${formData.serviceNeeded}`
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setStep(4);
      } else {
        alert("Something went wrong on the server. Please try again.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Could not connect. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants for smooth step transitions
  const formVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-promaroc-white dark:bg-promaroc-black pt-32 pb-20 flex items-center justify-center relative overflow-hidden transition-colors duration-300">
      
      {/* Cinematic Background Glows */}
      <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-promaroc-green/10 dark:bg-white/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-promaroc-green/5 dark:bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl flex flex-col lg:flex-row gap-16 items-center relative z-10">
        
        {/* Left Side: Context & WhatsApp */}
        <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/70 dark:text-promaroc-white/70 font-medium text-sm tracking-widest uppercase mb-6">
              Free Portfolio Audit
            </div>
            <h1 className="text-5xl md:text-6xl font-sora font-bold text-promaroc-black dark:text-promaroc-white mb-6 leading-tight tracking-tight">
              Let's optimize <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-promaroc-black to-promaroc-black/50 dark:from-promaroc-white dark:to-promaroc-white/50">
                your property.
              </span>
            </h1>
            <p className="text-lg text-black/60 dark:text-promaroc-white/60 font-inter leading-relaxed mb-10 max-w-md mx-auto lg:mx-0">
              Fill out the form to request an audit, or reach out to us directly on WhatsApp for an immediate response from our team.
            </p>

            <a 
              href={BRAND.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 px-8 py-4 rounded-full hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/30 dark:hover:border-white/30 transition-all duration-300 group"
            >
              <div className="bg-black/10 text-promaroc-black dark:bg-white/10 dark:text-promaroc-white p-3 rounded-full group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="font-sora font-semibold text-promaroc-black dark:text-promaroc-white">Chat on WhatsApp</div>
                <div className="text-sm text-black/50 dark:text-promaroc-white/50">{BRAND.contact.phone}</div>
              </div>
            </a>
          </motion.div>
        </div>

        {/* Right Side: The Premium Glassmorphic Form */}
        <div className="w-full lg:w-1/2">
          <div className="bg-black/5 dark:bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-black/10 dark:border-white/10 relative overflow-hidden min-h-[550px] flex flex-col">
            
            {/* Progress Bar */}
            {!isSuccess && (
              <div className="mb-10">
                <div className="flex justify-between text-xs font-semibold text-black/40 dark:text-promaroc-white/40 uppercase tracking-widest mb-4">
                  <span>Step {step} of 3</span>
                  <span className="text-promaroc-black dark:text-promaroc-white">
                    {step === 1 ? 'Property Type' : step === 2 ? 'Required Service' : 'Your Details'}
                  </span>
                </div>
                <div className="h-1 w-full bg-black/10 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-promaroc-black dark:bg-promaroc-white rounded-full dark:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    initial={{ width: '33%' }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            {/* Form Steps Wrapper */}
            <div className="flex-grow relative">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: Property Type */}
                {step === 1 && (
                  <motion.div key="step1" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                <h2 className="text-2xl font-sora font-bold text-promaroc-black dark:text-promaroc-white mb-6">What type of property do you own?</h2>
                    <div className="grid grid-cols-1 gap-4">
                      {PROPERTY_TYPES.map(type => (
                        <button
                          key={type.id}
                          onClick={() => { updateFormData('propertyType', type.label); nextStep(); }}
                          className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 text-left group ${
                            formData.propertyType === type.label 
                          ? 'border-promaroc-black bg-black/10 dark:border-white dark:bg-white/10' 
                          : 'border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5 hover:border-black/30 hover:bg-black/10 dark:hover:border-white/30 dark:hover:bg-white/10'
                          }`}
                        >
                      <div className={`p-3 rounded-xl transition-colors ${formData.propertyType === type.label ? 'bg-promaroc-black text-promaroc-white dark:bg-promaroc-white dark:text-promaroc-black' : 'bg-black/10 text-black/70 dark:bg-white/10 dark:text-promaroc-white/70 group-hover:text-promaroc-black dark:group-hover:text-promaroc-white'}`}>
                            <type.icon className="w-6 h-6" />
                          </div>
                      <span className="font-semibold text-promaroc-black dark:text-promaroc-white text-lg">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Services Needed */}
                {step === 2 && (
                  <motion.div key="step2" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                <h2 className="text-2xl font-sora font-bold text-promaroc-black dark:text-promaroc-white mb-6">What do you need help with?</h2>
                    <div className="grid grid-cols-1 gap-4">
                      {SERVICES_NEEDED.map(service => (
                        <button
                          key={service.id}
                          onClick={() => { updateFormData('serviceNeeded', service.label); nextStep(); }}
                          className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 text-left group ${
                            formData.serviceNeeded === service.label 
                          ? 'border-promaroc-black bg-black/10 dark:border-white dark:bg-white/10' 
                          : 'border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5 hover:border-black/30 hover:bg-black/10 dark:hover:border-white/30 dark:hover:bg-white/10'
                          }`}
                        >
                      <div className={`p-3 rounded-xl transition-colors ${formData.serviceNeeded === service.label ? 'bg-promaroc-black text-promaroc-white dark:bg-promaroc-white dark:text-promaroc-black' : 'bg-black/10 text-black/70 dark:bg-white/10 dark:text-promaroc-white/70 group-hover:text-promaroc-black dark:group-hover:text-promaroc-white'}`}>
                            <service.icon className="w-5 h-5" />
                          </div>
                      <span className="font-semibold text-promaroc-black dark:text-promaroc-white text-base">{service.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Contact Details */}
                {step === 3 && (
                  <motion.form key="step3" onSubmit={handleSubmit} variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                    <h2 className="text-2xl font-sora font-bold text-promaroc-white mb-6">How can we reach you?</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-promaroc-white/70 mb-2 ml-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        className="w-full px-5 py-4 rounded-xl border border-white/10 bg-black/40 text-promaroc-white placeholder:text-white/20 focus:border-promaroc-green focus:ring-1 focus:ring-promaroc-green outline-none transition-all"
                        placeholder="e.g. John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-promaroc-white/70 mb-2 ml-1">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className="w-full px-5 py-4 rounded-xl border border-white/10 bg-black/40 text-promaroc-white placeholder:text-white/20 focus:border-promaroc-green focus:ring-1 focus:ring-promaroc-green outline-none transition-all"
                        placeholder="e.g. john@example.com"
                      />
                    </div>

                    <div>
                  <label className="block text-sm font-medium text-black/70 dark:text-promaroc-white/70 mb-2 ml-1">WhatsApp / Phone</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 text-promaroc-black dark:text-promaroc-white placeholder:text-black/30 dark:placeholder:text-white/20 focus:border-promaroc-black dark:focus:border-white focus:ring-1 focus:ring-promaroc-black dark:focus:ring-white outline-none transition-all"
                        placeholder="+212 ..."
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                  className="w-full mt-4 bg-promaroc-black text-promaroc-white dark:bg-promaroc-white dark:text-promaroc-black py-4 rounded-xl font-bold hover:bg-black/80 dark:hover:bg-white/80 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                      {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                    </button>
                  </motion.form>
                )}

                {/* STEP 4: Success State */}
                {step === 4 && isSuccess && (
                  <motion.div key="step4" variants={formVariants} initial="hidden" animate="visible" className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-24 h-24 bg-black/10 dark:bg-white/20 rounded-full flex items-center justify-center text-promaroc-black dark:text-promaroc-white mb-8 dark:shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                <h2 className="text-3xl font-sora font-bold text-promaroc-black dark:text-promaroc-white mb-4">Request Received.</h2>
                <p className="text-black/60 dark:text-promaroc-white/60 font-inter mb-10 max-w-sm">
                      Thank you, {formData.name || 'there'}. Our optimization team will review your property details and reach out within 24 hours.
                    </p>
                    <button 
                      onClick={() => window.location.href = '/'}
                  className="bg-black/5 text-promaroc-black dark:bg-white/10 dark:text-promaroc-white px-8 py-3 rounded-full font-medium hover:bg-black/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/10 transition-colors"
                    >
                      Return to Home
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Navigation Buttons for Steps 2 and 3 */}
            {step > 1 && step < 4 && (
          <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 flex justify-start">
                <button 
                  onClick={prevStep}
              className="flex items-center gap-2 text-black/50 dark:text-promaroc-white/50 hover:text-promaroc-black dark:hover:text-promaroc-white font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}