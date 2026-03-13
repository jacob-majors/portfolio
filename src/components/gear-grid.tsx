"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEditMode } from "@/hooks/use-edit-mode";
import { setSiteContent } from "@/app/actions/site-content";

type GearItem = {
  itemKey: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  defaultLink?: string;
  staticImageUrl?: string;
};

const GEAR: GearItem[] = [
  // ── Skiing ────────────────────────────────────────────────────────────────
  {
    itemKey: "prodigy-3s",
    name: "Prodigy 3s",
    brand: "Faction",
    category: "Skiing",
    description:
      "My all-mountain ski. Playful enough for park laps but stiff enough to charge. The pink topsheet speaks for itself.",
    defaultLink: "https://factionskis.com/en-us/products/prodigy-3-ski",
    staticImageUrl:
      "https://res.cloudinary.com/dh9kjvs42/image/fetch/f_auto,q_auto,w_600/" +
      encodeURIComponent(
        "https://factionskis.com/cdn/shop/files/Faction-Skis-2526-Prodigy-3-Topsheet-1x1.jpg?v=1750405805"
      ),
  },
  {
    itemKey: "pivot-gw-14",
    name: "Pivot GW 14",
    brand: "Look",
    category: "Skiing",
    description:
      "The benchmark alpine binding. Wide elasticity window, incredibly reliable release, and you can feel the difference in edge transmission.",
    defaultLink: "https://www.rei.com/product/161327/look-pivot-14-gw-ski-bindings",
  },
  {
    itemKey: "tigard",
    name: "Tigard",
    brand: "Dynafit",
    category: "Skiing",
    description:
      "My everyday ski boot. Stiff enough for charging hard snow but walkable enough that I don't hate life in the lodge.",
    defaultLink: "https://www.dynafit.com/en-US/tigard",
  },
  // ── Touring ───────────────────────────────────────────────────────────────
  {
    itemKey: "helio-carbon-104",
    name: "Helio Carbon 104",
    brand: "Black Diamond",
    category: "Touring",
    description:
      "Incredibly light for a 104mm waist ski. The carbon construction makes a real difference on long approaches. My go-to for backcountry days.",
    defaultLink: "https://www.blackdiamondequipment.com/en_US/product/helio-carbon-104-skis/",
  },
  {
    itemKey: "rotation-10",
    name: "Rotation 10",
    brand: "Dynafit",
    category: "Touring",
    description:
      "Light touring binding that doesn't feel sketchy skiing down. Step-in is fast even with gloves, which matters when it's cold.",
    defaultLink: "https://www.dynafit.com/en-US/rotation-10",
  },
  // ── Climbing ──────────────────────────────────────────────────────────────
  {
    itemKey: "cinder-55",
    name: "Cinder 55",
    brand: "Osprey",
    category: "Climbing",
    description:
      "A bit heavy but it's durable and has good shoulder and waist straps. Holds everything I need for a big day out.",
    defaultLink: "https://www.rei.com/search#?q=osprey+cinder+55",
  },
  {
    itemKey: "litewire-carabiner",
    name: "Litewire Carabiner",
    brand: "Black Diamond",
    category: "Climbing",
    description:
      "My go-to racking carabiner. Light enough not to notice on the harness but solid enough to trust.",
    defaultLink: "https://www.blackdiamondequipment.com/en_US/product/litewire-carabiner/",
  },
  {
    itemKey: "camalot-c4",
    name: "Camalot C4",
    brand: "Black Diamond",
    category: "Climbing",
    description:
      "I only use these for sizes 1–6. For anything smaller I run Z4s — lighter and easier to place in thin cracks.",
    defaultLink: "https://www.rei.com/product/138519/black-diamond-camalot-c4-cam",
  },
  {
    itemKey: "camalot-z4",
    name: "Camalot Z4",
    brand: "Black Diamond",
    category: "Climbing",
    description:
      "My choice for anything smaller than a #1 C4. Great for thin cracks where the C4 is overkill.",
    defaultLink: "https://www.rei.com/product/169038/black-diamond-camalot-z4-cam",
  },
  {
    itemKey: "grigri",
    name: "GriGri",
    brand: "Petzl",
    category: "Climbing",
    description:
      "Standard belay device. Also use it for filming rigs — clip a pulley to the top when setting up a top-rope filming system, unless traversing.",
    defaultLink: "https://www.rei.com/product/151970/petzl-grigri-belay-device",
  },
  {
    itemKey: "ascenders",
    name: "Ascenders",
    brand: "Petzl",
    category: "Climbing",
    description:
      "I use an SMD as a master point and clip my ladders and daisy chain to that. Add a pulley to the top when using a GriGri for filming. For top-rope soloing I add a Micro Traxion and SPOC as backup.",
    defaultLink: "https://www.petzl.com/US/en/Sport/Ascenders/ASCENSION",
  },
  {
    itemKey: "micro-traxion",
    name: "Micro Traxion",
    brand: "Petzl",
    category: "Climbing",
    description:
      "Essential for top-rope soloing. Runs smooth and locks hard. Pairs with the SPOC as a redundant backup system.",
    defaultLink: "https://www.rei.com/product/834987/petzl-micro-traxion-pulley",
  },
  {
    itemKey: "spoc",
    name: "SPOC",
    brand: "Eldrid",
    category: "Climbing",
    description:
      "Progress capture device I use as a top-rope soloing backup. Always run alongside the Micro Traxion for a redundant catch system.",
    defaultLink: "https://www.eldrid.com",
  },
  {
    itemKey: "hot-forge-screwgate",
    name: "Hot Forge Screwgate",
    brand: "Black Diamond",
    category: "Climbing",
    description:
      "Good smaller screwgate locker. Solid and lightweight — I use these anywhere I need a reliable gate without the bulk.",
    defaultLink: "https://www.blackdiamondequipment.com/en_US/product/hot-forge-screwgate-carabiner/",
  },
  // ── Photography ──────────────────────────────────────────────────────────
  {
    itemKey: "a7-ii",
    name: "α7 II",
    brand: "Sony",
    category: "Photography",
    description:
      "My primary camera body. Full-frame sensor in a compact package. The 5-axis IBIS makes a real difference for handheld telephoto work at events.",
    defaultLink: "https://www.bhphotovideo.com/c/search?q=sony+a7+ii",
  },
  {
    itemKey: "tamron-70-300",
    name: "70-300mm f/4.5-6.3 Di III RXD",
    brand: "Tamron",
    category: "Photography",
    description:
      "Lightweight telephoto for action and sports. Reaches far enough to isolate riders and athletes. Surprisingly sharp for the size and price.",
    defaultLink: "https://www.bhphotovideo.com/c/search?q=tamron+70-300+a047+sony",
  },
  {
    itemKey: "peter-mckinnon-pack",
    name: "Peter McKinnon Camera Pack",
    brand: "Nomatic",
    category: "Photography",
    description:
      "Holds my body, lenses, and a laptop with room for a layer and snacks. The magnetic closure on the main compartment is fast when you need to get a shot quickly.",
    defaultLink: "https://www.nomatic.com/products/camera-pack",
  },
  // ── Camping ───────────────────────────────────────────────────────────────
  {
    itemKey: "bishop-pass-15",
    name: "Bishop Pass 15°",
    brand: "Mountain Hardwear",
    category: "Camping",
    description:
      "Warm enough for high-altitude Sierra nights without being overkill. Packs down small and feels quality for the weight.",
    defaultLink: "https://www.rei.com/search#?q=mountain+hardwear+bishop+pass+15",
  },
  {
    itemKey: "tensor-pad",
    name: "Tensor Sleeping Pad",
    brand: "Nemo",
    category: "Camping",
    description:
      "Ultralight and comfortable. The R-value is solid for three-season use and it inflates fast. One of the better pads at this weight.",
    defaultLink: "https://www.rei.com/search#?q=nemo+tensor",
  },
  {
    itemKey: "jetboil",
    name: "Jetboil",
    brand: "Jetboil",
    category: "Camping",
    description:
      "Fast, fuel-efficient, and foolproof. Boils water in under two minutes and the integrated cup keeps everything in one piece.",
    defaultLink: "https://www.rei.com/search#?q=jetboil+flash",
  },
];

