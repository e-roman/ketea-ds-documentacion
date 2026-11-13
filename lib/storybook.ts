/** Storybook publicado (Chromatic, rama main). Si cambia la URL, se cambia acá. */
export const SB = "https://main--6af76cfe6cb0bf0a8347dda4.chromatic.com"

/** Repositorio de la tienda (código de los componentes y sus stories). */
export const REPO = "https://github.com/e-roman/ketea-tienda-spike"

const BLOB = `${REPO}/blob/main/components`

/** Componentes de components/ui cuyo archivo no es .tsx. */
const UI_EXT: Record<string, string> = { "icon-button": "ts", link: "ts" }
/** Patrones que viven fuera de components/patterns. */
const PATTERN_PATH: Record<string, string> = {
  nav: "nav.tsx", footer: "footer.tsx", hero: "hero.tsx", "newsletter-banner": "newsletter-banner.tsx", "cart-drawer": "cart-drawer.tsx",
  "product-detail": "patterns/product-info.tsx",
}

/** Link al código fuente en GitHub. Sin archivo propio (p. ej. Accordion) lleva a la carpeta. */
export function sourceUrl(kind: "components" | "patterns", slug: string) {
  if (kind === "patterns") return `${BLOB}/${PATTERN_PATH[slug] ?? `patterns/${slug}.tsx`}`
  if (slug === "accordion") return `${REPO}/tree/main/components/ui`
  return `${BLOB}/ui/${slug}.${UI_EXT[slug] ?? "tsx"}`
}

/** Archivo de Figma del sistema (Ketea DS). Privado: abre solo a quien tenga acceso. */
export const FIGMA = "https://www.figma.com/design/lXKFv02FouHJOUG9Qrsib2"

/** Repositorio de los design tokens (fuente de las foundations). */
export const TOKENS_REPO = "https://github.com/e-roman/ketea-design-tokens"

export const kebab = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

/** id de story: "Patterns/Header/Mega menu" + "Open" → patterns-header-mega-menu--open */
export const storyId = (title: string, name: string) => `${kebab(title)}--${kebab(name)}`
export const docsId = (title: string) => `${kebab(title)}--docs`

export const storyUrl = (id: string) => `${SB}/iframe.html?id=${id}&viewMode=story`
export const docsUrl = (id: string) => `${SB}/?path=/docs/${id}`
