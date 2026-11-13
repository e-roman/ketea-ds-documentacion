import { sizeLabel } from "@/lib/labels"
import { Heart, Search, ShoppingCart, User, X } from "lucide-react"
import { buildPage } from "@/content/compat/build-page"
import { AccordionLive, TabsLive } from "@/content/compat/demos"
import Variants from "@/content/compat/variants"
import { Breadcrumb } from "@shop/components/ui/breadcrumb"
import { Card } from "@shop/components/ui/card"
import { FormDivider, FormFootnote, FormHeader } from "@shop/components/ui/form-parts"
import { IconBadge } from "@shop/components/ui/icon-badge"
import { iconButtonClasses, type IconButtonSize, type IconButtonVariant } from "@shop/components/ui/icon-button"
import { linkClasses } from "@shop/components/ui/link"
import { Price } from "@shop/components/ui/price"
import { Skeleton } from "@shop/components/ui/skeleton"


/* ───────────────────────── Link ───────────────────────── */
export const linkPanels = () =>
  buildPage({
    css: "components/link.css",
    history: /color\.text\.link|link de texto/i,
    purpose: [
      { title: "Navegar", text: "Lleva a otra página o sección dentro de un texto o una lista." },
      { title: "Peso de texto", text: "Se lee como texto, no como botón: ideal para acciones secundarias." },
      { title: "Heredar contexto", text: "El tamaño de letra se hereda; el color se adapta al lugar donde se usa." },
    ],
    anatomy: {
      node: <a href="#demo" className={linkClasses({ icon: true })}><Search className="icon-sm" aria-hidden />Ver detalle</a>,
      parts: [{ n: 1, selector: ".link > svg", only: ["texto", "ancho", "alto"] }, { n: 2, selector: ".link", only: ["texto", "tipografia"] }],
      markers: [{ n: 1, side: "left" }, { n: 2, side: "bottom" }],
      legend: [{ n: 1, label: "Ícono", note: "opcional" }, { n: 2, label: "Texto" }],
    },
    config: (
      <>
        <Variants title="Variante" ariaLabel="Variante del link" description={<>La función <code>linkClasses()</code> arma las clases. Sirve para <code>&lt;a&gt;</code> y <code>&lt;Link&gt;</code>.</>}
          items={[
            { value: "default", label: "Default", caption: "Acción en color de link. Se subraya en hover.", node: <a href="#demo" className={linkClasses()}>Ver todos</a> },
            { value: "subtle", label: "Subtle", caption: "Navegación secundaria (volver, ver más): pasa de secundario a primario en hover.", node: <a href="#demo" className={linkClasses({ variant: "subtle" })}>Volver al carrito</a> },
            { value: "inherit", label: "Inherit", caption: "Hereda el color del contexto (dentro de avisos). Siempre subrayado.", node: <a href="#demo" className={linkClasses({ variant: "inherit" })}>Más información</a> },
          ]} />
        <Variants title="Subrayado" ariaLabel="Subrayado del link" description="Por defecto se subraya solo en hover."
          items={[
            { value: "hover", label: "En hover", caption: "Comportamiento por defecto.", node: <a href="#demo" className={linkClasses()}>Ver más</a> },
            { value: "always", label: "Siempre", caption: "prop underline.", node: <a href="#demo" className={linkClasses({ underline: true })}>Ver más</a> },
          ]} />
        <Variants title="Tamaño" ariaLabel="Tamaño del link" description="Sin tamaño, hereda la letra del contexto."
          items={[
            { value: "inherit", label: "Heredado", caption: "Igual que el texto que lo rodea.", node: <a href="#demo" className={linkClasses()}>Ver más</a> },
            { value: "sm", label: "Small", caption: "14 / 20.", node: <a href="#demo" className={linkClasses({ size: "sm" })}>Ver más</a> },
            { value: "xs", label: "Extra small", caption: "12 / 16.", node: <a href="#demo" className={linkClasses({ size: "xs" })}>Ver más</a> },
          ]} />
      </>
    ),
    use: ["Para ir a otra página, sección o recurso.", "Para acciones de baja jerarquía dentro de texto.", "Para «Volver» y «Ver más» (variante subtle)."],
    avoid: [<>Para ejecutar una acción en la misma pantalla: usá <b>Button</b>.</>, "Con textos vagos como «Click acá»."],
    dodont: [
      { ok: true, title: "Texto que describe el destino", text: "«Ver la guía de compra».", preview: <a href="#demo" className={linkClasses({ size: "sm" })}>Ver la guía completa de compra</a> },
      { ok: false, title: "Evitá «Click acá»", text: "No dice a dónde lleva.", preview: <a href="#demo" className={linkClasses({ size: "sm" })}>Click acá</a> },
    ],
    a11y: ["Es un <a> con href: navega. Si ejecuta una acción, usá <button>.", "El texto debe tener sentido fuera de contexto (los lectores de pantalla listan los links).", "El foco usa el mismo anillo que Button."],
    keys: [[<kbd key="e">Enter</kbd>, "Activa el link."], [<><kbd>Tab</kbd> / <kbd>Shift+Tab</kbd></>, "Mueve el foco."]],
    contrast: [
      { label: "Link default", fg: "color-text-link", bg: "color-surface-default" },
      { label: "Link hover", fg: "color-text-link-hover", bg: "color-surface-default" },
      { label: "Link subtle", fg: "color-text-secondary", bg: "color-surface-default" },
    ],
  })

