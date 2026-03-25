# AvanteHub

## O que é
Plataforma web de gestão agrícola completa. Centraliza operações de fazendas: coleta de solo, análise, cotações de commodities, gestão de produção/vendas, controle de funcionários e geração de XML.

## Problema que resolve
Falta de padronização na coleta e análise de solo no agro brasileiro. Produtores e lojistas não tinham ferramenta integrada para controle de qualidade, ROI, rastreabilidade de colaboradores e tomada de decisão baseada em dados reais de mercado.

## Como funciona
1. Produtor/gestor cadastra fazendas e pontos de coleta no mapa
2. Técnicos recebem sessões de coleta via QR code no app NavigationV2
3. Dados de solo são coletados em campo e sincronizados automaticamente
4. Plataforma processa análises, gera relatórios, exibe cotações em tempo real
5. Geração de XML para integração com órgãos/agentes externos
6. Dashboard com métricas de qualidade e ROI

## Arquitetura
- **Frontend:** React 18, TypeScript, Tailwind CSS, Framer Motion, Radix UI, Tremor (charts), Recharts, Lightweight Charts
- **Backend:** Express.js 5, Node.js, JWT (jsonwebtoken), bcryptjs, Helmet, Rate Limiting
- **Banco de Dados:** Supabase (PostgreSQL), Drizzle ORM, Zod para validação
- **Mapas:** MapTiler, Leaflet, React-Leaflet
- **Testes E2E:** Playwright
- **Build:** Vite 7, TSX
- **Deploy:** Netlify (frontend), Hostinger (produção)
- **Scraping:** Cheerio (CEPEA, Cooabriel, CCCV)
- **Documentação API:** Swagger (swagger-jsdoc + swagger-ui-express)
- **PDF:** jsPDF, pdf-parse, pdfjs-dist
- **QR Code:** qrcode.react
- **Canvas:** Konva, React-Konva
- **Excel:** ExcelJS
- **WebSocket:** ws

## Estrutura do Projeto
```
src/
├── components/         # 35+ componentes React
│   ├── xml/            # Gerador XML canônico
│   ├── broker/         # Componentes de cotação
│   ├── ui/             # Componentes base (Radix)
│   └── ...             # FarmMap, TradingChart, Analytics, etc.
├── pages/              # 30 páginas
│   ├── AnaliseDoSolo   # Análise de solo com mapa
│   ├── SystemAdmin     # Painel administrativo
│   ├── FarmerDashboard # Dashboard do produtor
│   ├── WorkerDashboard # Dashboard do técnico
│   ├── NegociacaoV2    # Gráficos de cotações (TradingView-style)
│   ├── VendaProducao   # Vendas e cotações
│   ├── NavigationSessions # Sessões de coleta
│   └── ...
├── services/           # Integrações externas
│   ├── cotacoesService    # Cotações em tempo real (CCCV, CEPEA, Serper)
│   ├── cafeCCCVService    # Dados café direto do CCCV
│   ├── cepeaService       # Dados CEPEA/ESALQ
│   ├── cpfApi             # Consulta CPF
│   └── serproApi          # Integração SERPRO
├── context/            # AuthContext (JWT)
├── lib/                # Supabase clients, queryClient, API
├── hooks/              # Hooks customizados
├── utils/              # Utilitários
└── routes.tsx          # Roteamento

server/
├── index.ts            # Servidor Express
├── routes.ts           # Rotas API centralizadas
├── routes/             # Rotas modulares
├── middleware/          # JWT auth middleware
├── services/           # Serviços backend
├── storage.ts          # Camada de persistência
├── db.ts               # Conexão banco
├── supabase.ts         # Client Supabase server-side
└── swagger.ts          # Documentação API

scripts/
├── github-action-cotacoes.ts  # Scraper CEPEA (GitHub Actions)
├── scraper-cooabriel.ts       # Scraper Cooabriel
└── scraper-cccv.ts            # Scraper CCCV
```

## API RESTful
### Rotas Públicas
- `GET /api/health` — Status do servidor
- `POST /api/auth/login` — Login (retorna JWT)
- `POST /api/auth/register` — Registro
- `GET /api/cotacoes/*` — Cotações de commodities
- `GET /api/commodities` — Lista de commodities
- `GET /api/dolar` — Cotação do dólar

### Rotas Protegidas (JWT)
- `GET/POST/PATCH/DELETE /api/farms/*` — Fazendas
- `GET/POST/PATCH/DELETE /api/funcionarios/*` — Funcionários
- `GET/POST /api/soil-analysis/*` — Análises de solo
- `GET/POST/DELETE /api/producao/*` — Produção
- `GET/POST/DELETE /api/vendas/*` — Vendas

### Rotas Admin
- `POST /api/serpro` — Consulta CPF/CNPJ
- `DELETE /api/farms/:id` — Deletar fazenda

## Cotações Automáticas
Coleta via GitHub Actions (seg-sex 19h):
- **CEPEA/ESALQ:** café arábica dura, café conilon
- **Cooabriel:** conilon tipo 7, tipo 7/8, tipo 8, escolha
- **CCCV:** café arábica rio, arábica dura, conilon
- Commodities: café, cacau, banana, mamão, pimenta do reino, coco, dólar

## Variáveis de Ambiente
- `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` — Supabase
- `VITE_MAPTILER_KEY` — MapTiler
- `DATABASE_URL` — PostgreSQL
- `JWT_SECRET` — Tokens JWT
- `VITE_AGRIHUB_URL` / `VITE_AGRIHUB_ANON_KEY` — AgriHub (cotações)
- `VITE_SERPER_API_KEY` — Serper API (busca cotações)

## Testes E2E (Playwright)
- `auth-jwt.spec.ts` — Autenticação JWT
- `login.spec.ts` — Login de todos os tipos de usuário
- `xml-generator-flow.spec.ts` — Fluxo de geração XML
- `cotacoes-negociacoes.spec.ts` — Cotações e negociações

## Repositório
- **URL:** https://github.com/iago1409/AvanteHub
- **Privado:** Sim
- **Linguagem principal:** TypeScript
- **Criado:** Agosto 2025
- **Última atualização:** Março 2026
- **2.616 objetos** no repositório
