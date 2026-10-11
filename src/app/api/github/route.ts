import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const username = "mdnawazishnaushad";

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Nawazish-Portfolio-App",
      },
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const liveRepos = await res.json();
      const repos = liveRepos
        .filter((r: any) => r.name !== "mdnawazishnaushad") // ignore README profile repo
        .map((r: any) => ({
          id: r.id,
          name: r.name,
          fullName: r.full_name,
          description: r.description || "Project built with modern architecture and deployed for production use.",
          url: r.html_url,
          homepage: r.homepage,
          language: r.language || "TypeScript",
          stars: r.stargazers_count,
          forks: r.forks_count,
          topics: r.topics || [],
          updatedAt: r.updated_at,
        }));

      return NextResponse.json({ success: true, repos });
    }
  } catch (error) {
    console.error("Live GitHub fetch error:", error);
  }

  // Graceful fallback to real user repositories if API is rate-limited
  const fallback = [
    {
      id: "live-1",
      name: "nawazishPortfolio",
      fullName: `${username}/nawazishPortfolio`,
      description: "Full-stack developer portfolio built with Next.js 16, TypeScript, Tailwind CSS, live GitHub API, and Google Sheets contact integration.",
      url: `https://github.com/${username}/nawazishPortfolio`,
      homepage: "https://nawazish-portfolio.vercel.app",
      language: "TypeScript",
      stars: 1,
      forks: 0,
      topics: ["nextjs", "typescript", "tailwind", "portfolio"],
    },
  ];

  return NextResponse.json({ success: true, repos: fallback });
}