/* ───────────────────────── Icon button ───────────────────────── */
const IB_VARIANTS: { v: IconButtonVariant; caption: string }[] = [
  { v: "ghost", caption: "Sin fondo; el fondo aparece en hover. Por defecto." },
  { v: "subtle", caption: "Fondo suave siempre visible." },
  { v: "primary", caption: "Fondo de marca. Para la acción principal con solo ícono." },
  { v: "success", caption: "Color de éxito." },
  { v: "plain", caption: "Se ajusta al ícono, sin tamaño fijo." },
]
export const iconButtonPanels = () =>
  buildPage({
    css: "components/icon-button.css",
    history: /icon[- .]button/i,
    purpose: [
      { title: "Acción compacta", text: "Un botón solo con ícono para acciones conocidas: favoritos, cerrar, buscar." },
      { title: "Siempre redondo", text: "Cuatro tamaños (36, 40, 44, 48 px) con área táctil mínima de 44 px." },
      { title: "Con aria-label", text: "Sin texto visible, el nombre accesible es obligatorio." },
    ],
    anatomy: {
      node: <button type="button" aria-label="Favoritos" className={iconButtonClasses({ variant: "subtle", size: "xl" })}><Heart className="icon-md" aria-hidden /></button>,
      parts: [{ n: 1, selector: ".icon-btn" }, { n: 2, selector: ".icon-btn > svg", only: ["texto", "ancho", "alto"] }],
      markers: [{ n: 1, side: "left" }, { n: 2, side: "top" }],
      legend: [{ n: 1, label: "Contenedor" }, { n: 2, label: "Ícono" }],
    },
    config: (
      <>
        <Variants title="Variante" ariaLabel="Variante del icon button" description={<>La función <code>iconButtonClasses()</code> arma las clases.</>}
          items={IB_VARIANTS.map((x) => ({ value: x.v, label: x.v, caption: x.caption, node: <button type="button" aria-label="Favoritos" className={iconButtonClasses({ variant: x.v, size: x.v === "plain" ? undefined : "lg" })}><Heart className="icon-md" aria-hidden /></button> }))} />
        <Variants title="Tamaño" ariaLabel="Tamaño del icon button" description="El área táctil es de 44 px aunque el botón sea más chico."
          items={(["sm", "md", "lg", "xl"] as IconButtonSize[]).map((s) => ({ value: s, label: sizeLabel(s), caption: `size ${s}.`, node: <button type="button" aria-label="Carrito" className={iconButtonClasses({ variant: "subtle", size: s })}><ShoppingCart className="icon-sm" aria-hidden /></button> }))} />
        <Variants title="Con texto" ariaLabel="Icon button con texto" description="Ícono + texto corto, por ejemplo «Ingresar» en el header."
          items={[{ value: "label", label: "label", caption: "Mismo alto que el tamaño; el ancho depende del texto.", node: <button type="button" className={iconButtonClasses({ variant: "ghost", size: "lg", label: true })}><User className="icon-sm" aria-hidden />Ingresar</button> }]} />
      </>
    ),
    use: ["Para acciones universales: cerrar, favoritos, buscar, carrito.", "En barras de herramientas y headers con poco espacio."],
    avoid: ["Para acciones poco conocidas: agregá texto.", <>Para la acción principal de un paso: usá <b>Button</b>.</>],
    dodont: [
      { ok: true, title: "Con aria-label", text: "Nombra la acción.", preview: <button type="button" aria-label="Cerrar" className={iconButtonClasses({ variant: "subtle", size: "lg" })}><X className="icon-md" aria-hidden /></button> },
      { ok: false, title: "Sin nombre accesible", text: "Un lector de pantalla solo dice «botón».", preview: <button type="button" className={iconButtonClasses({ variant: "subtle", size: "lg" })}><X className="icon-md" aria-hidden /></button> },
    ],
    a11y: [<>Siempre con <code>aria-label</code> que describa la acción.</>, "El ícono lleva aria-hidden.", "Área táctil de 44 px mediante ::after, sin cambiar el aspecto."],
    keys: [[<><kbd>Enter</kbd> / <kbd>Espacio</kbd></>, "Activa el botón (un <a> solo responde a Enter)."]],
    contrast: [
      { label: "Ghost", fg: "color-text-primary", bg: "color-surface-default" },
      { label: "Subtle", fg: "color-text-primary", bg: "color-surface-muted" },
      { label: "Primary", fg: "color-action-primary-fg", bg: "color-action-primary-bg" },
    ],
  })

