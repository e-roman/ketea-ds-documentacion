/** Storybook publicado en Chromatic (rama main). Si cambia la URL, se cambia acá. */
export const SB = "https://main--6aee3e1e46f9d85adfc9395c.chromatic.com"

/** Repositorio de la tienda (código de los componentes y sus stories). Privado. */
export const REPO = "https://github.com/e-roman/tiendaKetea"

/** Repositorio de los design tokens (fuente de las foundations). */
export const TOKENS_REPO = "https://github.com/e-roman/ketea-design-tokens"

export const storyUrl = (id: string) => `${SB}/iframe.html?id=${id}&viewMode=story`
export const docsUrl = (id: string) => `${SB}/?path=/docs/${id}`
export const sourceUrl = (file: string) => `${REPO}/blob/main/src/components/${file}`
