import type { CSSProperties } from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/docs/site-header"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { searchIndex } from "@/lib/search-index"
import { allTokens } from "@/lib/tokens"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ketea Design System",
  description: "Documentación del sistema de diseño de Ketea: tokens, componentes y patrones.",
}

/** Azul de marca: sale del paquete de tokens, no se escribe a mano. */
const brand = allTokens().find((t) => t.name === "color-brand-default")?.resolved ?? "#385dbe"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} style={{ "--brand": brand } as CSSProperties}>
      <body className="min-h-full">
        <TooltipProvider>
          <SiteHeader entries={searchIndex()} />
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  )
}
