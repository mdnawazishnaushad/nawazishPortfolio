import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const username = "mdnawazishnaushad";

  // Curated showcase projects
  const featuredProjects = [
    {
      id: "feat-1",
      name: "HairSalonApp",
      fullName: `${username}/hairsalonapp`,
      description: "Full-featured salon booking and client scheduling web platform built with TypeScript, React, and real-time appointment pipelines.",
      url: `https://github.com/${username}/hairsalonapp`,
      homepage: "https://hairsalonapp-puce.vercel.app",
      language: "TypeScript",
      stars: 4,
      forks: 1,
      role: "Full Stack Lead",
      year: "2025",
      topics: ["typescript", "react", "nextjs", "vercel"],
      previewType: "salon",
    },
    {
      id: "feat-2",
      name: "Py-Monitor-Bot",
      fullName: `${username}/monitor-website`,
      description: "Asynchronous Python daemon continuously pinging deployed applications to prevent idle sleep and cold starts on Railway & Render.",
      url: `https://github.com/${username}/monitor-website`,
      homepage: null,
      language: "Python",
      stars: 6,
      forks: 2,
      role: "Python Engineer",
      year: "2025",
      topics: ["python", "asyncio", "httpx", "automation"],
      previewType: "bot",
    },
    {
      id: "feat-3",
      name: "Blogspot Platform",
      fullName: `${username}/blogspot`,
      description: "Dynamic blogging and markdown publication engine featuring dark mode, fast edge rendering, and content card layouts.",
      url: `https://github.com/${username}/blogspot`,
      homepage: null,
      language: "JavaScript",
      stars: 3,
      forks: 1,
      role: "Full Stack Developer",
      year: "2024",
      topics: ["javascript", "web", "html5", "css3"],
      previewType: "blog",
    },
    {
      id: "feat-4",
      name: "UHP Core API",
      fullName: `${username}/uhp-core-api`,
      description: "Backend business logic architecture with JWT authentication middleware, rate limiting, and relational PostgreSQL database storage.",
      url: `https://github.com/${username}/uhp-core-api`,
      homepage: null,
      language: "Node.js",
      stars: 5,
      forks: 1,
      role: "Backend Architect",
      year: "2024",
      topics: ["nodejs", "express", "postgresql", "jwt"],
      previewType: "backend",
    },
  ];

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Nawazish-Portfolio-App",
      },
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const liveRepos = await res.json();
      const liveMapped = liveRepos
        .filter((r: any) => r.name !== "mdnawazishnaushad") // ignore user profile repo
        .map((r: any) => ({
          id: r.id,
          name: r.name,
          fullName: r.full_name,
          description: r.description || "Modern full-stack project built with clean architecture & production deployment.",
          url: r.html_url,
          homepage: r.homepage,
          language: r.language || "TypeScript",
          stars: r.stargazers_count,
          forks: r.forks_count,
          role: "Developer",
          year: "2025",
          topics: r.topics || [],
          previewType: "code",
        }));

      // Combine curated showcase + live repos (deduplicating by name)
      const combined = [...featuredProjects];
      for (const live of liveMapped) {
        if (!combined.some((p) => p.name.toLowerCase() === live.name.toLowerCase())) {
          combined.push(live);
        }
      }

      return NextResponse.json({ success: true, repos: combined });
    }
  } catch (error) {
    console.error("Live GitHub fetch error:", error);
  }

  return NextResponse.json({ success: true, repos: featuredProjects });
}
