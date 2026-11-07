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

/** Colores de la documentación que salen del paquete de tokens, no se escriben a mano. */
const tokenValue = (name: string, fallback: string) => allTokens().find((t) => t.name === name)?.resolved ?? fallback
const brand = tokenValue("color-brand-default", "#385dbe")
const success = tokenValue("color-semantic-feedback-success-text", "#15803d")
const danger = tokenValue("color-semantic-feedback-error-border", "#ef4444")

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} style={{ "--brand": brand, "--success": success, "--danger": danger } as CSSProperties}>
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
