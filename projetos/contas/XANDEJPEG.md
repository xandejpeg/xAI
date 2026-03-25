# 🔑 Conta: xandejpeg

> **Tipo:** Conta principal / pessoal / acadêmica
> **URL:** https://github.com/xandejpeg
> **Varredura:** 20/03/2026
> **Total de repos:** 31 (10 privados, 21 públicos)
> **Projetos válidos:** 8 (privados relevantes) + 1 novo (Projeto)
> **Repos lixo:** 2 (avanteview — vazio, desktop-tutorial — template GitHub)

---

## Projeto 1: Projeto (RealPrev — versão principal)

| Campo | Detalhe |
|-------|---------|
| **Repo** | `xandejpeg/Projeto` |
| **Visibilidade** | 🔒 Privado |
| **O que faz** | Sistema de produção completo para geração e envio real de eventos eSocial (S-2500, S-2501, S-2555, S-3500, S-5501) ao governo federal. Integra via SOAP com certificados digitais A1, gerencia ciclo completo de processos trabalhistas, cálculo previdenciário, correção monetária (SELIC/INPC), DCTF-Web, eCAC scraping e monitoramento. |
| **Etapa** | ✅ **Produção** — sistema em uso com envio real ao eSocial |
| **Onde está** | Backend: Gunicorn · Frontend: Vercel |
| **Commits** | 183 totais (105 do Alessandro — 57%) |
| **Contribuidores** | 3 — xandejpeg (105), edulobo1971-hash (68), iago1409 (10) |
| **Criado** | Mar/2026 |
| **Último push** | Mar/2026 |
| **Tamanho** | ~45 MB |

### Tecnologias que o Alessandro domina neste projeto

| Camada | Tecnologia |
|--------|-----------|
| **Frontend** | React 19, Material-UI (MUI 7), React Router 7, Axios, jsPDF + AutoTable |
| **Backend** | Python, FastAPI, Uvicorn, Gunicorn |
| **Banco** | SQLAlchemy (SQLite dev, PostgreSQL prod via psycopg2-binary) |
| **eSocial SOAP** | Zeep (SOAP client), lxml (XML), signxml (assinatura digital), Cryptography (PKI/certificados A1 .pfx) |
| **Auth** | JWT (python-jose), Passlib + bcrypt, RBAC (admin/operador/consulta) |
| **Cálculos** | Correção monetária (SELIC, INPC), IRRF, previdenciário |
| **Relatórios** | ReportLab (PDF), openpyxl (Excel), CSV |
| **Scraping** | BeautifulSoup4 (eCAC scraper) |
| **Agendamento** | APScheduler (polling S-5501 automático) |
| **Monitoramento** | psutil (system health), MetricsMiddleware customizado |
| **HTTP** | httpx + requests (APIs SERPRO) |
| **Deploy** | Vercel (frontend), Gunicorn (backend), build.sh |

### Features construídas pelo Alessandro

1. Wizard S-2500 completo (8 steps) com save automático por step em tabelas normalizadas
2. Envio real ao eSocial via SOAP com certificado digital A1 (.pfx)
3. Assinatura digital XML (signxml + validação XSD oficial)
4. Repositório de XMLs reais (enviados, assinados, retornos do governo — centenas de arquivos)
5. Gerenciamento de certificados digitais (upload, extração, armazenamento seguro)
6. Sistema de procurações eSocial
7. RBAC completo (admin, operador, consulta) com policy configurável
8. Cálculo de correção monetária (SELIC, INPC, auto-cálculo 100% e parcelamento)
9. Cálculo IRRF e base de tributos previdenciários
10. Geração de guias de pagamento em PDF
11. Dashboard de monitoramento (uptime, request metrics, saúde do sistema)
12. Relatórios PDF, Excel, CSV, DCTF-Web
13. eCAC Scraper para dados da Receita Federal
14. Integração SERPRO (CPF, CNPJ)
15. Scheduler automático para polling S-5501
16. Gerador de XML para S-2200, S-2299, S-2300, S-2399, S-2555, S-3500 (exclusão)
17. 30+ scripts de migração de banco
18. Audit logs de ações do usuário
19. Importação de tabelas eSocial (CNAE, FPAS, GILRAT, CBO, municípios IBGE)
20. Registro preparado para INPI (hash, documentação técnica)

---

## Projeto 2: MetaTrade5

