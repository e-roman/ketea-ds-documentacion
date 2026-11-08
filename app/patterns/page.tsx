import { SectionIndex } from "ds-docs-theme/docs/blocks"
import { patterns } from "@/lib/nav"

export const metadata = { title: "Patrones · Ketea Design System" }

export default function Patterns() {
  return (
    <SectionIndex
      title="Patrones"
      intro="Bloques compuestos que combinan varios componentes para resolver una necesidad de la tienda."
      base="/patterns"
      group="patterns"
      items={patterns}
    />
  )
}
