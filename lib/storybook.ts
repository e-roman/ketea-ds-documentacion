/**
 * Storybook publicado en Chromatic (rama main). Si cambia la URL, se cambia acá.
 * NEXT_PUBLIC_SB_URL permite apuntar a un Storybook local para probar (por ejemplo, http://localhost:6007).
 */
export const SB = process.env.NEXT_PUBLIC_SB_URL ?? "https://main--6aee3e1e46f9d85adfc9395c.chromatic.com"

/** Repositorio de la tienda (código de los componentes y sus stories). Privado. */
export const REPO = "https://github.com/e-roman/tiendaKetea"

/** Repositorio de los design tokens (fuente de las foundations). */
export const TOKENS_REPO = "https://github.com/e-roman/ketea-design-tokens"

/** Archivo de Figma del sistema (Ketea DS), tomado del README de los tokens. */
export const FIGMA = "https://www.figma.com/design/lXKFv02FouHJOUG9Qrsib2"

export const storyUrl = (id: string) => `${SB}/iframe.html?id=${id}&viewMode=story`
export const docsUrl = (id: string) => `${SB}/?path=/docs/${id}`
export const sourceUrl = (file: string) => `${REPO}/blob/main/src/components/${file}`
