// Compila el CSS de la tienda (Tailwind 3 + su config) a public/shop.css.
// La documentación usa Tailwind 4; el CSS de la tienda se carga solo dentro de los shadow roots (componente Isolated del theme),
// así que se compila aparte con su propio Tailwind (devDependency "tailwindcss3") y no se mezcla con el del theme.
// Parte de app/globals.css de la tienda (solo lectura): html/body no existen dentro de un shadow root, sus estilos pasan a :host.
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { execFileSync } from "node:child_process"

const shop = path.resolve("shop")
const docs = process.cwd()
if (!fs.existsSync(path.join(shop, "app/globals.css"))) {
  console.error("build-shop-css: no existe ./shop (corré scripts/fetch-shop.mjs)")
  process.exit(1)
}

const slash = (p) => p.replace(/\\/g, "/")
let css = fs.readFileSync(path.join(shop, "app/globals.css"), "utf8").replace(/\r\n/g, "\n")
css = css.replace(/@import "\.\.\/styles\//g, `@import "${slash(shop)}/styles/`)
css = css.replace(/html \{\n  scroll-behavior: smooth;\n  -webkit-font-smoothing: antialiased;\n\}/, ":host { -webkit-font-smoothing: antialiased; }")
css = css.replace(/body \{\n  background-color: var\(--color-surface-default\);\n  color: var\(--color-text-primary\);\n  font-family: var\(--font-family-sans\);\n  min-height: 100vh;\n\}/, ":host { display: block; color: var(--color-text-primary); font-family: var(--font-family-sans); }")
css = css.replace(/@media \(prefers-reduced-motion: reduce\) \{\n  html \{ scroll-behavior: auto; \}\n/, "@media (prefers-reduced-motion: reduce) {\n")

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "shop-css-"))
const entry = path.join(tmp, "entry.css")
fs.writeFileSync(entry, css)

// Utilidades de Tailwind: las clases de la tienda y las de los demos de esta documentación.
const content = ["app", "components", "lib"].map((d) => `${slash(shop)}/${d}/**/*.{ts,tsx}`)
  .concat(["components", "content", "lib"].map((d) => `${slash(docs)}/${d}/**/*.{ts,tsx}`))

const cli = path.join(docs, "node_modules/tailwindcss3/lib/cli.js")
fs.mkdirSync("public", { recursive: true })
execFileSync(process.execPath, [cli, "-c", path.join(shop, "tailwind.config.ts"), "-i", entry, "-o", path.join(docs, "public/shop.css"), "--content", content.join(",")], { cwd: shop, stdio: ["ignore", "inherit", "inherit"] })
fs.rmSync(tmp, { recursive: true, force: true })
console.log("build-shop-css: public/shop.css generado")
