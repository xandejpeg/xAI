# Trading Terminal — Commodities Agrícolas

## O que é
Terminal de trading para commodities agrícolas com cotações em tempo real, gráficos estilo TradingView e dados de mercado atualizados via scrapers.

## Problema que resolve
Produtores e traders do agro não tinham terminal acessível para acompanhar cotações de commodities brasileiras (café, cacau, banana, etc.) com dados reais e gráficos profissionais. Plataformas existentes são caras ou não cobrem commodities específicas do Brasil.

## Como funciona
1. Scrapers coletam dados de fontes oficiais (CCCV, CEPEA/ESALQ, Cooabriel)
2. Dados são armazenados e cacheados em PostgreSQL
3. Frontend exibe gráficos estilo TradingView com candlesticks e indicadores
4. Cotações atualizadas automaticamente (seg-sex)
5. Dashboard com visão consolidada do mercado

## Especificações Técnicas
- **Scrapers:** Cheerio para parsing HTML (CCCV, CEPEA, Cooabriel)
- **Banco de dados:** PostgreSQL (cache de cotações)
- **Gráficos:** Lightweight Charts (TradingView open-source), Recharts
- **Automação:** GitHub Actions para coleta periódica
- **Commodities cobertas:**
  - Café Arábica (Dura, Rio)
  - Café Conilon (Robusta)
  - Cacau
  - Banana
  - Mamão
  - Pimenta do Reino
  - Coco
  - Dólar (referência)

## Arquitetura
```
Trading Terminal
├── Scrapers (dados de mercado)
│   ├── scraper-cccv.ts        — Café (CCCV)
│   ├── scraper-cooabriel.ts   — Conilon (Cooabriel)
│   └── github-action-cotacoes — CEPEA/ESALQ (automático)
├── Backend
│   ├── API de cotações
│   ├── Cache PostgreSQL
│   └── Supabase Edge Functions
├── Frontend
│   ├── TradingChart (Lightweight Charts)
│   ├── Recharts (gráficos complementares)
│   ├── Dashboard de cotações
│   └── Histórico por commodity
└── Dados Históricos
    └── Estimativas 2015-2025 por commodity
```

## Fontes de Dados
| Fonte | Commodities |
|-------|-------------|
| CCCV | Café arábica rio, arábica dura, conilon |
| CEPEA/ESALQ | Café arábica dura, conilon |
| Cooabriel | Conilon tipo 7, tipo 7/8, tipo 8, escolha |
| Serper API | Cotações via busca (fallback) |

## Stack
- TypeScript, React, Lightweight Charts, Recharts
- PostgreSQL, Supabase
- Cheerio (scraping), GitHub Actions (automação)
- MVP funcional

## Nota
Este módulo de cotações está integrado ao AvanteHub como funcionalidade core da plataforma.
