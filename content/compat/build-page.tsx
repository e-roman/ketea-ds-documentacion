import type { ReactNode } from "react"
import { Section } from "@/content/compat/component-page"
import { Anatomy, DoDont, Panel, Purpose, Table, WhenToUse, type Marker, type Part } from "@/content/compat/blocks"
import { Ratio, UsedTokens, ratio, val } from "@/content/compat/token-ui"
import { historyFor } from "@/lib/changelog"

type DD = Parameters<typeof DoDont>[0]["items"]

export type PageConfig = {
  purpose: { title: string; text: ReactNode }[]
  anatomy?: { node: ReactNode; markers: Marker[]; legend: { n: number; label: string; note?: string }[]; parts?: Part[] }
  config: ReactNode
  css: string // archivo en la tienda, carpeta styles/, ej. "components/chip.css"
  selector?: RegExp // limita a las reglas del componente en archivos compartidos
  tokenNote?: ReactNode
  use: ReactNode[]
  avoid: ReactNode[]
  extraUsage?: ReactNode
  dodont?: DD
  a11y: ReactNode[]
  keys?: [ReactNode, ReactNode][]
  contrast?: { label: string; fg: string; bg: string; min?: number }[]
  focus?: { node: ReactNode; caption: ReactNode }
  /** null = sin historial (por ejemplo patrones: el CHANGELOG solo registra tokens). */
  history: RegExp | null
}

/** `código` entre backticks → <code>. */
const fmt = (s: string) => s.split("`").map((p, i) => (i % 2 ? <code key={i}>{p}</code> : p))

/** Arma las 4 pestañas con la misma estructura que Button. */
export function buildPage(c: PageConfig) {
  const hist = c.history ? historyFor(c.history) : []
  const isPattern = c.history === null // los patrones no repiten el propósito (ya está en la bajada) ni el aviso de tokens
  return {
    design: (
      <>
        {!isPattern && <Purpose items={c.purpose} />}
        {c.anatomy && <Anatomy markers={c.anatomy.markers} legend={c.anatomy.legend} parts={c.anatomy.parts}>{c.anatomy.node}</Anatomy>}
        <Section title="Configuración">{c.config}</Section>
        {!(isPattern && c.tokenNote) && <Section title="Tokens">
          <p className="muted">Los tokens globales que usa el CSS real del componente, leídos del CSS de la tienda.</p>
          {c.tokenNote && <p className="muted">{c.tokenNote}</p>}
          <UsedTokens file={c.css} selector={c.selector} />
        </Section>}
      </>
    ),
    usage: (
      <>
        <WhenToUse use={c.use} avoid={c.avoid} />
        {c.extraUsage}
        {c.dodont && <DoDont items={c.dodont} />}
      </>
    ),
    accessibility: (
      <>
        <Section title="Rol y estructura"><ul className="bul">{c.a11y.map((x, i) => <li key={i}>{x}</li>)}</ul></Section>
        {c.keys && <Section title="Teclado"><Table head={["Tecla", "Acción"]} rows={c.keys} /></Section>}
        {c.contrast && (
          <Section title="Contraste">
            <Table
              head={["Elemento", "Colores", "Relación"]}
              rows={c.contrast.map((x) => [x.label, <>{x.fg.replace("color-", "")} sobre {x.bg.replace("color-", "")}</>, <Ratio key="r" r={ratio(val(x.fg), val(x.bg))} min={x.min} />])}
            />
            <p className="muted">Texto: 4.5:1 (WCAG 1.4.3). Componentes gráficos y bordes: 3:1 (WCAG 1.4.11).</p>
          </Section>
        )}
        {c.focus && <Section title="Foco"><Panel caption={c.focus.caption}>{c.focus.node}</Panel></Section>}
      </>
    ),
    updates: (
      <Section title="Historial">
        {hist.length === 0 ? (
          <p className="muted">Sin cambios registrados.</p>
        ) : (
          <Table head={["Versión de tokens", "Cambio"]} rows={hist.map((e) => [e.version, fmt(e.text)])} />
        )}
      </Section>
    ),
  }
}
