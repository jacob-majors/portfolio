"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import type { projects } from "@/db/schema";
import type { InferSelectModel } from "drizzle-orm";

type Project = InferSelectModel<typeof projects>;

const CATEGORIES = ["All", "Software", "Hardware"] as const;
type Category = typeof CATEGORIES[number];

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) =>
          (JSON.parse(p.tags) as string[]).some(
            (tag) => tag.toLowerCase() === activeCategory.toLowerCase()
          )
        );

  return (
    <div ref={ref} className="px-6 pb-32 max-w-7xl mx-auto">
      {/* Category filter */}
      <div className="flex gap-3 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs tracking-widest uppercase px-4 py-2 border rounded-full transition-all duration-300 ${
              activeCategory === cat
                ? "border-[#c8a96e] text-[#c8a96e] bg-[#c8a96e]/10"
                : "border-[#333] text-[#666] hover:border-[#555] hover:text-[#999]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, i) => {
          const tags = JSON.parse(project.tags) as string[];
          return (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group border border-[#1a1a1a] rounded-2xl overflow-hidden hover:border-[#c8a96e]/30 transition-all duration-500 flex flex-col"
            >
              {project.cloudinaryUrl && (
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.cloudinaryUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag) => (
                    <span key={tag} className="text-[10px] tracking-wider uppercase text-[#c8a96e] border border-[#c8a96e]/30 rounded px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-white text-xl font-medium mb-3">{project.title}</h3>
                <p className="text-[#666] text-sm leading-relaxed flex-1">{project.description}</p>
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-[#1a1a1a]">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#666] hover:text-white transition-colors flex items-center gap-2 text-sm">
                      <Github size={16} />
                      Source
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[#666] hover:text-[#c8a96e] transition-colors flex items-center gap-2 text-sm">
                      <ExternalLink size={16} />
                      Live
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
