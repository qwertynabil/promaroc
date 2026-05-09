import { prisma } from "@/lib/prisma";
import Link from "next/link";
export default async function AdminProjectsPage() {
  const projects = await prisma.portfolioProject.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="text-promaroc-white">
<div className="flex justify-between items-center mb-8">
  <h1 className="text-3xl font-sora font-bold">Manage Projects</h1>
  <Link 
    href="/admin/projects/new" 
    className="bg-promaroc-green text-promaroc-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-promaroc-white hover:text-promaroc-black transition-colors"
  >
    + Add Project
  </Link>
</div>      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <p className="text-white/50">No projects in the database. Add one to see it here!</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl relative">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-promaroc-green bg-promaroc-green/10 px-3 py-1 rounded-full">
                  {project.category}
                </span>
                <span className="text-xs text-white/50">{project.isPublished ? 'Published' : 'Draft'}</span>
              </div>
              <h3 className="text-xl font-bold font-sora mb-2">{project.title}</h3>
              <p className="text-sm text-white/60 mb-6">{project.location}</p>
              
              <div className="flex gap-3">
                <button className="flex-1 border border-white/20 py-2 rounded-lg text-sm hover:bg-white/10 transition">Edit</button>
                <button className="flex-1 border border-red-500/20 text-red-400 py-2 rounded-lg text-sm hover:bg-red-500/10 transition">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}