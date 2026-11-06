import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { NavItem } from "@/lib/nav"
import type { Prop } from "@/lib/pieces"

export function PageHeader({ title, description, children }: { title: string; description?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-8 space-y-2">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {description && <p className="max-w-2xl text-muted-foreground">{description}</p>}
      {children}
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

/** Grilla de cards de una sección (índice de Foundations, Componentes o Patrones). */
export function SectionIndex({ base, items }: { base: string; items: NavItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((i) => (
        <Link key={i.slug} href={`${base}/${i.slug}`}>
          <Card className="h-full transition-colors hover:bg-muted/50">
            <CardHeader>
              <CardTitle>{i.title}</CardTitle>
              <CardDescription>{i.description}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
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
