import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Users, Home, TrendingUp, CalendarCheck, Clock } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/login");

  // Fetch all data for platform statistics
  const usersCount = await prisma.user.count();
  const properties = await prisma.property.findMany();
  const bookings = await prisma.booking.findMany({
    include: { property: true, guest: true },
    orderBy: { createdAt: 'desc' }
  });

  // Calculate Platform Metrics
  const activeProperties = properties.filter(p => p.status === "APPROVED").length;
  const pendingProperties = properties.filter(p => p.status === "PENDING").length;
  
  // Platform Revenue is the sum of Promaroc's 10% Service Fee on CONFIRMED and COMPLETED bookings
  const validBookings = bookings.filter(b => b.status === "CONFIRMED" || b.status === "COMPLETED");
  const totalPlatformRevenue = validBookings.reduce((sum, booking) => sum + (booking.serviceFee || 0), 0);

  return (
    <div className="text-promaroc-black dark:text-promaroc-white animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      <div className="mb-10">
        <h1 className="text-3xl font-sora font-bold mb-2">Platform Overview</h1>
        <p className="text-black/60 dark:text-white/60 font-medium">
          Welcome back, Admin. Here is how Promaroc is performing today.
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-promaroc-green/10 text-promaroc-green rounded-xl"><TrendingUp className="w-5 h-5" /></div>
            <div className="text-black/50 dark:text-white/50 font-bold uppercase tracking-wider text-xs">Total Revenue (10% Fee)</div>
          </div>
          <div className="text-4xl font-bold font-sora">${totalPlatformRevenue.toLocaleString()}</div>
        </div>

        <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl"><CalendarCheck className="w-5 h-5" /></div>
            <div className="text-black/50 dark:text-white/50 font-bold uppercase tracking-wider text-xs">Total Bookings</div>
          </div>
          <div className="text-4xl font-bold font-sora">{validBookings.length}</div>
        </div>

        <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl"><Home className="w-5 h-5" /></div>
            <div className="text-black/50 dark:text-white/50 font-bold uppercase tracking-wider text-xs">Live Properties</div>
          </div>
          <div className="text-4xl font-bold font-sora">{activeProperties}</div>
        </div>

        <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl"><Users className="w-5 h-5" /></div>
            <div className="text-black/50 dark:text-white/50 font-bold uppercase tracking-wider text-xs">Total Users</div>
          </div>
          <div className="text-4xl font-bold font-sora">{usersCount}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Alerts & Action Items */}
        <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-sora font-bold mb-6">Action Items</h2>
          
          {pendingProperties > 0 ? (
            <div className="flex items-center justify-between p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl mb-4">
              <div className="flex items-center gap-4">
                <Clock className="w-8 h-8 text-orange-500" />
                <div>
                  <div className="font-bold text-orange-500">Property Approvals</div>
                  <div className="text-sm font-medium text-orange-500/70">{pendingProperties} properties are waiting for review.</div>
                </div>
              </div>
              <Link href="/admin/properties" className="px-4 py-2 bg-orange-500 text-white font-bold rounded-lg text-sm">Review</Link>
            </div>
          ) : (
            <div className="text-black/50 dark:text-white/50 text-sm font-medium">You are all caught up! No pending items.</div>
          )}
        </div>

        {/* Recent Transactions List */}
        <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-sora font-bold mb-6">Recent Transactions</h2>
          <div className="space-y-4">
            {bookings.slice(0, 5).map(booking => (
              <div key={booking.id} className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4 last:border-0 last:pb-0">
                <div>
                  <div className="font-bold mb-1">{booking.property.title}</div>
                  <div className="text-xs text-black/50 dark:text-white/50 font-medium">Guest: {booking.guest.name || booking.guest.email}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-promaroc-green">+${booking.serviceFee}</div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${booking.status === 'CONFIRMED' ? 'text-promaroc-green' : 'text-orange-500'}`}>
                    {booking.status}
                  </div>
                </div>
              </div>
            ))}
            {bookings.length === 0 && <p className="text-sm text-black/50 dark:text-white/50">No bookings yet.</p>}
          </div>
        </div>

      </div>

    </div>
  );
}