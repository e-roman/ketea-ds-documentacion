import { buildSearchIndex } from "ds-docs-theme/lib/search-index"
import type { SearchEntry } from "ds-docs-theme/lib/search"
import { components, foundations, patterns } from "@/lib/nav"
import { allTokens } from "@/lib/project"

/** Todas las páginas y tokens del sitio, para el buscador. Se genera al construir. */
export function searchIndex(): SearchEntry[] {
  return buildSearchIndex({
    pages: [{ id: "p:get-started", type: "page", group: "Empezar", title: "Empezar", path: "/get-started", crumb: "Empezar", desc: "Qué es el sistema de diseño de Ketea y cómo usarlo en un proyecto.", keywords: "instalar install setup inicio primeros pasos" }],
    foundations, components, patterns, tokens: allTokens(),
  })
}
