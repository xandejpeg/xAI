# Contexto dos Produtos

Ambos os produtos (AvanteHub e navigationV2) foram criados para resolver a falta de padronização na coleta e análise de solo agrícola. Eles também oferecem uma ferramenta de controle de qualidade e ROI para produtores rurais e para lojistas do agro, permitindo:
- Padronizar processos de coleta e análise de solo.
- Garantir rastreabilidade e qualidade dos dados.
- Monitorar o trabalho dos colaboradores em campo.
- Gerar relatórios e indicadores de desempenho.
- Automatizar integração de dados e facilitar decisões.

Esses sistemas atendem tanto produtores quanto empresas do setor, focando em eficiência, transparência e controle.

# AvanteHub

- **URL:** https://github.com/iago1409/AvanteHub
- **Privado:** Sim
- **Stack:** TypeScript, Supabase, JWT, Vite, Tailwind, Playwright
- **Descrição:** Sistema de gestão agrícola com geração de XML, análise de solo, cotações de commodities, autenticação JWT, gestão de fazendas, funcionários, produção e vendas.

## Estrutura de Pastas
- `.env`, `.env.example`, `.env.production`: Configuração de ambiente
- `dados_historicos/`: Dados históricos de commodities
- `drizzle.config.ts`, `eslint.config.js`, `tailwind.config.js`, `vite.config.ts`: Configuração de ferramentas
- `server/`: Backend
- `shared/`: Código compartilhado
- `sql/`: Scripts SQL
- `src/`: Frontend
  - `App.tsx`: Entry point
  - `components/`: Componentes React
  - `context/`: Contextos globais
  - `data/`: Dados
  - `hooks/`: Hooks customizados
  - `lib/`: Bibliotecas utilitárias
  - `pages/`: Páginas
  - `rotation/`: Rotinas
  - `routes.tsx`: Rotas
  - `services/`: Serviços de API (cotação, CPF, SERPRO, CEPEA)
  - `types.ts`: Tipos TypeScript
  - `utils/`: Utilitários

## Principais Funcionalidades
- Geração de XML para integração agrícola
- Análise de solo
- Cotações de commodities (café, cacau, banana, mamão, pimenta, coco, dólar)
- Autenticação JWT (rotas protegidas e públicas)
- Gestão de fazendas, funcionários, produção e vendas
- API RESTful, integração TradingView e CCCV
- Serviços: Supabase, Edge Functions, Serper API, CCCV
- Histórico de cotações: Dados reais e estimativas por produto/ano

## Rotas API
### Públicas
- `GET /api/health`: Status do servidor
- `POST /api/auth/login`: Login (retorna JWT)
- `POST /api/auth/register`: Registro
- `GET /api/cotacoes/*`: Cotações de commodities
- `GET /api/commodities`: Lista de commodities
- `GET /api/dolar`: Cotação do dólar

### Protegidas (JWT)
- `GET/POST/PATCH/DELETE /api/farms/*`: Fazendas
- `GET/POST/PATCH/DELETE /api/funcionarios/*`: Funcionários
- `GET/POST /api/soil-analysis/*`: Análises de solo
- `GET/POST/DELETE /api/producao/*`: Produção
- `GET/POST/DELETE /api/vendas/*`: Vendas

## Serviços de Cotação
- `cotacoesService.ts`: Busca cotações em tempo real, integra TradingView, CCCV, Serper API
- Dados históricos por produto/ano (café, cacau, banana, mamão, pimenta, coco, dólar)

## Setup
- Clonar repositório
- Instalar dependências (`npm install`)
- Configurar `.env`
- Rodar servidor (`npm run dev`)

---

# navigationV2

- **URL:** https://github.com/iago1409/navigationV2
- **Privado:** Sim
- **Stack:** TypeScript, React Native, Expo, Lucide, Animated, Supabase
- **Descrição:** App mobile para coleta de dados em campo, integrado ao AvanteHub

## Estrutura de Pastas
- `app/`: Interface principal
  - `index.tsx`: Tela inicial
  - `navigate.tsx`, `scan.tsx`, `summary.tsx`, `not-found.tsx`, `_layout.tsx`: Telas de navegação/coleta
- `lib/`: Utilitários
  - `api.ts`: Comunicação com AvanteHub (syncToAvanteHub)
  - `types.ts`: Tipos de dados (InputSession, OutputFormat, SkipReason)
  - `validation.ts`: Validação de entrada
  - `geo.ts`: Funções geográficas
  - `store.ts`: Gerenciamento de estado
- `hooks/`: Hooks customizados
- `assets/`: Recursos

## Principais Funcionalidades
- Interface para técnicos coletarem dados de solo/fazenda
- Validação de entrada, processamento de dados, envio para AvanteHub
- Sincronização via API (POST com JWT)
- Configuração de sessão: raio de chegada, motivos de pulo, exigência de foto
- Estruturas de dados: InputSession, OutputFormat, SkipReason
- Comunicação direta com AvanteHub (syncToAvanteHub), uso de tokens JWT

## Tipos e Integração
- `InputSession`: Dados da sessão de coleta (UUID, fazenda, técnico, tipo, datas)
- `OutputFormat`: Dados enviados para AvanteHub
- `SkipReason`: Motivos para pular pontos
- `syncToAvanteHub`: Função para enviar dados coletados ao backend

## Setup
- Clonar repositório
- Instalar dependências (`npm install`)
- Configurar `.env`
- Rodar app (`npm run dev`)

---

## Observações Gerais
- Ambos os projetos são integrados: navigationV2 coleta dados e envia para AvanteHub.
- AvanteHub centraliza gestão, análise, cotações e autenticação.
- navigationV2 foca na experiência do técnico em campo, com validação, interface mobile e sincronização.
- Documentação e comentários de código são detalhados, facilitando onboarding.

---

Se precisar exemplos de endpoints, fluxos, tipos ou arquivos específicos, basta pedir.
