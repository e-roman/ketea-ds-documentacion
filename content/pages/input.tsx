import { sizeLabel } from "@/lib/labels"
import { Section } from "@/content/compat/component-page"
import { Anatomy, Callout, DoDont, Panel, Purpose, Table, WhenToUse } from "@/content/compat/blocks"
import { Ratio, TokenTable, ratio, val } from "@/content/compat/token-ui"
import Variants from "@/content/compat/variants"
import { Field } from "@shop/components/ui/field"
import { Input, Select } from "@shop/components/ui/input"


export function inputPanels() {
  const design = (
    <>
      <Purpose
        items={[
          { title: "Recibir datos", text: "Campos de texto para formularios (dirección, contacto, cupón) y búsqueda." },
          { title: "Dos formas", text: "Form para formularios y pill para búsqueda y newsletter, siempre con la misma altura." },
          { title: "Mostrar el estado", text: "Foco, error, validado y deshabilitado se entienden sin depender solo del color." },
        ]}
      />
      <Anatomy
        parts={[
          { n: 1, selector: ".field__label", only: ["texto", "tipografia"] },
          { n: 2, selector: ".input" },
          { n: 3, selector: ".field__hint", only: ["texto", "tipografia"] },
          { n: 4, selector: ".input", only: ["texto", "tipografia"] },
        ]}
        markers={[{ n: 1, side: "top", pct: 10 }, { n: 2, side: "left", pct: 62 }, { n: 3, side: "bottom", pct: 14 }, { n: 4, side: "right", pct: 62 }]}
        legend={[
          { n: 1, label: "Label", note: "con nota opcional" },
          { n: 2, label: "Contenedor del campo" },
          { n: 3, label: "Texto de ayuda o error" },
          { n: 4, label: "Valor o placeholder" },
        ]}
      >
        <div className="demo-w-300">
          <Field label="Código postal" note="opcional" hint="Para calcular el envío.">
            <Input placeholder="Ej: 1425" />
          </Field>
        </div>
      </Anatomy>

      <Section title="Configuración">
        <Variants
          title="Variante"
          ariaLabel="Variante del input"
          description={<>La prop <code>variant</code> define radio y color de borde. Ambas miden {val("input-form-height")} de alto.</>}
          items={[
            { value: "form", label: "Form", caption: "Formularios: radio de 8 px.", node: <div className="demo-w-300"><Input placeholder="Nombre y apellido" aria-label="Nombre" /></div> },
            { value: "pill", label: "Pill", caption: "Búsqueda y newsletter: totalmente redondeado.", node: <div className="demo-w-300"><Input variant="pill" placeholder="Buscar productos" aria-label="Buscar" /></div> },
          ]}
        />
        <Variants
          title="Estado"
          ariaLabel="Estado del input"
          description="El foco recolorea el borde a neutral.900 con 2 px de grosor (inset, sin mover el layout). El rojo queda solo para el error."
          items={[
            { value: "default", label: "Default", caption: "Probá el foco con Tab o click.", node: <div className="demo-w-300"><Field label="Dirección"><Input placeholder="Calle y número" /></Field></div> },
            { value: "filled", label: "Con valor", caption: "El valor usa color.form.text, distinto del placeholder.", node: <div className="demo-w-300"><Field label="Dirección"><Input defaultValue="Av. Corrientes 1234" /></Field></div> },
            { value: "error", label: "Error", caption: "aria-invalid + mensaje con role=alert. No depende solo del color.", node: <div className="demo-w-300"><Field label="Email" error="Ingresá un email válido."><Input defaultValue="juan@" aria-invalid="true" /></Field></div> },
            { value: "valid", label: "Validado", caption: "data-valid=\"true\" pinta el borde de éxito (por ejemplo un CP con cobertura).", node: <div className="demo-w-300"><Field label="Código postal"><Input defaultValue="1425" data-valid="true" /></Field></div> },
            { value: "disabled", label: "Disabled", caption: "Fondo y texto atenuados. No recibe foco.", node: <div className="demo-w-300"><Field label="Email"><Input defaultValue="juan@mail.com" disabled /></Field></div> },
          ]}
        />
        <Variants
          title="Field"
          ariaLabel="Variantes del field"
          description={<><code>Field</code> envuelve el control en un <code>&lt;label&gt;</code>: no hace falta <code>id</code> ni <code>htmlFor</code>.</>}
          items={[
            { value: "label", label: "Solo label", caption: "Label con tipografía label (14/500).", node: <div className="demo-w-300"><Field label="Nombre"><Input /></Field></div> },
            { value: "note", label: "Con nota", caption: "La nota va entre paréntesis y con el mismo peso que el label.", node: <div className="demo-w-300"><Field label="Departamento" note="opcional"><Input /></Field></div> },
            { value: "hint", label: "Con ayuda", caption: "Texto de apoyo debajo, en color helper.", node: <div className="demo-w-300"><Field label="Teléfono" hint="Solo para coordinar la entrega."><Input /></Field></div> },
          ]}
        />
        <Variants
          title="Select"
          ariaLabel="Tamaño del select"
          description={<>El <code>Select</code> comparte estilos con el input. La prop <code>size</code> es <code>md</code> (barras de herramientas) o <code>lg</code> (formularios, por defecto).</>}
          items={(["lg", "md"] as const).map((s) => ({
            value: s, label: sizeLabel(s), caption: `${val(`select-size-${s}-height`)} de alto.`,
            node: <div className="demo-w-300"><Field label="Ordenar por"><Select size={s}><option>Más vendidos</option><option>Menor precio</option><option>Mayor precio</option></Select></Field></div>,
          }))}
        />
      </Section>

      <Section title="Tokens">
        <p className="muted">Se leen en vivo de <code>@ketea/tokens</code>.</p>
        <TokenTable prefix="input-" />
        <h3 className="doc-h3">Tokens de formulario (color)</h3>
        <TokenTable prefix="color-form-" exclude={/control|-on/} />
      </Section>
    </>
  )

  const usage = (
    <>
      <WhenToUse
        use={["Para capturar texto corto: nombre, dirección, cupón.", "Variante pill para búsqueda y newsletter.", "Siempre con label visible."]}
        avoid={[<>Para elegir entre pocas opciones: usá <b>Select</b> o radios.</>, "Con el placeholder como único label: desaparece al escribir."]}
      />
      <DoDont
        items={[
          { ok: true, title: "Label visible arriba", text: "Siempre se lee, incluso con el campo lleno.", preview: <div className="demo-w-300"><Field label="Nombre"><Input placeholder="Ej: María" /></Field></div> },
          { ok: false, title: "No uses solo el placeholder", text: "Al escribir se pierde qué pide el campo.", preview: <div className="demo-w-300"><Input placeholder="Nombre" aria-label="Nombre" /></div> },
          { ok: true, title: "Error claro y accionable", text: "Dice qué pasó y cómo resolverlo.", preview: <div className="demo-w-300"><Field label="Email" error="Ingresá un email válido."><Input defaultValue="juan@" aria-invalid="true" /></Field></div> },
          { ok: false, title: "No marques el error solo con el borde", text: "Quien no distingue el rojo no se entera.", preview: <div className="demo-w-300"><Field label="Email"><Input defaultValue="juan@" aria-invalid="true" /></Field></div> },
        ]}
      />
    </>
  )

  const accessibility = (
    <>
      <Section title="Rol y estructura">
        <ul className="bul">
          <li><code>Field</code> asocia label y control envolviéndolos en un <code>&lt;label&gt;</code>.</li>
          <li>Error: <code>aria-invalid=&quot;true&quot;</code> en el campo y mensaje con <code>role=&quot;alert&quot;</code>.</li>
          <li>Si el input no tiene <code>Field</code> (por ejemplo búsqueda), requiere <code>aria-label</code>.</li>
          <li>Usá el <code>type</code> y el <code>autoComplete</code> correctos del campo.</li>
        </ul>
      </Section>
      <Section title="Teclado">
        <Table head={["Tecla", "Acción"]} rows={[[<><kbd>Tab</kbd> / <kbd>Shift+Tab</kbd></>, "Mueve el foco entre campos."]]} />
      </Section>
      <Section title="Contraste">
        <Table
          head={["Elemento", "Colores", "Relación"]}
          rows={[
            ["Borde del campo", "color-form-border sobre color-form-bg", <Ratio key="a" r={ratio(val("color-form-border"), val("color-form-bg"))} min={3} />],
            ["Borde en foco", "color-form-border-focus sobre color-form-bg", <Ratio key="b" r={ratio(val("color-form-border-focus"), val("color-form-bg"))} min={3} />],
            ["Placeholder", "color-form-placeholder sobre color-form-bg", <Ratio key="c" r={ratio(val("color-form-placeholder"), val("color-form-bg"))} />],
            ["Valor ingresado", "color-form-text sobre color-form-bg", <Ratio key="d" r={ratio(val("color-form-text"), val("color-form-bg"))} />],
            ["Texto de ayuda", "color-form-helper sobre color-form-bg", <Ratio key="e" r={ratio(val("color-form-helper"), val("color-form-bg"))} />],
          ]}
        />
        <p className="muted">Texto: 4.5:1 (WCAG 1.4.3). Bordes de controles: 3:1 (WCAG 1.4.11).</p>
      </Section>
      <Section title="Foco y tamaño del target">
        <Panel caption="Foco: borde neutral.900 de 2 px, sin outline externo. La altura es de 44 px, el mínimo táctil.">
          <div className="demo-w-300"><Input defaultValue="Campo con foco" aria-label="Ejemplo" className="is-focus" /></div>
        </Panel>
        <Callout>El Select de tamaño <b>md</b> mide 40 px: úsalo solo en barras de herramientas de desktop.</Callout>
      </Section>
    </>
  )

  const updates = (
    <Section title="Historial">
      <Table
        head={["Versión de tokens", "Cambio"]}
        rows={[
          ["4.0.0", <><code key="a">color.form.border-focus</code> pasa a neutral.900 y <code key="b">border-width.focus</code> de 1 a 2 px. Foco y error ya no comparten rojo.</>],
          ["3.0.0", <>Nuevos <code key="a">select.*</code> (campo, menú y opciones) y <code key="b">select.size.md|lg</code>.</>],
          ["1.1.0", <><code key="a">input.form</code> e <code key="b">input.pill</code> reemplazan al grupo único <code key="c">input.*</code>.</>],
        ]}
      />
    </Section>
  )

  return { design, usage, accessibility, updates }
}
