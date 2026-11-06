"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { sections, type NavItem } from "@/lib/nav"

/** Menú lateral unificado: Empezar y las tres secciones del sistema. */
export function AppSidebar() {
  const path = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-4">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-base font-semibold">Ketea</span>
          <span className="text-xs text-muted-foreground">Design System</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={path === "/get-started"} render={<Link href="/get-started" />}>
                  Empezar
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {sections.map((s) => (
          <SidebarGroup key={s.key}>
            <SidebarGroupLabel render={<Link href={s.base} />}>{s.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {s.items.map((item: NavItem, i: number) => {
                  const href = `${s.base}/${item.slug}`
                  const newCat = item.cat && item.cat !== s.items[i - 1]?.cat
                  return (
                    <SidebarMenuItem key={item.slug}>
                      {newCat && <p className="px-2 pb-1 pt-2 text-xs font-medium text-muted-foreground">{item.cat}</p>}
                      <SidebarMenuButton isActive={path === href} render={<Link href={href} />}>
                        {item.title}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
