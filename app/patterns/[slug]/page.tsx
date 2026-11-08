import { Suspense } from "react"
import { notFound } from "next/navigation"
import { PageFallback } from "ds-docs-theme/docs/page-fallback"
import { PieceView } from "ds-docs-theme/docs/piece-view"
import { pieceBySlug, piecesOf } from "@/lib/pieces"
import { allTokens } from "@/lib/tokens"
import { FIGMA, preview } from "@/lib/storybook"

export const generateStaticParams = () => piecesOf("patterns").map((p) => ({ slug: p.slug }))

async function PatternContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const piece = pieceBySlug("patterns", slug)
  if (!piece) notFound()
  return <PieceView piece={piece} tokens={allTokens()} preview={preview} links={{ figma: FIGMA }} />
}

export default function PatternPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<PageFallback />}>
      <PatternContent params={params} />
    </Suspense>
  )
}
