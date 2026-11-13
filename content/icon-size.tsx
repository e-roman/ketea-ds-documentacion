"use client"

import { useEffect, useRef, useState } from "react"

/** Muestra el tamaño real (en px) que da una clase icon-*, medido en el navegador a partir del CSS de la tienda. Va dentro de un shadow root con shop.css. */
export default function IconSize({ cls }: { cls: string }) {
  const probe = useRef<HTMLSpanElement>(null)
  const [px, setPx] = useState("")
  useEffect(() => {
    // espera un instante a que el shadow root cargue shop.css antes de medir
    const id = setTimeout(() => {
      if (probe.current) setPx(`${Math.round(probe.current.getBoundingClientRect().width)} px`)
    }, 400)
    return () => clearTimeout(id)
  }, [])
  return (
    <>
      <span ref={probe} className={`${cls} icon-probe`} aria-hidden />
      <code className="font-mono text-xs">{px || "…"}</code>
    </>
  )
}
