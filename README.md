# NAYIRU

Storefront artesanal en español. El proyecto conserva la estructura de Next.js, Tailwind CSS, TypeScript y next-intl de la tienda de origen.

## Desarrollo local

```sh
npm ci
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). `/es/shop` tiene categorías, búsqueda y orden. Cada pieza tiene una ficha en `/es/shop/{handle}`.

```sh
npm run lint
npm run build
```

## Catálogo y contacto

- [products.json](src/features/nayiru/products.json) contiene las piezas aprobadas para publicar. Agrega objetos con `handle` único, `title`, `category`, `description`, `story` e `image` con `src` local en `public/` y texto `alt`. Las categorías válidas están en [catalog.ts](src/features/nayiru/catalog.ts). También se pueden definir `tags`, `materials`, `origin`, `price` (con `amount` decimal en texto y `currencyCode` ISO) y `available`. Usa únicamente datos y fotos aprobados.
- Con `products.json` vacío, la tienda muestra referencias editoriales de los bocetos originales. Esas entradas viven en [editorial.json](src/features/nayiru/editorial.json). Al agregar las primeras piezas aprobadas, el catálogo pasa a mostrar esas piezas.
- Opcionalmente, configura `NAYIRU_WHATSAPP_NUMBER` en `.env.local` con el número público de NAYIRU en formato internacional, solo dígitos. El enlace general aparece en la navegación. Las fichas publicadas admiten consultas por pieza cuando está disponible. Reinicia el servidor de desarrollo o vuelve a compilar después de cambiar la configuración.

Las imágenes editoriales de `public/nayiru/` se extrajeron de «Colección artesanal NAYIRU en línea.png» y «Catálogo de artesanía amazónica NAYIRU.png». Los logotipos derivan de las dos variantes originales «Minimalist gold sun and mountain logo».

[Documentación de la arquitectura heredada](docs/README.md)
