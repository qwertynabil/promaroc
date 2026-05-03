import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Building2, TrendingUp, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 via-blue-50 to-white pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Manage Your Properties Smarter
              </h1>
              <p className="text-xl text-slate-600">
                All-in-one platform for property management, tenant relations, and financial tracking. Simplify operations and maximize returns.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-slate-900">10K+</p>
                <p className="text-sm text-slate-600">Property Managers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">50K+</p>
                <p className="text-sm text-slate-600">Properties Managed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">$2B+</p>
                <p className="text-sm text-slate-600">Assets Managed</p>
              </div>
            </div>
          </div>
          
          {/* Right Visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center">
              <div className="text-white text-center space-y-4">
                <Building2 size={64} className="mx-auto opacity-80" />
                <p className="text-lg font-semibold">Smart Property Management</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}