# Web3 — Prediction Market Café Brasileiro

## O que é
Prediction market para preços de café brasileiro, inspirado no modelo Polymarket. Permite apostas em preços futuros de café com settlement automático on-chain na Solana.

## Problema que resolve
Mercado de café brasileiro não tem instrumento de hedge/especulação acessível e transparente. Prediction market descentralizado oferece price discovery em tempo real com liquidação automática.

## Como funciona
1. Plataforma cria 3 contratos diários para preços de café
2. Usuários apostam no resultado (acima/abaixo do preço alvo)
3. Motor LMSR (Logarithmic Market Scoring Rule) precifica probabilidades
4. Validação on-chain garante transparência e imutabilidade
5. Settlement automático ao final do período — pagamento instantâneo

## Especificações Técnicas
- **Blockchain:** Solana
- **Motor de mercado:** LMSR (Logarithmic Market Scoring Rule)
- **Contratos:** 3 mercados diários
- **Settlement:** Automático on-chain
- **Validação:** On-chain Solana
- **Produto:** End-to-end (frontend + smart contracts + oracle)

## Arquitetura
```
Prediction Market Café
├── Smart Contracts (Solana/Anchor)
│   ├── Market Factory — cria mercados diários
│   ├── LMSR Engine — precificação de probabilidades
│   ├── Settlement — liquidação automática
│   └── Oracle — alimentação de preços reais
├── Frontend
│   ├── Interface de apostas
│   ├── Gráficos de probabilidade
│   └── Histórico de mercados
└── Backend
    ├── Feed de preços de café (CCCV/CEPEA)
    ├── Criação automática de contratos
    └── Monitoramento de settlement
```

## Stack
- Solana, Anchor Framework
- React, TypeScript
- LMSR para market making automatizado
