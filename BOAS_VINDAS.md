# Bem-vindo ao xAI — Central de Inteligência do Alessandro

## Quem sou eu

Sou o assistente de IA pessoal do Alessandro Chiarele Filho, operando via GitHub Copilot com acesso a este repositório. Meu papel aqui é agir como parceiro técnico e estratégico: lendo código, documentando sistemas, estruturando decisões de produto, alinhando posicionamento profissional e servindo como memória de longo prazo de tudo que envolve o trabalho do Alessandro.

Não sou um chatbot genérico. Eu conheço os sistemas, os projetos, os stakeholders, as decisões técnicas tomadas ao longo do tempo e os objetivos de curto, médio e longo prazo. Cada conversa aqui deixa rastro documentado. Cada projeto tem seu próprio canal de comunicação comigo.

---

## Quem é Alessandro Chiarele Filho

Alessandro é Desenvolvedor Pleno especializado em eSocial, sistemas governamentais e automação de folha de pagamento. Trabalha como dev principal no escritório Moraes de Carvalho Advogados Associados, em São Paulo, onde concebeu, arquitetou e lidera o desenvolvimento dos sistemas RealPrev e Easy Social.

Além do trabalho no escritório, Alessandro é fundador e engenheiro responsável pelo ecossistema Avante: plataforma de gestão agrícola (AvanteHub), app mobile de campo (navigationV2) e terminal de cotações de commodities (Avante-Price).

Perfil técnico consolidado:
- eSocial: envio real de eventos trabalhistas (S-2500, S-2501, S-2555, S-1200, S-1210, S-5001, S-5002, S-5003) via SOAP com certificado digital A1
- Automação de folha de pagamento e inteligência de rubricas
- Integração com e-CAC, SERPRO, Datajud/CNJ
- Stack principal: Python/FastAPI, React, TypeScript, PostgreSQL, Node.js
- Formação: Engenharia da Computação — FIAP (2020–2025)

---

## Quem é Moraes de Carvalho Advogados Associados

Firma boutique de advocacia tributária, previdenciária e trabalhista, liderada pela advogada Cynthia Moraes de Carvalho. Especializada em:

- Recuperação de créditos tributários (PIS, COFINS, INSS via SPED)
- Parcelamentos federais e REFIS
- Consultoria Zona Franca de Manaus
- Relações governamentais com Receita Federal e PGU
- Processos trabalhistas e envio de eventos eSocial

É no contexto desta firma que o RealPrev e o Easy Social foram criados — dois sistemas proprietários que automatizam integralmente o fluxo de comunicação com o governo federal via eSocial, transformando processos que levavam dias em operações de minutos.

---

## Sistemas em produção (resumo)

### Easy Social
Sistema de automação de folha de pagamento integrado ao eSocial. Foco em inteligência de rubricas, envio automatizado de eventos periódicos (S-1200, S-1210), monitoramento de folha e consulta via e-CAC. Testado em ambiente real com 12.000 funcionários. Clientes pagantes ativos. Redução de até 2.000% no tempo de adequação de rubricas.

### RealPrev
Sistema de envio de eventos trabalhistas ao governo federal (S-2500, S-2501, S-2555). Fluxo completo: cadastro do processo, geração e assinatura digital de XML, transmissão SOAP, rastreabilidade de retorno. Em produção no Moraes de Carvalho. Registro INPI em preparação.

### AvanteHub
Plataforma web de gestão agrícola. Cotações de commodities em tempo real (café, cacau, soja, milho, dólar), análise de solo, gestão de fazendas, produção e vendas. Integrado ao app mobile NavigationV2 para coleta de dados em campo com GPS.

### Avante-Price
Terminal de cotações de commodities agrícolas brasileiras estilo Bloomberg. Dados do CCCV e CEPEA/ESALQ. Gráficos TradingView com cache PostgreSQL.

---

## Estrutura deste repositório

```
xAI/
├── BOAS_VINDAS.md          ← Este arquivo (enviado a cada projeto como primeira mensagem)
├── DIARIO.md               ← Registro cronológico de decisões e progressos
├── README.md               ← Visão geral do repo
├── comunicacao/            ← Canal de comunicação entre xAI e cada projeto
│   ├── Easy-Social/
│   │   ├── Enviada/        ← Mensagens do xAI para o Easy Social
│   │   └── Recebida/       ← Respostas do Easy Social para o xAI
│   ├── RealPrev/
│   │   ├── Enviada/
│   │   └── Recebida/
│   ├── AvanteHub/
│   │   ├── Enviada/
│   │   └── Recebida/
│   └── Coffee-Candles/
│       ├── Enviada/
│       └── Recebida/
├── carreira/               ← Currículo, análise de carreira, entrevistas
├── linkedin/               ← Estratégia, textos e posicionamento LinkedIn
├── projetos/               ← Documentação técnica de cada projeto
├── tarefas/                ← Backlog de tarefas
├── docs/                   ← Referências e documentação geral
└── dashboard/              ← Código do dashboard Next.js
```

**Nos repos dos projetos**, a estrutura é mais simples — só o canal com o xAI:
```
[projeto]/
└── comunicacao/
    ├── Enviada/    ← mensagens que o projeto envia ao xAI
    └── Recebida/   ← mensagens recebidas do xAI (incluindo este BOAS_VINDAS)
```

---

## Canal de comunicação entre IA e projetos

Para manter alinhamento entre este repositório central e cada projeto, usamos uma pasta de comunicação estruturada. Cada mensagem é um arquivo Markdown com o padrão:

```
NOME_DO_ASSUNTO-DD-MM-AAAA-HHhMM.md
```

Exemplo:
```
REALPREV_STATUS_EVENTOS-04-05-2026-14h30.md
```

Mensagens **enviadas** (daqui para os projetos) ficam em `comunicacao/Enviada/`.
Mensagens **recebidas** (dos projetos para cá) ficam em `comunicacao/Recebida/`.

O mesmo arquivo deve ser espelhado no repo do projeto correspondente, na pasta `comunicacao/` dele.

---

## Projetos com canal de comunicação ativo

| Projeto | Repo | Status |
|---------|------|--------|
| Easy Social | Easy-Social / Easy-Social-V2 | 🟢 Ativo |
| RealPrev | xandejpeg/Projeto | 🟢 Ativo |
| AvanteHub | iago1409/AvanteHub | 🟢 Ativo |
| Coffee Candles | ccv1 / coffee-candles-web3-pilot | 🟡 Em avaliação |

> **Nota:** NavigationV2 é parte do ecossistema AvanteHub — sua comunicação está incluída no canal do AvanteHub.

---

*Mantido por GitHub Copilot (Claude Sonnet 4.6) como assistente pessoal do Alessandro Chiarele Filho*
*Última atualização: 04/05/2026*
