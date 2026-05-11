'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { auth } from "@/auth";

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
  },
});

export async function createProperty(formData: FormData) {
  // 1. Get the current logged-in Admin's ID so we can assign them as the owner
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  // SECURITY: Enforce Prisma Role enum. Block standard USERs.
  if (session.user.role !== "HOST" && session.user.role !== "ADMIN") {
    throw new Error("Forbidden: Only Hosts and Admins can publish properties.");
  }

// 2. Extract Text Data
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const location = formData.get('location') as string;
  const address = formData.get('address') as string;
  const pricePerNight = parseFloat(formData.get('pricePerNight') as string);
  const bedrooms = parseInt(formData.get('bedrooms') as string);
  const bathrooms = parseInt(formData.get('bathrooms') as string);
  const maxGuests = parseInt(formData.get('maxGuests') as string);
  
  // --- NEW FIELDS ---
  const propertyType = formData.get('propertyType') as any; // Cast to Prisma Enum
  const sizeSqmInput = formData.get('sizeSqm') as string;
  const sizeSqm = sizeSqmInput ? parseFloat(sizeSqmInput) : null;
  const buildYearInput = formData.get('buildYear') as string;
  const buildYear = buildYearInput ? parseInt(buildYearInput) : null;
  const videoUrl = formData.get('videoUrl') as string || null;
  // ------------------

  const amenitiesString = formData.get('amenities') as string;
  const amenities = amenitiesString.split(',').map(item => item.trim()).filter(Boolean);

  // 3. Handle Hero Image
  const heroFile = formData.get('heroImage') as File;
  let heroImageUrl = null;
  if (heroFile && heroFile.size > 0) {
    const buffer = Buffer.from(await heroFile.arrayBuffer());
    const uniqueFileName = `prop-hero-${Date.now()}-${heroFile.name.replace(/\s+/g, '-')}`;
    await s3Client.send(new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: uniqueFileName,
      Body: buffer,
      ContentType: heroFile.type,
    }));
    heroImageUrl = `${process.env.R2_PUBLIC_URL}/${uniqueFileName}`;
  }

  // 4. Handle Gallery Images
  const galleryFiles = formData.getAll('gallery') as File[];
  const galleryUrls: string[] = [];
  const validGalleryFiles = galleryFiles.filter(file => file.size > 0);

  if (validGalleryFiles.length > 0) {
    const uploadPromises = validGalleryFiles.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uniqueFileName = `prop-gal-${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: uniqueFileName,
        Body: buffer,
        ContentType: file.type,
      }));
      return `${process.env.R2_PUBLIC_URL}/${uniqueFileName}`;
    });
    const uploadedUrls = await Promise.all(uploadPromises);
    galleryUrls.push(...uploadedUrls);
  }

  // 5. Save to PostgreSQL
  try {
    await prisma.property.create({
      data: {
        title,
        description,
        location,
        address,
        pricePerNight,
        bedrooms,
        bathrooms,
        maxGuests,
        amenities,
        // --- NEW FIELDS ---
        propertyType,
        sizeSqm,
        buildYear,
        videoUrl,
        // ------------------
        heroImage: heroImageUrl,
        galleryImages: galleryUrls,
        ownerId: session.user.id,
        status: "APPROVED",
        isManagedByPromaroc: true 
      }
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to save property.");
  }

  revalidatePath('/admin/properties');
  revalidatePath('/properties');
  redirect('/admin/properties');
}