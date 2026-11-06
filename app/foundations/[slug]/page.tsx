import { notFound } from "next/navigation"
import { PageHeader } from "@/components/docs/blocks"
import { FoundationView } from "@/components/docs/foundation-views"
import { foundations } from "@/lib/nav"

export const generateStaticParams = () => foundations.map((f) => ({ slug: f.slug }))

export default async function FoundationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = foundations.find((f) => f.slug === slug)
  if (!item) notFound()
  return (
    <>
      <PageHeader title={item.title} description={item.description} />
      <FoundationView slug={slug} />
    </>
  )
}
