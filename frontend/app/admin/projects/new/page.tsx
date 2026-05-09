'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Save } from 'lucide-react';
import { createProject } from '@/app/actions/projectActions';

export default function NewProjectPage() {
  const [isLoading, setIsLoading] = useState(false);

  // We wrap the server action so we can show a loading state on the button
  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await createProject(formData);
    } catch (error) {
      alert("Failed to create project. Ensure the slug is unique.");
      setIsLoading(false);
    }
  };

  return (
    <div className="text-promaroc-white max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/projects" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-sora font-bold">New Project</h1>
          <p className="text-white/50 text-sm">Add a new case study to your portfolio</p>
        </div>
      </div>

      {/* The Form */}
      <form action={handleSubmit} className="space-y-8">
        
        {/* Core Info Box */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-6">
          <h2 className="font-sora font-semibold text-promaroc-green">Core Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-white/70 mb-2">Project Title *</label>
              <input required name="title" type="text" placeholder="e.g. Riad Al Maqam" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green outline-none transition" />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">URL Slug (Optional)</label>
              <input name="slug" type="text" placeholder="e.g. riad-al-maqam" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green outline-none transition" />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Category *</label>
              <select required name="category" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green outline-none transition appearance-none">
                <option value="Riad">Riad</option>
                <option value="Villa">Villa</option>
                <option value="Boutique Hotel">Boutique Hotel</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Location *</label>
              <input required name="location" type="text" placeholder="e.g. Marrakech Medina" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green outline-none transition" />
            </div>
          </div>
        </div>

        {/* Metrics & Media Box */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-6">
          <h2 className="font-sora font-semibold text-promaroc-green">Metrics & Media</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-white/70 mb-2">Main Metric Value</label>
              <input name="mainMetricValue" type="text" placeholder="e.g. +45%" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green outline-none transition" />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Main Metric Label</label>
              <input name="mainMetricLabel" type="text" placeholder="e.g. Revenue Increase" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green outline-none transition" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-white/70 mb-2">Hero Image URL</label>
              <input name="heroImage" type="url" placeholder="https://..." className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green outline-none transition" />
            </div>
          </div>
        </div>

        {/* Case Study Content Box */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-6">
          <h2 className="font-sora font-semibold text-promaroc-green">Case Study Text</h2>
          
          <div>
            <label className="block text-sm text-white/70 mb-2">The Challenge</label>
            <textarea name="challenge" rows={4} placeholder="What problem was the property facing?" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green outline-none transition resize-none"></textarea>
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-2">The Solution</label>
            <textarea name="solution" rows={4} placeholder="How did Promaroc fix it?" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green outline-none transition resize-none"></textarea>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between bg-black border border-white/10 p-4 rounded-2xl sticky bottom-6 z-10 shadow-2xl">
          <div className="flex items-center gap-3 ml-2">
            <input type="checkbox" id="isPublished" name="isPublished" value="true" className="w-5 h-5 accent-promaroc-green" />
            <label htmlFor="isPublished" className="text-sm font-medium cursor-pointer">Publish immediately?</label>
          </div>
          
          <button type="submit" disabled={isLoading} className="bg-promaroc-green text-promaroc-white px-8 py-3 rounded-xl font-bold hover:bg-promaroc-white hover:text-promaroc-black transition-all flex items-center gap-2 disabled:opacity-50">
            <Save className="w-5 h-5" />
            {isLoading ? 'Saving...' : 'Save Project'}
          </button>
        </div>

      </form>
    </div>
  );
}