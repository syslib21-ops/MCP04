import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  category: string;
  content: string;
  year: string;
  month: string;
};

type Frontmatter = {
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  category?: string;
  draft?: boolean;
};

const POSTS_ROOT = path.join(process.cwd(), "posts");

const normalize = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, "-");

const toDateValue = (date: string) => new Date(date).getTime();

export const formatKoreanDate = (date: string) =>
  new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_ROOT)) return [];

  const posts: Post[] = [];
  const years = fs.readdirSync(POSTS_ROOT, { withFileTypes: true }).filter((entry) => entry.isDirectory());

  for (const yearEntry of years) {
    const year = yearEntry.name;
    const yearDir = path.join(POSTS_ROOT, year);
    const months = fs.readdirSync(yearDir, { withFileTypes: true }).filter((entry) => entry.isDirectory());

    for (const monthEntry of months) {
      const month = monthEntry.name;
      const monthDir = path.join(yearDir, month);
      const files = fs
        .readdirSync(monthDir, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith(".md"));

      for (const file of files) {
        const slug = file.name.replace(/\.md$/, "");
        const fullPath = path.join(monthDir, file.name);
        const raw = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(raw);
        const frontmatter = data as Frontmatter;

        if (frontmatter.draft) continue;

        posts.push({
          slug,
          title: frontmatter.title ?? slug,
          date: frontmatter.date,
          summary: frontmatter.summary ?? "",
          tags: (frontmatter.tags ?? []).map(normalize),
          category: normalize(frontmatter.category ?? "uncategorized"),
          content,
          year,
          month,
        });
      }
    }
  }

  return posts.sort((a, b) => toDateValue(b.date) - toDateValue(a.date));
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getMonthlyArchive() {
  const map = new Map<string, { year: string; month: string; count: number }>();

  for (const post of getAllPosts()) {
    const key = `${post.year}-${post.month}`;
    const existing = map.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(key, { year: post.year, month: post.month, count: 1 });
    }
  }

  return Array.from(map.values()).sort((a, b) => `${b.year}${b.month}`.localeCompare(`${a.year}${a.month}`));
}

export function getPostsByYearMonth(year: string, month: string) {
  return getAllPosts().filter((post) => post.year === year && post.month === month);
}

export function getTagMap() {
  const map = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }
  return map;
}

export function getCategoryMap() {
  const map = new Map<string, number>();
  for (const post of getAllPosts()) {
    map.set(post.category, (map.get(post.category) ?? 0) + 1);
  }
  return map;
}

export function getPostsByTag(tag: string) {
  return getAllPosts().filter((post) => post.tags.includes(normalize(tag)));
}

export function getPostsByCategory(category: string) {
  return getAllPosts().filter((post) => post.category === normalize(category));
}
