"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  ExternalLink,
  Mail,
  Clock,
  Terminal,
  Volume2,
  VolumeX,
  Send,
  CheckCircle2,
  Star,
  GitFork,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Scissors,
  Activity,
  BookOpen,
  Server,
  Code,
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

interface RepoItem {
  id: string | number;
  name: string;
  description: string;
  url: string;
  homepage: string | null;
  language: string;
  stars: number;
  forks: number;
  role?: string;
  year?: string;
  topics?: string[];
  previewType?: "salon" | "bot" | "blog" | "backend" | "code";
}

export default function PortfolioPage() {
  // Preloader state
  const [loading, setLoading] = useState(true);
  const [loadPct, setLoadPct] = useState(0);

  // States
  const [repos, setRepos] = useState<RepoItem[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "web" | "python" | "api">("all");
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [istTime, setIstTime] = useState("");
  const [bgmPlaying, setBgmPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioNodesRef = useRef<any[]>([]);

  // Contact Form
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  // Terminal Typing
  const [typingIndex, setTypingIndex] = useState(0);
  const titles = [
    "Full Stack Developer 💻",
    "Python & Bot Architect 🤖",
    "React & Next.js Engineer ⚛️",
    "SQL & Database Designer 🗄️",
    "REST APIs & Node.js 🟢",
    "Open Source Contributor 💡",
  ];

  // Preloader progress counter
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadPct((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 250);
          return 100;
        }
        return prev + 4;
      });
    }, 28);
    return () => clearInterval(timer);
  }, []);

  // Real-time IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setIstTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }) + " (IST)"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setTypingIndex((prev) => (prev + 1) % titles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [titles.length]);

  // Fetch Projects from API (Live + Curated Showcase)
  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("/api/github");
        const data = await res.json();
        if (data.repos) {
          setRepos(data.repos);
        }
      } catch (err) {
        console.error("Failed to load GitHub repos:", err);
      }
    }
    fetchRepos();
  }, []);

  // Ambient Cyber Synth Audio (Web Audio API)
  const toggleBgm = () => {
    if (!bgmPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.035, ctx.currentTime);
        masterGain.connect(ctx.destination);

        const frequencies = [110, 164.81, 220, 246.94];
        const nodes: any[] = [];

        frequencies.forEach((freq) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(500, ctx.currentTime);

          osc.connect(filter);
          filter.connect(masterGain);
          osc.start();
          nodes.push(osc);
        });

        audioNodesRef.current = nodes;
        setBgmPlaying(true);
      } catch (e) {
        console.error("Audio error:", e);
      }
    } else {
      audioNodesRef.current.forEach((node) => {
        try {
          node.stop();
        } catch {}
      });
      audioNodesRef.current = [];
      audioCtxRef.current?.close();
      audioCtxRef.current = null;
      setBgmPlaying(false);
    }
  };

  // Contact Form Submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        setFormStatus("success");
        setFormMessage("Message recorded to Google Sheet & notified successfully! I'll contact you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormStatus("error");
        setFormMessage(result.error || "Failed to submit message. Please try again.");
      }
    } catch (err) {
      setFormStatus("error");
      setFormMessage("Network error. Please try again or reach out directly via email.");
    }
  };

  // Filter Repos
  const filteredRepos = repos.filter((repo) => {
    if (activeTab === "all") return true;
    if (activeTab === "python") return repo.language?.toLowerCase() === "python";
    if (activeTab === "web")
      return (
        repo.language?.toLowerCase() === "typescript" ||
        repo.language?.toLowerCase() === "javascript" ||
        repo.language?.toLowerCase() === "html"
      );
    if (activeTab === "api")
      return (
        repo.topics?.includes("api") ||
        repo.topics?.includes("backend") ||
        repo.name.toLowerCase().includes("api") ||
        repo.language?.toLowerCase() === "node.js"
      );
    return true;
  });

  return (
    <div className="relative min-h-screen bg-[#050709] text-[#eef2f8] font-sans selection:bg-[#00f0ff] selection:text-black">
      {/* =========================================================================
          TERMINAL PRELOADER (Like Reference Site)
      ========================================================================= */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-8 bg-[#050709] transition-opacity duration-500">
          <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <div className="flex flex-col gap-2 font-mono text-xs text-[#00f0ff] tracking-widest uppercase">
              <div className="font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                INITIALIZING_CORE...
              </div>
              <div className="text-white/40 leading-relaxed font-mono">
                SYS_VER_2.1.0 // BY_NAWAZISH<br />
                MEM_ALLOC_OK // BUFF_READY<br />
                STACK: PYTHON // TYPESCRIPT // SQL // NEXTJS
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4">
              <div className="relative w-28 h-28 md:w-36 md:h-36">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1.5" fill="transparent" className="text-white/10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#00f0ff"
                    strokeWidth="2.5"
                    fill="transparent"
                    strokeDasharray="282.7"
                    strokeDashoffset={282.7 - (loadPct / 100) * 282.7}
                    strokeLinecap="round"
                    className="transition-all duration-100 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl md:text-5xl font-black text-white font-mono">{loadPct}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-xs tracking-widest text-white/40 uppercase">SYSTEM BOOT</span>
                <button
                  onClick={() => setLoading(false)}
                  className="text-xs font-mono uppercase tracking-widest text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black border border-[#00f0ff]/50 px-3 py-1 rounded cursor-pointer transition-all font-bold"
                >
                  ENTER SITE ⚡
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Background Ambience & Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[550px] h-[550px] rounded-full bg-[#00f0ff]/10 blur-[130px]" />
        <div className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#8b5cf6]/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[500px] rounded-full bg-[#00f0ff]/8 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.08) 1.2px, transparent 1.2px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* =========================================================================
          HEADER / NAVBAR
      ========================================================================= */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-[#050709]/80 border-b border-white/5 py-4 px-6 md:px-12 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="font-mono text-xl font-black uppercase tracking-tighter flex items-center gap-1 group">
            <span className="group-hover:text-[#00f0ff] transition-colors">N</span>
            <span className="text-[#00f0ff]">.</span>
            <span className="group-hover:text-[#00f0ff] transition-colors">M</span>
          </a>

          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 px-4 rounded-full border border-white/10 backdrop-blur-md">
            <a href="#work" className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-[#00f0ff] hover:bg-white/5 transition-all">
              Works
            </a>
            <a href="#capabilities" className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-[#00f0ff] hover:bg-white/5 transition-all">
              Services
            </a>
            <a href="#skills" className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-[#00f0ff] hover:bg-white/5 transition-all">
              Skills
            </a>
            <a href="#about" className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-[#00f0ff] hover:bg-white/5 transition-all">
              About
            </a>
            <a href="#contact" className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-[#00f0ff] hover:bg-white/5 transition-all">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleBgm}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-slate-300 hover:text-[#00f0ff] hover:border-[#00f0ff]/50 transition-all cursor-pointer"
            >
              {bgmPlaying ? <Volume2 className="w-3.5 h-3.5 text-[#00f0ff] animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{bgmPlaying ? "Mute BGM" : "Play BGM"}</span>
            </button>

            <a
              href="#contact"
              className="px-4 py-1.5 rounded-full bg-[#00f0ff] text-black font-mono text-xs uppercase font-bold tracking-wider hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-[#00f0ff]/20"
            >
              Hire Me
            </a>
          </div>
        </div>
      </header>

      {/* =========================================================================
          HERO SECTION
      ========================================================================= */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center pt-28 pb-16 px-6 md:px-12 z-10 max-w-6xl mx-auto text-center">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
          <span className="font-mono text-xs uppercase tracking-widest text-slate-300">
            Open to Internships &amp; Opportunities
          </span>
        </div>

        <h2 className="font-mono text-xs md:text-sm tracking-[0.35em] uppercase text-slate-400 mb-3">
          Hi, I am
        </h2>

        {/* Big Brutalist Heading */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.88] mb-6">
          MD Nawazish <br />
          <span className="font-serif italic font-normal text-[#00f0ff] lowercase tracking-normal">
            Naushad
          </span>
        </h1>

        {/* Terminal Prompt Bar */}
        <div className="font-mono text-xs md:text-sm text-slate-300 bg-white/[0.03] px-5 py-2.5 rounded-lg border border-white/10 shadow-xl inline-flex items-center gap-2 mb-8">
          <Terminal className="w-4 h-4 text-[#00f0ff]" />
          <span>&gt;</span>
          <span className="text-[#00f0ff] font-bold">{titles[typingIndex]}</span>
          <span className="w-2 h-4 bg-[#00f0ff] inline-block animate-pulse" />
        </div>

        {/* Skills Tag Row */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-2xl">
          {["Python 🐍", "Web Dev 🌐", "Bot Builder 🤖", "SQL 🗄️", "TypeScript 📘", "React ⚛️", "Node.js 🟢", "C++ ⚙️"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-mono rounded-md border border-white/10 bg-white/[0.02] text-slate-300 hover:border-[#00f0ff]/50 hover:text-[#00f0ff] transition-all cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#work"
            className="px-6 py-3.5 rounded-full bg-[#00f0ff] text-black font-mono text-xs md:text-sm uppercase font-black tracking-wider hover:scale-105 transition-all shadow-xl shadow-[#00f0ff]/25 flex items-center gap-2"
          >
            <span>Explore Works</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="px-6 py-3.5 rounded-full border border-white/15 bg-white/[0.04] text-white font-mono text-xs md:text-sm uppercase tracking-wider hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>Get In Touch</span>
          </a>
          <a
            href="https://github.com/mdnawazishnaushad"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-full border border-white/15 bg-white/[0.04] text-white hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Hero Bottom Meta Info */}
        <div className="w-full mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-slate-500 uppercase tracking-widest gap-4">
          <div>Based in India · Full Stack &amp; Automation</div>
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>Local Time:</span>
            <span className="text-[#00f0ff] font-bold">{istTime}</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INFINITE ROTATING MARQUEE
      ========================================================================= */}
      <div className="w-full overflow-hidden py-8 my-10 bg-white/[0.015] border-y border-white/10 -rotate-1 scale-[1.02]">
        <div className="flex gap-8 whitespace-nowrap animate-marquee uppercase font-black text-4xl sm:text-6xl tracking-tighter">
          <span>FULL STACK DEVELOPER ✦</span>
          <span className="text-stroke">PYTHON BOT BUILDER ✦</span>
          <span>NEXT.JS &amp; TYPESCRIPT ✦</span>
          <span className="text-stroke">SQL &amp; RELATIONAL ARCHITECTURE ✦</span>
          <span>OPEN SOURCE CONTRIBUTOR ✦</span>
          <span>FULL STACK DEVELOPER ✦</span>
          <span className="text-stroke">PYTHON BOT BUILDER ✦</span>
          <span>NEXT.JS &amp; TYPESCRIPT ✦</span>
        </div>
      </div>

      {/* =========================================================================
          SERVICES / CAPABILITIES (ACCORDION WITH CODE PREVIEWS)
      ========================================================================= */}
      <section id="capabilities" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between border-b-2 border-white pb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#00f0ff] mb-2 block">
              Core Competencies
            </span>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter">
              Services
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400 uppercase tracking-widest">
            // Full-Stack Architecture &amp; Delivery
          </div>
        </div>

        <div className="flex flex-col border-t border-white/10">
          {[
            {
              id: 0,
              num: "01",
              title: "Full-Stack Web Development",
              desc: "Engineering modern, performant web platforms with seamless user experiences, solid architecture, and clean responsive interfaces.",
              tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST APIs"],
              codeFile: "App.tsx — Next.js 16",
              codeSnippet: [
                "export default function Portfolio() {",
                "  const [state] = useSignal({ active: true });",
                "  return <ResponsiveMatrix theme=\"brutalist\" speed={1.2} />;",
                "}",
              ],
            },
            {
              id: 1,
              num: "02",
              title: "Python Bots & Automation",
              desc: "Building automated bots and scripts that handle real-world tasks — from uptime monitoring to data scraping and workflow automation daemons.",
              tags: ["Python 3.12", "AsyncIO", "HTTPX", "Selenium", "APScheduler"],
              codeFile: "monitor.py — AsyncIO",
              codeSnippet: [
                "async def ping_site(url: str):",
                "  async with httpx.AsyncClient() as c:",
                "    r = await c.get(url)",
                "    return r.status_code == 200",
              ],
            },
            {
              id: 2,
              num: "03",
              title: "SQL & Database Architecture",
              desc: "Designing optimized relational schemas, writing complex queries, and architecting data pipelines that scale with business needs.",
              tags: ["PostgreSQL", "MySQL", "SQLite", "Prisma ORM", "Schema Design"],
              codeFile: "schema.sql — PostgreSQL",
              codeSnippet: [
                "CREATE TABLE users (",
                "  id SERIAL PRIMARY KEY,",
                "  email VARCHAR(255) UNIQUE,",
                "  created_at TIMESTAMPTZ DEFAULT NOW()",
                ");",
              ],
            },
            {
              id: 3,
              num: "04",
              title: "API Design & Backend Systems",
              desc: "Building RESTful APIs and backend services with clean architecture, JWT authentication pipelines, and production-grade error handling.",
              tags: ["Node.js", "Express", "JWT Auth", "Middleware", "Railway"],
              codeFile: "server.ts — Express",
              codeSnippet: [
                "app.get('/api/health', (req, res) => {",
                "  res.json({ status: 'OK', uptime: process.uptime() });",
                "});",
              ],
            },
          ].map((item) => (
            <div key={item.id} className="border-b border-white/10">
              <div
                onClick={() => setActiveAccordion(activeAccordion === item.id ? null : item.id)}
                className="py-8 flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-baseline gap-6 md:gap-12">
                  <span className="font-mono text-sm text-[#00f0ff]">({item.num})</span>
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight group-hover:text-[#00f0ff] transition-colors">
                    {item.title}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#00f0ff] group-hover:text-[#00f0ff] transition-all">
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      activeAccordion === item.id ? "rotate-180 text-[#00f0ff]" : ""
                    }`}
                  />
                </div>
              </div>

              {activeAccordion === item.id && (
                <div className="pb-8 pl-4 sm:pl-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
                  <div className="lg:col-span-6 space-y-4">
                    <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans">{item.desc}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded bg-white/[0.04] text-[#00f0ff] border border-white/10 font-mono text-xs uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="w-full bg-[#080d15] rounded-xl border border-[#00f0ff]/20 p-4 font-mono text-xs shadow-2xl">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                          <span className="text-[11px] text-white/50 ml-2">{item.codeFile}</span>
                        </div>
                        <span className="text-[10px] text-[#00f0ff]">Clean Arch</span>
                      </div>
                      <div className="space-y-1 text-white/80 text-[11px] leading-relaxed">
                        {item.codeSnippet.map((line, idx) => (
                          <p key={idx} className={line.startsWith("  ") ? "pl-4" : ""}>
                            {line}
                          </p>
                        ))}
                      </div>
                      <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40">
                        <span className="text-[#00f0ff]">✔ Production Verified</span>
                        <span className="text-[#10b981]">0 errors</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SELECTED WORKS / PROJECTS (WITH RICH INTERACTIVE PREVIEWS)
      ========================================================================= */}
      <section id="work" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between border-b-2 border-white pb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#00f0ff] mb-2 block">
              Portfolio Matrix
            </span>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter">
              Selected Works
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400 uppercase tracking-widest text-left md:text-right">
            // Live GitHub Repos &amp; Production Deployments
            <div className="text-[11px] text-[#00f0ff] mt-1">@mdnawazishnaushad</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {(["all", "web", "python", "api"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-[#00f0ff] text-black font-bold shadow-lg shadow-[#00f0ff]/30"
                  : "bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white hover:border-white/20"
              }`}
            >
              {tab === "all" ? "All Works" : tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Project Cards Grid - Clean, Professional Developer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className="group rounded-2xl border border-white/10 bg-[#080d15] hover:border-[#00f0ff]/50 transition-all duration-300 p-6 flex flex-col justify-between shadow-xl hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f0ff]/5 rounded-bl-full pointer-events-none group-hover:bg-[#00f0ff]/10 transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded bg-[#00f0ff]/10 text-[#00f0ff] font-mono text-[11px] uppercase tracking-wider font-bold border border-[#00f0ff]/20">
                    {repo.language || "TypeScript"}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-[#00f0ff] hover:text-black transition-all"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-[#00f0ff] hover:text-black transition-all"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#00f0ff] transition-colors mb-2">
                  {repo.name}
                </h3>

                <p className="text-xs md:text-sm text-slate-400 line-clamp-3 leading-relaxed mb-6 font-sans">
                  {repo.description}
                </p>

                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {repo.topics.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-white/[0.03] text-slate-400 font-mono text-[10px] uppercase border border-white/5"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Star className="w-3.5 h-3.5 text-amber-400" /> {repo.stars || 0}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <GitFork className="w-3.5 h-3.5 text-slate-400" /> {repo.forks || 0}
                  </span>
                </div>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00f0ff] hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  View Repo <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          TECHNICAL STACK & METRICS
      ========================================================================= */}
      <section id="skills" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between border-b-2 border-white pb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#00f0ff] mb-2 block">
              Proficiency
            </span>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter">
              Skills
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400 uppercase tracking-widest">
            // Verified Technical Metrics
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
          {[
            { name: "Python", pct: "85%", icon: "🐍" },
            { name: "React / Next", pct: "82%", icon: "⚛️" },
            { name: "TypeScript", pct: "80%", icon: "📘" },
            { name: "SQL & DB", pct: "78%", icon: "🗄️" },
            { name: "Node.js", pct: "75%", icon: "🟢" },
            { name: "C++", pct: "70%", icon: "⚙️" },
          ].map((skill) => (
            <div
              key={skill.name}
              className="p-5 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col items-center text-center hover:border-[#00f0ff]/50 transition-all"
            >
              <span className="text-2xl mb-2">{skill.icon}</span>
              <span className="text-xs font-mono uppercase text-slate-400 mb-1">{skill.name}</span>
              <span className="text-2xl font-black text-[#00f0ff] font-mono">{skill.pct}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <span className="font-mono text-xs uppercase tracking-wider text-[#00f0ff] block mb-3 font-bold">
              [01] Languages
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {["Python", "JavaScript", "TypeScript", "HTML5", "CSS3", "SQL", "C++"].map((l) => (
                <span key={l} className="px-2.5 py-1 rounded bg-white/5 border border-white/10">
                  {l}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <span className="font-mono text-xs uppercase tracking-wider text-[#00f0ff] block mb-3 font-bold">
              [02] Databases &amp; Cloud
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {["PostgreSQL", "MySQL", "SQLite", "MongoDB", "Prisma ORM", "Vercel", "Railway"].map((d) => (
                <span key={d} className="px-2.5 py-1 rounded bg-white/5 border border-white/10">
                  {d}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <span className="font-mono text-xs uppercase tracking-wider text-[#00f0ff] block mb-3 font-bold">
              [03] Frameworks &amp; Tools
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {["Next.js", "React", "Node.js", "Express", "Tailwind CSS", "Git", "GitHub", "Linux"].map((f) => (
                <span key={f} className="px-2.5 py-1 rounded bg-white/5 border border-white/10">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ABOUT SECTION
      ========================================================================= */}
      <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#00f0ff]">About Me</span>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-tight">
              Redefining digital architecture through{" "}
              <span className="font-serif italic text-[#00f0ff] lowercase font-normal">logic</span> &amp; relentless
              execution.
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              I am a dedicated Full Stack Developer with 1+ year of hands-on experience designing and deploying
              applications that solve practical problems. My core focus lies in modern TypeScript ecosystems (Next.js,
              React), Python automation bots, and reliable SQL architectures.
            </p>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Whether building accessible, responsive interfaces or designing high-uptime microservices, I approach every
              project with clean engineering principles and attention to detail.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 font-mono text-center">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10">
                <span className="block text-2xl font-black text-white">1+</span>
                <span className="text-[10px] uppercase text-slate-500">Year Exp</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10">
                <span className="block text-2xl font-black text-white">10+</span>
                <span className="text-[10px] uppercase text-slate-500">Projects Done</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10">
                <span className="block text-2xl font-black text-[#00f0ff]">100%</span>
                <span className="text-[10px] uppercase text-slate-500">Dedication</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 sm:w-80 aspect-[4/5] rounded-2xl border border-white/20 bg-white/[0.03] p-4 flex flex-col justify-between shadow-2xl">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-white/10 pb-3">
                <span>DEV_ID // NAWAZISH</span>
                <span className="text-[#10b981]">● ACTIVE</span>
              </div>
              <div className="my-auto text-center py-6">
                <div className="w-24 h-24 rounded-full bg-[#00f0ff]/10 border-2 border-[#00f0ff] mx-auto mb-4 flex items-center justify-center font-black text-3xl font-mono text-[#00f0ff]">
                  NM
                </div>
                <h4 className="text-xl font-bold uppercase tracking-tight">MD Nawazish Naushad</h4>
                <p className="text-xs font-mono text-slate-400 mt-1">Full Stack Developer</p>
              </div>
              <div className="border-t border-white/10 pt-3 text-[11px] font-mono text-slate-400 flex justify-between">
                <span>LOCATION: INDIA</span>
                <span className="text-[#00f0ff]">VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONTACT SECTION (SYNCED WITH GOOGLE SHEETS)
      ========================================================================= */}
      <footer id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#00f0ff]">Get In Touch</span>
            <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter">
              Let&apos;s <br />
              <span className="font-serif italic text-[#00f0ff] lowercase font-normal">Connect.</span>
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Recruiting or looking to build modern web solutions? Send a direct message below. Submissions are
              automatically recorded into my Google Sheet dashboard.
            </p>

            <div className="space-y-3 pt-4 font-mono text-xs">
              <a
                href="mailto:mdnawazishnaushad@gmail.com"
                className="flex items-center gap-3 text-slate-300 hover:text-[#00f0ff] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#00f0ff]" />
                <span>mdnawazishnaushad@gmail.com</span>
              </a>
              <a
                href="https://github.com/mdnawazishnaushad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-300 hover:text-[#00f0ff] transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-[#00f0ff]" />
                <span>github.com/mdnawazishnaushad</span>
              </a>
              <a
                href="https://linkedin.com/in/md-nawazish-naushad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-300 hover:text-[#00f0ff] transition-colors"
              >
                <LinkedinIcon className="w-4 h-4 text-[#00f0ff]" />
                <span>linkedin.com/in/md-nawazish-naushad</span>
              </a>
            </div>
          </div>

          {/* Right Form (Saves to Google Sheets) */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 font-mono text-xs text-slate-400">
                <span>RECRUITER &amp; CLIENT INBOX</span>
                <span className="text-[#10b981] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Google Sheets Synced
                </span>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs uppercase text-slate-400 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-white font-sans text-sm outline-none focus:border-[#00f0ff] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase text-slate-400 mb-1.5">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-white font-sans text-sm outline-none focus:border-[#00f0ff] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase text-slate-400 mb-1.5">
                    Subject / Opportunity
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Full Stack Developer Opening / Project Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-white font-sans text-sm outline-none focus:border-[#00f0ff] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase text-slate-400 mb-1.5">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share project requirements, team details, or role description..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-white font-sans text-sm outline-none focus:border-[#00f0ff] transition-colors resize-none"
                  />
                </div>

                {formStatus === "success" && (
                  <div className="p-3 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] font-mono text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{formMessage}</span>
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs">
                    {formMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full py-4 rounded-xl bg-[#00f0ff] text-black font-mono text-xs md:text-sm uppercase font-black tracking-wider hover:opacity-95 hover:scale-[1.01] transition-all cursor-pointer shadow-lg shadow-[#00f0ff]/25 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{formStatus === "submitting" ? "Transmitting..." : "Send Message to Google Sheet ⚡"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Sub-footer Copyright */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-slate-500 gap-4">
          <div>© 2026 MD Nawazish Naushad · Crafted with precision &amp; modern brutality.</div>
          <div>Deployed on Vercel · Next.js 16</div>
        </div>
      </footer>
    </div>
  );
}
