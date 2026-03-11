import { EventsGallery } from "@/components/events-gallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photography",
  description: "Action-sports photography by Jacob Majors — bike races, basketball, soccer, climbing.",
};

export default function PhotographyPage() {
  return (
    <main className="pt-24">
      <div className="px-6 max-w-7xl mx-auto py-16">
        <p className="text-[#c8a96e] text-xs tracking-[0.4em] uppercase mb-4">Portfolio</p>
        <h1 className="text-5xl md:text-7xl font-light text-white mb-4">Photography</h1>
        <p className="text-[#666] text-lg max-w-md">Action-sports photography — races, courts, crags, and everything between.</p>
      </div>
      <EventsGallery />
    </main>
  );
}
