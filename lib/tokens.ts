import fs from "node:fs"
import path from "node:path"

export type Token = {
  /** Nombre sin "--", ej. "color-brand-700". */
  name: string
  /** Valor tal como está en el CSS (puede ser var(--otro)). */
  value: string
  /** Valor final, resolviendo referencias. */
  resolved: string
}

let cache: Token[] | null = null

/** Lee dist/tokens.css de @ketea/tokens. Fuente única: los tokens nunca se copian a este repo. */
export function allTokens(): Token[] {
  if (cache) return cache
  const file = path.join(process.cwd(), "node_modules/@ketea/tokens/dist/tokens.css")
  const raw = new Map<string, string>()
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*--([\w-]+):\s*(.+?);\s*$/)
    if (!m || m[1].endsWith("-rgb")) continue
    raw.set(m[1], m[2])
  }
  const resolve = (v: string, depth = 0): string =>
    depth > 10 ? v : v.replace(/var\(--([\w-]+)\)/g, (_, n) => (raw.has(n) ? resolve(raw.get(n)!, depth + 1) : `var(--${n})`))
  cache = [...raw].map(([name, value]) => ({ name, value, resolved: resolve(value) }))
  return cache
}

export const withPrefix = (prefix: string) => allTokens().filter((t) => t.name.startsWith(prefix))
export const rest = (t: Token, prefix: string) => t.name.slice(prefix.length)

/** Grupos semánticos de color (color-semantic-<grupo>-…). */
export const SEMANTIC_GROUPS = ["surface", "text", "border", "icon", "feedback", "forms"]

/** Escalas de color: primitivos agrupados por rampa (neutral, slate, rose…) y semánticos por grupo. */
export function colorGroups() {
  const ramps = new Map<string, Token[]>()
  const brand: Token[] = []
  const semantic = new Map<string, Token[]>()
  for (const t of withPrefix("color-")) {
    const parts = t.name.split("-")
    if (parts[1] === "semantic") {
      const g = parts[2]
      if (!semantic.has(g)) semantic.set(g, [])
      semantic.get(g)!.push(t)
    } else if (parts[1] === "brand") {
      brand.push(t)
    } else {
      const ramp = parts[1] === "blue" && parts[2] === "brand" ? "blue-brand" : parts[1]
      if (!ramps.has(ramp)) ramps.set(ramp, [])
      ramps.get(ramp)!.push(t)
    }
  }
  return { ramps, brand, semantic }
}

/** Cantidad de tokens por familia (primer segmento del nombre). */
export function countsByFamily() {
  const counts = new Map<string, number>()
  for (const t of allTokens()) {
    const f = t.name.split("-")[0]
    counts.set(f, (counts.get(f) ?? 0) + 1)
  }
  return [...counts].sort((a, b) => b[1] - a[1])
}

export const isColor = (v: string) => /^(#|rgb|hsl)/i.test(v.trim())
