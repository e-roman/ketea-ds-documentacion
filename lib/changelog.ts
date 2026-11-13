import { execSync } from "node:child_process"

export type Entry = { version: string; text: string }

let cache: Entry[] | null = null

/** Lee el CHANGELOG del repo de tokens en el tag instalado (no viaja en el paquete npm). Si no hay git local, devuelve []. */
function all(): Entry[] {
  if (cache) return cache
  try {
    const md = execSync("git -C ../ketea-design-tokens show v3.0.0:CHANGELOG.md", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] })
    let version = ""
    cache = []
    for (const line of md.split("\n")) {
      const h = line.match(/^## (\S+)/)
      if (h) version = h[1]
      else if (version && line.startsWith("- ")) cache.push({ version, text: line.slice(2) })
    }
  } catch {
    cache = []
  }
  return cache
}

/** Entradas del changelog cuyo texto coincide con la expresión. */
export const historyFor = (re: RegExp) => all().filter((e) => re.test(e.text))
