"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
}

export function SectionIntro({ eyebrow, title, description, href }: SectionIntroProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p className="text-[#c8a96e] text-xs tracking-[0.4em] uppercase mb-4 sm:mb-6">{eyebrow}</p>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-light text-white leading-tight mb-6 sm:mb-8">
          {title}
        </h2>
        <div className="flex flex-col md:flex-row md:items-end gap-5 sm:gap-8">
          <p className="text-[#999] text-base sm:text-lg max-w-md leading-relaxed">{description}</p>
          <Link
            href={href}
            className="group flex items-center gap-3 text-sm tracking-widest uppercase text-[#c8a96e] hover:gap-5 transition-all duration-300"
          >
            View all
            <span className="text-lg">→</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
