import Header from './components/Header';
import Footer from './components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pt-16">
        {/* Hero Section - Apple Style */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Promaroc
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Smart property management for the modern world
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/25 min-w-[200px]"
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 min-w-[200px]"
                >
                  Learn More
                </Button>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Apple Style */}
        <section className="py-32 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Everything you need to manage properties efficiently and effectively
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Feature Cards - Apple Style */}
              <div className="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tenant Management</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Complete tenant lifecycle management from screening to move-out with automated workflows and comprehensive tracking.
                </p>
              </div>

              <div className="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Financial Tracking</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Automated rent collection, expense tracking, and comprehensive financial reporting for complete transparency.
                </p>
              </div>

              <div className="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Property Analytics</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Data-driven insights with occupancy rates, performance analytics, and market trend analysis for informed decisions.
                </p>
              </div>

              <div className="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Maintenance Coordination</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Streamlined maintenance workflows with work order management, contractor coordination, and emergency response tracking.
                </p>
              </div>

              <div className="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Legal Compliance</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Automated compliance checks, document storage, and regulatory reporting to keep you compliant with local and federal laws.
                </p>
              </div>

              <div className="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Marketing Tools</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Property listing management, virtual tours, and lead generation tools to attract and retain quality tenants.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Apple Style */}
        <section className="py-32 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                Trusted Worldwide
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-bold text-green-600 mb-4 group-hover:scale-110 transition-transform duration-300">10,000+</div>
                <div className="text-lg text-gray-600 dark:text-gray-300">Properties Managed</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">50,000+</div>
                <div className="text-lg text-gray-600 dark:text-gray-300">Happy Tenants</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-bold text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300">99.9%</div>
                <div className="text-lg text-gray-600 dark:text-gray-300">Uptime</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-bold text-orange-600 mb-4 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-lg text-gray-600 dark:text-gray-300">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Apple Style */}
        <section className="py-32 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Join thousands of property managers who have transformed their operations with Promaroc.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 text-xl font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/25 min-w-[250px]"
                >
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 px-10 py-4 text-xl font-semibold rounded-full transition-all duration-300 hover:scale-105 min-w-[250px]"
                >
                  Schedule Demo
                </Button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 text-white dark:from-green-600 dark:via-blue-600 dark:to-purple-700">
          <div className="absolute inset-0 bg-black/20 dark:bg-black/30"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Smart Property Management
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Streamline your property management operations with our comprehensive platform designed for modern property managers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 text-lg font-semibold">
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 text-lg font-semibold">
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Everything You Need to Manage Properties
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Comprehensive tools and features designed to simplify property management for landlords, property managers, and real estate professionals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-green-600 dark:text-green-400">Tenant Management</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Complete tenant lifecycle management from screening to move-out
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Online applications & screening</li>
                    <li>• Lease agreement management</li>
                    <li>• Rent collection & tracking</li>
                    <li>• Maintenance request handling</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-blue-600 dark:text-blue-400">Financial Tracking</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Comprehensive financial management and reporting tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Automated rent collection</li>
                    <li>• Expense tracking & budgeting</li>
                    <li>• Profit & loss reports</li>
                    <li>• Tax document generation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-purple-600 dark:text-purple-400">Property Analytics</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Data-driven insights to optimize your property portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Occupancy rate monitoring</li>
                    <li>• Performance analytics</li>
                    <li>• Market trend analysis</li>
                    <li>• Custom reporting dashboards</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-orange-600 dark:text-orange-400">Maintenance Coordination</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Streamlined maintenance workflow management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Work order management</li>
                    <li>• Contractor coordination</li>
                    <li>• Emergency response tracking</li>
                    <li>• Preventive maintenance scheduling</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-red-600 dark:text-red-400">Legal Compliance</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Stay compliant with local and federal regulations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Automated compliance checks</li>
                    <li>• Document storage & retrieval</li>
                    <li>• Regulatory reporting</li>
                    <li>• Audit trail management</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-green-700 dark:text-green-300">Marketing Tools</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Attract and retain quality tenants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Property listing management</li>
                    <li>• Virtual tours & photos</li>
                    <li>• Social media integration</li>
                    <li>• Lead generation tools</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white dark:from-green-700 dark:to-blue-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Trusted by Property Managers Worldwide
              </h2>
              <p className="text-xl text-green-100">
                Join thousands of property managers who have streamlined their operations with Promaroc
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
                <div className="text-blue-100">Properties Managed</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">50,000+</div>
                <div className="text-blue-100">Happy Tenants</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
                <div className="text-blue-100">Uptime</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div>
        <main>
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Ready to Transform Your Property Management?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Start your free trial today and experience the difference that modern property management software can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg font-semibold">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20 px-8 py-3 text-lg font-semibold">
                Schedule Demo
              </Button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
