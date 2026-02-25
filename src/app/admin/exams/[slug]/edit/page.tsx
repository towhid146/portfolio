"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

type Question = {
  q: string;
  opts: string[];
  ans: number;
};

type ExamData = {
  slug: string;
  title: string;
  subtitle?: string;
  duration: string;
  totalMarks: number;
  correctMark: number;
  wrongMark: number;
  public: boolean;
  questions: Question[];
};

export default function EditExamPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [exam, setExam] = useState<ExamData | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [duration, setDuration] = useState("");
  const [correctMark, setCorrectMark] = useState(1);
  const [wrongMark, setWrongMark] = useState(0.5);
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    checkAuth();
    fetchExam();
  }, [slug]);

  const checkAuth = async () => {
    const res = await fetch("/api/auth/check");
    if (!res.ok) {
      router.push("/admin");
    }
  };

  const fetchExam = async () => {
    try {
      const res = await fetch(`/api/exams/${slug}`);
      if (!res.ok) {
        setError("Exam not found");
        return;
      }
      const data = await res.json();
      const examData = data.exam;
      setExam(examData);
      setTitle(examData.title);
      setSubtitle(examData.subtitle || "");
      setDuration(examData.duration);
      setCorrectMark(examData.correctMark);
      setWrongMark(examData.wrongMark);
      setIsPublic(examData.public);
    } catch (err) {
      setError("Failed to load exam");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/exams/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          subtitle,
          duration,
          correctMark,
          wrongMark,
          totalMarks: exam ? exam.questions.length * correctMark : 0,
          public: isPublic,
        }),
      });

      if (res.ok) {
        setSuccess("Exam updated successfully!");
        setTimeout(() => {
          router.push("/admin/exams");
        }, 1500);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update exam");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setSaving(false);
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

  if (!exam) {
    return (
      <section className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {error || "Exam not found"}
          </h2>
          <Link href="/admin/exams" className="text-amber-400 hover:underline">
            ← Back to Exams
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Edit Exam</h1>
            <p className="text-slate-400 mt-1">
              Update exam settings and marking
            </p>
          </div>
          <Link
            href="/admin/exams"
            className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600 transition-colors"
          >
            ← Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400">
              {success}
            </div>
          )}

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                required
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                placeholder="২ ঘণ্টা / 2 hours / 90 minutes"
              />
            </div>

            {/* Marking */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Correct Mark (+)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={correctMark}
                  onChange={(e) =>
                    setCorrectMark(parseFloat(e.target.value) || 0)
                  }
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Points per correct answer
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Wrong Mark (-)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={wrongMark}
                  onChange={(e) =>
                    setWrongMark(parseFloat(e.target.value) || 0)
                  }
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Points deducted per wrong
                </p>
              </div>
            </div>

            {/* Calculated Total */}
            <div className="p-4 bg-slate-800/50 rounded-xl">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Questions:</span>
                <span className="text-white font-medium">
                  {exam.questions.length}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-slate-400">Total Marks:</span>
                <span className="text-amber-400 font-bold">
                  {(exam.questions.length * correctMark).toFixed(1)}
                </span>
              </div>
            </div>

            {/* Public Toggle */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isPublic"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="w-5 h-5 rounded bg-slate-800 border-slate-600 text-amber-500 focus:ring-amber-500"
              />
              <label htmlFor="isPublic" className="text-slate-300">
                Make this exam public
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold hover:shadow-lg hover:shadow-amber-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
