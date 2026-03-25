# Trading EA — Expert Advisor MetaTrader 5

## O que é
Expert Advisor para MetaTrader 5 operando XAUUSD (ouro) com estratégia Fimathe. Sistema automatizado de trading com máquina de estados, risk management e dashboard visual.

## Problema que resolve
Operações manuais de trading são emocionais e inconsistentes. O EA executa a estratégia Fimathe de forma automática, disciplinada e com gestão de risco integrada.

## Como funciona
1. EA monitora preço do XAUUSD em tempo real no MetaTrader 5
2. Máquina de estados com 6 estados governa o ciclo de operação
3. Identifica pontos de entrada/saída baseados na estratégia Fimathe
4. Executa ordens automaticamente com stop loss e take profit
5. Dashboard visual de 19 campos exibe status em tempo real
6. Risk management controla exposição e tamanho de posição

## Especificações Técnicas
- **Linguagem:** MQL5
- **Plataforma:** MetaTrader 5
- **Ativo:** XAUUSD (ouro/dólar)
- **Estratégia:** Fimathe
- **Máquina de estados:** 6 estados
- **Dashboard:** 19 campos visuais em tempo real
- **Risk management:** Controle de lote, stop loss, take profit, drawdown máximo

## Arquitetura
```
EA Fimathe XAUUSD
├── Módulo de Entrada (sinais Fimathe)
├── Máquina de Estados (6 estados)
│   ├── Aguardando setup
│   ├── Setup identificado
│   ├── Entrada executada
│   ├── Gerenciando posição
│   ├── Saída parcial
│   └── Encerrado
├── Risk Management
│   ├── Cálculo de lote
│   ├── Stop loss dinâmico
│   ├── Take profit por alvo
│   └── Drawdown máximo
└── Dashboard Visual (19 campos)
    ├── Status da operação
    ├── P&L em tempo real
    ├── Exposição atual
    └── Métricas de performance
```

## Processo
Do PRD (Product Requirements Document) à implementação completa em MQL5.
