# 3D — Configurador CAD de Playgrounds

## O que é
Configurador CAD 3D para montagem de playgrounds customizados. Permite selecionar componentes, montar layouts e gerar orçamentos com IPI e NCM.

## Problema que resolve
Fabricantes de playground tinham processo manual de orçamento — cliente pedia por telefone, engenheiro desenhava, calculava preços manualmente. Configurador 3D automatiza visualização e orçamento em tempo real.

## Como funciona
1. Usuário seleciona componentes de playground em catálogo 3D
2. Arrasta e posiciona no espaço 3D interativo
3. Sistema calcula orçamento automaticamente (preço + IPI por NCM)
4. Visualização 3D em tempo real com rotação e zoom
5. Exporta orçamento detalhado com códigos NCM e valores

## Especificações Técnicas
- **Renderização 3D:** React Three Fiber + Three.js
- **Componentes:** 30+ peças mapeadas com preços e NCM
- **Orçamento:** Cálculo automático com IPI por NCM
- **Interface:** React, TypeScript

## Arquitetura
```
Configurador 3D
├── Catálogo de Componentes (30+)
│   ├── Escorregadores
│   ├── Balanços
│   ├── Trepa-trepa
│   ├── Plataformas
│   ├── Conectores
│   └── Acessórios
├── Motor 3D (React Three Fiber / Three.js)
│   ├── Renderização WebGL
│   ├── Drag & drop no espaço 3D
│   ├── Câmera orbital
│   └── Iluminação
├── Motor de Orçamento
│   ├── Tabela NCM por componente
│   ├── Cálculo IPI automático
│   ├── Preço unitário + quantidade
│   └── Total com impostos
└── Exportação
    └── Orçamento PDF/planilha
```

## Processo
Levantamento de requisitos direto com fabricante de playgrounds. Mapeamento de 30+ componentes reais com códigos NCM e preços. Definição do fluxo de orçamento incluindo IPI.

## Stack
- React Three Fiber, Three.js
- React, TypeScript
