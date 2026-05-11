import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Building, Plane, Plus, Users, Wallet } from "lucide-react";
import { switchToGuest } from "@/app/actions/userActions";

export default async function HostDashboardPage() {
  const session = await auth();

  // Extra security check to ensure only Hosts and Admins can see this
  if (session?.user?.role !== "HOST" && session?.user?.role !== "ADMIN") {
    redirect("/dashboard/trips");
  }

  return (
    <div className="text-promaroc-black dark:text-promaroc-white animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-sora font-bold mb-2 tracking-tight">
            Host Overview
          </h1>
          <p className="text-black/50 dark:text-white/50 font-medium">
            Welcome to your hosting command center.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <form action={switchToGuest}>
            <button type="submit" className="bg-black/5 dark:bg-white/5 text-promaroc-black dark:text-promaroc-white px-6 py-3 rounded-xl font-bold hover:bg-black/10 dark:hover:bg-white/10 transition-all flex items-center gap-2">
              <Plane className="w-5 h-5" />
              Switch to Traveling
            </button>
          </form>
          <Link href="/dashboard/hosting/properties/new" className="bg-promaroc-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg">
            <Plus className="w-5 h-5" />
            List Property
          </Link>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-4 mb-4"><div className="p-3 bg-promaroc-green/10 text-promaroc-green rounded-xl"><Wallet className="w-6 h-6" /></div><div className="text-black/50 dark:text-white/50 font-medium">Total Earnings</div></div>
          <div className="text-3xl font-bold font-sora">$0.00</div>
        </div>
        
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-4 mb-4"><div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl"><Building className="w-6 h-6" /></div><div className="text-black/50 dark:text-white/50 font-medium">Active Properties</div></div>
          <div className="text-3xl font-bold font-sora">0</div>
        </div>

        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-4 mb-4"><div className="p-3 bg-promaroc-orange/10 text-promaroc-orange rounded-xl"><Users className="w-6 h-6" /></div><div className="text-black/50 dark:text-white/50 font-medium">Upcoming Guests</div></div>
          <div className="text-3xl font-bold font-sora">0</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-8 shadow-sm">
        <h3 className="text-lg font-sora font-semibold mb-6">Recent Activity</h3>
        <div className="flex flex-col items-center justify-center py-12 text-black/40 dark:text-white/40 text-sm font-medium border-2 border-dashed border-black/5 dark:border-white/10 rounded-2xl">
          <Building className="w-12 h-12 mb-4 opacity-50" />
          <p>You haven't listed any properties yet.</p>
        </div>
      </div>
    </div>
  );
}