| Campo | Detalhe |
|-------|---------|
| **Repo** | `xandejpeg/MetaTrade5` |
| **Visibilidade** | 🔒 Privado |
| **O que faz** | Expert Advisor (EA) institucional para MetaTrader 5 que opera XAUUSD (ouro) automaticamente usando estratégia Fimathe (Canal de Abertura / Canal de Referência). 3 versões: protótipo single-file (Fimathe.mq5), GoldBot v4 modular (13 arquivos, ~2.500 LOC), e GoldBotV2 com ZN direcional e dupla confirmação. |
| **Etapa** | 🧪 **Teste** — backtest e demo na The 5%ers (prop trading) |
| **Onde está** | MetaTrader 5 local · Conta demo The 5%ers (Five Percent Online, UTC+2) |
| **Commits** | 3 (xandejpeg) |
| **Contribuidores** | 1 — xandejpeg (3) |
| **Criado** | Fev/2026 |
| **Último push** | Mar/2026 |
| **Tamanho** | ~4.5 MB |

### Tecnologias que o Alessandro domina neste projeto

| Camada | Tecnologia |
|--------|-----------|
| **Linguagem** | MQL5 (MetaQuotes Language 5) |
| **Plataforma** | MetaTrader 5 |
| **Lib padrão** | CTrade (wrapper de ordens MQL5) |
| **Arquitetura** | OOP modular (classes com Init/Reset, 6 módulos) |
| **Estratégia** | Fimathe (Canal de Abertura + Canal de Referência) |
| **Prop Firm** | The 5%ers (Five Percent Online) |

### Features construídas pelo Alessandro

1. Motor de cálculo de lote institucional via tick value (não por pips)
2. Máquina de estados com 6 estados e 7 motivos de lock
3. Martingale estrutural: após loss inverte direção com 2× lote
4. Dashboard visual no gráfico com 19 campos atualizados por tick
5. Controle de sessão BRT (conversão timezone servidor↔Brasília)
6. Risk management: 0.35–0.75% por trade, daily loss limit -1.5%
7. Logging estruturado `[GoldBot][MODULE][LEVEL]`
8. Validações pré-trade: spread, margem, autotrading enabled
9. Auto-redução de lote se margem insuficiente (90% free margin cap)
10. Reset diário automático alinhado ao calendário BRT
11. GoldBotV2: ZN direcional com dupla confirmação (CR + breakout)
12. Documentação técnica: Teoria dos Ciclos, Fases do Mercado, FIMATHE

---

## Projeto 3: Avante-Agricola

| Campo | Detalhe |
|-------|---------|
| **Repo** | `xandejpeg/Avante-Agricola` |
| **Visibilidade** | 🔒 Privado |
| **O que faz** | Site institucional / landing page para a Avante Agrícola, empresa de insumos agrícolas (fertilizantes, micronutrientes, bioestimulantes, adjuvantes). Catálogo de 30+ produtos de 5 fabricantes com formulário de contato via WhatsApp. Inclui scraper Puppeteer e banco de dados para produtos. |
| **Etapa** | 🚧 **Desenvolvimento** |
| **Onde está** | Local |
| **Commits** | 38 (xandejpeg) |
| **Contribuidores** | 1 — xandejpeg (38) |
| **Criado** | Fev/2026 |
| **Último push** | Mar/2026 |
| **Tamanho** | ~232 MB |

### Tecnologias que o Alessandro domina neste projeto

| Camada | Tecnologia |
|--------|-----------|
| **Frontend** | Next.js 16 (App Router, Turbopack), React 19, TypeScript 5.9 |
| **Estilo** | Tailwind CSS 4, PostCSS |
| **Animações** | Framer Motion 12 (parallax, stagger, magnetic buttons, scroll progress) |
| **Banco** | Drizzle ORM + PostgreSQL (via postgres.js) |
| **Scraping** | Puppeteer, Cheerio + Axios |
| **Imagens** | Sharp (otimização/conversão WebP) |
| **Runtime** | Bun |
| **Ícones** | Lucide React |

### Features construídas pelo Alessandro

1. Catálogo de 30+ produtos agrícolas de 5 fabricantes (ICL, Kellus, Amazon AgroCiências, Santa Clara, Fortcrops)
2. 6 categorias de produto (Nutrição de Solo, Nutrição Foliar, Micronutrientes, Bioestimulantes, Adjuvantes, Fertilizantes NPK)
3. Sistema de animações elaborado: AnimatedBlob, CountUp, FadeIn, MagneticButton, ParallaxLayer, ScrollProgress, StaggerContainer
4. UI components premium: GlassCard, GlowButton, GradientBorder, SpotlightCard
5. WhatsApp float button (3 números: comercial, técnico, geral)
6. SEO: robots.ts + sitemap.ts
7. Image pipeline: fotos originais → Sharp → WebP otimizado
8. Schema de banco com Drizzle ORM para produtos
9. Scraper Puppeteer para coleta de dados
10. Design dark theme com transições wave (SVG curves) entre seções

