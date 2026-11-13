import type { ReactNode } from "react"
import { Table as UiTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "ds-docs-theme/ui/table"
import { iso } from "@/content/iso"

export type Marker = { n: number; side: "top" | "bottom" | "left" | "right"; pct?: number }
export type Legend = { n: number; label: string; note?: string }
export type Part = { n: number; selector: string; only?: string[] }

/*
 * Bloques de las páginas anteriores. Purpose, Anatomy, WhenToUse y DoDont son marcadores: el extractor (extract.tsx) lee sus props
 * y llena los campos de la pieza del theme. Panel, Table y Callout se dibujan tal cual cuando quedan como secciones libres.
 */

export function Purpose(_props: { items: { title: string; text: ReactNode }[] }) {
  return null
}
export function Anatomy(_props: { children: ReactNode; markers: Marker[]; legend: Legend[]; parts?: Part[] }) {
  return null
}
export function WhenToUse(_props: { use: ReactNode[]; avoid: ReactNode[] }) {
  return null
}
export function DoDont(_props: { items: { ok: boolean; preview: ReactNode; title: string; text?: ReactNode; dark?: boolean }[] }) {
  return null
}

/** Recuadro con una vista aislada (CSS de la tienda) y una leyenda. */
export function Panel({ children, caption, dark }: { children: ReactNode; caption?: ReactNode; dark?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className={`p-6 ${dark ? "bg-neutral-800" : "bg-muted"}`}>{iso(children)}</div>
      {caption && <p className="border-t px-4 py-3 text-xs text-muted-foreground">{caption}</p>}
    </div>
  )
}

export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <UiTable>
      <TableHeader><TableRow>{head.map((h) => <TableHead key={h}>{h}</TableHead>)}</TableRow></TableHeader>
      <TableBody>
        {rows.map((r, i) => (
          <TableRow key={i}>{r.map((c, j) => <TableCell key={j} className="whitespace-normal! text-sm">{c}</TableCell>)}</TableRow>
        ))}
      </TableBody>
    </UiTable>
  )
}

export function Callout({ children }: { children: ReactNode }) {
  return <p className="rounded-lg border-l-4 border-brand bg-muted p-3 text-sm">{children}</p>
}
