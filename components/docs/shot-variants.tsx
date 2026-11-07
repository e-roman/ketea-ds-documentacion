"use client"

import { useState } from "react"
import { ExternalLink } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import shots from "@/lib/shots.json"

const dims = shots as unknown as Record<string, [number, number]>

export type ShotVariant = { label: string; id: string; /** Enlace a la story en Storybook. */ href: string }

/** Captura de una story de Storybook, en su tamaño real. Si todavía no se generó, avisa en lugar de dejar un hueco. */
export function Shot({ id, alt, className = "" }: { id: string; alt: string; className?: string }) {
  const d = dims[id]
  if (!d) return <p className="p-6 text-sm text-muted-foreground">Sin captura todavía: corré <code className="font-mono">node scripts/shots.mjs</code>.</p>
  // eslint-disable-next-line @next/next/no-img-element -- capturas estáticas con medidas conocidas
  return <img src={`/shots/${id}.jpg`} width={d[0]} height={d[1]} alt={alt} loading="lazy" decoding="async" className={`mx-auto block h-auto max-w-full ${className}`} />
}

/**
 * Vistas de una pieza: control segmentado, una captura sobre fondo blanco y enlace a la story interactiva.
 * Mismo esquema que la documentación de Orali (capturas de Storybook, una vista por vez).
 */
export function ShotVariants({ title, items }: { title: string; items: ShotVariant[] }) {
  const [value, setValue] = useState(items[0].id)
  const cur = items.find((i) => i.id === value) ?? items[0]
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/40 px-4 py-3">
        {items.length > 1 ? (
          <Tabs value={value} onValueChange={(v) => setValue(String(v))}>
            <TabsList aria-label={`Vistas de ${title}`}>
              {items.map((i) => <TabsTrigger key={i.id} value={i.id}>{i.label}</TabsTrigger>)}
            </TabsList>
          </Tabs>
        ) : (
          <span className="text-sm font-medium">{cur.label}</span>
        )}
        <a href={cur.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          Abrir en Storybook <ExternalLink className="size-3.5" aria-hidden />
        </a>
      </div>
      <div className="overflow-x-auto bg-white p-6">
        <Shot id={cur.id} alt={`${title}: ${cur.label}`} />
      </div>
    </div>
  )
}
