import { SectionIndex } from "ds-docs-theme/docs/blocks"
import { components } from "@/lib/nav"

export const metadata = { title: "Componentes · Ketea Design System" }

export default function Components() {
  return (
    <SectionIndex
      title="Componentes"
      intro="Las piezas básicas de la interfaz de Ketea, tal como están en la tienda. Cada una se muestra con sus variantes y sus props."
      base="/components"
      group="components"
      items={components}
    />
  )
}
