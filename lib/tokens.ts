import path from "node:path"
import { readTokens } from "ds-docs-theme/lib/tokens"

/** Tokens de Ketea: se leen de @ketea/tokens (fuente única, nunca se copian a este repo). */
export const TOKENS_CSS = path.join(process.cwd(), "node_modules/@ketea/tokens/dist/tokens.css")
export const allTokens = () => readTokens(TOKENS_CSS)
