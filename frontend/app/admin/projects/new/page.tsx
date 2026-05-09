'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Save, Image as ImageIcon, UploadCloud } from 'lucide-react';
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
    <div className="max-w-5xl mx-auto pb-12 text-promaroc-black dark:text-promaroc-white">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <Link href="/admin/projects" className="p-2.5 bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:text-promaroc-black dark:hover:text-promaroc-white rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-sora font-bold tracking-tight">New Project</h1>
          <p className="text-black/50 dark:text-white/50 text-sm mt-1">Add a new case study to your portfolio</p>
        </div>
      </div>

      {/* The Form */}
      <form action={handleSubmit} className="space-y-8">
        
        {/* Core Info Box */}
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-8 rounded-3xl shadow-sm space-y-8">
          <div className="border-b border-black/5 dark:border-white/10 pb-4">
            <h2 className="text-xl font-sora font-semibold text-promaroc-black dark:text-promaroc-white">Core Details</h2>
            <p className="text-sm text-black/50 dark:text-white/50 mt-1">Basic information about the property.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black/70 dark:text-white/70">Project Title *</label>
              <input required name="title" type="text" placeholder="e.g. Riad Al Maqam" className="w-full bg-black/5 dark:bg-black/50 border border-transparent dark:border-white/10 rounded-2xl px-5 py-4 text-promaroc-black dark:text-promaroc-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:border-promaroc-green dark:focus:border-promaroc-white focus:ring-1 focus:ring-promaroc-green dark:focus:ring-promaroc-white outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black/70 dark:text-white/70">URL Slug (Optional)</label>
              <input name="slug" type="text" placeholder="e.g. riad-al-maqam" className="w-full bg-black/5 dark:bg-black/50 border border-transparent dark:border-white/10 rounded-2xl px-5 py-4 text-promaroc-black dark:text-promaroc-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:border-promaroc-green dark:focus:border-promaroc-white focus:ring-1 focus:ring-promaroc-green dark:focus:ring-promaroc-white outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black/70 dark:text-white/70">Category *</label>
              <div className="relative">
                <select required name="category" className="w-full bg-black/5 dark:bg-black/50 border border-transparent dark:border-white/10 rounded-2xl px-5 py-4 text-promaroc-black dark:text-promaroc-white focus:border-promaroc-green dark:focus:border-promaroc-white focus:ring-1 focus:ring-promaroc-green dark:focus:ring-promaroc-white outline-none transition-all appearance-none">
                  <option value="Riad">Riad</option>
                  <option value="Villa">Villa</option>
                  <option value="Boutique Hotel">Boutique Hotel</option>
                </select>
                <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-black/50 dark:text-white/50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black/70 dark:text-white/70">Location *</label>
              <input required name="location" type="text" placeholder="e.g. Marrakech Medina" className="w-full bg-black/5 dark:bg-black/50 border border-transparent dark:border-white/10 rounded-2xl px-5 py-4 text-promaroc-black dark:text-promaroc-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:border-promaroc-green dark:focus:border-promaroc-white focus:ring-1 focus:ring-promaroc-green dark:focus:ring-promaroc-white outline-none transition-all" />
            </div>
          </div>
        </div>

        {/* Metrics & Media Box */}
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-8 rounded-3xl shadow-sm space-y-8">
          <div className="border-b border-black/5 dark:border-white/10 pb-4">
            <h2 className="text-xl font-sora font-semibold text-promaroc-black dark:text-promaroc-white">Metrics & Media</h2>
            <p className="text-sm text-black/50 dark:text-white/50 mt-1">Highlight the performance and visuals.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black/70 dark:text-white/70">Main Metric Value</label>
              <input name="mainMetricValue" type="text" placeholder="e.g. +45%" className="w-full bg-black/5 dark:bg-black/50 border border-transparent dark:border-white/10 rounded-2xl px-5 py-4 text-promaroc-black dark:text-promaroc-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:border-promaroc-green dark:focus:border-promaroc-white focus:ring-1 focus:ring-promaroc-green dark:focus:ring-promaroc-white outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black/70 dark:text-white/70">Main Metric Label</label>
              <input name="mainMetricLabel" type="text" placeholder="e.g. Revenue Increase" className="w-full bg-black/5 dark:bg-black/50 border border-transparent dark:border-white/10 rounded-2xl px-5 py-4 text-promaroc-black dark:text-promaroc-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:border-promaroc-green dark:focus:border-promaroc-white focus:ring-1 focus:ring-promaroc-green dark:focus:ring-promaroc-white outline-none transition-all" />
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-black/70 dark:text-white/70">Hero Image</label>
              <div className="relative group w-full bg-black/5 dark:bg-black/50 border-2 border-dashed border-black/10 dark:border-white/10 hover:border-promaroc-green dark:hover:border-promaroc-white rounded-2xl p-8 transition-all text-center flex flex-col items-center justify-center cursor-pointer">
                <input 
                  name="heroImage" 
                  type="file" 
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                <div className="bg-white dark:bg-white/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <ImageIcon className="w-6 h-6 text-promaroc-green dark:text-promaroc-white" />
                </div>
                <p className="text-sm font-medium text-promaroc-black dark:text-promaroc-white mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-black/50 dark:text-white/50">SVG, PNG, JPG or GIF (max. 5MB)</p>
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-black/70 dark:text-white/70">Gallery Images (Multiple)</label>
              <div className="relative group w-full bg-black/5 dark:bg-black/50 border-2 border-dashed border-black/10 dark:border-white/10 hover:border-promaroc-green dark:hover:border-promaroc-white rounded-2xl p-8 transition-all text-center flex flex-col items-center justify-center cursor-pointer">
                <input 
                  name="gallery" 
                  type="file" 
                  accept="image/*" 
                  multiple
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                <div className="bg-white dark:bg-white/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <UploadCloud className="w-6 h-6 text-promaroc-green dark:text-promaroc-white" />
                </div>
                <p className="text-sm font-medium text-promaroc-black dark:text-promaroc-white mb-1">Upload gallery images</p>
                <p className="text-xs text-black/50 dark:text-white/50">Select multiple files to upload</p>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Content Box */}
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-8 rounded-3xl shadow-sm space-y-8">
          <div className="border-b border-black/5 dark:border-white/10 pb-4">
            <h2 className="text-xl font-sora font-semibold text-promaroc-black dark:text-promaroc-white">Case Study Story</h2>
            <p className="text-sm text-black/50 dark:text-white/50 mt-1">Describe the problem and your solution.</p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black/70 dark:text-white/70">The Challenge</label>
              <textarea name="challenge" rows={5} placeholder="What problem was the property facing?" className="w-full bg-black/5 dark:bg-black/50 border border-transparent dark:border-white/10 rounded-2xl px-5 py-4 text-promaroc-black dark:text-promaroc-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:border-promaroc-green dark:focus:border-promaroc-white focus:ring-1 focus:ring-promaroc-green dark:focus:ring-promaroc-white outline-none transition-all resize-none leading-relaxed"></textarea>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black/70 dark:text-white/70">The Solution</label>
              <textarea name="solution" rows={5} placeholder="How did Promaroc fix it?" className="w-full bg-black/5 dark:bg-black/50 border border-transparent dark:border-white/10 rounded-2xl px-5 py-4 text-promaroc-black dark:text-promaroc-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:border-promaroc-green dark:focus:border-promaroc-white focus:ring-1 focus:ring-promaroc-green dark:focus:ring-promaroc-white outline-none transition-all resize-none leading-relaxed"></textarea>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="sticky bottom-8 z-50 mt-12">
          <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-black/10 dark:border-white/10 p-4 rounded-3xl shadow-2xl flex items-center justify-between">
            <div className="flex items-center gap-3 ml-4">
              <div className="relative flex items-center">
                <input type="checkbox" id="isPublished" name="isPublished" value="true" className="peer sr-only" />
                <div className="w-11 h-6 bg-black/20 dark:bg-white/20 rounded-full peer peer-checked:bg-promaroc-green dark:peer-checked:bg-promaroc-white transition-colors duration-300"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white dark:bg-black rounded-full transition-transform duration-300 peer-checked:translate-x-5 shadow-sm"></div>
              </div>
              <label htmlFor="isPublished" className="text-sm font-medium text-black/70 dark:text-white/70 cursor-pointer select-none">Publish immediately</label>
            </div>
            
            <button type="submit" disabled={isLoading} className="bg-promaroc-black text-white dark:bg-white dark:text-black px-8 py-3.5 rounded-2xl font-semibold hover:bg-promaroc-green dark:hover:bg-white/90 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
              <Save className="w-5 h-5" />
              {isLoading ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}