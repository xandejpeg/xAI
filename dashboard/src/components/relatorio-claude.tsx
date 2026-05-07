"use client";

import {
  DollarSign,
  Zap,
  TrendingUp,
  ExternalLink,
  Code2,
  GitBranch,
} from "lucide-react";

// ─── Constantes ────────────────────────────────────────────────────────────────

const MESES = 2;
const CUSTO_MENSAL = 200; // Claude Max 20x — $200/mês (confirmado em claude.com/pricing/max)
const CUSTO_TOTAL = CUSTO_MENSAL * MESES; // $400

const CONTA_CLAUDE = {
  username: "xandejpeg",
  displayName: "Xande JPEG",
  plano: "Claude Max 20x",
  custoMensal: CUSTO_MENSAL,
  custoTotal: CUSTO_TOTAL,
  cor: "#f97316",
  corFundo: "#f9731614",
  iniciais: "XJ",
  projeto: "Easy e-Social (APPA)",
  pctProjeto: 100,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString("pt-BR");
}

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

// ─── Componente principal ─────────────────────────────────────────────────────

export function RelatorioClaude() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* ── Cabeçalho ── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            {/* Ícone laranja representando Claude */}
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-black"
              style={{ background: "#f97316", color: "#fff" }}
            >
              C
            </div>
            <h2 className="text-lg font-bold">Contas do Claude Code</h2>
          </div>
          <p className="text-sm text-muted">
            Gastos com Claude Max 20× · Período: {MESES} meses
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium"
          style={{ background: "#22c55e10", borderColor: "#22c55e40", color: "#22c55e" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          100% dos créditos → Easy e-Social (APPA)
        </div>
      </div>

      {/* ── Cards resumo ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Contas Claude Max"
          value="1 conta"
          sub="Claude Max 20×"
          icon={Code2}
          cor="#f97316"
        />
        <StatCard
          label="Custo por mês"
          value={`$${fmt(CUSTO_MENSAL)}`}
          sub="claude.com/pricing/max"
          icon={DollarSign}
          cor="#22c55e"
        />
        <StatCard
          label={`Custo total (${MESES} meses)`}
          value={`$${fmt(CUSTO_TOTAL)}`}
          sub={`${MESES} × $${CUSTO_MENSAL}`}
          icon={TrendingUp}
          cor="#f59e0b"
        />
        <StatCard
          label="Projeto beneficiado"
          value="APPA"
          sub="Easy e-Social · 100%"
          icon={Zap}
          cor="#22c55e"
        />
      </div>

      {/* ── Card da conta ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Code2 className="w-4 h-4 text-muted" />
          <h3 className="text-sm font-semibold">Detalhe da Conta</h3>
        </div>

        <div
          className="bg-card border border-card-border rounded-xl overflow-hidden"
          style={{ borderLeftColor: CONTA_CLAUDE.cor, borderLeftWidth: 3 }}
        >
          <div className="p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              {/* Avatar + info */}
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0"
                  style={{ background: CONTA_CLAUDE.corFundo, color: CONTA_CLAUDE.cor }}
                >
                  {CONTA_CLAUDE.iniciais}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{CONTA_CLAUDE.displayName}</span>
                    <a
                      href="https://claude.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-foreground transition-colors"
                      title="claude.ai"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <p className="text-sm text-muted">@{CONTA_CLAUDE.username}</p>
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-semibold mt-1 inline-block"
                    style={{ background: `${CONTA_CLAUDE.cor}20`, color: CONTA_CLAUDE.cor }}
                  >
                    {CONTA_CLAUDE.plano}
                  </span>
                </div>
              </div>

              {/* Custo destaque */}
              <div className="text-right">
                <p className="text-xs text-muted mb-0.5">Total investido</p>
                <p className="text-3xl font-black" style={{ color: CONTA_CLAUDE.cor }}>
                  ${fmt(CUSTO_TOTAL)}
                </p>
                <p className="text-xs text-muted mt-0.5">
                  ${fmt(CUSTO_MENSAL)}/mês × {MESES} meses
                </p>
              </div>
            </div>

            {/* Barra projeto */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted flex items-center gap-1.5">
                  <GitBranch className="w-3 h-3" />
                  Distribuição por projeto
                </span>
                <span className="text-xs font-semibold" style={{ color: "#22c55e" }}>
                  Easy e-Social (APPA) · 100%
                </span>
              </div>
              <div className="h-4 rounded-full overflow-hidden" style={{ background: "#ffffff08" }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: "100%", background: CONTA_CLAUDE.cor }}
                />
              </div>
            </div>

            {/* Grid de métricas */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-lg p-3 text-center" style={{ background: "#ffffff08" }}>
                <p className="text-xs text-muted">Plano</p>
                <p className="text-xs font-bold mt-0.5" style={{ color: CONTA_CLAUDE.cor }}>
                  Max 20×
                </p>
              </div>
              <div className="rounded-lg p-3 text-center" style={{ background: "#ffffff08" }}>
                <p className="text-xs text-muted">Mensalidade</p>
                <p className="text-xs font-bold mt-0.5 text-success">
                  ${fmt(CUSTO_MENSAL)}/mês
                </p>
              </div>
              <div className="rounded-lg p-3 text-center" style={{ background: "#ffffff08" }}>
                <p className="text-xs text-muted">Projeto</p>
                <p className="text-xs font-bold mt-0.5">APPA</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Rodapé ── */}
      <div className="border-t border-card-border pt-4 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-xs text-muted">
          Fonte:{" "}
          <a
            href="https://claude.com/pricing/max"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            claude.com/pricing/max
          </a>
          {" "}· Claude Max 20× — <strong>$200/mês</strong> por usuário.
        </p>
        <p className="text-xs tabular-nums flex items-center gap-3">
          <span className="text-muted">{MESES} meses · 1 conta:</span>
          <span className="font-bold text-sm" style={{ color: "#f97316" }}>
            ${fmt(CUSTO_TOTAL)}
          </span>
          <span className="text-muted">→</span>
          <span className="font-semibold text-success">Easy e-Social (APPA)</span>
        </p>
      </div>
    </div>
  );
}

// Exporta constantes para uso no relatório consolidado
export const CLAUDE_CUSTO_TOTAL = CUSTO_TOTAL;
export const CLAUDE_CUSTO_MENSAL = CUSTO_MENSAL;
export const CLAUDE_MESES = MESES;
