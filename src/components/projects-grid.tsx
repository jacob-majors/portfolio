"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, ExternalLink, ChevronDown } from "lucide-react";
import type { projects } from "@/db/schema";
import type { InferSelectModel } from "drizzle-orm";

type Project = InferSelectModel<typeof projects>;

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div ref={ref} className="px-4 sm:px-6 pb-32 max-w-3xl mx-auto">
      <div className="divide-y divide-[#1a1a1a] border-y border-[#1a1a1a]">
        {projects.map((project, i) => {
          const tags = JSON.parse(project.tags) as string[];
          const isOpen = openId === project.id;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : project.id)}
                className="w-full flex items-center justify-between py-5 sm:py-6 text-left group"
              >
                <span className="text-white text-lg sm:text-xl font-light group-hover:text-[#c8a96e] transition-colors duration-300">
                  {project.title}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-[#555] group-hover:text-[#c8a96e] transition-all duration-300 shrink-0 ml-4 ${isOpen ? "rotate-180 text-[#c8a96e]" : ""}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 sm:pb-8">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map((tag) => (
                          <span key={tag} className="text-[10px] tracking-wider uppercase text-[#c8a96e] border border-[#c8a96e]/30 rounded px-2 py-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-[#888] text-sm sm:text-base leading-relaxed mb-5">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-5">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#666] hover:text-white transition-colors flex items-center gap-2 text-sm"
                          >
                            <Github size={15} />
                            Source
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#c8a96e] hover:text-white transition-colors flex items-center gap-2 text-sm"
                          >
                            <ExternalLink size={15} />
                            View Project
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
