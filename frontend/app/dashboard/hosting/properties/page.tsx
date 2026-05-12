import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, MapPin, Calendar, Home } from "lucide-react";

export default async function HostPropertiesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // Fetch all properties owned by this Host
  const properties = await prisma.property.findMany({
    where: { 
      ownerId: session.user.id 
    },
    include: {
      bookings: true
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="text-promaroc-black dark:text-promaroc-white animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-sora font-bold mb-2">
            My Listings
          </h1>
          <p className="text-black/60 dark:text-white/60 font-medium">
            Manage your property portfolio and track their status.
          </p>
        </div>
        
        <Link href="/dashboard/hosting/properties/new" className="bg-promaroc-green text-promaroc-white px-6 py-3 rounded-xl font-bold hover:bg-[#0a2e29] transition-all flex items-center gap-2 shadow-lg shadow-promaroc-green/20 w-fit">
          <Plus className="w-5 h-5" /> Add Property
        </Link>
      </div>

      {/* Properties List */}
      {properties.length === 0 ? (
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-16 rounded-3xl text-center shadow-sm max-w-2xl mx-auto mt-12">
          <div className="w-20 h-20 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-black/40 dark:text-white/40">
            <Home className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-sora font-bold mb-3">No listings yet</h3>
          <p className="text-black/50 dark:text-white/50 mb-8 text-lg">Your property portfolio is empty. List your first property to start welcoming guests.</p>
          <Link href="/dashboard/hosting/properties/new" className="bg-promaroc-black text-promaroc-white dark:bg-promaroc-white dark:text-promaroc-black px-8 py-3.5 rounded-xl font-bold hover:scale-105 transition-all inline-block">
            Create a listing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
              
              {/* Image */}
              <div className="w-full h-48 bg-black/5 dark:bg-white/5 relative overflow-hidden shrink-0">
                {property.heroImage ? (
                  <img src={property.heroImage} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-black/20 dark:text-white/20">No Image</div>
                )}
                
                {/* Status Pill overlay */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md ${
                    property.status === 'APPROVED' ? 'bg-promaroc-green/90 text-white' : 
                    property.status === 'PENDING' ? 'bg-orange-500/90 text-white' : 
                    'bg-red-500/90 text-white'
                  }`}>
                    {property.status}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="text-xs font-bold text-promaroc-green mb-2 uppercase tracking-wider">
                  {property.propertyType}
                </div>
                <h3 className="text-xl font-bold font-sora mb-2 line-clamp-1 group-hover:text-promaroc-green transition-colors">{property.title}</h3>
                
                <div className="flex items-center gap-2 text-sm text-black/50 dark:text-white/50 font-medium mb-6">
                  <MapPin className="w-4 h-4" /> <span className="line-clamp-1">{property.location}</span>
                </div>

                <div className="mt-auto pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-sm font-medium">
                  <div className="flex items-center gap-2 text-black/60 dark:text-white/60">
                    <Calendar className="w-4 h-4" />
                    {property.bookings.length} Bookings
                  </div>
                  <div className="text-promaroc-black dark:text-promaroc-white">
                    <span className="font-bold text-lg">${property.pricePerNight}</span> <span className="text-xs opacity-60">/ night</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}