/* ───────────────────────── Chip ───────────────────────── */
export const tabsPanels = () =>
  buildPage({
    css: "components/tabs.css",
    history: /\btabs?\b/i,
    purpose: [
      { title: "Alternar vistas", text: "Muestra una sola sección a la vez dentro del mismo contexto." },
      { title: "Navegación completa", text: "Flechas, Home y End mueven el foco entre pestañas." },
      { title: "Panel propio", text: "Quien usa el componente arma el panel con id panel-{id}." },
    ],
    config: (
      <Variants title="Tabs" ariaLabel="Ejemplo de tabs" description={<>El componente maneja el foco; el contenido de cada panel lo arma quien lo usa. Probá con las flechas.</>}
        items={[{ value: "demo", label: "Interactivo", caption: "role=tablist/tab con roving tabindex.", node: <TabsLive /> }]} />
    ),
    use: ["Para dividir contenido relacionado en secciones.", "Cuando el usuario no necesita ver todo a la vez."],
    avoid: ["Para navegar entre páginas: usá links.", "Para filtrar una lista: usá Chips."],
    a11y: ["role=\"tablist\" / \"tab\" / \"tabpanel\" con aria-selected y aria-controls.", "Roving tabindex: solo la pestaña activa entra en el orden de Tab.", <>El panel debe tener <code>id=&quot;panel-{"{id}"}&quot;</code> y <code>aria-labelledby=&quot;tab-{"{id}"}&quot;</code>.</>],
    keys: [
      [<><kbd>←</kbd> / <kbd>→</kbd></>, "Mueve entre pestañas (circular)."],
      [<><kbd>Home</kbd> / <kbd>End</kbd></>, "Primera / última pestaña."],
      [<kbd key="t">Tab</kbd>, "Sale de la lista hacia el panel."],
    ],
    contrast: [
      { label: "Pestaña inactiva", fg: "color-text-secondary", bg: "color-surface-default" },
      { label: "Pestaña activa", fg: "color-text-primary", bg: "color-surface-default" },
    ],
  })

