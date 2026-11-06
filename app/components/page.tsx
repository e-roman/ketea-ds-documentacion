import { PageHeader, SectionIndex } from "@/components/docs/blocks"
import { components } from "@/lib/nav"

export const metadata = { title: "Componentes · Ketea Design System" }

export default function Components() {
  return (
    <>
      <PageHeader title="Componentes" description="Las piezas básicas de la interfaz, tal como están en la tienda." />
      <SectionIndex base="/components" items={components} />
    </>
  )
}
