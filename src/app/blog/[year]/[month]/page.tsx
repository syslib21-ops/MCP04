import { notFound } from "next/navigation";
import { PostCard } from "@/components/post-card";
import { getMonthlyArchive, getPostsByYearMonth } from "@/lib/posts";

type Params = {
  year: string;
  month: string;
};

export async function generateStaticParams() {
  return getMonthlyArchive().map((archive) => ({
    year: archive.year,
    month: archive.month,
  }));
}

export default async function MonthlyArchivePage({ params }: { params: Promise<Params> }) {
  const { year, month } = await params;
  const posts = getPostsByYearMonth(year, month);
  if (!posts.length) notFound();

  return (
    <section className="space-y-5">
      <h1 className="text-4xl font-bold tracking-tight">
        {year}.{month} Archive
      </h1>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </section>
  );
}
