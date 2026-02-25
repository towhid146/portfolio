import { NextRequest, NextResponse } from "next/server";
import { getAllExams, getPublicExams, createExam } from "@/lib/exams";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE } from "@/lib/auth";

function isAuthenticated(request: NextRequest): boolean {
  const session = request.cookies.get(AUTH_COOKIE_NAME);
  return session?.value === AUTH_COOKIE_VALUE;
}

// GET all exams
export async function GET(request: NextRequest) {
  const isAdmin = isAuthenticated(request);
  const includePrivate = request.nextUrl.searchParams.get("all") === "true";

  try {
    const exams =
      includePrivate && isAdmin ? await getAllExams() : await getPublicExams();

    // For public view, don't include answers
    const safeExams = exams.map((exam) => ({
      slug: exam.slug,
      title: exam.title,
      subtitle: exam.subtitle,
      duration: exam.duration,
      totalMarks: exam.totalMarks,
      correctMark: exam.correctMark,
      wrongMark: exam.wrongMark,
      questionCount: exam.questions.length,
      public: exam.public,
      createdAt: exam.createdAt,
    }));

    return NextResponse.json(safeExams);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch exams" },
      { status: 500 },
    );
  }
}

// POST create new exam
export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      subtitle,
      duration,
      totalMarks,
      correctMark,
      wrongMark,
      questions,
      isPublic,
    } = body;

    if (
      !title ||
      !questions ||
      !Array.isArray(questions) ||
      questions.length === 0
    ) {
      return NextResponse.json(
        { error: "Title and questions are required" },
        { status: 400 },
      );
    }

    const slug = await createExam({
      title,
      subtitle: subtitle || "",
      duration: duration || "2 hours",
      totalMarks: totalMarks || questions.length,
      correctMark: correctMark || 1,
      wrongMark: wrongMark || 0.5,
      questions,
      public: isPublic !== false,
    });

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error("Error creating exam:", error);
    return NextResponse.json(
      { error: "Failed to create exam" },
      { status: 500 },
    );
  }
}
