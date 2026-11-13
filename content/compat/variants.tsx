import type { ReactNode } from "react"

export type VariantItem = { value: string; label: string; caption: ReactNode; node: ReactNode; dark?: boolean }
export type VariantsProps = { title: string; description?: ReactNode; items: VariantItem[]; ariaLabel: string }

/** Marcador: el extractor lee sus props y arma un grupo de vistas del theme. No se dibuja. */
export default function Variants(_props: VariantsProps) {
  return null
}
