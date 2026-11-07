# Ketea Design System: documentación

Sitio de documentación del sistema de diseño de Ketea: Foundations, Componentes y Patrones.

Publicado en https://ketea-doc.emilianoroman.com.ar (Vercel, proyecto `ketea-ds-documentacion`).

## De dónde sale cada cosa

| Qué | Origen | Cómo llega |
| --- | --- | --- |
| Tokens (`@ketea/tokens`) | repo [`ketea-design-tokens`](https://github.com/e-roman/ketea-design-tokens) | dependencia de `package.json`; en Vercel `scripts/update-tokens.mjs` instala el tag `vX.Y.Z` más alto |
| Componentes y patrones (previews) | Storybook de [`tiendaKetea`](https://github.com/e-roman/tiendaKetea), publicado en Vercel (proyecto `ketea-storybook`) | iframes a la URL de `SB` en `lib/storybook.ts` |
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

## Actualización automática (Vercel)

Cada deploy compila con los tokens vigentes. Se dispara cuando:

- cambia este repo (push a `main`);
- se publica un tag `v*` en `ketea-design-tokens`. Ese repo tiene el workflow `.github/workflows/redeploy-docs.yml`, que llama a un Deploy Hook de Vercel (secreto `VERCEL_DEPLOY_HOOK`).

Los previews son iframes en vivo: cuando cambia el Storybook de la tienda no hace falta redesplegar la docs.

Configuración necesaria en Vercel (proyecto `ketea-ds-documentacion`):

- Deploy Hook sobre `main`, que se pega como secreto `VERCEL_DEPLOY_HOOK` en `ketea-design-tokens`.
- Dominio `ketea-doc.emilianoroman.com.ar`.

## Si algo falla

- **Los previews salen en blanco:** revisá que la URL de `SB` (o `NEXT_PUBLIC_SB_URL` en Vercel) abra el Storybook en una ventana privada. Los previews cargan al hacer scroll.
- **Un tag nuevo de tokens rompió algo:** fijá la versión anterior en `package.json` y volvé a desplegar.
- **Una story nueva no aparece:** revisá que el deploy de `ketea-storybook` en Vercel haya terminado.

## Estructura

- `app/`: rutas (Empezar, Foundations, Componentes, Patrones).
- `components/docs/`: UI propia de la documentación, armada sobre shadcn/ui (`components/ui/`).
- `lib/`: navegación, tokens, índice de búsqueda y datos de cada pieza.
- `scripts/update-tokens.mjs`: instala la última versión de los tokens en CI.
