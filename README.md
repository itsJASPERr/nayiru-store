# NAYIRU

Catálogo artesanal en español, generado con Astro. Las fichas y fotos públicas se generan desde el repositorio. La búsqueda, los filtros y el orden funcionan en el navegador. Las consultas abren WhatsApp al +54 353 656 9598. Cada ficha incluye su nombre en el mensaje sugerido.

## Desarrollo

Requiere Node.js 24.

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

En desarrollo, abre `http://localhost:4321/nayiru-store/`. El resultado de producción se escribe en `dist/`.

## Editar piezas en Pages CMS

1. Abre **Administrar catálogo** en el pie de página e inicia sesión con GitHub. Si Pages CMS todavía necesita acceso, instala su GitHub App para el repositorio `itsJASPERr/nayiru-store`. [Editor de piezas](https://app.pagescms.org/itsJASPERr/nayiru-store/main/collection/products)
2. Abre la rama `main` y selecciona **Piezas**. El editor toma los campos de [`.pages.yml`](.pages.yml). Cada ficha se guarda como un archivo JSON en [`content/products/`](content/products/) y las fotos se guardan en `media/products/`.
3. Guarda como **Borrador** mientras preparas la ficha y cambia el estado a **Publicada** cuando esté lista. El primer producto publicado sustituye la selección de referencia editorial. El compilado incluye las fichas visibles y las fotos que utilizan.
4. Conserva el identificador de URL de una pieza publicada para que siga funcionando su enlace. Las consultas usan el número configurado en [`src/lib/site.ts`](src/lib/site.ts).

## GitHub Pages

El sitio usa la ruta de proyecto `/nayiru-store/`. Cuando GitHub Pages esté disponible para el repositorio, configura **Settings → Pages → Source → GitHub Actions** y habilita Actions. El workflow **GitHub Pages** valida y construye el sitio con cada cambio en `main`, incluidos los guardados en Pages CMS. El despliegue publica el contenido de `dist/`.

GitHub Pages requiere un plan compatible para un repositorio privado. El sitio publicado en GitHub Pages es público. El repositorio puede conservar su visibilidad privada con un plan compatible. [Documentación de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

El mapa del sitio reúne la portada, el catálogo y las fichas visibles. [Sitemap XML](https://itsjasperr.github.io/nayiru-store/sitemap.xml)
