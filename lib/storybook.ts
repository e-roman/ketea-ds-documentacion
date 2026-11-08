import { storybookPreviews } from "ds-docs-theme/lib/previews"

/**
 * Storybook publicado en Vercel (proyecto `ketea-storybook`). Si cambia la URL, se cambia acá.
 * NEXT_PUBLIC_SB_URL permite apuntar a un Storybook local para probar (por ejemplo, http://localhost:6007).
 */
export const SB = process.env.NEXT_PUBLIC_SB_URL ?? "https://ketea-storybook.vercel.app"

/** Repositorio de la tienda (código de los componentes y sus stories). Privado. */
export const REPO = "https://github.com/e-roman/tiendaKetea"

/** Repositorio de los design tokens (fuente de las foundations). */
export const TOKENS_REPO = "https://github.com/e-roman/ketea-design-tokens"

/** Archivo de Figma del sistema (Ketea DS), tomado del README de los tokens. */
export const FIGMA = "https://www.figma.com/design/lXKFv02FouHJOUG9Qrsib2"

/**
 * Previews de las piezas: Storybook embebido. Las stories pasan por `/sb` (rewrite de next.config.ts): mismo origen, así el inspector puede leer su contenido.
 * Los archivos de `pages/` (checkout) viven fuera de `src/components`. Las capturas de la documentación se generan con `scripts/shots.mjs`.
 */
export const preview = storybookPreviews({
  url: SB,
  repo: REPO,
  livePath: "/sb",
  sourcePath: (file) => (file.startsWith("pages/") ? `${REPO}/blob/main/${file}` : `${REPO}/blob/main/src/components/${file}`),
})
