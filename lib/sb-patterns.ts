/** Patrones y componentes de la tienda que se muestran en vivo (sin JSX ni fs: los usa también la navegación). */

export type Prop = [name: string, type: string, desc?: string, required?: boolean]

/** Una vista: story de Storybook (título + nombre) y ancho del viewport con que se toma. */
export type Shot = { label: string; story: [sb: string, name: string]; w: number; /** alto de viewport si la story es un overlay fijo */ vh?: number }

export type SbPattern = {
  slug: string
  /** Dónde aparece en la navegación (por defecto, Patrones). */
  group?: "patterns" | "components"
  /** Categoría del sidebar de patrones. */
  cat?: string
  /** Título en Storybook de la pieza principal (para el link a la documentación). */
  sb: string
  title: string
  nav: string
  desc: string
  shots: Shot[]
  props: Prop[]
  use: string[]
  avoid: string[]
  /** Solo se escribe lo verificado en el código; si falta, la pestaña Accesibilidad no se muestra. */
  a11y?: string[]
}

const P = "Patterns/"
const C = "Components/"
const H = P + "Header/"

export const sbPatterns: SbPattern[] = [
  // ── Header y navegación ──
  {
    slug: "nav", cat: "Header y navegación", sb: C + "Nav", title: "Header", nav: "Header del sitio, desktop y mobile.",
    desc: "Header del sitio: barra superior, logo, buscador, favoritos, notificaciones, cuenta y carrito. Debajo, el menú «Todas las categorías» y los links de sección. En mobile pasa a una fila de íconos, el buscador y una fila de links que se desliza de costado. Orquesta el estado (búsqueda, menús, acceso) y compone sus piezas.",
    shots: [
      { label: "Desktop", story: [C + "Nav", "Desktop"], w: 1280 },
      { label: "Mobile", story: [C + "Nav", "Mobile"], w: 390 },
      { label: "Menú de categorías", story: [H + "Categories menu", "Default"], w: 1280 },
      { label: "Menú mobile", story: [H + "Mobile menu", "Default"], w: 390, vh: 760 },
      { label: "Checkout", story: [H + "Checkout header", "Default"], w: 1280 },
    ],
    props: [],
    use: ["En todas las páginas de la tienda.", "Con la versión simplificada (Checkout) durante el pago, para no distraer."],
    avoid: ["Para navegación secundaria dentro de una página: usá Tabs o Breadcrumb."],
    a11y: ["Los botones de ícono llevan nombre accesible: «Abrir carrito», «Abrir menú», «Favoritos» y «Notificaciones»."],
  },
  {
    slug: "footer", cat: "Header y navegación", sb: C + "Footer", title: "Footer", nav: "Pie del sitio.",
    desc: "Pie del sitio: logos de marcas, cuatro columnas (cuenta, información, contacto y newsletter) y la barra legal con medios de pago y redes. En mobile las secciones pasan a un acordeón y el newsletter queda debajo.",
    shots: [{ label: "Default", story: [C + "Footer", "Default"], w: 1280 }],
    props: [],
    use: ["Al final de todas las páginas, salvo el checkout."],
    avoid: ["Para acciones propias de una página: el footer es navegación general."],
  },
  {
    slug: "notifications", cat: "Header y navegación", sb: H + "Notifications menu", title: "Notifications menu", nav: "Campana con panel de avisos.",
    desc: "Campana del header con un panel de avisos: promociones, bajas de precio y pedidos. Un punto indica avisos sin leer; cada aviso se marca como leído al abrirlo.",
    shots: [{ label: "Panel abierto", story: [H + "Notifications menu", "Default"], w: 440 }],
    props: [],
    use: ["Para novedades que le importan al cliente: ofertas, cambios de precio y estado de sus pedidos."],
    avoid: ["Para mensajes de error o confirmaciones de una acción: usá un toast."],
    a11y: ["El botón expone aria-expanded y su nombre incluye la cantidad de avisos sin leer.", "El panel se cierra con Escape o al hacer clic afuera."],
  },
  {
    slug: "support-chat", cat: "Header y navegación", sb: P + "Support chat (WhatsApp)", title: "Support chat", nav: "Botón flotante de ayuda por WhatsApp.",
    desc: "Botón flotante de ayuda abajo a la derecha: una etiqueta «¿Necesitás ayuda?» y un botón verde. Al abrirlo muestra un cuadro para escribir la consulta, que se envía por WhatsApp. Se muestra desde 769 px y no aparece en el checkout.",
    shots: [{ label: "Default", story: [P + "Support chat (WhatsApp)", "Default"], w: 1280 }],
    props: [],
    use: ["Para consultas rápidas sobre la página que el cliente está mirando."],
    avoid: ["Para avisos o promociones: usá Notifications menu o un banner."],
    a11y: ["El cuadro es un diálogo con nombre accesible.", "Mientras está cerrado, sus controles quedan fuera del orden de tabulación."],
  },
  // ── Inicio y contenido ──
  {
    slug: "hero", cat: "Inicio y contenido", sb: C + "Hero", title: "Hero", nav: "Portada de la home.",
    desc: "Portada de la home: carrusel de fotos a todo el ancho con etiqueta, título, texto y un botón. Cambia solo cada 5 segundos y tiene puntos para elegir la foto.",
    shots: [{ label: "Default", story: [C + "Hero", "Default"], w: 1280 }],
    props: [],
    use: ["Una vez, al comienzo de la home."],
    avoid: ["Dentro de páginas interiores: para destacar algo usá Promo banner."],
  },
  {
    slug: "promo-banner", cat: "Inicio y contenido", sb: P + "Promo banner", title: "Promo banner", nav: "Banner promocional en tres medidas.",
    desc: "Banner con una promoción: foto, etiqueta opcional, título, texto y un botón que lleva al listado. Tiene tres medidas: sm, md y lg.",
    shots: [
      { label: "Small", story: [P + "Promo banner", "Small"], w: 360 },
      { label: "Medium", story: [P + "Promo banner", "Medium"], w: 560 },
      { label: "Large", story: [P + "Promo banner", "Large"], w: 880 },
    ],
    props: [
      ["size", '"sm" | "md" | "lg"', "Medida del banner. Por defecto md."],
      ["image", "string", "Foto del banner.", true],
      ["imageAlt", "string", "Texto alternativo de la foto.", true],
      ["title", "string", "Título.", true],
      ["href", "string", "Destino del botón.", true],
      ["text", "string", "Texto debajo del título."],
      ["eyebrow", "string", "Etiqueta sobre el título."],
      ["cta", "string", "Texto del botón. Por defecto «Ver Productos»."],
    ],
    use: ["Para llevar al cliente a una oferta o a una categoría desde la home o el listado."],
    avoid: ["Con mucho texto: el banner resume, el detalle va en la página de destino."],
  },
  {
    slug: "service-blocks", cat: "Inicio y contenido", sb: P + "Service blocks", title: "Service blocks", nav: "Beneficios con ilustración.",
    desc: "Tarjeta con tres beneficios (soporte, devolución, envío), cada uno con su ilustración. En mobile se apilan.",
    shots: [{ label: "Default", story: [P + "Service blocks", "Default"], w: 1280 }],
    props: [["items", "{ image: string; title: string; desc: string }[]", "Los beneficios; lleva la ilustración (SVG) a la izquierda del texto.", true]],
    use: ["Debajo del hero, para reforzar la confianza en la compra."],
    avoid: ["Para listar pasos de un proceso: usá How it works."],
  },
  {
    slug: "brands-strip", cat: "Inicio y contenido", sb: P + "Brands strip", title: "Brands strip", nav: "Logos de marcas que se deslizan.",
    desc: "Fila de logos de marcas en gris que se desliza de costado, con flechas en desktop. En mobile es un carrusel por scroll-snap, como la navegación del header. Va dentro del footer.",
    shots: [{ label: "Default", story: [P + "Brands strip", "Default"], w: 1280 }],
    props: [],
    use: ["Para mostrar las marcas oficiales que vende la tienda."],
    avoid: ["Como navegación: los logos no son links."],
  },
  // ── Producto ──
  {
    slug: "product-card", cat: "Producto", sb: P + "Product card", title: "Product card", nav: "Card de producto.",
    desc: "Card de producto del listado y de los carruseles: foto en 4:3 con favorito, título, característica, precio con descuento, cuotas y etiquetas de envío. Al pasar el mouse aparece el botón «Vista rápida».",
    shots: [
      { label: "Default", story: [P + "Product card", "Default"], w: 280 },
      { label: "Con oferta", story: [P + "Product card", "On sale"], w: 280 },
      { label: "Skeleton", story: [P + "Product card", "Skeleton"], w: 280 },
      { label: "Grilla", story: [P + "Product card", "Grid"], w: 872 },
    ],
    props: [
      ["product", "Product", "Producto a mostrar.", true],
      ["titleAs", '"h2" | "h3"', "Nivel del título según dónde esté la card. Por defecto h3."],
    ],
    use: ["En el listado, los resultados de búsqueda y los carruseles de productos."],
    avoid: ["Para mostrar el detalle completo: la card resume, la ficha completa va en la página del producto."],
    a11y: ["El favorito expone aria-pressed y cambia su nombre entre «Agregar a favoritos» y «Quitar de favoritos»."],
  },
  {
    slug: "quick-view", cat: "Producto", sb: P + "Quick view", title: "Quick view", nav: "Vista rápida del producto.",
    desc: "Drawer lateral con el resumen del producto: fotos con carrusel, precio, cuotas, especificaciones y compra sin salir del listado. El pie (cantidad y «Agregar al carrito») queda siempre visible, aunque el contenido necesite scroll.",
    shots: [{ label: "Default", story: [P + "Quick view", "Default"], w: 520, vh: 760 }],
    props: [],
    use: ["Desde la card de producto, para comparar sin perder el lugar en el listado."],
    avoid: ["Para información larga: eso va en la ficha."],
  },
  {
    slug: "product-detail", cat: "Producto", sb: P + "Product info", title: "Product detail", nav: "Ficha de producto.",
    desc: "Ficha de producto, compuesta por la galería de fotos, la información (SKU, título, garantía) y el buy box con precio, cuotas, beneficios de pago y entrega, cantidad y «Agregar al carrito». En mobile el buy box suma una barra fija con el precio y los botones Agregar y Comprar.",
    shots: [
      { label: "Información", story: [P + "Product info", "Default"], w: 480 },
      { label: "Galería", story: [P + "Product gallery", "Default"], w: 480 },
      { label: "Buy box", story: [P + "Buy box", "Default"], w: 420 },
    ],
    props: [["product", "Product", "Producto a mostrar.", true]],
    use: ["En la página de cada producto."],
    avoid: ["En listados: ahí va Product card."],
  },
  {
    slug: "product-tabs", cat: "Producto", sb: P + "Product tabs", title: "Product tabs", nav: "Pestañas de la ficha.",
    desc: "Pestañas debajo de la ficha: Descripción, Especificaciones, Recursos y descargas (solo si el producto tiene archivos), Preguntas frecuentes y Garantía y soporte. Muestra lo que cada producto tiene cargado y completa con contenido genérico por categoría.",
    shots: [
      { label: "Producto completo", story: [P + "Product tabs", "Complete product"], w: 880 },
      { label: "Producto básico", story: [P + "Product tabs", "Basic product"], w: 880 },
    ],
    props: [["product", "Product", "Producto del que se muestra el detalle.", true]],
    use: ["Debajo de la ficha, para el contenido largo."],
    avoid: ["Para navegar entre páginas: las pestañas cambian de vista dentro de la misma página."],
  },
  {
    slug: "filter-sidebar", cat: "Producto", sb: P + "Filter sidebar", title: "Filter sidebar", nav: "Filtros del listado.",
    desc: "Columna de filtros del listado: switches de envío, categoría, marca, accionamiento, descuentos, cuotas y precio, con «Filtros aplicados» y «Borrar filtros». En mobile se abre como bottom sheet junto con el orden.",
    shots: [
      { label: "Sin filtros", story: [P + "Filter sidebar", "Default"], w: 300 },
      { label: "Con filtros aplicados", story: [P + "Filter sidebar", "With applied filters"], w: 300 },
    ],
    props: [
      ["title", "string", "Título del listado.", true],
      ["resultCount", "number", "Cantidad de resultados.", true],
      ["filters", "Filters", "Filtros elegidos.", true],
      ["facets", "Facets", "Opciones con su cantidad de resultados.", true],
      ["onChange", "(next: Filters) => void", "Se llama al cambiar un filtro.", true],
      ["sheetOpen", "boolean", "Si el bottom sheet de filtros está abierto (mobile).", true],
      ["onSheetOpenChange", "(open: boolean) => void", "Abre o cierra el bottom sheet.", true],
      ["sortLabel", "string", "Texto del botón de orden (mobile).", true],
      ["onOpenSort", "() => void", "Abre el bottom sheet de orden.", true],
    ],
    use: ["Al costado del listado de productos."],
    avoid: ["Con pocos productos: si no hay qué filtrar, mostrá solo el orden."],
  },
  // ── Carrito ──
  {
    slug: "cart-item", cat: "Carrito", sb: P + "Cart item", title: "Cart item", nav: "Fila de producto en carrito y drawer.",
    desc: "Fila de un producto del carrito: foto con contador de unidades, nombre, etiquetas, precio, selector de cantidad y eliminar. Tiene una versión para la página de carrito y otra, sin borde, para el drawer.",
    shots: [
      { label: "Carrito", story: [P + "Cart item", "Default"], w: 560 },
      { label: "Drawer", story: [P + "Cart item", "Drawer"], w: 560 },
    ],
    props: [
      ["product", "Product", "Producto de la fila.", true],
      ["quantity", "number", "Unidades en el carrito.", true],
      ["variant", '"page" | "drawer"', "Versión de la fila."],
      ["loading", '"inc" | "dec" | null', "Muestra el loader en el botón que se está procesando."],
      ["onIncrement", "() => void", "Suma una unidad.", true],
      ["onDecrement", "() => void", "Resta una unidad.", true],
      ["onRemove", "() => void", "Quita el producto.", true],
      ["onNavigate", "() => void", "Se llama al ir a la ficha desde la fila."],
    ],
    use: ["En la página de carrito y en el drawer."],
    avoid: ["En el resumen del checkout: ahí va Order review, que no se edita."],
  },
  {
    slug: "cart-drawer", cat: "Carrito", sb: C + "Cart drawer", title: "Cart drawer", nav: "Drawer del carrito.",
    desc: "Panel lateral con el carrito: productos, subtotal, código postal, opciones de entrega (domicilio o retiro), total y «Iniciar compra». La entrega que se elige acá queda elegida en el checkout.",
    shots: [
      { label: "Vacío", story: [C + "Cart drawer", "Empty"], w: 520, vh: 760 },
      { label: "Con un producto", story: [C + "Cart drawer", "With items"], w: 520, vh: 760 },
      { label: "Con varios productos", story: [C + "Cart drawer", "Several items"], w: 520, vh: 760 },
    ],
    props: [],
    use: ["Al agregar un producto o al tocar el carrito del header."],
    avoid: ["Como reemplazo de la página de carrito: el drawer es un resumen rápido."],
  },
  {
    slug: "order-summary", cat: "Carrito", sb: P + "Order summary", title: "Order summary", nav: "Resumen del pedido.",
    desc: "Resumen de la página de carrito: subtotal, envío, total, botón «Finalizar compra», código de descuento y medios de pago.",
    shots: [{ label: "Default", story: [P + "Order summary", "Default"], w: 400 }],
    props: [
      ["totalItems", "number", "Cantidad de productos.", true],
      ["subtotal", "number", "Subtotal sin envío.", true],
      ["total", "number", "Total con el envío elegido.", true],
      ["loading", "boolean", "Muestra el loader en el botón."],
      ["onCheckout", "() => void", "Va al checkout.", true],
    ],
    use: ["Junto a la lista de productos de la página de carrito."],
    avoid: ["Durante el checkout: ahí va Order review."],
  },
  {
    slug: "delivery-options", cat: "Carrito", sb: P + "Delivery options", title: "Delivery options", nav: "Código postal y método de entrega.",
    desc: "Código postal y opciones de entrega: envío a domicilio (gratis o Express) y retiro en sucursal. El método elegido se comparte entre el drawer del carrito y el checkout, y se puede cambiar en ambos. Si el carrito tiene un producto que solo se retira, el envío a domicilio queda deshabilitado.",
    shots: [
      { label: "Con código postal", story: [P + "Delivery options", "Default"], w: 420 },
      { label: "Sin código postal", story: [P + "Delivery options", "Without postal code"], w: 420 },
    ],
    props: [["showPostalCode", "boolean", "Muestra el campo de código postal. Por defecto true."]],
    use: ["En el drawer del carrito y en el paso de entrega del checkout."],
    avoid: ["Para elegir el medio de pago: eso es Payment methods."],
  },
  // ── Checkout ──
  {
    slug: "personal-form", cat: "Checkout", sb: P + "Personal form", title: "Personal form", nav: "Datos de contacto y facturación.",
    desc: "Paso 1 del checkout: datos de contacto y de facturación, sin crear cuenta. Valida al salir de cada campo y al continuar; con errores muestra un aviso arriba y marca cada campo.",
    shots: [
      { label: "Vacío", story: [P + "Personal form", "Empty"], w: 720 },
      { label: "Completo", story: [P + "Personal form", "Filled"], w: 720 },
    ],
    props: [
      ["defaultValues", "PersonalData", "Valores iniciales.", true],
      ["onSubmit", "(data: PersonalData) => void", "Se llama con los datos cuando el formulario es válido.", true],
    ],
    use: ["Como primer paso del checkout."],
    avoid: ["Para pedir una cuenta: en Ketea se compra solo con un email."],
  },
  {
    slug: "shipping-form", cat: "Checkout", sb: P + "Shipping form", title: "Shipping form", nav: "Domicilio y entrega.",
    desc: "Paso 2 del checkout: dirección de entrega y tipo de entrega (domicilio o retiro). Se completa con la dirección de facturación si es la misma y con el código postal y el método del carrito.",
    shots: [
      { label: "Vacío", story: [P + "Shipping form", "Empty"], w: 560 },
      { label: "Con datos", story: [P + "Shipping form", "Filled"], w: 560 },
    ],
    props: [
      ["defaultValues", "Partial<ShippingData>", "Valores iniciales."],
      ["loading", "boolean", "Muestra el loader en el botón."],
      ["onSubmit", "(data: ShippingData) => void", "Se llama con los datos cuando el formulario es válido.", true],
    ],
    use: ["Como segundo paso del checkout."],
    avoid: ["Fuera del checkout: la dirección se pide solo al comprar."],
  },
  {
    slug: "payment-methods", cat: "Checkout", sb: P + "Payment methods", title: "Payment methods", nav: "Paso de pago (simulado).",
    desc: "Paso 3 del checkout: MODO, Mercado Pago, tarjeta de crédito, débito o prepaga (con cuotas) y efectivo. Es una simulación: no procesa pagos, cada botón confirma la compra. Para cobrar de verdad hay que reemplazarlo por el componente del proveedor.",
    shots: [{ label: "Default", story: [P + "Payment methods", "Default"], w: 640 }],
    props: [
      ["total", "number", "Total a pagar.", true],
      ["loading", "boolean", "Muestra el loader mientras se confirma.", true],
      ["onPay", "(method: PaymentMethod, detail?: string) => void", "Se llama al confirmar el pago, con el método elegido.", true],
    ],
    use: ["Como último paso del checkout."],
    avoid: ["Para cobrar en producción sin reemplazarlo: no valida ni procesa nada."],
  },
  {
    slug: "order-review", cat: "Checkout", sb: P + "Order review", title: "Order review", nav: "Resumen de compra del checkout.",
    desc: "Resumen de la compra durante el checkout: productos, método de envío, costo y total. RecapCard muestra los datos de cada paso ya completado, con un botón para editarlos.",
    shots: [
      { label: "Resumen", story: [P + "Order review", "Default"], w: 420 },
      { label: "RecapCard", story: [P + "Order review", "Recap card"], w: 420 },
    ],
    props: [
      ["items", "{ product: Product; quantity: number }[]", "Productos de la compra.", true],
      ["subtotal", "number", "Subtotal sin envío.", true],
      ["shippingCost", "number", "Costo de envío."],
      ["shippingLabel", "string", "Nombre del método de envío."],
      ["total", "number", "Total.", true],
    ],
    use: ["Al costado del formulario en todos los pasos del checkout."],
    avoid: ["Para editar cantidades: eso se hace en el carrito."],
  },
  {
    slug: "order-confirmation", cat: "Checkout", sb: P + "Order confirmation", title: "Order confirmation", nav: "Pantalla de pedido confirmado.",
    desc: "Pantalla final de la compra: número y fecha del pedido, próximos pasos en una línea de tiempo, datos del cliente, entrega, pago, resumen y ayuda. Se puede imprimir.",
    shots: [{ label: "Default", story: [P + "Order confirmation", "Default"], w: 1280 }],
    props: [
      ["orderRef", "string", "Número de pedido.", true],
      ["dateString", "string", "Fecha ya formateada.", true],
      ["customer", "{ nombre: string; email: string; telefono: string }", "Datos del cliente.", true],
      ["address", "{ line1: string; line2: string }", "Domicilio; no se pasa si se retira."],
      ["delivery", "DeliveryOption", "Método de entrega elegido.", true],
      ["shippingCost", "number", "Costo de envío.", true],
      ["payment", "PaymentSummary", "Medio de pago.", true],
      ["items", "{ product: Product; quantity: number }[]", "Productos.", true],
      ["subtotal", "number", "Subtotal.", true],
      ["total", "number", "Total.", true],
    ],
    use: ["Después de confirmar el pago."],
    avoid: ["Para consultar pedidos anteriores: eso es Order list."],
  },
  // ── Cuenta ──
  {
    slug: "order-list", cat: "Cuenta", sb: P + "Order list", title: "Order list", nav: "Pedidos de la cuenta.",
    desc: "Lista de pedidos de Mi cuenta: número, fecha, estado, productos, entrega, pago y total de cada uno.",
    shots: [
      { label: "Un pedido", story: [P + "Order list", "One order"], w: 640 },
      { label: "Varios pedidos", story: [P + "Order list", "Several orders"], w: 640 },
    ],
    props: [["orders", "Order[]", "Pedidos a mostrar.", true]],
    use: ["En Mi cuenta, también para quien compró como invitado."],
    avoid: ["Durante el checkout: ahí va Order review."],
  },
  {
    slug: "account-access", cat: "Cuenta", sb: P + "Account access form", title: "Account access form", nav: "Ingresar o crear cuenta.",
    desc: "Formulario para crear una cuenta o ingresar, con Google, Apple o email, y recuperación de contraseña. El cambio entre registrarse e ingresar es un link. La sesión es simulada hasta que haya un backend.",
    shots: [
      { label: "Crear cuenta", story: [P + "Account access form", "Default"], w: 440 },
      { label: "Ingresar", story: [P + "Account access form", "Login"], w: 440 },
    ],
    props: [
      ["initialMode", '"register" | "login"', "Modo con el que arranca. Por defecto register."],
      ["submitLabels", "Partial<Record<AccountMode, string>>", "Textos del botón principal por modo."],
      ["onSuccess", "(result: AccountAccessResult) => void", "Se llama al ingresar o registrarse.", true],
    ],
    use: ["En el modal de acceso y en Mi cuenta."],
    avoid: ["Para obligar a registrarse al comprar: en Ketea se compra sin cuenta."],
  },
  // ── Componentes que se muestran en vivo ──
  {
    slug: "checkbox", group: "components", sb: "UI/Checkbox", title: "Checkbox", nav: "Casilla de selección, con cantidad de resultados.",
    desc: "Casilla para elegir una o varias opciones. Puede mostrar la cantidad de resultados entre paréntesis, como en los filtros del listado.",
    shots: [
      { label: "Default", story: ["UI/Checkbox", "Default"], w: 360 },
      { label: "Lista con cantidades", story: ["UI/Checkbox", "List"], w: 360 },
    ],
    props: [
      ["label", "string", "Texto de la opción.", true],
      ["count", "number", "Cantidad de resultados, entre paréntesis."],
      ["checked / defaultChecked", "boolean", "Estado marcado (controlado o inicial)."],
      ["disabled", "boolean", "Deshabilita la casilla."],
    ],
    use: ["Para elegir varias opciones a la vez, como los filtros de categoría y marca."],
    avoid: ["Para elegir una sola opción: usá Radio card. Para activar o desactivar algo al instante: usá Switch."],
  },
  {
    slug: "switch", group: "components", sb: "UI/Switch", title: "Switch", nav: "Interruptor para activar y desactivar una opción.",
    desc: "Interruptor con etiqueta. Cambia al instante, sin botón de confirmar. Se usa en la caja de filtros de envío del listado.",
    shots: [
      { label: "Apagado", story: ["UI/Switch", "Off"], w: 360 },
      { label: "Encendido", story: ["UI/Switch", "On"], w: 360 },
    ],
    props: [
      ["label", "string", "Texto de la opción.", true],
      ["checked / defaultChecked", "boolean", "Estado encendido (controlado o inicial)."],
      ["disabled", "boolean", "Deshabilita el interruptor."],
    ],
    use: ["Para activar o desactivar una opción con efecto inmediato."],
    avoid: ["Dentro de un formulario que se envía con un botón: usá Checkbox."],
  },
  {
    slug: "radio-card", group: "components", sb: "UI/Radio card", title: "Radio card", nav: "Opciones de entrega y pago como tarjetas.",
    desc: "Grupo de opciones excluyentes dibujadas como tarjetas, con título y detalle. Se usa para elegir el método de entrega y el medio de pago.",
    shots: [{ label: "Default", story: ["UI/Radio card", "Default"], w: 420 }],
    props: [
      ["name", "string", "Nombre del grupo.", true],
      ["legend", "ReactNode", "Título del grupo."],
      ["options", "{ value: T; label: string; description?: string[]; disabled?: boolean }[]", "Opciones.", true],
      ["value", "T", "Opción elegida.", true],
      ["onChange", "(value: T) => void", "Se llama al elegir otra opción.", true],
    ],
    use: ["Para elegir una opción entre pocas cuando cada una necesita explicación."],
    avoid: ["Con muchas opciones: usá un Select."],
  },
  {
    slug: "form-input", group: "components", sb: "UI/Form input", title: "Form input", nav: "Campo con etiqueta, nota y error.",
    desc: "Campo de formulario completo: etiqueta, nota de ayuda, mensaje de error y estado válido. Es el campo que usa el checkout.",
    shots: [
      { label: "Default", story: ["UI/Form input", "Default"], w: 360 },
      { label: "Con nota", story: ["UI/Form input", "With note"], w: 360 },
      { label: "Con error", story: ["UI/Form input", "With error"], w: 360 },
      { label: "Válido", story: ["UI/Form input", "Valid"], w: 360 },
    ],
    props: [
      ["label", "string", "Etiqueta del campo.", true],
      ["note", "string", "Nota de ayuda debajo del campo."],
      ["error", "string", "Mensaje de error; marca el campo."],
      ["valid", "boolean", "Marca el campo como válido."],
    ],
    use: ["En formularios completos, como los del checkout."],
    avoid: ["Para un campo suelto sin etiqueta propia: usá Input con Field."],
  },
  {
    slug: "logo", group: "components", sb: "UI/Logo", title: "Logo", nav: "Logotipo de Ketea.",
    desc: "Logotipo de Ketea en SVG, en cuatro alturas: sm (header mobile), md (footer), lg (header desktop) y checkout. Las alturas son medidas de marca, no tokens de espaciado.",
    shots: [
      { label: "Default", story: ["UI/Logo", "Default"], w: 600 },
      { label: "Header desktop", story: ["UI/Logo", "Large"], w: 600 },
      { label: "Checkout", story: ["UI/Logo", "Checkout"], w: 600 },
    ],
    props: [["size", '"sm" | "md" | "lg" | "checkout"', "Altura del logo. Por defecto md."]],
    use: ["En el header, el footer y el checkout."],
    avoid: ["Estirarlo ni cambiarle los colores: usar siempre la versión de marca."],
  },
  {
    slug: "text", group: "components", sb: "UI/Text", title: "Text", nav: "Texto y títulos por escalones.",
    desc: "Texto de párrafo y títulos por escalón. Los títulos usan los estilos de texto de los tokens (display, headline, title, subtitle, label, section y page).",
    shots: [
      { label: "Párrafo", story: ["UI/Text", "Default"], w: 600 },
      { label: "Títulos", story: ["UI/Text", "Headings"], w: 600 },
    ],
    props: [
      ["size", "xs … 4xl", "Escalón de tamaño del texto."],
      ["tone", '"primary" | "secondary" | "tertiary" | …', "Color del texto por token."],
      ["weight", '"regular" | "medium" | "semibold" | "bold"', "Peso de la fuente."],
    ],
    use: ["Para todo el texto: así el tamaño y el color salen de los tokens."],
    avoid: ["Armar tamaños con utilidades de Tailwind: la tienda lo prohíbe."],
  },
]

/** Captura de respaldo si una vista no está en vivo (ver lib/live-stories.ts). */
export const shotFile = (slug: string, i: number) => `/patterns/${slug}-${i}.jpg`

export const sbNav = sbPatterns.filter((p) => p.group !== "components").map((p) => ({ slug: p.slug, title: p.title, description: p.nav, cat: p.cat }))
export const sbNavComponents = sbPatterns.filter((p) => p.group === "components").map((p) => ({ slug: p.slug, title: p.title, description: p.nav }))
