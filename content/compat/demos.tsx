"use client"
import { useState } from "react"
import { Button } from "@shop/components/ui/button"
import { ChevronDown } from "lucide-react"
import { Stepper, type StepperProps } from "@shop/components/ui/stepper"
import { Tabs } from "@shop/components/ui/tabs"

const noop = () => {}

/** Stepper estático (para mostrar estados fijos). */
export function StepperStatic(props: Partial<StepperProps> & { value: number }) {
  return <Stepper label="Robot limpia piscina Dolphin Liberty 400" onDecrement={noop} onIncrement={noop} {...props} />
}

/** Stepper interactivo con estado propio. */
export function StepperLive({ size = "md", start = 1, max = 12 }: { size?: StepperProps["size"]; start?: number; max?: number }) {
  const [v, setV] = useState(start)
  return (
    <div className={size === "sm" ? "demo-w-120" : "demo-w-160"}>
      <Stepper label="Robot limpia piscina Dolphin Liberty 400" size={size} value={v} max={max} onDecrement={() => setV((x) => Math.max(0, x - 1))} onIncrement={() => setV((x) => x + 1)} />
    </div>
  )
}

/** Add to cart ⇄ Stepper: un mismo slot que cambia de estado. */
export function AddToCartSwap() {
  const [n, setN] = useState(0)
  return (
    <div className="demo-w-200">
      {n === 0 ? (
        <Button variant="add-to-cart" onClick={() => setN(1)}>Agregar</Button>
      ) : (
        <Stepper label="Robot limpia piscina Dolphin Liberty 400" value={n} size="md" onDecrement={() => setN(n - 1)} onIncrement={() => setN(n + 1)} />
      )}
    </div>
  )
}

const TAB_ITEMS = [
  { id: "destacados", label: "Destacados" },
  { id: "ofertas", label: "Ofertas" },
  { id: "novedades", label: "Novedades" },
] as const

export function TabsLive() {
  const [v, setV] = useState<(typeof TAB_ITEMS)[number]["id"]>("destacados")
  return (
    <div className="demo-w-360">
      <Tabs label="Categorías de ejemplo" items={TAB_ITEMS} value={v} onChange={setV} />
      <div role="tabpanel" id={`panel-${v}`} aria-labelledby={`tab-${v}`} className="demo-tabpanel">
        Contenido de «{TAB_ITEMS.find((t) => t.id === v)?.label}».
      </div>
    </div>
  )
}

export function AccordionLive({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState<number | null>(0)
  const items = [
    { q: "Pregunta de ejemplo 1", a: "Respuesta de ejemplo: el panel muestra el contenido de la sección." },
    { q: "Pregunta de ejemplo 2", a: "Con allowMultiple falso, abrir una cierra la anterior." },
    { q: "Pregunta de ejemplo 3", a: "El estado vive en aria-expanded del botón." },
  ]
  return (
    <div className="accordion demo-w-420">
      {items.map((it, i) => (
        <div key={it.q} className="accordion__item">
          <button type="button" className={compact ? "accordion__trigger accordion__trigger--compact" : "accordion__trigger"} aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
            <span>{it.q}</span>
            <ChevronDown className="accordion__chevron" aria-hidden="true" />
          </button>
          {open === i && <div className="accordion__panel">{it.a}</div>}
        </div>
      ))}
    </div>
  )
}
