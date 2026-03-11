"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { savePhoto } from "@/app/actions/photos";

export function PhotoUploadForm() {
  const [uploaded, setUploaded] = useState<{ public_id: string; secure_url: string; width: number; height: number } | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [featured, setFeatured] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSave() {
    if (!uploaded || !title) return;
    setSaving(true);
    await savePhoto({
      title,
      description,
      cloudinaryId: uploaded.public_id,
      cloudinaryUrl: uploaded.secure_url,
      category,
      width: uploaded.width,
      height: uploaded.height,
      featured,
    });
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setTitle("");
    setDescription("");
    setUploaded(null);
  }

  return (
    <div className="space-y-8">
      <h2 className="text-white text-2xl font-light">Upload Photo</h2>

      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={(result) => {
          if (result.info && typeof result.info === "object") {
            const info = result.info as { public_id: string; secure_url: string; width: number; height: number };
            setUploaded(info);
          }
        }}
      >
        {({ open }) => (
          <button
            onClick={() => open()}
            className="border-2 border-dashed border-[#333] rounded-xl p-12 w-full text-center hover:border-[#c8a96e] transition-colors group"
          >
            {uploaded ? (
              <p className="text-[#c8a96e]">✓ Image uploaded — {uploaded.public_id}</p>
            ) : (
              <>
                <p className="text-[#666] group-hover:text-white transition-colors">Click to upload image</p>
                <p className="text-[#444] text-sm mt-2">Cloudinary widget</p>
              </>
            )}
          </button>
        )}
      </CldUploadWidget>

      {uploaded && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Photo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white placeholder-[#555] focus:outline-none focus:border-[#c8a96e] transition-colors"
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white placeholder-[#555] focus:outline-none focus:border-[#c8a96e] transition-colors resize-none"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#c8a96e] transition-colors"
          >
            <option value="general">General</option>
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
            <option value="street">Street</option>
            <option value="abstract">Abstract</option>
          </select>
          <label className="flex items-center gap-3 text-[#999] cursor-pointer">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="accent-[#c8a96e]" />
            Featured on homepage
          </label>
          <button
            onClick={handleSave}
            disabled={saving || !title}
            className="w-full bg-[#c8a96e] text-black font-medium py-3 rounded-lg hover:bg-[#d4b97a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : success ? "Saved!" : "Save Photo"}
          </button>
        </div>
      )}
    </div>
  );
}
