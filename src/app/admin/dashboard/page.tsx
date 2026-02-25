"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Post = {
  slug: string;
  title: string;
  date: string;
  public: boolean;
  content: string;
};

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, []);

  const checkAuth = async () => {
    const res = await fetch("/api/auth/check");
    if (!res.ok) {
      router.push("/admin");
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      } else if (res.status === 401) {
        router.push("/admin");
      }
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  };

  const togglePublic = async (slug: string) => {
    try {
      const res = await fetch(`/api/posts/${slug}`, { method: "PATCH" });
      if (res.ok) {
        const data = await res.json();
        setPosts(
          posts.map((p) =>
            p.slug === slug ? { ...p, public: data.public } : p,
          ),
        );
      }
    } catch (err) {
      setError("Failed to toggle status");
    }
  };

  const deletePost = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
      if (res.ok) {
        setPosts(posts.filter((p) => p.slug !== slug));
      }
    } catch (err) {
      setError("Failed to delete post");
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-cyan-400 flex items-center gap-3">
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
    <section className="min-h-screen bg-slate-950 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Admin{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Dashboard
              </span>
            </h1>
            <p className="text-slate-400 mt-1">
              Manage your blog posts and exams
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/exams"
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-medium hover:from-amber-400 hover:to-orange-500 transition-all flex items-center gap-2"
            >
              <span>📝</span> MCQ Exams
            </Link>
            <Link
              href="/admin/new"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center gap-2"
            >
              <span>✏️</span> New Post
            </Link>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-slate-800 text-slate-300 rounded-xl font-medium hover:bg-slate-700 transition-all border border-slate-700"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card p-6 rounded-2xl">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {posts.length}
            </div>
            <div className="text-slate-400 mt-1">Total Posts</div>
          </div>
          <div className="glass-card p-6 rounded-2xl">
            <div className="text-3xl font-bold text-emerald-400">
              {posts.filter((p) => p.public).length}
            </div>
            <div className="text-slate-400 mt-1">Public Posts</div>
          </div>
          <div className="glass-card p-6 rounded-2xl">
            <div className="text-3xl font-bold text-amber-400">
              {posts.filter((p) => !p.public).length}
            </div>
            <div className="text-slate-400 mt-1">Private Posts</div>
          </div>
        </div>

        {/* Posts List */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-700/50">
            <h2 className="text-xl font-semibold text-white">All Posts</h2>
          </div>

          {posts.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-slate-400 text-lg">No posts yet</p>
              <Link
                href="/admin/new"
                className="inline-block mt-4 text-cyan-400 hover:text-cyan-300"
              >
                Create your first post →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-700/50">
              {posts.map((post) => (
                <div
                  key={post.slug}
                  className="p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-medium text-white">
                        {post.title}
                      </h3>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                          post.public
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {post.public ? "Public" : "Private"}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm">{post.date}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => togglePublic(post.slug)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        post.public
                          ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30"
                      }`}
                    >
                      {post.public ? "Make Private" : "Make Public"}
                    </button>
                    <Link
                      href={`/admin/edit/${post.slug}`}
                      className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-600 transition-all"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePost(post.slug)}
                      className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-all border border-red-500/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex justify-center gap-6">
          <Link
            href="/"
            className="text-slate-400 hover:text-cyan-400 transition-colors"
          >
            ← View Portfolio
          </Link>
          <Link
            href="/blog"
            className="text-slate-400 hover:text-cyan-400 transition-colors"
          >
            View Blog →
          </Link>
        </div>
      </div>
    </section>
  );
}
