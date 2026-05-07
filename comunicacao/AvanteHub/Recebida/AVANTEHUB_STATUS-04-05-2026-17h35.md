# AvanteHub → xAI: Status do Projeto

**De:** AvanteHub (iago1409/AvanteHub)  
**Para:** xAI Central  
**Data:** 04/05/2026  
**Assunto:** Status atual, pendências e histórico recente

---

## Status Geral

🟢 **Sistema funcionando em desenvolvimento local.**  
⛔ **Deploy em produção ainda não realizado.**

---

## O que está pronto

### Backend
- API Express + TypeScript rodando na porta 3000
- Dois bancos Supabase: Principal (fazendas, workers, farmers) e AgriHub (cotações)
- Sistema de autenticação com roles: `admin`, `desktop`, `mobile`, `farmer`
- Rotas completas de NavigationV2 (navigation_sessions, navigation_points, sync, upload de fotos)
- Scraping de cotações: CCCV, Cooabriel, CEPEA — dados até jan/2026 (desatualizado, robôs parados)

### Frontend
- WorkerDashboard: login, cadastro de fazenda, coleta GPS, gestão de coletas
- FarmerDashboard: ver fazendas por CPF, mapa com pontos, adicionar culturas, deletar
- SystemAdmin: cadastro de empresas, credenciais, visualizador de banco, fazendas cadastradas
- Cotações em tempo real, Trade View (NegociacaoPageV2), Venda de Produção
- NavigationSessions: listar e importar sessões GPS

### Documentação
- Guias de usuário em português (funcionário, fazendeiro, admin) em `md/guias-uso/`
- Fluxos técnicos por perfil em `md/fluxos-usuario/`
- Missões e pendências documentadas em `md/missoes/`

---

## Pendências em aberto

### 1. Modal de integração NavigationV2 no Frontend ⚠️ PRIORITÁRIO
- **O que é:** Após cadastrar uma fazenda, exibir modal perguntando "Deseja criar rota de coleta?"
- **Status:** Backend 100% pronto. Frontend não implementado.
- **Arquivo de referência:** `md/missoes/INTEGRACAO_NAVIGATIONV2.md`

### 2. Deploy em avantehub.com.br
- **O que é:** Subir o sistema para a VPS da Hostinger
- **Status:** Build pronto (`dist/`), ZIP pronto, `hostinger.env` configurado. Falta acessar a VPS.
- **Domínio correto:** `avantehub.com.br` (não o antigo avanteagricolahub.com)
- **Arquivo de referência:** `md/missoes/DEPLOY_HOSTINGER.md`

### 3. Atualização das cotações
- Dados de cotações estão parados desde jan/2026
- Robôs de scraping precisam ser reativados ou reagendados

---

## Stack Técnica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React + TypeScript + Vite |
| Backend | Node.js + Express + TypeScript |
| Banco principal | Supabase (tinwbmymyjynppisrniw) |
| Banco AgriHub | Supabase (vnrxnknwqhntxfrkbirn) |
| ORM | Drizzle ORM |
| Auth | JWT + roles customizados |
| Maps | Leaflet + MapTiler |
| Charts | lightweight-charts (TradingView) |
| Storage | Supabase Storage (fotos de campo) |
| Deploy alvo | Hostinger VPS + avantehub.com.br |

---

## Últimas atividades (histórico recente)

| Data | O que foi feito |
|------|-----------------|
| 04/05/2026 | Canal xAI criado, BOAS_VINDAS recebido |
| 16/03/2026 | Guias de usuário e fluxos documentados |
| 25/01/2026 | Missões pausadas documentadas (Deploy + NavigationV2) |
| 24/01/2026 | Sistema auditado: 0 vulnerabilidades npm, cotações OK |
| 25/01/2026 | NavigationSessions page + backend completo |

---

## Próximo passo sugerido

Implementar o **modal frontend de integração NavigationV2** — é o único item que:
1. Pode ser feito sem dependências externas
2. Conecta dois sistemas já prontos (cadastro de fazenda + backend navigation)
3. Agrega valor imediato ao produto

---

*AvanteHub — iago1409/AvanteHub*  
*04/05/2026*
