import type { Anatomy, InspectGroup, Piece } from "ds-docs-theme/types"
import { badgePiece } from "@/content/badge"
import { iso } from "@/content/iso"
import LiveStory from "@/content/live"
import { LIVE } from "@/lib/live-stories"
import { buttonPiece } from "@/content/button"
import { extractPiece } from "@/content/compat/extract"
import { history as ownHistory } from "@/content/history"
import { accordionPanels, breadcrumbPanels, cardPanels, chipPanels, formPartsPanels, iconBadgePanels, iconButtonPanels, linkPanels, pricePanels, progressPanels, ratingScalePanels, skeletonPanels, tabsPanels } from "@/content/pages/more"
import { inputPanels } from "@/content/pages/input"
import { patternPanels } from "@/content/pages/patterns"
import { stepperPanels } from "@/content/pages/stepper"
import { ownComponents, ownPatterns } from "@/lib/own-nav"
import { docsId, sourceUrl } from "@/lib/storybook"
import { sbPatterns, type SbPattern } from "@/lib/sb-patterns"
import { resolveShot } from "@/lib/shot-file"

/**
 * Piezas de Ketea en el formato del theme.
 * - Las escritas a mano viven en content/ (Button, Badge) y content/pages/.
 * - Las de lib/sb-patterns.ts se convierten acá: cada vista es el componente real de la tienda, renderizado en vivo.
 */

const fromSb = (p: SbPattern): Piece => {
  const group = p.group ?? "patterns"
  return {
    slug: p.slug, group, cat: p.cat, title: p.title, summary: p.nav, description: p.desc,
    file: sourceUrl(group, p.slug),
    docsId: docsId(p.sb),
    stories: p.shots.map((s, i) => {
      const { src, w, h } = resolveShot(p.slug, i, s.w)
      return {
        id: `${p.slug}-${i}`, label: s.label,
        // Vista en vivo (componente real de la tienda, aislado) si existe; si no, la captura de Storybook
        node: LIVE[p.slug]?.[i] ? iso(<LiveStory slug={p.slug} index={i} />) : <img src={src} width={w} height={h} alt={`${p.title}: ${s.label}`} loading="lazy" decoding="async" className="h-auto max-w-full rounded-lg border bg-white" />,
      }
    }),
    props: p.props.map(([name, type, desc, required]) => [name, type, desc ?? "", required]),
    use: p.use, avoid: p.avoid, a11y: p.a11y,
    history: ownHistory[p.slug],
  }
}

/** Pieza escrita en las páginas anteriores: se convierte leyendo su JSX (ver content/compat/extract.tsx). */
const fromPanels = (group: Piece["group"], item: { slug: string; title: string; description: string; cat?: string }, panels: Parameters<typeof extractPiece>[1]): Piece => {
  const x = extractPiece(item.slug, panels)
  return {
    slug: item.slug, group, cat: item.cat, title: item.title, description: item.description,
    file: sourceUrl(group, item.slug), docsId: "",
    stories: [], props: [], use: [], avoid: [],
    ...x,
    groups: x.groups.length ? x.groups : undefined,
    extras: x.extras.length ? x.extras : undefined,
  }
}

const componentPanels: Record<string, () => Parameters<typeof extractPiece>[1]> = {
  accordion: accordionPanels, breadcrumb: breadcrumbPanels, card: cardPanels, chip: chipPanels, "form-parts": formPartsPanels,
  "icon-badge": iconBadgePanels, "icon-button": iconButtonPanels, link: linkPanels, price: pricePanels, progress: progressPanels,
  "rating-scale": ratingScalePanels, skeleton: skeletonPanels, tabs: tabsPanels, input: inputPanels, stepper: stepperPanels,
}

const ownPieces: Piece[] = [
  ...ownComponents.filter((c) => componentPanels[c.slug]).map((c) => fromPanels("components", c, componentPanels[c.slug]())),
  ...ownPatterns.filter((p) => patternPanels[p.slug]).map((p) => fromPanels("patterns", p, patternPanels[p.slug]())),
]

/** Lo que el inspector muestra por defecto en una parte sin `only` (todo salvo el ancho). */
const DEFAULT_GROUPS: InspectGroup[] = ["fondo", "texto", "borde", "radio", "padding", "gap", "alto", "tipografia"]

/**
 * Cuando el contenedor y el label son el mismo elemento (ej. `.btn`), el texto —color y tipografía— lo muestra el Label.
 * Al Contenedor se le quitan esos dos grupos para que las partes no repitan lo mismo.
 */
function dedupeParts(a: Anatomy): Anatomy {
  return {
    ...a,
    parts: a.parts.map((p) => {
      if (p.only) return p
      const textSibling = a.parts.some((o) => o !== p && o.selector === p.selector && o.only?.includes("tipografia"))
      return textSibling ? { ...p, only: DEFAULT_GROUPS.filter((g) => g !== "texto" && g !== "tipografia") } : p
    }),
  }
}

export const pieces: Piece[] = [buttonPiece, badgePiece, ...ownPieces, ...sbPatterns.map(fromSb)].map((p) => ({ ...p, hideEmptyProps: true, anatomy: p.anatomy && dedupeParts(p.anatomy) }))

export const piecesOf = (group: Piece["group"]) => pieces.filter((p) => p.group === group).sort((a, b) => a.title.localeCompare(b.title))
export const pieceBySlug = (group: Piece["group"], slug: string) => pieces.find((p) => p.group === group && p.slug === slug)
