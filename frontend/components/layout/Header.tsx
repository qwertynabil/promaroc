'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, 
  MonitorSmartphone, 
  Home, 
  TrendingUp, 
  Menu, 
  X, 
  ArrowRight
} from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Apple-style Glassmorphism on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-promaroc-white/80 backdrop-blur-md border-b border-promaroc-light py-4 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 z-50">
          {/* We will replace this with your actual logo icon later, using text for now */}
          <span className="font-sora font-bold text-2xl tracking-tight text-promaroc-green">
            PROMAROC
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-8">
          
          {/* Services Mega Menu Trigger */}
          <div className="group relative">
            <button className="flex items-center gap-1 font-medium text-sm text-promaroc-dark hover:text-promaroc-green transition-colors py-2">
              Services <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>

            {/* The Mega Menu Dropdown */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out">
              <div className="bg-promaroc-white rounded-2xl shadow-xl border border-promaroc-light p-6 grid grid-cols-3 gap-6">
                
                {/* Column 1: Digital */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-promaroc-green font-sora font-bold pb-2 border-b border-promaroc-light">
                    <MonitorSmartphone className="w-5 h-5" />
                    Digital Presence
                  </div>
                  <ul className="space-y-2 text-sm text-promaroc-dark">
                    <li className="hover:text-promaroc-green transition-colors cursor-pointer"><Link href="/services/digital">Websites & Booking Systems</Link></li>
                    <li className="hover:text-promaroc-green transition-colors cursor-pointer"><Link href="/services/digital">OTA Management (Airbnb/Booking)</Link></li>
                    <li className="hover:text-promaroc-green transition-colors cursor-pointer"><Link href="/services/digital">Media Buying & Content</Link></li>
                  </ul>
                </div>

                {/* Column 2: On-Site */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-promaroc-green font-sora font-bold pb-2 border-b border-promaroc-light">
                    <Home className="w-5 h-5" />
                    On-Site Management
                  </div>
                  <ul className="space-y-2 text-sm text-promaroc-dark">
                    <li className="hover:text-promaroc-green transition-colors cursor-pointer"><Link href="/services/onsite">Property Supply & Cleaning</Link></li>
                    <li className="hover:text-promaroc-green transition-colors cursor-pointer"><Link href="/services/onsite">Transport & Logistics</Link></li>
                    <li className="hover:text-promaroc-green transition-colors cursor-pointer"><Link href="/services/onsite">Staff Onboarding & Training</Link></li>
                  </ul>
                </div>

                {/* Column 3: Optimization */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-promaroc-green font-sora font-bold pb-2 border-b border-promaroc-light">
                    <TrendingUp className="w-5 h-5" />
                    Revenue Optimization
                  </div>
                  <ul className="space-y-2 text-sm text-promaroc-dark">
                    <li className="hover:text-promaroc-green transition-colors cursor-pointer"><Link href="/services/revenue">Direct Booking Strategies</Link></li>
                    <li className="hover:text-promaroc-green transition-colors cursor-pointer"><Link href="/services/revenue">Dynamic Pricing & Promos</Link></li>
                    <li className="hover:text-promaroc-green transition-colors cursor-pointer"><Link href="/services/revenue">Identity Separation</Link></li>
                  </ul>
                </div>
                
              </div>
            </div>
          </div>

          <Link href="/projects" className="font-medium text-sm text-promaroc-dark hover:text-promaroc-green transition-colors">
            Projects
          </Link>
          <Link href="/about" className="font-medium text-sm text-promaroc-dark hover:text-promaroc-green transition-colors">
            About Us
          </Link>
        </nav>

        {/* CALL TO ACTION BUTTON */}
        <div className="hidden lg:flex items-center gap-4">
          <Link 
            href="/contact" 
            className="group flex items-center gap-2 bg-promaroc-black text-promaroc-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-promaroc-green transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Optimize My Property
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className="lg:hidden text-promaroc-dark hover:text-promaroc-green transition-colors z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE FULL-SCREEN MENU (Hidden on Desktop) */}
      <div className={`fixed inset-0 bg-promaroc-white z-40 flex flex-col pt-24 px-6 lg:hidden transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <nav className="flex flex-col gap-6 text-xl font-sora font-semibold text-promaroc-dark">
          <Link href="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link href="/projects" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        </nav>
        <div className="mt-10 pt-10 border-t border-promaroc-light">
          <p className="text-sm text-promaroc-dark/70 mb-4">Contact us directly</p>
          <a href="#" className="text-lg font-medium text-promaroc-green flex items-center gap-2">
            Contact Support
          </a>
        </div>
      </div>
    </header>
  );
}