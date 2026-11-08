import { Suspense } from "react"
import { notFound } from "next/navigation"
import { PageHeader } from "ds-docs-theme/docs/blocks"
import { FoundationView } from "ds-docs-theme/docs/foundation-views"
import { PageFallback } from "ds-docs-theme/docs/page-fallback"
import { foundations } from "@/lib/nav"
import { FIGMA, SB, TOKENS_REPO } from "@/lib/storybook"
import { allTokens } from "@/lib/tokens"

export const generateStaticParams = () => foundations.map((f) => ({ slug: f.slug }))

async function FoundationContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = foundations.find((f) => f.slug === slug)
  if (!item) notFound()
  return (
    <>
      <PageHeader title={item.title} description={item.description} links={{ github: TOKENS_REPO, storybook: SB, figma: FIGMA }} />
      <FoundationView slug={slug} tokens={allTokens()} />
    </>
  )
}

export default function FoundationPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<PageFallback />}>
      <FoundationContent params={params} />
    </Suspense>
  )
}
