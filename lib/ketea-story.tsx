"use client"

import { useState } from "react"
import { Isolated } from "ds-docs-theme/docs/isolated"
import { KETEA_PREVIEW as BASE } from "./ketea-preview"
import { preview } from "./storybook"

/**
 * Vistas en línea de la tienda de Ketea. En vez de un iframe de Storybook por vista, se carga una sola vez el paquete
 * `mount.js` (las mismas stories, sin Storybook) y cada story se dibuja dentro de un shadow root con el CSS de la tienda.
 * El paquete se genera en el repo de la tienda (`npm run build-preview`) y se publica dentro del Storybook (`/preview`).
 * Si no está disponible (todavía no se desplegó, o la story es más nueva que el paquete) la vista cae al iframe de Storybook.
 */
type Mount = { mount: (container: HTMLElement, id: string) => () => void }
let loading: Promise<Mount> | null = null

/**
 * Las fuentes (Mulish y la de íconos) tienen que estar en el documento: un @font-face no funciona dentro de un shadow root.
 * Se piden apenas arranca el cliente y **sin bloquear la página**: una hoja en el <head> que importa Google Fonts retrasa la hidratación
 * entera si ese pedido tarda. La vista espera a las fuentes antes de mostrarse (con un tope), así que no se ve con la letra equivocada.
 */
function ensureFonts() {
  if (typeof document === "undefined" || document.querySelector("link[data-ketea-fonts]")) return
  const l = document.createElement("link")
  l.rel = "stylesheet"
  l.href = `${BASE}/fonts.css`
  l.setAttribute("data-ketea-fonts", "")
  document.head.appendChild(l)
}
ensureFonts()

/** Carga el paquete una sola vez. */
function load(): Promise<Mount> {
  loading ??= (import(/* webpackIgnore: true */ /* turbopackIgnore: true */ `${BASE}/mount.js`) as Promise<Mount>).catch((e) => {
    loading = null
    throw e
  })
  return loading
}

export function KeteaStory({ id }: { id: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <iframe src={preview.liveUrl(id)} title={`Vista ${id}`} loading="lazy" className="h-[420px] w-full border-0" />
  return (
    <Isolated
      css={[`${BASE}/style.css`]}
      external={async (el) => {
        try {
          return (await load()).mount(el, id)
        } catch (e) {
          setFailed(true)
          throw e
        }
      }}
    />
  )
}
