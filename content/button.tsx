import type { ReactNode } from "react"
import { ArrowRight, ShoppingCart } from "lucide-react"
import type { Piece, Story } from "ds-docs-theme/types"
import { Button, type ButtonVariant } from "@shop/components/ui/button"
import { sourceUrl } from "@/lib/storybook"
import { Callout, Panel, Table } from "./compat/blocks"
import { Swatch, val } from "./compat/token-ui"
import { iso, row } from "./iso"

const CTA = "Button CTA"

const VARIANTS: { v: ButtonVariant; label: string; caption: string; dark?: boolean }[] = [
  { v: "primary", label: "Primary", caption: "Acción principal de una sección. Una por bloque. Tamaño habitual: lg." },
  { v: "secondary", label: "Secondary", caption: "Acción secundaria oscura: aplicar cupón, continuar en checkout." },
  { v: "outline", label: "Outline", caption: "Acción de cuenta o alternativa." },
  { v: "neutral", label: "Neutral", caption: "Acción terciaria sobre superficie clara: cancelar, ver más." },
  { v: "inverse", label: "Inverse", dark: true, caption: "Botón blanco sobre foto o superficie oscura (banners). Siempre pill." },
  { v: "outline-inverse", label: "Outline inverse", dark: true, caption: "Botón con borde sobre foto. Alternativa secundaria a Inverse." },
  { v: "link", label: "Link", caption: "Acción con peso de texto, sin fondo: ver detalle, editar dirección." },
]
/** Para las tablas: las siete de arriba más Add to cart, que se muestra solo ahí. */
const ALL = [
  VARIANTS[0],
  { v: "add-to-cart" as ButtonVariant, label: "Add to cart", caption: "Agregar desde una card o la ficha de producto. Al agregar, lo reemplaza el Stepper. Ocupa todo el ancho.", dark: undefined },
  ...VARIANTS.slice(1),
]
const STATES = ["default", "hover", "active", "focus", "disabled"] as const
const SIZES = [
  { s: "sm", label: "Small" }, { s: "md", label: "Medium" }, { s: "lg", label: "Large" }, { s: "xl", label: "Extra large" },
] as const

const story = (id: string, label: string, node: ReactNode, caption?: string, dark?: boolean): Story => ({ id: `button-${id}`, label, caption, dark, node: iso(node) })

/** Pares de tokens del botón, para la tabla de contraste (texto: 4.5:1). */
const contrastRows = VARIANTS.filter((x) => x.v !== "link" && x.v !== "outline-inverse").flatMap((x) => [
  { element: `${x.label} · default`, fg: `button-${x.v}-fg`, bg: `button-${x.v}-bg` },
  { element: `${x.label} · hover`, fg: x.v === "outline" ? "button-outline-fg-hover" : `button-${x.v}-fg`, bg: `button-${x.v}-bg-hover` },
  { element: `${x.label} · active`, fg: x.v === "outline" ? "button-outline-fg-active" : `button-${x.v}-fg`, bg: `button-${x.v}-bg-active` },
])