/* ───────────────────────── Breadcrumb ───────────────────────── */
const CRUMBS = [{ label: "Inicio", href: "#demo" }, { label: "Productos", href: "#demo" }, { label: "Robots", href: "#demo" }, { label: "Dolphin Liberty 400" }]
export const breadcrumbPanels = () =>
  buildPage({
    css: "patterns/product-specs.css",
    selector: /\.breadcrumb/,
    history: /breadcrumb/i,
    purpose: [
      { title: "Ubicar", text: "Muestra dónde está el usuario dentro de la jerarquía del sitio." },
      { title: "Volver rápido", text: "Cada nivel anterior es un link." },
      { title: "Página actual", text: "El último ítem no es un link y se marca con aria-current." },
    ],
    anatomy: {
      node: <Breadcrumb items={CRUMBS} />,
      parts: [{ n: 1, selector: ".breadcrumb__link", only: ["texto", "tipografia"] }, { n: 2, selector: ".breadcrumb__sep", only: ["texto", "ancho", "alto"] }, { n: 3, selector: ".breadcrumb__current", only: ["texto", "tipografia"] }],
      markers: [{ n: 1, side: "top", pct: 8 }, { n: 2, side: "top", pct: 22 }, { n: 3, side: "bottom", pct: 90 }],
      legend: [{ n: 1, label: "Link a un nivel anterior" }, { n: 2, label: "Separador", note: "chevron" }, { n: 3, label: "Página actual", note: "sin link" }],
    },
    config: (
      <Variants title="Niveles" ariaLabel="Niveles del breadcrumb" description={<>Se arma con un arreglo de <code>items</code>: los que tienen <code>href</code> son links.</>}
        items={[
          { value: "2", label: "2 niveles", caption: "Inicio › Productos.", node: <Breadcrumb items={[{ label: "Inicio", href: "#demo" }, { label: "Productos" }]} /> },
          { value: "4", label: "4 niveles", caption: "Hasta el producto.", node: <Breadcrumb items={CRUMBS} /> },
        ]} />
    ),
    use: ["En páginas con jerarquía de 2 o más niveles (categoría › producto).", "Arriba del contenido, debajo del header."],
    avoid: ["En páginas de primer nivel.", "Como único modo de navegación."],
    a11y: [<>Es un <code>&lt;nav aria-label=&quot;Breadcrumb&quot;&gt;</code> con una lista ordenada.</>, <>El último ítem lleva <code>aria-current=&quot;page&quot;</code>.</>, "El separador es decorativo (aria-hidden)."],
    keys: [[<><kbd>Tab</kbd></>, "Recorre los links en orden."]],
    contrast: [
      { label: "Links", fg: "color-text-secondary", bg: "color-surface-default" },
      { label: "Página actual", fg: "color-text-primary", bg: "color-surface-default" },
    ],
  })

