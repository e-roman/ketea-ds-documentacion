import { allTokens } from "@/lib/tokens"

/** Mapa compacto de tokens para el inspector: nombre → [valor crudo (con var()), valor resuelto]. */
export function GET() {
  const map: Record<string, [string, string]> = {}
  for (const t of allTokens()) map[t.name] = [t.value, t.resolved]
  return Response.json(map)
}
