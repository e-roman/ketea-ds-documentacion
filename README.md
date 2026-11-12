# Ketea Design System: documentación

Sitio de documentación del sistema de diseño de Ketea: Foundations, Componentes y Patrones.

Publicado en https://ketea-doc.emilianoroman.com.ar (Vercel, proyecto `ketea-ds-documentacion`).

## De dónde sale cada cosa

| Qué | Origen | Cómo llega |
| --- | --- | --- |
| Tokens (`@ketea/tokens`) | repo [`ketea-design-tokens`](https://github.com/e-roman/ketea-design-tokens) | dependencia de `package.json`; en Vercel `scripts/update-tokens.mjs` instala el tag `vX.Y.Z` más alto |
| Componentes y patrones (previews) | Storybook de [`tiendaKetea`](https://github.com/e-roman/tiendaKetea), publicado en Vercel (proyecto `ketea-storybook`) | vistas en línea con el paquete de vistas que se publica dentro del Storybook (`/sb/preview`); iframes a `/sb` solo para las stories de celular y como respaldo; enlace a la story en `SB` (`lib/storybook.ts`) |
| Textos, estructura y datos de cada pieza | este repo (`lib/`, `components/docs/`, `app/`) | — |

Este proyecto **no modifica** la tienda: solo muestra su Storybook y su paquete de vistas. No hace falta clonarla ni ningún token de GitHub.

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
- Las vistas se dibujan **en línea**, sin un iframe de Storybook por vista: `lib/ketea-story.tsx` carga una sola vez el paquete de vistas de la tienda (`mount.js`, `style.css`, `fonts.css`) y monta cada story dentro de un shadow root, con el botón «Inspeccionar». Son las mismas stories y los mismos decoradores que Storybook, así que no hay nada que mantener aparte.
- El CSS responsive responde al ancho de la **ventana**, no al de la caja: en una ventana angosta las vistas se ven en su versión mobile. Por eso las stories de celular (las que llevan `width` en la pieza, por ejemplo 390) siguen en un iframe angosto de Storybook.
- Cuatro piezas siguen con iframe aunque no sean mobile (`IFRAME_ONLY` en `lib/pieces.ts`: `sidebar-cart`, `login-modal`, `discount-methods-modal`, `quick-view`): abren su panel con el JavaScript de Bootstrap (`document.getElementById`, backdrop en el `body`) o con un portal, y eso no funciona dentro de un shadow root. Si una pieza nueva sale vacía en línea, sumala ahí.
- El fondo de las cajas es `--doc-stage` (en `app/layout.tsx`, blanco como la tienda real). Las stories con `play` (por ejemplo abrir el chat con un clic) lo ejecutan igual que Storybook.
- Cada story respeta su `parameters.layout` (centered, padded, fullscreen), igual que Storybook: sin eso un header de ancho completo se encoge.
- Las fuentes (Mulish y la de íconos) se cargan en el documento: un `@font-face` no funciona dentro de un shadow root. La vista espera a las fuentes y a las imágenes antes de mostrarse, y su caja aparece junto con ella, ya con el tamaño final.
- Si el paquete no está disponible (todavía no se desplegó o la story es más nueva que el paquete), la vista cae sola al iframe de Storybook.
- Los contenedores que solo acomodan una story (no son parte del componente) llevan `data-sb-wrapper`, o `style` sin `class`: el inspector los ignora.
- `anatomy` en una pieza dibuja los números sobre la story real. Cada parte lleva un `selector` que tiene que existir en el componente de la tienda; `side` y `pct` ubican el número.
- El inspector (`components/docs/inspector.tsx`, `lib/inspect.ts`) rastrea cada valor hasta su token siguiendo las reglas CSS reales de la story.

## Actualización automática (Vercel)

Cada deploy compila con los tokens vigentes. Se dispara cuando:

- cambia este repo (push a `main`);
- se publica un tag `v*` en `ketea-design-tokens`. Ese repo tiene el workflow `.github/workflows/redeploy-docs.yml`, que llama a un Deploy Hook de Vercel (secreto `VERCEL_DEPLOY_HOOK`).

Las vistas salen del Storybook publicado (el paquete va en `/preview`): cuando cambia la tienda no hace falta redesplegar la docs.

**Orden de despliegue:** primero la tienda (su `build-storybook` ahora también arma y publica el paquete) y después la documentación. Si la documentación sale primero, las vistas usan el iframe de respaldo hasta que el Storybook se actualice.

Configuración necesaria en Vercel (proyecto `ketea-ds-documentacion`):

- Deploy Hook sobre `main`, que se pega como secreto `VERCEL_DEPLOY_HOOK` en `ketea-design-tokens`.
- Dominio `ketea-doc.emilianoroman.com.ar`.

## Si algo falla

- **Una vista queda en blanco o muestra «No Preview»:** la story no existe en el Storybook publicado. Publicá primero la tienda y esperá el deploy de `ketea-storybook`.
- **Las vistas salen con iframe en vez de en línea:** `/sb/preview/mount.js` no responde. Revisá que el deploy de `ketea-storybook` haya corrido `npm run build-storybook` (arma el paquete y lo copia a `storybook-static/preview`).
- **Probar un paquete local:** en la tienda `npm run build-preview`, copiar `dist-preview` a `public/ketea-preview` y arrancar la documentación con `NEXT_PUBLIC_KETEA_PREVIEW=/ketea-preview` (por ejemplo en `.env.local`).
- **Un contenedor de la story se puede inspeccionar:** agregale `data-sb-wrapper` en la story.
- **Un tag nuevo de tokens rompió algo:** fijá la versión anterior en `package.json` y volvé a desplegar.
- **Una story nueva no aparece:** revisá que el deploy de `ketea-storybook` en Vercel haya terminado.

## Estructura

- `app/`: rutas (Empezar, Foundations, Componentes, Patrones).
- `components/docs/`: UI propia de la documentación, armada sobre shadcn/ui (`components/ui/`).
- `lib/`: navegación, tokens, índice de búsqueda y datos de cada pieza.
- `scripts/update-tokens.mjs`: instala la última versión de los tokens en CI.
