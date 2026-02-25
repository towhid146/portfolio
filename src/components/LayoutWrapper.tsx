"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all"
          >
            TI
          </Link>
          <div className="flex items-center space-x-8">
            <Link
              href="/#about"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              About
            </Link>
            <Link
              href="/#skills"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              Skills
            </Link>
            <Link
              href="/#projects"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/blog"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/exams"
              className="text-slate-400 hover:text-amber-400 transition-colors"
            >
              MCQ
            </Link>
            <Link
              href="/#contact"
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Towhidul Islam
            </span>
            <p className="text-slate-500 mt-1">Software Developer</p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-cyan-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/towhidislam146/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-cyan-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-cyan-400 transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
        <div className="border-t border-slate-800/50 mt-8 pt-8 text-center text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Towhidul Islam. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
