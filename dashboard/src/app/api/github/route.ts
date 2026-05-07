import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const token = request.headers.get("x-github-token");

  if (!username) {
    return NextResponse.json({ error: "Username obrigatório" }, { status: 400 });
  }

  const ghHeaders: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "xai-dashboard/1.0",
  };
  if (token) ghHeaders["Authorization"] = `Bearer ${token}`;

  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  try {
    // 1. Perfil + repos em paralelo
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
        headers: ghHeaders,
      }),
      fetch(
        token
          ? "https://api.github.com/user/repos?per_page=100&sort=pushed&type=all"
          : `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed&type=public`,
        { headers: ghHeaders }
      ),
    ]);

    if (!userRes.ok) {
      const err = (await userRes.json().catch(() => ({}))) as { message?: string };
      return NextResponse.json(
        { error: err.message ?? `GitHub API: ${userRes.status}` },
        { status: userRes.status }
      );
    }

    const [user, allRepos] = await Promise.all([
      userRes.json(),
      reposRes.ok ? reposRes.json() : Promise.resolve([]),
    ]);

    if (!Array.isArray(allRepos)) {
      return NextResponse.json({ error: "Resposta inválida dos repos" }, { status: 500 });
    }

    type RawRepo = {
      name: string;
      full_name: string;
      private: boolean;
      html_url: string;
      description: string | null;
      language: string | null;
      pushed_at: string;
      stargazers_count: number;
      forks_count: number;
    };

    // Top 20 mais recentemente atualizados
    const repos = (allRepos as RawRepo[]).slice(0, 20);

    // 2. Commits (últimos 30 dias) por repo em paralelo
    const reposWithActivity = await Promise.all(
      repos.map(async (repo) => {
        try {
          const res = await fetch(
            `https://api.github.com/repos/${repo.full_name}/commits?since=${since}&per_page=100`,
            { headers: ghHeaders }
          );
          const commits = res.ok ? await res.json() : [];
          const commitCount = Array.isArray(commits) ? commits.length : 0;
          return { ...repo, commitCount30d: commitCount };
        } catch {
          return { ...repo, commitCount30d: 0 };
        }
      })
    );

    const totalCommits = reposWithActivity.reduce((s, r) => s + r.commitCount30d, 0);

    return NextResponse.json({
      user: {
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url,
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
      },
      repos: reposWithActivity.map((r) => ({
        name: r.name,
        full_name: r.full_name,
        private: r.private,
        html_url: r.html_url,
        description: r.description,
        language: r.language,
        pushed_at: r.pushed_at,
        stars: r.stargazers_count,
        forks: r.forks_count,
        commitCount30d: r.commitCount30d,
        pct: totalCommits > 0 ? Math.round((r.commitCount30d / totalCommits) * 100) : 0,
      })),
      totalCommits30d: totalCommits,
      rateLimit: {
        remaining: userRes.headers.get("x-ratelimit-remaining"),
        reset: userRes.headers.get("x-ratelimit-reset"),
      },
    });
  } catch (e) {
    console.error("[api/github]", e);
    return NextResponse.json({ error: "Falha interna ao buscar GitHub" }, { status: 500 });
  }
}
