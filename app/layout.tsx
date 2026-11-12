import type { CSSProperties } from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "ds-docs-theme/docs/site-header"
import { Toaster } from "ds-docs-theme/ui/sonner"
import { TooltipProvider } from "ds-docs-theme/ui/tooltip"
import { searchIndex } from "@/lib/search-index"
import { topNav } from "@/lib/nav"
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

/** Marca del sitio: el theme dibuja el header, el proyecto pone su logo y nombre. */
const siteBrand = { name: "Ketea", tagline: "Design System", logo: { src: "/logo-ketea.svg", width: 106, height: 28 } }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{ "--brand": brand, "--success": success, "--danger": danger, "--doc-stage": "#ffffff", "--doc-font-sans": "var(--font-geist-sans)", "--doc-font-mono": "var(--font-geist-mono)" } as CSSProperties}
    >
      <body className="min-h-full">
        <TooltipProvider>
          <SiteHeader entries={searchIndex()} brand={siteBrand} topNav={topNav} />
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  )
}