/* ───────────────────────── Card ───────────────────────── */
const cardBody = <div className="demo-card-body"><b>Robot limpia piscina</b><div className="muted demo-card-sub">Ciclo: 2,5 horas</div></div>
export const cardPanels = () =>
  buildPage({
    css: "components/surfaces.css",
    selector: /\.card/,
    history: /card\.content/i,
    purpose: [
      { title: "Agrupar contenido", text: "Superficie con borde y radio para contenido relacionado." },
      { title: "Variantes de superficie", text: "Cuatro tonos, tres radios, cinco paddings y sombra opcional." },
      { title: "Cualquier elemento", text: "Con as=\"a\" funciona como link completo." },
    ],
    config: (
      <>
        <Variants title="Tono" ariaLabel="Tono del card" description={<>La prop <code>tone</code> cambia el fondo.</>}
          items={(["default", "subtle", "muted", "brand"] as const).map((t) => ({ value: t, label: t, caption: `tone="${t}".`, node: <div className="demo-w-260"><Card tone={t} padding="md">{cardBody}</Card></div> }))} />
        <Variants title="Radio" ariaLabel="Radio del card" description={<>La prop <code>radius</code> es <code>md</code> (8 px), <code>lg</code> o <code>xl</code>.</>}
          items={(["md", "lg", "xl"] as const).map((r) => ({ value: r, label: sizeLabel(r), caption: `radius="${r}".`, node: <div className="demo-w-260"><Card radius={r} padding="md">{cardBody}</Card></div> }))} />
        <Variants title="Padding" ariaLabel="Padding del card" description={<>La prop <code>padding</code>.</>}
          items={(["none", "sm", "md", "lg", "panel"] as const).map((p) => ({ value: p, label: sizeLabel(p), caption: `padding="${p}".`, node: <div className="demo-w-260"><Card padding={p}>{cardBody}</Card></div> }))} />
        <Variants title="Sombra y borde" ariaLabel="Sombra del card" description={<>Props <code>shadow</code> y <code>borderless</code>.</>}
          items={[
            { value: "border", label: "Con borde", caption: "Por defecto.", node: <div className="demo-w-260"><Card padding="md">{cardBody}</Card></div> },
            { value: "shadow", label: "Sombra", caption: "shadow.", node: <div className="demo-w-260"><Card padding="md" shadow>{cardBody}</Card></div> },
            { value: "borderless", label: "Sin borde", caption: "borderless.", node: <div className="demo-w-260"><Card tone="subtle" padding="md" borderless>{cardBody}</Card></div> },
          ]} />
      </>
    ),
    use: ["Para agrupar contenido relacionado: producto, resumen, panel.", "Como link completo con as=\"a\"."],
    avoid: ["Para anidar muchas cards unas dentro de otras.", "Como único indicador de agrupación sin estructura de encabezados."],
    a11y: ["El Card es un contenedor sin rol: la semántica la da el contenido (encabezados, listas).", <>Si es clickeable, usá <code>as=&quot;a&quot;</code> con <code>href</code> y un texto de link claro.</>],
    contrast: [
      { label: "Texto sobre default", fg: "color-text-primary", bg: "color-surface-default" },
      { label: "Texto sobre subtle", fg: "color-text-primary", bg: "color-surface-subtle" },
      { label: "Texto sobre muted", fg: "color-text-primary", bg: "color-surface-muted" },
    ],
  })

