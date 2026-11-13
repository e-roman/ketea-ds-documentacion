import { Children, Fragment, isValidElement, type ReactElement, type ReactNode } from "react"
import type { InspectGroup, Piece, Story, StoryGroup } from "ds-docs-theme/types"
import { iso } from "@/content/iso"
import { allTokens } from "@/lib/project"
import { tokensUsedBy } from "@/lib/ketea-tokens"
import { Anatomy, DoDont, Purpose, Table, WhenToUse } from "./blocks"
import { Section } from "./component-page"
import { Ratio, TokenTable, UsedTokens } from "./token-ui"
import Variants from "./variants"

/**
 * Convierte las páginas anteriores (árboles JSX armados con Purpose, Anatomy, Variants, WhenToUse, DoDont, Section y Table)
 * en los campos de una pieza del theme. Lo reconocido pasa a campos propios; el resto queda como sección libre (`extras`).
 */

type Tab = "design" | "usage" | "accessibility" | "updates"
type El = ReactElement<Record<string, unknown>>
const props = (e: El) => e.props as Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any

/** Texto plano de un nodo; `<code>` pasa a `backticks`. */
export function toText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(toText).join("")
  if (isValidElement(node)) {
    const e = node as El
    const inner = toText(props(e).children as ReactNode)
    if (e.type === "code") return `\`${inner}\``
    if (e.type === "br") return " "
    return inner
  }
  return ""
}

/** Todos los elementos de un árbol, en orden (sin dibujar nada). */
function* elements(node: ReactNode): Generator<El> {
  for (const c of Children.toArray(node)) {
    if (!isValidElement(c)) continue
    const e = c as El
    yield e
    yield* elements(props(e).children as ReactNode)
  }
}

const isMarker = (t: unknown) => t === Purpose || t === Anatomy || t === WhenToUse || t === DoDont || t === Variants

/** `<kbd>` de una celda → teclas. */
const keysOf = (node: ReactNode) => [...elements(node)].filter((e) => e.type === "kbd").map((e) => toText(props(e).children as ReactNode))

