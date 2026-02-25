"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Question = {
  q: string;
  opts: string[];
  ans: number;
};

export default function NewExamPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [duration, setDuration] = useState("2 hours");
  const [correctMark, setCorrectMark] = useState(1);
  const [wrongMark, setWrongMark] = useState(0.5);
  const [isPublic, setIsPublic] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [htmlCode, setHtmlCode] = useState("");
  const [simpleText, setSimpleText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [parseStatus, setParseStatus] = useState("");
  const [activeTab, setActiveTab] = useState<"html" | "simple" | "manual">(
    "simple",
  );

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const res = await fetch("/api/auth/check");
    if (!res.ok) {
      router.push("/admin");
    }
  };

  // Parse HTML to extract questions
  const parseHtmlCode = () => {
    setError("");
    setParseStatus("");

    try {
      // Extract the questions array from the HTML/JS code
      const questionsMatch = htmlCode.match(
        /const\s+questions\s*=\s*\[([\s\S]*?)\];/,
      );

      if (!questionsMatch) {
        setError(
          "Could not find questions array in the HTML code. Make sure it contains: const questions = [...]",
        );
        return;
      }

      const questionsStr = questionsMatch[1];

      // Parse the questions array
      // This regex matches each question object
      const questionRegex =
        /\{[^{}]*q\s*:\s*"([^"]+)"[^{}]*opts\s*:\s*\[((?:[^\[\]]*|\[[^\[\]]*\])*)\][^{}]*ans\s*:\s*(\d+)[^{}]*\}/g;

      const parsedQuestions: Question[] = [];
      let match;

      while ((match = questionRegex.exec(questionsStr)) !== null) {
        const questionText = match[1];
        const optsStr = match[2];
        const ansIndex = parseInt(match[3]);

        // Parse options
        const optMatches = optsStr.match(/"([^"]+)"/g);
        if (optMatches) {
          const opts = optMatches.map((o) => o.replace(/^"|"$/g, ""));
          parsedQuestions.push({
            q: questionText,
            opts,
            ans: ansIndex,
          });
        }
      }

      if (parsedQuestions.length === 0) {
        setError(
          "Could not parse any questions from the HTML code. Please check the format.",
        );
        return;
      }

      setQuestions(parsedQuestions);
      setParseStatus(
        `Successfully parsed ${parsedQuestions.length} questions!`,
      );

      // Try to extract title from HTML
      const titleMatch = htmlCode.match(/<title>([^<]+)<\/title>/);
      if (titleMatch && !title) {
        setTitle(titleMatch[1]);
      }

      // Try to extract header title
      const h1Match = htmlCode.match(/<h1[^>]*>([^<]+)<\/h1>/);
      if (h1Match && !title) {
        setTitle(h1Match[1]);
      }
    } catch (err) {
      setError("Error parsing HTML code: " + (err as Error).message);
    }
  };

  // Parse simple text format
  const parseSimpleText = () => {
    setError("");
    setParseStatus("");

    try {
      const lines = simpleText.split("\n").map((l) => l.trim());

      // Parse header section
      let headerEnded = false;
      let parsedTitle = "";
      let parsedSubtitle = "";
      let parsedDuration = "2 hours";
      let parsedCorrectMark = 1;
      let parsedWrongMark = 0.5;
      let parsedPublic = true;

      for (const line of lines) {
        if (line === "---QUESTIONS---") {
          headerEnded = true;
          break;
        }

        if (line.startsWith("EXAM_TITLE:")) {
          parsedTitle = line.replace("EXAM_TITLE:", "").trim();
        } else if (line.startsWith("EXAM_SUBTITLE:")) {
          parsedSubtitle = line.replace("EXAM_SUBTITLE:", "").trim();
        } else if (line.startsWith("DURATION:")) {
          parsedDuration = line.replace("DURATION:", "").trim();
        } else if (line.startsWith("CORRECT_MARK:")) {
          parsedCorrectMark =
            parseFloat(line.replace("CORRECT_MARK:", "").trim()) || 1;
        } else if (line.startsWith("WRONG_MARK:")) {
          parsedWrongMark =
            parseFloat(line.replace("WRONG_MARK:", "").trim()) || 0.5;
        } else if (line.startsWith("PUBLIC:")) {
          parsedPublic =
            line.replace("PUBLIC:", "").trim().toLowerCase() === "true";
        }
      }

      // Apply parsed header values
      if (parsedTitle && !title) setTitle(parsedTitle);
      if (parsedSubtitle && !subtitle) setSubtitle(parsedSubtitle);
      setDuration(parsedDuration);
      setCorrectMark(parsedCorrectMark);
      setWrongMark(parsedWrongMark);
      setIsPublic(parsedPublic);

      // Parse questions
      const questionsSection = simpleText.split("---QUESTIONS---")[1];
      if (!questionsSection) {
        setError(
          "Could not find ---QUESTIONS--- marker. Please add it before your questions.",
        );
        return;
      }

      const parsedQuestions: Question[] = [];
      const questionBlocks = questionsSection
        .split(/\n\s*\n/)
        .filter((b) => b.trim());

      for (const block of questionBlocks) {
        const blockLines = block
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l);

        let q = "";
        let opts: string[] = ["", "", "", ""];
        let ans = 0;

        for (const line of blockLines) {
          if (line.startsWith("Q:")) {
            q = line.replace("Q:", "").trim();
          } else if (line.startsWith("A:")) {
            opts[0] = line.replace("A:", "").trim();
          } else if (line.startsWith("B:")) {
            opts[1] = line.replace("B:", "").trim();
          } else if (line.startsWith("C:")) {
            opts[2] = line.replace("C:", "").trim();
          } else if (line.startsWith("D:")) {
            opts[3] = line.replace("D:", "").trim();
          } else if (line.startsWith("ANS:")) {
            const ansLetter = line.replace("ANS:", "").trim().toUpperCase();
            ans = { A: 0, B: 1, C: 2, D: 3 }[ansLetter] ?? 0;
          }
        }

        if (q && opts.some((o) => o)) {
          parsedQuestions.push({ q, opts, ans });
        }
      }

      if (parsedQuestions.length === 0) {
        setError("Could not parse any questions. Please check the format.");
        return;
      }

      setQuestions(parsedQuestions);
      setParseStatus(
        `Successfully parsed ${parsedQuestions.length} questions!`,
      );
    } catch (err) {
      setError("Error parsing text: " + (err as Error).message);
    }
  };

  // Sample text template
  const sampleTextTemplate = `EXAM_TITLE: প্রিলিমিনারি টেস্ট ২০২৬
EXAM_SUBTITLE: বাংলা ভার্সন — SET 03
DURATION: ২ ঘণ্টা
CORRECT_MARK: 1
WRONG_MARK: 0.5
PUBLIC: true

---QUESTIONS---

Q: বাংলাদেশের দীর্ঘতম নদী কোনটি?
A: পদ্মা
B: মেঘনা
C: যমুনা
D: ব্রহ্মপুত্র
ANS: D

Q: 2 + 2 = ?
A: 3
B: 4
C: 5
D: 6
ANS: B

Q: 'Helena said I took the laptop home with me.' Its indirect form is:
A: Helena said that she took the laptop home with her
B: Helena said that she had taken the laptop home with her
C: Helena confirmed that she has taken the laptop home with her
D: Helena told that she had the laptop taken home with her
ANS: B`;

  // Add a single question manually
  const addQuestion = () => {
    setQuestions([...questions, { q: "", opts: ["", "", "", ""], ans: 0 }]);
  };

  const updateQuestion = (
    index: number,
    field: keyof Question,
    value: string | number | string[],
  ) => {
    const updated = [...questions];
    if (field === "opts") {
      updated[index].opts = value as string[];
    } else if (field === "ans") {
      updated[index].ans = value as number;
    } else {
      updated[index].q = value as string;
    }
    setQuestions(updated);
  };

  const updateOption = (qIndex: number, optIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].opts[optIndex] = value;
    setQuestions(updated);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      setLoading(false);
      return;
    }

    if (questions.length === 0) {
      setError("At least one question is required");
      setLoading(false);
      return;
    }

    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].q.trim()) {
        setError(`Question ${i + 1} text is empty`);
        setLoading(false);
        return;
      }
      if (questions[i].opts.some((o) => !o.trim())) {
        setError(`Question ${i + 1} has empty options`);
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          subtitle,
          duration,
          totalMarks: questions.length * correctMark,
          correctMark,
          wrongMark,
          questions,
          isPublic,
        }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/exams");
      } else {
        setError(data.error || "Failed to create exam");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Create New Exam</h1>
            <p className="text-slate-400 mt-1">Create a new MCQ examination</p>
          </div>
          <Link
            href="/admin/exams"
            className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600 transition-colors"
          >
            ← Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400">
              {error}
            </div>
          )}

          {/* Basic Info */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">
              Basic Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                  placeholder="প্রিলিমিনারি টেস্ট ২০২৬"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                  placeholder="বাংলা ভার্সন — SET 02"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                  placeholder="2 hours"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Correct Mark
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={correctMark}
                  onChange={(e) => setCorrectMark(parseFloat(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Wrong Mark (negative)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={wrongMark}
                  onChange={(e) => setWrongMark(parseFloat(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                />
              </div>
            </div>

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

          {/* Questions Input */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Questions</h2>

            {/* Tabs */}
            <div className="flex border-b border-slate-700 mb-6 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab("simple")}
                className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                  activeTab === "simple"
                    ? "text-amber-400 border-b-2 border-amber-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Simple Text (Recommended)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("html")}
                className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                  activeTab === "html"
                    ? "text-amber-400 border-b-2 border-amber-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Import from HTML
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("manual")}
                className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                  activeTab === "manual"
                    ? "text-amber-400 border-b-2 border-amber-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Manual Entry
              </button>
            </div>

            {activeTab === "simple" && (
              <div className="space-y-4">
                <p className="text-slate-400 text-sm">
                  Use this simple text format to create exams. Click "Load
                  Sample" to see an example.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSimpleText(sampleTextTemplate)}
                    className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30 transition-colors text-sm"
                  >
                    Load Sample Template
                  </button>
                  <a
                    href="/MCQ_FORMAT_GUIDE.md"
                    target="_blank"
                    className="px-4 py-2 rounded-lg bg-slate-700/50 text-slate-300 border border-slate-600 hover:bg-slate-700 transition-colors text-sm"
                  >
                    View Format Guide
                  </a>
                </div>
                <textarea
                  value={simpleText}
                  onChange={(e) => setSimpleText(e.target.value)}
                  className="w-full h-80 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white font-mono text-sm"
                  placeholder={`EXAM_TITLE: My Exam Title
EXAM_SUBTITLE: Optional subtitle
DURATION: 2 hours
CORRECT_MARK: 1
WRONG_MARK: 0.5
PUBLIC: true

---QUESTIONS---

Q: Your question here?
A: Option A
B: Option B
C: Option C
D: Option D
ANS: B`}
                />
                <button
                  type="button"
                  onClick={parseSimpleText}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 text-white font-medium hover:bg-cyan-400 transition-colors"
                >
                  Parse Text
                </button>
                {parseStatus && (
                  <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400">
                    {parseStatus}
                  </div>
                )}
              </div>
            )}

            {activeTab === "html" && (
              <div className="space-y-4">
                <p className="text-slate-400 text-sm">
                  Paste your HTML code containing the questions array. The code
                  should have a format like:
                  <code className="block mt-2 p-2 bg-slate-800 rounded text-xs text-green-400 overflow-x-auto">
                    {`const questions = [{q:"Question text", opts:["A) opt1","B) opt2","C) opt3","D) opt4"], ans:0}, ...]`}
                  </code>
                </p>
                <textarea
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  className="w-full h-64 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white font-mono text-sm"
                  placeholder="Paste your HTML code here..."
                />
                <button
                  type="button"
                  onClick={parseHtmlCode}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 text-white font-medium hover:bg-cyan-400 transition-colors"
                >
                  Parse HTML Code
                </button>
                {parseStatus && (
                  <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400">
                    {parseStatus}
                  </div>
                )}
              </div>
            )}

            {activeTab === "manual" && (
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={addQuestion}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 text-white font-medium hover:bg-cyan-400 transition-colors"
                >
                  + Add Question
                </button>
              </div>
            )}

            {/* Questions List */}
            {questions.length > 0 && (
              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-white">
                    {questions.length} Questions
                  </h3>
                  <button
                    type="button"
                    onClick={() => setQuestions([])}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Clear All
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
                  {questions.map((q, i) => (
                    <div
                      key={i}
                      className="p-4 bg-slate-800/50 rounded-xl border border-slate-700"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-amber-400 font-mono text-sm font-bold">
                              #{i + 1}
                            </span>
                            {activeTab === "manual" ? (
                              <input
                                type="text"
                                value={q.q}
                                onChange={(e) =>
                                  updateQuestion(i, "q", e.target.value)
                                }
                                className="flex-1 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                                placeholder="Question text"
                              />
                            ) : (
                              <span className="text-white text-sm">
                                {q.q.length > 80
                                  ? q.q.substring(0, 80) + "..."
                                  : q.q}
                              </span>
                            )}
                          </div>
                          {activeTab === "manual" && (
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {q.opts.map((opt, j) => (
                                <div
                                  key={j}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="radio"
                                    name={`ans-${i}`}
                                    checked={q.ans === j}
                                    onChange={() => updateQuestion(i, "ans", j)}
                                    className="text-green-500"
                                  />
                                  <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) =>
                                      updateOption(i, j, e.target.value)
                                    }
                                    className="flex-1 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-xs"
                                    placeholder={`Option ${j + 1}`}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                          {activeTab === "html" && (
                            <div className="text-xs text-slate-500 mt-1">
                              Answer: Option {q.ans + 1} (
                              {["ক", "খ", "গ", "ঘ"][q.ans]})
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeQuestion(i)}
                          className="text-red-400 hover:text-red-300 p-1"
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || questions.length === 0}
              className="flex-1 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold hover:shadow-lg hover:shadow-amber-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Creating..."
                : `Create Exam (${questions.length} Questions)`}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
