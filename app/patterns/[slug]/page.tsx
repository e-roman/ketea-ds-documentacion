import { Suspense } from "react"
import { notFound } from "next/navigation"
import { PageFallback } from "@/components/docs/page-fallback"
import { PieceView } from "@/components/docs/piece-view"
import { pieceBySlug, piecesOf } from "@/lib/pieces"

export const generateStaticParams = () => piecesOf("patterns").map((p) => ({ slug: p.slug }))

async function PatternContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const piece = pieceBySlug("patterns", slug)
  if (!piece) notFound()
  return <PieceView piece={piece} />
}

export default function PatternPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<PageFallback />}>
      <PatternContent params={params} />
    </Suspense>
  )
}
