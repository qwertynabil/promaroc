'use server';

import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function switchToHost() {
  const currentSession = await auth();
  if (!currentSession?.user?.id) return;

  // Protect Admins: Don't accidentally change an Admin's role!
  if (currentSession.user.role === "ADMIN") return;

  // 1. Update their role in the database
  await prisma.user.update({
    where: { id: currentSession.user.id },
    data: { role: "HOST" }
  });

  // 2. Sign them out to refresh the JWT with their new session role
  await signOut({ redirectTo: "/login" });
}

export async function switchToGuest() {
  const currentSession = await auth();
  if (!currentSession?.user?.id) return;

  if (currentSession.user.role === "ADMIN") return;

  await prisma.user.update({
    where: { id: currentSession.user.id },
    data: { role: "USER" }
  });

  await signOut({ redirectTo: "/login" });
}
