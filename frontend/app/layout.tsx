import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

// 1. Configure the Body Font (Inter)
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

// 2. Configure the Heading Font (Sora)
const sora = Sora({ 
  subsets: ["latin"],
  weight: ['400', '600', '700'], // We specifically want Sora Bold (700)
  variable: '--font-sora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "PROMAROC | Property Return Optimization",
  description: "Maximising property performance. Optimising every return through data-driven insights, strategic positioning, and operational excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${sora.variable}`}>
        <Header /> {/* Inject the header here */}
        <main className="min-h-screen pt-24"> {/* Add pt-24 so content isn't hidden under the fixed header */}
          {children}
        </main>
      </body>
    </html>
  );
}