---

## Projeto 4: ccv1 (Coffee Candles v1)

| Campo | Detalhe |
|-------|---------|
| **Repo** | `xandejpeg/ccv1` |
| **Visibilidade** | 🔒 Privado |
| **O que faz** | Backend de um mercado de previsão (prediction market) para preços de café brasileiro, estilo Polymarket. Usuários apostam se o preço do café (arábica, conilon) vai fechar acima ou abaixo de um strike price usando tokens SPL na Solana Devnet como colateral. Motor LMSR (Logarithmic Market Scoring Rule) com precisão arbitrária via Decimal.js. |
| **Etapa** | 🧪 **MVP funcional** — deploy Railway |
| **Onde está** | Railway (railway.toml + nixpacks.toml) · Docker local |
| **Commits** | 8 (xandejpeg) |
| **Contribuidores** | 1 — xandejpeg (8) |
| **Criado** | Fev/2026 |
| **Último push** | Fev/2026 |
| **Tamanho** | ~146 KB |

### Tecnologias que o Alessandro domina neste projeto

| Camada | Tecnologia |
|--------|-----------|
| **Backend** | Express 4, TypeScript 5.3 |
| **Banco** | PostgreSQL (via pg) |
| **Market Maker** | LMSR (Logarithmic Market Scoring Rule), Decimal.js (precisão arbitrária) |
| **Web3** | @solana/web3.js 1.98, @solana/spl-token 0.4 (validação on-chain de transfers SPL) |
| **Real-time** | WebSocket (ws 8.19) — market data em tempo real |
| **Jobs** | node-cron (preços a cada X min, settlement de contratos expirados) |
| **Scraping** | Cheerio (oracle de preços) |
| **Segurança** | express-rate-limit (20 trades/min, 5 admin ops/min) |
| **Testes** | Jest (unitários do LMSR) |
| **Deploy** | Docker + Docker Compose, Railway |

### Features construídas pelo Alessandro

1. LMSR Market Maker completo: buyYes, buyNo, sellYes, sellNo com invariante matemático preservado
2. Validação on-chain Solana: tx finalized, mint match, vault destination, authority, amount (Decimal.js strict), replay protection via DB
3. 3 contratos diários auto-gerados: "Arábica Dura > 1700 BRL/saca", "Conilon > 1000 BRL/saca", "Arábica Rio > 1350 BRL/saca"
4. Settlement automático: resolve contratos expirados comparando preço oracle vs strike
5. Full REST API: CRUD contratos, trade execution (com Solana validation), live prices, health check, admin settle
6. WebSocket layer: broadcast de trades executados em tempo real
7. Rate limiting: 20 trades/min, 5 admin ops/min
8. Event bus para desacoplar trade execution → WS broadcast
9. API de preços integrada com AvanteView como oracle source

---

## Projeto 5: coffee-candles-web3-pilot

| Campo | Detalhe |
|-------|---------|
| **Repo** | `xandejpeg/coffee-candles-web3-pilot` |
| **Visibilidade** | 🔒 Privado |
| **O que faz** | Frontend Web3 do Coffee Candles — interface onde usuários conectam carteira Phantom, veem saldo de CCP tokens (SPL token piloto), visualizam mercados de previsão com preços LMSR em tempo real, e apostam transferindo tokens para um vault wallet. Integrado ao backend ccv1. |
| **Etapa** | 🧪 **Piloto** — Solana Devnet (tokens fake, modo teste) |
| **Onde está** | Vercel (vercel.json presente) |
| **Commits** | 5 (xandejpeg) |
| **Contribuidores** | 1 — xandejpeg (5) |
| **Criado** | Fev/2026 |
| **Último push** | Fev/2026 |
| **Tamanho** | ~133 KB |

### Tecnologias que o Alessandro domina neste projeto

| Camada | Tecnologia |
|--------|-----------|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript 5.4 |
| **Estilo** | TailwindCSS 3.4 |
| **Web3** | @solana/web3.js 1.95 (conexão RPC), @solana/wallet-adapter-react + Phantom, @solana/spl-token 0.4 |
| **Deploy** | Vercel |

