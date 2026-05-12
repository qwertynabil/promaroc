'use server';

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleSaveProperty(propertyId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const userId = session.user.id;

  // Check if it's already saved
  const existingSave = await prisma.savedProperty.findUnique({
    where: {
      userId_propertyId: { userId, propertyId }
    }
  });

  if (existingSave) {
    // If it exists, unsave it
    await prisma.savedProperty.delete({ where: { id: existingSave.id } });
  } else {
    // If it doesn't exist, save it
    await prisma.savedProperty.create({
      data: { userId, propertyId }
    });
  }

  // Refresh the UI everywhere this property appears
  revalidatePath('/properties');
  revalidatePath(`/properties/${propertyId}`);
  revalidatePath('/dashboard/saved');
}