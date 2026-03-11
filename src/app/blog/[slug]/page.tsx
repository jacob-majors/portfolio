import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    if (!post) return { title: "Post not found" };
    return { title: post.title, description: post.excerpt || undefined };
  } catch {
    return { title: "Post" };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post: typeof blogPosts.$inferSelect | undefined;
  try {
    const [found] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    post = found;
  } catch {
    // DB not ready
  }

  if (!post || !post.published) notFound();

  return (
    <main className="pt-24">
      <article className="px-6 max-w-3xl mx-auto pb-32">
        <div className="py-16">
          <p className="text-[#c8a96e] text-xs tracking-[0.4em] uppercase mb-6">
            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
          </p>
          <h1 className="text-4xl md:text-6xl font-light text-white leading-tight mb-8">{post.title}</h1>
          {post.excerpt && <p className="text-[#999] text-xl leading-relaxed">{post.excerpt}</p>}
        </div>

        {post.coverCloudinaryUrl && (
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-16">
            <Image
              src={post.coverCloudinaryUrl}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        {/* Content rendered as prose */}
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-light prose-headings:text-white
            prose-p:text-[#999] prose-p:leading-relaxed
            prose-a:text-[#c8a96e] prose-a:no-underline hover:prose-a:underline
            prose-code:text-[#c8a96e] prose-code:bg-[#1a1a1a] prose-code:rounded prose-code:px-1
            prose-pre:bg-[#111] prose-pre:border prose-pre:border-[#1a1a1a]
            prose-blockquote:border-l-[#c8a96e] prose-blockquote:text-[#666]
            prose-hr:border-[#1a1a1a]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}
