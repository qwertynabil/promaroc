import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { prisma } from "@/lib/prisma"

// ... existing imports
import bcrypt from "bcryptjs"; // ADD THIS IMPORT

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: { signIn: '/login' },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" }, // Added Password
        code: { type: "text" },
        mode: { type: "text" }, // 'login' or 'signup'
        name: { type: "text" },
        phone: { type: "text" },
        country: { type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;
        const mode = credentials.mode as string;

        let user = await prisma.user.findUnique({ where: { email } });

        // --- SIGN UP FLOW ---
        if (mode === 'signup') {
          const code = credentials.code as string;
          if (!code) throw new Error("Verification code is required");

          // 1. Verify OTP
          const verificationToken = await prisma.verificationToken.findFirst({
            where: { identifier: email, token: code },
          });

          if (!verificationToken || verificationToken.expires < new Date()) {
            throw new Error("Invalid or expired code");
          }

          // 2 & 3. Hash Password, Delete Token, & Create User in a Transaction
          if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await prisma.$transaction(async (tx) => {
              await tx.verificationToken.delete({
                where: { identifier_token: { identifier: email, token: code } },
              });
              
              return tx.user.create({
                data: {
                  email,
                  password: hashedPassword,
                  name: credentials.name as string,
                  phone: credentials.phone as string,
                  country: credentials.country as string,
                  role: "USER"
                },
              });
            });
          } else {
            // If somehow the user already exists during a signup flow, just consume the token
            await prisma.verificationToken.delete({
              where: { identifier_token: { identifier: email, token: code } },
            });
          }
          return user;
        }

        // --- LOG IN FLOW ---
        if (mode === 'login') {
          if (!user || !user.password) throw new Error("Invalid email or password");

          // Compare the typed password with the hashed one in the database
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) throw new Error("Invalid email or password");

          return user;
        }

        return null;
      }
    })
  ],
  // ... keep callbacks the same

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
})