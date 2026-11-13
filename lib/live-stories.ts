/**
 * Qué vistas de cada patrón se renderizan en vivo (componente real de la tienda, inspeccionable).
 * El orden coincide con `shots` en lib/sb-patterns.ts; las implementaciones están en content/live.tsx.
 */
const live = (n: number) => Array<boolean>(n).fill(true)

export const LIVE: Record<string, boolean[]> = {
  nav: live(5),
  footer: live(1),
  notifications: live(1),
  "support-chat": live(1),
  hero: live(1),
  "promo-banner": live(3),
  "service-blocks": live(1),
  "brands-strip": live(1),
  "product-card": live(4),
  "quick-view": live(1),
  "product-detail": live(3),
  "product-tabs": live(2),
  "filter-sidebar": live(2),
  "cart-item": live(2),
  "cart-drawer": live(3),
  "order-summary": live(1),
  "delivery-options": live(2),
  "personal-form": live(2),
  "shipping-form": live(2),
  "payment-methods": live(1),
  "order-review": live(2),
  "order-confirmation": live(1),
  "order-list": live(2),
  "account-access": live(2),
  checkbox: live(2),
  switch: live(2),
  "radio-card": live(1),
  "form-input": live(4),
  logo: live(3),
  text: live(2),
}
