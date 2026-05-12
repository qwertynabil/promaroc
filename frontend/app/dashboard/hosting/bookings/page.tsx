import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { updateBookingStatus } from "@/app/actions/bookingActions";
import { Check, X, Calendar as CalendarIcon, Users, MapPin } from "lucide-react";

export default async function HostBookingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // Fetch all bookings for properties owned by this Host
  const propertiesWithBookings = await prisma.property.findMany({
    where: { ownerId: session.user.id },
    include: {
      bookings: {
        include: { guest: true }, // Get the guest's name and details
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  // Flatten the array to just get a clean list of bookings
  const allBookings = propertiesWithBookings.flatMap(p => 
    p.bookings.map(b => ({ ...b, property: p }))
  );

  const pendingBookings = allBookings.filter(b => b.status === "PENDING");
  const confirmedBookings = allBookings.filter(b => b.status === "CONFIRMED");

  const formatDate = (date: Date) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);

  return (
    <div className="text-promaroc-black dark:text-promaroc-white animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      <div className="mb-10">
        <h1 className="text-3xl font-sora font-bold mb-2">Reservations</h1>
        <p className="text-black/60 dark:text-white/60 font-medium">
          Manage incoming booking requests for your properties.
        </p>
      </div>

      {/* ACTION REQUIRED: PENDING BOOKINGS */}
      {pendingBookings.length > 0 && (
        <div className="mb-16">
          <h2 className="text-xl font-sora font-bold mb-6 flex items-center gap-2 text-orange-500">
            Action Required ({pendingBookings.length})
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {pendingBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} formatDate={formatDate} isPending={true} />
            ))}
          </div>
        </div>
      )}

      {/* CONFIRMED BOOKINGS */}
      <div className="mb-12">
        <h2 className="text-xl font-sora font-bold mb-6 flex items-center gap-2 text-promaroc-green">
          Upcoming Guests ({confirmedBookings.length})
        </h2>
        {confirmedBookings.length === 0 ? (
          <p className="text-black/50 dark:text-white/50 bg-white/5 p-6 rounded-2xl border border-white/10">No upcoming guests.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {confirmedBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} formatDate={formatDate} isPending={false} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

// Helper Component for the Booking Card
function BookingCard({ booking, formatDate, isPending }: { booking: any, formatDate: any, isPending: boolean }) {
  const acceptAction = updateBookingStatus.bind(null, booking.id, "CONFIRMED");
  const declineAction = updateBookingStatus.bind(null, booking.id, "CANCELLED");

  return (
    <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-sm">
      
      {/* Guest Avatar & Info */}
      <div className="w-full md:w-48 text-center shrink-0 border-r border-black/5 dark:border-white/5 pr-4">
        <div className="w-16 h-16 bg-black/5 dark:bg-white/10 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">
          {booking.guest.name?.charAt(0) || 'G'}
        </div>
        <div className="font-bold line-clamp-1">{booking.guest.name || 'Guest'}</div>
        <div className="text-xs text-black/50 dark:text-white/50">{booking.guest.email}</div>
      </div>

      {/* Trip Details */}
      <div className="flex-1 w-full">
        <h3 className="text-lg font-bold font-sora mb-1 text-promaroc-green">{booking.property.title}</h3>
        <div className="flex items-center gap-4 text-sm font-medium text-black/60 dark:text-white/60 mb-4">
          <span className="flex items-center gap-1"><CalendarIcon className="w-4 h-4"/> {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</span>
          <span className="flex items-center gap-1"><Users className="w-4 h-4"/> {booking.guestsCount} Guests</span>
        </div>
        <div className="text-xl font-bold font-sora">
          ${booking.totalPrice - booking.serviceFee} <span className="text-xs font-medium text-black/50 dark:text-white/50">(Payout)</span>
        </div>
      </div>

      {/* Action Buttons */}
      {isPending && (
        <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
          <form action={acceptAction} className="flex-1">
            <button className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-promaroc-green text-promaroc-white rounded-xl font-bold hover:bg-[#0a2e29] transition-colors text-sm shadow-sm">
              <Check className="w-4 h-4" /> Accept
            </button>
          </form>
          <form action={declineAction} className="flex-1">
            <button className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl font-bold transition-colors text-sm">
              <X className="w-4 h-4" /> Decline
            </button>
          </form>
        </div>
      )}
    </div>
  );
}