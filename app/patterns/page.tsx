import { PageHeader, SectionIndex } from "@/components/docs/blocks"
import { patterns } from "@/lib/nav"

export const metadata = { title: "Patrones · Ketea Design System" }

export default function Patterns() {
  return (
    <>
      <PageHeader title="Patrones" description="Bloques compuestos que combinan varios componentes." />
      <SectionIndex base="/patterns" items={patterns} />
    </>
  )
}
