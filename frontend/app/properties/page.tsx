import { prisma } from "@/lib/prisma";
import PropertiesClient from "./PropertiesClient";

export const metadata = {
  title: "Luxury Stays | Promaroc",
  description: "Discover our exclusive collection of luxury Riads, Villas, and Apartments.",
};

export default async function PropertiesPage() {
  // Fetch only approved & bookable properties, newest first
  const properties = await prisma.property.findMany({
    where: {
      status: "APPROVED",
      isBookable: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-promaroc-black transition-colors duration-300 pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-12 md:mb-20 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-sora font-bold text-promaroc-black dark:text-promaroc-white mb-6">
            Exclusive Stays
          </h1>
          <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed">
            Experience unparalleled luxury in Morocco's finest destinations. From historic Medina Riads to modern architectural Villas.
          </p>
        </div>

        {/* Pass the data to our interactive Client Component */}
        <PropertiesClient initialProperties={properties} />
      </div>
    </div>
  );
}