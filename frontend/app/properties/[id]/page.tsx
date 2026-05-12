import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth"; // <-- NEW: Import Auth
import { 
  MapPin, BedDouble, Bath, Users, Maximize, CalendarDays, 
  CheckCircle2, Share, Heart, ChevronRight, PlayCircle 
} from "lucide-react";
import BookingWidget from "./BookingWidget";
import SaveButton from "@/components/ui/SaveButton";

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth(); // <-- NEW: Get the logged-in user

  // Fetch property and the owner's details
  const property = await prisma.property.findUnique({
    where: { id },
    include: { owner: true }
  });

  if (!property) notFound();

  // SECURITY: Who is allowed to see this page?
  const isApproved = property.status === "APPROVED";
  const isAdmin = session?.user?.role === "ADMIN";
  const isOwner = session?.user?.id === property.ownerId;
// Check if the current user has saved this property
  const savedRecord = session?.user?.id ? await prisma.savedProperty.findUnique({
    where: {
      userId_propertyId: { userId: session.user.id, propertyId: property.id }
    }
  }) : null;
  const isInitiallySaved = !!savedRecord;
  // If it's not approved, AND you aren't the Admin, AND you aren't the Owner... kick them out!
  if (!isApproved && !isAdmin && !isOwner) {
    notFound();
  }

  // Combine Hero Image and Gallery Images for the grid
  const allImages = [property.heroImage, ...(property.galleryImages || [])].filter(Boolean) as string[];
  const heroImg = allImages[0] || 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&q=80';
  const gridImages = allImages.slice(1, 5);

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-promaroc-black transition-colors duration-300 pt-28 pb-32">
       {/* NOTE: If the property is NOT approved, show a warning banner at the top so the Admin/Host knows they are in "Preview Mode" */}
       {!isApproved && (
        <div className="bg-orange-500 text-white text-center py-2 text-sm font-bold w-full fixed top-0 z-[100]">
          PREVIEW MODE: This property is currently {property.status} and hidden from the public.
        </div>
      )}      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Breadcrumbs & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 font-medium">
            <Link href="/" className="hover:text-promaroc-green transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/properties" className="hover:text-promaroc-green transition-colors">Stays</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-promaroc-black dark:text-promaroc-white line-clamp-1">{property.title}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm font-semibold text-black/70 dark:text-white/70 hover:text-promaroc-green transition-colors">
              <Share className="w-4 h-4" /> Share
            </button>
<SaveButton 
              propertyId={property.id} 
              initiallySaved={isInitiallySaved} 
              isLoggedIn={!!session?.user?.id} 
            />          </div>
        </div>

        {/* Title Section */}
        <div className="mb-8">
          {property.isManagedByPromaroc && (
            <span className="inline-block bg-promaroc-green/10 text-promaroc-green text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 border border-promaroc-green/20">
              Promaroc Premium
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-sora font-bold text-promaroc-black dark:text-promaroc-white mb-4">
            {property.title}
          </h1>
          <div className="flex items-center gap-2 text-black/60 dark:text-white/60 font-medium text-lg">
            <MapPin className="w-5 h-5 text-promaroc-green" />
            {property.address ? `${property.address}, ` : ''}{property.location}
          </div>
        </div>

        {/* MASSIVE IMAGE GALLERY (Airbnb Style Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-3xl overflow-hidden mb-16 h-[400px] md:h-[600px]">
          {/* Main Hero Image */}
          <div className="md:col-span-2 h-full relative group cursor-pointer">
            <img src={heroImg} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
          </div>
          
          {/* Grid of 4 smaller images */}
          <div className="hidden md:grid col-span-2 grid-cols-2 grid-rows-2 gap-2 h-full">
            {gridImages.map((img, i) => (
              <div key={i} className="relative group cursor-pointer overflow-hidden h-full">
                <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>
            ))}
            {/* If there are less than 4 images, fill the blanks beautifully */}
            {Array.from({ length: Math.max(0, 4 - gridImages.length) }).map((_, i) => (
              <div key={`empty-${i}`} className="bg-black/5 dark:bg-white/5 h-full" />
            ))}
          </div>
        </div>

        {/* TWO-COLUMN CONTENT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* LEFT COLUMN: Details (70%) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Quick Specs Matrix */}
            <div className="flex flex-wrap gap-6 py-6 border-y border-black/10 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-black/5 dark:bg-white/5 rounded-full"><Users className="w-5 h-5 text-promaroc-green" /></div>
                <div><div className="text-xs text-black/50 dark:text-white/50 uppercase font-bold tracking-wider mb-0.5">Guests</div><div className="font-semibold text-promaroc-black dark:text-promaroc-white">{property.maxGuests} Max</div></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-black/5 dark:bg-white/5 rounded-full"><BedDouble className="w-5 h-5 text-promaroc-green" /></div>
                <div><div className="text-xs text-black/50 dark:text-white/50 uppercase font-bold tracking-wider mb-0.5">Bedrooms</div><div className="font-semibold text-promaroc-black dark:text-promaroc-white">{property.bedrooms}</div></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-black/5 dark:bg-white/5 rounded-full"><Bath className="w-5 h-5 text-promaroc-green" /></div>
                <div><div className="text-xs text-black/50 dark:text-white/50 uppercase font-bold tracking-wider mb-0.5">Bathrooms</div><div className="font-semibold text-promaroc-black dark:text-promaroc-white">{property.bathrooms}</div></div>
              </div>
              {property.sizeSqm && (
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-black/5 dark:bg-white/5 rounded-full"><Maximize className="w-5 h-5 text-promaroc-green" /></div>
                  <div><div className="text-xs text-black/50 dark:text-white/50 uppercase font-bold tracking-wider mb-0.5">Size</div><div className="font-semibold text-promaroc-black dark:text-promaroc-white">{property.sizeSqm} sqm</div></div>
                </div>
              )}
              {property.buildYear && (
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-black/5 dark:bg-white/5 rounded-full"><CalendarDays className="w-5 h-5 text-promaroc-green" /></div>
                  <div><div className="text-xs text-black/50 dark:text-white/50 uppercase font-bold tracking-wider mb-0.5">Build Year</div><div className="font-semibold text-promaroc-black dark:text-promaroc-white">{property.buildYear}</div></div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-sora font-bold text-promaroc-black dark:text-promaroc-white mb-6">Overview</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-black/70 dark:text-white/70 leading-relaxed whitespace-pre-line">
                {property.description}
              </div>
            </div>

            {/* Video Preview (If URL exists) */}
            {property.videoUrl && (
              <div>
                <h2 className="text-2xl font-sora font-bold text-promaroc-black dark:text-promaroc-white mb-6">Preview Video</h2>
                <div className="relative aspect-video rounded-3xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center group cursor-pointer">
                  {/* Note: If it's a real youtube link, you can embed an iframe here. For now it's a beautiful thumbnail fallback */}
                  <img src={heroImg} alt="Video Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>
            )}

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <div>
                <h2 className="text-2xl font-sora font-bold text-promaroc-black dark:text-promaroc-white mb-6">Features & Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 text-black/80 dark:text-white/80 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-promaroc-green" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Sticky Booking Widget (30%) */}
            <div className="lg:col-span-1 relative">
            <BookingWidget 
              propertyId={property.id}  // <--- ADD THIS LINE!
              pricePerNight={property.pricePerNight} 
              maxGuests={property.maxGuests} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}