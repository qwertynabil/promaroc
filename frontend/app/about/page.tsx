import { Card } from '@/components/ui/card'
import { Target, Users, Zap, CheckCircle } from 'lucide-react'

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'Empower property managers with intelligent tools to simplify operations and maximize profitability.',
    },
    {
      icon: Users,
      title: 'Customer-Focused',
      description: 'Every feature is built based on real feedback from property managers like you.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Continuously evolving with cutting-edge technology and best practices in property management.',
    },
    {
      icon: CheckCircle,
      title: 'Reliability',
      description: 'Enterprise-grade infrastructure ensuring 99.9% uptime and data security.',
    },
  ]

  return (
    <>
      <main className="pt-32 min-h-screen">
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">About Promaroc</h1>
              <p className="text-2xl text-slate-600">Revolutionizing property management for the modern era</p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-slate-900">Our Story</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Promaroc was founded by a team of experienced property managers who recognized a critical gap in the market. Traditional property management was fragmented, inefficient, and frustrating. We set out to build a platform that would change everything.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Today, we serve thousands of property managers worldwide, helping them manage millions of square feet of commercial and residential properties. Our platform has processed billions of dollars in transactions and continues to grow exponentially.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  We believe the future of property management is intelligent, automated, and accessible to everyone—from solo operators to large enterprises.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl h-96 flex items-center justify-center">
                  <div className="text-center text-white space-y-4">
                    <p className="text-5xl font-bold">10K+</p>
                    <p className="text-xl">Property Managers Trust Us</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <Card key={index} className="p-8 border-slate-200 bg-white hover:shadow-lg transition-shadow">
                    <Icon className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{value.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">10K+</p>
                <p className="text-slate-600">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-purple-600 mb-2">50K+</p>
                <p className="text-slate-600">Properties Managed</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-green-600 mb-2">$2B+</p>
                <p className="text-slate-600">Assets Under Management</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-orange-600 mb-2">6+</p>
                <p className="text-slate-600">Years in Business</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Team</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
              We're a diverse team of property management experts, software engineers, and designers united by a mission to transform the industry. Every member is passionate about solving real problems for property managers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-8 border-slate-200 bg-white hover:shadow-lg transition-shadow">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Team Member</h3>
                  <p className="text-slate-600">Expert in property management and innovation</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
