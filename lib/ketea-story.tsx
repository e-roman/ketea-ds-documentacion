"use client"

import { Isolated } from "ds-docs-theme/docs/isolated"

/**
 * Vistas en línea de la tienda de Ketea. En vez de un iframe de Storybook por vista, se carga una sola vez el paquete
 * `mount.js` (las mismas stories, sin Storybook) y cada story se dibuja dentro de un shadow root con el CSS de la tienda.
 * El paquete se genera en el repo de la tienda con `npm run build-preview`.
 */
const BASE = process.env.NEXT_PUBLIC_KETEA_PREVIEW ?? "/ketea-preview"

type Mount = { mount: (container: HTMLElement, id: string) => () => void; ids: () => string[] }
let loading: Promise<Mount> | null = null

/** Carga el paquete una vez y deja las fuentes en el documento (un @font-face no funciona dentro de un shadow root). */
function load(): Promise<Mount> {
  if (!document.querySelector("link[data-ketea-fonts]")) {
    const l = document.createElement("link")
    l.rel = "stylesheet"
    l.href = `${BASE}/fonts.css`
    l.setAttribute("data-ketea-fonts", "")
    document.head.appendChild(l)
  }
  loading ??= import(/* webpackIgnore: true */ /* turbopackIgnore: true */ `${BASE}/mount.js`) as Promise<Mount>
  return loading
}

export function KeteaStory({ id }: { id: string }) {
  return <Isolated css={[`${BASE}/style.css`]} external={async (el) => (await load()).mount(el, id)} />
}

