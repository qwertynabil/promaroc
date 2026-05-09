import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ClientDashboardPage() {
  const session = await auth();

  // 1. Tell TypeScript: If there is no session OR no user inside it, kick them out
  if (!session || !session.user) {
    redirect("/login");
  }

  // 2. TypeScript now knows `session.user` is 100% safe to use below!
  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }

  // 3. Client Dashboard
  return (
    <div className="p-10 text-promaroc-black dark:text-promaroc-white">
      <h1 className="text-3xl font-sora font-bold mb-4">
        Welcome back, {session.user.name || 'Client'}
      </h1>
      <p className="text-black/60 dark:text-promaroc-white/60">
        Your property performance metrics will appear here.
      </p>
    </div>
  );
}