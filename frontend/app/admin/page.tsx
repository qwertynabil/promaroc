import { auth } from "@/auth";

export default async function AdminDashboardPage() {
  const session = await auth();

  return (
    <div className="text-promaroc-black dark:text-promaroc-white">
      <h1 className="text-3xl font-sora font-bold mb-4">
        Admin Dashboard
      </h1>
      <p className="text-black/60 dark:text-promaroc-white/60 mb-8">
        Welcome, {session?.user?.name}. You have full system access.
      </p>

      {/* Placeholder for Admin Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 rounded-2xl">
          <div className="text-black/50 dark:text-promaroc-white/50 text-sm mb-2">Total Projects</div>
          <div className="text-3xl font-bold font-sora">12</div>
        </div>
        <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 rounded-2xl">
          <div className="text-black/50 dark:text-promaroc-white/50 text-sm mb-2">Active Clients</div>
          <div className="text-3xl font-bold font-sora">8</div>
        </div>
        <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 rounded-2xl">
          <div className="text-black/50 dark:text-promaroc-white/50 text-sm mb-2">New Leads</div>
          <div className="text-3xl font-bold font-sora text-promaroc-green dark:text-promaroc-white">3</div>
        </div>
      </div>
    </div>
  );
}