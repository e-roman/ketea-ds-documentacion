// Instala la última versión etiquetada (vX.Y.Z) de ketea-design-tokens, para que cada deploy tome los tokens vigentes sin tocar package.json.
// Solo corre en Vercel/CI (o con --force); en local la versión la manda package.json. Con --dry solo muestra qué instalaría.
import { execFileSync } from "node:child_process"
import fs from "node:fs"

const REPO = "https://github.com/e-roman/ketea-design-tokens.git"
const dry = process.argv.includes("--dry")
if (!dry && !process.env.VERCEL && !process.env.CI && !process.argv.includes("--force")) {
  console.log("update-tokens: fuera de CI, se usa la versión de package.json")
  process.exit(0)
}

const out = execFileSync("git", ["ls-remote", "--tags", "--refs", REPO], { encoding: "utf8" })
const tags = out.split("\n").map((l) => l.split("refs/tags/")[1]).filter((t) => /^v\d+\.\d+\.\d+$/.test(t ?? ""))
const num = (t) => t.slice(1).split(".").map(Number)
tags.sort((a, b) => { const [x, y] = [num(a), num(b)]; return x[0] - y[0] || x[1] - y[1] || x[2] - y[2] })
const latest = tags.at(-1)
if (!latest) { console.warn("update-tokens: no hay tags, se usa package.json"); process.exit(0) }

let installed = ""
try { installed = JSON.parse(fs.readFileSync("node_modules/@ketea/tokens/package.json", "utf8")).version } catch {}
console.log(`update-tokens: última versión ${latest} (instalada: ${installed || "ninguna"})`)
if (dry) process.exit(0)
if (installed === latest.slice(1)) process.exit(0)

try {
  execFileSync("npm", ["install", "--no-save", "--no-audit", "--no-fund", `github:e-roman/ketea-design-tokens#${latest}`], { stdio: "inherit" })
} catch {
  console.warn("update-tokens: no se pudo actualizar, se sigue con la versión instalada")
}
