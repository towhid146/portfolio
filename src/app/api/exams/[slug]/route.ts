import { NextRequest, NextResponse } from "next/server";
import {
  getExamBySlug,
  updateExam,
  deleteExam,
  getExamResults,
} from "@/lib/exams";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE } from "@/lib/auth";

function isAuthenticated(request: NextRequest): boolean {
  const session = request.cookies.get(AUTH_COOKIE_NAME);
  return session?.value === AUTH_COOKIE_VALUE;
}

type RouteParams = { params: Promise<{ slug: string }> };

// GET single exam
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { slug } = await params;
  const isAdmin = isAuthenticated(request);

  try {
    const exam = await getExamBySlug(slug);

    if (!exam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    // Check if exam is public or user is admin
    if (!exam.public && !isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // For admin, include results
    if (isAdmin) {
      const results = await getExamResults(slug);
      return NextResponse.json({ exam, results });
    }

    // For public, don't include answers
    const safeExam = {
      ...exam,
      questions: exam.questions.map((q) => ({
        q: q.q,
        opts: q.opts,
        // Don't send answers to client
      })),
    };

    return NextResponse.json({ exam: safeExam });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch exam" },
      { status: 500 },
    );
  }
}

// PATCH toggle public status
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;

  try {
    const exam = await getExamBySlug(slug);
    if (!exam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    await updateExam(slug, { public: !exam.public });

    return NextResponse.json({ success: true, public: !exam.public });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update exam" },
      { status: 500 },
    );
  }
}

// PUT update exam
export async function PUT(request: NextRequest, { params }: RouteParams) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;

  try {
    const body = await request.json();
    const success = await updateExam(slug, body);

    if (!success) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update exam" },
      { status: 500 },
    );
  }
}

// DELETE exam
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;

  try {
    const success = await deleteExam(slug);

    if (!success) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete exam" },
      { status: 500 },
    );
  }
}
