import Link from "next/link";
import Image from "next/image";
import { PostCard } from "@/components/post-card";
import { getAllPosts, getCategoryMap, getTagMap } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts().slice(0, 5);
  const tags = Array.from(getTagMap().entries()).slice(0, 12);
  const categories = Array.from(getCategoryMap().entries());

  return (
    <section className="space-y-10">
      <div className="rounded-3xl bg-gradient-to-br from-rose-100 via-white to-sky-100 p-8 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-rose-700 dark:text-rose-300">Markdown Static Blog</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">기록이 쌓이는 월간 저널</h1>
            <p className="mt-3 max-w-2xl text-zinc-700 dark:text-zinc-300">
              GitHub Pages에 올릴 수 있는 정적 블로그입니다. 카테고리와 태그, 월별 아카이브를 통해 글을 쉽게 탐색할 수 있습니다.
            </p>
          </div>
          <Image
            src="/blogicon.png"
            alt="블로그 대표 아이콘"
            width={128}
            height={128}
            className="mx-auto shrink-0 rounded-3xl border border-zinc-200/70 bg-white/70 p-2 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/70"
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Latest Posts</h2>
            <Link href="/blog" className="text-sm font-medium text-rose-700 hover:underline dark:text-rose-300">
              전체 보기
            </Link>
          </div>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {categories.map(([category, count]) => (
                <li key={category}>
                  <Link href={`/categories/${category}`} className="flex items-center justify-between hover:underline">
                    <span>{category}</span>
                    <span className="text-zinc-500">{count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-lg font-semibold">Tags</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map(([tag, count]) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                >
                  #{tag} ({count})
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
