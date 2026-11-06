import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AppSidebar } from "@/components/docs/app-sidebar"
import { SearchDialog } from "@/components/docs/search-dialog"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { searchIndex } from "@/lib/search-index"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ketea Design System",
  description: "Documentación del sistema de diseño de Ketea: tokens, componentes y patrones.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full">
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
                <SidebarTrigger />
                <div className="ml-auto">
                  <SearchDialog entries={searchIndex()} />
                </div>
              </header>
              <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-8">{children}</main>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  )
}