/* ───────────────────────── Icon badge ───────────────────────── */
const IBTONES = ["default", "subtle", "brand", "brand-subtle", "muted", "plain", "soft-brand", "glass", "success"] as const
export const iconBadgePanels = () =>
  buildPage({
    css: "components/surfaces.css",
    selector: /\.icon-badge/,
    history: /icon[- .]badge/i,
    purpose: [
      { title: "Dar contexto visual", text: "Un ícono dentro de un círculo o tile para destacar un beneficio o categoría." },
      { title: "Decorativo", text: "Acompaña a un texto; no es interactivo." },
      { title: "Escalable", text: "Siete tamaños, nueve tonos y dos formas." },
    ],
    anatomy: {
      node: <IconBadge size="xxl" tone="brand-subtle"><ShoppingCart className="icon-lg" aria-hidden /></IconBadge>,
      parts: [{ n: 1, selector: ".icon-badge" }, { n: 2, selector: ".icon-badge > svg", only: ["texto", "ancho", "alto"] }],
      markers: [{ n: 1, side: "left" }, { n: 2, side: "top" }],
      legend: [{ n: 1, label: "Contenedor" }, { n: 2, label: "Ícono", note: "lucide, como children" }],
    },
    config: (
      <>
        <Variants title="Tono" ariaLabel="Tono del icon badge" description={<>La prop <code>tone</code> define colores.</>}
          items={IBTONES.map((t) => ({ value: t, label: t, caption: `tone="${t}".`, dark: t === "glass", node: <IconBadge size="xl" tone={t}><Heart className="icon-md" aria-hidden /></IconBadge> }))} />
        <Variants title="Tamaño" ariaLabel="Tamaño del icon badge" description={<>La prop <code>size</code>.</>}
          items={(["sm", "md", "lg", "xl", "xxl", "control", "tile"] as const).map((s) => ({ value: s, label: sizeLabel(s), caption: `size="${s}".`, node: <IconBadge size={s} tone="brand-subtle"><Heart className="icon-md" aria-hidden /></IconBadge> }))} />
        <Variants title="Forma" ariaLabel="Forma del icon badge" description={<>La prop <code>shape</code>: círculo o tile redondeado.</>}
          items={[
            { value: "round", label: "Round", caption: "Círculo (por defecto).", node: <IconBadge size="xxl" tone="brand-subtle"><Heart className="icon-lg" aria-hidden /></IconBadge> },
            { value: "tile", label: "Tile", caption: "Cuadrado de esquinas redondeadas (radius lg).", node: <IconBadge size="xxl" tone="brand-subtle" shape="tile"><Heart className="icon-lg" aria-hidden /></IconBadge> },
          ]} />
      </>
    ),
    use: ["Para acompañar un título o beneficio con un ícono.", "En listas de características y pasos."],
    avoid: [<>Para una acción: usá <b>Icon button</b>.</>, "Como único portador de información: acompañalo de texto."],
    a11y: ["Es decorativo: el ícono debe llevar aria-hidden y el significado debe estar en el texto vecino.", "Si el ícono es el único contenido, agregá un nombre accesible."],
    contrast: [
      { label: "Default", fg: "color-text-primary", bg: "color-surface-default" },
      { label: "Brand subtle", fg: "color-icon-brand", bg: "color-brand-subtle", min: 3 },
    ],
  })

/* ───────────────────────── Price ───────────────────────── */
export const pricePanels = () =>
  buildPage({
    css: "components/price.css",
    history: /price|precio/i,
    purpose: [
      { title: "Mostrar el precio", text: "El precio del producto, con precio anterior y descuento opcionales." },
      { title: "Anunciar el descuento", text: "Badge con el porcentaje de descuento junto al precio." },
      { title: "Tres tamaños", text: "sm, md y lg según el lugar: card, carrito o ficha." },
    ],
    anatomy: {
      node: <div className="demo-w-180"><Price current={3385460} previous={4513950} discountPercent={25} size="lg" /></div>,
      parts: [{ n: 1, selector: ".price__previous", only: ["texto", "tipografia"] }, { n: 2, selector: ".price__current", only: ["texto", "tipografia"] }, { n: 3, selector: ".badge" }],
      markers: [{ n: 1, side: "top", pct: 20 }, { n: 2, side: "left", pct: 48 }, { n: 3, side: "right", pct: 48 }],
      legend: [{ n: 1, label: "Precio anterior", note: "tachado, opcional" }, { n: 2, label: "Precio actual" }, { n: 3, label: "Badge de descuento", note: "opcional" }],
    },
    config: (
      <>
        <Variants title="Tamaño" ariaLabel="Tamaño del precio" description={<>La prop <code>size</code>.</>}
          items={(["sm", "md", "lg"] as const).map((s) => ({ value: s, label: sizeLabel(s), caption: `size="${s}".`, node: <Price current={3385460} size={s} /> }))} />
        <Variants title="Con descuento" ariaLabel="Descuento del precio" description="El precio anterior se anuncia a lectores de pantalla con texto oculto."
          items={[
            { value: "simple", label: "Simple", caption: "Solo precio actual.", node: <Price current={3385460} /> },
            { value: "discount", label: "Con descuento", caption: "previous + discountPercent.", node: <Price current={3385460} previous={4513950} discountPercent={25} /> },
          ]} />
      </>
    ),
    use: ["En card de producto, ficha, carrito y resumen de compra.", "Con descuento: mostrar también el precio anterior."],
    avoid: ["Para precios sin formato: usá siempre el formato de moneda local.", "Mostrar el descuento sin precio anterior."],
    a11y: [<>El precio anterior lleva un <code>sr-only</code> «Precio anterior:» para dar contexto al tachado.</>, "No dependas solo del color o del tachado para comunicar el descuento: el badge lo dice con texto."],
    contrast: [
      { label: "Precio actual", fg: "color-commerce-price-current", bg: "color-surface-default" },
      { label: "Precio anterior", fg: "color-commerce-price-previous", bg: "color-surface-default" },
    ],
  })

