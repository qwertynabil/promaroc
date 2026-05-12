import { ReactNode } from "react";
import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { 
  Bell, LogOut, Repeat
} from "lucide-react";
import { toggleRole } from "@/app/actions/userActions";
import DashboardNavigation from "./DashboardNavigation";
import ThemeToggle from "@/components/ThemeToggle";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  
  if (!session || !session.user?.id) {
    redirect("/login"); 
  }

  // CRITICAL FIX: Always fetch the absolute latest role from the database.
  // This completely prevents the "stale cookie" issue when switching roles!
  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  });

  if (!dbUser) redirect("/login");
  
  const role = dbUser.role;

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#000000] flex flex-col transition-colors duration-300 overflow-hidden">
      
      {/* 1. GLOBAL TOP HEADER */}
      <header className="h-16 bg-white/80 dark:bg-white/5 backdrop-blur-2xl border-b border-black/5 dark:border-white/10 flex items-center justify-between px-6 shrink-0 z-50">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="font-sora font-bold text-lg tracking-tight text-promaroc-black dark:text-promaroc-white hover:text-promaroc-green transition-colors">
            PROMAROC
          </Link>
        </div>
        
        {/* Right Side: Switcher + Profile + Sign Out */}
        <div className="flex items-center gap-4">
          
          {/* THE ROLE SWITCHER */}
          {role !== "ADMIN" && (
            <form action={toggleRole}>
              <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/10 hover:bg-promaroc-green hover:text-promaroc-white dark:hover:bg-promaroc-green text-sm font-bold rounded-full transition-all duration-300 shadow-sm">
                <Repeat className="w-4 h-4" />
                <span className="hidden md:inline">Switch to {role === "HOST" ? "Traveling" : "Hosting"}</span>
              </button>
            </form>
          )}

          <button className="hidden sm:block relative p-2 text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          <ThemeToggle />
          
          <div className="flex items-center gap-3 pl-4 border-l border-black/10 dark:border-white/10">
            <div className="text-right hidden md:block">
              <div className="text-sm font-semibold text-promaroc-black dark:text-promaroc-white leading-none mb-1">{session.user.name}</div>
              <div className="text-xs text-black/50 dark:text-white/50 leading-none capitalize">
                {role === 'USER' ? 'Guest' : role?.toLowerCase()}
              </div>
            </div>
            
            <div className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center font-bold text-sm text-promaroc-black dark:text-promaroc-white overflow-hidden shrink-0">
              {session.user.image ? (
                <img src={session.user.image} alt={session.user.name || "User Avatar"} className="w-full h-full object-cover" />
              ) : (
                session.user.name?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            
            {/* SIGN OUT BUTTON (Server Action) */}
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

      {/* 2. BODY CONTAINER (Sidebar + Main Content) */}
      <div className="flex flex-1 overflow-hidden">
        <DashboardNavigation role={role} />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-10 w-full max-w-7xl mx-auto pb-32">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}