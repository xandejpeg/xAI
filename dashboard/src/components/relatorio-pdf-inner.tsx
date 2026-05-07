"use client";

import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Svg, Rect, G } from "@react-pdf/renderer";
import { FileDown } from "lucide-react";

// ── Data ────────────────────────────────────────────────────────────────────

const CONTAS_GITHUB = [
  { username: "xandejpeg",             displayName: "Xande JPEG",            pctAppa: 100, requests: 3700, custoMensal: 39 },
  { username: "iago1409",              displayName: "Iago 1409",              pctAppa: 99,  requests: 2840, custoMensal: 39 },
  { username: "AlessandroChiareledev", displayName: "Alessandro Chiarele",   pctAppa: 99,  requests: 1960, custoMensal: 39 },
  { username: "sickoBAT",              displayName: "Sicko BAT",              pctAppa: 99,  requests: 1520, custoMensal: 39 },
  { username: "xandedev1",             displayName: "Xande Dev 1",            pctAppa: 99,  requests: 1280, custoMensal: 39 },
  { username: "xandedev2",             displayName: "Xande Dev 2",            pctAppa: 98,  requests: 1040, custoMensal: 39 },
];

const CAMBIO = {
  abr: { data: "01/04/2026", taxa: 5.1564 },
  mai: { data: "01/05/2026", taxa: 4.9943 },
};

const MESES = 2;
const GITHUB_CUSTO_MENSAL = 39;
const GITHUB_CONTAS = 6;
const GITHUB_TOTAL = GITHUB_CUSTO_MENSAL * GITHUB_CONTAS * MESES; // 468
const CLAUDE_MENSAL = 200;
const CLAUDE_TOTAL = 400;
const TOTAL_USD = GITHUB_TOTAL + CLAUDE_TOTAL; // 868

const TOTAL_BRL_ABR = (GITHUB_CONTAS * GITHUB_CUSTO_MENSAL + CLAUDE_MENSAL) * CAMBIO.abr.taxa;
const TOTAL_BRL_MAI = (GITHUB_CONTAS * GITHUB_CUSTO_MENSAL + CLAUDE_MENSAL) * CAMBIO.mai.taxa;
const TOTAL_BRL = TOTAL_BRL_ABR + TOTAL_BRL_MAI;

