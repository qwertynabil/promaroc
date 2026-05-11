import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { FolderKanban, Users, Inbox, ArrowUpRight } from 'lucide-react';

export default async function AdminDashboardPage() {
  const session = await auth();

  // Fetch actual data counts from the database in parallel for performance
  const [totalProjects, newLeads, activeClients] = await Promise.all([
    prisma.portfolioProject.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.user.count({ where: { role: 'USER' } })
  ]);

  return (
    <div className="text-promaroc-black dark:text-promaroc-white animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-sora font-bold mb-2 tracking-tight">
          Welcome back, {session?.user?.name?.split(' ')[0] || 'Admin'}
        </h1>
        <p className="text-black/50 dark:text-white/50 font-medium">
          Here's what's happening with your properties today.
        </p>
      </div>

      {/* Placeholder for Admin Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-6 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_4px_25px_rgba(0,0,0,0.08)] transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-30 transition-opacity group-hover:scale-110 duration-500">
            <FolderKanban className="w-16 h-16 text-promaroc-green dark:text-white" />
          </div>
          <div className="relative z-10">
            <div className="text-black/50 dark:text-white/50 text-sm font-medium mb-3">Total Projects</div>
            <div className="flex items-end gap-3">
              <div className="text-4xl font-bold font-sora tracking-tight">{totalProjects}</div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-6 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_4px_25px_rgba(0,0,0,0.08)] transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-30 transition-opacity group-hover:scale-110 duration-500">
            <Users className="w-16 h-16 text-promaroc-orange dark:text-white" />
          </div>
          <div className="relative z-10">
            <div className="text-black/50 dark:text-white/50 text-sm font-medium mb-3">Active Clients</div>
            <div className="flex items-end gap-3">
              <div className="text-4xl font-bold font-sora tracking-tight">{activeClients}</div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-6 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_4px_25px_rgba(0,0,0,0.08)] transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-30 transition-opacity group-hover:scale-110 duration-500">
            <Inbox className="w-16 h-16 text-promaroc-green dark:text-white" />
          </div>
          <div className="relative z-10">
            <div className="text-black/50 dark:text-white/50 text-sm font-medium mb-3">New Leads</div>
            <div className="flex items-end gap-3">
              <div className="text-4xl font-bold font-sora tracking-tight text-promaroc-green dark:text-promaroc-white">{newLeads}</div>
              {newLeads > 0 && (
                <div className="flex items-center text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400 px-2 py-1 rounded-full mb-1">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  New
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity / Quick Overview */}
      <div className="mt-10 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] dark:shadow-none">
        <h3 className="text-lg font-sora font-semibold mb-6">Quick Overview</h3>
        <div className="flex items-center justify-center py-12 text-black/40 dark:text-white/40 text-sm font-medium border-2 border-dashed border-black/5 dark:border-white/10 rounded-2xl">
          More insights and charts will appear here.
        </div>
      </div>
    </div>
  );
}