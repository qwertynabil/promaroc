import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Promaroc - Innovation Meets Excellence',
  description: 'Discover innovative solutions that redefine possibilities.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 font-sans" style={{ fontFamily: 'var(--font-poppins)' }}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
