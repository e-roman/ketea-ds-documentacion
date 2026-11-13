import fs from "node:fs"
import path from "node:path"

export type Token = {
  name: string // sin "--", ej. "color-action-primary-bg"
  value: string // tal como está en el CSS (con var())
  resolved: string // valor final, resolviendo referencias
  desc?: string // comentario /** */ del token
}

let cache: Token[] | null = null

/** Lee .generated/tokens.css: tokens de @ketea/tokens + variables de la tienda (scripts/build-tokens.mjs). Fuente única: nunca se copia a mano. */
export function allTokens(): Token[] {
  if (cache) return cache
  const file = path.join(process.cwd(), ".generated/tokens.css")
  const lines = fs.readFileSync(file, "utf8").split("\n")
  const raw = new Map<string, { value: string; desc?: string }>()
  for (const line of lines) {
    const m = line.match(/^\s*--([\w-]+):\s*(.+?);\s*(?:\/\*\*\s*(.*?)\s*\*\/)?\s*$/)
    if (!m || m[1].endsWith("-rgb")) continue
    raw.set(m[1], { value: m[2], desc: m[3] })
  }
  const resolve = (v: string, depth = 0): string =>
    depth > 10 ? v : v.replace(/var\(--([\w-]+)\)/g, (_, n) => (raw.has(n) ? resolve(raw.get(n)!.value, depth + 1) : `var(--${n})`))
  cache = [...raw].map(([name, { value, desc }]) => ({ name, value, resolved: resolve(value), desc }))
  return cache
}

export const withPrefix = (prefix: string) => allTokens().filter((t) => t.name.startsWith(prefix))

/** Último segmento(s) después de un prefijo: color-surface-default → default */
export const rest = (t: Token, prefix: string) => t.name.slice(prefix.length)

export const SEMANTIC_GROUPS = ["surface", "text", "border", "icon", "brand", "action", "form", "feedback", "focus", "commerce"]

/** Agrupa los tokens de color en primitivos (por escala) y semánticos (por grupo). */
export function colorGroups() {
  const colors = withPrefix("color-")
  const primitive = new Map<string, Token[]>()
  const semantic = new Map<string, Token[]>()
  for (const t of colors) {
    const group = t.name.split("-")[1]
    const target = SEMANTIC_GROUPS.includes(group) ? semantic : primitive
    if (!target.has(group)) target.set(group, [])
    target.get(group)!.push(t)
  }
  return { primitive, semantic }
}

/** Cuenta de tokens por familia para la página Design tokens. */
export function countsByFamily() {
  const counts = new Map<string, number>()
  for (const t of allTokens()) {
    const f = t.name.split("-")[0]
    counts.set(f, (counts.get(f) ?? 0) + 1)
  }
  return [...counts].sort((a, b) => b[1] - a[1])
}

/** Un token por nombre (sin "--"). */
export const token = (name: string) => allTokens().find((t) => t.name === name)

/** Tokens globales que usa un archivo CSS de la tienda (var(--x) que existen en tokens.css), en orden de aparición.
 *  `selector` limita a las reglas cuyo selector coincide (para archivos compartidos como surfaces.css). */
export function tokensUsedBy(cssFile: string, selector?: RegExp): Token[] {
  const file = path.join(process.cwd(), "shop", "styles", cssFile)
  let css = ""
  try { css = fs.readFileSync(file, "utf8") } catch { return [] }
  if (selector) {
    css = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter((m) => selector.test(m[1])).map((m) => m[2]).join(" ")
  }
  const names = [...new Set([...css.matchAll(/var\(--([\w-]+)/g)].map((m) => m[1]))]
  return names.map((n) => token(n)).filter((t): t is Token => !!t)
}
