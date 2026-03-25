# RealPrev

## O que é
Sistema para envio de eventos trabalhistas (eSocial S-2500/S-2501/S-2555) diretamente ao governo federal. Automatiza processos previdenciários de escritórios de advocacia.

## Problema que resolve
Advogados precisavam enviar eventos eSocial manualmente — processo burocrático, repetitivo e sujeito a erros. RealPrev automatiza a geração e transmissão de XML SOAP com certificado digital A1.

## Como funciona
1. Advogado cadastra processo trabalhista com dados do reclamante
2. Sistema gera XML nos formatos S-2500 (processo trabalhista), S-2501 (contribuições) e S-2555 (benefícios)
3. Assina digitalmente com certificado A1
4. Transmite via SOAP para o governo federal
5. Registra resposta e status de cada envio

## Arquitetura
- **Backend:** Python (FastAPI), lógica de geração XML eSocial
- **Frontend:** JavaScript (React), interface de cadastro e acompanhamento
- **Estilização:** CSS
- **Scripts:** PowerShell (automação de deploy), Shell, Batchfile
- **Integração:** SOAP com certificado digital A1
- **Deploy:** Servidor próprio

## Especificações Técnicas
- **Eventos eSocial:** S-2500 (Processo Trabalhista), S-2501 (Informações de Contribuições Decorrentes de Processo Trabalhista), S-2555 (Benefícios Atos Judiciais)
- **Comunicação:** SOAP/XML com assinatura digital
- **Certificado:** A1 (arquivo .pfx)
- **Validação:** Schemas XSD do eSocial

## Repositório
- **URL:** https://github.com/AlessandroChiareleDev/realprev-deploy
- **Privado:** Não
- **Linguagem principal:** Python (1.8MB), JavaScript (1.4MB), CSS (187KB)
- **Criado:** Março 2026
- **Disk usage:** 43MB
