"use client";

import { useState } from "react";
import { DetalheConta } from "./detalhe-conta";
import { CLAUDE_CUSTO_TOTAL } from "./relatorio-claude";
import {
  GitBranch,
  DollarSign,
  Users,
  Zap,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Code2,
  Cpu,
} from "lucide-react";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Projeto {
  nome: string;
  pct: number; // % de tokens usados neste projeto
  cor: string;
  icone: string;
}

interface Conta {
  id: string;
  username: string;
  displayName: string;
  iniciais: string;
  cor: string;
  corFundo: string;
  githubUrl: string;
  plano: string;
  custoMensal: number;
  totalRequests: number; // total estimado de requests no mês
  status: "ativo" | "moderado" | "baixo";
  projetos: Projeto[];
}

// ─── Dados das contas ─────────────────────────────────────────────────────────
// Atualize os valores de `pct` e `totalRequests` conforme os dados reais do GitHub.

const CONTAS: Conta[] = [
  {
    id: "xandejpeg",
    username: "xandejpeg",
    displayName: "Xand JPEG",
    iniciais: "XJ",
    cor: "#3b82f6",
    corFundo: "#3b82f614",
    githubUrl: "https://github.com/xandejpeg",
    plano: "Copilot Pro",
    custoMensal: 78, // 2 meses
    totalRequests: 2_840,
    status: "ativo",
    projetos: [
      { nome: "Easy e-Social (APPA)", pct: 100, cor: "#3b82f6", icone: "🟢" },
    ],
  },
  {
    id: "alessandrodev",
    username: "AlessandroChiareledev",
    displayName: "Alessandro Chiarele",
    iniciais: "AC",
    cor: "#8b5cf6",
    corFundo: "#8b5cf614",
    githubUrl: "https://github.com/AlessandroChiareledev",
    plano: "Copilot Pro",
    custoMensal: 78, // 2 meses
    totalRequests: 1_960,
    status: "ativo",
    projetos: [
      { nome: "Easy e-Social (APPA)", pct: 99, cor: "#8b5cf6", icone: "🟢" },
      { nome: "Outros", pct: 1, cor: "#c4b5fd", icone: "📁" },
    ],
  },
  {
    id: "sickobat",
    username: "sickoBAT",
    displayName: "Sicko BAT",
    iniciais: "SB",
    cor: "#ec4899",
    corFundo: "#ec489914",
    githubUrl: "https://github.com/sickoBAT",
    plano: "Copilot Pro",
    custoMensal: 78, // 2 meses
    totalRequests: 1_520,
    status: "ativo",
    projetos: [
      { nome: "Easy e-Social (APPA)", pct: 99, cor: "#ec4899", icone: "🟢" },
      { nome: "Outros", pct: 1, cor: "#f9a8d4", icone: "📁" },
    ],
  },
  {
    id: "xandedev1",
    username: "xandedev1",
    displayName: "Xande Dev 1",
    iniciais: "X1",
    cor: "#10b981",
    corFundo: "#10b98114",
    githubUrl: "https://github.com/xandedev1",
    plano: "Copilot Pro",
    custoMensal: 78, // 2 meses
    totalRequests: 1_280,
    status: "ativo",
    projetos: [
      { nome: "Easy e-Social (APPA)", pct: 99, cor: "#10b981", icone: "🟢" },
      { nome: "Outros", pct: 1, cor: "#6ee7b7", icone: "📁" },
    ],
  },
  {
    id: "xandedev2",
    username: "xandedev2",
    displayName: "Xande Dev 2",
    iniciais: "X2",
    cor: "#f59e0b",
    corFundo: "#f59e0b14",
    githubUrl: "https://github.com/xandedev2",
    plano: "Copilot Pro",
    custoMensal: 78, // 2 meses
    totalRequests: 1_040,
    status: "ativo",
    projetos: [
      { nome: "Easy e-Social (APPA)", pct: 98, cor: "#f59e0b", icone: "🟢" },
      { nome: "Outros", pct: 2, cor: "#fcd34d", icone: "📁" },
    ],
  },
  {
    id: "iago1409",
    username: "iago1409",
    displayName: "Iago 1409",
    iniciais: "IA",
    cor: "#06b6d4",
    corFundo: "#06b6d414",
    githubUrl: "https://github.com/iago1409",
    plano: "Copilot Pro",
    custoMensal: 78, // 2 meses
    totalRequests: 3_700,
    status: "ativo",
    projetos: [
      { nome: "Easy e-Social (APPA)", pct: 99, cor: "#06b6d4", icone: "🟢" },
      { nome: "Outros", pct: 1, cor: "#67e8f9", icone: "📁" },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  ativo: { label: "Ativo", cor: "#22c55e", bg: "#22c55e20" },
  moderado: { label: "Moderado", cor: "#eab308", bg: "#eab30820" },
  baixo: { label: "Baixo uso", cor: "#6b7280", bg: "#6b728020" },
} as const;

function formatarNumero(n: number) {
  return n.toLocaleString("pt-BR");
}

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  cor,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  cor: string;
}) {
  return (
    <div className="bg-card border border-card-border rounded-xl p-5 flex gap-4 items-start">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${cor}20` }}
      >
        <Icon className="w-5 h-5" style={{ color: cor }} />
      </div>
      <div>
        <p className="text-xs text-muted mb-0.5">{label}</p>
        <p className="text-xl font-bold">{value}</p>
        {sub && <p className="text-xs text-muted mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function BarraProgresso({ pct, cor }: { pct: number; cor: string }) {
  return (
    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, background: cor }}
      />
    </div>
  );
}

function CartaoConta({
  conta,
  onOpenDetail,
}: {
  conta: Conta;
  onOpenDetail: (c: Conta) => void;
}) {
  const [expandido, setExpandido] = useState(false);
  const status = STATUS_CONFIG[conta.status];

  return (
    <div
      className="bg-card border border-card-border rounded-xl overflow-hidden transition-all duration-200 hover:border-white/20 cursor-pointer"
      style={{ borderLeftColor: conta.cor, borderLeftWidth: 3 }}
      onClick={() => onOpenDetail(conta)}
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          {/* Avatar + info */}
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ background: conta.corFundo, color: conta.cor }}
            >
              {conta.iniciais}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{conta.displayName}</span>
                <a
                  href={conta.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-foreground transition-colors"
                  title="Abrir no GitHub"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <span className="text-xs text-muted">@{conta.username}</span>
            </div>
          </div>

          {/* Badge status */}
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0"
            style={{ background: status.bg, color: status.cor }}
          >
            {status.label}
          </span>
        </div>

        {/* Métricas rápidas */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-lg p-2.5 text-center" style={{ background: "#ffffff08" }}>
            <p className="text-xs text-muted">Plano</p>
            <p className="text-xs font-semibold mt-0.5 text-accent">Pro</p>
          </div>
          <div className="rounded-lg p-2.5 text-center" style={{ background: "#ffffff08" }}>
            <p className="text-xs text-muted">Custo</p>
            <p className="text-xs font-semibold mt-0.5 text-success">
              ${conta.custoMensal}
            </p>
          </div>
          <div className="rounded-lg p-2.5 text-center" style={{ background: "#ffffff08" }}>
            <p className="text-xs text-muted">Requests</p>
            <p className="text-xs font-semibold mt-0.5">{formatarNumero(conta.totalRequests)}</p>
          </div>
        </div>
      </div>

      {/* Barra de uso total (visual relativo ao máximo do grupo) */}
      <div className="px-5 pb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-muted flex items-center gap-1.5">
            <Cpu className="w-3 h-3" />
            Distribuição de tokens por projeto
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); setExpandido((v) => !v); }}
            className="text-muted hover:text-foreground transition-colors"
          >
            {expandido ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Barra empilhada */}
        <div className="h-3 rounded-full overflow-hidden flex gap-px">
          {conta.projetos.map((p) => (
            <div
              key={p.nome}
              className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-700"
              style={{ width: `${p.pct}%`, background: p.cor }}
              title={`${p.nome}: ${p.pct}%`}
            />
          ))}
        </div>
      </div>

      {/* Detalhes expansíveis */}
      {expandido && (
        <div className="px-5 pb-5 space-y-3 border-t border-card-border pt-4 mt-1">
          <div className="grid grid-cols-3 text-xs text-muted mb-1 px-0.5">
            <span>Projeto</span>
            <span className="text-center">Requests</span>
            <span className="text-right">% tokens</span>
          </div>
          {conta.projetos.map((projeto) => {
            const reqsProjeto = Math.round((projeto.pct / 100) * conta.totalRequests);
            return (
              <div key={projeto.nome}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs flex items-center gap-1.5 flex-1">
                    <span>{projeto.icone}</span>
                    <span>{projeto.nome}</span>
                  </span>
                  <span className="text-xs tabular-nums text-muted w-16 text-center">
                    {formatarNumero(reqsProjeto)}
                  </span>
                  <span
                    className="text-xs font-semibold tabular-nums w-10 text-right"
                    style={{ color: projeto.cor }}
                  >
                    {projeto.pct}%
                  </span>
                </div>
                <BarraProgresso pct={projeto.pct} cor={projeto.cor} />
              </div>
            );
          })}
          <div className="flex items-center justify-between pt-2 border-t border-card-border mt-1">
            <span className="text-xs text-muted">Total</span>
            <span className="text-xs font-semibold tabular-nums">
              {formatarNumero(conta.totalRequests)} requests
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Gráfico de pizza simples (SVG) ──────────────────────────────────────────

function GraficoPizza({ contas }: { contas: Conta[] }) {
  const total = contas.reduce((s, c) => s + c.totalRequests, 0);
  let angulo = -90; // começa do topo

  const fatias = contas.map((c) => {
    const pct = c.totalRequests / total;
    const graus = pct * 360;
    const inicio = angulo;
    angulo += graus;
    return { ...c, pct, graus, inicio };
  });

  function describeArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
    const toRad = (d: number) => (d * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startDeg));
    const y1 = cy + r * Math.sin(toRad(startDeg));
    const x2 = cx + r * Math.cos(toRad(endDeg));
    const y2 = cy + r * Math.sin(toRad(endDeg));
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  }

  return (
    <div className="flex items-center gap-6">
      <svg width={160} height={160} viewBox="0 0 160 160">
        {fatias.map((f) => (
          <path
            key={f.id}
            d={describeArc(80, 80, 72, f.inicio, f.inicio + f.graus)}
            fill={f.cor}
            stroke="#141414"
            strokeWidth={2}
            opacity={0.9}
          />
        ))}
        {/* Anel interno */}
        <circle cx={80} cy={80} r={42} fill="#141414" />
        <text x={80} y={76} textAnchor="middle" fill="#ededed" fontSize={11} fontWeight="bold">
          {formatarNumero(total)}
        </text>
        <text x={80} y={91} textAnchor="middle" fill="#737373" fontSize={9}>
          requests
        </text>
      </svg>

      <div className="space-y-2 flex-1">
        {fatias.map((f) => (
          <div key={f.id} className="flex items-center gap-2.5">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: f.cor }}
            />
            <span className="text-xs text-muted flex-1 truncate">@{f.username}</span>
            <span className="text-xs font-semibold tabular-nums">
              {(f.pct * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function RelatorioGithub() {
  const [contaSelecionada, setContaSelecionada] = useState<Conta | null>(null);
  const totalMensal = CONTAS.reduce((s, c) => s + c.custoMensal, 0); // 2 meses × 6 contas
  const totalRequests = CONTAS.reduce((s, c) => s + c.totalRequests, 0);
  const contasAtivas = CONTAS.filter((c) => c.status === "ativo").length;
  const maxRequests = Math.max(...CONTAS.map((c) => c.totalRequests));

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* ── Cabeçalho ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GitBranch className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-bold">Relatório GitHub Copilot</h2>
          </div>
          <p className="text-sm text-muted">
            Visão consolidada das 6 contas · Período: 2 meses
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-card-border text-xs" style={{ background: "#22c55e10", borderColor: "#22c55e40", color: "#22c55e" }}>
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          100% dos créditos → Easy e-Social (APPA)
        </div>
      </div>

      {/* ── Cards de resumo ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Contas utilizadas"
          value="6 contas"
          sub={`${contasAtivas} ativas no período`}
          icon={Users}
          cor="#3b82f6"
        />
        <StatCard
          label="Créditos gastos (2 meses)"
          value={`$${totalMensal}`}
          sub="6 contas × $39 × 2 meses"
          icon={DollarSign}
          cor="#22c55e"
        />
        <StatCard
          label="Requests totais"
          value={formatarNumero(totalRequests)}
          sub="estimativa 2 meses"
          icon={Zap}
          cor="#f59e0b"
        />
        <StatCard
          label="Projeto beneficiado"
          value="APPA"
          sub="Easy e-Social · 99–100%"
          icon={TrendingUp}
          cor="#22c55e"
        />
      </div>

      {/* ── Layout 2 colunas: pizza + tabela rápida ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pizza */}
        <div className="bg-card border border-card-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <GitBranch className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-semibold">Requests por Conta</h3>
          </div>
          <GraficoPizza contas={CONTAS} />
        </div>

        {/* Barra de uso relativo */}
        <div className="bg-card border border-card-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Code2 className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-semibold">Uso Relativo entre Contas</h3>
          </div>
          <div className="space-y-4">
            {CONTAS.slice()
              .sort((a, b) => b.totalRequests - a.totalRequests)
              .map((c) => {
                const pct = (c.totalRequests / maxRequests) * 100;
                return (
                  <div key={c.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ background: c.corFundo, color: c.cor }}
                        >
                          {c.iniciais[0]}
                        </div>
                        <span className="text-xs">@{c.username}</span>
                      </div>
                      <span className="text-xs font-semibold tabular-nums text-muted">
                        {formatarNumero(c.totalRequests)}
                      </span>
                    </div>
                    <BarraProgresso pct={pct} cor={c.cor} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* ── Grid de contas ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <GitBranch className="w-4 h-4 text-muted" />
          <h3 className="text-sm font-semibold">Detalhes por Conta</h3>
          <span className="text-xs text-muted ml-auto">
            Clique no card para ver dados reais do GitHub
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {CONTAS.map((conta) => (
            <CartaoConta
              key={conta.id}
              conta={conta}
              onOpenDetail={setContaSelecionada}
            />
          ))}
        </div>
      </div>

      {/* ── Modal de detalhes reais (GitHub API) ── */}
      {contaSelecionada && (
        <DetalheConta
          username={contaSelecionada.username}
          displayName={contaSelecionada.displayName}
          cor={contaSelecionada.cor}
          corFundo={contaSelecionada.corFundo}
          iniciais={contaSelecionada.iniciais}
          onClose={() => setContaSelecionada(null)}
        />
      )}

      {/* ── Rodapé ── */}
      <div className="border-t border-card-border pt-5 space-y-3">
        {/* Linha de custo consolidado */}
        <div className="flex items-center gap-3 flex-wrap p-4 rounded-xl bg-white/[0.03] border border-card-border">
          <span className="text-xs text-muted">💰 Custo total do projeto Easy e-Social (APPA) em 2 meses:</span>
          <div className="flex items-center gap-4 ml-auto flex-wrap">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-muted">GitHub Copilot (6 contas):</span>
              <span className="font-semibold text-accent">${totalMensal}</span>
            </div>
            <div className="text-muted">+</div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-muted">Claude Max 20× (1 conta):</span>
              <span className="font-semibold" style={{ color: "#f97316" }}>${CLAUDE_CUSTO_TOTAL}</span>
            </div>
            <div className="text-muted">=</div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted">Total:</span>
              <span className="text-lg font-black text-success">${totalMensal + CLAUDE_CUSTO_TOTAL}</span>
            </div>
          </div>
        </div>
        {/* Nota */}
        <p className="text-xs text-muted">
          📋 Dados referentes ao período de <strong>2 meses</strong> de uso do GitHub Copilot Pro.
          Valores de requests são estimativas; % do projeto são baseados em atividade real.
        </p>
      </div>
    </div>
  );
}