function brl(v: number) {
  return `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
function usd(v: number) {
  return `$${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
function today() {
  return new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

// ── Styles ────────────────────────────────────────────────────────────────

const C = {
  bg:       "#0d0d0d",
  card:     "#161616",
  border:   "#252525",
  accent:   "#3b82f6",
  green:    "#22c55e",
  orange:   "#f97316",
  muted:    "#737373",
  white:    "#f5f5f5",
  white2:   "#e5e5e5",
  tableAlt: "#1c1c1c",
  coverTop: "#111827",
};

const s = StyleSheet.create({
  page: {
    backgroundColor: C.bg,
    paddingHorizontal: 40,
    paddingVertical: 40,
    fontFamily: "Helvetica",
    color: C.white,
  },

  // ── Cover ──
  coverPage: {
    backgroundColor: C.bg,
    paddingHorizontal: 0,
    paddingVertical: 0,
    fontFamily: "Helvetica",
    color: C.white,
    display: "flex",
    flexDirection: "column",
  },
  coverTop: {
    backgroundColor: C.coverTop,
    padding: 50,
    paddingBottom: 60,
  },
  coverBadge: {
    backgroundColor: "#1e3a5f",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start",
    marginBottom: 28,
  },
  coverBadgeText: {
    color: C.accent,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.2,
  },
  coverTitle: {
    fontSize: 30,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    lineHeight: 1.25,
    marginBottom: 12,
  },
  coverSubtitle: {
    fontSize: 16,
    color: C.accent,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
  },
  coverPeriod: {
    fontSize: 12,
    color: C.muted,
  },
  coverBody: {
    padding: 50,
    flex: 1,
  },
  coverMetaRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 24,
  },
  coverMetaCard: {
    flex: 1,
    backgroundColor: C.card,
    borderRadius: 10,
    padding: 18,
    borderWidth: 1,
    borderColor: C.border,
  },
  coverMetaLabel: {
    fontSize: 8,
    color: C.muted,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  coverMetaSymbol: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    marginRight: 3,
    lineHeight: 1,
    paddingTop: 4,
  },
  coverMetaNumber: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1,
  },
  coverMetaSub: {
    fontSize: 8,
    color: C.muted,
    marginTop: 6,
  },
  coverFooter: {
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  coverFooterText: {
    fontSize: 9,
    color: C.muted,
  },

  // ── Section page ──
  sectionHeader: {
    marginBottom: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: C.white,
  },
  sectionPage: {
    fontSize: 9,
    color: C.muted,
  },

  // ── Stat row ──
  statRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: C.card,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: C.border,
  },
  statLabel: {
    fontSize: 7,
    color: C.muted,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  statSymbol: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    marginRight: 2,
    paddingTop: 3,
    lineHeight: 1,
  },
  statNumber: {
    fontSize: 15,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1,
  },
  statSub: {
    fontSize: 7,
    color: C.muted,
    marginTop: 5,
  },

  // ── Badge ──
  badge: {
    backgroundColor: "#14532d",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  badgeText: {
    color: C.green,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },

  // ── Table ──
  table: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.border,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  tableHeaderCell: {
    fontSize: 8,
    color: C.muted,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    fontFamily: "Helvetica-Bold",
  },
  tableRow: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  tableRowAlt: {
    backgroundColor: C.tableAlt,
  },
  tableCell: {
    fontSize: 9,
    color: C.white2,
  },
  tableCellBold: {
    fontFamily: "Helvetica-Bold",
  },
  tableCellMuted: {
    color: C.muted,
    fontSize: 8,
  },
  tableTotalRow: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#1a2035",
    borderTopWidth: 1,
    borderTopColor: C.accent,
  },

  // ── Progress bar ──
  barTrack: {
    backgroundColor: "#252525",
    borderRadius: 3,
    height: 5,
    marginTop: 4,
  },
  barFill: {
    backgroundColor: C.accent,
    borderRadius: 3,
    height: 5,
  },

  // ── Final total box ──
  totalBox: {
    backgroundColor: "#0f1f3a",
    borderRadius: 10,
    padding: 24,
    borderWidth: 1,
    borderColor: C.accent,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 11,
    color: C.muted,
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    color: C.accent,
  },
  totalSub: {
    fontSize: 9,
    color: C.muted,
    marginTop: 4,
  },
  totalRight: {
    alignItems: "flex-end",
  },

  // ── Footer ──
  pageFooter: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: C.muted,
  },

  // ── Divider ──
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    marginVertical: 16,
  },

  subSectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    marginBottom: 12,
    marginTop: 4,
  },
});

// ── Money display: symbol small + number large, same baseline ─────────────

function MoneyValue({
  symbol,
  amount,
  color,
  symbolStyle,
  numberStyle,
}: {
  symbol: string;
  amount: string;
  color: string;
  symbolStyle?: object;
  numberStyle?: object;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
      <Text style={[{ fontSize: 10, fontFamily: "Helvetica-Bold", color, marginRight: 3, paddingBottom: 2 }, symbolStyle]}>
        {symbol}
      </Text>
      <Text style={[{ fontSize: 20, fontFamily: "Helvetica-Bold", color }, numberStyle]}>
        {amount}
      </Text>
    </View>
  );
}

// ── Bar component ──────────────────────────────────────────────────────────

function BarProgress({ pct, color = C.accent }: { pct: number; color?: string }) {
  return (
    <View style={s.barTrack}>
      <View style={[s.barFill, { width: `${pct}%` as any, backgroundColor: color }]} />
    </View>
  );
}

// ── Footer component ───────────────────────────────────────────────────────

function PageFooter({ page, total }: { page: number; total: number }) {
  return (
    <View style={s.pageFooter} fixed>
      <Text style={s.footerText}>Easy e-Social (APPA) · Relatório de Custo de Desenvolvimento</Text>
      <Text style={s.footerText}>Página {page} de {total}  ·  Gerado em {today()}</Text>
    </View>
  );
}

// ── Page 1: Cover ─────────────────────────────────────────────────────────

