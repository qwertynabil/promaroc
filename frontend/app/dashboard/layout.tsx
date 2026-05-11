import { ReactNode } from "react";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { Bell, LayoutDashboard, Building, Plane, LogOut, ShieldAlert } from "lucide-react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  
  // 1. Fixed the redirect to point to your custom login page
  if (!session || !session.user) {
    redirect("/login"); 
  }

  const role = session.user.role;

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#000000] flex flex-col transition-colors duration-300">
      
      {/* Client Dashboard Header */}
      <header className="h-16 bg-white/80 dark:bg-white/5 backdrop-blur-2xl border-b border-black/5 dark:border-white/10 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-sora font-bold text-lg tracking-tight text-promaroc-black dark:text-promaroc-white">
            PROMAROC
          </Link>
          
          <nav className="hidden md:flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-xl">
            {/* 2. DYNAMIC NAVIGATION: Shows different links based on the user's role */}
            {role === "ADMIN" && (
              <Link href="/admin" className="px-4 py-1.5 text-sm font-medium rounded-lg hover:bg-white dark:hover:bg-[#1a1a1a] text-black/60 dark:text-white/60 hover:text-promaroc-black dark:hover:text-promaroc-white transition-colors flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> Command Center
              </Link>
            )}
            {role === "HOST" || role === "ADMIN" ? (
              <>
                <Link href="/dashboard/hosting" className="px-4 py-1.5 text-sm font-medium rounded-lg hover:bg-white dark:hover:bg-[#1a1a1a] text-black/60 dark:text-white/60 hover:text-promaroc-black dark:hover:text-promaroc-white transition-colors flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" /> Overview
                </Link>
                <Link href="/dashboard/hosting/properties" className="px-4 py-1.5 text-sm font-medium rounded-lg text-black/60 dark:text-white/60 hover:text-promaroc-black dark:hover:text-promaroc-white transition-colors flex items-center gap-2">
                  <Building className="w-4 h-4" /> My Listings
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard/trips" className="px-4 py-1.5 text-sm font-medium rounded-lg hover:bg-white dark:hover:bg-[#1a1a1a] text-black/60 dark:text-white/60 hover:text-promaroc-black dark:hover:text-promaroc-white transition-colors flex items-center gap-2">
                  <Plane className="w-4 h-4" /> My Trips
                </Link>
              </>
            )}
          </nav>
        </div>
        
        {/* User Profile / Bell */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-black/10 dark:border-white/10">
            <div className="text-right hidden md:block">
              <div className="text-sm font-semibold text-promaroc-black dark:text-promaroc-white leading-none mb-1">{session.user.name}</div>
              {/* Added a fallback text in case the role is weirdly missing */}
              <div className="text-xs text-black/50 dark:text-white/50 leading-none capitalize">
                {role === 'USER' ? 'Guest' : role?.toLowerCase()}
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center font-bold text-sm text-promaroc-black dark:text-promaroc-white overflow-hidden">
              {session.user.image ? (
                <img src={session.user.image} alt={session.user.name || "User Avatar"} className="w-full h-full object-cover" />
              ) : (
                session.user.name?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            
            {/* 3. SIGN OUT BUTTON (Server Action) */}
            <form action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}>
              <button type="submit" className="ml-1 p-2 text-red-500/80 hover:text-red-600 hover:bg-red-500/10 dark:hover:bg-red-500/20 rounded-full transition-colors flex items-center justify-center" title="Sign Out">
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Client Content Area */}
      <main className="flex-1 p-6 md:p-10 w-full max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}