"use client"
import { useState } from "react"
import { Button } from "@shop/components/ui/button"
import { CheckoutCta } from "@shop/components/patterns/checkout-cta"
import { Drawer } from "@shop/components/patterns/drawer"
import { Modal } from "@shop/components/patterns/modal"
import { StepIndicator } from "@shop/components/patterns/step-indicator"

const STEPS = [
  { id: "carrito", label: "Carrito" },
  { id: "envio", label: "Envío" },
  { id: "pago", label: "Pago" },
] as const
type StepId = (typeof STEPS)[number]["id"]

export function StepDemo({ start = "envio" as StepId }) {
  const [cur, setCur] = useState<StepId>(start)
  return (
    <div className="demo-w-460 shop-scope">
      <StepIndicator steps={[...STEPS]} current={cur} onStepClick={setCur} />
      <div className="demo-row demo-mt-16">
        <Button variant="neutral" size="sm" onClick={() => setCur(STEPS[Math.max(0, STEPS.findIndex((s) => s.id === cur) - 1)].id)}>Anterior</Button>
        <Button size="sm" onClick={() => setCur(STEPS[Math.min(STEPS.length - 1, STEPS.findIndex((s) => s.id === cur) + 1)].id)}>Siguiente</Button>
      </div>
    </div>
  )
}

export function ModalDemo({ size = "sm", role = "dialog", closeButton = false, label }: { size?: "sm" | "md"; role?: "dialog" | "alertdialog"; closeButton?: boolean; label: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Abrir modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} label={label} size={size} role={role} closeButton={closeButton}>
        <div className="shop-scope demo-stack-12">
          <b>{label}</b>
          <span className="muted">Contenido de ejemplo. Cerrá con Escape, con el fondo o con el botón.</span>
          <div className="demo-row demo-row-end">
            <Button variant="neutral" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={() => setOpen(false)}>Aceptar</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export function DrawerDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Abrir drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Tu carrito" count="2 productos">
        <div className="shop-scope demo-pad-16">Contenido de ejemplo del drawer.</div>
      </Drawer>
    </>
  )
}

export function CtaDemo({ loading = false }: { loading?: boolean }) {
  return (
    <div className="demo-w-320 shop-scope">
      <CheckoutCta loading={loading} onClick={() => {}} />
    </div>
  )
}
