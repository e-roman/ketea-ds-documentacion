import type { ReactNode } from "react"
import type { Piece, Story } from "ds-docs-theme/types"
import { Badge, type BadgeVariant } from "@shop/components/ui/badge"
import { sourceUrl } from "@/lib/storybook"
import { Panel } from "./compat/blocks"
import { iso } from "./iso"

const ITEMS: { v: BadgeVariant; label: string; text: string; caption: string; fg: string; bg: string }[] = [
  { v: "discount", label: "Discount", text: "-25% OFF", caption: "Descuento sobre un producto, como «-25% OFF». Fondo amarillo claro y texto oscuro.", fg: "badge-discount-fg", bg: "badge-discount-bg" },
  { v: "counter", label: "Counter", text: "3", caption: "Cantidad sobre un ícono (por ejemplo el carrito). Siempre redondo.", fg: "badge-counter-fg", bg: "badge-counter-bg" },
  { v: "outline", label: "Outline", text: "2 productos", caption: "Contador en títulos (carrito, drawer). Con borde y fondo blanco.", fg: "color-text-brand", bg: "color-surface-default" },
]

const story = (id: string, label: string, node: ReactNode, caption?: string): Story => ({ id: `badge-${id}`, label, caption, node: iso(node) })

export const badgePiece: Piece = {
  slug: "badge", group: "components", title: "Badge", file: sourceUrl("components", "badge"),
  description: "Etiquetas de descuento y contador.",
  docsId: "",
  purpose: [
    { title: "Etiquetar", text: "Marca un producto con una característica corta, como un descuento." },
    { title: "Contar", text: "Muestra una cantidad sobre un ícono o junto a un título." },
    { title: "No es una acción", text: "Un badge informa, no se presiona. Para acciones usá un Button." },
  ],
  anatomy: {
    story: "badge-anatomy", width: 360,
    parts: [
      { n: 1, label: "Contenedor", selector: ".badge", side: "left" },
      { n: 2, label: "Label", note: "texto o número", selector: ".badge", only: ["texto", "tipografia"], side: "bottom" },
    ],
    node: iso(<Badge variant="discount">-25% OFF</Badge>),
  },
  stories: [],
  groups: [
    {
      title: "Variante",
      intro: "La prop `variant` define colores, radio y tipografía. Discount usa radio de 4 px para no competir con los botones redondeados; counter es redondo.",
      stories: ITEMS.map((x) => story(`variant-${x.v}`, x.label, <Badge variant={x.v}>{x.text}</Badge>, x.caption)),
    },
    {
      title: "Contador sobre un ícono",
      intro: "El counter se posiciona sobre el ícono que cuenta; la posición la define el componente que lo contiene.",
      stories: [
        story("counter-cart", "Carrito", (
          <span className="badge-anchor">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" /><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" /></svg>
            <span className="badge-anchor__count"><Badge variant="counter">{3}</Badge></span>
          </span>
        ), "Contador de 16 px con número de 11 px en negrita."),
      ],
    },
  ],
  props: [
    ["variant", "\"discount\" | \"counter\" | \"outline\"", "Colores, radio y tipografía.", true],
    ["className", "string", "Clases extra."],
  ],
  tokenPrefixes: ["badge-"],
  tokenGroup: { title: "Variante", of: (name) => ITEMS.find((x) => name.startsWith(`badge-${x.v}-`))?.label ?? "Todas" },
  use: ["Para destacar una característica corta de un producto.", "Para mostrar un descuento o una cantidad.", "Con texto breve: una o dos palabras, o un número."],
  avoid: ["Para una acción o navegación: usá Button o un link.", "Para mensajes largos o importantes: usá un aviso (callout).", "Más de uno o dos badges sobre el mismo producto."],
  practices: [
    { ok: true, title: "Texto corto", text: "Una o dos palabras se leen de un vistazo.", storyId: "p1", node: iso(<Badge variant="discount">-25% OFF</Badge>) },
    { ok: false, title: "Evitá frases largas", text: "El badge pierde su función de etiqueta.", storyId: "p2", node: iso(<Badge variant="discount">Descuento exclusivo para clientes que pagan con transferencia</Badge>) },
  ],
  a11y: [
    "Es un `<span>` sin rol: el texto se lee como contenido normal.",
    "No transmitas información solo con el color: el texto del badge debe decirlo (por ejemplo «-25% OFF», no solo un fondo amarillo).",
    "Un counter suelto es solo un número: acompañalo de un texto accesible en el elemento que lo contiene (por ejemplo `aria-label=\"Carrito, 3 productos\"`).",
  ],
  extras: [
    {
      tab: "accessibility", title: "Tamaño",
      node: (
        <Panel caption="El badge no es interactivo, así que no aplica el tamaño mínimo táctil.">
          <div className="row row--wrap align-center gap-3x">{ITEMS.map((x) => <Badge key={x.v} variant={x.v}>{x.text}</Badge>)}</div>
        </Panel>
      ),
    },
  ],
  contrast: ITEMS.map((x) => ({ element: x.label, fg: x.fg, bg: x.bg })),
  historyColumn: "Versión de tokens",
  history: [],
}
