"use client";

import { useState, useEffect } from "react";
import {
  X,
  Key,
  RefreshCw,
  Lock,
  Globe,
  GitCommit,
  ExternalLink,
  AlertCircle,
} from "lucide-react";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface RepoData {
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  language: string | null;
  pushed_at: string;
  stars: number;
  forks: number;
  commitCount30d: number;
  pct: number;
}

interface GitHubData {
  user: {
    login: string;
    name: string | null;
    avatar_url: string;
    public_repos: number;
    followers: number;
    following: number;
  };
  repos: RepoData[];
  totalCommits30d: number;
  rateLimit: { remaining: string | null; reset: string | null };
}

export interface DetalheContaProps {
  username: string;
  displayName: string;
  cor: string;
  corFundo: string;
  iniciais: string;
  onClose: () => void;
}

// ─── Mapa de cores por linguagem ──────────────────────────────────────────────

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  CSS: "#563d7c",
  HTML: "#e34c26",
  MQL5: "#4A76B8",
  Shell: "#89e051",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Dart: "#00B4AB",
};

// ─── Skeleton de carregamento ─────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-20 rounded-xl bg-white/5" />
        ))}
      </div>
      <div className="h-10 rounded-lg bg-white/5" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="h-10 rounded-lg bg-white/5" />
      ))}
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function DetalheConta({
  username,
  displayName,
  cor,
  corFundo,
  iniciais,
  onClose,
}: DetalheContaProps) {
  const storageKey = `xai_gh_token_${username}`;

  const [token, setToken] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(storageKey) ?? "";
    }
    return "";
  });
  const [tokenInput, setTokenInput] = useState("");
  const [showTokenForm, setShowTokenForm] = useState(false);
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchData(tkn?: string) {
    const useToken = tkn ?? token;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/github?username=${encodeURIComponent(username)}`, {
        headers: useToken ? { "x-github-token": useToken } : {},
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `Erro ${res.status}`);
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  // Busca ao abrir o modal
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchData(); }, []);

  function salvarToken() {
    const t = tokenInput.trim();
    if (!t) return;
    localStorage.setItem(storageKey, t);
    setToken(t);
    setTokenInput("");
    setShowTokenForm(false);
    fetchData(t);
  }

  function removerToken() {
    localStorage.removeItem(storageKey);
    setToken("");
    setShowTokenForm(false);
  }

  // Fecha com Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative bg-card border border-card-border rounded-2xl w-full max-w-2xl max-h-[88vh] flex flex-col shadow-2xl"
        style={{ borderTopColor: cor, borderTopWidth: 3 }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between p-6 border-b border-card-border flex-shrink-0 gap-4">
          <div className="flex items-center gap-4 min-w-0">
            {/* Avatar — real do GitHub se disponível */}
            {data?.user.avatar_url ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={data.user.avatar_url}
                alt={username}
                width={52}
                height={52}
                className="rounded-full flex-shrink-0 border-2"
                style={{ borderColor: cor }}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div
                className="rounded-full flex items-center justify-center text-base font-bold flex-shrink-0"
                style={{ width: 52, height: 52, background: corFundo, color: cor }}
              >
                {iniciais}
              </div>
            )}

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base leading-tight">
                  {data?.user.name ?? displayName}
                </h2>
                <a
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-foreground transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-sm text-muted">@{username}</p>
              {data && (
                <p className="text-xs text-muted mt-0.5">
                  {data.user.public_repos} repos públicos · {data.user.followers} seguidores
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-muted hover:text-foreground p-1.5 rounded-lg hover:bg-white/5 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Barra de Token ── */}
        <div className="px-6 py-2.5 border-b border-card-border bg-white/[0.02] flex-shrink-0 text-xs">
          {showTokenForm ? (
            <div className="flex items-center gap-2">
              <Key className="w-3.5 h-3.5 text-muted flex-shrink-0" />
              <input
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && salvarToken()}
                placeholder="ghp_xxxx  (PAT com escopo 'repo')"
                className="flex-1 bg-transparent border border-card-border rounded-lg px-3 py-1.5 focus:outline-none focus:border-accent text-xs"
                autoFocus
              />
              <button
                onClick={salvarToken}
                className="px-3 py-1.5 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors whitespace-nowrap"
              >
                Salvar e buscar
              </button>
              <button
                onClick={() => setShowTokenForm(false)}
                className="text-muted hover:text-foreground transition-colors"
              >
                Cancelar
              </button>
            </div>
          ) : token ? (
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-success">
                <Key className="w-3.5 h-3.5" />
                Token configurado — repos privados incluídos
                {data?.rateLimit.remaining && (
                  <span className="text-muted ml-2">
                    · {data.rateLimit.remaining} chamadas restantes
                  </span>
                )}
              </span>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => fetchData()}
                  disabled={loading}
                  className="flex items-center gap-1 text-muted hover:text-foreground transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
                  Atualizar
                </button>
                <button
                  onClick={removerToken}
                  className="text-error/70 hover:text-error transition-colors"
                >
                  Remover token
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-muted">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                Sem token — só repos públicos.{" "}
                <button
                  onClick={() => setShowTokenForm(true)}
                  className="text-accent hover:underline"
                >
                  Adicionar PAT
                </button>{" "}
                para incluir privados.
              </span>
              <button
                onClick={() => fetchData()}
                disabled={loading}
                className="flex items-center gap-1 text-muted hover:text-foreground transition-colors disabled:opacity-50 flex-shrink-0"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
                Atualizar
              </button>
            </div>
          )}
        </div>

        {/* ── Corpo ── */}
        <div className="flex-1 overflow-auto p-6">
          {loading && <Skeleton />}

          {!loading && error && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-error/10 border border-error/20 text-sm text-error">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {!loading && data && (
            <div className="space-y-5">
              {/* Stats do mês */}
              <div className="grid grid-cols-3 gap-3">
                <div
                  className="rounded-xl p-4 text-center"
                  style={{ background: `${cor}12` }}
                >
                  <p className="text-xs text-muted mb-1">Commits (30d)</p>
                  <p className="text-2xl font-bold" style={{ color: cor }}>
                    {data.totalCommits30d}
                  </p>
                </div>
                <div className="rounded-xl p-4 text-center bg-white/5">
                  <p className="text-xs text-muted mb-1">Repos ativos</p>
                  <p className="text-2xl font-bold">
                    {data.repos.filter((r) => r.commitCount30d > 0).length}
                  </p>
                </div>
                <div className="rounded-xl p-4 text-center bg-white/5">
                  <p className="text-xs text-muted mb-1">Total repos</p>
                  <p className="text-2xl font-bold">{data.user.public_repos}</p>
                </div>
              </div>

              {/* Aviso sobre Copilot API */}
              <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-warning/5 border border-warning/20 text-xs text-warning/80">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>
                  O GitHub não expõe métricas de tokens Copilot por conta individual via API.
                  Os <strong>% abaixo são baseados em commits dos últimos 30 dias</strong> como
                  proxy de atividade por repositório.
                </span>
              </div>

              {/* Tabela de repos */}
              {data.repos.length === 0 && (
                <p className="text-sm text-muted text-center py-10">
                  Nenhum repositório encontrado.
                </p>
              )}

              {data.repos.length > 0 && (
                <div>
                  {/* Cabeçalho */}
                  <div className="grid grid-cols-[1fr_88px_68px_96px] gap-2 text-xs text-muted px-2 mb-2 uppercase tracking-wide">
                    <span>Repositório</span>
                    <span className="text-right">Linguagem</span>
                    <span className="text-right">Commits</span>
                    <span className="text-right">% atividade</span>
                  </div>

                  {/* Linhas */}
                  <div className="divide-y divide-card-border">
                    {data.repos
                      .sort((a, b) => b.commitCount30d - a.commitCount30d)
                      .map((repo) => {
                        const langColor = LANG_COLORS[repo.language ?? ""] ?? "#6b7280";
                        return (
                          <div
                            key={repo.name}
                            className="grid grid-cols-[1fr_88px_68px_96px] gap-2 items-center px-2 py-2.5 hover:bg-white/[0.03] transition-colors rounded-lg"
                          >
                            {/* Nome + ícone */}
                            <div className="flex items-center gap-2 min-w-0">
                              {repo.private ? (
                                <Lock className="w-3 h-3 text-muted flex-shrink-0" />
                              ) : (
                                <Globe className="w-3 h-3 text-muted flex-shrink-0" />
                              )}
                              <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-sm hover:underline truncate flex items-center gap-1"
                              >
                                {repo.name}
                                <ExternalLink className="w-2.5 h-2.5 flex-shrink-0 opacity-40" />
                              </a>
                            </div>

                            {/* Linguagem */}
                            <div className="flex items-center justify-end gap-1 text-xs text-muted">
                              {repo.language && (
                                <>
                                  <span
                                    className="w-2 h-2 rounded-full flex-shrink-0"
                                    style={{ background: langColor }}
                                  />
                                  <span className="truncate max-w-[66px]">{repo.language}</span>
                                </>
                              )}
                            </div>

                            {/* Commits */}
                            <div
                              className="flex items-center justify-end gap-1 text-sm font-semibold tabular-nums"
                              style={{ color: repo.commitCount30d > 0 ? cor : "#6b7280" }}
                            >
                              <GitCommit className="w-3 h-3 flex-shrink-0" />
                              {repo.commitCount30d >= 100 ? "99+" : repo.commitCount30d}
                            </div>

                            {/* % atividade */}
                            <div className="flex items-center gap-2 justify-end">
                              <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden max-w-10">
                                <div
                                  className="h-full rounded-full"
                                  style={{ width: `${repo.pct}%`, background: cor }}
                                />
                              </div>
                              <span
                                className="text-xs font-medium tabular-nums w-8 text-right"
                                style={{ color: repo.pct > 0 ? cor : "#6b7280" }}
                              >
                                {repo.pct}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
