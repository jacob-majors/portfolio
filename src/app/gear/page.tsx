import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gear",
  description: "Gear used by Jacob Majors for climbing, photography, and skiing.",
  robots: { index: false, follow: false },
};

type GearItem = {
  name: string;
  brand: string;
  category: string;
  description: string;
  link?: string;
  imageUrl?: string;
};

const GEAR: GearItem[] = [
  // ── Climbing ──────────────────────────────────────────────────────────────
  {
    name: "Cinder 55",
    brand: "Osprey",
    category: "Climbing",
    description:
      "A bit heavy but it's durable and has good shoulder and waist straps. Holds everything I need for a big day out.",
    link: "https://www.amazon.com/s?k=Osprey+Cinder+55",
  },
  {
    name: "Litewire Carabiner",
    brand: "Black Diamond",
    category: "Climbing",
    description:
      "My go-to racking carabiner. Light enough to not notice on the harness but solid enough to trust.",
    link: "https://www.blackdiamondequipment.com/en_US/product/litewire-carabiner/",
  },
  {
    name: "Camalot C4",
    brand: "Black Diamond",
    category: "Climbing",
    description:
      "I only use these for sizes 1–6. For anything smaller I run Z4s — they're lighter and easier to place in thin cracks.",
    link: "https://www.blackdiamondequipment.com/en_US/product/camalot-c4/",
  },
  {
    name: "Z4 Cams",
    brand: "Black Diamond",
    category: "Climbing",
    description:
      "My choice for anything smaller than a #1 C4. Great for thin cracks where the C4 is overkill.",
    link: "https://www.blackdiamondequipment.com/en_US/product/camalot-z4/",
  },
  {
    name: "GriGri",
    brand: "Petzl",
    category: "Climbing",
    description:
      "Standard belay device. I also use it for filming rigs — clip a pulley to the top when setting up a system for top-rope filming, unless traversing.",
    link: "https://www.petzl.com/US/en/Sport/Belay-devices/GRIGRI",
  },
  {
    name: "Ascenders",
    brand: "Petzl",
    category: "Climbing",
    description:
      "I use an SMD as a master point and clip my ladders and daisy chain to that. Add a pulley to the top when using a GriGri for filming. For top-rope soloing I add a Micro Traxion and a SPOC as a backup.",
    link: "https://www.petzl.com/US/en/Sport/Ascenders/ASCENSION",
  },
  {
    name: "Micro Traxion",
    brand: "Petzl",
    category: "Climbing",
    description:
      "Essential for top-rope soloing. Runs smooth and locks hard. Pairs well with the SPOC as a backup system.",
    link: "https://www.petzl.com/US/en/Sport/Pulleys/MICRO-TRAXION",
  },
  {
    name: "SPOC",
    brand: "Petzl",
    category: "Climbing",
    description:
      "Top-rope soloing backup. I always run this alongside the Micro Traxion for a redundant catch system.",
    link: "https://www.petzl.com/US/en/Sport/Belay-devices/SPOC",
  },
  {
    name: "Hot Forge Screwgate",
    brand: "Black Diamond",
    category: "Climbing",
    description:
      "A good smaller screwgate locker. Solid and lightweight — I use these anywhere I need a reliable gate without the bulk of a larger locker.",
    link: "https://www.blackdiamondequipment.com/en_US/product/hot-forge-screwgate-carabiner/",
  },
];

const CATEGORIES = Array.from(new Set(GEAR.map((g) => g.category)));

export default function GearPage() {
  return (
    <main className="pt-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-[#c8a96e] text-xs tracking-[0.4em] uppercase mb-4">Kit</p>
        <h1 className="text-5xl md:text-7xl font-light text-white mb-4">Gear</h1>
        <p className="text-[#666] text-lg mb-20">What I actually use and why.</p>

        {CATEGORIES.map((cat) => (
          <section key={cat} className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <p className="text-[#c8a96e] text-[10px] tracking-[0.4em] uppercase">{cat}</p>
              <div className="flex-1 h-px bg-[#1a1a1a]" />
            </div>

            <div className="space-y-0 divide-y divide-[#111]">
              {GEAR.filter((g) => g.category === cat).map((item) => (
                <div key={item.name} className="py-8 flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h2 className="text-white text-xl font-light">{item.name}</h2>
                      <span className="text-[#555] text-xs tracking-widest uppercase">{item.brand}</span>
                    </div>
                    <p className="text-[#666] text-sm leading-relaxed max-w-xl">{item.description}</p>
                  </div>
                  {item.link && (
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 self-start mt-1 text-[10px] tracking-[0.3em] uppercase text-[#c8a96e] border border-[#c8a96e]/30 px-3 py-1.5 rounded hover:bg-[#c8a96e]/10 transition-colors"
                    >
                      View →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
