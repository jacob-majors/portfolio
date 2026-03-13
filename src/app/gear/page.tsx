import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gear",
  description: "Gear used by Jacob Majors for climbing, photography, skiing, and camping.",
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
  // ── Skiing ────────────────────────────────────────────────────────────────
  {
    name: "Prodigy 3s",
    brand: "Faction",
    category: "Skiing",
    description:
      "My all-mountain ski. Playful enough for park laps but stiff enough to charge. The pink topsheet doesn't hurt either.",
    link: "https://www.factionskis.com/collections/prodigy",
    // imageUrl added when photo is uploaded
  },
  {
    name: "Pivot GW 14",
    brand: "Look",
    category: "Skiing",
    description:
      "The benchmark alpine binding. Wide elasticity window, incredibly reliable release, and you can feel the difference in edge transmission.",
    link: "https://www.lookpedals.com/ski/pivot-14-gw",
  },
  {
    name: "Tigard",
    brand: "Dynafit",
    category: "Skiing",
    description:
      "My everyday ski boot. Stiff enough for charging hard snow but walkable enough that I don't hate life in the lodge.",
    link: "https://www.dynafit.com/en-US/tigard",
  },
  // ── Touring ───────────────────────────────────────────────────────────────
  {
    name: "Helio Carbon 104",
    brand: "Black Diamond",
    category: "Touring",
    description:
      "Incredibly light for a 104mm waist ski. The carbon construction makes a real difference on long approaches. My go-to for backcountry days.",
    link: "https://www.blackdiamondequipment.com/en_US/product/helio-carbon-104-skis/",
  },
  {
    name: "Rotation 10",
    brand: "Dynafit",
    category: "Touring",
    description:
      "Light touring binding that doesn't feel sketchy skiing down. Step-in is fast even with gloves, which matters when it's cold.",
    link: "https://www.dynafit.com/en-US/rotation-10",
  },
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
      "My go-to racking carabiner. Light enough not to notice on the harness but solid enough to trust.",
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
    name: "Camalot Z4",
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
      "Standard belay device. Also use it for filming rigs — clip a pulley to the top when setting up a top-rope filming system, unless traversing.",
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
      "Essential for top-rope soloing. Runs smooth and locks hard. Pairs with the SPOC as a redundant backup system.",
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
      "A good smaller screwgate locker. Solid and lightweight — I use these anywhere I need a reliable gate without the bulk.",
    link: "https://www.blackdiamondequipment.com/en_US/product/hot-forge-screwgate-carabiner/",
  },
  // ── Photography ──────────────────────────────────────────────────────────
  {
    name: "α7 II",
    brand: "Sony",
    category: "Photography",
    description:
      "My primary camera body. Full-frame sensor in a compact package. The 5-axis IBIS makes a real difference for handheld telephoto work at events.",
    link: "https://www.amazon.com/s?k=Sony+A7II",
  },
  {
    name: "70-300mm f/4.5-6.3 Di III RXD",
    brand: "Tamron",
    category: "Photography",
    description:
      "Lightweight telephoto for action and sports. Reaches far enough to isolate riders and athletes from the crowd. Surprisingly sharp for the size and price.",
    link: "https://www.tamron.com/en-us/consumer/lenses/a047/",
  },
  {
    name: "Peter McKinnon Backpack V2",
    brand: "Nomatic",
    category: "Photography",
    description:
      "Holds my body, lenses, and a laptop with room for a layer and some snacks. The magnetic closure on the main compartment is genuinely fast when you need to get a shot quickly.",
    link: "https://www.nomatic.com/products/nomatic-peter-mckinnon-camera-pack-v2",
  },
  // ── Camping ───────────────────────────────────────────────────────────────
  {
    name: "Bishop Pass 15°",
    brand: "Mountain Hardwear",
    category: "Camping",
    description:
      "Warm enough for high-altitude Sierra nights without being overkill. Packs down small and feels quality for the weight.",
    link: "https://www.mountainhardwear.com/collections/sleeping-bags",
  },
  {
    name: "Tensor Sleeping Pad",
    brand: "Nemo",
    category: "Camping",
    description:
      "Ultralight and comfortable. The R-value is solid for three-season use and it inflates fast. One of the better pads at this weight.",
    link: "https://www.nemoequipment.com/collections/sleeping-pads",
  },
  {
    name: "Jetboil",
    brand: "Jetboil",
    category: "Camping",
    description:
      "Fast, fuel-efficient, and foolproof. Boils water in under two minutes and the integrated cup keeps everything in one piece.",
    link: "https://www.amazon.com/s?k=jetboil+flash",
  },
];

const CATEGORY_ORDER = ["Skiing", "Touring", "Climbing", "Photography", "Camping"];
const CATEGORIES = CATEGORY_ORDER.filter((c) => GEAR.some((g) => g.category === c));

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

            <div className="divide-y divide-[#111]">
              {GEAR.filter((g) => g.category === cat).map((item) => (
                <div key={item.name} className="py-8 flex flex-col sm:flex-row sm:items-start gap-6">
                  {item.imageUrl && (
                    <div className="relative w-full sm:w-32 h-32 rounded-lg overflow-hidden shrink-0 border border-[#1a1a1a]">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                  )}
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
                      className="shrink-0 self-start mt-1 text-[10px] tracking-[0.3em] uppercase text-[#c8a96e] border border-[#c8a96e]/30 px-3 py-1.5 rounded hover:bg-[#c8a96e]/10 transition-colors whitespace-nowrap"
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
