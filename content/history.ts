export type HistoryEntry = {
  /** AAAA-MM-DD */
  date: string
  /** Qué cambió. Lo que va entre `backticks` se muestra como código. */
  text: string
}

/**
 * Historial propio de cada componente o patrón (pestaña «Novedades»), para cambios que no son de tokens:
 * variantes nuevas, cambios de props, correcciones de CSS, etc. Se muestra ARRIBA del historial de tokens.
 *
 * Cómo agregar una entrada: sumá una línea a la lista del slug de la página (el de la URL), la más nueva primero.
 *
 *   button: [
 *     { date: "2026-12-01", text: "Nueva variante `ghost`." },
 *   ],
 */
export const history: Record<string, HistoryEntry[]> = {
  "product-tabs": [
    { date: "2026-11-13", text: "Nueva pestaña «Recursos y descargas»: solo aparece si el producto tiene archivos." },
  ],
  "quick-view": [
    { date: "2026-11-13", text: "El pie con la cantidad y «Agregar al carrito» queda siempre visible." },
  ],
  "product-detail": [
    { date: "2026-11-13", text: "En mobile, el buy box suma una barra fija abajo con el precio, las cuotas y los botones Agregar y Comprar." },
  ],
  "support-chat": [
    { date: "2026-11-13", text: "Nuevo botón flotante de ayuda por WhatsApp, replicado de la tienda actual de Ketea." },
  ],
}
