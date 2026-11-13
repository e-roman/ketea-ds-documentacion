import { SectionIndex } from "ds-docs-theme/docs/blocks"
import { components } from "@/lib/nav"

export const metadata = { title: "Componentes · Ketea Design System" }

export default function Page() {
  return (
    <SectionIndex
      title="Componentes"
      intro="Bloques de interfaz reutilizables de la tienda de Ketea, con sus variantes, estados y reglas de uso."
      base="/components"
      group="components"
      items={components}
    />
  )
}
