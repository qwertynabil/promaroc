import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${sora.variable}`}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}