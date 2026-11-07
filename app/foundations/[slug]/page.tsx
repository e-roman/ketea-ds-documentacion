import { Suspense } from "react"
import { notFound } from "next/navigation"
import { PageHeader } from "@/components/docs/blocks"
import { FoundationView } from "@/components/docs/foundation-views"
import { PageFallback } from "@/components/docs/page-fallback"
import { foundations } from "@/lib/nav"
import { TOKENS_REPO } from "@/lib/storybook"

export const generateStaticParams = () => foundations.map((f) => ({ slug: f.slug }))

async function FoundationContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = foundations.find((f) => f.slug === slug)
  if (!item) notFound()
  return (
    <>
      <PageHeader title={item.title} description={item.description} links={{ github: TOKENS_REPO }} />
      <FoundationView slug={slug} />
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
