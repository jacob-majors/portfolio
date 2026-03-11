import { ProjectsGrid } from "@/components/projects-grid";
import { db } from "@/db";
import { projects } from "@/db/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering",
  description: "Engineering projects by Jacob Majors.",
};

// Placeholder projects shown until DB is set up
const PLACEHOLDER_PROJECTS = [
  {
    id: 1,
    title: "This Portfolio Site",
    description: "A full-stack portfolio built with Next.js 15, Turso (edge SQLite), Cloudinary image hosting, and GSAP scroll animations. Designed to feel cinematic, not templated.",
    longDescription: null,
    tags: JSON.stringify(["Next.js", "TypeScript", "Turso", "GSAP", "Vercel"]),
    githubUrl: null,
    liveUrl: null,
    cloudinaryId: null,
    cloudinaryUrl: null,
    featured: true,
    publishedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Add your projects",
    description: "Head to /admin to add your engineering projects. They'll show up here with tag filtering, GitHub links, live demo links, and cover images.",
    longDescription: null,
    tags: JSON.stringify(["Coming Soon"]),
    githubUrl: null,
    liveUrl: null,
    cloudinaryId: null,
    cloudinaryUrl: null,
    featured: false,
    publishedAt: new Date().toISOString(),
  },
];

export default async function ProjectsPage() {
  let allProjects = PLACEHOLDER_PROJECTS as typeof projects.$inferSelect[];

  try {
    const dbProjects = await db.select().from(projects).orderBy(projects.publishedAt);
    if (dbProjects.length > 0) allProjects = dbProjects;
  } catch {
    // DB not yet configured
  }

  return (
    <main className="pt-24">
      <div className="px-6 max-w-7xl mx-auto py-16">
        <p className="text-[#c8a96e] text-xs tracking-[0.4em] uppercase mb-4">Portfolio</p>
        <h1 className="text-5xl md:text-7xl font-light text-white mb-4">Engineering</h1>
        <p className="text-[#666] text-lg max-w-md">Building systems that solve real problems.</p>
      </div>
      <ProjectsGrid projects={allProjects} />
    </main>
  );
}
