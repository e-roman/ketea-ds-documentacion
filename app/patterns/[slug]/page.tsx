import { notFound } from "next/navigation"
import { PieceView } from "@/components/docs/piece-view"
import { pieceBySlug, piecesOf } from "@/lib/pieces"

export const generateStaticParams = () => piecesOf("patterns").map((p) => ({ slug: p.slug }))

export default async function PatternPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const piece = pieceBySlug("patterns", slug)
  if (!piece) notFound()
  return <PieceView piece={piece} />
}
