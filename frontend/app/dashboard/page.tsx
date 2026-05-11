import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardController() {
  const session = await auth();

  // 1. Tell TypeScript: If there is no session OR no user inside it, kick them out
  if (!session || !session.user) {
    redirect("/login");
  }

  // 2. Get the user's role
  const role = session.user.role;

  // 3. Admins go straight to the Command Center
  if (role === "ADMIN") {
    redirect("/admin");
  }

  // 4. Hosts go to their Property Management view
  if (role === "HOST") {
    redirect("/dashboard/hosting");
  }

  // 5. Normal Users (Guests) go to their Trips/Bookings view
  redirect("/dashboard/trips");
}