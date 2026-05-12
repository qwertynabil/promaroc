'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { toggleSaveProperty } from '@/app/actions/saveActions';
import { useRouter } from 'next/navigation';

export default function SaveButton({ propertyId, initiallySaved, isLoggedIn }: { propertyId: string, initiallySaved: boolean, isLoggedIn: boolean }) {
  const [isSaved, setIsSaved] = useState(initiallySaved);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    setIsLoading(true);
    // Optimistic UI update (feels instant to the user)
    setIsSaved(!isSaved); 
    
    try {
      await toggleSaveProperty(propertyId);
    } catch (error) {
      // Revert if it fails
      setIsSaved(isSaved);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleToggle}
      disabled={isLoading}
      className="flex items-center gap-2 text-sm font-semibold text-black/70 dark:text-white/70 hover:text-red-500 transition-colors group disabled:opacity-50"
    >
      <Heart className={`w-4 h-4 transition-all ${isSaved ? 'fill-red-500 text-red-500 scale-110' : 'group-hover:scale-110'}`} /> 
      {isSaved ? 'Saved' : 'Save'}
    </button>
  );
}