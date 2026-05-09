import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
// 1. We import our newly created singleton client instead of initializing a new one!
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, mode } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // --- NEW VALIDATION ---
    const existingUser = await prisma.user.findUnique({ where: { email } });
    
    if (mode === 'login' && !existingUser) {
      return NextResponse.json({ error: "No account found. Please sign up." }, { status: 400 });
    }
    if (mode === 'signup' && existingUser) {
      return NextResponse.json({ error: "Account already exists. Please log in." }, { status: 400 });
    }
    // ----------------------

    // 1. Generate a secure 6-digit code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes

    // 2. Delete any old codes for this email so they don't clash
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    });

    // 3. Save the new code to PostgreSQL
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: otp,
        expires,
      },
    });

    // 4. Send the Email
    const transporter = nodemailer.createTransport(process.env.EMAIL_SERVER);
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Your Promaroc Security Code",
      html: `
        <div style="font-family: sans-serif; max-w: 500px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0F3D37;">PROMAROC</h2>
          <p>Here is your secure login code. It will expire in 10 minutes.</p>
          <div style="background: #f4f4f4; padding: 20px; font-size: 28px; font-weight: bold; letter-spacing: 5px; text-align: center; border-radius: 10px;">
            ${otp}
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("OTP Error:", error);
    return NextResponse.json({ error: "Failed to send code" }, { status: 500 });
  }
}