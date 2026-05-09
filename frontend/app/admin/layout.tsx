import { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from 'next/link';
export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Double-security: Ensure only Admins can even load this layout
  const session = await auth();
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard"); // Kick unauthorized users back to the client dashboard
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black flex pt-20 transition-colors duration-300">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-black/10 dark:border-white/10 p-6 hidden md:block">
        <h2 className="text-promaroc-black dark:text-promaroc-white font-sora font-bold mb-10">Command Center</h2>
<ul className="space-y-4 text-sm text-black/60 dark:text-promaroc-white/60">
  <li><Link href="/admin" className="hover:text-promaroc-black dark:hover:text-promaroc-white transition-colors">Overview</Link></li>
  <li><Link href="/admin/projects" className="hover:text-promaroc-black dark:hover:text-promaroc-white transition-colors">Manage Projects</Link></li>
  <li><Link href="/admin/leads" className="hover:text-promaroc-black dark:hover:text-promaroc-white transition-colors">View Leads</Link></li>
  <li><Link href="/admin/users" className="hover:text-promaroc-black dark:hover:text-promaroc-white transition-colors">Users</Link></li>
</ul>      </aside>

      {/* Admin Content Area */}
      <main className="flex-1 p-10 bg-black/5 dark:bg-black/50">
        {children}
      </main>
    </div>
  );
}