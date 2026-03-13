import type { Metadata } from "next";
import { auth } from "@/auth";
import { getGearImages } from "@/app/actions/site-content";
import { GearGrid } from "@/components/gear-grid";

export const metadata: Metadata = {
  title: "Gear",
  description: "Gear used by Jacob Majors for climbing, photography, skiing, and camping.",
  robots: { index: false, follow: false },
};

export default async function GearPage() {
  const [session, imageMap] = await Promise.all([auth(), getGearImages()]);
  const isAdmin = !!session?.user;

  return (
    <main className="pt-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-[#c8a96e] text-xs tracking-[0.4em] uppercase mb-4">Kit</p>
        <h1 className="text-5xl md:text-7xl font-light text-white mb-4">Gear</h1>
        <p className="text-[#666] text-lg mb-20">What I actually use and why.</p>

        <GearGrid initialImages={imageMap} isAdmin={isAdmin} />
      </div>
    </main>
  );
}
