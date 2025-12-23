# Mapa Eleitoral

Projeto para campanhas eleitorais, onde o político possa gerir as regiões onde tem votos (quantidades, percentuais e etc.), com a possibilidade de ver um mapa interativo com todas as informações necessárias para ter uma boa prospecção da sua campanha eleitoral.

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool moderna e rápida
- **SCSS** - Pré-processador CSS para estilização avançada
- **React Leaflet** - Biblioteca para mapas interativos
- **Leaflet** - Biblioteca de mapas open-source

## 📦 Instalação

1. Clone o repositório ou navegue até a pasta do projeto

2. Instale as dependências:
```bash
npm install
```

## 🛠️ Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 🏗️ Build

Para criar uma build de produção:

```bash
npm run build
```

Para visualizar a build de produção:

```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
mapa-eleitoral/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Header/         # Cabeçalho da aplicação
│   │   ├── MapaInterativo/ # Componente do mapa
│   │   └── PainelEstatisticas/ # Painel de estatísticas
│   ├── styles/             # Arquivos SCSS globais
│   │   ├── _variables.scss # Variáveis SCSS
│   │   ├── _reset.scss     # Reset CSS
│   │   ├── _base.scss      # Estilos base
│   │   └── main.scss       # Arquivo principal de estilos
│   ├── App.jsx             # Componente principal
│   ├── App.scss            # Estilos do App
│   └── main.jsx            # Ponto de entrada
├── index.html              # HTML principal
├── vite.config.js          # Configuração do Vite
└── package.json            # Dependências do projeto
```

## ✨ Funcionalidades

- ✅ **Mapa Real e Interativo** - Mapa geográfico real usando OpenStreetMap
- ✅ **Zonas Eleitorais** - Visualização de zonas eleitorais com marcadores e círculos
- ✅ **Informações Detalhadas** - Popups com dados completos de cada zona (votos, eleitores, percentual, seções)
- ✅ **Código de Cores** - Sistema de cores baseado no percentual de votos:
  - 🟢 Verde (≥70%) - Excelente
  - 🔵 Azul (60-69%) - Bom
  - 🟠 Laranja (50-59%) - Regular
  - 🔴 Vermelho (<50%) - Atenção
- ✅ **Painel de Estatísticas** - Detalhes completos da zona selecionada
- ✅ **Zoom e Navegação** - Controles de zoom e navegação no mapa
- ✅ **Responsivo** - Interface adaptável para diferentes tamanhos de tela
- ✅ **Legenda Interativa** - Legenda explicativa do sistema de cores

## 🎨 Personalização

As variáveis de cores e estilos podem ser alteradas em `src/styles/_variables.scss`
