import Link from "next/link";
import { getPublicExams } from "@/lib/exams";

export const dynamic = "force-dynamic";

export default async function ExamsPage() {
  const exams = await getPublicExams();

  return (
    <section className="min-h-screen bg-slate-950 py-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
            Live MCQ
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            MCQ Examinations
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Practice with our collection of MCQ tests. Track your progress and
            improve your skills.
          </p>
        </div>

        {/* Exams Grid */}
        {exams.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto rounded-full bg-slate-800/50 flex items-center justify-center mb-6">
              <span className="text-4xl">📝</span>
            </div>
            <h3 className="text-xl text-slate-300 mb-2">No Exams Available</h3>
            <p className="text-slate-500">Check back later for new exams!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <Link
                key={exam.slug}
                href={`/exams/${exam.slug}`}
                className="group block"
              >
                <div className="h-full bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
                  {/* Exam header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xl font-bold">
                      📝
                    </div>
                    <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
                      Live
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {exam.title}
                  </h3>
                  {exam.subtitle && (
                    <p className="text-slate-400 text-sm mb-4">
                      {exam.subtitle}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-800">
                    <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                      <div className="text-lg font-bold text-cyan-400">
                        {exam.questions.length}
                      </div>
                      <div className="text-xs text-slate-500">Questions</div>
                    </div>
                    <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                      <div className="text-lg font-bold text-purple-400">
                        {exam.duration}
                      </div>
                      <div className="text-xs text-slate-500">Duration</div>
                    </div>
                    <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                      <div className="text-lg font-bold text-green-400">
                        +{exam.correctMark}
                      </div>
                      <div className="text-xs text-slate-500">Correct</div>
                    </div>
                    <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                      <div className="text-lg font-bold text-red-400">
                        -{exam.wrongMark}
                      </div>
                      <div className="text-xs text-slate-500">Wrong</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-6">
                    <span className="w-full block text-center py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium group-hover:shadow-lg group-hover:shadow-amber-500/25 transition-all">
                      Start Exam →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
