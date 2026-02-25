import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import Link from "next/link";

type Params = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  // Only generate pages for public posts so private ones are not routable
  const posts = [] as { slug: string }[];
  for (const s of slugs) {
    const post = await getPostBySlug(s);
    if (post.meta.public !== false) posts.push({ slug: s });
  }
  return posts;
}

export default async function PostPage({ params: { slug } }: Params) {
  const post = await getPostBySlug(slug);

  if (post.meta.public === false) {
    return (
      <section className="py-20 min-h-screen bg-slate-950 relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="glass-card rounded-3xl p-12">
            <div className="text-6xl mb-6">🔒</div>
            <h1 className="text-2xl font-bold text-white mb-4">Private Post</h1>
            <p className="text-slate-400 mb-8">
              This post is private and not available for viewing.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:from-cyan-400 hover:to-blue-500 transition-all"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 min-h-screen bg-slate-950 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
          href="/blog"
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium mb-8 transition-colors"
        >
          ← Back to Blog
        </Link>

        <article className="glass-card rounded-3xl p-8 md:p-12">
          <header className="mb-8 pb-8 border-b border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-full font-medium border border-emerald-500/30">
                Public
              </span>
              <span className="text-slate-500">{post.meta.date}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {post.meta.title}
            </h1>
          </header>

          <div
            className="prose prose-lg prose-invert max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-p:text-slate-300 prose-p:leading-relaxed
              prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-code:bg-slate-800 prose-code:text-cyan-400 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:border prose-code:border-slate-700
              prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700 prose-pre:text-slate-300
              prose-img:rounded-xl prose-img:shadow-lg
              prose-blockquote:border-l-cyan-500 prose-blockquote:bg-slate-800/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:text-slate-300
              prose-li:text-slate-300
              prose-hr:border-slate-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </section>
  );
}
