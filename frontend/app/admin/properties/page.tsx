import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { updatePropertyStatus } from "@/app/actions/propertyActions";
import { Home, CheckCircle2, XCircle, Eye, Clock, Plus } from "lucide-react";

export default async function AdminPropertiesPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/login");

  // Fetch all properties, including the owner's name/email so the Admin knows who submitted it
  const properties = await prisma.property.findMany({
    include: {
      owner: true,
    },
    orderBy: [
      { status: 'asc' }, // This usually puts PENDING first alphabetically (A, P, R... wait, A is before P. Let's sort by createdAt instead and highlight Pending in UI)
      { createdAt: 'desc' }
    ]
  });

  // Separate properties for a cleaner UI
  const pendingProperties = properties.filter(p => p.status === "PENDING");
  const activeProperties = properties.filter(p => p.status === "APPROVED");
  const rejectedProperties = properties.filter(p => p.status === "REJECTED");

  return (
    <div className="text-promaroc-black dark:text-promaroc-white animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-sora font-bold mb-2">Properties Command Center</h1>
          <p className="text-black/60 dark:text-white/60 font-medium">
            Review host submissions and manage the live marketplace portfolio.
          </p>
        </div>
        
        <Link href="/admin/properties/new" className="bg-promaroc-green text-promaroc-white px-6 py-3 rounded-xl font-bold hover:bg-[#0a2e29] transition-all flex items-center gap-2 shadow-lg shadow-promaroc-green/20 w-fit">
          <Plus className="w-5 h-5" /> Add Property as Admin
        </Link>
      </div>

      {/* PENDING APPROVALS SECTION */}
      {pendingProperties.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-sora font-bold mb-6 flex items-center gap-2 text-orange-500">
            <Clock className="w-6 h-6" /> Requires Your Approval ({pendingProperties.length})
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {pendingProperties.map(property => (
              <PropertyAdminCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      )}

      {/* ACTIVE PROPERTIES SECTION */}
      <div className="mb-12">
        <h2 className="text-xl font-sora font-bold mb-6 flex items-center gap-2 text-promaroc-green">
          <CheckCircle2 className="w-6 h-6" /> Live on Marketplace ({activeProperties.length})
        </h2>
        {activeProperties.length === 0 ? (
          <p className="text-black/50 dark:text-white/50 bg-white/5 p-6 rounded-2xl border border-white/10">No live properties.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {activeProperties.map(property => (
              <PropertyAdminCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>

      {/* REJECTED PROPERTIES SECTION */}
      {rejectedProperties.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-sora font-bold mb-6 flex items-center gap-2 text-red-500 opacity-70">
            <XCircle className="w-6 h-6" /> Rejected Submissions ({rejectedProperties.length})
          </h2>
          <div className="grid grid-cols-1 gap-4 opacity-70">
            {rejectedProperties.map(property => (
              <PropertyAdminCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

// ----------------------------------------------------------------------
// HELPER COMPONENT: Renders a single property row with the right buttons
// ----------------------------------------------------------------------
function PropertyAdminCard({ property }: { property: any }) {
  // Using Next.js 14/15 Server Actions directly inside forms!
  const approveAction = updatePropertyStatus.bind(null, property.id, "APPROVED");
  const rejectAction = updatePropertyStatus.bind(null, property.id, "REJECTED");
  const pendingAction = updatePropertyStatus.bind(null, property.id, "PENDING");

  return (
    <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-4 rounded-2xl flex flex-col lg:flex-row items-center gap-6 shadow-sm">
      
      {/* Thumbnail */}
      <div className="w-full lg:w-48 h-32 bg-black/5 dark:bg-white/5 rounded-xl overflow-hidden shrink-0">
        {property.heroImage ? (
          <img src={property.heroImage} alt={property.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-black/20 dark:text-white/20"><Home className="w-8 h-8"/></div>
        )}
      </div>
      
      {/* Details */}
      <div className="flex-1 w-full">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-promaroc-green uppercase tracking-wider">{property.propertyType}</span>
          <span className="text-black/30 dark:text-white/30">•</span>
          <span className="text-xs font-medium text-black/50 dark:text-white/50">ID: {property.id.slice(-6)}</span>
        </div>
        <h3 className="text-lg font-bold font-sora line-clamp-1 mb-1">{property.title}</h3>
        <p className="text-sm font-medium text-black/60 dark:text-white/60 mb-2">Host: {property.owner?.name || property.owner?.email || 'Unknown'}</p>
        
        <div className="flex items-center gap-4 text-sm font-bold">
          <div>${property.pricePerNight} <span className="text-xs font-medium opacity-60">/ night</span></div>
          <div className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20"></div>
          <div>{property.location}</div>
        </div>
      </div>

      {/* Admin Action Buttons */}
      <div className="flex items-center gap-2 w-full lg:w-auto">
        
        <Link href={`/properties/${property.id}`} target="_blank" className="p-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl transition-colors text-black/70 dark:text-white/70" title="View Public Page">
          <Eye className="w-5 h-5" />
        </Link>

        {property.status !== "APPROVED" && (
          <form action={approveAction}>
            <button className="flex items-center gap-2 px-5 py-3 bg-promaroc-green text-promaroc-white rounded-xl font-bold hover:bg-[#0a2e29] transition-colors text-sm shadow-sm">
              <CheckCircle2 className="w-4 h-4" /> Approve
            </button>
          </form>
        )}

        {property.status !== "REJECTED" && (
          <form action={rejectAction}>
            <button className="flex items-center gap-2 px-5 py-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl font-bold transition-colors text-sm">
              <XCircle className="w-4 h-4" /> Reject
            </button>
          </form>
        )}

        {/* If it's approved or rejected, give Admin option to put it back in Pending */}
        {property.status !== "PENDING" && (
          <form action={pendingAction}>
            <button className="flex items-center gap-2 px-5 py-3 bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl font-bold transition-colors text-sm">
              <Clock className="w-4 h-4" /> Re-eval
            </button>
          </form>
        )}
      </div>

    </div>
  );
}