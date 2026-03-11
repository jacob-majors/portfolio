"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import type { blogPosts } from "@/db/schema";
import type { InferSelectModel } from "drizzle-orm";

type Post = InferSelectModel<typeof blogPosts>;

export function LatestPosts({ posts }: { posts: Post[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  if (posts.length === 0) {
    return (
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto h-64 border border-dashed border-[#333] rounded flex items-center justify-center">
          <p className="text-[#666] text-sm">No posts yet — write your first from the admin panel</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="px-6 pb-32">
      <div className="max-w-7xl mx-auto divide-y divide-[#1a1a1a]">
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Link href={`/blog/${post.slug}`} className="group flex flex-col md:flex-row md:items-center justify-between py-8 gap-4">
              <div>
                <p className="text-[#666] text-xs tracking-widest uppercase mb-3">
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
                </p>
                <h3 className="text-white text-2xl font-light group-hover:text-[#c8a96e] transition-colors duration-300">{post.title}</h3>
                {post.excerpt && <p className="text-[#666] mt-2 text-sm leading-relaxed max-w-xl">{post.excerpt}</p>}
              </div>
              <span className="text-[#c8a96e] text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
