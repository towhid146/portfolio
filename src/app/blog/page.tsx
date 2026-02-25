import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function BlogPage() {
  const posts = await getAllPosts();
  const publicPosts = posts.filter((p) => p.meta.public !== false);

  return (
    <section className="py-20 min-h-screen bg-slate-950 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Blog
            </span>
          </h1>
          <p className="text-lg text-slate-400">
            Thoughts, tutorials, and insights on software development
          </p>
        </div>

        <div className="space-y-6">
          {publicPosts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="block glass-card p-6 rounded-2xl hover:border-cyan-500/50 transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {p.meta.title}
                  </h2>
                  <p className="text-slate-500 mt-1">{p.meta.date}</p>
                </div>
                <span className="text-cyan-400 text-2xl group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Link>
          ))}
          {publicPosts.length === 0 && (
            <div className="text-center py-12 glass-card rounded-2xl">
              <p className="text-slate-400 text-lg">
                No posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
