import path from "node:path"
import { inlinePreviews } from "ds-docs-theme/lib/previews"
import { readTokens } from "ds-docs-theme/lib/tokens"
import { FIGMA, REPO, SB, TOKENS_REPO } from "@/lib/storybook"

/*
 * DATA DE KETEA para el theme de documentación (ds-docs-theme).
 * El theme dibuja header, menús, páginas y paneles; este archivo le entrega la marca, los tokens y cómo se muestran las vistas previas.
 */

export const brand = { name: "Ketea", tagline: "Design System", logo: { src: "/logo-ketea.svg", width: 106, height: 28 } }
export const links = { repo: REPO, tokensRepo: TOKENS_REPO, figma: FIGMA, storybook: SB }

/** Tokens de Ketea: @ketea/tokens + variables de la tienda (scripts/build-tokens.mjs). Fuente única: nunca se escriben a mano en este repo. */
export const TOKENS_CSS = path.join(process.cwd(), ".generated/tokens.css")
export const allTokens = () => readTokens(TOKENS_CSS)

/**
 * Las vistas son los componentes reales de la tienda (ketea-tienda-spike), dibujados en la misma página. Su CSS (Tailwind 3, compilado aparte a
 * public/shop.css) se carga solo dentro de un shadow root (componente Isolated del theme), así no se mezcla con el del theme.
 */
export const SHOP_CSS = ["/shop.css", "/demo.css"]

/** El link «Storybook» de cada pieza sale de `docsId` (título en Storybook). */
export const preview = inlinePreviews({
  repo: REPO,
  sourceUrl: (file) => file,
  docsUrl: (id) => (id ? `${SB}/?path=/docs/${id}` : ""),
})
