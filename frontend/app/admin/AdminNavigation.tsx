"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Building, FolderKanban, Inbox, LayoutDashboard, Users, Menu, X } from 'lucide-react';

export default function AdminNavigation({ bottomActions }: { bottomActions: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close the mobile menu automatically when the user navigates
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const links = [
    { href: '/admin', icon: LayoutDashboard, label: 'Overview' },
    { href: '/admin/projects', icon: FolderKanban, label: 'Projects' },
    { href: '/admin/properties', icon: Building, label: 'Properties' },
    { href: '/admin/leads', icon: Inbox, label: 'Leads' },
    { href: '/admin/users', icon: Users, label: 'Users' },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed bottom-6 right-6 z-[60] p-4 bg-promaroc-green text-white rounded-full shadow-xl hover:scale-105 transition-transform"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Background Overlay for Mobile */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[40]"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed md:sticky top-0 md:top-16 left-0 z-[50] h-screen md:h-[calc(100vh-4rem)]
        w-64 bg-white dark:bg-[#0a0a0a] md:bg-white/50 md:dark:bg-white/5 
        backdrop-blur-2xl border-r border-black/5 dark:border-white/10 
        flex flex-col transition-transform duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <nav className="flex-1 px-4 pt-6 space-y-1.5 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/10 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${
                  isActive 
                    ? 'text-promaroc-black dark:text-promaroc-white bg-black/5 dark:bg-white/10 shadow-sm border border-black/5 dark:border-white/5' 
                    : 'text-black/60 dark:text-white/60 hover:text-promaroc-black dark:hover:text-promaroc-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <link.icon className={`w-4 h-4 ${isActive ? 'text-promaroc-green dark:text-promaroc-white' : ''}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions Slot (Allows Server Actions to be passed in) */}
        <div className="p-4 mt-auto border-t border-black/5 dark:border-white/10">
          {bottomActions}
        </div>
      </aside>
    </>
  );
}