/* ───────────────────────── Skeleton ───────────────────────── */
export const skeletonPanels = () =>
  buildPage({
    css: "components/surfaces.css",
    selector: /\.skeleton/,
    history: /skeleton/i,
    purpose: [
      { title: "Anticipar el layout", text: "Bloques grises que ocupan el lugar del contenido mientras carga." },
      { title: "Escalones de token", text: "Alto y ancho salen de escalas, no de valores sueltos." },
      { title: "Decorativo", text: "Se oculta a lectores de pantalla." },
    ],
    config: (
      <>
        <Variants title="Bloque" ariaLabel="Bloque skeleton" description={<>Props <code>h</code> y <code>w</code> (escalón) y <code>radius</code>.</>}
          items={[
            { value: "line", label: "Línea de texto", caption: "h=4, w=3/4.", node: <div className="demo-w-260"><Skeleton h={4} w="3/4" /></div> },
            { value: "title", label: "Título", caption: "h=6, w=1/2.", node: <div className="demo-w-260"><Skeleton h={6} w="1/2" /></div> },
            { value: "pill", label: "Botón", caption: "h=11, w=full, radius md.", node: <div className="demo-w-260"><Skeleton h={11} w="full" /></div> },
            { value: "avatar", label: "Avatar", caption: "h=10, w=40, radius pill.", node: <Skeleton h={10} w={40} radius="pill" /> },
          ]} />
        <Variants title="Soft" ariaLabel="Skeleton soft" description={<>La prop <code>soft</code> usa un tono más claro, para bloques grandes de fondo.</>}
          items={[
            { value: "normal", label: "Normal", caption: "Por defecto.", node: <div className="demo-w-260"><Skeleton h={24} w="full" /></div> },
            { value: "soft", label: "Soft", caption: "soft.", node: <div className="demo-w-260"><Skeleton h={24} w="full" soft /></div> },
          ]} />
        <Variants title="Ejemplo: card en carga" ariaLabel="Card en carga" description="Combiná bloques con las mismas medidas del contenido real."
          items={[{ value: "card", label: "Card", caption: "El layout no salta al cargar.", node: <div className="demo-w-260"><Card padding="md"><div className="demo-stack-12"><Skeleton h={40} w="full" radius="lg" /><Skeleton h={4} w="3/4" /><Skeleton h={4} w="1/2" /><Skeleton h={11} w="full" /></div></Card></div> }]} />
      </>
    ),
    use: ["Mientras carga contenido con forma conocida (listas, cards, fichas).", "Con las mismas medidas que tendrá el contenido final."],
    avoid: ["Para cargas muy cortas (menos de ~300 ms).", "Para acciones en curso: usá loading en el botón."],
    a11y: [<>Es <code>aria-hidden=&quot;true&quot;</code>: no se anuncia.</>, "Si la carga importa, anunciala con una región aria-live o aria-busy en el contenedor."],
  })

