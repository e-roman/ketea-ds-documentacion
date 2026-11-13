import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { CopyToken } from "ds-docs-theme/docs/copy-token"
import type { FoundationOptions, FoundationSection } from "ds-docs-theme/docs/foundation-views"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "ds-docs-theme/ui/table"
import IconSize from "@/content/icon-size"
import { iso } from "@/content/iso"
import { allTokens } from "@/lib/project"

/*
 * Páginas de foundations de Ketea. El theme dibuja las tablas; acá se define qué tokens y qué textos lleva cada sección.
 */

const code = "overflow-x-auto rounded-lg border bg-muted p-4 font-mono text-xs"
const link = "underline underline-offset-4"
const c = (s: string) => <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">{s}</code>

/** Escalones de spacing que no se muestran en la documentación. */
const HIDDEN_SPACE = ["space-0-5", "space-1-5", "space-2-5"]

const ICON_SIZES = [
  { cls: "icon-xs", use: "Junto a texto chico, como avisos y badges" },
  { cls: "icon-sm", use: "Dentro de botones y links" },
  { cls: "icon-md", use: "Tamaño base: listas, features, botones grandes" },
  { cls: "icon-lg", use: "Íconos de acción: cerrar, buscar, carrito" },
  { cls: "icon-xl", use: "Íconos de apoyo en cards" },
  { cls: "icon-2xl", use: "Íconos dentro de Icon badge" },
  { cls: "icon-3xl", use: "Estados vacíos y pantallas de confirmación" },
]
const ICON_COLORS = [
  { name: "color-icon-default", use: "Íconos de interfaz" },
  { name: "color-icon-subtle", use: "Íconos secundarios o deshabilitados" },
  { name: "color-icon-brand", use: "Íconos de marca y de énfasis" },
  { name: "color-icon-inverse", use: "Íconos sobre fondos oscuros o foto" },
]