const CATEGORY_ORDER = ["Skiing", "Touring", "Climbing", "Photography", "Camping"];
const CATEGORIES = CATEGORY_ORDER.filter((c) => GEAR.some((g) => g.category === c));

function GearCard({
  item,
  imageUrl,
  linkUrl,
  editMode,
  onImageUploaded,
  onLinkSaved,
}: {
  item: GearItem;
  imageUrl: string | null;
  linkUrl: string | null;
  editMode: boolean;
  onImageUploaded: (key: string, url: string) => void;
  onLinkSaved: (key: string, url: string) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingLink, setEditingLink] = useState(false);
  const [linkDraft, setLinkDraft] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const effectiveImage = imageUrl ?? item.staticImageUrl ?? null;
  const effectiveLink = linkUrl ?? item.defaultLink ?? null;

  const uploadFile = useCallback(
    async (file: File) => {
      setUploading(true);
      setDragging(false);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "portfolio");
        const res = await fetch("https://api.cloudinary.com/v1_1/dh9kjvs42/image/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.secure_url) {
          await setSiteContent(`gear.image.${item.itemKey}`, data.secure_url);
          onImageUploaded(item.itemKey, data.secure_url);
        }
      } finally {
        setUploading(false);
      }
    },
    [item.itemKey, onImageUploaded]
  );

  const handleDragOver = (e: React.DragEvent) => {
    if (!editMode || uploading) return;
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear dragging if leaving the card entirely
    if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) {
      setDragging(false);
    }
  };
  const handleDrop = (e: React.DragEvent) => {
    if (!editMode || uploading) return;
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) uploadFile(file);
    else setDragging(false);
  };

  const startEditLink = () => {
    setLinkDraft(effectiveLink ?? "");
    setEditingLink(true);
  };
  const saveLink = async () => {
    setEditingLink(false);
    const trimmed = linkDraft.trim();
    if (trimmed !== effectiveLink) {
      await setSiteContent(`gear.link.${item.itemKey}`, trimmed);
      onLinkSaved(item.itemKey, trimmed);
    }
  };

  return (
    <div
      className={`border rounded-xl overflow-hidden flex flex-col group transition-colors duration-300 relative ${
        dragging ? "border-[#c8a96e]/60" : "border-[#1a1a1a] hover:border-[#2a2a2a]"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Image area */}
      <div className={`relative aspect-[4/3] overflow-hidden ${effectiveImage ? "bg-transparent" : "bg-[#0d0d0d]"}`}>
        {effectiveImage ? (
          <Image
            src={effectiveImage}
            alt={item.name}
            fill
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            {uploading ? (
              <span className="text-[#444] text-[10px] tracking-[0.4em] uppercase animate-pulse">Uploading…</span>
            ) : editMode ? (
              <>
                <span className="text-[#333] text-2xl select-none">↑</span>
                <span className="text-[#333] text-[9px] tracking-[0.35em] uppercase">Drop or click</span>
              </>
            ) : (
              <>
                <span className="text-[#1f1f1f] text-[10px] tracking-[0.4em] uppercase">{item.brand}</span>
                <span className="text-[#1a1a1a] text-lg font-light">{item.name}</span>
              </>
            )}
          </div>
        )}

        {/* Edit mode: click to upload (covers whole image area) */}
        {editMode && !uploading && (
          <button
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Upload image"
          />
        )}

        {/* Drag overlay */}
        {dragging && (
          <div className="absolute inset-0 bg-[#c8a96e]/10 border-2 border-dashed border-[#c8a96e]/60 rounded-xl pointer-events-none flex items-center justify-center">
            <span className="text-[#c8a96e] text-[10px] tracking-[0.4em] uppercase">Drop to upload</span>
          </div>
        )}

        {/* Upload spinner overlay when uploading */}
        {uploading && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-[#c8a96e] text-[10px] tracking-[0.4em] uppercase animate-pulse">Uploading…</span>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadFile(file);
          e.target.value = "";
        }}
      />

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[#444] text-[9px] tracking-[0.35em] uppercase mb-1">{item.brand}</p>
        <h2 className="text-white text-sm font-light leading-snug mb-3">{item.name}</h2>
        <p className="text-[#555] text-xs leading-relaxed flex-1">{item.description}</p>

        {/* Link — editable in edit mode */}
        {editMode ? (
          <div className="mt-4">
            {editingLink ? (
              <div className="flex gap-2">
                <input
                  autoFocus
                  value={linkDraft}
                  onChange={(e) => setLinkDraft(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") saveLink(); if (e.key === "Escape") setEditingLink(false); }}
                  placeholder="https://..."
                  className="flex-1 bg-[#111] border border-[#2a2a2a] rounded px-2 py-1 text-[10px] text-white placeholder-[#444] outline-none focus:border-[#c8a96e]/50 min-w-0"
                />
                <button
                  onClick={saveLink}
                  className="text-[9px] tracking-[0.2em] uppercase text-black bg-[#c8a96e] px-2 py-1 rounded hover:bg-[#d4b87a] transition-colors shrink-0"
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={startEditLink}
                className="text-[9px] tracking-[0.3em] uppercase text-[#555] border border-[#1f1f1f] px-3 py-1.5 rounded hover:border-[#c8a96e]/40 hover:text-[#c8a96e] transition-colors"
              >
                {effectiveLink ? "Edit link →" : "Add link →"}
              </button>
            )}
          </div>
        ) : (
          effectiveLink && (
            <Link
              href={effectiveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 self-start text-[9px] tracking-[0.3em] uppercase text-[#c8a96e] border border-[#c8a96e]/30 px-3 py-1.5 rounded hover:bg-[#c8a96e]/10 transition-colors"
            >
              View →
            </Link>
          )
        )}
      </div>
    </div>
  );
}

export function GearGrid({
  initialImages,
  initialLinks,
  isAdmin,
}: {
  initialImages: Record<string, string>;
  initialLinks: Record<string, string>;
  isAdmin: boolean;
}) {
  const { editMode } = useEditMode();
  const [images, setImages] = useState(initialImages);
  const [links, setLinks] = useState(initialLinks);

  const handleImageUploaded = useCallback((key: string, url: string) => {
    setImages((prev) => ({ ...prev, [key]: url }));
  }, []);

  const handleLinkSaved = useCallback((key: string, url: string) => {
    setLinks((prev) => ({ ...prev, [key]: url }));
  }, []);

  // Only show edit controls to admins
  const showEdit = isAdmin && editMode;

  return (
    <>
      {CATEGORIES.map((cat) => (
        <section key={cat} className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <p className="text-[#c8a96e] text-[10px] tracking-[0.4em] uppercase">{cat}</p>
            <div className="flex-1 h-px bg-[#1a1a1a]" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {GEAR.filter((g) => g.category === cat).map((item) => (
              <GearCard
                key={item.itemKey}
                item={item}
                imageUrl={images[item.itemKey] ?? null}
                linkUrl={links[item.itemKey] ?? null}
                editMode={showEdit}
                onImageUploaded={handleImageUploaded}
                onLinkSaved={handleLinkSaved}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
