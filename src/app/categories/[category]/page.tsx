import { notFound } from "next/navigation";
import { PostCard } from "@/components/post-card";
import { getCategoryMap, getPostsByCategory } from "@/lib/posts";

type Params = {
  category: string;
};

export async function generateStaticParams() {
  return Array.from(getCategoryMap().keys()).map((category) => ({ category }));
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  if (!posts.length) notFound();

  return (
    <section className="space-y-5">
      <h1 className="text-4xl font-bold tracking-tight">{category}</h1>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </section>
  );
}
