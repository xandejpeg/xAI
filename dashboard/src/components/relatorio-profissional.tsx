"use client";

import { useState } from "react";
import { ChevronRight, Building2, FileText, DollarSign, GitBranch, Bot, TrendingUp, Zap } from "lucide-react";
import { RelatorioGithub } from "./relatorio-github";
import { RelatorioClaude } from "./relatorio-claude";
import { BotaoPDF } from "./relatorio-pdf";
import { RelatorioCompatibilidade } from "./relatorio-compatibilidade";

type Level = "empresas" | "empresa" | "tipo-relatorio" | "tipo-custo" | "custo-detalhe" | "compatibilidade";
type SubTab = "github" | "claude" | "custo-final";

interface NavState {
  empresaId: string | null;
  relatorioId: string | null;
  custoId: string | null;
  subTab: SubTab;
}

const EMPRESAS = [
  {
    id: "appa",
    nome: "Easy e-Social (APPA)",
    descricao: "Automação de obrigações trabalhistas e previdenciárias",
    cor: "#3b82f6",
    iniciais: "AP",
  },
  {
    id: "stefanini",
    nome: "Stefanini Group",
    descricao: "Consultoria global de tecnologia · 41 países · R$ 8bi receita · AI First",
    cor: "#7c3aed",
    iniciais: "ST",
  },
] as const;

const RELATORIOS: Record<string, Array<{ id: string; nome: string; descricao: string; icone?: string }>> = {
  appa: [
    {
      id: "custo",
      nome: "Relatório de Custo APPA",
      descricao: "Análise de custos operacionais e de desenvolvimento",
    },
  ],
  stefanini: [
    {
      id: "compatibilidade",
      nome: "Relatório de Compatibilidade",
      descricao: "Análise de sinergia entre Moraes de Carvalho + produtos e as unidades da Stefanini",
      icone: "zap",
    },
  ],
};

// Câmbio USD/BRL — ask price — AwesomeAPI
const CAMBIO = {
  abr: { data: "01/04/2026", taxa: 5.1564 },
  mai: { data: "01/05/2026", taxa: 4.9943 },
};

const ITENS_CUSTO = [
  { ferramenta: "GitHub Copilot", detalhe: "6 contas × $39", usd: 234 },
  { ferramenta: "Claude Max 20×", detalhe: "1 conta × $200", usd: 200 },
];

function fmt(value: number): string {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function CustoFinal() {
  const totalUsdAbr = ITENS_CUSTO.reduce((s, i) => s + i.usd, 0);
  const totalUsdMai = totalUsdAbr;
  const totalUsd = totalUsdAbr + totalUsdMai;
  const totalBrlAbr = totalUsdAbr * CAMBIO.abr.taxa;
  const totalBrlMai = totalUsdMai * CAMBIO.mai.taxa;
  const totalBrl = totalBrlAbr + totalBrlMai;

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-card-border rounded-xl p-4">
          <p className="text-xs text-muted uppercase tracking-wider mb-1">Total USD</p>
          <p className="text-2xl font-bold">${fmt(totalUsd)}</p>
          <p className="text-xs text-muted mt-1">2 meses · 2 ferramentas</p>
        </div>
        <div className="bg-card border border-card-border rounded-xl p-4">
          <p className="text-xs text-muted uppercase tracking-wider mb-1">Total BRL</p>
          <p className="text-2xl font-bold text-emerald-400">R$ {fmt(totalBrl)}</p>
          <p className="text-xs text-muted mt-1">câmbio variável por mês</p>
        </div>
        <div className="bg-card border border-card-border rounded-xl p-4">
          <p className="text-xs text-muted uppercase tracking-wider mb-1">Projeto</p>
          <p className="text-lg font-bold text-accent">Easy e-Social</p>
          <p className="text-xs text-muted mt-1">100% APPA</p>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-card border border-card-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-card-border">
          <h3 className="font-semibold text-sm">Detalhamento por Ferramenta e Mês</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left px-4 py-3 text-muted font-medium">Ferramenta</th>
                <th className="text-right px-4 py-3 text-muted font-medium">Abr/2026 (USD)</th>
                <th className="text-right px-4 py-3 text-muted font-medium">Abr/2026 (BRL)</th>
                <th className="text-right px-4 py-3 text-muted font-medium">Mai/2026 (USD)</th>
                <th className="text-right px-4 py-3 text-muted font-medium">Mai/2026 (BRL)</th>
                <th className="text-right px-4 py-3 text-muted font-medium">Total USD</th>
                <th className="text-right px-4 py-3 text-muted font-medium">Total BRL</th>
              </tr>
            </thead>
            <tbody>
              {ITENS_CUSTO.map((item, i) => {
                const brlAbr = item.usd * CAMBIO.abr.taxa;
                const brlMai = item.usd * CAMBIO.mai.taxa;
                return (
                  <tr key={i} className="border-b border-card-border/50 hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <p className="font-medium">{item.ferramenta}</p>
                      <p className="text-xs text-muted">{item.detalhe}</p>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">${fmt(item.usd)}</td>
                    <td className="px-4 py-3 text-right font-mono text-emerald-400">R$ {fmt(brlAbr)}</td>
                    <td className="px-4 py-3 text-right font-mono">${fmt(item.usd)}</td>
                    <td className="px-4 py-3 text-right font-mono text-emerald-400">R$ {fmt(brlMai)}</td>
                    <td className="px-4 py-3 text-right font-mono font-semibold">${fmt(item.usd * 2)}</td>
                    <td className="px-4 py-3 text-right font-mono font-semibold text-emerald-400">R$ {fmt(brlAbr + brlMai)}</td>
                  </tr>
                );
              })}
              {/* Total row */}
              <tr className="bg-white/[0.03] font-bold">
                <td className="px-4 py-3">Total Geral</td>
                <td className="px-4 py-3 text-right font-mono">${fmt(totalUsdAbr)}</td>
                <td className="px-4 py-3 text-right font-mono text-emerald-400">R$ {fmt(totalBrlAbr)}</td>
                <td className="px-4 py-3 text-right font-mono">${fmt(totalUsdMai)}</td>
                <td className="px-4 py-3 text-right font-mono text-emerald-400">R$ {fmt(totalBrlMai)}</td>
                <td className="px-4 py-3 text-right font-mono text-accent">${fmt(totalUsd)}</td>
                <td className="px-4 py-3 text-right font-mono text-accent">R$ {fmt(totalBrl)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Rodapé câmbio */}
      <div className="flex flex-col gap-1 text-xs text-muted border-t border-card-border pt-4">
        <p>Câmbio Abr/2026: R$ {CAMBIO.abr.taxa.toFixed(4)}/USD — referência {CAMBIO.abr.data}</p>
        <p>Câmbio Mai/2026: R$ {CAMBIO.mai.taxa.toFixed(4)}/USD — referência {CAMBIO.mai.data}</p>
        <p className="mt-1">Fonte: economia.awesomeapi.com.br · Taxa de venda (ask) do dia de referência de cada mês.</p>
      </div>
    </div>
  );
}