export function extractPiece(slug: string, panels: Record<Tab, ReactNode>) {
  const tokenNames = new Set(allTokens().map((t) => t.name))
  const resolveName = (n: string) => (tokenNames.has(n) ? n : tokenNames.has(`color-${n}`) ? `color-${n}` : n)

  const out: Partial<Piece> & { groups: StoryGroup[]; extras: NonNullable<Piece["extras"]> } = { groups: [], extras: [] }
  const addExtra = (tab: Tab, title: string, node: ReactNode) => {
    if (Children.toArray(node).length > 0) out.extras.push({ tab, title, node })
  }

  const takeMarker = (e: El) => {
    const p = props(e)
    if (e.type === Purpose) out.purpose = (p.items as { title: string; text: ReactNode }[]).map((i) => ({ title: i.title, text: toText(i.text) }))
    else if (e.type === WhenToUse) {
      out.use = (p.use as ReactNode[]).map(toText)
      out.avoid = (p.avoid as ReactNode[]).map(toText)
    } else if (e.type === DoDont) {
      out.practices = (p.items as { ok: boolean; preview: ReactNode; title: string; text?: ReactNode }[]).map((it, i) => ({
        ok: it.ok, title: it.title, text: it.text ? toText(it.text) : undefined, storyId: `${slug}-practice-${i}`, node: iso(it.preview),
      }))
    } else if (e.type === Anatomy) {
      const markers = p.markers as { n: number; side: "top" | "bottom" | "left" | "right"; pct?: number }[]
      const legend = p.legend as { n: number; label: string; note?: string }[]
      const parts = (p.parts as { n: number; selector: string; only?: InspectGroup[] }[] | undefined) ?? []
      out.anatomy = {
        story: `${slug}-anatomy`,
        node: iso(p.children as ReactNode),
        // solo las partes con selector se pueden inspeccionar
        parts: legend.flatMap((l) => {
          const m = markers.find((x) => x.n === l.n)
          const s = parts.find((x) => x.n === l.n)
          return m && s ? [{ n: l.n, label: l.label, note: l.note, selector: s.selector, only: s.only, side: m.side, pct: m.pct }] : []
        }),
      }
    } else if (e.type === Variants) {
      const items = p.items as { value: string; label: string; caption: ReactNode; node: ReactNode; dark?: boolean }[]
      out.groups.push({
        title: p.title as string,
        intro: p.description ? toText(p.description as ReactNode) : undefined,
        stories: items.map((it): Story => ({ id: `${slug}-${p.title}-${it.value}`, label: it.label, caption: toText(it.caption) || undefined, dark: it.dark, node: iso(it.node) })),
      })
    }
  }

  /** Lo que queda de un conjunto de hijos tras sacar los marcadores. */
  const rest = (node: ReactNode): ReactNode[] => {
    const left: ReactNode[] = []
    for (const c of Children.toArray(node)) {
      if (isValidElement(c) && isMarker((c as El).type)) takeMarker(c as El)
      else if (isValidElement(c) && (c as El).type === Fragment) left.push(...rest(props(c as El).children as ReactNode))
      else left.push(c)
    }
    return left
  }

  const section = (title: string, children: ReactNode, tab: Tab) => {
    const kids = Children.toArray(children)
    const tables = [...elements(children)].filter((e) => e.type === Table)

    if (title === "Rol y estructura") {
      const lis = [...elements(children)].filter((e) => e.type === "li")
      if (lis.length) { out.a11y = lis.map((l) => toText(props(l).children as ReactNode)); return }
    }
    if (title === "Teclado" && tables[0]) {
      const rows = props(tables[0]).rows as ReactNode[][]
      out.keyboard = rows.map(([k, a]) => ({ keys: keysOf(k), action: toText(a) })).filter((r) => r.keys.length)
      if (out.keyboard.length === rows.length) return
      out.keyboard = undefined
    }
    if (title === "Contraste" && tables[0]) {
      const head = props(tables[0]).head as string[]
      const rows = props(tables[0]).rows as ReactNode[][]
      if (head.join("|") === "Elemento|Colores|Relación") {
        const parsed = rows.map((r) => {
          const m = toText(r[1]).match(/^(.+?) sobre (.+)$/)
          const ratio = [...elements(r[2])].find((e) => e.type === Ratio) ?? (isValidElement(r[2]) && (r[2] as El).type === Ratio ? (r[2] as El) : undefined)
          return m ? { element: toText(r[0]), fg: resolveName(m[1]), bg: resolveName(m[2]), min: ratio ? (props(ratio).min as number | undefined) : undefined } : null
        })
        if (parsed.every(Boolean)) { out.contrast = parsed as NonNullable<Piece["contrast"]>; return }
      }
    }
    if (title === "Historial" && tables[0]) {
      const head = props(tables[0]).head as string[]
      if (head[0] === "Versión de tokens") {
        out.historyColumn = "Versión de tokens"
        out.history = (props(tables[0]).rows as ReactNode[][]).map(([v, t]) => ({ date: toText(v), text: toText(t) }))
        return
      }
    }
    if (title === "Tokens") {
      const used = kids.filter((k) => isValidElement(k) && ((k as El).type === UsedTokens || (k as El).type === TokenTable)) as El[]
      const others = kids.filter((k) => !(isValidElement(k) && ((k as El).type === UsedTokens || (k as El).type === TokenTable || (k as El).type === "p")))
      if (used.length && others.length === 0) {
        for (const u of used) {
          if (u.type === UsedTokens) out.tokenNames = [...(out.tokenNames ?? []), ...tokensUsedBy(props(u).file as string, props(u).selector as RegExp | undefined).map((t) => t.name)]
          else out.tokenPrefixes = [...(out.tokenPrefixes ?? []), props(u).prefix as string]
        }
        return
      }
    }
    if (title === "Configuración") {
      const left = rest(children)
      if (left.length) addExtra(tab, "", <>{left}</>)
      return
    }
    // cualquier otra sección: se extraen los marcadores que tenga y lo demás queda como sección libre
    const left = rest(children)
    addExtra(tab, title, <>{left}</>)
  }

  const walkTab = (node: ReactNode, tab: Tab) => {
    for (const c of Children.toArray(node)) {
      if (!isValidElement(c)) continue
      const e = c as El
      if (isMarker(e.type)) takeMarker(e)
      else if (e.type === Fragment) walkTab(props(e).children as ReactNode, tab)
      else if (e.type === Section) section(props(e).title as string, props(e).children as ReactNode, tab)
      else addExtra(tab, "", e)
    }
  }

  for (const tab of ["design", "usage", "accessibility", "updates"] as Tab[]) walkTab(panels[tab], tab)

  return out
}
