"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Exam = {
  slug: string;
  title: string;
  subtitle?: string;
  duration: string;
  totalMarks: number;
  questionCount: number;
  public: boolean;
  createdAt: string;
};

type Result = {
  submittedAt: string;
  correct: number;
  wrong: number;
  skipped: number;
  score: number;
  maxScore: number;
};

export default function AdminExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [results, setResults] = useState<Record<string, Result[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchExams();
  }, []);

  const checkAuth = async () => {
    const res = await fetch("/api/auth/check");
    if (!res.ok) {
      router.push("/admin");
    }
  };

  const fetchExams = async () => {
    try {
      const res = await fetch("/api/exams?all=true");
      if (res.ok) {
        const data = await res.json();
        setExams(data);

        // Fetch results for each exam
        const resultsData: Record<string, Result[]> = {};
        for (const exam of data) {
          const resResult = await fetch(`/api/exams/${exam.slug}`);
          if (resResult.ok) {
            const examData = await resResult.json();
            if (examData.results) {
              resultsData[exam.slug] = examData.results;
            }
          }
        }
        setResults(resultsData);
      } else if (res.status === 401) {
        router.push("/admin");
      }
    } catch (err) {
      setError("Failed to fetch exams");
    } finally {
      setLoading(false);
    }
  };

  const togglePublic = async (slug: string) => {
    try {
      const res = await fetch(`/api/exams/${slug}`, { method: "PATCH" });
      if (res.ok) {
        const data = await res.json();
        setExams(
          exams.map((e) =>
            e.slug === slug ? { ...e, public: data.public } : e,
          ),
        );
      }
    } catch (err) {
      setError("Failed to toggle status");
    }
  };

  const deleteExam = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this exam?")) return;

    try {
      const res = await fetch(`/api/exams/${slug}`, { method: "DELETE" });
      if (res.ok) {
        setExams(exams.filter((e) => e.slug !== slug));
      }
    } catch (err) {
      setError("Failed to delete exam");
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-950 flex items-center justify-center">
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
          <span className="text-lg">Loading...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">MCQ Exams</h1>
            <p className="text-slate-400 mt-1">
              Manage your examinations and view results
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/exams/new"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium hover:shadow-lg hover:shadow-amber-500/25 transition-all"
            >
              + New Exam
            </Link>
            <Link
              href="/admin/dashboard"
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600 transition-colors"
            >
              ← Dashboard
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400">
            {error}
          </div>
        )}

        {/* Exams List */}
        {exams.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800">
            <div className="w-20 h-20 mx-auto rounded-full bg-slate-800/50 flex items-center justify-center mb-6">
              <span className="text-4xl">📝</span>
            </div>
            <h3 className="text-xl text-slate-300 mb-2">No Exams Yet</h3>
            <p className="text-slate-500 mb-6">Create your first MCQ exam!</p>
            <Link
              href="/admin/exams/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium hover:shadow-lg hover:shadow-amber-500/25 transition-all"
            >
              + Create Exam
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {exams.map((exam) => (
              <div
                key={exam.slug}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {exam.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          exam.public
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-slate-700/50 text-slate-400 border border-slate-600"
                        }`}
                      >
                        {exam.public ? "Public" : "Private"}
                      </span>
                    </div>
                    {exam.subtitle && (
                      <p className="text-slate-400 text-sm mb-3">
                        {exam.subtitle}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <span>📝 {exam.questionCount} questions</span>
                      <span>⏱️ {exam.duration}</span>
                      <span>
                        📅 {new Date(exam.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Results Summary */}
                    {results[exam.slug] && results[exam.slug].length > 0 && (
                      <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
                        <h4 className="text-sm font-medium text-amber-400 mb-2">
                          Last 2 Submissions:
                        </h4>
                        <div className="space-y-2">
                          {results[exam.slug].map((r, i) => (
                            <div
                              key={i}
                              className="flex flex-wrap gap-4 text-xs text-slate-400"
                            >
                              <span>
                                {new Date(r.submittedAt).toLocaleString()}
                              </span>
                              <span className="text-green-400">
                                ✓ {r.correct}
                              </span>
                              <span className="text-red-400">✗ {r.wrong}</span>
                              <span className="text-slate-500">
                                ⊖ {r.skipped}
                              </span>
                              <span className="text-amber-400 font-medium">
                                Score: {r.score.toFixed(2)}/{r.maxScore}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/exams/${exam.slug}`}
                      target="_blank"
                      className="p-2 rounded-lg bg-slate-800 text-cyan-400 hover:bg-slate-700 transition-colors"
                      title="View Exam"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </Link>
                    <Link
                      href={`/admin/exams/${exam.slug}/edit`}
                      className="p-2 rounded-lg bg-slate-800 text-amber-400 hover:bg-amber-500/20 transition-colors"
                      title="Edit Exam Settings"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </Link>
                    <button
                      onClick={() => togglePublic(exam.slug)}
                      className={`p-2 rounded-lg transition-colors ${
                        exam.public
                          ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                      title={exam.public ? "Make Private" : "Make Public"}
                    >
                      {exam.public ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={() => deleteExam(exam.slug)}
                      className="p-2 rounded-lg bg-slate-800 text-red-400 hover:bg-red-500/20 transition-colors"
                      title="Delete Exam"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
