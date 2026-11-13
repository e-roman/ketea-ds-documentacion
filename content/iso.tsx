import { Fragment, type ReactNode } from "react"
import { Isolated } from "ds-docs-theme/docs/isolated"
import { SHOP_CSS } from "@/lib/project"

/** Una vista con el CSS de la tienda, aislada del theme (shadow root). */
export const iso = (node: ReactNode) => <Isolated css={SHOP_CSS}>{node}</Isolated>

/** Fila de piezas con el gap por token de la tienda. */
export const row = (...nodes: ReactNode[]) => <div className="row row--wrap align-center gap-3x">{nodes.map((n, i) => <Fragment key={i}>{n}</Fragment>)}</div>
