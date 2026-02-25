"use client";

export function FloatingCodeBlocks() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating code block 1 */}
      <div className="absolute top-20 left-10 animate-float-slow opacity-20">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 backdrop-blur-sm">
          <div className="flex gap-1.5 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <div className="space-y-1.5 font-mono text-xs">
            <div className="text-purple-400">const</div>
            <div className="text-cyan-400">developer</div>
            <div className="text-slate-400">= {"{}"}</div>
          </div>
        </div>
      </div>

      {/* Floating code block 2 */}
      <div className="absolute top-40 right-20 animate-float-medium opacity-20">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 backdrop-blur-sm">
          <div className="space-y-1 font-mono text-xs">
            <div className="text-pink-400">&lt;Code /&gt;</div>
            <div className="text-cyan-400">&lt;Create /&gt;</div>
            <div className="text-green-400">&lt;Ship /&gt;</div>
          </div>
        </div>
      </div>

      {/* Floating brackets */}
      <div className="absolute bottom-40 left-20 animate-float-fast opacity-10">
        <span className="text-6xl font-mono text-cyan-500">{"{ }"}</span>
      </div>

      {/* Floating tag */}
      <div className="absolute bottom-60 right-10 animate-float-slow opacity-10">
        <span className="text-5xl font-mono text-purple-500">{"</>"}</span>
      </div>

      {/* Floating semicolon */}
      <div className="absolute top-60 left-1/4 animate-float-medium opacity-10">
        <span className="text-7xl font-mono text-blue-500">;</span>
      </div>

      {/* Floating function */}
      <div className="absolute bottom-32 right-1/4 animate-float-fast opacity-15">
        <span className="text-2xl font-mono text-green-400">fn()</span>
      </div>
    </div>
  );
}

