import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const postsPath = path.join(process.cwd(), "data", "posts");

export type PostMeta = {
  title: string;
  date: string;
  public?: boolean;
};

export async function getPostSlugs() {
  return fs.readdirSync(postsPath).map((f) => f.replace(/\.md$/, ""));
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsPath, `${slug}.md`);
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  const html = marked(content);
  return { meta: data as PostMeta, content: html, slug };
}

export async function getAllPosts() {
  const slugs = await getPostSlugs();
  const posts = slugs.map((s) => {
    const raw = fs.readFileSync(path.join(postsPath, `${s}.md`), "utf-8");
    const { data } = matter(raw);
    return { slug: s, meta: data as PostMeta };
  });
  // sort by date desc
  return posts.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}