### Features construídas pelo Alessandro

1. Phantom Wallet connect com wallet adapter completo
2. CCP Token balance display — lê saldo SPL token em tempo real
3. Market Dashboard — grid com cards de mercados ativos (preço YES/NO dinâmico)
4. Bet Panel — UI para apostar YES/NO em um mercado
5. SPL Token Transfer to Vault — transferência real de tokens CCP para vault wallet (colateral)
6. WebSocket market stream — recebe updates de preço em tempo real do backend ccv1
7. REST API client — busca contratos e preços do backend
8. Network badge com indicador de conexão ativa
9. Modo Piloto — aviso explícito que é teste com tokens fake (Solana Devnet)

---

## Projeto 6: Avante-Price

| Campo | Detalhe |
|-------|---------|
| **Repo** | `xandejpeg/Avante-Price` |
| **Visibilidade** | 🔒 Privado |
| **O que faz** | Trading terminal para visualização de preços físicos de commodities agrícolas brasileiras (café arábica, conilon, soja, milho). Consome dados do AvanteView (legado) e do CCCV (Centro do Comércio de Café de Vitória), cacheia em PostgreSQL, e apresenta gráficos profissionais estilo Bloomberg com lightweight-charts (TradingView). |
| **Etapa** | 🚧 **Desenvolvimento** — deploy Hostinger |
| **Onde está** | Backend: Hostinger (Express) · Frontend: Hostinger (estático) |
| **Commits** | 30 (xandejpeg) |
| **Contribuidores** | 1 — xandejpeg (30) |
| **Criado** | Fev/2026 |
| **Último push** | Fev/2026 |
| **Tamanho** | ~424 KB |

### Tecnologias que o Alessandro domina neste projeto

| Camada | Tecnologia |
|--------|-----------|
| **Runtime** | Bun (dev), Node.js/Express 5 (prod/Hostinger) |
| **Backend** | TypeScript 5.3 |
| **Banco** | PostgreSQL (Supabase) — cache de preços |
| **Scraping** | Cheerio 1.0 (CCCV cotações diárias) |
| **Gráficos** | lightweight-charts 4.2 (TradingView) — candlestick/linha |
| **Frontend** | HTML/CSS/JS vanilla (sem framework) |
| **CI/CD** | GitHub Actions — cron sync diário |

### Features construídas pelo Alessandro

1. Scrapers para 2 fontes: CCCV (café cotações diárias) e outra fonte (NA)
2. Parser de tabela HTML com Cheerio (extrai mês/ano, percorre linhas, converte preço BR para float)
3. API REST completa: GET products, GET prices, POST sync, GET sync/status
4. Sync incremental e full sync de preços
5. Cache PostgreSQL local para não depender de APIs externas em tempo real
6. Frontend com gráficos TradingView (lightweight-charts)
7. Landing page separada do trading terminal
8. Regras rígidas de dados: NUNCA interpolar preços, NUNCA preencher lacunas, mostrar gaps visualmente
9. Deploy Hostinger com servidor Express como fallback
10. CORS completo + MIME types corretos

---

## Projeto 7: Vilapark3d

| Campo | Detalhe |
|-------|---------|
| **Repo** | `xandejpeg/Vilapark3d` |
| **Visibilidade** | 🔒 Privado |
| **O que faz** | Configurador 3D interativo de playgrounds infantis (VilaPark). Editor CAD 3D web completo onde o usuário monta playgrounds com equipamentos reais de um catálogo (escorregadores, trampolins, piscina de bolinhas, plataformas hexagonais, pontes suspensas), conecta tudo com tubulação galvanizada de 48.3mm, e gera orçamentos com preços reais incluindo IPI. |
| **Etapa** | 🚧 **Desenvolvimento avançado** (catálogo real, templates, cinematic camera, export) |
| **Onde está** | Local |
| **Commits** | 19 (xandejpeg) |
| **Contribuidores** | 1 — xandejpeg (19) |
| **Criado** | Jan/2026 |
| **Último push** | Fev/2026 |
| **Tamanho** | ~22 MB |

### Tecnologias que o Alessandro domina neste projeto

| Camada | Tecnologia |
|--------|-----------|
| **3D Engine** | React Three Fiber (R3F), Three.js 0.182, @react-three/drei, @react-three/rapier (physics), @react-three/postprocessing |
| **Animação** | Theatre.js (câmera cinematográfica), Framer Motion |
| **Frontend** | React 19, Vite 7, TailwindCSS 4, shadcn/ui (Radix), wouter (routing), TanStack Query |
| **Backend** | Express.js, PostgreSQL (Drizzle ORM), WebSockets |
| **Build** | TypeScript 5.6, TSX, esbuild |
| **Export** | FFmpeg (vídeo), jsPDF (orçamento PDF), GLTF export |

