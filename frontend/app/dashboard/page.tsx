import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardController() {
  const session = await auth();
  if (!session || !session.user?.id) redirect("/login");

  // Fetch the real-time role from the DB
  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  });

  if (!dbUser) redirect("/login");

  const role = dbUser.role;

  // Teleport to the correct view!
  if (role === "ADMIN") redirect("/admin");
  if (role === "HOST") redirect("/dashboard/hosting");
  
  redirect("/dashboard/trips");
}