import type { NextConfig } from "next"

/**
 * Los componentes reales de la tienda (ketea-tienda-spike) se copian a ./shop antes de compilar (scripts/fetch-shop.mjs) y se importan como @shop/*.
 * lucide, clsx y sonner se fuerzan a resolver desde este proyecto para no duplicarlos. El CSS de la tienda (Tailwind 3) se compila aparte
 * a public/shop.css y se carga solo dentro de los shadow roots.
 */

const nextConfig: NextConfig = {
  // El código de la tienda (solo lectura) trae sus propios @types/react 18: algunos tipos chocan con React 19.
  // En runtime no afecta; el chequeo de tipos del build se desactiva hasta que la tienda suba a React 19.
  typescript: { ignoreBuildErrors: true },
  transpilePackages: ["ds-docs-theme", "@ketea/tokens"],
  images: { unoptimized: true },
  turbopack: {
    resolveAlias: {
      "lucide-react": "./node_modules/lucide-react",
      clsx: "./node_modules/clsx",
      sonner: "./node_modules/sonner",
    },
    rules: { "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" } },
  },
}

export default nextConfig
