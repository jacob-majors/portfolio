"use server";

import { db } from "@/db";
import { photos } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function savePhoto(data: {
  title: string;
  description?: string;
  cloudinaryId: string;
  cloudinaryUrl: string;
  category: string;
  width?: number;
  height?: number;
  featured: boolean;
}) {
  await db.insert(photos).values(data);
  revalidatePath("/");
  revalidatePath("/photography");
}
