// Deja el código de la tienda en ./shop (dentro del proyecto, ignorado por git), que es de donde lo lee la documentación (@shop/*).
// - Con ../ketea-tienda-spike presente (local) se copia de ahí, sin node_modules ni .git; se puede apuntar a otra carpeta con SHOP_SRC.
// - Sin esa carpeta (Vercel, CI) se clona su rama main (o SHOP_BRANCH). El repo es público: GH_TOKEN es opcional (solo si pasa a privado).
// Va dentro del proyecto porque Vercel solo empaqueta lo que está dentro del repo.
import fs from "node:fs"
import path from "node:path"
import { execFileSync } from "node:child_process"

const dest = path.resolve("shop")
const src = path.resolve(process.env.SHOP_SRC ?? path.join("..", "ketea-tienda-spike"))
const SKIP = new Set(["node_modules", ".git", ".next", "storybook-static"])

fs.rmSync(dest, { recursive: true, force: true })

if (fs.existsSync(path.join(src, "package.json"))) {
  fs.cpSync(src, dest, { recursive: true, filter: (p) => !SKIP.has(path.basename(p)) })
  console.log(`fetch-shop: ${src} copiada en ./shop`)
  process.exit(0)
}

const token = process.env.GH_TOKEN
const url = token ? `https://x-access-token:${token}@github.com/e-roman/ketea-tienda-spike.git` : "https://github.com/e-roman/ketea-tienda-spike.git"
const branch = process.env.SHOP_BRANCH || "main"
try {
  execFileSync("git", ["clone", "--depth", "1", "--branch", branch, url, dest], { stdio: ["ignore", "inherit", "inherit"] })
  fs.rmSync(path.join(dest, ".git"), { recursive: true, force: true })
  console.log(`fetch-shop: ketea-tienda-spike (${branch}) clonada en ./shop`)
} catch {
  console.error("fetch-shop: no se pudo clonar ketea-tienda-spike. Si el repo pasó a privado, definí GH_TOKEN en las variables de entorno.")
  process.exit(1)
}
