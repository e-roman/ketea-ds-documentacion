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

/** `embed=1` hace que la story le avise su alto a la documentación (ver .storybook/preview.jsx de la tienda). */
export const storyUrl = (id: string) => `${SB}/iframe.html?id=${id}&viewMode=story&embed=1`
export const docsUrl = (id: string) => `${SB}/?path=/docs/${id}`
/** Código de la pieza. Los archivos de `pages/` (checkout) viven fuera de `src/components`. */
export const sourceUrl = (file: string) => (file.startsWith("pages/") ? `${REPO}/blob/main/${file}` : `${REPO}/blob/main/src/components/${file}`)
