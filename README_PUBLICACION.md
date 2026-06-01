# La Divina Providencia - sitio estático v2

Este paquete contiene una landing home y una página de menú digital listas para publicar en Cloudflare Pages y luego importar a Figma con html.to.design.

## Archivos principales

- `index.html`: landing home.
- `menu.html`: menú digital completo.
- `styles.css`: estilos responsive desktop/mobile.
- `app.js`: renderiza categorías, carruseles del home, productos, enlaces y acciones.
- `data/menu-data.js`: datos editables del menú, precios, categorías, imágenes y enlaces.
- `assets/logo.png`: logo final.
- `assets/product-placeholder.svg`: placeholder de foto para productos.
- `assets/hero-placeholder.svg`: placeholder de hero.
- `assets/experience-placeholder.svg`: placeholder de experiencia/mirador.
- `assets/products/`: carpeta donde deben ir las fotos reales de platos.

## Qué incluye esta versión

- Home simplificado tipo landing.
- Acceso directo a WhatsApp.
- Acceso directo a carta completa.
- 4 categorías principales: Desayunos, Para compartir, Parrilla y tradición, Bebidas y licores.
- Carruseles/cuadros visuales de productos en el home.
- Página `menu.html` con todos los productos de la carta cargados desde el Excel.
- Espacio de foto para cada producto.
- Diseño responsive para mobile.

## Para cambiar WhatsApp

Abre `data/menu-data.js` y cambia:

```js
whatsappNumber: "573001234567"
```

por el número real en formato internacional, sin `+`, espacios ni guiones.

También puedes cambiar el mensaje inicial en:

```js
whatsappText: "Hola, quiero hacer una reserva en La Divina Providencia."
```

## Para cambiar fotos de productos

1. Sube las fotos a `assets/products/`.
2. Abre `data/menu-data.js`.
3. Busca el producto.
4. Llena el campo `image`, por ejemplo:

```js
image: "assets/products/empanadas.webp"
```

Mientras el campo esté vacío, el sitio muestra `assets/product-placeholder.svg`.

## Para actualizar GitHub + Cloudflare

1. Reemplaza los archivos actuales del repositorio por los de este paquete.
2. Haz commit y push a GitHub.
3. Cloudflare Pages desplegará automáticamente el nuevo sitio.
4. Luego importa en Figma con html.to.design:
   - Home: `https://tu-proyecto.pages.dev/`
   - Menú: `https://tu-proyecto.pages.dev/menu.html`

## Importar en Figma

Para tener dos mesas de trabajo:

1. Importa primero el home con viewport desktop, por ejemplo 1440 px.
2. Importa luego `menu.html` con el mismo viewport.
3. Repite con viewport 390 px si quieres también versión mobile.

