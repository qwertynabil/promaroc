'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, KeyRound, ChevronLeft, User, Phone, Globe, Lock } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '', password: '', name: '', phone: '', country: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [code, setCode] = useState('');

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(''); // Automatically clear errors when the user starts typing again
  };

  // Handle Login (Instant) OR Request Signup Code
  const handlePrimarySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setError('');

    try {
      if (mode === 'login') {
        // INSTANT LOGIN WITH PASSWORD
        const res = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          mode: 'login',
          redirect: false,
        });

        if (res?.error) setError(res.error);
        else {
          router.refresh(); // Tells Next.js Server Components to re-fetch the session
          router.push('/dashboard'); // Fast client-side navigation
        }

      } else {
        // SIGNUP: SEND OTP TO VERIFY EMAIL FIRST
        const res = await fetch('/api/auth/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, mode: 'signup' }),
        });

        const data = await res.json();
        if (res.ok) setStep(2);
        else setError(data.error || "Failed to send code.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify Code & Create Account (Signup Only)
  const handleVerifySignupCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setError('');

    try {
      const res = await signIn('credentials', {
        ...formData,
        code,
        mode: 'signup',
        redirect: false,
      });

      if (res?.error) setError("Invalid or expired code.");
      else {
        router.refresh();
        router.push('/dashboard');
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-promaroc-white dark:bg-promaroc-black transition-colors duration-300">
      
      {/* LEFT PANEL - BRANDING (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-promaroc-black overflow-hidden items-end p-12 lg:p-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2000&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-promaroc-black via-promaroc-black/60 to-promaroc-black/10" />
        
        <div className="relative z-10 w-full">
          <blockquote className="space-y-6 max-w-lg mb-12">
            <p className="font-sora text-3xl font-medium leading-tight text-promaroc-white">
              "Promaroc transformed our property's performance, taking our occupancy to 98% and doubling our direct bookings."
            </p>
            <footer className="text-promaroc-white/70 font-inter">
              <div className="font-semibold text-promaroc-white text-lg">Youssef B.</div>
              <div className="text-sm">Owner, Villa Palmeraie</div>
            </footer>
          </blockquote>
        </div>
      </div>

      {/* RIGHT PANEL - AUTHENTICATION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Ambient background glow for mobile */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-promaroc-green/10 dark:bg-white/5 rounded-full blur-[100px] pointer-events-none lg:hidden" />

        <div className="w-full max-w-md relative z-10 flex flex-col">
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, x: 20, filter: 'blur(4px)' }} transition={{ duration: 0.4 }}>
                
                <div className="flex p-1 bg-black/5 dark:bg-white/10 rounded-2xl mb-10 border border-black/5 dark:border-white/5">
                  <button onClick={() => { setMode('login'); setError(''); }} className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${mode === 'login' ? 'bg-white dark:bg-black text-promaroc-black dark:text-promaroc-white shadow-sm' : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white'}`}>Log In</button>
                  <button onClick={() => { setMode('signup'); setError(''); }} className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${mode === 'signup' ? 'bg-white dark:bg-black text-promaroc-black dark:text-promaroc-white shadow-sm' : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white'}`}>Sign Up</button>
                </div>

                {error && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center justify-center font-medium">{error}</motion.div>}

                <form onSubmit={handlePrimarySubmit} className="space-y-5">
                  {mode === 'signup' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-5 overflow-hidden">
                      <div className="relative group">
                        <User className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-black/40 dark:text-white/40 group-focus-within:text-promaroc-green dark:group-focus-within:text-promaroc-white transition-colors" />
                        <input required disabled={isLoading} type="text" value={formData.name} onChange={(e) => updateForm('name', e.target.value)} placeholder="Full Name" className="w-full pl-12 pr-5 py-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-promaroc-black dark:text-promaroc-white focus:border-promaroc-green dark:focus:border-promaroc-white focus:ring-1 focus:ring-promaroc-green dark:focus:ring-white outline-none transition-all placeholder:text-black/40 dark:placeholder:text-white/40 font-medium disabled:opacity-50" />
                      </div>
                      <div className="relative group">
                        <Phone className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-black/40 dark:text-white/40 group-focus-within:text-promaroc-green dark:group-focus-within:text-promaroc-white transition-colors" />
                        <input required disabled={isLoading} type="tel" value={formData.phone} onChange={(e) => updateForm('phone', e.target.value)} placeholder="Phone Number" className="w-full pl-12 pr-5 py-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-promaroc-black dark:text-promaroc-white focus:border-promaroc-green dark:focus:border-promaroc-white focus:ring-1 focus:ring-promaroc-green dark:focus:ring-white outline-none transition-all placeholder:text-black/40 dark:placeholder:text-white/40 font-medium disabled:opacity-50" />
                      </div>
                      <div className="relative group">
                        <Globe className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-black/40 dark:text-white/40 group-focus-within:text-promaroc-green dark:group-focus-within:text-promaroc-white transition-colors" />
                        <input required disabled={isLoading} type="text" value={formData.country} onChange={(e) => updateForm('country', e.target.value)} placeholder="Country" className="w-full pl-12 pr-5 py-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-promaroc-black dark:text-promaroc-white focus:border-promaroc-green dark:focus:border-promaroc-white focus:ring-1 focus:ring-promaroc-green dark:focus:ring-white outline-none transition-all placeholder:text-black/40 dark:placeholder:text-white/40 font-medium disabled:opacity-50" />
                      </div>
                    </motion.div>
                  )}

                  <div className="relative group">
                    <Mail className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-black/40 dark:text-white/40 group-focus-within:text-promaroc-green dark:group-focus-within:text-promaroc-white transition-colors" />
                    <input required disabled={isLoading} type="email" value={formData.email} onChange={(e) => updateForm('email', e.target.value)} placeholder="Email Address" className="w-full pl-12 pr-5 py-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-promaroc-black dark:text-promaroc-white focus:border-promaroc-green dark:focus:border-promaroc-white focus:ring-1 focus:ring-promaroc-green dark:focus:ring-white outline-none transition-all placeholder:text-black/40 dark:placeholder:text-white/40 font-medium disabled:opacity-50" />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-black/40 dark:text-white/40 group-focus-within:text-promaroc-green dark:group-focus-within:text-promaroc-white transition-colors" />
                    <input required disabled={isLoading} minLength={6} type="password" value={formData.password} onChange={(e) => updateForm('password', e.target.value)} placeholder="Password" className="w-full pl-12 pr-5 py-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-promaroc-black dark:text-promaroc-white focus:border-promaroc-green dark:focus:border-promaroc-white focus:ring-1 focus:ring-promaroc-green dark:focus:ring-white outline-none transition-all placeholder:text-black/40 dark:placeholder:text-white/40 font-medium disabled:opacity-50" />
                  </div>

                  <button type="submit" disabled={isLoading} className="w-full mt-4 bg-promaroc-green text-promaroc-white hover:bg-[#0a2e29] dark:bg-promaroc-white dark:text-promaroc-black py-4 rounded-xl font-bold dark:hover:bg-white/80 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-promaroc-green/20 dark:shadow-white/10">
                    {isLoading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Continue')}
                    {!isLoading && <ArrowRight className="w-4 h-4 ml-1" />}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && mode === 'signup' && (
              <motion.div key="step2" initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, x: 20, filter: 'blur(4px)' }} transition={{ duration: 0.4 }} className="text-center">
                <div className="w-20 h-20 bg-promaroc-green/10 dark:bg-white/10 rounded-full flex items-center justify-center text-promaroc-green dark:text-white mx-auto mb-8 border border-promaroc-green/20 dark:border-white/20"><KeyRound className="w-8 h-8" /></div>
                <h2 className="text-3xl font-sora font-bold text-promaroc-black dark:text-promaroc-white mb-3">Check your email</h2>
                <p className="text-black/60 dark:text-promaroc-white/60 text-sm mb-8">Enter the 6-digit code sent to <span className="text-promaroc-black dark:text-promaroc-white">{formData.email}</span></p>

                {error && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center justify-center font-medium">{error}</motion.div>}

                <form onSubmit={handleVerifySignupCode} className="space-y-6">
                  <input type="text" disabled={isLoading} required maxLength={6} value={code} onChange={(e) => { setCode(e.target.value.replace(/\D/g, '')); if (error) setError(''); }} className="w-full text-center text-3xl tracking-[0.75em] px-5 py-5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-promaroc-black dark:text-promaroc-white focus:border-promaroc-green dark:focus:border-promaroc-white focus:ring-2 focus:ring-promaroc-green/50 dark:focus:ring-white/50 outline-none transition-all font-bold placeholder:text-black/20 dark:placeholder:text-white/20 disabled:opacity-50" placeholder="------" />
                  <button type="submit" disabled={isLoading || code.length < 6} className="w-full bg-promaroc-green text-promaroc-white hover:bg-[#0a2e29] dark:bg-promaroc-white dark:text-promaroc-black py-4 rounded-xl font-bold dark:hover:bg-white/80 transition-all duration-300 shadow-lg shadow-promaroc-green/20 dark:shadow-white/10 disabled:opacity-50">
                    Complete Sign Up
                  </button>
                </form>

                <button onClick={() => setStep(1)} className="mt-8 flex items-center justify-center gap-2 w-full text-black/50 dark:text-promaroc-white/50 text-sm font-medium hover:text-promaroc-black dark:hover:text-promaroc-white transition-colors"><ChevronLeft className="w-4 h-4" /> Back to login</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}