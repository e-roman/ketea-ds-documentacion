import { SectionShell } from "ds-docs-theme/docs/section-shell"
import { sections } from "@/lib/nav"

export default function FoundationsLayout({ children }: { children: React.ReactNode }) {
  return <SectionShell section="foundations" sections={sections}>{children}</SectionShell>
}
