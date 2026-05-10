import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, MapPin, Edit2, Trash2, FileText } from "lucide-react";

export default async function AdminProjectsPage() {
  const projects = await prisma.portfolioProject.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-7xl mx-auto pb-12 text-promaroc-black dark:text-promaroc-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-sora font-bold tracking-tight">Manage Projects</h1>
          <p className="text-black/50 dark:text-white/50 text-sm mt-1">View, edit, and manage your portfolio case studies.</p>
        </div>
        <Link 
          href="/admin/projects/new" 
          className="bg-promaroc-black text-white dark:bg-white dark:text-black px-6 py-3.5 rounded-2xl font-semibold text-sm hover:bg-promaroc-green dark:hover:bg-white/90 transition-all flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length === 0 ? (
          <div className="col-span-full bg-white dark:bg-white/5 border border-dashed border-black/10 dark:border-white/10 rounded-3xl p-16 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-black/5 dark:bg-white/10 rounded-full flex items-center justify-center text-black/40 dark:text-white/40 mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-sora font-semibold mb-2">No projects found</h3>
            <p className="text-black/50 dark:text-white/50 max-w-sm mx-auto mb-6">You haven't added any case studies to your portfolio yet. Create your first one to get started.</p>
            <Link 
              href="/admin/projects/new" 
              className="bg-black/5 text-promaroc-black dark:bg-white/10 dark:text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-black/10 dark:hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </Link>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="group bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden">
              
              {/* Decorative Gradient Blob on Hover */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-promaroc-green/5 dark:bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

              <div className="flex justify-between items-start mb-6 relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-promaroc-black dark:text-white bg-black/5 dark:bg-white/10 px-3 py-1.5 rounded-full border border-black/5 dark:border-white/10">
                  {project.category}
                </span>
                <span className={`text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                  project.isPublished 
                    ? 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400' 
                    : 'bg-black/5 text-black/60 dark:bg-white/10 dark:text-white/60'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${project.isPublished ? 'bg-green-500 dark:bg-green-400' : 'bg-black/30 dark:bg-white/40'}`}></span>
                  {project.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
              
              <div className="flex-grow relative z-10 mb-8">
                <h3 className="text-2xl font-sora font-bold mb-2 text-promaroc-black dark:text-white group-hover:text-promaroc-green dark:group-hover:text-gray-200 transition-colors line-clamp-1">{project.title}</h3>
                <div className="flex items-center gap-1.5 text-sm text-black/50 dark:text-white/50">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="line-clamp-1">{project.location}</span>
                </div>
              </div>
              
              <div className="flex gap-3 relative z-10 mt-auto">
                <button className="flex-1 flex items-center justify-center gap-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-transparent dark:border-white/5 text-promaroc-black dark:text-white py-3 rounded-2xl text-sm font-semibold transition-all">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 py-3 rounded-2xl text-sm font-semibold transition-all border border-transparent dark:border-red-500/10">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}