import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { getAllPosts, getMonthlyArchive } from "@/lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();
  const archives = getMonthlyArchive();

  return (
    <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-5">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">Monthly Archive</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {archives.map((archive) => (
            <li key={`${archive.year}-${archive.month}`}>
              <Link
                href={`/blog/${archive.year}/${archive.month}`}
                className="flex items-center justify-between hover:underline"
              >
                <span>
                  {archive.year}.{archive.month}
                </span>
                <span className="text-zinc-500">{archive.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
