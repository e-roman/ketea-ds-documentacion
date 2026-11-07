// Genera las capturas de Storybook que muestra la documentación: public/shots/<id-de-la-story>.jpg y lib/shots.json (medidas).
// Uso: node scripts/shots.mjs [slug]
//   SB_URL=http://localhost:6030 node scripts/shots.mjs      (por defecto usa el Storybook publicado de lib/storybook.ts)
// Necesita Chrome instalado y `playwright`, que se toma de la carpeta hermana ../ketea-tienda/node_modules.
import fs from "node:fs"
import { createRequire } from "node:module"
import ts from "typescript"

const require = createRequire(import.meta.url)
const { chromium } = require("../../ketea-tienda/node_modules/playwright")

const src = ts.transpileModule(fs.readFileSync("lib/pieces.ts", "utf8"), { compilerOptions: { module: "ESNext", target: "ES2020" } }).outputText
const { pieces } = await import("data:text/javascript;base64," + Buffer.from(src).toString("base64"))
const SB = process.env.SB_URL ?? fs.readFileSync("lib/storybook.ts", "utf8").match(/\?\? "([^"]+)"/)[1]
const only = process.argv[2]

// Cada story de cada pieza, más las de los ejemplos «sí / no». El ancho del marco es el de la captura.
const jobs = new Map()
for (const p of pieces) {
  if (only && p.slug !== only) continue
  for (const s of p.stories) jobs.set(s.id, { w: s.width ?? 1280 })
  for (const pr of p.practices ?? []) if (!jobs.has(pr.storyId)) jobs.set(pr.storyId, { w: 1280 })
}

fs.mkdirSync("public/shots", { recursive: true })
const dims = fs.existsSync("lib/shots.json") ? JSON.parse(fs.readFileSync("lib/shots.json", "utf8")) : {}
const browser = await chromium.launch({ channel: "chrome" })
let errors = 0

for (const [id, { w }] of jobs) {
  const page = await browser.newPage({ viewport: { width: w, height: 800 }, deviceScaleFactor: 2 })
  await page.goto(`${SB}/iframe.html?id=${id}&viewMode=story&embed=1`, { waitUntil: "networkidle" })
  await page.waitForTimeout(1500)
  if (await page.locator(".sb-errordisplay:visible, #error-message:visible").count()) {
    console.log("ERROR en la story", id)
    errors++
    await page.close()
    continue
  }
  // Los overlays fijos (modales, paneles, chat) no ocupan lugar: se toma el viewport con el alto que reserva la story.
  const info = await page.evaluate(() => {
    const root = document.getElementById("storybook-root")
    const fixed = [...root.querySelectorAll("*")].some((e) => getComputedStyle(e).position === "fixed") || !!document.querySelector(".modal.show, .offcanvas.show")
    // caja que contiene a todos los hijos del root (un componente puede devolver varios elementos hermanos)
    const rects = [...root.children].map((c) => c.getBoundingClientRect()).filter((r) => r.width > 0 && r.height > 0)
    const rr = root.getBoundingClientRect()
    const x0 = rects.length ? Math.min(...rects.map((r) => r.left)) : rr.left
    const y0 = rects.length ? Math.min(...rects.map((r) => r.top)) : rr.top
    const x1 = rects.length ? Math.max(...rects.map((r) => r.right)) : rr.right
    const y1 = rects.length ? Math.max(...rects.map((r) => r.bottom)) : rr.bottom
    return { fixed, rootH: Math.ceil(rr.height), box: { x: x0 + scrollX, y: y0 + scrollY, width: x1 - x0, height: y1 - y0 } }
  })
  const file = `public/shots/${id}.jpg`
  if (info.fixed) {
    const h = Math.min(Math.max(info.rootH, 300), 900)
    await page.setViewportSize({ width: w, height: h })
    await page.waitForTimeout(600)
    await page.screenshot({ path: file, type: "jpeg", quality: 85 })
    dims[id] = [w, h]
  } else {
    const pad = 16
    const x = Math.max(info.box.x - pad, 0)
    const y = Math.max(info.box.y - pad, 0)
    const width = Math.min(info.box.width + pad * 2, w - x)
    const height = Math.ceil(info.box.height + pad * 2)
    await page.screenshot({ path: file, type: "jpeg", quality: 85, fullPage: true, clip: { x, y, width, height } })
    dims[id] = [Math.round(width), height]
  }
  console.log(id, dims[id].join("x"), Math.round(fs.statSync(file).size / 1024) + "KB")
  await page.close()
}
fs.writeFileSync("lib/shots.json", JSON.stringify(dims, null, 1))
await browser.close()
if (errors) process.exitCode = 1
