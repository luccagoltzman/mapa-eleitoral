# Assets - Recursos Estáticos

Esta pasta é para armazenar imagens e outros recursos estáticos que serão importados diretamente nos componentes React.

## Como usar:

### Importar imagens nos componentes:

```jsx
import logo from '../assets/logo.png'
import banner from '../assets/banner.jpg'

function MeuComponente() {
  return (
    <div>
      <img src={logo} alt="Logo" />
      <img src={banner} alt="Banner" />
    </div>
  )
}
```

### Estrutura recomendada:

```
src/assets/
  ├── images/          # Imagens gerais
  │   ├── logos/
  │   ├── banners/
  │   └── icons/
  ├── photos/          # Fotos
  └── graphics/        # Gráficos e ilustrações
```

## Formatos suportados:

- PNG
- JPG/JPEG
- SVG
- GIF
- WebP

## Vantagens:

- ✅ Processamento automático pelo Vite
- ✅ Otimização automática
- ✅ Hash nos nomes para cache
- ✅ Verificação de existência em build time

