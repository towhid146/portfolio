import Link from "next/link";

const skills = [
  { name: "JavaScript", level: 90, icon: "⚡" },
  { name: "TypeScript", level: 85, icon: "📘" },
  { name: "React", level: 90, icon: "⚛️" },
  { name: "Next.js", level: 85, icon: "▲" },
  { name: "Node.js", level: 80, icon: "🟢" },
  { name: "Python", level: 75, icon: "🐍" },
  { name: "SQL", level: 80, icon: "🗄️" },
  { name: "Git", level: 85, icon: "📦" },
];

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with payment integration, user authentication, and inventory management.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates and team features.",
    tech: ["React", "Firebase", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "AI Chat Assistant",
    description:
      "An intelligent chatbot powered by OpenAI API with conversation history and context awareness.",
    tech: ["Python", "FastAPI", "OpenAI", "React"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    github: "https://github.com",
    live: "https://example.com",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section - Split Name Typography Design */}
      <section className="min-h-screen relative overflow-hidden bg-[#0a0a0a]">
        {/* City skyline silhouette background */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-transparent via-[#0a0a0a]/50 to-transparent"></div>
          <svg
            className="absolute bottom-0 left-0 right-0 w-full h-[50%] opacity-15"
            viewBox="0 0 1920 400"
            preserveAspectRatio="xMidYMax slice"
            fill="currentColor"
          >
            <path
              className="text-slate-700"
              d="M0,400 L0,300 L40,300 L40,250 L60,250 L60,300 L100,300 L100,200 L120,200 L120,180 L140,180 L140,200 L180,200 L180,280 L200,280 L200,220 L240,220 L240,260 L280,260 L280,180 L300,180 L300,150 L320,150 L320,180 L360,180 L360,240 L400,240 L400,160 L420,160 L420,140 L440,140 L440,160 L480,160 L480,200 L520,200 L520,120 L540,120 L540,100 L560,100 L560,120 L600,120 L600,180 L640,180 L640,140 L680,140 L680,100 L700,100 L700,80 L720,80 L720,100 L760,100 L760,160 L800,160 L800,200 L840,200 L840,140 L880,140 L880,100 L900,100 L900,60 L920,60 L920,100 L960,100 L960,180 L1000,180 L1000,120 L1040,120 L1040,80 L1060,80 L1060,60 L1080,60 L1080,80 L1120,80 L1120,140 L1160,140 L1160,100 L1200,100 L1200,160 L1240,160 L1240,200 L1280,200 L1280,140 L1320,140 L1320,180 L1360,180 L1360,220 L1400,220 L1400,160 L1440,160 L1440,200 L1480,200 L1480,240 L1520,240 L1520,180 L1560,180 L1560,220 L1600,220 L1600,260 L1640,260 L1640,200 L1680,200 L1680,240 L1720,240 L1720,280 L1760,280 L1760,220 L1800,220 L1800,260 L1840,260 L1840,300 L1880,300 L1880,280 L1920,280 L1920,400 Z"
            />
          </svg>
        </div>

        {/* Corner labels - Top Left */}
        <div className="absolute top-8 left-8 text-[11px] text-slate-500 tracking-wide max-w-[200px] z-30 leading-relaxed">
          <p>Passionate Software Developer</p>
          <p>Building Digital Experiences</p>
        </div>

        {/* Corner labels - Top Right */}
        <div className="absolute top-8 right-8 text-[11px] text-slate-500 tracking-wide text-right z-30 leading-relaxed">
          <p>Full Stack Development</p>
          <p>Web Applications</p>
          <p className="mt-4 text-slate-600">2026</p>
        </div>

        {/* Mid Left Label */}
        <div className="absolute top-1/2 -translate-y-1/2 left-8 text-[11px] text-slate-500 tracking-wide max-w-[200px] z-30 leading-relaxed hidden lg:block">
          <p>Creative Problem Solver</p>
          <p>For Modern Web Solutions</p>
        </div>

        {/* Mid Right Label */}
        <div className="absolute top-1/2 -translate-y-1/2 right-8 text-[11px] text-slate-500 tracking-wide text-right max-w-[200px] z-30 leading-relaxed hidden lg:block">
          <p>React & Next.js Developer</p>
          <p>TypeScript Enthusiast</p>
          <p>Open Source Contributor</p>
        </div>

        {/* Bottom Right Label */}
        <div className="absolute bottom-8 right-8 text-[11px] text-slate-500 tracking-wide text-right z-30 leading-relaxed">
          <p>Node.js Backend</p>
          <p>Cloud Architecture</p>
        </div>

        {/* Main content with split name typography */}
        <div className="relative min-h-screen flex items-center justify-center">
          {/* Photo in center - positioned to overlap with text */}
          <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-48 h-64 md:w-64 md:h-80 lg:w-72 lg:h-96 bg-slate-800 overflow-hidden shadow-2xl">
              <img
                src="/images/profile.jpeg"
                alt="Towhidul Islam"
                className="w-full h-full object-cover object-top grayscale"
              />
            </div>
          </div>

          {/* Large split name typography */}
          <div className="relative z-10 w-full pointer-events-none select-none flex items-center justify-center">
            <h1
              className="flex items-center justify-center w-full"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="text-[18vw] md:text-[16vw] lg:text-[14vw] font-medium text-white leading-none tracking-tight">
                Towhidul
              </span>
              <span className="w-48 md:w-64 lg:w-72 flex-shrink-0"></span>
              <span className="text-[18vw] md:text-[16vw] lg:text-[14vw] font-medium text-white leading-none tracking-tight">
                Islam
              </span>
            </h1>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
          <div className="flex flex-col items-center gap-2 text-slate-600">
            <span className="text-[10px] tracking-[0.3em] uppercase">
              Scroll
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-950 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-slate-950 to-slate-950"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-center text-white mb-4">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Me
            </span>
          </h2>
          <p className="text-slate-500 text-center mb-16 max-w-2xl mx-auto">
            Get to know more about me and my journey
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-slate-400 leading-relaxed">
                I&apos;m a software developer with a passion for creating
                elegant solutions to complex problems. With expertise in modern
                web technologies, I build applications that are not only
                functional but also delightful to use.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                When I&apos;m not coding, you can find me exploring new
                technologies, contributing to open-source projects, or sharing
                my knowledge through blog posts and community involvement.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="text-center p-6 glass-card rounded-2xl">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    3+
                  </div>
                  <div className="text-slate-400 mt-1">Years Experience</div>
                </div>
                <div className="text-center p-6 glass-card rounded-2xl">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    20+
                  </div>
                  <div className="text-slate-400 mt-1">Projects Completed</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 flex items-center justify-center shadow-2xl shadow-black/50">
                <div className="text-9xl">👨‍💻</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl -z-10 blur-sm"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl -z-10 blur-sm"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-slate-900/50 relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-center text-white mb-4">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Skills
            </span>
          </h2>
          <p className="text-slate-500 text-center mb-16 max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="glass-card p-6 rounded-2xl hover:border-cyan-500/50 transition-all group"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-cyan-400 font-medium">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-slate-950 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-4">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Projects
            </span>
          </h2>
          <p className="text-slate-500 text-center mb-16 max-w-2xl mx-auto">
            Some of my recent work
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group glass-card rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all hover:-translate-y-2"
              >
                <div className="aspect-video bg-slate-800 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-slate-900/90 text-white rounded-lg font-medium hover:bg-cyan-600 transition-colors backdrop-blur-sm border border-slate-700"
                      >
                        GitHub
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-400 hover:to-blue-500 transition-colors"
                      >
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 mb-4 text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-800 text-cyan-400 text-xs rounded-full border border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4">
            Let&apos;s{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Work Together
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? I&apos;d love to
            hear from you!
          </p>
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-left text-sm font-medium text-slate-300 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-slate-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-left text-sm font-medium text-slate-300 mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-slate-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-left text-sm font-medium text-slate-300 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-slate-500"
                  placeholder="Project Inquiry"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-left text-sm font-medium text-slate-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none text-white placeholder-slate-500"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all hover:shadow-lg hover:shadow-cyan-500/25"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <a
              href="mailto:hello@example.com"
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <span className="text-xl">📧</span> hello@example.com
            </a>
            <a
              href="https://www.linkedin.com/in/towhidislam146/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <span className="text-xl">💼</span> LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <span className="text-xl">🐙</span> GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
