import { FileText, Headphones, Package, RotateCcw, Search, ShieldCheck, ShoppingCart, Truck, Phone, Mail, X } from "lucide-react"
import { Callout } from "@/content/compat/blocks"
import { buildPage } from "@/content/compat/build-page"
import Variants from "@/content/compat/variants"
import { EmptyState } from "@shop/components/patterns/empty-state"
import { FeatureRow } from "@shop/components/patterns/feature-row"
import { HowItWorks } from "@shop/components/patterns/how-it-works"
import { InfoPanel } from "@shop/components/patterns/info-panel"
import { PageHeader } from "@shop/components/patterns/page-header"
import { SectionHeader } from "@shop/components/patterns/section-header"
import { TrustStrip } from "@shop/components/patterns/trust-strip"
import { CouponField } from "@shop/components/patterns/coupon-field"
import { ShippingCheck } from "@shop/components/patterns/shipping-check"
import { buttonClasses } from "@shop/components/ui/button"
import { SB } from "@/lib/storybook"
import { CtaDemo, DrawerDemo, ModalDemo, StepDemo } from "./pattern-demos"

const box = (w: number, children: React.ReactNode) => <div className={`demo-w-${w} shop-scope`}>{children}</div>
const none = "sin tokens propios"

const steps = [
  { number: "01", icon: <ShoppingCart className="icon-md" aria-hidden />, title: "Elegí", text: "Sumá productos al carrito." },
  { number: "02", icon: <Package className="icon-md" aria-hidden />, title: "Armá tu pedido", text: "Elegí la entrega.", featured: true },
  { number: "03", icon: <Truck className="icon-md" aria-hidden />, title: "Recibí", text: "Entregamos en tu zona." },
]

