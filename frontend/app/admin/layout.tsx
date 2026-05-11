import { ReactNode } from "react";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { Bell, Building, FolderKanban, Inbox, LayoutDashboard, LogOut, Search, Settings, Users } from "lucide-react";
import AdminNavigation from "./AdminNavigation";
export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Double-security: Ensure only Admins can even load this layout
  const session = await auth();
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard"); // Kick unauthorized users back to the client dashboard
  }

  return (
    <div className="h-screen overflow-hidden bg-[#f5f5f7] dark:bg-[#000000] flex flex-col transition-colors duration-300">
      {/* Admin Top Header */}
      <header className="h-16 bg-white/80 dark:bg-white/5 backdrop-blur-2xl border-b border-black/5 dark:border-white/10 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-promaroc-black dark:bg-promaroc-white rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-promaroc-white dark:text-promaroc-black font-sora font-bold text-sm">P</span>
          </div>
          <span className="font-sora font-semibold text-sm tracking-wide text-promaroc-black dark:text-promaroc-white">Promaroc OS</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-full border border-black/5 dark:border-white/5 focus-within:ring-2 ring-promaroc-green/20 transition-all">
            <Search className="w-4 h-4 text-black/40 dark:text-white/40" />
            <input type="text" placeholder="Search..." className="bg-transparent text-sm outline-none w-48 text-black/70 dark:text-white/70 placeholder:text-black/40 dark:placeholder:text-white/40" />
          </div>
          <button className="relative p-2 text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-promaroc-orange rounded-full border-2 border-white dark:border-[#0a0a0a]"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-promaroc-green to-promaroc-orange p-[2px]">
            <div className="w-full h-full bg-white dark:bg-black rounded-full flex items-center justify-center overflow-hidden">
              {session.user.image ? (
                <img src={session.user.image} alt={session.user.name || "Admin Avatar"} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] font-bold text-promaroc-black dark:text-promaroc-white">{session.user.name?.charAt(0).toUpperCase() || 'A'}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <AdminNavigation bottomActions={
          <>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl text-black/60 dark:text-white/60 hover:text-promaroc-black dark:hover:text-promaroc-white hover:bg-black/5 dark:hover:bg-white/5 transition-all mb-1">
            <Settings className="w-4 h-4" />
            Settings
          </Link>
          <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}>
            <button type="submit" className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
          </>
        } />

        {/* Main Workspace */}
        <main className="flex-1 p-8 md:p-12 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/10 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-black/20 dark:hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
          <div className="max-w-6xl mx-auto pb-20">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}