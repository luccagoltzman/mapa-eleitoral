# Assets Públicos

Esta pasta é para armazenar imagens e recursos que precisam ser acessados diretamente via URL.

## Como usar:

### Acessar imagens via URL:

```jsx
function MeuComponente() {
  return (
    <div>
      {/* Acessa diretamente via URL */}
      <img src="/assets/logo.png" alt="Logo" />
      <img src="/assets/banner.jpg" alt="Banner" />
    </div>
  )
}
```

### Ou em HTML:

```html
<img src="/assets/imagem.jpg" alt="Imagem" />
```

## Quando usar esta pasta:

- ✅ Imagens que precisam de URL fixa
- ✅ Favicons e ícones do site
- ✅ Imagens referenciadas em arquivos estáticos
- ✅ Imagens compartilhadas entre múltiplas páginas
- ✅ Arquivos que não precisam de processamento

## Diferença entre `src/assets` e `public/assets`:

- **`src/assets`**: Imagens importadas nos componentes (processadas pelo Vite)
- **`public/assets`**: Imagens acessadas via URL direta (não processadas)

## Estrutura recomendada:

```
public/assets/
  ├── images/          # Imagens públicas
  ├── favicons/        # Favicons
  └── shared/          # Recursos compartilhados
```