export const patternPanels: Record<string, () => ReturnType<typeof buildPage>> = {
  "page-header": () =>
    buildPage({
      css: "patterns/page-parts.css", selector: /page-header/, history: null, tokenNote: none,
      purpose: [
        { title: "Abrir la página", text: "Título h1 con etiqueta y bajada opcionales." },
        { title: "Dos densidades", text: "Normal para páginas de contenido y tight para listados." },
        { title: "Jerarquía clara", text: "Siempre un único h1 por página." },
      ],
      config: (
        <Variants title="Variante" ariaLabel="Variante del page header" description={<>Props <code>eyebrow</code>, <code>title</code>, <code>children</code> (bajada) y <code>tight</code>.</>}
          items={[
            { value: "full", label: "Completo", caption: "Etiqueta, título y bajada.", node: box(480, <PageHeader eyebrow="Ayuda" title="Preguntas frecuentes">Respuestas a las dudas más comunes.</PageHeader>) },
            { value: "title", label: "Solo título", caption: "Sin etiqueta ni bajada.", node: box(480, <PageHeader title="Mis favoritos" />) },
            { value: "tight", label: "Tight", caption: "Menos aire debajo, para listados.", node: box(480, <PageHeader title="Productos" tight>Elegí tus favoritos.</PageHeader>) },
          ]} />
      ),
      use: ["Al comienzo de cada página de contenido.", "Para listados, usá la variante tight."],
      avoid: ["Más de una vez por página (es el h1).", "Para títulos de sección: usá Section header."],
      a11y: ["Renderiza el único <h1> de la página.", "La etiqueta (eyebrow) es un <span>: no reemplaza al título."],
    }),

  "section-header": () =>
    buildPage({
      css: "patterns/page-parts.css", selector: /section-header/, history: null, tokenNote: none,
      purpose: [
        { title: "Titular una sección", text: "Título a la izquierda y un link opcional a la derecha." },
        { title: "Ir al listado completo", text: "El link «Ver todo» lleva a la vista completa." },
        { title: "Etiqueta propia", text: "El texto del link se puede cambiar." },
      ],
      config: (
        <Variants title="Link" ariaLabel="Link del section header" description={<>Props <code>title</code>, <code>href</code> y <code>linkLabel</code>.</>}
          items={[
            { value: "link", label: "Con link", caption: "href activa el link.", node: box(480, <SectionHeader title="Más vendidos" href="#demo" />) },
            { value: "custom", label: "Etiqueta propia", caption: "linkLabel.", node: box(480, <SectionHeader title="Ofertas" href="#demo" linkLabel="Ver ofertas" />) },
            { value: "none", label: "Sin link", caption: "Sin href.", node: box(480, <SectionHeader title="Categorías" />) },
          ]} />
      ),
      use: ["Arriba de un carrusel o grilla de productos.", "Cuando hay una vista completa a la que ir."],
      avoid: ["Para el título de la página: usá Page header."],
      a11y: ["El título es un encabezado; el link usa el texto visible como nombre.", "Si hay varios «Ver todo» en la página, sumá contexto en linkLabel."],
    }),

  "step-indicator": () =>
    buildPage({
      css: "components/step-indicator.css", history: null,
      purpose: [
        { title: "Ubicar en el proceso", text: "Muestra en qué paso del checkout está el usuario." },
        { title: "Volver, no saltar", text: "Solo se puede volver a pasos anteriores." },
        { title: "Compacto en mobile", text: "En pantallas chicas solo se ve el label del paso actual." },
      ],
      config: (
        <Variants title="Paso actual" ariaLabel="Paso del indicador" description="Probalo: usá los botones y hacé click en un paso anterior."
          items={[{ value: "live", label: "Interactivo", caption: "Pasos completados con tilde; clickeables para volver.", node: <StepDemo /> }]} />
      ),
      use: ["En flujos de varios pasos con orden fijo, como el checkout."],
      avoid: ["Para navegación libre entre secciones: usá Tabs.", "Con más de 4–5 pasos."],
      a11y: [<>Es una lista ordenada con <code>aria-label=&quot;Pasos del checkout&quot;</code>.</>, <>El paso actual lleva <code>aria-current=&quot;step&quot;</code>.</>, "Los pasos futuros están deshabilitados; el label visible tiene su par sr-only."],
      keys: [[<kbd key="t">Tab</kbd>, "Mueve entre los pasos habilitados."], [<><kbd>Enter</kbd> / <kbd>Espacio</kbd></>, "Vuelve a un paso anterior."]],
    }),

  "trust-strip": () =>
    buildPage({
      css: "patterns/page-parts.css", selector: /trust/, history: null, tokenNote: none,
      purpose: [
        { title: "Generar confianza", text: "Beneficios clave del servicio en una sola franja." },
        { title: "Grilla responsive", text: "1, 2 o 4 columnas según el ancho." },
        { title: "Íconos consistentes", text: "Usa Icon badge tile con tono soft-brand." },
      ],
      config: (
        <Variants title="Ítems" ariaLabel="Ítems del trust strip" description={<>Prop <code>items</code>: arreglo de <code>icon</code>, <code>title</code> y <code>desc</code>.</>}
          items={[{ value: "four", label: "4 ítems", caption: "Los textos son de ejemplo.", node: (
            <div className="demo-w-full shop-scope"><TrustStrip items={[
              { icon: <ShieldCheck className="icon-md" aria-hidden />, title: "Compra segura", desc: "Tus datos protegidos." },
              { icon: <Truck className="icon-md" aria-hidden />, title: "Envío", desc: "A tu zona." },
              { icon: <Package className="icon-md" aria-hidden />, title: "Garantía", desc: "Productos con garantía oficial." },
              { icon: <Headphones className="icon-md" aria-hidden />, title: "Ayuda", desc: "Estamos para ayudarte." },
            ]} /></div>) }]} />
      ),
      use: ["En la home o el checkout para reforzar confianza.", "Con 3 o 4 beneficios cortos."],
      avoid: ["Con textos largos: cada ítem debe leerse de un vistazo."],
      a11y: [<>Es una <code>&lt;section aria-label=&quot;Beneficios&quot;&gt;</code>.</>, "Los íconos son decorativos (aria-hidden): el significado está en el título."],
    }),

  "feature-row": () =>
    buildPage({
      css: "patterns/page-parts.css", selector: /feature-row/, history: null, tokenNote: none,
      purpose: [
        { title: "Explicar con ícono", text: "Fila con tile de ícono, título y texto." },
        { title: "Dos formas", text: "Suelta (pasos, valores) o dentro de una tarjeta (contacto)." },
        { title: "Link opcional", text: "Con href, la fila entera es un link externo." },
      ],
      config: (
        <Variants title="Variante" ariaLabel="Variante del feature row" description={<>Prop <code>variant</code>: <code>plain</code> o <code>card</code>; <code>href</code> la vuelve link.</>}
          items={[
            { value: "plain", label: "Plain", caption: "Suelta.", node: box(380, <FeatureRow icon={<Truck className="icon-md" aria-hidden />} title="Entrega en tu zona">Texto de ejemplo del beneficio.</FeatureRow>) },
            { value: "card", label: "Card", caption: "Dentro de una tarjeta.", node: box(380, <FeatureRow variant="card" icon={<Mail className="icon-md" aria-hidden />} title="Escribinos">hola@ejemplo.com</FeatureRow>) },
            { value: "link", label: "Card con link", caption: "href: se abre en una pestaña nueva.", node: box(380, <FeatureRow variant="card" href="https://example.com" icon={<Phone className="icon-md" aria-hidden />} title="Llamanos">Tel. de ejemplo</FeatureRow>) },
          ]} />
      ),
      use: ["Para listar beneficios, pasos o canales de contacto."],
      avoid: ["Para acciones principales: usá Button."],
      a11y: ["El título es un h2: ajustá el nivel si no encaja en la jerarquía.", "Con href, el texto completo de la fila es el nombre del link."],
    }),

  "how-it-works": () =>
    buildPage({
      css: "patterns/how-it-works.css", history: null,
      purpose: [
        { title: "Explicar un proceso", text: "Tres pasos con ícono y texto corto." },
        { title: "Un paso destacado", text: "El paso featured lleva fondo de marca y es más ancho." },
        { title: "Responsive", text: "Fila con conectores en desktop y secuencia vertical en mobile." },
      ],
      config: (
        <Variants title="Pasos" ariaLabel="Pasos de how it works" description={<>Prop <code>steps</code>. Los numerales salen de un contador CSS y son decorativos: el <code>&lt;ol&gt;</code> ya numera.</>}
          items={[{ value: "three", label: "3 pasos", caption: "Textos de ejemplo.", node: <div className="demo-w-full shop-scope"><HowItWorks steps={steps} /></div> }]} />
      ),
      use: ["En la home o la página «Cómo comprar»."],
      avoid: ["Con más de 3–4 pasos: usá una lista."],
      a11y: ["Es una lista ordenada; los numerales son decorativos.", "Los conectores son aria-hidden."],
    }),

  "info-panel": () =>
    buildPage({
      css: "patterns/page-parts.css", selector: /info-panel/, history: null, tokenNote: none,
      purpose: [
        { title: "Destacar información", text: "Panel con título y texto breve." },
        { title: "Superficie suave", text: "Usa Card subtle con radio xl." },
        { title: "Contenido libre", text: "El texto admite cualquier ReactNode." },
      ],
      config: (
        <Variants title="Panel" ariaLabel="Info panel" description={<>Props <code>title</code> y <code>children</code>.</>}
          items={[{ value: "one", label: "Ejemplo", caption: "Texto de ejemplo.", node: box(420, <InfoPanel title="Título del panel">Texto de apoyo que amplía la información del título.</InfoPanel>) }]} />
      ),
      use: ["Para aclaraciones dentro de una página, por ejemplo condiciones de un producto."],
      avoid: ["Para avisos urgentes: usá un callout."],
      a11y: ["El título es un h2: ajustá la jerarquía si hace falta."],
    }),

  "empty-state": () =>
    buildPage({
      css: "patterns/empty-state.css", history: null,
      purpose: [
        { title: "Guiar al usuario", text: "Explica por qué no hay contenido y ofrece un siguiente paso." },
        { title: "Siempre con ícono", text: "Dentro de un Icon badge, para reconocer el caso de un vistazo." },
        { title: "Mismo formato", text: "Ícono, título, texto y una acción opcional, siempre con los mismos tamaños." },
      ],
      config: (
        <Variants title="Caso" ariaLabel="Casos del empty state" description="Todos llevan ícono, título y texto, con los mismos tamaños. La acción es opcional."
          items={[
            { value: "cart", label: "Carrito vacío", caption: "Cuando el carrito no tiene productos.", node: box(420, <EmptyState icon={<ShoppingCart className="icon-lg" aria-hidden />} title="Tu carrito está vacío" text="Explorá nuestros productos y empezá tu pedido."><a href="#demo" className={buttonClasses({ size: "md" })}>Ver productos</a></EmptyState>) },
            { value: "search", label: "Sin resultados", caption: "Cuando los filtros no devuelven productos.", node: box(420, <EmptyState icon={<Search className="icon-lg" aria-hidden />} title="No encontramos productos" text="Probá con otros filtros o explorá todas las categorías."><a href="#demo" className={buttonClasses({ size: "md" })}>Eliminar filtros</a></EmptyState>) },
            { value: "payment", label: "Pago rechazado", caption: "Cuando el pago no se pudo procesar.", node: box(420, <EmptyState icon={<X className="icon-lg" aria-hidden />} title="No pudimos procesar el pago" text="Verificá los datos de tu tarjeta o probá con otro medio de pago."><a href="#demo" className={buttonClasses({ size: "md" })}>Reintentar pago</a></EmptyState>) },
            { value: "orders", label: "Sin órdenes", caption: "Cuando todavía no hay pedidos realizados.", node: box(420, <EmptyState icon={<FileText className="icon-lg" aria-hidden />} title="No tenés órdenes realizadas" text="Explorá nuestros productos para realizar pedidos."><a href="#demo" className={buttonClasses({ size: "md" })}>Explorá productos</a></EmptyState>) },
            { value: "returns", label: "Sin devoluciones", caption: "Informativo: no lleva acción.", node: box(420, <EmptyState icon={<RotateCcw className="icon-lg" aria-hidden />} title="Sin devoluciones" text="Para hacer una solicitud, tu orden debe haber sido entregada y no deben haber pasado más de 7 días desde la entrega." />) },
          ]} />
      ),
      use: ["Carrito vacío, sin resultados, pago rechazado, sin órdenes y sin devoluciones."],
      avoid: ["Para errores: usá un mensaje de error."],
      a11y: ["Elegí el nivel del título (titleAs): h1 en páginas, h3 en paneles.", "La acción debe ser un link o botón con texto claro."],
    }),

  modal: () =>
    buildPage({
      css: "patterns/modal.css", selector: /\.modal/, history: null,
      purpose: [
        { title: "Pedir atención", text: "Diálogo sobre un fondo atenuado para tareas cortas." },
        { title: "Se cierra fácil", text: "Con Escape, al tocar el fondo o con el botón de cerrar." },
        { title: "Confirmaciones", text: "El rol alertdialog es para acciones destructivas." },
      ],
      config: (
        <>
          <Variants title="Tamaño" ariaLabel="Tamaño del modal" description={<>Prop <code>size</code>: <code>sm</code> o <code>md</code>. El modal real se abre sobre toda la página.</>}
            items={[
              { value: "sm", label: "Small", caption: "Abrí el modal de ejemplo.", node: <ModalDemo size="sm" label="Modal pequeño" closeButton /> },
              { value: "md", label: "Medium", caption: "Abrí el modal de ejemplo.", node: <ModalDemo size="md" label="Modal mediano" closeButton /> },
            ]} />
          <Variants title="Rol" ariaLabel="Rol del modal" description={<>Prop <code>role</code>.</>}
            items={[
              { value: "dialog", label: "dialog", caption: "Diálogo estándar.", node: <ModalDemo label="Diálogo" /> },
              { value: "alert", label: "alertdialog", caption: "Para confirmaciones destructivas.", node: <ModalDemo label="¿Eliminar este elemento?" role="alertdialog" /> },
            ]} />
        </>
      ),
      use: ["Para tareas breves que requieren decisión: acceso, confirmaciones."],
      avoid: ["Para contenido largo: usá una página.", "Para paneles contextuales del carrito: usá Drawer."],
      a11y: [<><code>role=&quot;dialog&quot;</code> (o <code>alertdialog</code>) y <code>aria-modal=&quot;true&quot;</code> con <code>aria-label</code>.</>, "Cierra con Escape y al tocar el fondo."],
      keys: [[<kbd key="e">Esc</kbd>, "Cierra el modal."]],
      extraUsage: <Callout>En la tienda hay variantes ya armadas: Auth modal (ingreso y registro), Confirm delete modal (quitar un producto) y Bottom sheet (panel inferior en mobile). Se ven en <a href={SB} target="_blank" rel="noopener noreferrer">Storybook ↗</a>.</Callout>,
    }),

  drawer: () =>
    buildPage({
      css: "patterns/modal.css", selector: /\.drawer/, history: null,
      purpose: [
        { title: "Panel lateral", text: "Se abre desde la derecha sin salir de la página." },
        { title: "Con contador", text: "Título con contador opcional, como «2 productos»." },
        { title: "Bloquea el scroll", text: "La página queda fija mientras está abierto." },
      ],
      config: <Variants title="Drawer" ariaLabel="Drawer" description={<>Props <code>open</code>, <code>onClose</code>, <code>title</code>, <code>count</code> y <code>closeLabel</code>.</>}
        items={[{ value: "live", label: "Interactivo", caption: "Abrilo y cerralo con Escape.", node: <DrawerDemo /> }]} />,
      use: ["Para el carrito y menús que complementan la página."],
      avoid: ["Para confirmaciones: usá Modal."],
      a11y: [<><code>role=&quot;dialog&quot;</code> y <code>aria-modal</code> con el título como nombre.</>, "Cierra con Escape."],
      keys: [[<kbd key="e">Esc</kbd>, "Cierra el drawer."]],
    }),

  "coupon-field": () =>
    buildPage({
      css: "patterns/page-parts.css", selector: /coupon/, history: null, tokenNote: none,
      purpose: [
        { title: "Aplicar un cupón", text: "Campo de texto y botón secundario." },
        { title: "Un solo componente", text: "Se usa igual en carrito y checkout." },
        { title: "Confirma el resultado", text: "Al aplicar, muestra un mensaje de estado." },
      ],
      config: <Variants title="Flujo" ariaLabel="Coupon field" description="Escribí 3 o más caracteres y aplicá. La validación es simulada."
        items={[{ value: "live", label: "Interactivo", caption: "Usa Field, Input y Button secondary.", node: box(360, <CouponField />) }]} />,
      use: ["En el resumen del carrito y el checkout."],
      avoid: ["Para otros campos de texto: usá Field + Input."],
      a11y: ["El campo tiene label visible (Field).", <>El resultado usa <code>role=&quot;status&quot;</code>.</>, "El botón muestra loading mientras valida."],
    }),

  "checkout-cta": () =>
    buildPage({
      css: "patterns/order-summary.css", selector: /checkout-cta/, history: null, tokenNote: none,
      purpose: [
        { title: "Finalizar compra", text: "Botón principal de ancho completo." },
        { title: "Estado de carga", text: "Muestra «Redirigiendo…» mientras avanza al checkout." },
        { title: "Compartido", text: "Lo usan el resumen del carrito y el drawer." },
      ],
      config: <Variants title="Estado" ariaLabel="Estado del checkout CTA" description={<>Props <code>loading</code>, <code>label</code> y <code>onClick</code>.</>}
        items={[
          { value: "idle", label: "Default", caption: "Listo para finalizar la compra.", node: <CtaDemo /> },
          { value: "loading", label: "Loading", caption: "Redirigiendo al checkout.", node: <CtaDemo loading /> },
        ]} />,
      use: ["Al pie del resumen del carrito y del drawer."],
      avoid: ["Para otros pasos del flujo: usá Button."],
      a11y: ["El botón usa loading con aria-busy y no admite doble click."],
    }),

  "shipping-check": () =>
    buildPage({
      css: "patterns/buy-box.css", selector: /shipping-check/, history: null, tokenNote: none,
      purpose: [
        { title: "Verificar la zona", text: "El usuario ingresa su código postal y ve si hay envío." },
        { title: "Resultado inmediato", text: "Mensaje de zona cubierta o no cubierta." },
        { title: "En la ficha", text: "Se usa dentro del bloque de compra." },
      ],
      config: <Variants title="Flujo" ariaLabel="Shipping check" description="Probalo con 1425 (cubierto) o 5000 (no cubierto). La regla es una heurística simple de ejemplo."
        items={[{ value: "live", label: "Interactivo", caption: "Usa Input y Button secondary.", node: box(380, <ShippingCheck />) }]} />,
      use: ["En la ficha de producto, antes de agregar al carrito."],
      avoid: ["Como validación definitiva de entrega: la regla real vive en el checkout."],
      a11y: ["El input tiene aria-label y autoComplete=\"postal-code\".", <>El resultado usa <code>role=&quot;status&quot;</code>.</>],
    }),
}

