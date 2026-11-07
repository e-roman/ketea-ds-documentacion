/** Componentes y patrones documentados. Se agrega una pieza acá cuando tiene stories en Storybook. */

export type Prop = [name: string, type: string, desc: string, required?: boolean]
export type Story = { label: string; id: string }
/** Cambio propio de la pieza. Lo que va entre `backticks` se muestra como código. */
export type HistoryEntry = { date: string; text: string }
/** Ejemplo «sí / no» con una story de Storybook como preview. */
export type Practice = { ok: boolean; title: string; text?: string; storyId: string }

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
  /** Ejemplos «sí / no» con preview (pestaña Uso). */
  practices?: Practice[]
  /** Accesibilidad. Solo se escribe lo verificado en el código; si no hay nada, la pestaña no se muestra. */
  /** «Rol y estructura»: nombres accesibles, roles, estados. */
  a11y?: string[]
  /** «Teclado»: teclas y su acción. */
  keyboard?: { keys: string[]; action: string }[]
  /** «Contraste»: pares de tokens de color tal como los aplica el CSS de la tienda. `min`: 4.5 para texto (por defecto) o 3 para íconos. */
  contrast?: { element: string; fg: string; bg: string; min?: number }[]
  /** Cambios propios de la pieza, el más nuevo primero (pestaña Historial). */
  history?: HistoryEntry[]
}

/** Cambios que aplican a todas las piezas de la tienda. */
const COMMON_HISTORY: HistoryEntry[] = [
  { date: "2026-11-06", text: "Estilos migrados a tokens (`@ketea/tokens` v3.0.0): color, espaciado, radios, sombras, tipografía y movimiento." },
]

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
    a11y: ["El spinner lleva `role=\"status\"` y `aria-hidden`: el estado de carga lo comunica el texto que se muestra a su lado (`loadingText`)."],
    history: [{ date: "2026-11-06", text: "Story publicada en Storybook (`Components/Button spinner`)." }, ...COMMON_HISTORY],
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
    a11y: [
      "Mientras cambia la cantidad, el spinner lleva `role=\"status\"` y un texto `visually-hidden` para lectores de pantalla.",
      "Los botones de sumar y restar tienen nombre accesible (`aria-label`: «Aumentar cantidad» y «Disminuir cantidad»).",
      "El botón de restar se deshabilita al llegar al mínimo (`min`) y mientras se procesa el cambio.",
    ],
    keyboard: [
      { keys: ["Tab", "Shift+Tab"], action: "Mueve el foco entre − y +." },
      { keys: ["Enter", "Espacio"], action: "Activa el botón enfocado." },
    ],
    history: [{ date: "2026-11-06", text: "Story publicada en Storybook (`Components/Quantity control`)." }, ...COMMON_HISTORY],
  },
  {
    slug: "product-card", group: "patterns", cat: "Producto", title: "Product card", file: "ProductCard.jsx",
    description: "Card de producto en grillas y listados, con favorito, vista rápida y agregar al carrito.",
    docsId: "patterns-producto-product-card--docs",
    previewHeight: 500,
    stories: [
      { label: "Con descuento", id: "patterns-producto-product-card--with-discount" },
      { label: "Sin descuento", id: "patterns-producto-product-card--without-discount" },
      { label: "Sin stock", id: "patterns-producto-product-card--out-of-stock" },
      { label: "Cargando", id: "patterns-producto-product-card--loading" },
    ],
    props: [
      ["product", "Product", "Producto a mostrar (id, slug, title, price, image, stock…).", true],
      ["openProduct", "(slug) => void", "Se llama con el slug al abrir el producto.", true],
    ],
    use: ["En grillas de productos, resultados de búsqueda y sliders."],
    avoid: ["Para el detalle completo de un producto: es una vista resumida."],
    practices: [
      { ok: true, title: "Con descuento", text: "Muestra el precio anterior tachado, el porcentaje y el precio final.", storyId: "patterns-producto-product-card--with-discount" },
      { ok: true, title: "Sin stock", text: "Si no hay stock, el botón de agregar al carrito queda deshabilitado.", storyId: "patterns-producto-product-card--out-of-stock" },
    ],
    a11y: [
      "La imagen del producto lleva `alt` con el título del producto.",
      "El botón de agregar al carrito se deshabilita (`disabled`) cuando no hay stock o el producto ya está en el carrito.",
      "El botón de favorito tiene nombre accesible (`aria-label`: «Agregar a favoritos» o «Quitar de favoritos») y expone su estado con `aria-pressed`.",
      "«Vista rápida» es un botón con texto visible.",
    ],
    keyboard: [
      { keys: ["Tab", "Shift+Tab"], action: "Mueve el foco entre los botones de la card." },
      { keys: ["Enter", "Espacio"], action: "Activa el botón enfocado." },
    ],
    contrast: [
      { element: "Precio actual", fg: "color-neutral-800", bg: "color-semantic-surface-default" },
      { element: "Precio anterior", fg: "color-semantic-text-secondary", bg: "color-semantic-surface-default" },
      { element: "Badge «Envío gratis»", fg: "color-green-700", bg: "color-semantic-feedback-success-bg" },
      { element: "Badge «Sin stock»", fg: "color-semantic-text-inverse", bg: "color-red-500" },
    ],
    history: [{ date: "2026-11-06", text: "Story publicada en Storybook (`Patterns/Producto/Product card`), con variantes de descuento, sin stock y skeleton." }, ...COMMON_HISTORY],
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
    a11y: ["El campo de email tiene una etiqueta asociada (`label` con `htmlFor`), oculta visualmente."],
    keyboard: [
      { keys: ["Tab", "Shift+Tab"], action: "Mueve el foco entre el campo de email y el botón." },
      { keys: ["Enter", "Espacio"], action: "Activa el botón «Suscribirse»." },
    ],
    contrast: [{ element: "Botón «Suscribirse»", fg: "color-semantic-text-on-brand", bg: "color-brand-700" }],
    history: [{ date: "2026-11-06", text: "Story publicada en Storybook (`Patterns/Inicio y contenido/Suscribe`)." }, ...COMMON_HISTORY],
  },
]

export const piecesOf = (group: Piece["group"]) => pieces.filter((p) => p.group === group).sort((a, b) => a.title.localeCompare(b.title))
export const pieceBySlug = (group: Piece["group"], slug: string) => pieces.find((p) => p.group === group && p.slug === slug)
