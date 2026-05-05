'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useContactForm } from '@/hooks/useContactForm'

export default function ContactForm() {
  const { formData, handleChange, handleSubmit, message, messageType } = useContactForm()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="p-8 border-slate-200 bg-white shadow-lg">
          <h2 className="text-3xl font-bold mb-2 text-slate-900">Get Started Today</h2>
          <p className="text-slate-600 mb-8">Schedule a demo or ask us any questions about our property management platform.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="border-slate-300 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="border-slate-300 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">Company/Name *</label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company Name"
                  required
                  className="border-slate-300 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="properties" className="block text-sm font-medium text-slate-700 mb-2">Number of Properties</label>
                <Input
                  id="properties"
                  name="properties"
                  value={formData.properties}
                  onChange={handleChange}
                  placeholder="e.g., 5-10"
                  className="border-slate-300 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your property management needs..."
                required
                rows={5}
                className="border-slate-300 focus:border-blue-500 resize-none"
              />
            </div>

            <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Request Demo
            </Button>
          </form>

          {message && (
            <div className={`mt-6 p-4 rounded-lg ${
              messageType === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {message}
            </div>
          )}
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="p-6 border-slate-200 bg-gradient-to-br from-blue-50 to-purple-50">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h3>

          <div className="space-y-6">
            <div className="flex gap-4">
              <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-slate-900">Email</p>
                <p className="text-slate-600">hello@promaroc.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-slate-900">Phone</p>
                <p className="text-slate-600">1-800-PM-TODAY</p>
              </div>
            </div>

            <div className="flex gap-4">
              <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-slate-900">Office</p>
                <p className="text-slate-600">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-slate-200 bg-white">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Response Time</h3>
          <p className="text-slate-600 text-sm">We typically respond to demo requests within 24 hours during business days.</p>
        </Card>
      </div>
    </div>
  )
}
