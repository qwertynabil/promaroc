'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// 1. Initialize the Cloudflare R2 Client
const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
  },
});

export async function createProject(formData: FormData) {
  const title = formData.get('title') as string;
  const slugInput = formData.get('slug') as string;
  const category = formData.get('category') as string;
  const location = formData.get('location') as string;

  const slug = slugInput
    ? slugInput.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    : title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // 2. Handle Image Upload
  const imageFile = formData.get('heroImage') as File;
  let heroImageUrl = null;

  if (imageFile && imageFile.size > 0) {
    // Convert the image into a format Node.js can stream
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    
    // Create a unique filename so images don't overwrite each other
    const uniqueFileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;

    try {
      // Send it to Cloudflare!
      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: uniqueFileName,
        Body: buffer,
        ContentType: imageFile.type,
      }));

      // Build the public URL to save in the database
      heroImageUrl = `${process.env.R2_PUBLIC_URL}/${uniqueFileName}`;
    } catch (error) {
      console.error("Cloudflare Upload Error:", error);
      throw new Error("Failed to upload image.");
    }
  }

  // 2. NEW: Handle Multiple Gallery Images
  // formData.getAll() grabs every file attached to the "gallery" input
  const galleryFiles = formData.getAll('gallery') as File[];
  const galleryUrls: string[] = [];

  // Filter out any empty file inputs
  const validGalleryFiles = galleryFiles.filter(file => file.size > 0);

  if (validGalleryFiles.length > 0) {
    // Upload all images to Cloudflare R2 at the exact same time
    const uploadPromises = validGalleryFiles.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uniqueFileName = `gallery-${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      
      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: uniqueFileName,
        Body: buffer,
        ContentType: file.type,
      }));

      return `${process.env.R2_PUBLIC_URL}/${uniqueFileName}`;
    });

    // Wait for all uploads to finish, then save the array of URLs
    const uploadedUrls = await Promise.all(uploadPromises);
    galleryUrls.push(...uploadedUrls);
  }

  // 3. Save to Database
  try {
    await prisma.portfolioProject.create({
      data: {
        title,
        slug,
        category,
        location,
        challenge: formData.get('challenge') as string || null,
        solution: formData.get('solution') as string || null,
        heroImage: heroImageUrl, // WE NOW SAVE THE CLOUDFLARE LINK!
        galleryImages: galleryUrls, // Save the array of Cloudflare links!
        mainMetricValue: formData.get('mainMetricValue') as string || null,
        mainMetricLabel: formData.get('mainMetricLabel') as string || null,
        clientName: formData.get('clientName') as string || null,
        isPublished: formData.get('isPublished') === 'true',
      }
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create project. Ensure the slug is unique.");
  }

  revalidatePath('/admin/projects');
  revalidatePath('/projects'); 
  redirect('/admin/projects');
}