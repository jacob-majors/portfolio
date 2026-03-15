"use server";

export type CloudinaryUsage = {
  plan: string;
  resources: number;
  storage: { usage: number; limit: number };
  bandwidth: { usage: number; limit: number };
  transformations: { usage: number; limit: number };
  requests: number;
  last_updated: string;
};

export async function getCloudinaryStats(): Promise<CloudinaryUsage | null> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return null;
  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/usage`, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`,
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
