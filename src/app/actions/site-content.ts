"use server";

import { db } from "@/db";
import { siteContent } from "@/db/schema";
import { eq, like } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getSiteContent(key: string): Promise<string | null> {
  try {
    const rows = await db.select().from(siteContent).where(eq(siteContent.key, key));
    return rows[0]?.value ?? null;
  } catch {
    return null;
  }
}

export async function setSiteContent(key: string, value: string) {
  await db
    .insert(siteContent)
    .values({ key, value })
    .onConflictDoUpdate({ target: siteContent.key, set: { value, updatedAt: new Date().toISOString() } });
  revalidatePath("/about");
  revalidatePath("/gear");
  if (key.startsWith("settings.nav")) {
    revalidatePath("/", "layout");
  }
}

export async function getAllPhotoTagKeys(): Promise<{ key: string; value: string }[]> {
  try {
    const rows = await db.select().from(siteContent).where(like(siteContent.key, "photo.tags.%"));
    return rows.filter(
      (r) => r.key !== "photo.tags.all" && r.key !== "photo.tags.searchIndex"
    );
  } catch {
    return [];
  }
}

export async function getGearContent(): Promise<{
  images: Record<string, string>;
  links: Record<string, string>;
}> {
  try {
    const rows = await db.select().from(siteContent).where(like(siteContent.key, "gear.%"));
    const images: Record<string, string> = {};
    const links: Record<string, string> = {};
    for (const row of rows) {
      if (row.key.startsWith("gear.image.")) images[row.key.replace("gear.image.", "")] = row.value;
      else if (row.key.startsWith("gear.link.")) links[row.key.replace("gear.link.", "")] = row.value;
    }
    return { images, links };
  } catch {
    return { images: {}, links: {} };
  }
}
