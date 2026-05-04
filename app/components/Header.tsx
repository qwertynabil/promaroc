'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-out ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-700/20 shadow-sm'
          : 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group relative z-10"
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent group-hover:from-green-500 group-hover:to-blue-500 transition-all duration-300 ease-out transform group-hover:scale-105">
              Promaroc
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 ease-out group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></div>
              </Link>
            ))}
          </nav>

          {/* CTA Button + Theme Toggle + Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            <Link
              href="/contact"
              className="hidden md:inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-green-600 to-blue-600 text-white text-sm font-semibold rounded-full hover:from-green-500 hover:to-blue-500 transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 group"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 ease-out group"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5">
                <span
                  className={`absolute block h-0.5 w-5 bg-gray-700 dark:bg-gray-300 transform transition-all duration-300 ease-out ${
                    isMenuOpen ? 'rotate-45 top-2' : 'top-1'
                  }`}
                ></span>
                <span
                  className={`absolute block h-0.5 w-5 bg-gray-700 dark:bg-gray-300 top-2 transition-all duration-300 ease-out ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
                <span
                  className={`absolute block h-0.5 w-5 bg-gray-700 dark:bg-gray-300 transform transition-all duration-300 ease-out ${
                    isMenuOpen ? '-rotate-45 top-2' : 'top-3'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-4 space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 ease-out transform hover:translate-x-1 ${
                  isMenuOpen ? 'animate-in slide-in-from-left-5 fade-in duration-300' : ''
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: 'both'
                }}
              >
                {item.label}
              </Link>
            ))}

            <div className="flex items-center justify-between px-4 py-3">
              <ThemeToggle />
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-blue-600 text-white text-sm font-semibold rounded-full hover:from-green-500 hover:to-blue-500 transition-all duration-300 ease-out transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}