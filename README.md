# Ketea Design System: documentación

Sitio de documentación del sistema de diseño de Ketea: Foundations, Componentes y Patrones.

Publicado en https://ketea-doc.emilianoroman.com.ar (Vercel, proyecto `ketea-ds-documentacion`).

## De dónde sale cada cosa

| Qué | Origen | Cómo llega |
| --- | --- | --- |
| Tokens (`@ketea/tokens`) | repo [`ketea-design-tokens`](https://github.com/e-roman/ketea-design-tokens) | dependencia de `package.json`; en Vercel `scripts/update-tokens.mjs` instala el tag `vX.Y.Z` más alto |
| Componentes y patrones (previews) | Storybook de [`tiendaKetea`](https://github.com/e-roman/tiendaKetea), publicado en Vercel (proyecto `ketea-storybook`) | iframes en vivo a `/sb` (rewrite hacia `SB_ORIGIN`) y enlace a la story en `SB` (`lib/storybook.ts`) |
| Textos, estructura y datos de cada pieza | este repo (`lib/`, `components/docs/`, `app/`) | — |

Este proyecto **no modifica** la tienda: solo muestra su Storybook. No hace falta clonarla ni ningún token de GitHub.

## Desarrollo local

Requisitos: Node 20+.

```bash
npm install
npm run dev        # http://localhost:3300
```

No dejes corriendo `next dev` y `next start` a la vez sobre la misma carpeta: comparten `.next` y se pisan.

## Sumar un componente o patrón

1. En la tienda, escribir la story con el título `Components/<Nombre>` o `Patterns/<Grupo>/<Variante>` y publicarla con un push a `main` (Vercel republica Storybook).
2. Agregar una entrada en `lib/pieces.ts`: slug, título, descripción, archivo, id de las stories, props, cuándo usarlo y cuándo evitarlo. Los ids de las stories salen del título: `Components/Product card` + `With discount` → `components-product-card--with-discount`.
3. Aparece solo en el menú, el índice y el buscador.

## Vistas en vivo, anatomía e inspector

- `next.config.ts` sirve el Storybook publicado bajo `/sb` (y sus imágenes bajo `/assets`) con un rewrite hacia `SB_ORIGIN` (por defecto `https://ketea-storybook.vercel.app`). Así los iframes son del mismo origen y la documentación puede leer su contenido. Para probar con un Storybook local: `SB_ORIGIN=http://localhost:6006 npm run build`.
- Todas las vistas de una pieza se muestran en vivo, con el botón «Inspeccionar». Cada bloque usa un solo iframe y cambia de story por el canal de Storybook, sin recargar; conserva el alto y muestra un loader mientras carga.
- Las stories de escritorio se dibujan a 1024 px de ancho (Bootstrap decide la versión mobile o desktop por el ancho del iframe) y se escalan al ancho disponible. Las de celular llevan `width` en la pieza (por ejemplo 390).
- Los contenedores que solo acomodan una story (no son parte del componente) llevan `data-sb-wrapper`, o `style` sin `class`: el inspector los ignora.
- `anatomy` en una pieza dibuja los números sobre la story real. Cada parte lleva un `selector` que tiene que existir en el componente de la tienda; `side` y `pct` ubican el número.
- El inspector (`components/docs/inspector.tsx`, `lib/inspect.ts`) rastrea cada valor hasta su token siguiendo las reglas CSS reales de la story.

## Actualización automática (Vercel)

Cada deploy compila con los tokens vigentes. Se dispara cuando:

- cambia este repo (push a `main`);
- se publica un tag `v*` en `ketea-design-tokens`. Ese repo tiene el workflow `.github/workflows/redeploy-docs.yml`, que llama a un Deploy Hook de Vercel (secreto `VERCEL_DEPLOY_HOOK`).

Los previews son iframes en vivo: cuando cambia el Storybook de la tienda no hace falta redesplegar la docs.

Configuración necesaria en Vercel (proyecto `ketea-ds-documentacion`):

- Deploy Hook sobre `main`, que se pega como secreto `VERCEL_DEPLOY_HOOK` en `ketea-design-tokens`.
- Dominio `ketea-doc.emilianoroman.com.ar`.

## Si algo falla

- **Una vista queda en blanco o muestra «No Preview»:** la story no existe en el Storybook publicado. Publicá primero la tienda y esperá el deploy de `ketea-storybook`.
- **Un contenedor de la story se puede inspeccionar:** agregale `data-sb-wrapper` en la story.
- **Un tag nuevo de tokens rompió algo:** fijá la versión anterior en `package.json` y volvé a desplegar.
- **Una story nueva no aparece:** revisá que el deploy de `ketea-storybook` en Vercel haya terminado.

## Estructura

- `app/`: rutas (Empezar, Foundations, Componentes, Patrones).
- `components/docs/`: UI propia de la documentación, armada sobre shadcn/ui (`components/ui/`).
- `lib/`: navegación, tokens, índice de búsqueda y datos de cada pieza.
- `scripts/update-tokens.mjs`: instala la última versión de los tokens en CI.
