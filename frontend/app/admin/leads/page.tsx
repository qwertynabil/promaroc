import { prisma } from "@/lib/prisma";
import { Mail, Phone, Calendar, User, Inbox } from "lucide-react";

export default async function AdminLeadsPage() {
  // Fetch leads directly from the database, ordered by newest first
  const leads = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="text-promaroc-black dark:text-promaroc-white animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-sora font-bold mb-2 tracking-tight">Leads Inbox</h1>
          <p className="text-black/50 dark:text-white/50 font-medium">
            Manage and review your incoming property inquiries.
          </p>
        </div>
        
        <div className="bg-white dark:bg-white/5 px-4 py-2.5 rounded-xl border border-black/5 dark:border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-3">
          <span className="text-sm font-medium text-black/60 dark:text-white/60">Total Inquiries</span>
          <span className="bg-promaroc-green text-white text-xs font-bold px-2 py-1 rounded-md">{leads.length}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)] dark:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-black/5 dark:bg-white/5 text-black/50 dark:text-white/50 font-medium">
              <tr>
                <th className="px-6 py-5 border-b border-black/5 dark:border-white/10"><div className="flex items-center gap-2"><Calendar className="w-4 h-4"/> Date</div></th>
                <th className="px-6 py-5 border-b border-black/5 dark:border-white/10"><div className="flex items-center gap-2"><User className="w-4 h-4"/> Contact Info</div></th>
                <th className="px-6 py-5 border-b border-black/5 dark:border-white/10"><div className="flex items-center gap-2"><Inbox className="w-4 h-4"/> Message / Requirements</div></th>
                <th className="px-6 py-5 border-b border-black/5 dark:border-white/10">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-black/40 dark:text-white/40">
                      <Inbox className="w-12 h-12 mb-4 opacity-50" />
                      <p className="font-medium text-lg text-promaroc-black dark:text-promaroc-white">No leads yet</p>
                      <p className="text-sm mt-1">When someone submits a contact form, it will appear here.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-black/[0.02] dark:hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-5 text-black/60 dark:text-white/60">
                      {lead.createdAt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-semibold text-promaroc-black dark:text-white mb-1.5">{lead.name}</div>
                      <div className="flex flex-col gap-1.5 text-xs text-black/50 dark:text-white/50">
                        <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5"/> {lead.email}</span>
                        {lead.phone && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5"/> {lead.phone}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-black/70 dark:text-white/70 max-w-sm truncate" title={lead.message}>
                        {lead.message}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                        lead.isRead 
                          ? 'bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60 border-transparent' 
                          : 'bg-promaroc-green/10 text-promaroc-green border-promaroc-green/20'
                      }`}>
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
    </div>
  );
}