import type { NavItem } from "ds-docs-theme/types"

/** Piezas propias de la documentación (las que se muestran en vivo desde la tienda están en lib/sb-patterns.ts). */
export const ownComponents: NavItem[] = [
  { slug: "accordion", title: "Accordion", description: "Expande y contrae secciones de contenido." },
  { slug: "badge", title: "Badge", description: "Etiquetas de descuento y contador." },
  { slug: "breadcrumb", title: "Breadcrumb", description: "Ubica al usuario en la jerarquía del sitio." },
  { slug: "button", title: "Button", description: "Jerarquías, tamaños y estados completos." },
  { slug: "card", title: "Card", description: "Superficie para agrupar contenido." },
  { slug: "form-parts", title: "Form parts", description: "Encabezado, separador y nota de formulario." },
  { slug: "icon-badge", title: "Icon badge", description: "Ícono dentro de un círculo o tile." },
  { slug: "icon-button", title: "Icon button", description: "Botón solo con ícono, siempre redondo." },
  { slug: "input", title: "Input", description: "Campos de formulario, Field y Select." },
  { slug: "link", title: "Link", description: "Navegación con peso de texto." },
  { slug: "price", title: "Price", description: "Precio con descuento." },
  { slug: "skeleton", title: "Skeleton", description: "Bloques de carga que anticipan el layout." },
  { slug: "stepper", title: "Stepper", description: "Control de cantidad." },
  { slug: "tabs", title: "Tabs", description: "Alterna vistas dentro del mismo contexto." },
]


export const ownPatterns: NavItem[] = [
  { slug: "checkout-cta", title: "Checkout CTA", description: "Botón para finalizar la compra.", cat: "Carrito" },
  { slug: "coupon-field", title: "Coupon field", description: "Código de descuento.", cat: "Carrito" },
  { slug: "drawer", title: "Drawer", description: "Panel lateral derecho.", cat: "Overlays" },
  { slug: "empty-state", title: "Empty state", description: "Cuando no hay contenido para mostrar.", cat: "Inicio y contenido" },
  { slug: "feature-row", title: "Feature row", description: "Ícono, título y texto.", cat: "Inicio y contenido" },
  { slug: "info-panel", title: "Info panel", description: "Panel informativo con título y texto.", cat: "Inicio y contenido" },
  { slug: "modal", title: "Modal", description: "Diálogo sobre un fondo atenuado.", cat: "Overlays" },
  { slug: "page-header", title: "Page header", description: "Etiqueta, título y bajada de página.", cat: "Inicio y contenido" },
  { slug: "section-header", title: "Section header", description: "Título de sección con link Ver todo.", cat: "Inicio y contenido" },
  { slug: "step-indicator", title: "Step indicator", description: "Pasos del checkout.", cat: "Checkout" },
]
