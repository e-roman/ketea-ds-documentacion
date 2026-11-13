import { tokenMap } from "ds-docs-theme/lib/tokens"
import { allTokens } from "@/lib/project"

/** Mapa compacto de tokens para el inspector: nombre → [valor crudo (con var()), valor resuelto]. */
export function GET() {
  return Response.json(tokenMap(allTokens()))
}
