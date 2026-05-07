"use client";

import { Zap, Code2, Users, Building2, CheckCircle, TrendingUp, Globe, Shield, DollarSign, Cpu, GitBranch } from "lucide-react";

// ── Dados ─────────────────────────────────────────────────────────────────

const FUNDADOR = {
  nome: "Alessandro Alexandre Chiarele Filho",
  apelido: "Xandão",
  papel: "Fundador · Advogado Trabalhista & Product Engineer",
  descricao: "Reúne em uma única pessoa o domínio jurídico completo (direito previdenciário e trabalhista, eSocial, conformidade fiscal) e a capacidade técnica de construir os produtos do zero. Identificou as dores do mercado como advogado praticante no escritório Moraes de Carvalho e desenvolveu as soluções ele mesmo — sem terceirizar o conhecimento do negócio.",
  cor: "#3b82f6",
  iniciais: "AC",
  tagsJuridico: ["Direito Trabalhista", "Direito Previdenciário", "eSocial", "Conformidade Fiscal", "Domain Expert"],
  tagsTecnico: ["React · TypeScript · Next.js", "Python · FastAPI", "SOAP/XML · Certificado A1", "Product Engineering"],
};

const PRODUTOS = [
  {
    id: "realprev",
    nome: "RealPrev",
    subtitulo: "Automação de Processos Trabalhistas no eSocial",
    descricao: "Sistema que automatiza o envio de eventos trabalhistas ao governo federal (eSocial S-2500, S-2501, S-2555) com geração de XML, assinatura digital A1 e transmissão SOAP. Elimina trabalho manual de advogados e escritórios.",
    stack: "Python (FastAPI) · React · SOAP/XML · Certificado Digital A1",
    status: "Produção",
    cor: "#f97316",
    impacto: "Redução de 80%+ no tempo de envio de eventos trabalhistas",
    mercado: "Escritórios de advocacia, RH corporativo, consultorias previdenciárias",
    eventos: ["S-2500 — Processo Trabalhista", "S-2501 — Contribuições Previdenciárias", "S-2555 — Benefícios e Atos Judiciais"],
  },
  {
    id: "appa",
    nome: "Easy e-Social",
    subtitulo: "Plataforma de Folha, Conformidade e eSocial em Lote",
    descricao: "Produto principal e mais maduro do portfólio. Evoluiu para quase um software de folha de pagamento completo: ajuda empresas e escritórios a fechar o Imposto de Renda com trilha de auditoria completa, corrigir inconsistências e enviar eventos do eSocial em grandes lotes com um clique. Tudo rastreável, com histórico de versões e relatórios prontos para fiscalização.",
    stack: "React · TypeScript · Next.js · Python · FastAPI",
    status: "Em desenvolvimento ativo",
    cor: "#3b82f6",
    impacto: "Fechamento de IR + lotes de eSocial + auditoria — em minutos, não dias",
    mercado: "Escritórios de contabilidade, RH corporativo, consultorias previdenciárias, BPOs",
    eventos: ["Envio de eventos eSocial em grandes lotes", "Correção em massa de inconsistências", "Fechamento do IR com auditoria completa", "Trilha de auditoria rastreável por evento"],
  },
];

const SIMIILITUDES = [
  {
    unidadeStefanini: "Technology",
    descricaoUnidade: "Desenvolvimento de sistemas, modernização de aplicações, automação",
    produto: "RealPrev + Easy e-Social",
    encaixe: "Os dois produtos são soluções de software prontas para integração como módulos no portfólio de aplicações da Stefanini para clientes corporativos. O Easy e-Social já opera próximo a um software de folha completo, com envio em lote e auditoria de IR.",
    score: 92,
    cor: "#3b82f6",
  },
  {
    unidadeStefanini: "Operations / BPO",
    descricaoUnidade: "Service desk, outsourcing e operação de processos de negócio",
    produto: "RealPrev",
    encaixe: "A Stefanini opera processos de conformidade para grandes clientes. RealPrev automatiza a camada mais trabalhosa dessas operações, reduzindo custo operacional de BPOs que hoje fazem eSocial manualmente.",
    score: 88,
    cor: "#22c55e",
  },
  {
    unidadeStefanini: "Financial Technology (Topaz)",
    descricaoUnidade: "Soluções para bancos, pagamentos, mercado financeiro",
    produto: "Easy e-Social + RealPrev",
    encaixe: "Bancos e financeiras têm folha de pagamento complexa e alto risco de autuação previdenciária. O Easy e-Social pode ser integrado na stack da Topaz como camada de compliance trabalhista com fechamento de IR e auditoria completa.",
    score: 75,
    cor: "#f97316",
  },
  {
    unidadeStefanini: "Manufacturing & Supply Chain",
    descricaoUnidade: "Indústria 4.0, automação industrial, cadeia produtiva",
    produto: "APPA",
    encaixe: "Indústrias com grande contingente de funcionários têm obrigações eSocial volumosas. APPA pode ser embarcado como módulo de compliance no stack industrial da Stefanini.",
    score: 68,
    cor: "#eab308",
  },
];

