import { ReactNode } from "react";

export default function ClientDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-promaroc-white dark:bg-promaroc-black pt-24 transition-colors duration-300">
      {/* Imagine a beautiful Client Top-Nav or Sidebar here */}
      <nav className="border-b border-black/10 dark:border-white/10 px-10 py-4 mb-8">
        <h2 className="text-promaroc-green dark:text-promaroc-white font-sora font-bold tracking-widest uppercase text-sm">
          Client Portal
        </h2>
      </nav>
      
      <main className="container mx-auto">
        {children}
      </main>
    </div>
  );
}