export function TypewriterCode() {
  return (
    <div className="absolute bottom-20 left-10 md:left-20 opacity-30 hidden lg:block">
      <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700/50 backdrop-blur-xl shadow-2xl">
        <div className="flex gap-1.5 mb-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="font-mono text-sm space-y-1">
          <div>
            <span className="text-purple-400">const</span>{" "}
            <span className="text-cyan-400">passion</span>{" "}
            <span className="text-slate-400">=</span>{" "}
            <span className="text-green-400">&apos;coding&apos;</span>
            <span className="text-slate-400">;</span>
          </div>
          <div>
            <span className="text-purple-400">const</span>{" "}
            <span className="text-cyan-400">coffee</span>{" "}
            <span className="text-slate-400">=</span>{" "}
            <span className="text-amber-400">Infinity</span>
            <span className="text-slate-400">;</span>
          </div>
          <div className="flex items-center">
            <span className="text-purple-400">let</span>{" "}
            <span className="text-cyan-400 ml-1">ideas</span>{" "}
            <span className="text-slate-400 mx-1">=</span>{" "}
            <span className="text-pink-400">[]</span>
            <span className="animate-blink text-cyan-400 ml-0.5">|</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AnimatedRobot() {
  return (
    <div className="absolute top-20 right-10 md:right-20 opacity-40 hidden lg:block animate-float-slow">
      <svg
        width="120"
        height="140"
        viewBox="0 0 120 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
      >
        {/* Antenna */}
        <line
          x1="60"
          y1="5"
          x2="60"
          y2="25"
          stroke="url(#cyan-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="60" cy="5" r="5" fill="#22d3ee" className="animate-pulse" />

        {/* Head */}
        <rect
          x="25"
          y="25"
          width="70"
          height="50"
          rx="10"
          fill="url(#head-gradient)"
          stroke="#334155"
          strokeWidth="2"
        />

        {/* Eyes */}
        <circle cx="45" cy="50" r="8" fill="#0f172a" />
        <circle cx="75" cy="50" r="8" fill="#0f172a" />
        <circle
          cx="45"
          cy="50"
          r="4"
          fill="#22d3ee"
          className="animate-pulse"
        />
        <circle
          cx="75"
          cy="50"
          r="4"
          fill="#22d3ee"
          className="animate-pulse"
        />

        {/* Mouth - code brackets */}
        <text
          x="60"
          y="68"
          textAnchor="middle"
          fill="#22d3ee"
          fontSize="12"
          fontFamily="monospace"
        >
          {"{ }"}
        </text>

        {/* Body */}
        <rect
          x="30"
          y="80"
          width="60"
          height="45"
          rx="8"
          fill="url(#body-gradient)"
          stroke="#334155"
          strokeWidth="2"
        />

        {/* Screen on body */}
        <rect x="40" y="88" width="40" height="20" rx="3" fill="#0f172a" />
        <text
          x="60"
          y="102"
          textAnchor="middle"
          fill="#22d3ee"
          fontSize="8"
          fontFamily="monospace"
          className="animate-pulse"
        >
          {"</>"}
        </text>

        {/* Arms */}
        <rect
          x="10"
          y="85"
          width="15"
          height="30"
          rx="5"
          fill="url(#arm-gradient)"
          stroke="#334155"
          strokeWidth="2"
          className="origin-right animate-wave"
        />
        <rect
          x="95"
          y="85"
          width="15"
          height="30"
          rx="5"
          fill="url(#arm-gradient)"
          stroke="#334155"
          strokeWidth="2"
        />

        {/* Legs */}
        <rect
          x="38"
          y="125"
          width="12"
          height="15"
          rx="4"
          fill="url(#leg-gradient)"
          stroke="#334155"
          strokeWidth="2"
        />
        <rect
          x="70"
          y="125"
          width="12"
          height="15"
          rx="4"
          fill="url(#leg-gradient)"
          stroke="#334155"
          strokeWidth="2"
        />

        {/* Gradients */}
        <defs>
          <linearGradient
            id="cyan-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient
            id="head-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient
            id="body-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="arm-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="leg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* React Icon */}
      <div className="absolute top-1/4 left-[15%] animate-float-slow opacity-20">
        <svg
          className="w-12 h-12 text-cyan-400 animate-spin-slow"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 9.861A2.139 2.139 0 1 0 12 14.139 2.139 2.139 0 1 0 12 9.861zM6.008 16.255l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 0 0 1.363 3.578l.101.213-.101.213a23.307 23.307 0 0 0-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 0 1 1.182-3.046A24.752 24.752 0 0 1 5.317 8.95zM17.992 16.255l-.133-.469a23.357 23.357 0 0 0-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 0 0 1.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 0 1-1.182 3.046z" />
          <path d="M5.31 8.951l-.133-.468C4.188 4.992 4.488 2.494 6 1.622c1.483-.856 3.864.155 6.359 2.716l.34.349-.34.349a23.552 23.552 0 0 0-2.422 2.967l-.135.193-.235.02a23.657 23.657 0 0 0-3.785.61l-.472.119zm1.896-6.63c-.268 0-.505.058-.705.173-.994.573-1.17 2.565-.485 5.253a25.122 25.122 0 0 1 3.233-.501 24.847 24.847 0 0 1 2.052-2.544c-1.56-1.519-3.037-2.381-4.095-2.381zM18.69 8.951l-.472-.119a23.479 23.479 0 0 0-3.787-.61l-.234-.02-.135-.193a23.414 23.414 0 0 0-2.421-2.967l-.34-.349.34-.349C14.135 1.778 16.515.767 18 1.622c1.512.872 1.812 3.37.824 6.861l-.134.468zM14.75 7.24c1.142.104 2.227.273 3.234.501.685-2.688.509-4.68-.485-5.253-.988-.571-2.845.304-4.8 2.208A24.849 24.849 0 0 1 14.75 7.24z" />
          <path d="M5.31 15.049l.133-.468c.989-3.491.689-5.989-.824-6.861-1.483-.856-3.864.155-6.359 2.716l-.34.349.34.349a23.552 23.552 0 0 0 2.422 2.967l.135.193.235.02a23.657 23.657 0 0 0 3.785.61l.472.119v.006zm-3.804-4.06c-1.56 1.519-2.146 2.89-1.462 3.283.988.571 2.845-.304 4.8-2.208a24.913 24.913 0 0 1-2.052-2.544 25.05 25.05 0 0 1-1.286 1.469z" />
        </svg>
      </div>

      {/* Terminal Icon */}
      <div className="absolute bottom-1/3 right-[10%] animate-float-medium opacity-15">
        <svg
          className="w-16 h-16 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Git Branch */}
      <div className="absolute top-1/3 right-[25%] animate-float-fast opacity-10">
        <svg
          className="w-10 h-10 text-orange-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>

      {/* Database */}
      <div className="absolute bottom-1/4 left-[8%] animate-float-slow opacity-15">
        <svg
          className="w-10 h-10 text-purple-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      </div>
    </div>
  );
}

export function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
}
