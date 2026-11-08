import { SectionIndex } from "ds-docs-theme/docs/blocks"
import { foundations } from "@/lib/nav"

export const metadata = { title: "Foundations · Ketea Design System" }

export default function Foundations() {
  return (
    <SectionIndex
      title="Foundations"
      intro="Los fundamentos del sistema de Ketea: color, tipografía, spacing y tokens que garantizan consistencia entre Figma y el sitio."
      base="/foundations"
      group="foundations"
      items={foundations}
    />
  )
}
