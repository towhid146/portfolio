"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type Question = {
  q: string;
  opts: string[];
};

type ExamData = {
  slug: string;
  title: string;
  subtitle?: string;
  duration: string;
  totalMarks: number;
  correctMark: number;
  wrongMark: number;
  questions: Question[];
};

type Result = {
  totalQuestions: number;
  answered: number;
  correct: number;
  wrong: number;
  skipped: number;
  score: number;
  maxScore: number;
  correctAnswers: number[];
};

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [exam, setExam] = useState<ExamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [filter, setFilter] = useState<
    "all" | "unanswered" | "correct" | "wrong"
  >("all");

  useEffect(() => {
    fetchExam();
  }, [slug]);

  const fetchExam = async () => {
    try {
      const res = await fetch(`/api/exams/${slug}`);
      if (!res.ok) {
        if (res.status === 404) {
          setError("Exam not found");
        } else {
          setError("Failed to load exam");
        }
        return;
      }
      const data = await res.json();
      setExam(data.exam);
      setUserAnswers(new Array(data.exam.questions.length).fill(null));
    } catch (err) {
      setError("Failed to load exam");
    } finally {
      setLoading(false);
    }
  };

  const selectAnswer = (questionIndex: number, optionIndex: number) => {
    if (submitted) return;

    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const submitExam = async () => {
    if (submitted || !exam) return;

    try {
      const res = await fetch(`/api/exams/${slug}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: userAnswers }),
      });

      if (!res.ok) {
        setError("Failed to submit exam");
        return;
      }

      const data = await res.json();
      setResult(data.result);
      setSubmitted(true);

      // Scroll to top to show results
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError("Failed to submit exam");
    }
  };

  const resetExam = () => {
    if (!exam) return;
    setUserAnswers(new Array(exam.questions.length).fill(null));
    setSubmitted(false);
    setResult(null);
    setFilter("all");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const answeredCount = userAnswers.filter((a) => a !== null).length;
  const progressPercent = exam
    ? Math.round((answeredCount / exam.questions.length) * 100)
    : 0;

  const getFilteredQuestions = () => {
    if (!exam || !result)
      return exam?.questions.map((q, i) => ({ q, i })) || [];

    return exam.questions
      .map((q, i) => ({ q, i }))
      .filter(({ i }) => {
        if (filter === "all") return true;
        if (filter === "unanswered") return userAnswers[i] === null;
        if (filter === "correct")
          return userAnswers[i] === result.correctAnswers[i];
        if (filter === "wrong")
          return (
            userAnswers[i] !== null &&
            userAnswers[i] !== result.correctAnswers[i]
          );
        return true;
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-amber-400 flex items-center gap-3">
          <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="text-lg">Loading exam...</span>
        </div>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {error || "Exam not found"}
          </h2>
          <Link href="/exams" className="text-amber-400 hover:underline">
            ← Back to Exams
          </Link>
        </div>
      </div>
    );
  }

  const optionLabels = ["ক", "খ", "গ", "ঘ"];

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] font-sans">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#1a1f2e] to-[#0d1117] border-b-2 border-amber-500 p-6 text-center sticky top-0 z-50 shadow-lg shadow-amber-500/15">
        <div className="text-xs tracking-[4px] text-amber-400 uppercase mb-1 font-mono">
          Live MCQ · {exam.slug.split("-").slice(0, 3).join("-")}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          {exam.title}
        </h1>
        {exam.subtitle && (
          <p className="text-slate-400 mt-1">{exam.subtitle}</p>
        )}
        <div className="flex justify-center gap-6 mt-4 flex-wrap">
          <div className="bg-[#21262d] border border-[#30363d] px-4 py-1 rounded-full text-sm text-slate-400">
            সময়:{" "}
            <span className="text-amber-400 font-semibold">
              {exam.duration}
            </span>
          </div>
          <div className="bg-[#21262d] border border-[#30363d] px-4 py-1 rounded-full text-sm text-slate-400">
            পূর্ণমান:{" "}
            <span className="text-amber-400 font-semibold">
              {exam.totalMarks}
            </span>
          </div>
          <div className="bg-[#21262d] border border-[#30363d] px-4 py-1 rounded-full text-sm text-slate-400">
            প্রশ্ন:{" "}
            <span className="text-amber-400 font-semibold">
              {exam.questions.length}
            </span>
          </div>
          <div className="bg-[#21262d] border border-[#30363d] px-4 py-1 rounded-full text-sm text-slate-400">
            সঠিক:{" "}
            <span className="text-amber-400 font-semibold">
              +{exam.correctMark}
            </span>{" "}
            ভুল:{" "}
            <span className="text-amber-400 font-semibold">
              -{exam.wrongMark}
            </span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-[#161b22] border-b border-[#30363d] p-3 px-6 sticky top-[140px] md:top-[120px] z-40">
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>
            {answeredCount} / {exam.questions.length} উত্তর দেওয়া হয়েছে
          </span>
          <span>{progressPercent}%</span>
        </div>
        <div className="h-1 bg-[#21262d] rounded overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-cyan-400 rounded transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-4xl mx-auto px-4 py-5 flex flex-wrap gap-3 items-center">
        <button
          onClick={submitExam}
          disabled={submitted}
          className="px-5 py-2.5 rounded-lg bg-amber-500 text-black font-semibold hover:bg-amber-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ✓ ফলাফল দেখুন
        </button>
        <button
          onClick={resetExam}
          className="px-5 py-2.5 rounded-lg bg-[#21262d] text-white border border-[#30363d] font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-all"
        >
          ↺ পুনরায় শুরু
        </button>
        {submitted && (
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="px-4 py-2.5 bg-[#21262d] border border-[#30363d] text-white rounded-lg cursor-pointer"
          >
            <option value="all">সকল প্রশ্ন</option>
            <option value="unanswered">অনুত্তরিত</option>
            <option value="correct">সঠিক</option>
            <option value="wrong">ভুল</option>
          </select>
        )}
        <Link
          href="/exams"
          className="px-5 py-2.5 rounded-lg bg-transparent text-red-400 border border-red-400 font-semibold hover:bg-red-500 hover:text-white transition-all ml-auto"
        >
          ← পরীক্ষা তালিকা
        </Link>
      </div>

      {/* Score Card */}
      {submitted && result && (
        <div className="max-w-4xl mx-auto px-4 mb-6">
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-4 bg-[#21262d] rounded-lg">
              <div className="text-3xl font-bold font-mono text-cyan-400">
                {result.answered}
              </div>
              <div className="text-xs text-slate-400 mt-1">মোট উত্তর</div>
            </div>
            <div className="p-4 bg-[#21262d] rounded-lg">
              <div className="text-3xl font-bold font-mono text-green-400">
                {result.correct}
              </div>
              <div className="text-xs text-slate-400 mt-1">সঠিক</div>
            </div>
            <div className="p-4 bg-[#21262d] rounded-lg">
              <div className="text-3xl font-bold font-mono text-red-400">
                {result.wrong}
              </div>
              <div className="text-xs text-slate-400 mt-1">ভুল</div>
            </div>
            <div className="p-4 bg-[#21262d] rounded-lg">
              <div className="text-3xl font-bold font-mono text-slate-400">
                {result.skipped}
              </div>
              <div className="text-xs text-slate-400 mt-1">বাদ দেওয়া</div>
            </div>
            <div className="p-4 bg-[#21262d] rounded-lg col-span-2 md:col-span-1">
              <div className="text-3xl font-bold font-mono text-amber-400">
                {result.score.toFixed(2)}
              </div>
              <div className="text-xs text-slate-400 mt-1">প্রাপ্ত নম্বর</div>
            </div>
          </div>
        </div>
      )}

      {/* Questions */}
      <div className="max-w-4xl mx-auto px-4 pb-10">
        {getFilteredQuestions().map(({ q, i }) => {
          const isAnswered = userAnswers[i] !== null;
          const isCorrect =
            submitted && result && userAnswers[i] === result.correctAnswers[i];
          const isWrong =
            submitted &&
            result &&
            userAnswers[i] !== null &&
            userAnswers[i] !== result.correctAnswers[i];
          const isSkipped = submitted && userAnswers[i] === null;

          return (
            <div
              key={i}
              className={`bg-[#161b22] border rounded-xl p-5 mb-4 transition-all ${
                isCorrect
                  ? "border-green-500 bg-green-500/5"
                  : isWrong
                    ? "border-red-500 bg-red-500/5"
                    : isSkipped
                      ? "border-[#30363d] opacity-60"
                      : "border-[#30363d] hover:border-[#444d56]"
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start gap-3 mb-4">
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-1 rounded shrink-0">
                  {String(i + 1).padStart(3, "0")}
                </span>
                <p className="text-[15px] leading-relaxed">{q.q}</p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {q.opts.map((opt, j) => {
                  const isSelected = userAnswers[i] === j;
                  const isCorrectAnswer =
                    submitted && result && result.correctAnswers[i] === j;
                  const isWrongAnswer =
                    submitted && result && isSelected && !isCorrectAnswer;

                  let buttonClass =
                    "bg-[#21262d] border-[#30363d] hover:border-cyan-400 hover:bg-cyan-400/10";
                  if (isSelected && !submitted) {
                    buttonClass = "border-cyan-400 bg-cyan-400/15";
                  }
                  if (submitted) {
                    if (isCorrectAnswer) {
                      buttonClass =
                        "border-green-500 bg-green-500/15 text-green-400";
                    } else if (isWrongAnswer) {
                      buttonClass = "border-red-500 bg-red-500/15 text-red-400";
                    }
                  }

                  return (
                    <button
                      key={j}
                      onClick={() => selectAnswer(i, j)}
                      disabled={submitted}
                      className={`flex items-center gap-3 px-4 py-3 border rounded-lg text-left transition-all w-full disabled:cursor-default ${buttonClass}`}
                    >
                      <span className="font-mono text-xs font-bold opacity-70 w-5 shrink-0">
                        {optionLabels[j]})
                      </span>
                      <span>{opt.replace(/^[কখগঘ]\)\s?/, "")}</span>
                      {submitted && isCorrectAnswer && (
                        <span className="ml-auto w-5 h-5 rounded-full bg-green-500 text-black text-xs flex items-center justify-center">
                          ✓
                        </span>
                      )}
                      {submitted && isWrongAnswer && (
                        <span className="ml-auto w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                          ✗
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="text-center py-5 border-t border-[#30363d] text-slate-500 text-xs">
        Live MCQ · Portfolio · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
