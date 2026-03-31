import Link from "next/link";
import { formatKoreanDate, type Post } from "@/lib/posts";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{formatKoreanDate(post.date)}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">
        <Link href={`/blog/post/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 text-zinc-700 dark:text-zinc-300">{post.summary}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Link
          href={`/categories/${post.category}`}
          className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
        >
          {post.category}
        </Link>
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
}
