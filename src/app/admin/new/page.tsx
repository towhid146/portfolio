"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const res = await fetch("/api/auth/check");
    if (!res.ok) {
      router.push("/admin");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, isPublic }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create post");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              New{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Post
              </span>
            </h1>
            <p className="text-slate-400 mt-1">Create a new blog post</p>
          </div>
          <Link
            href="/admin/dashboard"
            className="px-6 py-3 bg-slate-800 text-slate-300 rounded-xl font-medium hover:bg-slate-700 transition-all border border-slate-700"
          >
            ← Back
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-slate-500"
                placeholder="Enter post title..."
                required
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Content{" "}
                <span className="text-slate-500">(Markdown supported)</span>
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-slate-500 font-mono text-sm"
                placeholder="Write your post content in Markdown..."
                required
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <div>
                <h3 className="font-medium text-white">Visibility</h3>
                <p className="text-slate-400 text-sm">
                  {isPublic
                    ? "This post will be visible to everyone"
                    : "This post will be hidden from the public"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPublic(!isPublic)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  isPublic ? "bg-emerald-500" : "bg-slate-600"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    isPublic ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Link
                href="/admin/dashboard"
                className="px-6 py-3 bg-slate-700 text-slate-300 rounded-xl font-medium hover:bg-slate-600 transition-all"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Post"}
              </button>
            </div>
          </div>
        </form>

        {/* Markdown Help */}
        <div className="mt-8 glass-card rounded-2xl p-6">
          <h3 className="text-lg font-medium text-white mb-4">
            Markdown Quick Reference
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2 text-slate-400">
              <p>
                <code className="text-cyan-400"># Heading 1</code>
              </p>
              <p>
                <code className="text-cyan-400">## Heading 2</code>
              </p>
              <p>
                <code className="text-cyan-400">**bold text**</code>
              </p>
              <p>
                <code className="text-cyan-400">*italic text*</code>
              </p>
            </div>
            <div className="space-y-2 text-slate-400">
              <p>
                <code className="text-cyan-400">[link text](url)</code>
              </p>
              <p>
                <code className="text-cyan-400">![alt text](image-url)</code>
              </p>
              <p>
                <code className="text-cyan-400">`inline code`</code>
              </p>
              <p>
                <code className="text-cyan-400">```code block```</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
