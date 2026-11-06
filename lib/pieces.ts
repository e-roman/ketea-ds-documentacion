/** Componentes y patrones documentados. Se agrega una pieza acá cuando tiene stories en Storybook. */

export type Prop = [name: string, type: string, desc: string, required?: boolean]
export type Story = { label: string; id: string }

export type Piece = {
  slug: string
  group: "components" | "patterns"
  /** Categoría del sidebar de patrones. */
  cat?: string
  title: string
  description: string
  /** Archivo en src/components de la tienda. */
  file: string
  /** id de la página Docs en Storybook. */
  docsId: string
  /** Alto del preview en px (por defecto 200). */
  previewHeight?: number
  stories: Story[]
  props: Prop[]
  use: string[]
  avoid: string[]
}

export const pieces: Piece[] = [
  {
    slug: "button-spinner", group: "components", title: "Button spinner", file: "ButtonSpinner.jsx",
    description: "Spinner y texto de carga dentro de un botón mientras se procesa una acción.",
    docsId: "components-button-spinner--docs",
    stories: [
      { label: "Idle", id: "components-button-spinner--idle" },
      { label: "Loading", id: "components-button-spinner--loading" },
    ],
    props: [
      ["loading", "boolean", "Muestra el spinner y el texto de carga. Si es falso, devuelve el contenido normal."],
      ["loadingText", "string", "Texto junto al spinner."],
      ["children", "ReactNode", "Contenido del botón cuando no está cargando."],
    ],
    use: ["Dentro de un botón que dispara una acción asíncrona."],
    avoid: ["Para cargas de una página o un bloque: usá un skeleton."],
  },
  {
    slug: "quantity-control", group: "components", title: "Quantity control", file: "QuantityControl.jsx",
    description: "Control para aumentar o disminuir la cantidad de un producto.",
    docsId: "components-quantity-control--docs",
    stories: [
      { label: "Default", id: "components-quantity-control--default" },
      { label: "En el mínimo", id: "components-quantity-control--at-minimum" },
    ],
    props: [
      ["item", "{ id, quantity }", "Ítem con su cantidad actual.", true],
      ["onIncrease", "(item) => void", "Se llama al sumar una unidad.", true],
      ["onDecrease", "(item) => void", "Se llama al restar una unidad.", true],
      ["min", "number", "Cantidad mínima permitida. Por defecto 1."],
    ],
    use: ["En el carrito y en el detalle de producto, para elegir cuántas unidades."],
    avoid: ["Para cantidades que el usuario deba tipear: el campo es de solo lectura."],
  },
  {
    slug: "product-card", group: "components", title: "Product card", file: "ProductCard.jsx",
    description: "Card de producto en grillas y listados, con favorito, vista rápida y agregar al carrito.",
    docsId: "components-product-card--docs",
    previewHeight: 500,
    stories: [
      { label: "Con descuento", id: "components-product-card--with-discount" },
      { label: "Sin descuento", id: "components-product-card--without-discount" },
      { label: "Sin stock", id: "components-product-card--out-of-stock" },
      { label: "Cargando", id: "components-product-card--loading" },
    ],
    props: [
      ["product", "Product", "Producto a mostrar (id, slug, title, price, image, stock…).", true],
      ["openProduct", "(slug) => void", "Se llama con el slug al abrir el producto.", true],
    ],
    use: ["En grillas de productos, resultados de búsqueda y sliders."],
    avoid: ["Para el detalle completo de un producto: es una vista resumida."],
  },
  {
    slug: "suscribe", group: "patterns", cat: "Inicio y contenido", title: "Suscribe", file: "Suscribe.jsx",
    description: "Bloque de suscripción al newsletter con título, bajada y campo de email.",
    docsId: "patterns-inicio-y-contenido-suscribe--docs",
    previewHeight: 320,
    stories: [{ label: "Default", id: "patterns-inicio-y-contenido-suscribe--default" }],
    props: [],
    use: ["Antes del footer, para captar emails."],
    avoid: ["Más de una vez por página."],
  },
]

export const piecesOf = (group: Piece["group"]) => pieces.filter((p) => p.group === group).sort((a, b) => a.title.localeCompare(b.title))
export const pieceBySlug = (group: Piece["group"], slug: string) => pieces.find((p) => p.group === group && p.slug === slug)
