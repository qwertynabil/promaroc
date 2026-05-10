import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-promaroc-black text-promaroc-white border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/logowhite.png"
                alt="Promaroc Logo"
                width={300}
                height={60}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-promaroc-white/60 font-inter leading-relaxed max-w-sm">
              Maximising property performance. Optimising every return through data-driven insights, strategic positioning, and operational excellence.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-sora font-semibold text-lg text-promaroc-white">Services</h4>
            <ul className="space-y-3 text-sm font-inter text-promaroc-white/60">
              <li><Link href="/services/digital" className="hover:text-promaroc-white hover:translate-x-1 transition-all inline-flex items-center">Digital Presence</Link></li>
              <li><Link href="/services/onsite" className="hover:text-promaroc-white hover:translate-x-1 transition-all inline-flex items-center">On-Site Management</Link></li>
              <li><Link href="/services/revenue" className="hover:text-promaroc-white hover:translate-x-1 transition-all inline-flex items-center">Revenue Optimization</Link></li>
              <li><Link href="/services" className="hover:text-promaroc-green transition-colors inline-flex items-center gap-1 mt-2 font-medium text-promaroc-white">View all services <ArrowRight className="w-3 h-3" /></Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-sora font-semibold text-lg text-promaroc-white">Company</h4>
            <ul className="space-y-3 text-sm font-inter text-promaroc-white/60">
              <li><Link href="/projects" className="hover:text-promaroc-white hover:translate-x-1 transition-all inline-block">Our Portfolio</Link></li>
              <li><Link href="/about" className="hover:text-promaroc-white hover:translate-x-1 transition-all inline-block">About Us</Link></li>
              <li><Link href="/login" className="hover:text-promaroc-white hover:translate-x-1 transition-all inline-block">Client Portal</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-sora font-semibold text-lg text-promaroc-white">Connect</h4>
            <ul className="space-y-3 text-sm font-inter text-promaroc-white/60">
              <li><Link href="/contact" className="hover:text-promaroc-white hover:translate-x-1 transition-all inline-block">Contact Us</Link></li>
              <li><a href="https://wa.me/212000000000" target="_blank" rel="noreferrer" className="hover:text-promaroc-white hover:translate-x-1 transition-all inline-block">WhatsApp Chat</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm font-inter text-promaroc-white/40">
            <p>&copy; {currentYear} Promaroc Property Management. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-promaroc-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-promaroc-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}