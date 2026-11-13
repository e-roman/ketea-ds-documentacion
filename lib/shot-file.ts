import fs from "node:fs"
import path from "node:path"
import shots from "@/lib/shots.json"

const dims = shots as unknown as Record<string, [number, number]>
const PUBLIC = path.join(process.cwd(), "public", "patterns")

/** Medidas de un SVG: width/height si están, si no el viewBox. */
function svgSize(file: string): [number, number] | null {
  const head = fs.readFileSync(file, "utf8").slice(0, 2000)
  const tag = head.match(/<svg[^>]*>/i)?.[0] ?? ""
  const w = tag.match(/\swidth="([\d.]+)(px)?"/i)
  const h = tag.match(/\sheight="([\d.]+)(px)?"/i)
  if (w && h) return [Math.round(+w[1]), Math.round(+h[1])]
  const vb = tag.match(/viewBox="[\d.\-]+[ ,]+[\d.\-]+[ ,]+([\d.]+)[ ,]+([\d.]+)"/i)
  return vb ? [Math.round(+vb[1]), Math.round(+vb[2])] : null
}

/** Medidas de un PNG (cabecera IHDR). */
function pngSize(file: string): [number, number] {
  const b = fs.readFileSync(file)
  return [b.readUInt32BE(16), b.readUInt32BE(20)]
}

/**
 * Imagen de la vista n de un patrón: `public/patterns/{slug}-{n}.svg`, y si no existe `.png`, y si no `.jpg` (captura de Storybook).
 * Los SVG de Figma tienen prioridad: se ven nítidos a cualquier tamaño.
 */
export function resolveShot(slug: string, n: number, fallbackW: number): { src: string; w: number; h: number } {
  for (const ext of ["svg", "png"] as const) {
    const f = path.join(PUBLIC, `${slug}-${n}.${ext}`)
    if (fs.existsSync(f)) {
      const size = ext === "svg" ? svgSize(f) : pngSize(f)
      if (size) return { src: `/patterns/${slug}-${n}.${ext}`, w: size[0], h: size[1] }
    }
  }
  const src = `/patterns/${slug}-${n}.jpg`
  const [w, h] = dims[src] ?? [fallbackW, 400]
  return { src, w, h }
}
