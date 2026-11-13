import { Isolated } from "ds-docs-theme/docs/isolated"
import { NavMobileEmbed } from "@/content/live"
import { SHOP_CSS } from "@/lib/project"

/** Se carga dentro de un iframe de 390 px desde el patrón Header (vista Mobile), para que apliquen los breakpoints reales. */
export default function Page() {
  return (
    <div data-embed>
      <Isolated css={SHOP_CSS}><NavMobileEmbed /></Isolated>
    </div>
  )
}