export const buttonPiece: Piece = {
  slug: "button", group: "components", title: "Button", file: sourceUrl("components", "button"),
  description: "Ocho jerarquías, cuatro tamaños y estados completos.",
  docsId: "",
  purpose: [
    { title: "Iniciar una acción", text: "Los botones disparan acciones: agregar al carrito, aplicar un cupón, confirmar una compra." },
    { title: "Mostrar jerarquía", text: "Ocho jerarquías ayudan a identificar la acción principal y las secundarias en cada pantalla." },
    { title: "Cubrir los estados", text: "Hover, active, foco, disabled y loading mantienen el comportamiento predecible." },
  ],
  anatomy: {
    story: "button-anatomy", width: 520,
    parts: [
      { n: 1, label: "Contenedor", selector: ".btn", side: "left" },
      { n: 2, label: "Label", selector: ".btn", only: ["texto", "tipografia"], side: "bottom" },
      { n: 3, label: "Ícono izquierdo", note: "opcional", selector: ".btn > svg:first-child", only: ["texto", "ancho", "alto"], side: "top", pct: 22 },
      { n: 4, label: "Ícono derecho", note: "opcional", selector: ".btn > svg:last-child", only: ["texto", "ancho", "alto"], side: "top", pct: 86 },
    ],
    node: iso(<Button variant="primary" size="xl"><ShoppingCart className="icon-md" aria-hidden />{CTA}<ArrowRight className="icon-md" aria-hidden /></Button>),
  },
  stories: [],
  groups: [
    {
      title: "Variante",
      intro: "La prop `variant` define colores, radio y peso de fuente, y comunica la jerarquía de la acción en la pantalla.",
      stories: VARIANTS.map((x) => story(`variant-${x.v}`, x.label, <Button variant={x.v}>{CTA}</Button>, x.caption, x.dark)),
    },
    {
      title: "Tamaño",
      intro: "La prop `size` define alto, padding, gap, tipografía e ícono. Permite ajustar el peso visual de la acción a la densidad del layout.",
      stories: SIZES.map(({ s, label }) => story(`size-${s}`, label, <Button variant="primary" size={s}>{CTA}</Button>, `${label}: ${val(`button-size-${s}-height`)} de alto, tipografía ${val(`button-size-${s}-font-size`)} / ${val(`button-size-${s}-line-height`)}.`)),
    },
    {
      title: "Forma",
      intro: "La prop `shape` es `default` (8 px) para acciones de compra y formularios, y `pill` solo en marketing.",
      stories: [
        story("shape-default", "Default", <Button size="lg">{CTA}</Button>, "Compra, formularios y Stepper."),
        story("shape-pill", "Pill", <Button size="lg" shape="pill">{CTA}</Button>, "Hero, banners, newsletter y filtros."),
      ],
    },
    {
      title: "Íconos",
      intro: "Un ícono (lucide) a la izquierda o a la derecha del texto refuerza el significado de la acción y hereda su color.",
      stories: [
        story("icon-leading", "Ícono inicial", <Button><ShoppingCart className="icon-sm" aria-hidden />{CTA}</Button>, "Cuando el ícono aporta claridad, por ejemplo un carrito antes de «Agregar»."),
        story("icon-trailing", "Ícono final", <Button>{CTA}<ArrowRight className="icon-sm" aria-hidden /></Button>, "Indica navegación, avance o que se abrirá un menú o panel."),
        story("icon-none", "Sin ícono", <Button>{CTA}</Button>, "Opción por defecto."),
      ],
    },
    {
      title: "Estado",
      intro: "Hover y foco los resuelve CSS. `disabled` y `loading` son props; active se muestra forzado.",
      stories: [
        story("state-default", "Default", <Button size="lg">{CTA}</Button>, "Para acciones disponibles de inmediato. Probá hover, foco con Tab y click."),
        story("state-disabled", "Disabled", <Button variant="outline" size="lg" disabled>{CTA}</Button>, "Usa el set compartido button.disabled.*, sin opacidad."),
        story("state-loading", "Loading", <Button variant="outline" size="lg" loading>{CTA}</Button>, "El spinner reemplaza al ícono, mantiene el ancho y bloquea el click (aria-busy)."),
        story("state-active", "Active", <Button size="lg" className="is-active">{CTA}</Button>, "Estado presionado, forzado con una clase solo para mostrarlo."),
      ],
    },
    {
      title: "Ancho completo",
      intro: "La prop `fullWidth` estira el botón al ancho de su contenedor, para layouts apilados o angostos.",
      stories: [
        story("width-auto", "Default", <Button variant="secondary">{CTA}</Button>, "Para acciones en línea: se ajusta al contenido."),
        story("width-full", "Full width", <div className="w-[280px] max-w-full"><Button variant="secondary" fullWidth>{CTA}</Button></div>, "Mobile y acciones de drawer."),
      ],
    },
  ],
  props: [
    ["variant", "\"primary\" | \"add-to-cart\" | \"secondary\" | \"outline\" | \"neutral\" | \"inverse\" | \"outline-inverse\" | \"link\"", "Jerarquía. Por defecto primary."],
    ["size", "\"sm\" | \"md\" | \"lg\" | \"xl\"", "Tamaño. Si falta, el de cada jerarquía."],
    ["shape", "\"default\" | \"pill\"", "pill solo en marketing."],
    ["fullWidth", "boolean", "Ocupa todo el ancho del contenedor."],
    ["loading", "boolean", "Muestra spinner, mantiene el ancho y bloquea el click."],
    ["loadingText", "string", "Texto mientras carga."],
  ],
  tokenPrefixes: ["button-"],
  // la más larga primero: `outline-inverse` antes que `outline`
  tokenGroup: {
    title: "Variante",
    of: (name) => {
      const x = [...ALL].sort((a, b) => b.v.length - a.v.length).find((v) => name.startsWith(`button-${v.v}-`))
      if (x) return x.label
      const size = SIZES.find(({ s }) => name.startsWith(`button-size-${s}-`))
      if (size) return `Tamaño ${size.label}`
      if (name.startsWith("button-ghost-")) return "Ghost"
      return name.startsWith("button-shape-") ? "Forma" : "Todas"
    },
  },
  use: ["Para acciones del flujo de compra: agregar, continuar, finalizar.", "Para acciones de formulario y de cuenta.", "Un solo Primary por sección visible."],
  avoid: ["Para navegar: usá un link (`<a href>`), aunque tenga estilo de botón.", "Para mostrar un estado o una etiqueta: eso es un Badge."],
  practices: [
    { ok: true, title: "Un solo Primary por sección", text: "Deja clara la acción principal.", storyId: "p1", node: iso(row(<Button variant="neutral" size="lg">{CTA}</Button>, <Button size="lg">{CTA}</Button>)) },
    { ok: false, title: "No pongas dos Primary juntos", text: "Compiten en peso y confunden el paso siguiente.", storyId: "p2", node: iso(row(<Button size="lg">{CTA}</Button>, <Button size="lg">{CTA}</Button>)) },
    { ok: true, title: "Pill solo en marketing", text: "Hero, banners y newsletter.", storyId: "p3", node: iso(<Button size="lg" shape="pill">{CTA}</Button>) },
    { ok: false, title: "No uses pill en la compra", text: "Las acciones de compra y de formulario van con radio por defecto.", storyId: "p4", node: iso(<Button size="lg" shape="pill">{CTA}</Button>) },
  ],
  a11y: [
    "Si ejecuta una acción es `<button>`. Si navega es `<a>`, también con estilo Link.",
    "Los botones solo con ícono requieren `aria-label`.",
    "Loading: `aria-busy=\"true\"`. El label sigue en el DOM y el botón no admite doble click.",
    "Si abre un menú o popover: `aria-expanded` + `aria-controls`.",
  ],
  keyboard: [
    { keys: ["Tab", "Shift+Tab"], action: "Mueve el foco. Orden natural, sin `tabindex` positivo." },
    { keys: ["Enter", "Espacio"], action: "Activa un `<button>`. Un `<a>` solo responde a Enter." },
  ],
  extras: [
    {
      tab: "design", title: "Tokens por variante",
      node: (
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">Se leen en vivo del paquete de tokens. Pasá el mouse por un color para ver el token.</p>
          <Table
            head={["Variante", "Fondo", "Hover", "Active", "Texto", "Borde"]}
            rows={ALL.map((x) => [
              <span key="n">{x.label}</span>,
              <Swatch key="a" name={`button-${x.v}-bg`} />,
              <Swatch key="b" name={`button-${x.v}-bg-hover`} />,
              <Swatch key="c" name={`button-${x.v}-bg-active`} />,
              <Swatch key="d" name={`button-${x.v}-fg`} />,
              <Swatch key="e" name={`button-${x.v}-border`} />,
            ])}
          />
          <h3 className="text-base font-semibold">Tokens por tamaño</h3>
          <Table
            head={["Tamaño", "Alto", "Padding (y / x)", "Gap", "Tipografía", "Ícono"]}
            rows={SIZES.map(({ s, label }) => [
              <span key="s">{label}</span>,
              val(`button-size-${s}-height`),
              `${val(`button-size-${s}-padding-y`)} / ${val(`button-size-${s}-padding-x`)}`,
              val(`button-size-${s}-gap`),
              `${val(`button-size-${s}-font-size`)} / ${val(`button-size-${s}-line-height`)}`,
              val(`button-size-${s}-icon-size`),
            ])}
          />
        </div>
      ),
    },
    {
      tab: "design", title: "Estados",
      node: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Estados forzados con clases solo para mostrarlos fijos. Los botones reales responden a hover, foco con Tab y click.</p>
          <Table
            head={["Variante", ...STATES]}
            rows={ALL.map((x) => [
              <span key="n">{x.label}</span>,
              ...STATES.map((st) => (
                <div key={st} className={x.dark ? "rounded-md bg-neutral-800 p-2" : undefined}>
                  {iso(<Button variant={x.v} size="md" className={st === "default" || st === "disabled" ? undefined : `is-${st}`} disabled={st === "disabled"} tabIndex={-1}>{CTA}</Button>)}
                </div>
              )),
            ])}
          />
        </div>
      ),
    },
    {
      tab: "design", title: "Uso",
      node: (
        <pre className="overflow-x-auto rounded-lg border bg-muted p-4 font-mono text-xs"><code>{`import { Button, buttonClasses } from "@/components/ui/button"

<Button variant="add-to-cart">Button CTA</Button>
<Button size="lg" shape="pill">Button CTA</Button>
<Button loading loadingText="Procesando…">Button CTA</Button>

// Link con estilo de botón
<Link href="/productos" className={buttonClasses({ variant: "primary", shape: "pill" })}>Ver productos</Link>`}</code></pre>
      ),
    },
    {
      tab: "usage", title: "Botón o link",
      node: (
        <div className="space-y-3">
          <Table
            head={["Elemento", "Cuándo", "Ejemplo"]}
            rows={[
              [<code key="b">&lt;button&gt;</code>, "Ejecuta una acción en la misma pantalla", "Agregar, Aplicar cupón, abrir el carrito"],
              [<code key="a">&lt;a href&gt;</code>, "Lleva a otra URL, aunque se vea como botón", "«Ver productos» en un hero, «Ver todos»"],
            ]}
          />
          <Callout>La jerarquía <b>Link</b> es solo visual: el elemento depende de lo que hace. Para un <code>&lt;a&gt;</code> con estilo de botón usá <code>buttonClasses()</code>.</Callout>
        </div>
      ),
    },
    {
      tab: "usage", title: "Jerarquías",
      node: (
        <Table
          head={["Jerarquía", "Cuándo"]}
          rows={ALL.map((x) => [
            <div key="b" className={x.dark ? "rounded-md bg-neutral-800 p-2" : undefined}>{iso(<Button variant={x.v}>{CTA}</Button>)}</div>,
            <span key="t"><b>{x.label}.</b> {x.caption}</span>,
          ])}
        />
      ),
    },
    {
      tab: "accessibility", title: "Foco",
      node: (
        <Panel caption={<>Anillo <code>button.focus-ring</code> de 2 px con offset de 2 px, solo con <code>:focus-visible</code>. Sobre foto u oscuro se usa el foco inverso.</>}>
          <div className="row row--wrap align-center gap-3x">
            <Button className="is-focus">{CTA}</Button>
            <Button variant="neutral" className="is-focus">{CTA}</Button>
            <Button variant="link" className="is-focus">{CTA}</Button>
          </div>
        </Panel>
      ),
    },
    {
      tab: "accessibility", title: "Tamaño del target",
      node: (
        <div className="space-y-3">
          <Panel caption="El mínimo táctil recomendado es de 44 px de alto.">
            <div className="row row--wrap align-center gap-3x">{SIZES.map(({ s }) => <Button key={s} size={s}>{CTA}</Button>)}</div>
          </Panel>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            <li><b>lg</b> y <b>xl</b> cumplen 44 px.</li>
            <li><b>sm</b> y <b>md</b>: usalos solo en desktop o a ancho completo (por ejemplo Add to cart en una card).</li>
          </ul>
        </div>
      ),
    },
  ],
  contrast: contrastRows,
  historyColumn: "Versión de tokens",
  history: [
    { date: "4.1.0", text: "Nuevo `button.outline-inverse.*`: botón con borde sobre foto." },
    { date: "4.0.0", text: "Nuevo `button.ghost.*`. Alto y padding por jerarquía. `button.disabled-opacity`. `button.outline.bg` pasa a blanco." },
  ],
}
