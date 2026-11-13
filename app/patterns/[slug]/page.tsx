import { notFound } from "next/navigation"
import { PieceView } from "ds-docs-theme/docs/piece-view"
import { piecesOf, pieceBySlug } from "@/lib/pieces"
import { allTokens, links, preview } from "@/lib/project"

export const generateStaticParams = () => piecesOf("patterns").map((p) => ({ slug: p.slug }))

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const piece = pieceBySlug("patterns", slug)
  if (!piece) notFound()
  return <PieceView piece={piece} tokens={allTokens()} preview={preview} links={{ figma: links.figma }} />
}
