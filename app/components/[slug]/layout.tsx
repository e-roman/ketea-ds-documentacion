import { SectionShell } from "@/components/docs/section-shell"

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return <SectionShell section="components">{children}</SectionShell>
}
