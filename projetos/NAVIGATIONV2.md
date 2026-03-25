# NavigationV2

## O que é
Aplicativo mobile para técnicos de campo realizarem coleta de dados de solo em fazendas. Complementar ao AvanteHub — recebe sessões de coleta e devolve resultados sincronizados.

## Problema que resolve
Técnicos usavam papel, planilhas ou processos manuais para registrar pontos de coleta de solo. Sem rastreabilidade, sem validação, sem garantia de que o ponto correto foi visitado. NavigationV2 padroniza o processo com GPS, validação automática e sincronização segura.

## Como funciona
1. Gestor cria sessão de coleta no AvanteHub com pontos georreferenciados
2. Técnico escaneia QR code ou recebe link com dados da sessão
3. App carrega pontos no mapa e guia o técnico via GPS/bússola
4. Ao chegar no raio configurado do ponto, técnico confirma coleta (com foto se exigido)
5. Se necessário, pode pular ponto selecionando motivo padronizado
6. Ao finalizar, dados são sincronizados automaticamente para o AvanteHub via API JWT

## Arquitetura
- **Framework:** React Native 0.81, Expo 54, Expo Router 6
- **Linguagem:** TypeScript 5.9
- **Estado:** Zustand 5
- **UI:** Lucide React Native, Expo Linear Gradient, React Native Reanimated
- **Mapas:** React Native Maps, Expo Location
- **Camera:** Expo Camera, Expo Image Picker
- **Storage:** AsyncStorage
- **Navegação:** Expo Router (file-based routing)
- **Validação:** Zod 3
- **Backend:** Supabase JS SDK
- **Build:** Babel, Metro

## Estrutura do Projeto
```
app/
├── index.tsx           # Tela inicial — input de JSON/QR, validação
├── navigate.tsx        # Tela de navegação GPS — guia até pontos
├── scan.tsx            # Scanner QR code
├── summary.tsx         # Resumo da coleta — sync com AvanteHub
├── +not-found.tsx      # 404
└── _layout.tsx         # Layout raiz

lib/
├── api.ts              # syncToAvanteHub(), fetchSessionFromLink()
├── types.ts            # InputSession, OutputFormat, SkipReason, InternalPoint
├── validation.ts       # Validação de entrada (JSON/QR)
├── geo.ts              # Haversine, bearingBetween, deltaHeading
├── store.ts            # Zustand store (estado global)
├── MapView.tsx         # Componente mapa (nativo)
├── MapView.web.tsx     # Componente mapa (web)
├── photoQueue.ts       # Fila de upload de fotos
└── export.ts           # Exportação de dados

hooks/                  # Hooks customizados
assets/                 # Recursos estáticos
comunicacao/            # Documentação de comunicação/protocolo
```

## Tipos e Integração
```typescript
interface InputSession {
  id: string;           // UUID da sessão
  farmId: string;       // UUID da fazenda
  farmName: string;     // Nome da fazenda
  farmCity?: string;
  farmState?: string;
  workerId: string;     // Código do técnico
  workerName: string;
  sessionType: 'first_collection' | 'second_sample' | 're_collection';
  createdAt: string;
  expiresAt: string;
}

interface InputSettings {
  arrivalRadius: number;    // Metros para considerar "chegou"
  allowSkip: boolean;       // Permite pular pontos
  requirePhoto: boolean;    // Exige foto para confirmar
  skipReasons: SkipReason[];
}

interface SkipReason {
  id: string;
  label: string;
}
```

## API de Sincronização
- `syncToAvanteHub(syncUrl, syncToken, data)` — POST com JWT para enviar resultados
- `fetchSessionFromLink(url)` — GET para baixar dados da sessão
- Tratamento de erros: 400 (dados inválidos), 401 (token expirado), 404 (sessão não encontrada), 409 (já sincronizado), 410 (sessão cancelada)

## Funcionalidades Geográficas
- **Haversine:** cálculo de distância entre coordenadas
- **Bearing:** direção entre dois pontos
- **Delta Heading:** diferença angular para bússola
- **Raio de chegada:** configurável por sessão

## Repositório
- **URL:** https://github.com/iago1409/navigationV2
- **Privado:** Sim
- **Linguagem principal:** TypeScript
- **Criado:** Outubro 2025
- **Última atualização:** Janeiro 2026
- **165 objetos** no repositório
