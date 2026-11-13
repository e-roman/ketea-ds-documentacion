import { sizeLabel } from "@/lib/labels"
import { Section } from "@/content/compat/component-page"
import { Anatomy, Callout, DoDont, Panel, Purpose, Table, WhenToUse } from "@/content/compat/blocks"
import { AddToCartSwap, StepperLive, StepperStatic } from "@/content/compat/demos"
import { Ratio, TokenTable, ratio, val } from "@/content/compat/token-ui"
import Variants from "@/content/compat/variants"
import { Button } from "@shop/components/ui/button"

const SIZES = [
  { s: "sm", where: "Carrito y drawer", token: "stepper-height-sm" },
  { s: "md", where: "Card de producto", token: "stepper-height" },
  { s: "lg", where: "Página de producto", token: "stepper-height-lg" },
] as const

export function stepperPanels() {
  const design = (
    <>
      <Purpose
        items={[
          { title: "Controlar la cantidad", text: "Suma o quita unidades de un producto sin salir de la pantalla." },
          { title: "Reemplazar a Agregar", text: "Ocupa el mismo slot que el botón Add to cart: comparten forma y altura, así el layout no salta." },
          { title: "Dar feedback claro", text: "Anuncia el valor, bloquea las acciones mientras se actualiza el carrito y respeta mínimos y máximos." },
        ]}
      />
      <Anatomy
        parts={[
          { n: 1, selector: ".stepper" },
          { n: 2, selector: ".stepper__btn:first-child", only: ["texto", "fondo", "padding", "alto", "ancho"] },
          { n: 3, selector: ".stepper__value", only: ["texto", "tipografia", "ancho"] },
          { n: 4, selector: ".stepper__btn:last-child", only: ["texto", "fondo", "padding", "alto", "ancho"] },
        ]}
        markers={[{ n: 1, side: "top", pct: 50 }, { n: 2, side: "left", pct: 50 }, { n: 3, side: "bottom", pct: 50 }, { n: 4, side: "right", pct: 50 }]}
        legend={[
          { n: 1, label: "Contenedor con borde" },
          { n: 2, label: "Botón decrementar", note: "ícono −" },
          { n: 3, label: "Valor de cantidad" },
          { n: 4, label: "Botón incrementar", note: "ícono +" },
        ]}
      >
        <div className="demo-w-180"><StepperStatic value={2} size="lg" /></div>
      </Anatomy>

      <Section title="Configuración">
        <Variants
          title="Tamaño"
          ariaLabel="Tamaño del stepper"
          description={<>La prop <code>size</code> define la altura. En card hereda altura y radio del botón Agregar; en carrito y página de producto usa la suya. El área táctil es de 44 px en los tres. Probalo: es interactivo.</>}
          items={SIZES.map((x) => ({
            value: x.s, label: sizeLabel(x.s), caption: `${val(x.token)} · ${x.where}.`,
            node: <StepperLive size={x.s} />,
          }))}
        />
        <Variants
          title="Estado"
          ariaLabel="Estado del stepper"
          description="Hover y foco los resuelve CSS. Mínimo, máximo y loading dependen de las props."
          items={[
            { value: "default", label: "Default", caption: "Probá hover y foco con Tab sobre − y +.", node: <div className="demo-w-160"><StepperStatic value={3} /></div> },
            { value: "min", label: "Mínimo (1)", caption: "− sigue activo: llevar la cantidad a 0 quita el producto del carrito.", node: <div className="demo-w-160"><StepperStatic value={1} /></div> },
            { value: "max", label: "Máximo (stock)", caption: "+ queda deshabilitado cuando se alcanza el máximo (prop max).", node: <div className="demo-w-160"><StepperStatic value={6} max={6} /></div> },
            { value: "loading", label: "Loading", caption: "Spinner en el botón que se presionó; −/+ bloqueados mientras se actualiza el carrito.", node: <div className="demo-w-160"><StepperStatic value={3} loading="inc" /></div> },
          ]}
        />
        <Variants
          title="Reemplazo de Add to cart"
          ariaLabel="Add to cart y Stepper"
          description="El cambio entre botón y stepper es un cambio de estado del mismo control, no dos componentes distintos."
          items={[
            { value: "swap", label: "Interactivo", caption: "Agregá un producto y llevá la cantidad a 0 con − para volver al botón.", node: <AddToCartSwap /> },
          ]}
        />
      </Section>

      <Section title="Tokens">
        <p className="muted">Se leen en vivo de <code>@ketea/tokens</code>. <code>stepper-radius</code> y <code>stepper-height</code> referencian los del botón: si cambia el botón, el stepper lo sigue.</p>
        <TokenTable prefix="stepper-" />
      </Section>
    </>
  )

  const usage = (
    <>
      <WhenToUse
        use={["Para cambiar la cantidad de un producto que ya está en el carrito.", "En card, ficha de producto, carrito y drawer."]}
        avoid={[<>Para agregar por primera vez: eso es el botón <b>Add to cart</b>.</>, "Para cantidades libres o muy altas: este control suma de a uno."]}
      />
      <Section title="Un control, tres tamaños">
        <Table
          head={["Tamaño", "Token", "Altura", "Dónde"]}
          rows={SIZES.map((x) => [<b key="s">{x.s}</b>, <code key="t">--{x.token}</code>, val(x.token), x.where])}
        />
        <Callout>En la card, el Stepper hereda altura y radio del botón Agregar por referencia. En el carrito esa regla no aplica: a 40 px quedaba demasiado grande dentro de una fila, por eso usa <b>sm</b> (32 px). En la página de producto es la acción principal y sube a <b>lg</b> (44 px).</Callout>
      </Section>
      <DoDont
        items={[
          { ok: true, title: "Mismo ancho que el botón Agregar", text: "Ocupa todo el ancho de la card, igual que Add to cart.", preview: <div className="demo-w-200"><StepperStatic value={2} /></div> },
          { ok: false, title: "No lo uses angosto en una card", text: "El slot cambia de ancho al agregar y el layout salta.", preview: <div className="demo-w-96"><StepperStatic value={2} /></div> },
          { ok: true, title: "Un solo control por slot", text: "Botón o Stepper, nunca los dos a la vez.", preview: <div className="demo-w-200"><StepperStatic value={2} /></div> },
          { ok: false, title: "No muestres los dos juntos", text: "Duplica la acción y confunde.", preview: <div className="demo-w-200 demo-stack-8"><Button variant="add-to-cart">Agregar</Button><StepperStatic value={2} /></div> },
        ]}
      />
    </>
  )

  const accessibility = (
    <>
      <Section title="Rol y estructura">
        <ul className="bul">
          <li>El contenedor es <code>role=&quot;group&quot;</code> con <code>aria-label=&quot;Cantidad de {"{producto}"}&quot;</code> (prop <code>label</code>).</li>
          <li>Los botones tienen <code>aria-label</code> &quot;Quitar un {"{unit}"}&quot; / &quot;Agregar un {"{unit}"}&quot; (prop <code>unit</code>, por defecto &quot;pack&quot;).</li>
          <li>El valor usa <code>aria-live=&quot;polite&quot;</code> para anunciar el cambio.</li>
          <li>Mientras carga, ambos botones se deshabilitan.</li>
        </ul>
      </Section>
      <Section title="Teclado">
        <Table
          head={["Tecla", "Acción"]}
          rows={[
            [<><kbd>Tab</kbd> / <kbd>Shift+Tab</kbd></>, "Mueve el foco entre − y +."],
            [<><kbd>Enter</kbd> / <kbd>Espacio</kbd></>, "Activa el botón enfocado."],
          ]}
        />
      </Section>
      <Section title="Contraste">
        <Table
          head={["Elemento", "Colores", "Relación"]}
          rows={[
            ["Íconos − / +", "stepper-icon sobre stepper-bg", <Ratio key="a" r={ratio(val("stepper-icon"), val("stepper-bg"))} min={3} />],
            ["Valor", "stepper-fg sobre stepper-bg", <Ratio key="b" r={ratio(val("stepper-fg"), val("stepper-bg"))} />],
            ["Íconos sobre hover", "stepper-icon sobre stepper-bg-hover", <Ratio key="c" r={ratio(val("stepper-icon"), val("stepper-bg-hover"))} min={3} />],
            ["Íconos con foco", "stepper-icon sobre stepper-bg-focus", <Ratio key="d" r={ratio(val("stepper-icon"), val("stepper-bg-focus"))} min={3} />],
          ]}
        />
        <p className="muted">Los íconos son componentes gráficos: mínimo 3:1 (WCAG 1.4.11). El valor es texto: 4.5:1.</p>
      </Section>
      <Section title="Foco y tamaño del target">
        <Panel caption="El foco de teclado pinta el fondo de cada botón −/+, no el contenedor. El área táctil es de 44 px en los tres tamaños.">
          <div className="demo-w-160"><StepperStatic value={2} size="sm" /></div>
        </Panel>
      </Section>
    </>
  )

  const updates = (
    <Section title="Historial">
      <Table
        head={["Versión de tokens", "Cambio"]}
        rows={[
          ["4.0.0", <>Nuevo <code key="a">stepper.bg-focus</code>: fondo del botón −/+ con foco de teclado.</>],
          ["3.0.0", <><code key="a">stepper.height</code> pasa a referenciar <code key="b">button.size.md.height</code> (mismo valor, 40 px).</>],
          ["1.2.0", <>Nuevos <code key="a">stepper.height-sm</code> y <code key="b">stepper.hit-area-sm</code> para carrito y drawer. <code key="c">stepper.radius</code> sigue al botón Add to cart.</>],
          ["1.1.0", <>Nuevo <code key="a">stepper.height-lg</code> (página de producto).</>],
        ]}
      />
    </Section>
  )

  return { design, usage, accessibility, updates }
}
