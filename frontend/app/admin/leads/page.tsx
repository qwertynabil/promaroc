import { prisma } from "@/lib/prisma";

export default async function AdminLeadsPage() {
  // Fetch leads directly from the database, ordered by newest first
  const leads = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="text-promaroc-white">
      <h1 className="text-3xl font-sora font-bold mb-8">View Leads</h1>
      
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-promaroc-white/50">
            <tr>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Contact</th>
              <th className="px-6 py-4 font-medium">Message/Requirements</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leads.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-white/50">No leads yet.</td></tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">{lead.createdAt.toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium">{lead.name}</td>
                  <td className="px-6 py-4 text-white/70">
                    {lead.email} <br/> {lead.phone}
                  </td>
                  <td className="px-6 py-4 text-white/70 max-w-xs truncate">{lead.message}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${lead.isRead ? 'bg-white/10 text-white/50' : 'bg-promaroc-green/20 text-promaroc-green'}`}>
                      {lead.isRead ? 'Reviewed' : 'New'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}