const MODELOS_PARCERIA = [
  {
    modelo: "White-label / OEM",
    descricao: "Stefanini integra RealPrev e APPA como módulos proprietários em seu portfólio de soluções para clientes enterprise. Moraes de Carvalho provê suporte técnico e especialidade jurídica.",
    viabilidade: "Alta",
    prazo: "3–6 meses",
    cor: "#22c55e",
  },
  {
    modelo: "Go-to-Market Conjunto",
    descricao: "Co-venda das soluções aos clientes existentes da Stefanini (bancos, indústria, telecom). Moraes de Carvalho entra como fornecedor especializado de compliance trabalhista.",
    viabilidade: "Alta",
    prazo: "2–4 meses",
    cor: "#3b82f6",
  },
  {
    modelo: "Aquisição / Investimento",
    descricao: "Dentro do plano de M&A de R$ 2 bilhões da Stefanini até 2027, RealPrev e APPA representam ativos maduros de compliance tech com domínio jurídico incorporado — difícil de replicar internamente.",
    viabilidade: "Média",
    prazo: "6–12 meses",
    cor: "#f97316",
  },
];

// ── Componentes ────────────────────────────────────────────────────────────

function ScoreBar({ score, cor }: { score: number; cor: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${score}%`, backgroundColor: cor }}
        />
      </div>
      <span className="text-sm font-bold w-10 text-right" style={{ color: cor }}>
        {score}%
      </span>
    </div>
  );
}

function Tag({ label, cor }: { label: string; cor?: string }) {
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-md font-medium"
      style={{
        backgroundColor: `${cor ?? "#3b82f6"}18`,
        color: cor ?? "#3b82f6",
        border: `1px solid ${cor ?? "#3b82f6"}30`,
      }}
    >
      {label}
    </span>
  );
}

// ── Relatório principal ────────────────────────────────────────────────────

export function RelatorioCompatibilidade() {
  return (
    <div className="space-y-10 pb-12">

      {/* ── Header ── */}
      <div className="bg-card border border-card-border rounded-xl p-6 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3">
              <Zap className="w-3 h-3" />
              Análise de Compatibilidade — Documento Estratégico
            </div>
            <h2 className="text-2xl font-bold">Moraes de Carvalho × Stefanini Group</h2>
            <p className="text-muted text-sm mt-1">
              Mapeamento de sinergia entre os produtos de compliance trabalhista desenvolvidos pelo escritório
              e as unidades de negócio da Stefanini IT Solutions.
            </p>
          </div>
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #1e40af, #7c3aed)" }}
          >
            ST
          </div>
        </div>

        {/* Stats rápidos */}
        <div className="grid grid-cols-4 gap-3 mt-2">
          {[
            { label: "Produtos",          value: "2",       sub: "RealPrev · Easy e-Social",        cor: "#3b82f6" },
            { label: "Unidades alinhadas", value: "4",       sub: "de 7 unidades Stefanini",   cor: "#22c55e" },
            { label: "Score médio",        value: "81%",     sub: "compatibilidade",            cor: "#f97316" },
            { label: "Mercado potencial",  value: "R$ 8bi",  sub: "receita Stefanini 2024",     cor: "#a855f7" },
          ].map((s, i) => (
            <div key={i} className="bg-background rounded-lg p-4 border border-card-border">
              <p className="text-xs text-muted uppercase tracking-wider mb-1">{s.label}</p>
              <p className="text-xl font-bold" style={{ color: s.cor }}>{s.value}</p>
              <p className="text-xs text-muted mt-1">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Fundador ── */}
      <div>
        <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-accent" />
          Quem Somos
        </h3>

        {/* Card do fundador — ocupa largura total */}
        <div className="bg-card border border-card-border rounded-xl p-6 mb-3">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
              style={{ background: FUNDADOR.cor }}
            >
              {FUNDADOR.iniciais}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <p className="font-bold text-base">{FUNDADOR.nome}</p>
                <span className="text-xs text-muted">({FUNDADOR.apelido})</span>
              </div>
              <p className="text-sm text-muted mb-3">{FUNDADOR.papel}</p>
              <p className="text-sm text-muted leading-relaxed mb-4">{FUNDADOR.descricao}</p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider mb-2">Domínio jurídico</p>
                  <div className="flex flex-wrap gap-1.5">
                    {FUNDADOR.tagsJuridico.map((t) => (
                      <Tag key={t} label={t} cor="#f97316" />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider mb-2">Stack técnico</p>
                  <div className="flex flex-wrap gap-1.5">
                    {FUNDADOR.tagsTecnico.map((t) => (
                      <Tag key={t} label={t} cor="#3b82f6" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-card border border-card-border rounded-xl flex items-center gap-3">
          <Building2 className="w-5 h-5 text-muted flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Moraes de Carvalho Advogados Associados</p>
            <p className="text-xs text-muted">
              Escritório de advocacia especializado em direito trabalhista e previdenciário — contexto em que os produtos
              foram concebidos, validados e colocados em produção com clientes reais.
            </p>
          </div>
        </div>
      </div>

      {/* ── Produtos ── */}
      <div>
        <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-accent" />
          Produtos
        </h3>
        <div className="space-y-4">
          {PRODUTOS.map((p, i) => (
            <div key={i} className="bg-card border border-card-border rounded-xl overflow-hidden">
              <div
                className="h-1"
                style={{ background: p.cor }}
              />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-base">{p.nome}</h4>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: p.status === "Produção" ? "#14532d" : "#1e3a5f",
                          color: p.status === "Produção" ? "#22c55e" : "#60a5fa",
                        }}
                      >
                        {p.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted">{p.subtitulo}</p>
                  </div>
                </div>

                <p className="text-sm text-muted leading-relaxed mb-4">{p.descricao}</p>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-white/[0.03] rounded-lg p-3">
                    <p className="text-xs text-muted mb-1">Stack</p>
                    <p className="text-xs font-medium">{p.stack}</p>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-3">
                    <p className="text-xs text-muted mb-1">Impacto</p>
                    <p className="text-xs font-medium" style={{ color: p.cor }}>{p.impacto}</p>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-3">
                    <p className="text-xs text-muted mb-1">Mercado-alvo</p>
                    <p className="text-xs font-medium">{p.mercado}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted mb-2">Funcionalidades principais</p>
                  <div className="flex flex-wrap gap-2">
                    {p.eventos.map((e) => (
                      <div key={e} className="flex items-center gap-1.5 text-xs bg-white/[0.03] px-3 py-1.5 rounded-lg border border-card-border">
                        <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: p.cor }} />
                        {e}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sinergia por unidade ── */}
      <div>
        <h3 className="text-base font-semibold mb-1 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-accent" />
          Análise de Sinergia por Unidade Stefanini
        </h3>
        <p className="text-xs text-muted mb-4">
          A Stefanini opera 7 unidades de negócio. As 4 abaixo apresentam encaixe direto com os produtos.
        </p>
        <div className="space-y-3">
          {SIMIILITUDES.map((s, i) => (
            <div key={i} className="bg-card border border-card-border rounded-xl p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-sm">{s.unidadeStefanini}</p>
                    <Tag label={s.produto} cor={s.cor} />
                  </div>
                  <p className="text-xs text-muted">{s.descricaoUnidade}</p>
                </div>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-3">{s.encaixe}</p>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted w-24 flex-shrink-0">Compatibilidade</span>
                <ScoreBar score={s.score} cor={s.cor} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Modelos de parceria ── */}
      <div>
        <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-4 h-4 text-accent" />
          Modelos de Parceria Propostos
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {MODELOS_PARCERIA.map((m, i) => (
            <div key={i} className="bg-card border border-card-border rounded-xl p-5 flex flex-col gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${m.cor}18`, border: `1px solid ${m.cor}30` }}
              >
                <DollarSign className="w-4 h-4" style={{ color: m.cor }} />
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">{m.modelo}</p>
                <p className="text-xs text-muted leading-relaxed">{m.descricao}</p>
              </div>
              <div className="mt-auto flex items-center justify-between text-xs pt-3 border-t border-card-border">
                <span className="text-muted">{m.prazo}</span>
                <span
                  className="font-medium px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${m.cor}15`,
                    color: m.cor,
                  }}
                >
                  {m.viabilidade}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Por que faz sentido — caixa de conclusão ── */}
      <div
        className="rounded-xl p-6 border"
        style={{ background: "linear-gradient(135deg, #0f1f3a, #1a1a2e)", borderColor: "#3b82f620" }}
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
            <Cpu className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h4 className="font-bold text-base mb-2">Por que faz sentido para a Stefanini</h4>
            <p className="text-sm text-muted leading-relaxed mb-4">
              A Stefanini atende mais de 500 grandes clientes em bancos, indústria, telecom e governo — todos obrigados
              a cumprir o eSocial. Os produtos RealPrev e APPA resolvem um problema real, com domínio jurídico
              incorporado na especificação (raro de replicar internamente), já em produção, desenvolvidos por uma equipe
              que entende o negócio de dentro. O resultado prático: a Stefanini poderia oferecer aos seus clientes
              uma solução de compliance trabalhista completa sem precisar montar essa especialidade do zero.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Shield, label: "Domínio jurídico incorporado", sub: "Alessandro Chiarele — especialista em direito previdenciário" },
                { icon: Code2, label: "Stack moderno e escalável", sub: "React, Python, SOAP/XML, certificado A1 — integra com qualquer stack" },
                { icon: GitBranch, label: "Já validado em produção", sub: "RealPrev em uso real por escritório de advocacia com clientes ativos" },
                { icon: TrendingUp, label: "Alinhado com o M&A da Stefanini", sub: "R$ 2 bilhões em aquisições até 2027 — foco em tech especializada" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <Icon className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted">{item.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <div className="flex items-center justify-between text-xs text-muted pt-4 border-t border-card-border">
        <span>Moraes de Carvalho Advogados Associados — uso estratégico interno</span>
        <span>Ref. Stefanini: stefanini.com/pt-br · Reuters Apr/2025 · Brazil Journal 2025</span>
      </div>
    </div>
  );
}
