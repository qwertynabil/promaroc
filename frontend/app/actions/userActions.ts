'use server';

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function toggleRole() {
  const session = await auth();
  if (!session?.user?.id) return;

  // Admins shouldn't be toggling, they have the Command Center
  if (session.user.role === "ADMIN") return;

  // 1. Fetch current role directly from DB to prevent cookie staleness
  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  });

  if (!dbUser) return;

  // 2. Flip the role
  const newRole = dbUser.role === "HOST" ? "USER" : "HOST";

  await prisma.user.update({
    where: { id: session.user.id },
    data: { role: newRole }
  });

  // 3. Clear the layout cache and teleport them to the router!
  revalidatePath('/dashboard', 'layout');
  redirect('/dashboard');
}