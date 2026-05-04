'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, MouseEvent } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Spotlight tracking state
  const headerRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navItems = [
    { label: 'Platform', href: '/' },
    { label: 'Analytics', href: '/about' },
    { label: 'Connect', href: '/contact' }
  ];

  // Track scroll for morphing effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse for the spotlight effect
  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <>
      {/* 
        THE SPOTLIGHT HEADER 
        Tracks the mouse cursor to draw a soft glow behind the glass
      */}
      <header
        ref={headerRef}
        onMouseMove={handleMouseMove}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out overflow-hidden ${
          isScrolled 
            ? 'py-3' 
            : 'py-6'
        }`}
      >
        {/* The Glass Panel that morphs in on scroll */}
        <div 
          className={`absolute inset-x-4 md:inset-x-8 top-0 bottom-0 mx-auto max-w-7xl rounded-2xl transition-all duration-500 ease-out ${
            isScrolled 
              ? 'bg-zinc-950/40 backdrop-blur-xl border border-white/10 shadow-2xl' 
              : 'bg-transparent border-transparent'
          }`}
        >
          {/* Interactive Mouse Spotlight */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.08), transparent 40%)`
            }}
          />
        </div>

        {/* Header Content */}
        <div className="relative max-w-7xl mx-auto px-8 md:px-12 flex justify-between items-center h-12">
          
          {/* Logo */}
          <Link href="/" className="relative z-10 group">
            <span className="text-2xl font-bold tracking-tighter text-white">
              Pro<span className="text-zinc-500 transition-colors duration-300 group-hover:text-amber-400">maroc</span>
            </span>
          </Link>

          {/* Desktop Nav - Hover Pill Effect */}
          <nav className="hidden md:flex items-center space-x-2 bg-white/5 rounded-full px-2 py-1 backdrop-blur-md border border-white/5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-6 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-300 rounded-full hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <Link
              href="/contact"
              className="hidden md:inline-flex relative items-center justify-center px-6 py-2 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              Get Started
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-12 h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-white z-[60] focus:outline-none"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <span className={`h-0.5 bg-current rounded-full transform transition-all duration-300 origin-right ${isMenuOpen ? '-rotate-45 -translate-x-1' : ''}`} />
                <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`h-0.5 bg-current rounded-full transform transition-all duration-300 origin-right ${isMenuOpen ? 'rotate-45 -translate-x-1' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* 
        RADIAL WIPE MOBILE MENU 
        Uses clip-path to expand from the top right corner perfectly
      */}
      <div
        className="fixed inset-0 z-50 bg-zinc-950 flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.86,0,0.07,1)]"
        style={{
          clipPath: isMenuOpen ? 'circle(150% at 90% 10%)' : 'circle(0% at 90% 10%)',
          pointerEvents: isMenuOpen ? 'auto' : 'none'
        }}
      >
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.05),transparent_50%)]" />

        <nav className="relative z-10 flex flex-col items-center space-y-8 w-full px-6">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-5xl font-semibold tracking-tighter text-white hover:text-amber-400 transition-all duration-500 transform ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100 + 300}ms` }}
            >
              {item.label}
            </Link>
          ))}

          <div
            className={`pt-12 transform transition-all duration-700 delay-700 ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="px-10 py-4 bg-white text-black text-lg font-semibold rounded-full hover:bg-zinc-200 transition-all duration-300 inline-block"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}