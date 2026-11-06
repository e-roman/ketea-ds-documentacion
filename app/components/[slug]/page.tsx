import { notFound } from "next/navigation"
import { PieceView } from "@/components/docs/piece-view"
import { pieceBySlug, piecesOf } from "@/lib/pieces"

export const generateStaticParams = () => piecesOf("components").map((p) => ({ slug: p.slug }))

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const piece = pieceBySlug("components", slug)
  if (!piece) notFound()
  return <PieceView piece={piece} />
}
