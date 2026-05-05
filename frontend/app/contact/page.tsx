'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
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
    message: ''
  });

  const updateFormData = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here is where you connect to the backend we built earlier!
    // Example: 
    // await fetch('http://YOUR_HOSTINGER_IP:5000/api/contact', { ... })
    
    // Simulating API call delay for now
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setStep(4);
    }, 1500);
  };

  // Animation variants for smooth step transitions
  const formVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-promaroc-light/20 pt-32 pb-20 flex items-center justify-center">
      <div className="container mx-auto px-6 max-w-4xl flex flex-col md:flex-row gap-16 items-center">
        
        {/* Left Side: Context & WhatsApp */}
        <div className="w-full md:w-1/2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-sora font-bold text-promaroc-black mb-6 leading-tight">
              Let's optimize <br/>
              <span className="text-promaroc-green">your property.</span>
            </h1>
            <p className="text-lg text-promaroc-dark/70 font-inter leading-relaxed mb-8">
              Fill out the form to request a free portfolio audit, or reach out to us directly on WhatsApp for an immediate response.
            </p>

            <a 
              href={BRAND.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-promaroc-white border border-promaroc-light px-6 py-4 rounded-2xl hover:border-promaroc-green hover:shadow-md transition-all duration-300 group"
            >
              <div className="bg-green-100 text-green-600 p-3 rounded-full group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="font-sora font-semibold text-promaroc-black">Chat on WhatsApp</div>
                <div className="text-sm text-promaroc-dark/60">{BRAND.contact.phone}</div>
              </div>
            </a>
          </motion.div>
        </div>

        {/* Right Side: The Multi-Step Form */}
        <div className="w-full md:w-1/2">
          <div className="bg-promaroc-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-promaroc-light relative overflow-hidden min-h-[500px] flex flex-col">
            
            {/* Progress Bar */}
            {!isSuccess && (
              <div className="mb-8">
                <div className="flex justify-between text-xs font-semibold text-promaroc-dark/50 uppercase tracking-widest mb-3">
                  <span>Step {step} of 3</span>
                  <span>{step === 1 ? 'Property' : step === 2 ? 'Needs' : 'Details'}</span>
                </div>
                <div className="h-1.5 w-full bg-promaroc-light rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-promaroc-green rounded-full"
                    initial={{ width: '33%' }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ duration: 0.5 }}
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
                    <h2 className="text-2xl font-sora font-bold text-promaroc-black mb-6">What type of property do you own?</h2>
                    <div className="grid grid-cols-1 gap-4">
                      {PROPERTY_TYPES.map(type => (
                        <button
                          key={type.id}
                          onClick={() => { updateFormData('propertyType', type.id); nextStep(); }}
                          className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                            formData.propertyType === type.id 
                              ? 'border-promaroc-green bg-promaroc-green/5' 
                              : 'border-promaroc-light hover:border-promaroc-green/30 hover:bg-promaroc-light/20'
                          }`}
                        >
                          <div className={`p-3 rounded-xl ${formData.propertyType === type.id ? 'bg-promaroc-green text-promaroc-white' : 'bg-promaroc-light text-promaroc-dark'}`}>
                            <type.icon className="w-6 h-6" />
                          </div>
                          <span className="font-semibold text-promaroc-black text-lg">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Services Needed */}
                {step === 2 && (
                  <motion.div key="step2" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                    <h2 className="text-2xl font-sora font-bold text-promaroc-black mb-6">What do you need help with?</h2>
                    <div className="grid grid-cols-1 gap-4">
                      {SERVICES_NEEDED.map(service => (
                        <button
                          key={service.id}
                          onClick={() => { updateFormData('serviceNeeded', service.id); nextStep(); }}
                          className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                            formData.serviceNeeded === service.id 
                              ? 'border-promaroc-green bg-promaroc-green/5' 
                              : 'border-promaroc-light hover:border-promaroc-green/30 hover:bg-promaroc-light/20'
                          }`}
                        >
                          <div className={`p-3 rounded-xl ${formData.serviceNeeded === service.id ? 'bg-promaroc-green text-promaroc-white' : 'bg-promaroc-light text-promaroc-dark'}`}>
                            <service.icon className="w-5 h-5" />
                          </div>
                          <span className="font-semibold text-promaroc-black text-base">{service.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Contact Details */}
                {step === 3 && (
                  <motion.form key="step3" onSubmit={handleSubmit} variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-4">
                    <h2 className="text-2xl font-sora font-bold text-promaroc-black mb-6">How can we reach you?</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-promaroc-dark mb-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-promaroc-light focus:border-promaroc-green focus:ring-2 focus:ring-promaroc-green/20 outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-promaroc-dark mb-1">Email</label>
                        <input 
                          required
                          type="email" 
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-promaroc-light focus:border-promaroc-green focus:ring-2 focus:ring-promaroc-green/20 outline-none transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-promaroc-dark mb-1">Phone</label>
                        <input 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-promaroc-light focus:border-promaroc-green focus:ring-2 focus:ring-promaroc-green/20 outline-none transition-all"
                          placeholder="+212 ..."
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-6 bg-promaroc-black text-promaroc-white py-4 rounded-xl font-semibold hover:bg-promaroc-green transition-colors flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? 'Sending...' : 'Submit Request'}
                      {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                    </button>
                  </motion.form>
                )}

                {/* STEP 4: Success State */}
                {step === 4 && isSuccess && (
                  <motion.div key="step4" variants={formVariants} initial="hidden" animate="visible" className="flex flex-col items-center justify-center h-full text-center py-10">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-sora font-bold text-promaroc-black mb-4">Request Received!</h2>
                    <p className="text-promaroc-dark/70 font-inter mb-8">
                      Thank you for reaching out, {formData.name || 'there'}. Our team will review your property details and get back to you within 24 hours.
                    </p>
                    <button 
                      onClick={() => window.location.href = '/'}
                      className="bg-promaroc-light/50 text-promaroc-black px-6 py-3 rounded-full font-medium hover:bg-promaroc-light transition-colors"
                    >
                      Return Home
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Navigation Buttons for Steps 2 and 3 */}
            {step > 1 && step < 4 && (
              <div className="mt-8 pt-6 border-t border-promaroc-light flex justify-start">
                <button 
                  onClick={prevStep}
                  className="flex items-center gap-2 text-promaroc-dark/60 hover:text-promaroc-black font-medium transition-colors"
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