'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ReactNode } from 'react';

export default function ConditionalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // Define which base routes are fully enclosed (hide both header and footer)
  const isAppSpace = pathname?.startsWith('/admin') || 
                     pathname?.startsWith('/dashboard');

  // Define auth routes (we want the header here, but no footer)
  const isAuthSpace = pathname?.startsWith('/login') || 
                      pathname?.startsWith('/register');

  return (
    <>
      {!isAppSpace && <Header />}
      <div className="min-h-screen">
        {children}
      </div>
      {!(isAppSpace || isAuthSpace) && <Footer />}
    </>
  );
}