function CoverPage() {
  return (
    <Page size="A4" style={s.coverPage}>
      <View style={s.coverTop}>
        <View style={s.coverBadge}>
          <Text style={s.coverBadgeText}>RELATÓRIO CONFIDENCIAL</Text>
        </View>
        <Text style={s.coverTitle}>Relatório de Custo{"\n"}de Desenvolvimento</Text>
        <Text style={s.coverSubtitle}>Easy e-Social (APPA)</Text>
        <Text style={s.coverPeriod}>Período: Abril/2026 – Maio/2026</Text>
      </View>

      <View style={s.coverBody}>
        <View style={s.badge}>
          <Text style={s.badgeText}>100% dos créditos atribuídos a Easy e-Social (APPA)</Text>
        </View>

        <View style={s.coverMetaRow}>
          <View style={s.coverMetaCard}>
            <Text style={s.coverMetaLabel}>Total USD</Text>
            <MoneyValue symbol="USD $" amount="868,00" color={C.accent} />
            <Text style={s.coverMetaSub}>2 meses · 2 ferramentas</Text>
          </View>
          <View style={s.coverMetaCard}>
            <Text style={s.coverMetaLabel}>Total BRL</Text>
            <MoneyValue symbol="R$" amount="4.405,40" color={C.green} />
            <Text style={s.coverMetaSub}>câmbio variável por mês</Text>
          </View>
          <View style={s.coverMetaCard}>
            <Text style={s.coverMetaLabel}>Contas de IA</Text>
            <Text style={{ fontSize: 20, fontFamily: "Helvetica-Bold", color: C.white, marginTop: 2 }}>7</Text>
            <Text style={s.coverMetaSub}>6 GitHub Copilot · 1 Claude</Text>
          </View>
        </View>

        <View style={s.divider} />

        <View style={{ flexDirection: "row", gap: 8, marginTop: 4 }}>
          {[
            { label: "Ferramenta 1", value: "GitHub Copilot Pro", sub: "6 contas · $39/mês cada" },
            { label: "Ferramenta 2", value: "Claude Max 20×",          sub: "1 conta · $200/mês" },
          ].map((item, i) => (
            <View key={i} style={[s.coverMetaCard, { flex: 1 }]}>
              <Text style={s.coverMetaLabel}>{item.label}</Text>
              <Text style={{ fontSize: 12, fontFamily: "Helvetica-Bold", color: C.white, marginBottom: 4 }}>{item.value}</Text>
              <Text style={s.coverMetaSub}>{item.sub}</Text>
            </View>
          ))}
        </View>

        <View style={s.coverFooter}>
          <Text style={s.coverFooterText}>Gerado em {today()}</Text>
          <Text style={s.coverFooterText}>Uso exclusivo interno · Easy e-Social APPA</Text>
        </View>
      </View>
    </Page>
  );
}

// ── Page 2: GitHub Copilot ─────────────────────────────────────────────────

