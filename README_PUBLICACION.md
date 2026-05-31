# La Divina Providencia - sitio estático

Este paquete contiene una landing home y una página de menú digital listas para publicar como sitio estático gratuito.

## Archivos principales

- `index.html`: home landing.
- `menu.html`: menú completo.
- `styles.css`: estilos responsive.
- `app.js`: renderiza categorías, productos, enlaces y acciones.
- `data/menu-data.js`: datos editables del menú, precios, categorías, imágenes y enlaces.
- `assets/logo.png`: logo final.
- `assets/product-placeholder.svg`: placeholder de foto para productos.
- `assets/hero-placeholder.svg`: placeholder de fondo / hero.
- `assets/experience-placeholder.svg`: placeholder de experiencia / mirador.

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

Mientras el campo esté vacío, el sitio muestra el placeholder.

## Para publicar gratis en Cloudflare Pages

1. Crea un repositorio en GitHub.
2. Sube todos los archivos de esta carpeta.
3. En Cloudflare Pages, crea un proyecto nuevo conectado a ese repositorio.
4. En configuración de build deja:
   - Framework preset: None
   - Build command: vacío
   - Output directory: `/` o vacío, según te lo pida Cloudflare.
5. Publica.

El sitio quedará disponible en un dominio gratuito tipo:

`https://nombre-del-proyecto.pages.dev`

## Notas

- No se incluyeron horarios porque el diseño final indicado no los debe mostrar.
- La dirección y enlace de Google Maps ya están cargados.
- Solo se incluyó Instagram como red social.
- Los productos sin precio en el Excel quedaron como `Consultar`.
