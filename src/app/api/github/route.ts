import { NextResponse } from "next/server";

export async function GET() {
  const username = "mdnawazishnaushad";
  const headers = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Nawazish-Portfolio-App",
  };

  try {
    // Fetch user profile + repos in parallel
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (userRes.ok && reposRes.ok) {
      const userData = await userRes.json();
      const liveRepos = await reposRes.json();

      const repos = liveRepos
        .filter((r: any) => r.name !== username) // skip profile README repo
        .map((r: any) => ({
          id: r.id,
          name: r.name,
          fullName: r.full_name,
          description:
            r.description ||
            "Project built with modern architecture and deployed for production use.",
          url: r.html_url,
          homepage: r.homepage || null,
          language: r.language || "TypeScript",
          stars: r.stargazers_count,
          forks: r.forks_count,
          topics: r.topics || [],
          updatedAt: r.updated_at,
        }));

      // Compute total stars across all repos
      const totalStars = (liveRepos as any[]).reduce(
        (acc: number, r: any) => acc + (r.stargazers_count || 0),
        0
      );

      const stats = {
        followers: userData.followers ?? 0,
        following: userData.following ?? 0,
        publicRepos: userData.public_repos ?? 0,
        totalStars,
        memberSince: userData.created_at
          ? new Date(userData.created_at).getFullYear()
          : 2023,
        bio: userData.bio || null,
        avatarUrl: userData.avatar_url || null,
        htmlUrl: userData.html_url || `https://github.com/${username}`,
      };

      return NextResponse.json({ success: true, repos, stats });
    }
  } catch (error) {
    console.error("Live GitHub fetch error:", error);
  }

  // Graceful fallback
  const fallback = [
    {
      id: "live-1",
      name: "nawazishPortfolio",
      fullName: `${username}/nawazishPortfolio`,
      description:
        "Full-stack developer portfolio built with Next.js 16, TypeScript, Tailwind CSS, live GitHub API, and Google Sheets contact integration.",
      url: `https://github.com/${username}/nawazishPortfolio`,
      homepage: "https://nawazish-portfolio.vercel.app",
      language: "TypeScript",
      stars: 1,
      forks: 0,
      topics: ["nextjs", "typescript", "tailwind", "portfolio"],
      updatedAt: new Date().toISOString(),
    },
  ];

  const fallbackStats = {
    followers: 0,
    following: 6,
    publicRepos: 2,
    totalStars: 1,
    memberSince: 2023,
    bio: "Ethical Hacker | Ethical Hacking & Programming | Web development | Telegram Bot Development | Penetration Tester | Security Researcher | Bug Hunter.",
    avatarUrl: "https://avatars.githubusercontent.com/u/143341859?v=4",
    htmlUrl: `https://github.com/${username}`,
  };

  return NextResponse.json({ success: true, repos: fallback, stats: fallbackStats });
}