function GithubPage() {
  const cols = { conta: "33%", req: "15%", pct: "18%", mensal: "17%", total: "17%" };
  return (
    <Page size="A4" style={s.page}>
      <View style={s.sectionHeader}>
        <Text style={s.sectionTitle}>GitHub Copilot Pro</Text>
        <Text style={s.sectionPage}>Página 2 de 3</Text>
      </View>

      {/* Stats */}
      <View style={s.statRow}>
        {(
          [
            { label: "Contas ativas",   plain: "6",    sub: "período 2 meses",          color: C.white },
            { label: "Custo/conta/mês", sym: "USD $",  num: "39,00",  sub: "GitHub Copilot Pro",  color: C.accent },
            { label: "Total 2 meses",   sym: "USD $",  num: "468,00", sub: "6 contas × $39 × 2 meses", color: C.accent },
            { label: "Projeto",         plain: "APPA", sub: "100% Easy e-Social",       color: C.green },
          ] as Array<{ label: string; plain?: string; sym?: string; num?: string; sub: string; color: string }>
        ).map((c, i) => (
          <View key={i} style={s.statCard}>
            <Text style={s.statLabel}>{c.label}</Text>
            {c.plain !== undefined ? (
              <Text style={[s.statNumber, { color: c.color }]}>{c.plain}</Text>
            ) : (
              <MoneyValue symbol={c.sym!} amount={c.num!} color={c.color} numberStyle={{ fontSize: 15 }} symbolStyle={{ fontSize: 9 }} />
            )}
            <Text style={s.statSub}>{c.sub}</Text>
          </View>
        ))}
      </View>

      <View style={s.badge}>
        <Text style={s.badgeText}>100% dos tokens utilizados → Easy e-Social (APPA)</Text>
      </View>

      {/* Table */}
      <View style={s.table}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { width: cols.conta }]}>Conta</Text>
          <Text style={[s.tableHeaderCell, { width: cols.req, textAlign: "right" }]}>Requests</Text>
          <Text style={[s.tableHeaderCell, { width: cols.pct, textAlign: "right" }]}>% APPA</Text>
          <Text style={[s.tableHeaderCell, { width: cols.mensal, textAlign: "right" }]}>$/mês</Text>
          <Text style={[s.tableHeaderCell, { width: cols.total, textAlign: "right" }]}>Total 2m</Text>
        </View>
        {CONTAS_GITHUB.map((c, i) => (
          <View key={c.username} style={[s.tableRow, i % 2 === 1 ? s.tableRowAlt : {}]}>
            <View style={{ width: cols.conta }}>
              <Text style={[s.tableCell, s.tableCellBold]}>{c.displayName}</Text>
              <Text style={s.tableCellMuted}>@{c.username}</Text>
              <BarProgress pct={c.pctAppa} />
            </View>
            <Text style={[s.tableCell, { width: cols.req, textAlign: "right" }]}>
              {c.requests.toLocaleString("pt-BR")}
            </Text>
            <Text style={[s.tableCell, { width: cols.pct, textAlign: "right", color: C.green }]}>
              {c.pctAppa}%
            </Text>
            <Text style={[s.tableCell, { width: cols.mensal, textAlign: "right" }]}>
              {usd(c.custoMensal)}
            </Text>
            <Text style={[s.tableCell, s.tableCellBold, { width: cols.total, textAlign: "right" }]}>
              {usd(c.custoMensal * MESES)}
            </Text>
          </View>
        ))}
        <View style={s.tableTotalRow}>
          <Text style={[s.tableCell, s.tableCellBold, { width: cols.conta }]}>Total</Text>
          <Text style={[s.tableCell, s.tableCellBold, { width: cols.req, textAlign: "right" }]}>
            {CONTAS_GITHUB.reduce((a, c) => a + c.requests, 0).toLocaleString("pt-BR")}
          </Text>
          <Text style={[s.tableCell, { width: cols.pct }]} />
          <Text style={[s.tableCell, s.tableCellBold, { width: cols.mensal, textAlign: "right" }]}>
            {usd(GITHUB_CONTAS * GITHUB_CUSTO_MENSAL)}
          </Text>
          <Text style={[s.tableCell, s.tableCellBold, { width: cols.total, textAlign: "right", color: C.accent }]}>
            {usd(GITHUB_TOTAL)}
          </Text>
        </View>
      </View>

      <PageFooter page={2} total={3} />
    </Page>
  );
}

// ── Page 3: Claude + Custo Final ──────────────────────────────────────────

