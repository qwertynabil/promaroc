import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Promaroc</h3>
            <p className="text-sm text-slate-400">Smart property management solutions for modern managers.</p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Security</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Documentation</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Community</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Status</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
            <p>&copy; {currentYear} Promaroc Property Management. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}