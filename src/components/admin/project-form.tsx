"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { saveProject } from "@/app/actions/projects";

export function ProjectForm() {
  const [uploaded, setUploaded] = useState<{ public_id: string; secure_url: string } | null>(null);
  const [form, setForm] = useState({ title: "", description: "", longDescription: "", tags: "", githubUrl: "", liveUrl: "", featured: false });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSave() {
    if (!form.title) return;
    setSaving(true);
    await saveProject({
      ...form,
      tags: JSON.stringify(form.tags.split(",").map((t) => t.trim()).filter(Boolean)),
      cloudinaryId: uploaded?.public_id,
      cloudinaryUrl: uploaded?.secure_url,
    });
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setForm({ title: "", description: "", longDescription: "", tags: "", githubUrl: "", liveUrl: "", featured: false });
    setUploaded(null);
  }

  return (
    <div className="space-y-8">
      <h2 className="text-white text-2xl font-light">Add Project</h2>
      <div className="space-y-4">
        {(["title", "description", "tags", "githubUrl", "liveUrl"] as const).map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field === "tags" ? "Tags (comma separated: React, TypeScript)" : field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white placeholder-[#555] focus:outline-none focus:border-[#c8a96e] transition-colors"
          />
        ))}
        <textarea
          placeholder="Long description (optional)"
          value={form.longDescription}
          onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
          rows={4}
          className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white placeholder-[#555] focus:outline-none focus:border-[#c8a96e] transition-colors resize-none"
        />
        <label className="flex items-center gap-3 text-[#999] cursor-pointer">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-[#c8a96e]" />
          Featured on homepage
        </label>

        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={(result) => {
            if (result.info && typeof result.info === "object") {
              const info = result.info as { public_id: string; secure_url: string };
              setUploaded(info);
            }
          }}
        >
          {({ open }) => (
            <button
              onClick={() => open()}
              className="border border-dashed border-[#333] rounded-lg p-6 w-full text-center hover:border-[#c8a96e] transition-colors text-[#666] text-sm"
            >
              {uploaded ? `✓ ${uploaded.public_id}` : "Upload cover image (optional)"}
            </button>
          )}
        </CldUploadWidget>

        <button
          onClick={handleSave}
          disabled={saving || !form.title}
          className="w-full bg-[#c8a96e] text-black font-medium py-3 rounded-lg hover:bg-[#d4b97a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : success ? "Saved!" : "Save Project"}
        </button>
      </div>
    </div>
  );
}