const TIPOS_CUSTO: Array<{ id: string; nome: string; descricao: string }> = [
  {
    id: "desenvolvimento",
    nome: "Custo Desenvolvimento",
    descricao: "Ferramentas de IA, licenças e assistentes de programação",
  },
];

function Breadcrumb({
  crumbs,
}: {
  crumbs: Array<{ label: string; onClick?: () => void }>;
}) {
  return (
    <nav className="flex items-center gap-1 text-sm text-muted mb-6">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3 h-3 flex-shrink-0" />}
          {crumb.onClick ? (
            <button
              onClick={crumb.onClick}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              {crumb.label}
            </button>
          ) : (
            <span className="text-foreground font-medium">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function RelatorioProfissional() {
  const [level, setLevel] = useState<Level>("empresas");
  const [nav, setNav] = useState<NavState>({
    empresaId: null,
    relatorioId: null,
    custoId: null,
    subTab: "github",
  });

  const empresa = EMPRESAS.find((e) => e.id === nav.empresaId) ?? null;
  const relatorio = nav.empresaId && nav.relatorioId
    ? RELATORIOS[nav.empresaId]?.find((r) => r.id === nav.relatorioId) ?? null
    : null;
  const custo = nav.custoId
    ? TIPOS_CUSTO.find((c) => c.id === nav.custoId) ?? null
    : null;

  function goEmpresa(id: string) {
    setNav({ empresaId: id, relatorioId: null, custoId: null, subTab: "github" });
    setLevel("empresa");
  }

  function goRelatorio(id: string) {
    setNav((n) => ({ ...n, relatorioId: id, custoId: null }));
    if (id === "compatibilidade") {
      setLevel("compatibilidade");
    } else {
      setLevel("tipo-custo");
    }
  }

  function goCusto(id: string) {
    setNav((n) => ({ ...n, custoId: id }));
    setLevel("custo-detalhe");
  }

  function setSubTab(tab: SubTab) {
    setNav((n) => ({ ...n, subTab: tab }));
  }

  function resetTo(l: Level) {
    if (l === "empresas") {
      setNav({ empresaId: null, relatorioId: null, custoId: null, subTab: "github" });
    } else if (l === "empresa") {
      setNav((n) => ({ ...n, relatorioId: null, custoId: null }));
    } else if (l === "tipo-custo") {
      setNav((n) => ({ ...n, custoId: null }));
    }
    setLevel(l);
  }

  // Build breadcrumbs
  const crumbs: Array<{ label: string; onClick?: () => void }> = [
    {
      label: "Empresas",
      onClick: level !== "empresas" ? () => resetTo("empresas") : undefined,
    },
  ];
  if (empresa && level !== "empresas") {
    crumbs.push({
      label: empresa.nome,
      onClick: level !== "empresa" ? () => resetTo("empresa") : undefined,
    });
  }
  if (relatorio && (level === "tipo-custo" || level === "custo-detalhe")) {
    crumbs.push({
      label: relatorio.nome,
      onClick: level === "custo-detalhe" ? () => resetTo("tipo-custo") : undefined,
    });
  }
  if (custo && level === "custo-detalhe") {
    crumbs.push({ label: custo.nome });
  }
  if (relatorio && level === "compatibilidade") {
    crumbs.push({ label: relatorio.nome });
  }

  return (
    <div>
      {/* Breadcrumb — always visible except on root */}
      {level !== "empresas" && <Breadcrumb crumbs={crumbs} />}

      {/* ── Level 0: Lista de empresas ── */}
      {level === "empresas" && (
        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold">Relatório Profissional</h2>
            <p className="text-sm text-muted mt-1">
              Selecione uma empresa para visualizar os relatórios
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 max-w-2xl">
            {EMPRESAS.map((emp) => (
              <button
                key={emp.id}
                onClick={() => goEmpresa(emp.id)}
                className="flex items-center gap-4 p-5 rounded-xl bg-card border border-card-border hover:border-accent/50 transition-all text-left cursor-pointer group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                  style={{ background: emp.cor }}
                >
                  {emp.iniciais}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{emp.nome}</p>
                  <p className="text-sm text-muted mt-0.5">{emp.descricao}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted group-hover:text-accent transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Level 1: Relatórios da empresa ── */}
      {level === "empresa" && nav.empresaId && (
        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold">{empresa?.nome}</h2>
            <p className="text-sm text-muted mt-1">Selecione o tipo de relatório</p>
          </div>
          <div className="grid grid-cols-1 gap-3 max-w-2xl">
            {RELATORIOS[nav.empresaId]?.map((rel) => (
              <button
                key={rel.id}
                onClick={() => goRelatorio(rel.id)}
                className="flex items-center gap-4 p-5 rounded-xl bg-card border border-card-border hover:border-accent/50 transition-all text-left cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-accent/10 flex-shrink-0">
                  {rel.icone === "zap" ? <Zap className="w-6 h-6 text-accent" /> : <FileText className="w-6 h-6 text-accent" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{rel.nome}</p>
                  <p className="text-sm text-muted mt-0.5">{rel.descricao}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted group-hover:text-accent transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Level 2: Tipos de custo ── */}
      {level === "tipo-custo" && (
        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold">{relatorio?.nome}</h2>
            <p className="text-sm text-muted mt-1">Selecione o tipo de custo</p>
          </div>
          <div className="grid grid-cols-1 gap-3 max-w-2xl">
            {TIPOS_CUSTO.map((tipo) => (
              <button
                key={tipo.id}
                onClick={() => goCusto(tipo.id)}
                className="flex items-center gap-4 p-5 rounded-xl bg-card border border-card-border hover:border-accent/50 transition-all text-left cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-500/10 flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{tipo.nome}</p>
                  <p className="text-sm text-muted mt-0.5">{tipo.descricao}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted group-hover:text-accent transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Level 3: Detalhe do custo — abas horizontais ── */}
      {level === "custo-detalhe" && (
        <div>
          {/* Tabs horizontais + botão PDF */}
          <div className="flex items-center border-b border-card-border mb-6">
            <button
              onClick={() => setSubTab("github")}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer ${
                nav.subTab === "github"
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              <GitBranch className="w-4 h-4" />
              GitHub Copilot
            </button>
            <button
              onClick={() => setSubTab("claude")}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer ${
                nav.subTab === "claude"
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              <Bot className="w-4 h-4" />
              Claude Code
            </button>
            <button
              onClick={() => setSubTab("custo-final")}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer ${
                nav.subTab === "custo-final"
                  ? "border-emerald-400 text-emerald-400"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Custo Final
            </button>
            <div className="ml-auto pb-1">
              <BotaoPDF />
            </div>
          </div>

          {nav.subTab === "github" && <RelatorioGithub />}
          {nav.subTab === "claude" && <RelatorioClaude />}
          {nav.subTab === "custo-final" && <CustoFinal />}
        </div>
      )}

      {/* ── Compatibilidade Stefanini ── */}
      {level === "compatibilidade" && <RelatorioCompatibilidade />}
    </div>
  );
}