### Features construídas pelo Alessandro

1. Editor 3D completo com grid, gizmo, TransformControls, OrbitControls, FirstPerson mode
2. Catálogo de 30+ componentes reais com preços, NCM, dimensões (escorregadores, redes de escalada, trampolins, túneis, pontes)
3. Sistema de conexão por tubulação galvanizada (Pipe system com cotovelos e espuma)
4. Templates pré-montados de playgrounds baseados em projetos reais
5. Box selection em grupo, undo/redo completo
6. Câmera cinematográfica com presets, path animation, recording via Theatre.js
7. Geração de orçamento PDF com custos reais (IPI incluso)
8. Validação de segurança do playground
9. Exportação GLTF e vídeo (FFmpeg)
10. CRUD de projetos salvo em PostgreSQL
11. MCP Server customizado para catálogo de playground

---

## Projeto 8: RealizandoPrev

| Campo | Detalhe |
|-------|---------|
| **Repo** | `xandejpeg/RealizandoPrev` |
| **Visibilidade** | 🔒 Privado |
| **O que faz** | Versão anterior/paralela do sistema eSocial, com UI mais simples (Tailwind + Lucide em vez de MUI). Wizard S-2500/S-2501 com 8 etapas, dashboard de empresa/funcionários, integração SERPRO, validação XSD e rascunhos com autosave. Sem envio SOAP real — versão de desenvolvimento. |
| **Etapa** | 📦 **Legado** — substituído pelo repo "Projeto" (versão principal com envio real) |
| **Onde está** | Local |
| **Commits** | 26 totais (21 do Alessandro — 81%) |
| **Contribuidores** | 3 — xandejpeg (21), iago1409 (4), edulobo1971-hash (1) |
| **Criado** | Dez/2025 |
| **Último push** | Jan/2026 |
| **Tamanho** | ~12 MB |

### Tecnologias que o Alessandro domina neste projeto

| Camada | Tecnologia |
|--------|-----------|
| **Frontend** | React 19, React Router 7, Tailwind CSS 3, Framer Motion, Lucide icons, Axios |
| **Backend** | Python, FastAPI, Uvicorn |
| **Banco** | SQLAlchemy (SQLite), Motor (MongoDB async) |
| **Auth** | JWT (python-jose), Passlib + bcrypt |
| **eSocial** | lxml (XML), Cryptography (certificados), httpx (APIs SERPRO) |
| **Testes** | Playwright (e2e — 20+ specs), Jest (unit) |
| **Types** | TypeScript (frontend), Pydantic (backend) |

### Features construídas pelo Alessandro

1. Wizard multi-step (8 etapas) para gerar eventos S-2500 do eSocial
2. Dashboard com seleção de empresa, lista de funcionários, grid de rascunhos
3. Integração SERPRO para consulta de CPF/CNPJ
4. Validação XSD dos XMLs gerados contra schemas oficiais do eSocial
5. Sistema de rascunhos/drafts com autosave
6. Geração de XML para S-2500 e S-2501
7. Gerenciamento de empresas e funcionários
8. Inputs brasileiros especializados (CPF, CNPJ, data BR, mês/ano, município IBGE)
9. MongoDB para armazenamento de dados SERPRO em cache
10. Encryption service para credenciais sensíveis
11. 20+ testes e2e com Playwright (cenários completos, login, fluxos)

---

## Repos Descartados

| Repo | Motivo |
|------|--------|
| avanteview | 🗑️ Privado, vazio (1 KB), só README + .gitignore, nenhum código |
| desktop-tutorial | 🗑️ Privado, template automático do GitHub Desktop, 0 KB |

---

## Ecossistema — Conexão entre Projetos

```
Avante-Price (scrapers)  ──oracle──►  ccv1 (prediction market backend)
      │                                        │
      │                                        ▼
      │                              coffee-candles-web3-pilot (frontend Phantom/Solana)
      │
      └── AvanteView (legado) ── substituído pelo Avante-Price
      
Projeto (RealPrev prod) ◄── evoluiu de ── RealizandoPrev (legado)
```

---

*Varredura concluída em 20/03/2026 — dados extraídos diretamente do código-fonte via GitHub API*