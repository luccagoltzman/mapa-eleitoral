# Mapa Eleitoral

Projeto para campanhas eleitorais, onde o político possa gerir as regiões onde tem votos (quantidades, percentuais e etc.), com a possibilidade de ver um mapa interativo com todas as informações necessárias para ter uma boa prospecção da sua campanha eleitoral.

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool moderna e rápida
- **SCSS** - Pré-processador CSS para estilização avançada

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

- ✅ Mapa interativo com regiões clicáveis
- ✅ Visualização de estatísticas por região
- ✅ Painel de estatísticas gerais
- ✅ Interface responsiva
- ✅ Design moderno e intuitivo

## 🎨 Personalização

As variáveis de cores e estilos podem ser alteradas em `src/styles/_variables.scss`
