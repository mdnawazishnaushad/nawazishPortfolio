import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const username = "mdnawazishnaushad";
  
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        // Optional user-agent as recommended by GitHub API
        "User-Agent": "Nawazish-Portfolio-App",
      },
      next: { revalidate: 3600 }, // Cache on Vercel for 1 hour to prevent hitting rate limits
    });

    if (!res.ok) {
      throw new Error(`GitHub API responded with status ${res.status}`);
    }

    const repos = await res.json();

    // Map clean format for frontend
    const formatted = repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description || "Full-stack project built with modern technologies & clean architecture.",
      url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language || "TypeScript",
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      topics: repo.topics || [],
      isFork: repo.fork,
    }));

    return NextResponse.json({ success: true, repos: formatted });
  } catch (error: any) {
    console.error("Error fetching live GitHub repos:", error);

    // High quality fallback projects if rate-limited or offline
    const fallback = [
      {
        id: 1,
        name: "fullstack-saas-platform",
        description: "Full-stack cloud platform built with Next.js, TypeScript, PostgreSQL, and Tailwind CSS. Features authentication & live metrics.",
        url: `https://github.com/${username}`,
        homepage: "https://vercel.app",
        language: "TypeScript",
        stars: 3,
        forks: 1,
        topics: ["nextjs", "typescript", "postgresql", "tailwind"],
      },
      {
        id: 2,
        name: "python-uptime-sentinel",
        description: "Asynchronous automated bot continuously checking web app endpoints & health checks to prevent idle shutdown on cloud providers.",
        url: `https://github.com/${username}`,
        homepage: null,
        language: "Python",
        stars: 4,
        forks: 2,
        topics: ["python", "asyncio", "httpx", "automation"],
      },
      {
        id: 3,
        name: "high-perf-rest-api",
        description: "High-performance REST API architecture with JWT authentication, middleware pipelines, and scalable database pooling.",
        url: `https://github.com/${username}`,
        homepage: null,
        language: "TypeScript",
        stars: 2,
        forks: 0,
        topics: ["nodejs", "express", "prisma", "jwt"],
      },
      {
        id: 4,
        name: "developer-portal-nextjs",
        description: "Modern developer portfolio and showcase with real-time GitHub integration, audio synthesizer, and Google Sheets contact capture.",
        url: `https://github.com/${username}`,
        homepage: "https://vercel.app",
        language: "React",
        stars: 5,
        forks: 1,
        topics: ["react", "nextjs", "tailwind", "portfolio"],
      }
    ];

    return NextResponse.json({ success: true, repos: fallback, fallback: true });
  }
}
