'use server';

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createBooking(formData: FormData) {
  const session = await auth();
  
  // 1. Ensure the user is logged in before booking
  if (!session?.user?.id) {
    throw new Error("AUTH_REQUIRED");
  }

  // 2. Extract Data
  const propertyId = formData.get('propertyId') as string;
  const checkIn = new Date(formData.get('checkIn') as string);
  const checkOut = new Date(formData.get('checkOut') as string);
  const guestsCount = parseInt(formData.get('guestsCount') as string);
  const pricePerNight = parseFloat(formData.get('pricePerNight') as string);

  // 3. Server-Side Math (Never trust the client!)
  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (nights <= 0) throw new Error("Check-out must be after check-in.");

  const cleaningFee = 50; // Standard cleaning fee
  const serviceFee = Math.round((nights * pricePerNight) * 0.10); // 10% Promaroc Fee
  const totalPrice = (nights * pricePerNight) + cleaningFee + serviceFee;

  // 4. Double-Booking Protection (Check if dates overlap in DB)
  const existingBooking = await prisma.booking.findFirst({
    where: {
      propertyId,
      status: { not: "CANCELLED" },
      AND: [
        { checkIn: { lt: checkOut } },
        { checkOut: { gt: checkIn } }
      ]
    }
  });

  if (existingBooking) {
    throw new Error("These dates are already booked by someone else.");
  }

  // 5. Create the Booking
  try {
    await prisma.booking.create({
      data: {
        propertyId,
        guestId: session.user.id,
        checkIn,
        checkOut,
        guestsCount,
        pricePerNight,
        cleaningFee,
        serviceFee,
        totalPrice,
        status: "PENDING",     // Waiting for payment/host approval
        paymentStatus: "UNPAID"
      }
    });
  } catch (error) {
    console.error("Booking Error:", error);
    throw new Error("Failed to process booking.");
  }

  // 6. Redirect Guest to their Trips Dashboard
  revalidatePath('/dashboard/trips');
  redirect('/dashboard/trips');
}