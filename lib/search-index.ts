import { components, foundations, patterns } from "@/lib/nav"
import type { SearchEntry } from "@/lib/search"
import { allTokens } from "@/lib/tokens"

/** Página donde se documenta un token, según su prefijo. */
function tokenPage(name: string): { path: string; crumb: string } {
  const f = (slug: string, label: string) => ({ path: `/foundations/${slug}`, crumb: `Foundations › ${label}` })
  if (name.startsWith("color-")) return f("color", "Color")
  if (name.startsWith("font-")) return f("typography", "Tipografía")
  if (name.startsWith("spacing-")) return f("spacing", "Spacing")
  if (name.startsWith("radius-")) return f("radius", "Radius")
  if (name.startsWith("shadow-")) return f("shadow", "Shadow")
  if (name.startsWith("border-width-")) return f("border", "Border")
  if (name.startsWith("opacity-")) return f("opacity", "Opacity")
  if (name.startsWith("size-")) return f("size", "Size")
  return f("tokens", "Design tokens")
}

/** Todas las páginas y tokens del sitio, para el buscador. Se genera al construir. */
export function searchIndex(): SearchEntry[] {
  const out: SearchEntry[] = [
    { id: "p:get-started", type: "page", group: "Empezar", title: "Empezar", path: "/get-started", crumb: "Empezar", desc: "Qué es el sistema de diseño de Ketea y cómo usarlo en un proyecto.", keywords: "instalar install setup inicio primeros pasos" },
  ]
  for (const f of foundations) out.push({ id: `f:${f.slug}`, type: "page", group: "Foundations", title: f.title, path: `/foundations/${f.slug}`, crumb: `Foundations › ${f.title}`, desc: f.description })
  for (const c of components) out.push({ id: `c:${c.slug}`, type: "page", group: "Componentes", title: c.title, path: `/components/${c.slug}`, crumb: `Componentes › ${c.title}`, desc: c.description })
  for (const p of patterns) out.push({ id: `pt:${p.slug}`, type: "page", group: "Patrones", title: p.title, path: `/patterns/${p.slug}`, crumb: `Patrones › ${p.title}`, desc: p.description })
  for (const t of allTokens()) {
    const { path, crumb } = tokenPage(t.name)
    out.push({ id: `t:${t.name}`, type: "token", group: "Tokens", title: `--${t.name}`, path, crumb, value: t.resolved })
  }
  return out
}
