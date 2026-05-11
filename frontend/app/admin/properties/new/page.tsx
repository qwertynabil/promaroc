'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Save } from 'lucide-react';
import { createProperty } from '@/app/actions/propertyActions';

export default function NewPropertyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError('');
    try {
      await createProperty(formData);
    } catch (err: any) {
      // Next.js uses errors to trigger redirects. We MUST re-throw it!
      if (err?.message === 'NEXT_REDIRECT' || err?.digest?.startsWith('NEXT_REDIRECT')) {
        throw err;
      }
      setError(err.message || "Failed to create property. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="text-promaroc-black dark:text-promaroc-white max-w-5xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center gap-5 mb-10">
        <Link href="/admin/properties" className="p-3 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors shadow-sm">
          <ChevronLeft className="w-5 h-5 text-black/70 dark:text-white/70" />
        </Link>
        <div>
          <h1 className="text-3xl md:text-4xl font-sora font-bold tracking-tight">Add Property</h1>
          <p className="text-black/50 dark:text-white/50 font-medium mt-1">Create a new bookable listing for your portfolio.</p>
        </div>
      </div>

      <form action={handleSubmit} className="space-y-8">

        {/* Error Banner */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8 flex items-center justify-center font-medium text-sm">
            {error}
          </div>
        )}
        
        {/* Core Details */}
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-8 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] dark:shadow-none space-y-6">
          <h2 className="font-sora font-semibold text-xl mb-2">Property Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-black/70 dark:text-white/70 mb-2">Property Title *</label>
              <input disabled={isLoading} required name="title" type="text" placeholder="e.g. West Square Apartments" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green dark:focus:border-promaroc-white outline-none transition-all placeholder:text-black/40 dark:placeholder:text-white/40 text-promaroc-black dark:text-promaroc-white disabled:opacity-50" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-black/70 dark:text-white/70 mb-2">Description *</label>
              <textarea disabled={isLoading} required name="description" rows={4} placeholder="Describe the property..." className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green dark:focus:border-promaroc-white outline-none transition-all placeholder:text-black/40 dark:placeholder:text-white/40 text-promaroc-black dark:text-promaroc-white resize-none disabled:opacity-50"></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-black/70 dark:text-white/70 mb-2">Location (City/Area) *</label>
              <input disabled={isLoading} required name="location" type="text" placeholder="e.g. New York" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green dark:focus:border-promaroc-white outline-none transition-all placeholder:text-black/40 dark:placeholder:text-white/40 text-promaroc-black dark:text-promaroc-white disabled:opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black/70 dark:text-white/70 mb-2">Full Address</label>
              <input disabled={isLoading} name="address" type="text" placeholder="e.g. 918 Brooklyn Street" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green dark:focus:border-promaroc-white outline-none transition-all placeholder:text-black/40 dark:placeholder:text-white/40 text-promaroc-black dark:text-promaroc-white disabled:opacity-50" />
            </div>
            {/* Add this right after the Full Address input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-black/70 dark:text-white/70 mb-2">Property Type *</label>
              <select disabled={isLoading} required name="propertyType" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green dark:focus:border-promaroc-white outline-none transition-all appearance-none text-promaroc-black dark:text-promaroc-white disabled:opacity-50">
                <option value="APARTMENT">Apartment</option>
                <option value="VILLA">Villa</option>
                <option value="RIAD">Riad</option>
                <option value="BOUTIQUE_HOTEL">Boutique Hotel</option>
                <option value="GUEST_HOUSE">Guest House</option>
                <option value="STUDIO">Studio</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pricing & Capacity */}
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-8 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] dark:shadow-none space-y-6">
          <h2 className="font-sora font-semibold text-xl mb-2">Pricing & Capacity</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-semibold text-black/70 dark:text-white/70 mb-2">Price / Night ($) *</label>
              <input disabled={isLoading} required name="pricePerNight" type="number" min="0" step="0.01" placeholder="299" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green dark:focus:border-promaroc-white outline-none transition-all placeholder:text-black/40 dark:placeholder:text-white/40 text-promaroc-black dark:text-promaroc-white disabled:opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black/70 dark:text-white/70 mb-2">Bedrooms *</label>
              <input disabled={isLoading} required name="bedrooms" type="number" min="0" placeholder="3" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green dark:focus:border-promaroc-white outline-none transition-all placeholder:text-black/40 dark:placeholder:text-white/40 text-promaroc-black dark:text-promaroc-white disabled:opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black/70 dark:text-white/70 mb-2">Bathrooms *</label>
              <input disabled={isLoading} required name="bathrooms" type="number" min="0" placeholder="2" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green dark:focus:border-promaroc-white outline-none transition-all placeholder:text-black/40 dark:placeholder:text-white/40 text-promaroc-black dark:text-promaroc-white disabled:opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black/70 dark:text-white/70 mb-2">Max Guests *</label>
              <input disabled={isLoading} required name="maxGuests" type="number" min="1" placeholder="6" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green dark:focus:border-promaroc-white outline-none transition-all placeholder:text-black/40 dark:placeholder:text-white/40 text-promaroc-black dark:text-promaroc-white disabled:opacity-50" />
            </div>
            {/* Add these right after maxGuests */}
            <div>
              <label className="block text-sm font-semibold text-black/70 dark:text-white/70 mb-2">Size (sqm)</label>
              <input disabled={isLoading} name="sizeSqm" type="number" step="0.1" placeholder="e.g. 236" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green dark:focus:border-promaroc-white outline-none transition-all placeholder:text-black/40 dark:placeholder:text-white/40 text-promaroc-black dark:text-promaroc-white disabled:opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black/70 dark:text-white/70 mb-2">Build Year</label>
              <input disabled={isLoading} name="buildYear" type="number" placeholder="e.g. 2021" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green dark:focus:border-promaroc-white outline-none transition-all placeholder:text-black/40 dark:placeholder:text-white/40 text-promaroc-black dark:text-promaroc-white disabled:opacity-50" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-black/70 dark:text-white/70 mb-2">Video Preview URL (YouTube/Vimeo)</label>
              <input disabled={isLoading} name="videoUrl" type="url" placeholder="https://youtube.com/watch?v=..." className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green dark:focus:border-promaroc-white outline-none transition-all placeholder:text-black/40 dark:placeholder:text-white/40 text-promaroc-black dark:text-promaroc-white disabled:opacity-50" />
            </div>
            <div className="md:col-span-4">
              <label className="block text-sm font-semibold text-black/70 dark:text-white/70 mb-2">Amenities (Comma separated)</label>
              <input disabled={isLoading} required name="amenities" type="text" placeholder="e.g. Air Conditioning, Swimming Pool, WiFi" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:border-promaroc-green dark:focus:border-promaroc-white outline-none transition-all placeholder:text-black/40 dark:placeholder:text-white/40 text-promaroc-black dark:text-promaroc-white disabled:opacity-50" />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-8 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] dark:shadow-none space-y-6">
          <h2 className="font-sora font-semibold text-xl mb-2">Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-black/70 dark:text-white/70 mb-2">Hero Image (Main Cover)</label>
              <div className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus-within:border-promaroc-green focus-within:ring-1 focus-within:ring-promaroc-green transition-all">
                <input disabled={isLoading} required name="heroImage" type="file" accept="image/*" className="w-full text-sm text-black/70 dark:text-white/70 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-black/10 dark:file:bg-white/10 file:text-promaroc-black dark:file:text-promaroc-white hover:file:bg-black/20 dark:hover:file:bg-white/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-black/70 dark:text-white/70 mb-2">Gallery Images (Select multiple)</label>
              <div className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus-within:border-promaroc-green focus-within:ring-1 focus-within:ring-promaroc-green transition-all">
                <input disabled={isLoading} required name="gallery" type="file" accept="image/*" multiple className="w-full text-sm text-black/70 dark:text-white/70 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-black/10 dark:file:bg-white/10 file:text-promaroc-black dark:file:text-promaroc-white hover:file:bg-black/20 dark:hover:file:bg-white/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-end bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-2xl border border-black/5 dark:border-white/10 p-4 rounded-3xl sticky bottom-6 z-10 shadow-2xl">
          <button type="submit" disabled={isLoading} className="bg-promaroc-black text-white dark:bg-white dark:text-black px-8 py-3.5 rounded-xl font-bold hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50">
            <Save className="w-5 h-5" />
            {isLoading ? 'Saving to Cloudflare...' : 'Publish Property'}
          </button>
        </div>

      </form>
    </div>
  );
}