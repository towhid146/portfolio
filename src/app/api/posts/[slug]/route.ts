import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE } from "@/lib/auth";

const postsPath = path.join(process.cwd(), "data", "posts");

function isAuthenticated(request: NextRequest): boolean {
  const session = request.cookies.get(AUTH_COOKIE_NAME);
  return session?.value === AUTH_COOKIE_VALUE;
}

// GET single post
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const filePath = path.join(postsPath, `${params.slug}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return NextResponse.json({
      slug: params.slug,
      title: data.title,
      date: data.date,
      public: data.public !== false,
      content: content,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 },
    );
  }
}

// PUT update post
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, content, isPublic } = await request.json();
    const filePath = path.join(postsPath, `${params.slug}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Get existing date
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data: existingData } = matter(raw);

    const frontmatter = `---
title: "${title}"
date: "${existingData.date}"
public: ${isPublic}
---

${content}`;

    fs.writeFileSync(filePath, frontmatter);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 },
    );
  }
}

// DELETE post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const filePath = path.join(postsPath, `${params.slug}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    fs.unlinkSync(filePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 },
    );
  }
}

// PATCH toggle public/private
export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const filePath = path.join(postsPath, `${params.slug}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const newPublicStatus = !data.public;

    const frontmatter = `---
title: "${data.title}"
date: "${data.date}"
public: ${newPublicStatus}
---

${content}`;

    fs.writeFileSync(filePath, frontmatter);

    return NextResponse.json({ success: true, public: newPublicStatus });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to toggle status" },
      { status: 500 },
    );
  }
}
