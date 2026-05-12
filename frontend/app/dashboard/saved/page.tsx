import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Heart, MapPin } from "lucide-react";

export default async function SavedStaysPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // Fetch all saved properties for this user
  const savedItems = await prisma.savedProperty.findMany({
    where: { userId: session.user.id },
    include: {
      property: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="text-promaroc-black dark:text-promaroc-white animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      <div className="mb-10">
        <h1 className="text-3xl font-sora font-bold mb-2">Saved Stays</h1>
        <p className="text-black/60 dark:text-white/60 font-medium">
          Your personal wishlist of favorite properties across Morocco.
        </p>
      </div>

      {savedItems.length === 0 ? (
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-16 rounded-3xl text-center shadow-sm max-w-2xl mx-auto mt-12">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
            <Heart className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-sora font-bold mb-3">No saved stays yet</h3>
          <p className="text-black/50 dark:text-white/50 mb-8 text-lg">As you search, click the heart icon to save your favorite properties and riads to compare them later.</p>
          <Link href="/properties" className="bg-promaroc-black text-promaroc-white dark:bg-promaroc-white dark:text-promaroc-black px-8 py-3.5 rounded-xl font-bold hover:scale-105 transition-all inline-block">
            Start Exploring
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedItems.map(({ property }) => (
            <Link href={`/properties/${property.id}`} key={property.id} className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
              
              {/* Image */}
              <div className="w-full h-56 bg-black/5 dark:bg-white/5 relative overflow-hidden shrink-0">
                {property.heroImage ? (
                  <img src={property.heroImage} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-black/20 dark:text-white/20">No Image</div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md p-2 rounded-full text-red-500 shadow-lg">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="text-xs font-bold text-promaroc-green mb-2 uppercase tracking-wider">
                  {property.propertyType}
                </div>
                <h3 className="text-xl font-bold font-sora mb-2 line-clamp-1 group-hover:text-promaroc-green transition-colors">{property.title}</h3>
                <div className="flex items-center gap-2 text-sm text-black/50 dark:text-white/50 font-medium mb-4">
                  <MapPin className="w-4 h-4" /> <span className="line-clamp-1">{property.location}</span>
                </div>
                <div className="mt-auto pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-sm font-medium">
                  <div className="text-promaroc-black dark:text-promaroc-white">
                    <span className="font-bold text-lg">${property.pricePerNight}</span> <span className="text-xs opacity-60">/ night</span>
                  </div>
                </div>
              </div>

            </Link>
          ))}
        </div>
      )}

    </div>
  );
}