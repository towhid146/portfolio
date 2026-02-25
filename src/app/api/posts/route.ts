import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE } from "@/lib/auth";

const postsPath = path.join(process.cwd(), "data", "posts");

// Check if user is authenticated
function isAuthenticated(request: NextRequest): boolean {
  const session = request.cookies.get(AUTH_COOKIE_NAME);
  return session?.value === AUTH_COOKIE_VALUE;
}

// GET all posts (for admin - includes private posts)
export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const files = fs.readdirSync(postsPath).filter((f) => f.endsWith(".md"));
    const posts = files.map((file) => {
      const raw = fs.readFileSync(path.join(postsPath, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString().split("T")[0],
        public: data.public !== false,
        content: content,
      };
    });

    // Sort by date descending
    posts.sort((a, b) => (a.date < b.date ? 1 : -1));

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}

// POST create new post
export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, content, isPublic } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 },
      );
    }

    const date = new Date().toISOString().split("T")[0];
    const slug = `${date}-${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}`;

    const frontmatter = `---
title: "${title}"
date: "${date}"
public: ${isPublic}
---

${content}`;

    fs.writeFileSync(path.join(postsPath, `${slug}.md`), frontmatter);

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 },
    );
  }
}
