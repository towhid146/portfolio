import { NextRequest, NextResponse } from "next/server";
import { getExamBySlug, saveExamResult, ExamResult } from "@/lib/exams";

type RouteParams = { params: Promise<{ slug: string }> };

// POST submit exam answers
export async function POST(request: NextRequest, { params }: RouteParams) {
  const { slug } = await params;

  try {
    const exam = await getExamBySlug(slug);

    if (!exam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    if (!exam.public) {
      return NextResponse.json(
        { error: "Exam not available" },
        { status: 403 },
      );
    }

    const { answers } = await request.json();

    if (!Array.isArray(answers)) {
      return NextResponse.json(
        { error: "Answers must be an array" },
        { status: 400 },
      );
    }

    // Calculate results
    let correct = 0;
    let wrong = 0;
    let skipped = 0;
    const userAnswers: (number | null)[] = [];
    const correctAnswers: number[] = [];

    exam.questions.forEach((q, i) => {
      const userAnswer = answers[i];
      userAnswers.push(userAnswer ?? null);
      correctAnswers.push(q.ans);

      if (userAnswer === null || userAnswer === undefined) {
        skipped++;
      } else if (userAnswer === q.ans) {
        correct++;
      } else {
        wrong++;
      }
    });

    const score = correct * exam.correctMark - wrong * exam.wrongMark;

    const result: ExamResult = {
      examSlug: slug,
      submittedAt: new Date().toISOString(),
      totalQuestions: exam.questions.length,
      answered: correct + wrong,
      correct,
      wrong,
      skipped,
      score,
      maxScore: exam.questions.length * exam.correctMark,
      userAnswers,
    };

    // Save result (keeps only last 2)
    await saveExamResult(result);

    return NextResponse.json({
      success: true,
      result: {
        ...result,
        correctAnswers, // Send correct answers after submission
      },
    });
  } catch (error) {
    console.error("Error submitting exam:", error);
    return NextResponse.json(
      { error: "Failed to submit exam" },
      { status: 500 },
    );
  }
}
