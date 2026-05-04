# Perfil LinkedIn — Dev Pleno · eSocial e Sistemas Governamentais

> **Posicionamento:** Backend / Sistemas. Foco em eSocial, SOAP, certificado digital A1, smart contracts.
> **Stack visível no perfil:** Python · Bun · Golang · Java · SOAP · Solidity / EVM
> **NÃO citar:** React, TypeScript, Node, Vue, Next.js, Playwright, Docker, Solana (front-end / tooling fora do posicionamento)
> **LGPD:** sem nomes de clientes — usar setor (facilities, financeiro, agro).
> **Atualizado:** 04/05/2026.

---

## Estado atual (snapshot 04/05/2026)

- **Nome:** Alessandro Chiarele Filho
- **URL:** linkedin.com/in/alessandro-chiarele-filho-26497b1a7
- **Localização:** São Paulo, SP
- **Empresa visível:** Moraes de Carvalho Advogados Associados
- **Formação visível:** FIAP
- **49 conexões / 50 seguidores**
- **"Buscando emprego" ATIVO** — avaliar desativar (founder com clientes)
- **Validação externa (1 sem):** Post de Ana Paula Soares Ultramari (Gerente RH | eSocial | Folha) cita Alessandro nominalmente como "especialista em tecnologia do time tributário". 34 reações.

---

## Headline

```
Dev Backend Pleno · Especialista eSocial | Founder: Easy Social · RealPrev · Avante Hub · Coffee Candles | Python · Java · Golang · Bun · SOAP · Certificado A1 · Solidity / EVM
```

---

## Sobre / About

```
Desenvolvedor Pleno focado em eSocial, sistemas governamentais de alta confiabilidade e smart contracts. Quatro produtos em produção com clientes pagantes:

▸ EASY SOCIAL — Funciona como camada de revisão de folha em cima do eSocial: identifica irregularidades na classificação das rubricas (natureza, incidência, código de receita), faz a adequação ao artigo correto da legislação e, com isso, infere o cálculo correto do IRRF na fonte. Cobre todos os eventos relevantes (S-1200, S-1210, S-2210, IRRF). Atende dezenas de empresas, com média de aproximadamente 200 mil eventos por ano por empresa. Diferencial: concorrentes apenas validam erros; o Easy Social identifica e RESOLVE em lote. Ajuda empresas de facilities e que vivem de licitações públicas a não terem problemas com Imposto de Renda em 2024, 2025 e principalmente em 2026 — já que, com o fim da DIRF (última entrega ano-base 2023), o eSocial + EFD-Reinf passaram a alimentar diretamente a declaração pré-preenchida do trabalhador, sem mais a camada anual de conferença. Backend Python/FastAPI integrado ao governo federal via SOAP com certificado digital A1 mantido localmente na máquina do cliente (sem upload do .pfx).

▸ REALPREV — Automação de eventos trabalhistas do eSocial (S-2500) via SOAP com certificado digital A1 local. Marca registrada no INPI. Cliente em produção no setor financeiro. Backend Python/FastAPI + PostgreSQL + Zeep + signxml.

▸ AVANTE HUB — Plataforma de gestão agrícola operando em campo no Espírito Santo. Coleta padronizada de solo, cotações em tempo real, controle de qualidade para produtores e lojistas.

▸ COFFEE CANDLES — Primeira plataforma a plotar dados históricos de café torrado em gráfico de candles, com camada de prediction market on-chain. Live em produção. Construída sobre o motor de cotações do Avante. Smart contracts em Solidity (EVM) para settlement automático e LMSR.

Diferencial: domínio regulatório complexo (eSocial, certificado A1, SOAP, validação XSD do governo federal) e smart contracts on-chain. Sistemas que rodam todo dia, não protótipos.

Stack principal: Python (FastAPI) · Bun · Golang · Java · SOAP / Certificado A1 · Solidity / EVM · PostgreSQL.

Engenharia da Computação — FIAP.

Aberto a oportunidades de Dev Pleno em backend, sistemas governamentais, fiscais ou Web3.
```

---

## Experiência

