import { ReactNode } from "react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { LayoutDashboard, Building, Plane, Calendar, Repeat, Heart, MessageSquare } from "lucide-react";
import { toggleRole } from "@/app/actions/userActions";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session || !session.user?.id) redirect("/login");

  // CRITICAL FIX: Always fetch the absolute latest role from the database.
  // This completely prevents the "stale cookie" issue and ensures you never have to log out!
  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  });

  if (!dbUser) redirect("/login");
  const role = dbUser.role;

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#000000] flex flex-col md:flex-row transition-colors duration-300">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-72 bg-white/80 dark:bg-[#0a0a0a] backdrop-blur-2xl border-r border-black/5 dark:border-white/10 flex flex-col md:sticky md:top-0 md:h-screen z-50">
        
        {/* Logo Area */}
        <div className="h-20 flex items-center px-8 border-b border-black/5 dark:border-white/10 shrink-0">
          <Link href="/" className="font-sora font-bold text-xl tracking-tight text-promaroc-black dark:text-promaroc-white hover:text-promaroc-green transition-colors">
            PROMAROC
          </Link>
        </div>

        {/* Dynamic Navigation Links */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <div className="text-xs font-bold text-black/40 dark:text-white/40 uppercase tracking-wider mb-4 px-4">
            {role === "HOST" ? "Hosting Menu" : "Guest Menu"}
          </div>

          {role === "HOST" ? (
            <>
              <Link href="/dashboard/hosting" className="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 hover:text-promaroc-black dark:hover:text-promaroc-white transition-all">
                <LayoutDashboard className="w-5 h-5 text-promaroc-green" /> Overview
              </Link>
              <Link href="/dashboard/hosting/properties" className="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 hover:text-promaroc-black dark:hover:text-promaroc-white transition-all">
                <Building className="w-5 h-5 text-blue-500" /> My Listings
              </Link>
              <Link href="/dashboard/hosting/bookings" className="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 hover:text-promaroc-black dark:hover:text-promaroc-white transition-all">
                <Calendar className="w-5 h-5 text-orange-500" /> Reservations
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard/trips" className="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 hover:text-promaroc-black dark:hover:text-promaroc-white transition-all">
                <Plane className="w-5 h-5 text-promaroc-green" /> My Trips
              </Link>
              <Link href="/properties" className="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 hover:text-promaroc-black dark:hover:text-promaroc-white transition-all">
                <Heart className="w-5 h-5 text-red-500" /> Saved Stays (Coming Soon)
              </Link>
              <Link href="/properties" className="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 hover:text-promaroc-black dark:hover:text-promaroc-white transition-all opacity-50 cursor-not-allowed">
                <MessageSquare className="w-5 h-5" /> Host Messages
              </Link>
            </>
          )}
        </nav>

        {/* Bottom Actions: Role Switcher & Profile */}
        <div className="p-4 border-t border-black/5 dark:border-white/10 shrink-0 bg-white/50 dark:bg-black/50">
          
          {role !== "ADMIN" && (
            <form action={toggleRole} className="mb-4">
              <button className="w-full flex items-center justify-between px-4 py-4 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-promaroc-green hover:bg-promaroc-green/10 dark:hover:bg-promaroc-green/20 rounded-2xl transition-all group shadow-sm">
                <div className="flex items-center gap-3 text-sm font-bold text-promaroc-black dark:text-promaroc-white">
                  <Repeat className="w-5 h-5 text-promaroc-green group-hover:rotate-180 transition-transform duration-500" />
                  Switch to {role === "HOST" ? "Traveling" : "Hosting"}
                </div>
              </button>
            </form>
          )}

          {/* User Profile */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/10 text-promaroc-black dark:text-promaroc-white flex items-center justify-center font-bold text-lg shrink-0">
              {session.user.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-promaroc-black dark:text-promaroc-white truncate">{session.user.name}</div>
              <div className="text-xs font-medium text-black/50 dark:text-white/50 truncate">{session.user.email}</div>
            </div>
          </div>

        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <div className="flex-1 p-6 md:p-12 w-full max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}