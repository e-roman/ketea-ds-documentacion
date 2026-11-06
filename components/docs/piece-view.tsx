import { ExternalLinkIcon } from "lucide-react"
import { PageHeader, PropsTable, Section } from "@/components/docs/blocks"
import { Badge } from "@/components/ui/badge"
import type { Piece } from "@/lib/pieces"
import { docsUrl, sourceUrl, storyUrl } from "@/lib/storybook"

/** Página de un componente o patrón: cada story de Storybook embebida, props y recomendaciones de uso. */
export function PieceView({ piece }: { piece: Piece }) {
  return (
    <>
      <PageHeader title={piece.title} description={piece.description}>
        <div className="flex flex-wrap gap-3 pt-1 text-sm">
          <a className="inline-flex items-center gap-1 underline underline-offset-4" href={docsUrl(piece.docsId)} target="_blank" rel="noreferrer">Ver en Storybook <ExternalLinkIcon className="size-3" /></a>
          <a className="inline-flex items-center gap-1 underline underline-offset-4" href={sourceUrl(piece.file)} target="_blank" rel="noreferrer">Código <ExternalLinkIcon className="size-3" /></a>
        </div>
      </PageHeader>

      <Section title="Variantes" intro="Cada vista es el componente real de la tienda, publicado en Storybook.">
        <div className="space-y-6">
          {piece.stories.map((s) => (
            <figure key={s.id} className="space-y-2">
              <figcaption><Badge variant="secondary">{s.label}</Badge></figcaption>
              <iframe title={`${piece.title} · ${s.label}`} src={storyUrl(s.id)} loading="lazy" height={piece.previewHeight ?? 200} className="w-full rounded-lg border bg-white" />
            </figure>
          ))}
        </div>
      </Section>

      <Section title="Props"><PropsTable props={piece.props} /></Section>

      <div className="grid gap-6 sm:grid-cols-2">
        <Section title="Cuándo usarlo"><ul className="list-disc space-y-1 pl-5 text-sm">{piece.use.map((u) => <li key={u}>{u}</li>)}</ul></Section>
        <Section title="Cuándo evitarlo"><ul className="list-disc space-y-1 pl-5 text-sm">{piece.avoid.map((u) => <li key={u}>{u}</li>)}</ul></Section>
      </div>
    </>
  )
}
