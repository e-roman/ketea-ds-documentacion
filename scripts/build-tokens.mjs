// Arma .generated/tokens.css = tokens de @ketea/tokens + variables de la tienda (shop/styles/ketea-theme.css).
// Las variables por componente (--button-primary-bg…) y las semánticas viven en el tema de la tienda, no en el paquete de tokens:
// la documentación las necesita juntas para listar tokens y rastrear cada valor hasta su origen.
import fs from "node:fs"
import path from "node:path"

const tokens = path.resolve("node_modules/@ketea/tokens/dist/tokens.css")
const theme = path.resolve("shop/styles/ketea-theme.css")
for (const f of [tokens, theme]) {
  if (!fs.existsSync(f)) { console.error(`build-tokens: falta ${f}`); process.exit(1) }
}
fs.mkdirSync(".generated", { recursive: true })
fs.writeFileSync(".generated/tokens.css", fs.readFileSync(tokens, "utf8") + "\n" + fs.readFileSync(theme, "utf8"))
console.log("build-tokens: .generated/tokens.css generado")