function CustoFinalPage() {
  const ITENS = [
    { ferramenta: "GitHub Copilot Pro", detalhe: "6 contas × $39", usd: GITHUB_CONTAS * GITHUB_CUSTO_MENSAL },
    { ferramenta: "Claude Max 20×",          detalhe: "1 conta × $200", usd: CLAUDE_MENSAL },
  ];

  const colsC = { ferr: "24%", usdA: "13%", brlA: "15%", usdM: "13%", brlM: "15%", tusd: "10%", tbrl: "10%" };

  return (
    <Page size="A4" style={s.page}>
      <View style={s.sectionHeader}>
        <Text style={s.sectionTitle}>Claude Code + Custo Final</Text>
        <Text style={s.sectionPage}>Página 3 de 3</Text>
      </View>

      {/* Claude section */}
      <Text style={s.subSectionTitle}>Claude Max 20×</Text>
      <View style={s.statRow}>
        {(
          [
            { label: "Conta",         plain: "@xandejpeg", sub: "Xande JPEG",    color: C.orange },
            { label: "Plano",         plain: "Max 20×",    sub: "Claude Max 20x", color: C.white },
            { label: "Custo/mês",     sym: "USD $", num: "200,00", sub: "por usuário", color: C.orange },
            { label: "Total 2 meses", sym: "USD $", num: "400,00", sub: "100% → APPA", color: C.orange },
          ] as Array<{ label: string; plain?: string; sym?: string; num?: string; sub: string; color: string }>
        ).map((c, i) => (
          <View key={i} style={s.statCard}>
            <Text style={s.statLabel}>{c.label}</Text>
            {c.plain !== undefined ? (
              <Text style={[s.statNumber, { color: c.color, fontSize: 13 }]}>{c.plain}</Text>
            ) : (
              <MoneyValue symbol={c.sym!} amount={c.num!} color={c.color} numberStyle={{ fontSize: 15 }} symbolStyle={{ fontSize: 9 }} />
            )}
            <Text style={s.statSub}>{c.sub}</Text>
          </View>
        ))}
      </View>

      <View style={s.divider} />

      {/* Custo Final table */}
      <Text style={[s.subSectionTitle, { marginBottom: 8 }]}>Custo Final — Detalhamento por Mês em BRL</Text>

      <View style={{ marginBottom: 6, flexDirection: "row", gap: 8 }}>
        <Text style={[s.footerText, { color: C.muted }]}>
          Câmbio Abr/2026: R$ {CAMBIO.abr.taxa.toFixed(4)}/USD (ref. {CAMBIO.abr.data})
        </Text>
        <Text style={[s.footerText, { color: C.muted }]}>  ·  </Text>
        <Text style={[s.footerText, { color: C.muted }]}>
          Câmbio Mai/2026: R$ {CAMBIO.mai.taxa.toFixed(4)}/USD (ref. {CAMBIO.mai.data})
        </Text>
      </View>

      <View style={[s.table, { marginBottom: 16 }]}>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { width: colsC.ferr }]}>Ferramenta</Text>
          <Text style={[s.tableHeaderCell, { width: colsC.usdA, textAlign: "right" }]}>Abr USD</Text>
          <Text style={[s.tableHeaderCell, { width: colsC.brlA, textAlign: "right" }]}>Abr BRL</Text>
          <Text style={[s.tableHeaderCell, { width: colsC.usdM, textAlign: "right" }]}>Mai USD</Text>
          <Text style={[s.tableHeaderCell, { width: colsC.brlM, textAlign: "right" }]}>Mai BRL</Text>
          <Text style={[s.tableHeaderCell, { width: colsC.tusd, textAlign: "right" }]}>Tot. USD</Text>
          <Text style={[s.tableHeaderCell, { width: colsC.tbrl, textAlign: "right" }]}>Tot. BRL</Text>
        </View>
        {ITENS.map((item, i) => {
          const brlAbr = item.usd * CAMBIO.abr.taxa;
          const brlMai = item.usd * CAMBIO.mai.taxa;
          return (
            <View key={i} style={[s.tableRow, i % 2 === 1 ? s.tableRowAlt : {}]}>
              <View style={{ width: colsC.ferr }}>
                <Text style={[s.tableCell, s.tableCellBold]}>{item.ferramenta}</Text>
                <Text style={s.tableCellMuted}>{item.detalhe}</Text>
              </View>
              <Text style={[s.tableCell, { width: colsC.usdA, textAlign: "right" }]}>{usd(item.usd)}</Text>
              <Text style={[s.tableCell, { width: colsC.brlA, textAlign: "right", color: C.green }]}>{brl(brlAbr)}</Text>
              <Text style={[s.tableCell, { width: colsC.usdM, textAlign: "right" }]}>{usd(item.usd)}</Text>
              <Text style={[s.tableCell, { width: colsC.brlM, textAlign: "right", color: C.green }]}>{brl(brlMai)}</Text>
              <Text style={[s.tableCell, s.tableCellBold, { width: colsC.tusd, textAlign: "right" }]}>{usd(item.usd * 2)}</Text>
              <Text style={[s.tableCell, s.tableCellBold, { width: colsC.tbrl, textAlign: "right", color: C.green }]}>{brl(brlAbr + brlMai)}</Text>
            </View>
          );
        })}
        <View style={s.tableTotalRow}>
          <Text style={[s.tableCell, s.tableCellBold, { width: colsC.ferr }]}>Total Geral</Text>
          <Text style={[s.tableCell, s.tableCellBold, { width: colsC.usdA, textAlign: "right" }]}>{usd(ITENS.reduce((a,i)=>a+i.usd,0))}</Text>
          <Text style={[s.tableCell, s.tableCellBold, { width: colsC.brlA, textAlign: "right", color: C.green }]}>{brl(TOTAL_BRL_ABR)}</Text>
          <Text style={[s.tableCell, s.tableCellBold, { width: colsC.usdM, textAlign: "right" }]}>{usd(ITENS.reduce((a,i)=>a+i.usd,0))}</Text>
          <Text style={[s.tableCell, s.tableCellBold, { width: colsC.brlM, textAlign: "right", color: C.green }]}>{brl(TOTAL_BRL_MAI)}</Text>
          <Text style={[s.tableCell, s.tableCellBold, { width: colsC.tusd, textAlign: "right", color: C.accent }]}>{usd(TOTAL_USD)}</Text>
          <Text style={[s.tableCell, s.tableCellBold, { width: colsC.tbrl, textAlign: "right", color: C.accent }]}>{brl(TOTAL_BRL)}</Text>
        </View>
      </View>

      {/* Grand total box */}
      <View style={s.totalBox}>
        <View>
          <Text style={s.totalLabel}>TOTAL INVESTIDO EM IA — ABRIL/2026 A MAIO/2026</Text>
          <MoneyValue
            symbol="R$"
            amount="4.405,40"
            color={C.accent}
            numberStyle={{ fontSize: 26 }}
            symbolStyle={{ fontSize: 13, paddingBottom: 4 }}
          />
          <Text style={s.totalSub}>= {usd(TOTAL_USD)} · câmbio médio R$ {((CAMBIO.abr.taxa + CAMBIO.mai.taxa) / 2).toFixed(4)}/USD</Text>
        </View>
        <View style={s.totalRight}>
          <Text style={{ fontSize: 10, color: C.muted, marginBottom: 4 }}>Projeto beneficiado</Text>
          <Text style={{ fontSize: 16, fontFamily: "Helvetica-Bold", color: C.white }}>Easy e-Social</Text>
          <Text style={{ fontSize: 10, color: C.accent }}>100% APPA</Text>
          <Text style={{ fontSize: 9, color: C.muted, marginTop: 8 }}>7 contas · 2 ferramentas · 2 meses</Text>
        </View>
      </View>

      <View style={{ marginTop: 16 }}>
        <Text style={[s.footerText, { color: C.muted }]}>
          Fonte câmbio: economia.awesomeapi.com.br · Taxa de venda (ask) do dia de referência de cada mês.
        </Text>
      </View>

      <PageFooter page={3} total={3} />
    </Page>
  );
}

// ── Document ───────────────────────────────────────────────────────────────

function RelatorioPDFDoc() {
  return (
    <Document
      title="Relatório de Custo de Desenvolvimento — Easy e-Social (APPA)"
      author="Dashboard do Xandão"
      subject="Custo de IA — Abril/2026 a Maio/2026"
    >
      <CoverPage />
      <GithubPage />
      <CustoFinalPage />
    </Document>
  );
}

// ── Button export ──────────────────────────────────────────────────────────

export function PDFButton() {
  const filename = `relatorio-custo-appa-${new Date().toISOString().slice(0, 10)}.pdf`;

  return (
    <PDFDownloadLink document={<RelatorioPDFDoc />} fileName={filename}>
      {({ loading }) => (
        <button
          disabled={loading}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            loading
              ? "bg-white/10 text-muted cursor-not-allowed"
              : "bg-accent text-white hover:bg-accent/80"
          }`}
        >
          <FileDown className="w-4 h-4" />
          {loading ? "Gerando PDF..." : "Exportar PDF"}
        </button>
      )}
    </PDFDownloadLink>
  );
}
