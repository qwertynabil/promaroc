import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MapPin, CalendarDays, Receipt, Plane } from "lucide-react";
import { UpgradeButton } from "./UpgradeButton"; // Your existing button!

export default async function GuestTripsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // 1. Fetch all bookings for this user, including the property details!
  const allBookings = await prisma.booking.findMany({
    where: { 
      guestId: session.user.id 
    },
    include: {
      property: true // This grabs the image, title, and location
    },
    orderBy: { 
      checkIn: "asc" 
    }
  });

  // 2. Separate into Upcoming and Past trips
  const now = new Date();
  const upcomingTrips = allBookings.filter(b => b.checkOut > now);
  const pastTrips = allBookings.filter(b => b.checkOut <= now);

  // Helper to format dates beautifully (e.g., "Oct 12, 2026")
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  };

  return (
    <div className="text-promaroc-black dark:text-promaroc-white animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-sora font-bold mb-2">
            My Trips
          </h1>
          <p className="text-black/60 dark:text-white/60 font-medium">
            Welcome back, {session.user.name?.split(' ')[0] || 'Guest'}. Here are your upcoming stays.
          </p>
        </div>
        
        {/* The Upgrade Button you built earlier! */}
        <UpgradeButton />
      </div>

      {/* UPCOMING TRIPS SECTION */}
      <h2 className="text-2xl font-sora font-bold mb-6">Upcoming Reservations</h2>
      
      {upcomingTrips.length === 0 ? (
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-12 rounded-3xl text-center shadow-sm mb-12">
          <div className="w-16 h-16 bg-promaroc-green/10 text-promaroc-green rounded-full flex items-center justify-center mx-auto mb-4">
            <Plane className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">No upcoming trips</h3>
          <p className="text-black/50 dark:text-white/50 mb-6">It's time to pack your bags. Discover luxury stays across Morocco.</p>
          <Link href="/properties" className="text-promaroc-green font-bold hover:underline">
            Explore Properties &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {upcomingTrips.map((booking) => (
            <div key={booking.id} className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row group">
              
              {/* Property Image */}
              <div className="w-full sm:w-48 h-48 sm:h-auto bg-black/5 dark:bg-white/5 relative overflow-hidden shrink-0">
                {booking.property.heroImage ? (
                  <img src={booking.property.heroImage} alt={booking.property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-black/20 dark:text-white/20">No Image</div>
                )}
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  {booking.status}
                </div>
              </div>
              
              {/* Trip Details */}
              <div className="p-6 flex flex-col flex-1">
                <div className="text-xs font-bold text-promaroc-green mb-1 uppercase tracking-wider">
                  {booking.property.propertyType}
                </div>
                <Link href={`/properties/${booking.propertyId}`}>
                  <h3 className="text-xl font-bold font-sora mb-2 line-clamp-1 hover:text-promaroc-green transition-colors">
                    {booking.property.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 text-sm text-black/50 dark:text-white/50 font-medium mb-4">
                  <MapPin className="w-4 h-4" /> <span className="line-clamp-1">{booking.property.location}</span>
                </div>

                <div className="mt-auto space-y-3">
                  <div className="flex items-center gap-3 text-sm font-medium text-black/70 dark:text-white/70 bg-black/5 dark:bg-white/5 p-3 rounded-xl">
                    <CalendarDays className="w-4 h-4 text-promaroc-green" />
                    <span>{formatDate(booking.checkIn)} <span className="text-black/30 dark:text-white/30 mx-1">&rarr;</span> {formatDate(booking.checkOut)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm font-medium pt-2 border-t border-black/5 dark:border-white/10">
                    <div className="flex items-center gap-2 text-black/60 dark:text-white/60">
                      <Receipt className="w-4 h-4" /> Total
                    </div>
                    <div className="text-lg font-bold text-promaroc-black dark:text-promaroc-white">
                      ${booking.totalPrice}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* PAST TRIPS SECTION */}
      {pastTrips.length > 0 && (
        <>
          <h2 className="text-2xl font-sora font-bold mb-6">Where you've been</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastTrips.map((booking) => (
              <div key={booking.id} className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-5 rounded-3xl flex items-center gap-4 opacity-70 hover:opacity-100 transition-opacity">
                <div className="w-20 h-20 bg-black/5 dark:bg-white/5 rounded-2xl overflow-hidden shrink-0">
                  {booking.property.heroImage && (
                    <img src={booking.property.heroImage} alt={booking.property.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold line-clamp-1">{booking.property.title}</h3>
                  <p className="text-xs text-black/50 dark:text-white/50 font-medium mt-1">{formatDate(booking.checkIn)}</p>
                  <Link href={`/properties/${booking.propertyId}`} className="text-xs font-bold text-promaroc-green mt-2 inline-block">
                    Book again
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
}