/* ───────────────────────── Form parts ───────────────────────── */
export const formPartsPanels = () =>
  buildPage({
    css: "components/form-parts.css",
    history: /form[- .]parts|form-header|form-divider/i,
    purpose: [
      { title: "Estructurar formularios", text: "Encabezado, separador y nota al pie para formularios consistentes." },
      { title: "Piezas sueltas", text: "Se combinan con Field, Input y Button." },
      { title: "Semántica de títulos", text: "El encabezado admite h1, h2 o h3." },
    ],
    config: (
      <>
        <Variants title="Form header" ariaLabel="Form header" description={<>Props <code>title</code>, <code>subtitle</code> y <code>as</code>.</>}
          items={[
            { value: "full", label: "Con subtítulo", caption: "FormHeader con title y subtitle.", node: <div className="demo-w-340"><FormHeader title="Ingresá a tu cuenta" subtitle="Usá tu email para continuar." /></div> },
            { value: "title", label: "Solo título", caption: "FormHeader sin subtitle.", node: <div className="demo-w-340"><FormHeader title="Datos de entrega" /></div> },
          ]} />
        <Variants title="Form divider" ariaLabel="Form divider" description="Separador con texto opcional en el centro."
          items={[
            { value: "text", label: "Con texto", caption: "FormDivider con children.", node: <div className="demo-w-340"><FormDivider>o</FormDivider></div> },
            { value: "plain", label: "Sin texto", caption: "FormDivider vacío.", node: <div className="demo-w-340"><FormDivider /></div> },
          ]} />
        <Variants title="Form footnote" ariaLabel="Form footnote" description="Nota breve al pie del formulario."
          items={[{ value: "note", label: "Nota", caption: "FormFootnote.", node: <div className="demo-w-340"><FormFootnote>Texto de ayuda o aviso legal de ejemplo.</FormFootnote></div> }]} />
      </>
    ),
    use: ["Al armar formularios de cuenta, acceso y checkout.", "Para separar métodos alternativos (por ejemplo, «o»)."],
    avoid: ["Para encabezados de página: usá PageHeader.", "Para mensajes importantes: usá un aviso."],
    a11y: ["FormHeader renderiza un encabezado real: elegí el nivel (as) según la jerarquía de la página.", "FormDivider es decorativo: el texto no reemplaza a un encabezado."],
  })

/* ───────────────────────── Accordion ───────────────────────── */
export const accordionPanels = () =>
  buildPage({
    css: "components/accordion.css",
    history: /accordion|acordeón/i,
    purpose: [
      { title: "Mostrar y ocultar", text: "Expande y contrae secciones de contenido para reducir la carga cognitiva." },
      { title: "Títulos escaneables", text: "El usuario compara temas antes de abrir un panel." },
      { title: "Estado en el DOM", text: "El estado vive en aria-expanded del botón; el chevron gira por CSS." },
    ],
    config: (
      <>
        <Variants title="Densidad" ariaLabel="Densidad del acordeón" description={<>Clases <code>accordion__trigger</code> y <code>accordion__trigger--compact</code> (menú mobile). Probalo.</>}
          items={[
            { value: "default", label: "Default", caption: "Alto táctil de 44 px.", node: <AccordionLive /> },
            { value: "compact", label: "Compact", caption: "Menos padding y texto sm; para menús.", node: <AccordionLive compact /> },
          ]} />
      </>
    ),
    use: ["Para agrupar información relacionada, como preguntas frecuentes.", "Para reducir el scroll cuando el contenido no tiene que verse todo a la vez.", "Cuando el espacio es limitado, como en mobile."],
    avoid: ["Cuando cada sección es lo bastante corta para mostrarse directamente.", "Para ocultar información esencial."],
    dodont: undefined,
    a11y: [<>El disparador es un <code>&lt;button&gt;</code> con <code>aria-expanded</code>.</>, "Alto táctil mínimo de 44 px.", <>Para mayor claridad, sumá <code>aria-controls</code> apuntando al panel.</>],
    keys: [[<><kbd>Enter</kbd> / <kbd>Espacio</kbd></>, "Abre o cierra la sección."], [<><kbd>Tab</kbd></>, "Mueve el foco entre disparadores."]],
    contrast: [
      { label: "Título", fg: "color-text-primary", bg: "color-surface-default" },
      { label: "Panel", fg: "color-text-secondary", bg: "color-surface-default" },
    ],
  })
