'use server';

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function sendMessage(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const currentUserId = session.user.id;
  const content = formData.get('content') as string;
  const conversationId = formData.get('conversationId') as string | null;
  const propertyId = formData.get('propertyId') as string | null;

  const trimmedContent = content?.trim();
  if (!trimmedContent) return;
  
  if (trimmedContent.length > 2000) throw new Error("Message is too long. Max 2000 characters.");

  let activeConversationId = conversationId;

  // CASE 1: Starting a BRAND NEW chat from the public property page
  if (!conversationId && propertyId) {
    const property = await prisma.property.findUnique({ where: { id: propertyId } });
    if (!property) throw new Error("Property not found");

    if (property.ownerId === currentUserId) {
      throw new Error("You cannot message yourself about your own property.");
    }

    // Check if these two have already chatted about this property
    let existingConv = await prisma.conversation.findFirst({
      where: {
        propertyId: property.id,
        guestId: currentUserId
      }
    });

    if (!existingConv) {
      // Create a new conversation thread
      existingConv = await prisma.conversation.create({
        data: {
          propertyId: property.id,
          guestId: currentUserId,
          hostId: property.ownerId,
        }
      });
    }
    activeConversationId = existingConv.id;
  }

  // CASE 2: Replying to an existing thread
  if (activeConversationId) {
    // Security check: Make sure this user is actually part of this conversation
    const conv = await prisma.conversation.findUnique({
      where: { id: activeConversationId }
    });

    if (!conv || (conv.guestId !== currentUserId && conv.hostId !== currentUserId && session.user.role !== "ADMIN")) {
      throw new Error("Unauthorized to send messages in this thread.");
    }

    // Save the message
    await prisma.message.create({
      data: {
        content: trimmedContent,
        conversationId: activeConversationId,
        senderId: currentUserId
      }
    });
    
    // Update the "updatedAt" timestamp on the conversation so it moves to the top of the inbox
    await prisma.conversation.update({
      where: { id: activeConversationId },
      data: { updatedAt: new Date() }
    });
  }

  // Refresh the inbox data and optionally redirect if it was a new chat
  revalidatePath('/dashboard/messages');
  if (!conversationId && activeConversationId) {
    redirect(`/dashboard/messages?chat=${activeConversationId}`);
  }
}