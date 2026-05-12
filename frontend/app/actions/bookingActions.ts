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

  // Defense in depth: Check for NaN dates or malicious negative guest requests
  if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) throw new Error("Invalid dates provided.");
  if (guestsCount < 1) throw new Error("At least one guest is required.");

  // 3. Security Check: Never trust client pricing! Fetch the real price from DB.
  const property = await prisma.property.findUnique({ where: { id: propertyId } });
  if (!property) throw new Error("Property not found.");
  if (property.ownerId === session.user.id) throw new Error("You cannot book your own property.");
  
  if (guestsCount > property.maxGuests) throw new Error(`This property only allows up to ${property.maxGuests} guests.`);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (checkIn < today) throw new Error("Check-in date cannot be in the past.");
  
  const pricePerNight = property.pricePerNight;

  // 4. Server-Side Math
  // CRITICAL: Do not use Math.abs(). If checkOut is before checkIn, diffTime MUST be negative!
  const diffTime = checkOut.getTime() - checkIn.getTime();
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (nights <= 0) throw new Error("Check-out must be after check-in.");

  const cleaningFee = 50; // Standard cleaning fee
  const serviceFee = Math.round((nights * pricePerNight) * 0.10); // 10% Promaroc Fee
  const totalPrice = (nights * pricePerNight) + cleaningFee + serviceFee;

  // 5. Double-Booking Protection (Check if dates overlap in DB)
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

  // 6. Create the Booking
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

  // 7. Redirect Guest to their Trips Dashboard
  revalidatePath('/dashboard/trips');
  redirect('/dashboard/trips');
}

// Add this to the bottom of frontend/app/actions/bookingActions.ts

export async function updateBookingStatus(bookingId: string, newStatus: "CONFIRMED" | "CANCELLED") {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  // Verify the booking exists and the logged-in user actually owns the property
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { property: true }
  });

  if (!booking) throw new Error("Booking not found");
  
  if (booking.property.ownerId !== session.user.id && session.user.role !== "ADMIN") {
    throw new Error("Forbidden: You do not own this property.");
  }

  try {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: newStatus },
    });
  } catch (error) {
    console.error("Failed to update booking:", error);
    throw new Error("Failed to update booking status.");
  }

  revalidatePath('/dashboard/hosting/bookings');
  revalidatePath('/dashboard/hosting');
  revalidatePath('/dashboard/trips'); // Ensure the Guest sees the status update instantly
}