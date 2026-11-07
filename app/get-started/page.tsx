import { PageContainer, PageHeader, Section } from "@/components/docs/blocks"
import { SB, TOKENS_REPO } from "@/lib/storybook"

export const metadata = { title: "Empezar · Ketea Design System" }

const code = "rounded-lg border bg-muted p-4 font-mono text-xs overflow-x-auto"

export default function GetStarted() {
  return (
    <PageContainer>
      <PageHeader
        title="Empezar"
        description="Ketea DS es el sistema de diseño de la tienda de Ketea. Reúne tokens, componentes y patrones con una sola fuente de verdad, de Figma al código."
        links={{ github: TOKENS_REPO }}
      />
      <Section title="Qué incluye">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li><b>Foundations:</b> los design tokens (color, tipografía, spacing, radius, shadow, border, opacity, motion y size).</li>
          <li><b>Componentes y patrones:</b> las piezas reales de la tienda, publicadas en <a className="underline underline-offset-4" href={SB} target="_blank" rel="noreferrer">Storybook</a>.</li>
        </ul>
      </Section>
      <Section title="Instalar los tokens" intro="Los tokens viven en un repositorio propio y se instalan por versión.">
        <pre className={code}>npm install github:e-roman/ketea-design-tokens#v2.1.0</pre>
        <p className="text-sm text-muted-foreground">Repositorio: <a className="underline underline-offset-4" href={TOKENS_REPO} target="_blank" rel="noreferrer">{TOKENS_REPO}</a></p>
      </Section>
      <Section title="Usarlos en CSS">
        <pre className={code}>{`import "@ketea/tokens/tokens.css"

.btn-primary {
  background: var(--color-brand-default);
  color: var(--color-semantic-text-on-brand);
  border-radius: var(--radius-md);
}`}</pre>
      </Section>
    </PageContainer>
  )
}
