/**
 * Dónde está el paquete de vistas de la tienda (mount.js, style.css, fonts.css).
 * Por defecto va dentro del Storybook publicado (`/sb` es el rewrite hacia él, mismo origen). Para probar uno local:
 * NEXT_PUBLIC_KETEA_PREVIEW=/ketea-preview y copiar `dist-preview` de la tienda a `public/ketea-preview`.
 */
export const KETEA_PREVIEW = process.env.NEXT_PUBLIC_KETEA_PREVIEW ?? "/sb/preview"