function IconographyTables() {
  const tokens = allTokens()
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <p className="max-w-2xl text-sm">La tienda usa la librería <b>Lucide</b> (<code>lucide-react</code>): íconos de línea, de trazo uniforme y esquinas redondeadas, que combinan con Mulish. No hay íconos propios salvo el logotipo.</p>
      </div>
      <div className="space-y-3">
        <h3 className="text-base font-semibold">Tamaños</h3>
        <p className="max-w-2xl text-sm text-muted-foreground">Se eligen con una clase, nunca con utilidades de Tailwind ({c("w-")} / {c("h-")}). Cada tamaño sale de la escala de spacing.</p>
        <Table>
          <TableHeader><TableRow><TableHead className="w-28">Muestra</TableHead><TableHead>Clase</TableHead><TableHead>Tamaño</TableHead><TableHead>Dónde se usa</TableHead></TableRow></TableHeader>
          <TableBody>
            {ICON_SIZES.map((x) => (
              <TableRow key={x.cls}>
                <TableCell>{iso(<ShoppingCart className={x.cls} aria-hidden />)}</TableCell>
                <TableCell className="font-mono text-xs">{x.cls}</TableCell>
                <TableCell>{iso(<IconSize cls={x.cls} />)}</TableCell>
                <TableCell className="whitespace-normal! text-sm text-muted-foreground">{x.use}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="space-y-3">
        <h3 className="text-base font-semibold">Color</h3>
        <p className="max-w-2xl text-sm text-muted-foreground">Los íconos heredan el color del texto ({c("currentColor")}). Cuando necesitan uno propio, usan estos tokens:</p>
        <Table>
          <TableHeader><TableRow><TableHead className="w-28">Muestra</TableHead><TableHead>Token</TableHead><TableHead>Valor</TableHead><TableHead>Para qué</TableHead></TableRow></TableHeader>
          <TableBody>
            {ICON_COLORS.map((x) => (
              <TableRow key={x.name}>
                <TableCell>{iso(<span className={x.name === "color-icon-inverse" ? "swatch-icon swatch-icon--dark" : "swatch-icon"}><Heart className={`icon-md ${x.name}`} aria-hidden /></span>)}</TableCell>
                <TableCell><CopyToken name={x.name} /></TableCell>
                <TableCell className="font-mono text-xs">{tokens.find((t) => t.name === x.name)?.resolved}</TableCell>
                <TableCell className="whitespace-normal! text-sm text-muted-foreground">{x.use}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="space-y-3">
        <h3 className="text-base font-semibold">Reglas</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm">
          <li><b>Decorativo por defecto.</b> Un ícono que acompaña a un texto lleva {c("aria-hidden")}: el significado lo da el texto.</li>
          <li><b>Solo ícono, con nombre.</b> Si no hay texto, el botón necesita {c("aria-label")} (ver <Link className={link} href="/components/icon-button">Icon button</Link>).</li>
          <li><b>Un ícono, un significado.</b> Usá el mismo ícono para la misma acción en todo el sitio.</li>
          <li><b>No los uses solos para comunicar estado.</b> Sumá texto o color con contraste suficiente.</li>
          <li><b>Área táctil.</b> Un ícono clickeable tiene al menos 44 px de área, aunque se dibuje más chico.</li>
        </ul>
      </div>
      <div className="space-y-3">
        <h3 className="text-base font-semibold">Ejemplo</h3>
        <pre className={code}><code>{`import { ShoppingCart } from "lucide-react"

<Button><ShoppingCart className="icon-sm" aria-hidden />Agregar</Button>`}</code></pre>
      </div>
    </div>
  )
}

const tokensPage: FoundationSection[] = [
  {
    title: "Arquitectura en 3 capas",
    intro: "Los tokens van de lo general a lo específico. Cada capa solo lee de la anterior, así un cambio de marca se hace en un lugar y llega a todos los componentes.",
    content: (
      <div className="space-y-4">
        <Table>
          <TableHeader><TableRow><TableHead>Capa</TableHead><TableHead>Qué contiene</TableHead><TableHead>Quién la consume</TableHead></TableRow></TableHeader>
          <TableBody>
            <TableRow><TableCell><b>Primitive</b></TableCell><TableCell className="whitespace-normal!">Valores crudos: escalas de color 50–950, spacing, radios, tipografía</TableCell><TableCell className="whitespace-normal!">Solo la capa semántica</TableCell></TableRow>
            <TableRow><TableCell><b>Semantic</b></TableCell><TableCell className="whitespace-normal!">Intención: {c("text-secondary")}, {c("surface-subtle")}, {c("action-primary-bg")}</TableCell><TableCell className="whitespace-normal!">Componentes y layouts</TableCell></TableRow>
            <TableRow><TableCell><b>Component</b></TableCell><TableCell className="whitespace-normal!">Decisiones por componente: {c("button-primary-height")}</TableCell><TableCell className="whitespace-normal!">Un componente específico</TableCell></TableRow>
          </TableBody>
        </Table>
        <p className="text-sm text-muted-foreground">Un componente nunca usa un primitivo de color directo. Si falta un semántico, se crea.</p>
        <pre className={code}><code>{`--color-blue-brand-700: #385dbe;                          /* primitive */
--color-action-primary-bg: var(--color-brand-default);    /* semantic  */
--button-primary-bg: var(--color-action-primary-bg);      /* component */`}</code></pre>
      </div>
    ),
  },
  {
    title: "Nomenclatura",
    content: <p className="max-w-2xl text-sm">{c("{categoría}-{grupo}-{rol}-{estado}")} → {c("color-action-primary-bg-hover")}. Todo en kebab-case y minúsculas, sin prefijos repetidos.</p>,
  },
  { title: "Cómo usar", content: <p className="text-sm">La instalación está explicada en <Link className={link} href="/get-started">Empezar</Link>.</p> },
  { title: "Tokens por familia", intro: "Cuántas variables hay en cada familia.", families: true },
]

/** Páginas de foundations de Ketea, por slug. Color usa la vista del theme (con `semanticColorGroups`). */
export const foundationPages: Record<string, FoundationSection[]> = {
  tokens: tokensPage,
  typography: [
    { title: "Familia", intro: "Mulish para todo el sitio, en cuatro pesos.", prefixes: ["font-family-"], sample: "font-family" },
    { title: "Pesos", prefixes: ["font-weight-"], sample: "font-weight" },
    { title: "Estilos de texto", intro: "Combinan peso, tamaño, interlineado y familia. Usalos en lugar de armar cada valor a mano.", prefixes: ["typography-"], sample: "typography" },
    { title: "Escala de tamaños", intro: "Los tamaños base. Cada uno tiene su interlineado.", prefixes: ["font-size-"], sample: "font-size" },
    { title: "Interlineado", intro: "Alto de línea que acompaña a cada tamaño.", prefixes: ["font-line-"] },
  ],
  iconography: [{ title: "Qué es y cómo se usa", content: <IconographyTables /> }],
  spacing: [
    { title: "Escala", intro: "Base de 4 px. Se usa para padding, gap y márgenes.", prefixes: ["space-"], hide: HIDDEN_SPACE, sample: "space" },
    { title: "Tamaño de controles", intro: "Alto de botones, inputs y selects. El mínimo táctil es 44 px.", prefixes: ["size-control-"], sample: "space" },
    { title: "Contenedor y breakpoints", intro: "Ancho máximo del contenido y puntos donde cambia el layout.", prefixes: ["size-container", "breakpoint-"] },
  ],
  radius: [
    { title: "Escala", intro: <>Cuanto más grande el elemento, más grande el radio. Los botones usan {c("md")}; las cards, {c("lg")} o {c("xl")}; chips e íconos, {c("full")}.</>, prefixes: ["radius-"], sample: "radius" },
  ],
  elevation: [
    { title: "Elevación (semántico)", intro: "Usá estos en los componentes. Cada uno apunta a una sombra primitiva.", prefixes: ["elevation-"], sample: "shadow" },
    { title: "Sombras (primitivo)", intro: "Valores crudos. Solo los usa la capa semántica.", prefixes: ["shadow-"], sample: "shadow" },
  ],
  layer: [
    { title: "Orden de capas", intro: "De la capa más baja a la más alta. Usá siempre el token, nunca un z-index suelto: así un modal nunca queda detrás del header.", prefixes: ["layer-"] },
  ],
  motion: [
    { title: "Duración", intro: "Pasá el mouse por la barra para ver el tiempo real.", prefixes: ["duration-"], sample: "duration" },
    { title: "Easing", intro: "La curva con la que acelera y frena el movimiento.", prefixes: ["easing-"], sample: "easing" },
    { title: "Transiciones", intro: "Combinaciones de duración y easing para los casos más comunes.", prefixes: ["motion-"] },
  ],
  opacity: [
    { title: "Opacidad", intro: "Para estados deshabilitado, hover y el fondo atenuado de modales y drawers.", prefixes: ["opacity-"] },
  ],
  border: [
    { title: "Ancho", intro: "Del borde fino al de foco.", prefixes: ["border-width-"], sample: "border" },
    { title: "Color", intro: "Un color por función: separar, marcar un campo y enfocar.", prefixes: ["color-border-"], sample: "color" },
  ],
}

/** La tienda nombra sus colores semánticos `color-<grupo>-…` (el paquete de tokens los publica como `color-semantic-<grupo>-…`): el theme los muestra en tablas. */
export const foundationOptions: FoundationOptions = {
  pages: foundationPages,
  semanticColorGroups: ["surface", "text", "border", "icon", "brand", "action", "form", "feedback", "focus", "commerce"],
}
