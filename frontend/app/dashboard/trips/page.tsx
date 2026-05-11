import { auth } from "@/auth";
import { UpgradeButton } from "./UpgradeButton";

export default async function GuestTripsPage() {
  const session = await auth();

  return (
    <div className="p-10 text-promaroc-black dark:text-promaroc-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-sora font-bold">
          Welcome back, {session?.user?.name || 'Guest'}
        </h1>
        {/* The Role Switch Button */}
        <UpgradeButton />
      </div>
      
      <p className="text-black/60 dark:text-promaroc-white/60 mb-8">
        Your upcoming bookings and past trips will appear here.
      </p>

      <div className="bg-white/5 border border-white/10 p-10 rounded-2xl text-center">
        <p className="text-white/50">No upcoming trips yet. Start exploring properties!</p>
      </div>
    </div>
  );
}