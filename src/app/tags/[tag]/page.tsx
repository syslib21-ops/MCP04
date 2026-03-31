import { notFound } from "next/navigation";
import { PostCard } from "@/components/post-card";
import { getPostsByTag, getTagMap } from "@/lib/posts";

type Params = {
  tag: string;
};

export async function generateStaticParams() {
  return Array.from(getTagMap().keys()).map((tag) => ({ tag }));
}

export default async function TagPage({ params }: { params: Promise<Params> }) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  if (!posts.length) notFound();

  return (
    <section className="space-y-5">
      <h1 className="text-4xl font-bold tracking-tight">#{tag}</h1>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </section>
  );
}
