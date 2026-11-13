import type { ReactNode } from "react"
import { Section as ThemeSection } from "ds-docs-theme/docs/blocks"

/**
 * Sección de las páginas anteriores. El extractor (extract.tsx) la lee por su título para armar los campos de la pieza;
 * si queda como sección libre, se dibuja con el Section del theme.
 */
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return <ThemeSection title={title}>{children}</ThemeSection>
}
