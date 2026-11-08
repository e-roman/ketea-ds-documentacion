import { piecesOf } from "@/lib/pieces"
import type { NavItem, NavSection } from "ds-docs-theme/types"

export type { NavItem }

export const topNav = [
  { href: "/get-started", label: "Empezar" },
  { href: "/foundations", label: "Foundations" },
  { href: "/components", label: "Componentes" },
  { href: "/patterns", label: "Patrones" },
]

export const foundations: NavItem[] = [
  { slug: "tokens", title: "Design tokens", description: "Las decisiones de diseño como variables, en capas." },
  { slug: "color", title: "Color", description: "Paleta de marca y colores con intención: superficie, texto, borde y feedback." },
  { slug: "typography", title: "Tipografía", description: "Familias, pesos, tamaños e interlineados." },
  { slug: "spacing", title: "Spacing", description: "Escala base 4 para espacios." },
  { slug: "radius", title: "Radius", description: "Esquinas rectas, suaves o totalmente redondeadas." },
  { slug: "shadow", title: "Shadow", description: "Sombras para separar superficies del fondo y el anillo de foco." },
  { slug: "border", title: "Border", description: "Grosores de borde." },
  { slug: "opacity", title: "Opacity", description: "Opacidades para estados deshabilitado, hover y overlay." },
  { slug: "motion", title: "Motion", description: "Cuánto dura y cómo se mueve cada transición." },
  { slug: "size", title: "Size", description: "Tamaños mínimos de toque, íconos y contenedores." },
]

const toNav = (group: "components" | "patterns"): NavItem[] =>
  piecesOf(group).map((p) => ({ slug: p.slug, title: p.title, description: p.description, cat: p.cat }))

export const components = toNav("components")
export const patterns = toNav("patterns").sort((a, b) => (a.cat ?? "").localeCompare(b.cat ?? "") || a.title.localeCompare(b.title))

export const sections: NavSection[] = [
  { key: "foundations", label: "Foundations", base: "/foundations", items: foundations },
  { key: "components", label: "Componentes", base: "/components", items: components },
  { key: "patterns", label: "Patrones", base: "/patterns", items: patterns },
]
