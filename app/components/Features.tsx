import { Card } from '@/components/ui/card';
import { BarChart, Users, Shield, Zap, FileText, Bell } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: BarChart,
      title: 'Financial Dashboard',
      description: 'Real-time income tracking, expense management, and ROI analytics in one unified dashboard.'
    },
    {
      icon: Users,
      title: 'Tenant Management',
      description: 'Streamline tenant screening, lease management, and communication with built-in messaging.'
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Bank-level encryption, legal compliance tools, and automated audit trails for peace of mind.'
    },
    {
      icon: Zap,
      title: 'Maintenance Tracking',
      description: 'Schedule repairs, track work orders, and manage contractors all in one place.'
    },
    {
      icon: FileText,
      title: 'Document Management',
      description: 'Organize leases, contracts, and critical documents with easy cloud storage and access.'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Never miss rent payments or maintenance issues with intelligent alerts and reminders.'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Powerful Features Built for Property Managers
          </h2>
          <p className="text-xl text-slate-600">
            Everything you need to manage properties efficiently, from financial tracking to tenant relations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-blue-300 bg-white group">
                <Icon className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}