### Cargo: Desenvolvedor Backend Pleno · Especialista em eSocial
### Empresa: Moraes de Carvalho Advogados Associados
### Tipo: Tempo integral · Presencial
### Período: Mai/2024 – Presente
### Local: São Paulo, SP

```
Responsável pela tecnologia do time tributário em escritório especializado em recuperação de créditos fiscais, auditoria (PIS, COFINS, INSS via SPED) e consultoria Zona Franca de Manaus.

═══ EASY SOCIAL — Hub de comunicação eSocial ═══

Produto principal. Hub geral para todos os eventos do eSocial, com foco em identificar e RESOLVER inconsistências em lote — diferencial frente a concorrentes que apenas validam.

ESCOPO:
• Aproximadamente 200 mil eventos por ano em média por empresa
• Atende dezenas de empresas
• Trata S-2210 (acidentes), S-1200/S-1210 (folha + IRRF), entre outros
• Análise de Rubricas integrando eSocial + legislação vigente
• Automatização de envios e consultas de retificações para IRRF ano-base 2025

ENGENHARIA:
• Backend Python / FastAPI
• SOAP com certificado digital A1 (.pfx) mantido LOCAL na máquina do cliente (sem upload do certificado para o servidor)
• Pipeline de identificação → resolução em lote
• Lida com retificações múltiplas (versão dtRecibido mais recente)

═══ REALPREV — eSocial S-2500 (Founder + Dev Principal) ═══

Sistema completo de envio de eventos trabalhistas (processo trabalhista) ao governo federal.

PRODUTO:
• Marca registrada no INPI
• Cliente pagante em produção no setor financeiro
• Levantamento de requisitos com advogados e contadores
• Processo manual de dias → envio automatizado em minutos

ENGENHARIA:
• Envio real ao eSocial via SOAP + certificado A1 local + assinatura XML (signxml)
• Certificado A1 (.pfx) mantido na máquina do cliente — sem upload para servidor
• RBAC completo (admin, operador, consulta) com policies configuráveis
• Cálculo de correção monetária (SELIC, INPC), IRRF, base previdenciária
• Dashboard de monitoramento (uptime, métricas, saúde via psutil)
• Relatórios: PDF (ReportLab), Excel (openpyxl), CSV, DCTF-Web
• Integrações: SERPRO (CPF/CNPJ), Datajud/CNJ, eCAC

Stack: Python · Zeep (SOAP) · signxml · PostgreSQL

═══ MCAPBOT — Automação de Rotinas Fiscais ═══

Mapeei processos manuais e priorizei por frequência/tempo. Automação web de 3 rotinas: e-CAC, ReceitaNet, e-Social. Reduziu horas de trabalho manual por semana.

Stack: Python
```

---

### Cargo: Founder · Desenvolvedor
### Empresa: Avante Hub
### Tipo: Próprio · Remoto
### Período: 2023 – Presente

```
Plataforma de gestão agrícola em operação real no Espírito Santo. Atende produtores e lojistas com coleta padronizada de solo, cotações em tempo real e controle de qualidade.

▸ Pipeline de cotações com integração às fontes setoriais (CEPEA, Yahoo Finance e outras)
▸ Backend de autenticação e autorização com 4 papéis (admin, lojista, produtor, técnico)
▸ Sistema NavigationV2 (companion mobile) em desenvolvimento

═══ COFFEE CANDLES (sobre o Avante) ═══

Produto Web3 construído sobre o motor de cotações do Avante. Plotagem de café torrado em candles + prediction market on-chain. Smart contracts em Solidity / EVM para settlement automático e mecanismo LMSR. Live em produção.
```

---

## Formação

- **FIAP** — Bacharelado em Engenharia da Computação (2020 – 2025)

---

## Certificações

| # | Nome | Emissora | Data |
|---|------|----------|------|
| 1 | Blockchain Advanced | FIAP | Abr/2022 |
| 2 | Ethical Hacking | FIAP | Out/2023 |
| 3 | Linux Fundamentos | FIAP | Out/2023 |
| 4 | Blockchain Fundamentos | FIAP | Abr/2021 |
| 5 | IoT Avançado | FIAP | Abr/2021 |
| 6 | Inteligência e Contrainteligência | FIAP | Nov/2020 |
| 7 | Biohacking, Deep Web e Criptografia | FIAP | Jun/2020 |

