"use client"
import NextLink from "next/dist/client/app-dir/link"
import type { ComponentProps } from "react"

/** Link de Next sin precarga: los links de la tienda apuntan a rutas que no existen en la documentación (evita 404 en consola). */
export default function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink {...props} prefetch={false} />
}
