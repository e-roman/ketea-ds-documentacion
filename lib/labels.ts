/** Nombres completos para los tabs de tamaño (nunca sm / md / lg / xl). */
const SIZES: Record<string, string> = {
  xs: "Extra small", sm: "Small", md: "Medium", lg: "Large", xl: "Extra large", xxl: "2X large", none: "None",
}

export const sizeLabel = (v: string) => SIZES[v] ?? v.charAt(0).toUpperCase() + v.slice(1)
