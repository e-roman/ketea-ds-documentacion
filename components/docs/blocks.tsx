import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { NavItem } from "@/lib/nav"
import type { Prop } from "@/lib/pieces"
import { FIGMA, SB } from "@/lib/storybook"

/** Ancho y márgenes de las páginas sin menú lateral (Empezar y los índices de sección). */
export function PageContainer({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-8">{children}</main>
}

/** Links externos bajo el título: GitHub, Storybook y Figma. */
export function DocLinks({ github, storybook = SB }: { github: string; storybook?: string }) {
  const links = [
    { label: "GitHub", href: github, icon: "/github.svg" },
    { label: "Storybook", href: storybook, icon: "/storybook.svg" },
    { label: "Figma", href: FIGMA, icon: "/figma.svg" },
  ]
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-2 text-sm" aria-label="Enlaces externos">
      {links.map((l) => (
        <li key={l.label}>
          <a className="inline-flex items-center gap-2 font-medium hover:text-brand" href={l.href} target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={l.icon} alt="" width={16} height={16} className="size-4" />
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export function PageHeader({ title, description, links }: { title: string; description?: string; links?: { github: string; storybook?: string } }) {
  return (
    <div className="mb-8 space-y-2">
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      {description && <p className="max-w-2xl text-lg text-muted-foreground">{description}</p>}
      {links && <DocLinks {...links} />}
    </div>
  )
}

export function Section({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section className="mb-10 space-y-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      {intro && <p className="max-w-2xl text-sm text-muted-foreground">{intro}</p>}
      {children}
    </section>
  )
}

/** Carátula de una sección: título, bajada y una card con ilustración por cada página. */
export function SectionIndex({ title, intro, base, group, items }: { title: string; intro: string; base: string; group: string; items: NavItem[] }) {
  return (
    <PageContainer>
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{intro}</p>
      <ul className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i, n) => (
          <li key={i.slug} className="contents">
            {i.cat && i.cat !== items[n - 1]?.cat && <h2 className="col-span-full text-xl font-semibold">{i.cat}</h2>}
            <Link href={`${base}/${i.slug}`} className="group block rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
              <div aria-hidden className="grid aspect-[7/5] place-items-center rounded-2xl bg-muted transition-colors group-hover:bg-muted/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/illustrations/${group}/${i.slug}.svg`} alt="" width={120} height={120} className="size-28" />
              </div>
              <span className="mt-3 flex items-center justify-between text-sm font-semibold">
                {i.title}
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">{i.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </PageContainer>
  )
}

export function PropsTable({ props }: { props: Prop[] }) {
  if (props.length === 0) return <p className="text-sm text-muted-foreground">Este componente no recibe props.</p>
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Prop</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Descripción</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.map(([name, type, desc, required]) => (
          <TableRow key={name}>
            <TableCell className="font-mono text-xs">
              {name}
              {required && <Badge variant="secondary" className="ml-2">requerida</Badge>}
            </TableCell>
            <TableCell className="font-mono text-xs text-muted-foreground">{type}</TableCell>
            <TableCell className="whitespace-normal text-sm">{desc}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
