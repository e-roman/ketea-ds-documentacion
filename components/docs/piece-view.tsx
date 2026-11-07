import { DoDont, PageHeader, PropsTable, Section, WhenToUse } from "@/components/docs/blocks"
import { DocTabs } from "@/components/docs/doc-tabs"
import { StoryFrame } from "@/components/docs/story-frame"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { contrast } from "@/lib/contrast"
import type { Piece } from "@/lib/pieces"
import { docsUrl, sourceUrl, storyUrl } from "@/lib/storybook"
import { token } from "@/lib/tokens"

/** Texto con `código` entre backticks. */
const fmt = (s: string) => s.split("`").map((p, i) => (i % 2 ? <code key={i} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">{p}</code> : p))

const Kbd = ({ children }: { children: string }) => <kbd className="rounded border border-b-2 bg-background px-1.5 py-0.5 font-mono text-xs font-semibold">{children}</kbd>

/** Relación de contraste de un par de tokens. Texto: 4.5:1 (WCAG AA). Íconos y gráficos: 3:1. */
function Ratio({ fg, bg, min = 4.5 }: { fg: string; bg: string; min?: number }) {
  const a = token(fg)?.resolved
  const b = token(bg)?.resolved
  const r = a && b ? contrast(a, b) : null
  if (r === null) return <span className="text-muted-foreground">—</span>
  const ok = r >= min
  return <span className={`font-semibold ${ok ? "text-success" : "text-danger"}`}>{r.toFixed(2)}:1 {ok ? "OK" : "No AA"}</span>
}

/** Página de un componente o patrón, con las pestañas Diseño, Uso, Accesibilidad e Historial. */
export function PieceView({ piece }: { piece: Piece }) {
  const hasA11y = Boolean(piece.a11y?.length || piece.keyboard?.length || piece.contrast?.length)
  return (
    <article>
      <PageHeader title={piece.title} description={piece.description} links={{ github: sourceUrl(piece.file), storybook: docsUrl(piece.docsId) }} />
      <DocTabs
        panels={{
          design: (
            <>
              <Section title="Variantes" intro="Cada vista es el componente real de la tienda, publicado en Storybook.">
                {piece.stories.length === 0 && (
                  <p className="text-sm text-muted-foreground">Este componente no dibuja nada en pantalla, así que no tiene vista previa. Podés probarlo en su story de Storybook.</p>
                )}
                <div className="space-y-6">
                  {piece.stories.map((s) => (
                    <figure key={s.id} className="space-y-2">
                      <figcaption><Badge variant="secondary">{s.label}</Badge></figcaption>
                      <StoryFrame title={`${piece.title} · ${s.label}`} src={storyUrl(s.id)} fallbackHeight={piece.previewHeight ?? 200} width={s.width} className="rounded-lg border bg-white" />
                    </figure>
                  ))}
                </div>
              </Section>
              <Section title="Props"><PropsTable props={piece.props} /></Section>
            </>
          ),
          usage: (
            <>
              <Section title="Cuándo usarlo y cuándo evitarlo">
                <WhenToUse use={piece.use} avoid={piece.avoid} />
              </Section>
              {piece.practices && piece.practices.length > 0 && (
                <Section title="Buenas prácticas">
                  <DoDont items={piece.practices.map((p) => ({ ok: p.ok, title: p.title, text: p.text, src: storyUrl(p.storyId) }))} />
                </Section>
              )}
            </>
          ),
          accessibility: hasA11y ? (
            <>
              {piece.a11y?.length ? (
                <Section title="Rol y estructura" intro="Lo que ya resuelve el componente, verificado en su código.">
                  <ul className="list-disc space-y-2 pl-5 text-sm">{piece.a11y.map((t) => <li key={t}>{fmt(t)}</li>)}</ul>
                </Section>
              ) : null}
              {piece.keyboard?.length ? (
                <Section title="Teclado">
                  <Table>
                    <TableHeader><TableRow><TableHead className="w-56">Tecla</TableHead><TableHead>Acción</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {piece.keyboard.map((k) => (
                        <TableRow key={k.keys.join("")}>
                          <TableCell>
                            <span className="flex flex-wrap items-center gap-1.5">
                              {k.keys.map((key, i) => (
                                <span key={key} className="flex items-center gap-1.5">{i > 0 && <span className="text-muted-foreground">/</span>}<Kbd>{key}</Kbd></span>
                              ))}
                            </span>
                          </TableCell>
                          <TableCell className="whitespace-normal text-sm">{k.action}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Section>
              ) : null}
              {piece.contrast?.length ? (
                <Section title="Contraste">
                  <Table>
                    <TableHeader><TableRow><TableHead>Elemento</TableHead><TableHead>Colores</TableHead><TableHead className="w-40">Relación</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {piece.contrast.map((c) => (
                        <TableRow key={c.element}>
                          <TableCell className="whitespace-normal text-sm">{c.element}</TableCell>
                          <TableCell className="whitespace-normal font-mono text-xs text-muted-foreground">{c.fg} sobre {c.bg}</TableCell>
                          <TableCell className="text-sm"><Ratio fg={c.fg} bg={c.bg} min={c.min} /></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <p className="text-sm text-muted-foreground">Texto: 4.5:1 (WCAG 1.4.3). Los íconos son componentes gráficos: mínimo 3:1 (WCAG 1.4.11). Los pares salen de los tokens que aplica el CSS de la tienda.</p>
                </Section>
              ) : null}
            </>
          ) : undefined,
          updates: piece.history?.length ? (
            <Section title="Cambios del componente">
              <Table>
                <TableHeader>
                  <TableRow><TableHead className="w-32">Fecha</TableHead><TableHead>Cambio</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {[...piece.history].sort((a, b) => b.date.localeCompare(a.date)).map((h) => (
                    <TableRow key={h.date + h.text}>
                      <TableCell className="align-top font-mono text-xs">{h.date}</TableCell>
                      <TableCell className="whitespace-normal text-sm">{fmt(h.text)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Section>
          ) : undefined,
        }}
      />
    </article>
  )
}
