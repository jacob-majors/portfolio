"use client";

import { useState } from "react";
import { CldImage } from "next-cloudinary";
import { motion, AnimatePresence } from "framer-motion";
import type { photos } from "@/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import { X } from "lucide-react";

type Photo = InferSelectModel<typeof photos>;

const CATEGORIES = ["All", "Landscape", "Portrait", "Street", "Abstract"];

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const filtered = active === "All" ? photos : photos.filter((p) => p.category.toLowerCase() === active.toLowerCase());

  return (
    <>
      {/* Category filter */}
      <div className="px-6 pb-12 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-xs tracking-widest uppercase px-4 py-2 border rounded-full transition-all duration-300 ${
                active === cat
                  ? "border-[#c8a96e] text-[#c8a96e] bg-[#c8a96e]/10"
                  : "border-[#333] text-[#666] hover:border-[#666]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry grid */}
      <div className="px-6 pb-32 max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        <AnimatePresence>
          {filtered.map((photo, i) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="break-inside-avoid cursor-pointer group"
              onClick={() => setLightbox(photo)}
            >
              <div className="relative overflow-hidden rounded-lg">
                <CldImage
                  src={photo.cloudinaryId}
                  alt={photo.title}
                  width={photo.width || 800}
                  height={photo.height || 600}
                  className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 rounded-lg" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-[#c8a96e] transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-5xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <CldImage
                src={lightbox.cloudinaryId}
                alt={lightbox.title}
                width={1600}
                height={1200}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="mt-4 text-center">
                <p className="text-white text-lg">{lightbox.title}</p>
                {lightbox.description && <p className="text-[#666] text-sm mt-1">{lightbox.description}</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
