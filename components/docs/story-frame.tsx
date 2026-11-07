"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Story de Storybook embebida. La story le avisa su alto por postMessage (.storybook/preview.jsx de la tienda)
 * y el iframe se ajusta, así no queda ninguna barra de scroll. Hasta que llega el primer aviso usa `fallbackHeight`
 * y deja el scroll disponible, para no cortar el contenido si el Storybook publicado todavía no lo envía.
 */
export function StoryFrame({ title, src, fallbackHeight = 200, className = "" }: { title: string; src: string; fallbackHeight?: number; className?: string }) {
  const ref = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState<number | null>(null)

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.source !== ref.current?.contentWindow) return
      const d = e.data as { source?: string; height?: number } | null
      if (d?.source === "ketea-story" && typeof d.height === "number") setHeight(Math.max(d.height, 40))
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  return (
    <iframe
      ref={ref}
      title={title}
      src={src}
      loading="lazy"
      scrolling={height === null ? "auto" : "no"}
      style={{ height: height ?? fallbackHeight }}
      className={`block w-full overflow-hidden ${className}`}
    />
  )
}
