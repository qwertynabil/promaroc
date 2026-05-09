// Notice there is NO 'use client' here! This runs entirely on the server.
import ProjectsClient from './ProjectsClient';

export default async function ProjectsPage() {
  let projects = [];

  try {
    // We securely fetch from the Docker backend on the server side
    const res = await fetch(`${process.env.PROMAROC_BACKEND_URL}/api/portfolio`, {
      cache: 'no-store' // Always get the freshest data
    });
    
    const json = await res.json();
    if (json.success) {
      projects = json.data;
    }
  } catch (error) {
    console.error("Failed to fetch projects from backend:", error);
  }

  // Pass the secure data down to the client component
  return <ProjectsClient initialProjects={projects} />;
}