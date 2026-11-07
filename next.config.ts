import type { NextConfig } from "next";

/** Storybook publicado. Se sirve bajo `/sb` en el mismo dominio para que la documentación pueda inspeccionar las stories embebidas. */
const SB_ORIGIN = process.env.SB_ORIGIN ?? "https://ketea-storybook.vercel.app"

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/sb/:path*", destination: `${SB_ORIGIN}/:path*` },
      // las stories piden las imágenes de la tienda con rutas desde la raíz (`/assets/img/...`)
      { source: "/assets/:path*", destination: `${SB_ORIGIN}/assets/:path*` },
    ]
  },
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
