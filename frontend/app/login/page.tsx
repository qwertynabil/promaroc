'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, KeyRound, ChevronLeft, User, Phone, Globe, Lock } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  
  const [formData, setFormData] = useState({
    email: '', password: '', name: '', phone: '', country: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [code, setCode] = useState('');

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
        else window.location.href = '/dashboard';

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
      else window.location.href = '/dashboard';
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-promaroc-white dark:bg-promaroc-black pt-32 pb-20 flex items-center justify-center relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-promaroc-green/10 dark:bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md px-6 relative z-10">
        <div className="bg-black/5 dark:bg-promaroc-white/5 backdrop-blur-2xl rounded-[2rem] p-8 md:p-10 border border-black/10 dark:border-white/10 shadow-2xl min-h-[450px] flex flex-col">
          
          <div className="text-center mb-8">
            <Link href="/" className="inline-block font-sora font-bold text-2xl tracking-tight text-promaroc-green dark:text-promaroc-white">PROMAROC</Link>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                
                <div className="flex p-1 bg-black/5 dark:bg-white/5 rounded-xl mb-8">
                  <button onClick={() => { setMode('login'); setError(''); }} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === 'login' ? 'bg-promaroc-black text-promaroc-white dark:bg-promaroc-white dark:text-promaroc-black' : 'text-black/50 dark:text-promaroc-white/50 hover:text-black dark:hover:text-promaroc-white'}`}>Log In</button>
                  <button onClick={() => { setMode('signup'); setError(''); }} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === 'signup' ? 'bg-promaroc-black text-promaroc-white dark:bg-promaroc-white dark:text-promaroc-black' : 'text-black/50 dark:text-promaroc-white/50 hover:text-black dark:hover:text-promaroc-white'}`}>Sign Up</button>
                </div>

                {error && <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">{error}</div>}

                <form onSubmit={handlePrimarySubmit} className="space-y-4">
                  {mode === 'signup' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 overflow-hidden">
                      <div className="relative">
                        <User className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-black/40 dark:text-promaroc-white/40" />
                        <input required type="text" value={formData.name} onChange={(e) => updateForm('name', e.target.value)} placeholder="Full Name" className="w-full pl-12 pr-5 py-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 text-promaroc-black dark:text-promaroc-white focus:border-promaroc-green outline-none" />
                      </div>
                      <div className="relative">
                        <Phone className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-black/40 dark:text-promaroc-white/40" />
                        <input required type="tel" value={formData.phone} onChange={(e) => updateForm('phone', e.target.value)} placeholder="Phone Number" className="w-full pl-12 pr-5 py-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 text-promaroc-black dark:text-promaroc-white focus:border-promaroc-green outline-none" />
                      </div>
                      <div className="relative">
                        <Globe className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-black/40 dark:text-promaroc-white/40" />
                        <input required type="text" value={formData.country} onChange={(e) => updateForm('country', e.target.value)} placeholder="Country" className="w-full pl-12 pr-5 py-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 text-promaroc-black dark:text-promaroc-white focus:border-promaroc-green outline-none" />
                      </div>
                    </motion.div>
                  )}

                  <div className="relative">
                    <Mail className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-black/40 dark:text-promaroc-white/40" />
                    <input required type="email" value={formData.email} onChange={(e) => updateForm('email', e.target.value)} placeholder="Email Address" className="w-full pl-12 pr-5 py-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 text-promaroc-black dark:text-promaroc-white focus:border-promaroc-green outline-none" />
                  </div>
                  <div className="relative">
                    <Lock className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-black/40 dark:text-promaroc-white/40" />
                    <input required type="password" value={formData.password} onChange={(e) => updateForm('password', e.target.value)} placeholder="Password" className="w-full pl-12 pr-5 py-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 text-promaroc-black dark:text-promaroc-white focus:border-promaroc-green outline-none" />
                  </div>

                  <button type="submit" disabled={isLoading} className="w-full mt-2 bg-promaroc-black text-promaroc-white dark:bg-promaroc-white dark:text-promaroc-black py-4 rounded-xl font-bold hover:bg-promaroc-green hover:text-promaroc-white dark:hover:bg-white/80 dark:hover:text-promaroc-black transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50">
                    {isLoading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Verify Email')}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && mode === 'signup' && (
              <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="text-center">
                <div className="w-16 h-16 bg-promaroc-green/20 rounded-full flex items-center justify-center text-promaroc-green mx-auto mb-6"><KeyRound className="w-8 h-8" /></div>
                <h2 className="text-2xl font-sora font-bold text-promaroc-black dark:text-promaroc-white mb-2">Verify Email</h2>
                <p className="text-black/60 dark:text-promaroc-white/60 text-sm mb-8">Enter the 6-digit code sent to <span className="text-promaroc-black dark:text-promaroc-white">{formData.email}</span></p>

                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                <form onSubmit={handleVerifySignupCode} className="space-y-4">
                  <input type="text" required maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} className="w-full text-center text-2xl tracking-[0.5em] px-5 py-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 text-promaroc-black dark:text-promaroc-white focus:border-promaroc-green outline-none" placeholder="------" />
                  <button type="submit" disabled={isLoading || code.length < 6} className="w-full bg-promaroc-green text-promaroc-white py-4 rounded-xl font-bold hover:bg-promaroc-black dark:bg-promaroc-white dark:text-promaroc-black dark:hover:bg-white/80 transition-all disabled:opacity-50">
                    Complete Sign Up
                  </button>
                </form>

                <button onClick={() => setStep(1)} className="mt-6 flex items-center justify-center gap-1 w-full text-black/50 dark:text-promaroc-white/50 text-sm hover:text-promaroc-black dark:hover:text-promaroc-white transition-colors"><ChevronLeft className="w-4 h-4" /> Go back</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}