import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Home, DollarSign, Users, Plus, MapPin, Calendar } from "lucide-react";

export default async function HostingDashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // 1. Fetch all properties owned by this specific Host
  // We also include their confirmed bookings so we can calculate revenue!
  const properties = await prisma.property.findMany({
    where: { 
      ownerId: session.user.id 
    },
    include: {
      bookings: {
        where: { status: "CONFIRMED" }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  // 2. Calculate the Metrics dynamically
  const activeListings = properties.length;
  let totalEarnings = 0;
  let upcomingGuestsCount = 0;
  const now = new Date();

  properties.forEach((property) => {
    property.bookings.forEach((booking) => {
      totalEarnings += booking.totalPrice;
      // If the check-in date is in the future, count the guests
      if (booking.checkIn > now) {
        upcomingGuestsCount += booking.guestsCount;
      }
    });
  });

  return (
    <div className="text-promaroc-black dark:text-promaroc-white animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-sora font-bold mb-2">
            Host Dashboard
          </h1>
          <p className="text-black/60 dark:text-white/60 font-medium">
            Welcome back, {session.user.name?.split(' ')[0]}. Here is what's happening with your properties.
          </p>
        </div>
        
        {/* Link to a future Host Property Creation form */}
        <Link href="/dashboard/hosting/properties/new" className="bg-promaroc-green text-promaroc-white px-6 py-3 rounded-xl font-bold hover:bg-[#0a2e29] transition-all flex items-center gap-2 shadow-lg shadow-promaroc-green/20 w-fit">
          <Plus className="w-5 h-5" /> Add Property
        </Link>
      </div>

      {/* 3. The Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-promaroc-green/10 text-promaroc-green rounded-xl"><DollarSign className="w-5 h-5" /></div>
            <div className="text-black/50 dark:text-white/50 font-bold uppercase tracking-wider text-xs">Total Earnings</div>
          </div>
          <div className="text-4xl font-bold font-sora">${totalEarnings.toLocaleString()}</div>
        </div>

        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl"><Home className="w-5 h-5" /></div>
            <div className="text-black/50 dark:text-white/50 font-bold uppercase tracking-wider text-xs">Active Listings</div>
          </div>
          <div className="text-4xl font-bold font-sora">{activeListings}</div>
        </div>

        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl"><Users className="w-5 h-5" /></div>
            <div className="text-black/50 dark:text-white/50 font-bold uppercase tracking-wider text-xs">Upcoming Guests</div>
          </div>
          <div className="text-4xl font-bold font-sora">{upcomingGuestsCount}</div>
        </div>
      </div>

      {/* 4. My Properties List */}
      <h2 className="text-2xl font-sora font-bold mb-6">My Properties</h2>
      
      {properties.length === 0 ? (
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-12 rounded-3xl text-center shadow-sm">
          <div className="w-16 h-16 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-black/40 dark:text-white/40">
            <Home className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">No properties yet</h3>
          <p className="text-black/50 dark:text-white/50 mb-6">List your first property to start welcoming guests and earning revenue.</p>
          <Link href="/dashboard/hosting/properties/new" className="text-promaroc-green font-bold hover:underline">
            Create a listing &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {properties.map((property) => (
            <div key={property.id} className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-4 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
              
              <div className="w-full md:w-48 h-32 bg-black/5 dark:bg-white/5 rounded-xl overflow-hidden shrink-0">
                {property.heroImage ? (
                  <img src={property.heroImage} alt={property.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-black/20 dark:text-white/20">No Image</div>
                )}
              </div>
              
              <div className="flex-1 w-full">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold font-sora line-clamp-1">{property.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-black/50 dark:text-white/50 font-medium">
                      <MapPin className="w-4 h-4" /> {property.location}
                    </div>
                  </div>
                  
                  {/* Status Pill */}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
                    property.status === 'APPROVED' ? 'bg-promaroc-green/10 text-promaroc-green border border-promaroc-green/20' : 
                    property.status === 'PENDING' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 
                    'bg-red-500/10 text-red-500 border border-red-500/20'
                  }`}>
                    {property.status}
                  </span>
                </div>

                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-black/5 dark:border-white/10 text-sm font-medium text-black/70 dark:text-white/70">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-black/40 dark:text-white/40" />
                    {property.bookings.length} Bookings
                  </div>
                  <div>
                    <span className="font-bold text-promaroc-black dark:text-promaroc-white">${property.pricePerNight}</span> / night
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