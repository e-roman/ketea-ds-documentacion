import { SectionIndex } from "ds-docs-theme/docs/blocks"
import { patterns } from "@/lib/nav"

export const metadata = { title: "Patrones · Ketea Design System" }

export default function Page() {
  return (
    <SectionIndex
      title="Patrones"
      intro="Composiciones de componentes para flujos completos: navegación, producto, carrito, checkout y cuenta."
      base="/patterns"
      group="patterns"
      items={patterns}
    />
  )
}