---

## Featured / Em Destaque

### 1. Easy Social — Hub eSocial (flagship)
Hub geral de comunicação eSocial. Todos os eventos (S-1200, S-1210, S-2210, IRRF). ~200 mil eventos/ano em média por empresa, atendendo dezenas de empresas. Identifica + RESOLVE em lote. Certificado A1 local na máquina do cliente.
- Python · FastAPI · SOAP · Certificado A1 local

### 2. RealPrev — eSocial S-2500
INPI registrado. Cliente em produção no setor financeiro. Envio SOAP com certificado A1 ao governo federal.
- Python · FastAPI · PostgreSQL · Zeep · signxml

### 3. Avante Hub — Gestão agrícola em campo (ES)
Plataforma operando em campo no Espírito Santo. Coleta de solo, cotações, controle de qualidade.

### 4. Coffee Candles — Prediction Market on-chain
Primeira plataforma a plotar café torrado em candles + prediction market on-chain. Smart contracts em Solidity / EVM. Live em produção.
- Solidity · EVM · LMSR · Smart Contracts

---

## Skills (ordem de destaque)

### Tier 1 — eSocial / Gov / Backend Core
1. eSocial
2. SOAP
3. Certificado Digital A1
4. Python
5. FastAPI
6. PostgreSQL
7. Arquitetura de Sistemas
8. Integração de Sistemas Governamentais

### Tier 2 — Linguagens de Backend
9. Bun
10. Golang
11. Java
12. SQL

### Tier 3 — Smart Contracts / Web3
13. Solidity
14. EVM
15. Smart Contracts
16. Blockchain

### Tier 4 — Especialização
17. MQL5 / MetaTrader 5
18. Web Scraping (BeautifulSoup)
19. APScheduler
20. SQLAlchemy
21. Zeep
22. signxml
23. Linux
24. Git / GitHub
25. Engenharia de Requisitos

---

## Serviços (substituir os 4 atuais)

Atualmente listados (remover): Desenvolvimento de banco de dados, Cibersegurança, Segurança da informação, Relatórios de dados.

Substituir por:
- Desenvolvimento de software (backend)
- Integração de sistemas (eSocial, SOAP, certificado digital A1)
- Desenvolvimento de smart contracts (Solidity / EVM)
- Desenvolvimento de banco de dados

---

## Configurações do Perfil

- **URL customizada:** tentar `linkedin.com/in/alessandrochiarele` ou `linkedin.com/in/alessandro-chiarele`
- **Open to Work:** AVALIAR desativar (founder com clientes pagantes — badge pode atrapalhar). Se manter:
  - Desenvolvedor Backend Pleno
  - Desenvolvedor Pleno
  - Engenheiro de Software Pleno
  - Especialista eSocial
  - Smart Contract Developer
- **Idioma:** Português principal
- **Foto de capa:** algo abstrato/neutro ou screenshot de terminal/log do Easy Social rodando — evitar mostrar tela de front-end

---

## Regras de redação aplicadas

1. **Sem React, TypeScript, Node, Vue, Next.js** no perfil.
2. **Sem Playwright e Docker** no perfil.
3. **Sem Solana** — substituído por **Solidity / EVM / Smart Contracts** (linguagem agnóstica de chain).
4. **Adicionado Bun, Golang, Java** como linguagens de backend listadas.
5. **Stack visível por produto** mostra apenas backend e contratos.
6. **Sem nomes de clientes** (LGPD) — apenas "setor financeiro / facilities / agro".
7. **"Júnior" → "Pleno"** em todo o perfil.
8. **RealPrev = S-2500.** Demais eventos pertencem ao Easy Social.
9. **INPI registrado** (não "em preparação").

---

*Texto pronto para colar. Edição manual recomendada — LinkedIn bloqueia automação em campos de texto.*
