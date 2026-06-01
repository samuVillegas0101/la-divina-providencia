# La Divina Providencia - versión estática completa para GitHub + Cloudflare

Esta versión NO depende de JavaScript para mostrar productos.
Los productos están construidos directamente en `index.html` y `menu.html`.

## Archivos principales

- `index.html`: landing home.
- `menu.html`: menú completo con 163 productos.
- `styles.css`: estilos responsive.
- `assets/logo.png`: logo.
- `assets/product-placeholder.svg`: imagen temporal cuando todavía no existe foto real.
- `assets/products/`: carpeta para subir las fotos reales de producto.

## Cómo reemplazar fotos

Cada producto ya apunta a una ruta única:

```html
assets/products/nombre-del-producto.webp
```

Mientras ese archivo no exista, se muestra automáticamente `assets/product-placeholder.svg`.

Para activar una foto, sube el archivo con el nombre exacto indicado en `README_PRODUCT_IMAGES.txt`.
Ejemplo:

```text
assets/products/empanadas.webp
```

No tienes que tocar el HTML para poner las fotos si respetas esos nombres.

## Publicar en Cloudflare

Sube estos archivos en la raíz del repositorio de GitHub, no dentro de otra carpeta:

```text
index.html
menu.html
styles.css
assets/
```

Cloudflare Pages:
- Framework preset: None
- Build command: vacío
- Build output directory: .

## WhatsApp

El número actual es placeholder: `573001234567`.
Cambia `573001234567` por el número real buscando en `index.html` y `menu.html`.
