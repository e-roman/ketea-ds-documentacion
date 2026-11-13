# Ketea Design System: documentación

Sitio de documentación del sistema de diseño de Ketea: Foundations, Componentes y Patrones. Los previews usan los componentes reales de la tienda, así que lo que se ve acá es lo que se ve en el sitio.

Publicado en https://ketea-doc.emilianoroman.com.ar (Vercel, proyecto `ketea-ds-documentacion`).

## De dónde sale cada cosa

| Qué | Origen | Cómo llega |
| --- | --- | --- |
| Componentes y patrones (`@shop/*`) | repo [`ketea-tienda-spike`](https://github.com/e-roman/ketea-tienda-spike), rama `main` | carpeta hermana `../ketea-tienda-spike`; en el build la clona `scripts/fetch-shop.mjs` (el repo es público: no hace falta token) |
| Tokens (`@ketea/tokens`) | repo [`ketea-design-tokens`](https://github.com/e-roman/ketea-design-tokens) | dependencia de `package.json`; en Vercel `scripts/update-tokens.mjs` instala el tag `vX.Y.Z` más alto |
| Variables de la tienda (semánticas y por componente) | `styles/ketea-theme.css` de la tienda | `scripts/build-tokens.mjs` las junta con los tokens en `.generated/tokens.css` |
| Textos, estructura e ilustraciones de las cards | este repo (`content/`, `lib/`, `public/illustrations/`) | — |

Este proyecto **no modifica** la tienda: solo la lee.

## Desarrollo local

Requisitos: Node 20+, y `ketea-tienda-spike` clonada como carpeta hermana de este repo (si no está, se clona de GitHub).

```
proyectos/
├─ ketea-tienda-spike/
└─ ketea-sytem-docs/   ← este repo
```

```bash
npm install
npm run dev        # http://localhost:3300
```

`npm run dev` primero copia la tienda a `shop/`, copia sus imágenes a `public/`, compila el CSS de la tienda (`public/shop.css`) y arma los tokens (`.generated/tokens.css`).
No dejes corriendo `next dev` y `next start` a la vez sobre la misma carpeta: comparten `.next` y se pisan.

## Cómo se dibujan las vistas

- Cada vista es un componente real de la tienda, renderizado en la misma página (`content/live.tsx`). Su CSS (Tailwind 3, compilado aparte a `public/shop.css`) se carga solo dentro de un shadow root (componente `Isolated` del theme), así no se mezcla con el del theme.
- Los tokens y las fuentes se cargan a nivel documento: sí llegan a los shadow roots.
- Cada pieza lleva el botón «Inspeccionar» y, si tiene `anatomy`, los números sobre la vista real; el inspector rastrea cada valor hasta su token.
- Los links de la tienda no navegan: dentro de la documentación se frenan.

## Sumar una pieza

1. Si es un patrón o componente que solo se muestra en vivo: sumá una entrada en `lib/sb-patterns.ts` (textos, props, cuándo usarlo y cuándo evitarlo) y una función de vista en `STORIES` de `content/live.tsx` (el índice coincide con `shots`); marcá las vistas en `lib/live-stories.ts`.
2. Si lleva una página escrita a mano (como Button o Badge): agregala en `content/` y `lib/own-nav.ts`.
3. Poné su ilustración en `public/illustrations/<grupo>/<slug>.svg`. Aparece sola en el menú, el índice y el buscador.

## Actualización automática (Vercel)

Cada deploy compila con la tienda y los tokens vigentes. Se dispara cuando:

- cambia este repo (push a `main`);
- se publica un tag `v*` en `ketea-design-tokens`. Ese repo tiene el workflow `.github/workflows/redeploy-docs.yml`, que llama a un Deploy Hook de Vercel (secreto `VERCEL_DEPLOY_HOOK`).

Configuración necesaria en Vercel (proyecto `ketea-ds-documentacion`):

- Deploy Hook sobre `main`, que se pega como secreto `VERCEL_DEPLOY_HOOK` en `ketea-design-tokens`.
- Dominio `ketea-doc.emilianoroman.com.ar`.

## Si el build falla

- `fetch-shop: no se pudo clonar ketea-tienda-spike`: sin red o el repo pasó a privado (definí `GH_TOKEN`).
- `Module not found: @shop/...`: la tienda no se copió; revisá las primeras líneas del log (`fetch-shop:`).
- Un tag de tokens nuevo rompió algo: fijá la versión anterior en `package.json` y volvé a desplegar.
