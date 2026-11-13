import { TokenTable as ThemeTokenTable } from "ds-docs-theme/docs/foundation-views"
import { contrast } from "@/lib/contrast"
import { token, tokensUsedBy, withPrefix } from "@/lib/ketea-tokens"

export const val = (name: string) => token(name)?.resolved
export const ratio = (a?: string, b?: string) => (a && b ? contrast(a, b) : null)

export function Ratio({ r, min = 4.5 }: { r: number | null; min?: number }) {
  if (r === null) return <span className="text-muted-foreground">—</span>
  return <span className={`font-semibold ${r >= min ? "text-success" : "text-danger"}`}>{r.toFixed(2)}:1 {r >= min ? "OK" : "No cumple"}</span>
}

/** Cuadrito de color con su valor. */
export function Swatch({ name }: { name: string }) {
  const t = token(name)
  if (!t) return <span className="text-muted-foreground">—</span>
  return (
    <span className="inline-flex items-center gap-2" title={`--${name}`}>
      <span className="inline-block size-5 rounded border" style={{ background: t.resolved }} />
      <code className="font-mono text-xs">{t.resolved}</code>
    </span>
  )
}

const isColor = (v: string) => /^#|^rgb/.test(v)
const sample = (t: { resolved: string }) => (isColor(t.resolved) ? <span className="inline-block size-8 rounded-md border" style={{ background: t.resolved }} /> : null)

/** Tabla de todos los tokens con un prefijo. (El extractor la lee como `tokenPrefixes` cuando está en la sección «Tokens».) */
export function TokenTable({ prefix, exclude }: { prefix: string; exclude?: RegExp }) {
  return <ThemeTokenTable tokens={withPrefix(prefix).filter((t) => !exclude?.test(t.name))} sample={sample} />
}

/** Tokens globales que usa un CSS de la tienda. (El extractor la lee como `tokenNames`.) */
export function UsedTokens({ file, selector }: { file: string; selector?: RegExp }) {
  const list = tokensUsedBy(file, selector)
  if (list.length === 0) return <p className="text-sm text-muted-foreground">Este componente no usa tokens propios.</p>
  return <ThemeTokenTable tokens={list} sample={sample} />
}
