'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
  const title = formData.get('title') as string;
  const slugInput = formData.get('slug') as string;
  const category = formData.get('category') as string;
  const location = formData.get('location') as string;

  // Smart feature: If the admin forgets to type a slug, we auto-generate it from the title!
  // e.g., "Riad Al Maqam" -> "riad-al-maqam"
  const slug = slugInput
    ? slugInput.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    : title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  try {
    await prisma.portfolioProject.create({
      data: {
        title,
        slug,
        category,
        location,
        challenge: formData.get('challenge') as string || null,
        solution: formData.get('solution') as string || null,
        heroImage: formData.get('heroImage') as string || null,
        mainMetricValue: formData.get('mainMetricValue') as string || null,
        mainMetricLabel: formData.get('mainMetricLabel') as string || null,
        clientName: formData.get('clientName') as string || null,
        isPublished: formData.get('isPublished') === 'true', // Checkbox value
      }
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create project. Ensure the slug is unique.");
  }

  // Tell Next.js to clear the cache so the new project appears instantly
  revalidatePath('/admin/projects');
  revalidatePath('/projects'); 
  
  // Send the admin back to the projects list
  redirect('/admin/projects');
}