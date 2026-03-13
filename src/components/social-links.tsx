"use client";

import { useState } from "react";
import Link from "next/link";
import { useEditMode } from "@/hooks/use-edit-mode";
import { setSiteContent } from "@/app/actions/site-content";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function EditableLink({
  label,
  handle,
  href,
  dbKey,
  onSaved,
  editMode,
}: {
  label: string;
  handle: string;
  href: string;
  dbKey: string;
  onSaved: (url: string) => void;
  editMode: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(href);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    await setSiteContent(dbKey, draft.trim());
    onSaved(draft.trim());
    setSaving(false);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2">
        <InstagramIcon size={16} />
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") setEditing(false); }}
          className="flex-1 bg-[#111] border border-[#c8a96e]/50 rounded px-2 py-1 text-[11px] text-white focus:outline-none min-w-0 w-48"
          placeholder="https://instagram.com/..."
        />
        <button
          onClick={handleSave}
          disabled={saving}
          className="text-[9px] tracking-[0.2em] uppercase text-black bg-[#c8a96e] px-2 py-1 rounded hover:bg-[#d4b87a] transition-colors shrink-0"
        >
          {saving ? "…" : "Save"}
        </button>
        <button onClick={() => setEditing(false)} className="text-[#555] text-[9px]">✕</button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 group">
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-[#666] hover:text-white transition-colors"
        onClick={editMode ? (e) => e.preventDefault() : undefined}
      >
        <InstagramIcon size={16} />
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#c8a96e]">{label}</span>
        <span className="text-[#555] text-xs">{handle}</span>
      </Link>
      {editMode && (
        <button
          onClick={() => setEditing(true)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-[#c8a96e]/50 hover:text-[#c8a96e] text-[10px] ml-1"
          title="Edit URL"
        >
          ✏
        </button>
      )}
    </div>
  );
}

export function SocialLinks({
  instagramPersonal: initialPersonal,
  instagramMedia: initialMedia,
  isAdmin,
  position,
}: {
  instagramPersonal: string;
  instagramMedia: string;
  isAdmin: boolean;
  position: "top" | "bottom" | "footer";
}) {
  const { editMode } = useEditMode();
  const canEdit = isAdmin && editMode;
  const [personal, setPersonal] = useState(initialPersonal);
  const [media, setMedia] = useState(initialMedia);

  const personalHandle = personal.replace(/\/$/, "").split("/").pop() ?? "";
  const mediaHandle = media.replace(/\/$/, "").split("/").pop() ?? "";

  if (position === "top") {
    return (
      <div className="flex items-center gap-5 mb-10">
        <EditableLink
          label="Personal"
          handle={`@${personalHandle}`}
          href={personal}
          dbKey="about.instagram_personal"
          onSaved={setPersonal}
          editMode={canEdit}
        />
        <span className="text-[#1f1f1f]">·</span>
        <EditableLink
          label="Photography"
          handle={`@${mediaHandle}`}
          href={media}
          dbKey="about.instagram_media"
          onSaved={setMedia}
          editMode={canEdit}
        />
      </div>
    );
  }

  if (position === "bottom") {
    return (
      <div className="mt-16 pt-10 border-t border-[#1a1a1a] flex flex-col sm:flex-row gap-4">
        <EditableLink
          label="Instagram"
          handle={`@${personalHandle}`}
          href={personal}
          dbKey="about.instagram_personal"
          onSaved={setPersonal}
          editMode={canEdit}
        />
        <span className="hidden sm:block text-[#1f1f1f]">·</span>
        <EditableLink
          label="Photography"
          handle={`@${mediaHandle}`}
          href={media}
          dbKey="about.instagram_media"
          onSaved={setMedia}
          editMode={canEdit}
        />
      </div>
    );
  }

  // footer
  return (
    <div className="flex items-center gap-5">
      <Link
        href={personal}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#333] hover:text-[#555] transition-colors"
        aria-label="Instagram personal"
      >
        <InstagramIcon size={15} />
      </Link>
      <Link
        href={media}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#333] hover:text-[#555] transition-colors"
        aria-label="Instagram photography"
      >
        <InstagramIcon size={15} />
      </Link>
    </div>
  );
}
