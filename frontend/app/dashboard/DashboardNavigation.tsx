'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Building, Plane, 
  ShieldAlert, Calendar, Heart, MessageSquare, 
  Menu, X, ChevronLeft, ChevronRight, LucideIcon 
} from 'lucide-react';

// 1. Strict TypeScript definition for Navigation Items
type NavItem = {
  href: string;
  icon: LucideIcon;
  label: string;
  color: string;
  hoverColor: string;
};

// 2. Moved configurations OUTSIDE the component to prevent re-allocation on every render
const ADMIN_LINKS: NavItem[] = [
  { href: '/admin', icon: ShieldAlert, label: 'Command Center', color: 'text-red-500', hoverColor: 'group-hover:text-red-500' },
];

const HOST_LINKS: NavItem[] = [
  { href: '/dashboard/hosting', icon: LayoutDashboard, label: 'Overview', color: 'text-promaroc-green', hoverColor: 'group-hover:text-promaroc-green' },
  { href: '/dashboard/hosting/properties', icon: Building, label: 'My Listings', color: 'text-blue-500', hoverColor: 'group-hover:text-blue-500' },
  { href: '/dashboard/hosting/bookings', icon: Calendar, label: 'Reservations', color: 'text-orange-500', hoverColor: 'group-hover:text-orange-500' },
];

const GUEST_LINKS: NavItem[] = [
  { href: '/dashboard/trips', icon: Plane, label: 'My Trips', color: 'text-promaroc-green', hoverColor: 'group-hover:text-promaroc-green' },
  { href: '/dashboard/saved', icon: Heart, label: 'Saved Stays', color: 'text-red-500', hoverColor: 'group-hover:text-red-500' },
];

const UNIVERSAL_LINKS: NavItem[] = [
  { href: '/dashboard/messages', icon: MessageSquare, label: 'Messages', color: 'text-purple-500', hoverColor: 'group-hover:text-purple-500' },
];

export default function DashboardNavigation({ role }: { role: string }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  // Auto-close mobile menu when navigating to a new route
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Determine which links to show based on Role
  let primaryLinks: NavItem[] = [];
  if (role === "ADMIN") primaryLinks = [...ADMIN_LINKS, ...HOST_LINKS];
  else if (role === "HOST") primaryLinks = HOST_LINKS;
  else if (role === "USER") primaryLinks = GUEST_LINKS;

  // 3. DRY Component to render links beautifully without duplicating Tailwind classes
  const NavLink = ({ link }: { link: NavItem }) => {
    // Determine active state (exact match OR nested route, avoiding root conflicts)
    const isActive = pathname === link.href || (link.href !== '/admin' && link.href !== '/dashboard/hosting' && pathname.startsWith(link.href + '/'));
    const Icon = link.icon;
    
    return (
      <Link 
        href={link.href} 
        className={`flex items-center text-sm font-bold rounded-2xl transition-all duration-300 group py-3 px-3 justify-start ${
          isDesktopCollapsed ? 'md:justify-center md:px-0' : ''
        } ${
          isActive 
            ? 'text-promaroc-black dark:text-promaroc-white bg-black/5 dark:bg-white/10 shadow-sm border border-black/5 dark:border-white/5' 
            : 'text-black/60 dark:text-white/60 hover:text-promaroc-black dark:hover:text-promaroc-white hover:bg-black/5 dark:hover:bg-white/5'
        }`}
        title={isDesktopCollapsed ? link.label : undefined}
      >
        <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? link.color : `text-black/40 dark:text-white/40 ${link.hoverColor}`}`} />
        <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
            isDesktopCollapsed ? 'md:max-w-0 md:opacity-0 md:ml-0' : 'max-w-[200px] opacity-100 ml-3'
        }`}>
          {link.label}
        </span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label={isMobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileOpen}
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
        fixed md:sticky top-0 left-0 z-[50] h-screen md:h-[calc(100vh-4rem)]
        shrink-0 ${isDesktopCollapsed ? 'w-64 md:w-20' : 'w-64 md:w-64'} bg-white dark:bg-[#0a0a0a] md:bg-white/50 md:dark:bg-black/20 
        backdrop-blur-2xl border-r border-black/5 dark:border-white/10 
        flex flex-col transition-all duration-300 ease-in-out overflow-x-hidden
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Mobile Header Inside Menu */}
        <div className="flex items-center justify-between px-6 py-5 md:hidden border-b border-black/5 dark:border-white/10">
          <span className="font-sora font-bold text-lg tracking-tight text-promaroc-black dark:text-promaroc-white">
            PROMAROC
          </span>
          <button onClick={() => setIsMobileOpen(false)} aria-label="Close menu" className="text-black/50 dark:text-white/50 hover:text-promaroc-black dark:hover:text-promaroc-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/10 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className={`text-[10px] font-bold text-black/40 dark:text-white/40 uppercase tracking-wider overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out max-w-[200px] opacity-100 mb-4 px-3 ${
            isDesktopCollapsed ? 'md:max-w-0 md:opacity-0 md:h-0 md:mb-0 md:px-0' : ''
          }`}>
            {role === "ADMIN" ? "Admin / Host Menu" : role === "HOST" ? "Hosting Menu" : "Guest Menu"}
          </div>

          {/* Render Primary Role-Based Links */}
          {primaryLinks.map((link) => (
            <NavLink key={link.href} link={link} />
          ))}

          <div className="pt-2 mt-2 border-t border-black/5 dark:border-white/10">
            {/* Render Universal Links */}
            {UNIVERSAL_LINKS.map((link) => (
              <NavLink key={link.href} link={link} />
            ))}
          </div>
        </nav>

        {/* NEW: Integrated Collapse Toggle at the bottom */}
        <div className="mt-auto p-4 border-t border-black/5 dark:border-white/10">
          <button
            onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
            className={`hidden md:flex items-center w-full py-3 px-3 justify-start text-sm font-bold rounded-2xl transition-all duration-300 group text-black/60 dark:text-white/60 hover:text-promaroc-black dark:hover:text-promaroc-white hover:bg-black/5 dark:hover:bg-white/5 ${
                isDesktopCollapsed ? 'md:justify-center md:px-0' : ''
            }`}
            title={isDesktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isDesktopCollapsed ? 'rotate-180' : 'rotate-0'}`} />
            <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
              isDesktopCollapsed ? 'md:max-w-0 md:opacity-0 md:ml-0' : 'max-w-[200px] opacity-100 ml-3'
            }`}>
              Collapse
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}