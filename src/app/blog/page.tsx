import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
  description: "Blog posts by Jacob Majors.",
};

const PLACEHOLDER_POSTS = [
  {
    id: 1,
    slug: "welcome",
    title: "Welcome to my site",
    excerpt: "This is where I'll share thoughts on photography, engineering, and whatever else is on my mind. Check back soon.",
    content: "",
    coverCloudinaryId: null,
    coverCloudinaryUrl: null,
    published: true,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

export default async function BlogPage() {
  let posts = PLACEHOLDER_POSTS as typeof blogPosts.$inferSelect[];

  try {
    const dbPosts = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.publishedAt));
    if (dbPosts.length > 0) posts = dbPosts;
  } catch {
    // DB not yet configured
  }

  return (
    <main className="pt-24">
      <div className="px-6 max-w-4xl mx-auto py-16">
        <p className="text-[#c8a96e] text-xs tracking-[0.4em] uppercase mb-4">Journal</p>
        <h1 className="text-5xl md:text-7xl font-light text-white mb-4">Writing</h1>
        <p className="text-[#666] text-lg">Ideas on technology, creativity, and the spaces between.</p>
      </div>

      <div className="px-6 max-w-4xl mx-auto pb-32 divide-y divide-[#1a1a1a]">
        {posts.map((post) => (
          <article key={post.id} className="py-12">
            <Link href={`/blog/${post.slug}`} className="group block">
              {post.coverCloudinaryUrl && (
                <div className="relative aspect-[16/6] overflow-hidden rounded-xl mb-8">
                  <Image
                    src={post.coverCloudinaryUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 896px"
                  />
                </div>
              )}
              <p className="text-[#666] text-xs tracking-widest uppercase mb-4">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : ""}
              </p>
              <h2 className="text-white text-3xl font-light mb-4 group-hover:text-[#c8a96e] transition-colors duration-300">
                {post.title}
              </h2>
              {post.excerpt && <p className="text-[#666] leading-relaxed">{post.excerpt}</p>}
              <span className="inline-flex items-center gap-2 mt-6 text-[#c8a96e] text-sm group-hover:gap-4 transition-all duration-300">
                Read more →
              </span>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
