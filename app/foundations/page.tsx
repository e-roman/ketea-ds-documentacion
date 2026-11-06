import { PageHeader, SectionIndex } from "@/components/docs/blocks"
import { foundations } from "@/lib/nav"

export const metadata = { title: "Foundations · Ketea Design System" }

export default function Foundations() {
  return (
    <>
      <PageHeader title="Foundations" description="Las decisiones de diseño de Ketea, escritas como variables." />
      <SectionIndex base="/foundations" items={foundations} />
    </>
  )
}
