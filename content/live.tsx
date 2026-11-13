"use client"
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useEffect, useState, type MouseEvent, type ReactNode } from "react"
import { Toaster } from "sonner"
import { AuthProvider } from "@/lib/auth-context"
import { CartProvider, useCart } from "@/lib/cart-context"
import { DeliveryProvider } from "@/lib/delivery-context"
import { FavoritesProvider } from "@/lib/favorites-context"
import { NotificationsProvider } from "@/lib/notifications-context"
import { OrdersProvider, type Order } from "@/lib/orders-context"
import { QuickViewProvider, useQuickView } from "@/lib/quick-view-context"
import { EMPTY_PERSONAL, paymentSummary } from "@/lib/checkout"
import { buildFacets, EMPTY_FILTERS, type Filters } from "@/lib/filters"
import { DELIVERY_OPTIONS } from "@/lib/delivery"
import { products, type Product } from "@/lib/products"
import { SeedCart, sampleProduct, saleProduct, sampleProducts } from "@shop/.storybook/fixtures"
import CartDrawer from "@shop/components/cart-drawer"
import Footer from "@shop/components/footer"
import Hero from "@shop/components/hero"
import Nav from "@shop/components/nav"
import WhatsappFloat from "@shop/components/whatsapp-float"
import { Stack } from "@shop/components/ui/layout"
import { Logo } from "@shop/components/ui/logo"
import { Heading, Text } from "@shop/components/ui/text"
import { Checkbox } from "@shop/components/ui/checkbox"
import { FormInput } from "@shop/components/ui/form-input"
import { RadioGroup } from "@shop/components/ui/radio-card"
import { Switch } from "@shop/components/ui/switch"
import { BrandsStrip } from "@shop/components/patterns/brands-strip"
import { BuyBox } from "@shop/components/patterns/buy-box"
import { CartItem } from "@shop/components/patterns/cart-item"
import { DeliveryOptions } from "@shop/components/patterns/delivery-options"
import { EmptyState } from "@shop/components/patterns/empty-state"
import { FilterSidebar } from "@shop/components/patterns/filter-sidebar"
import { CategoriesMenu } from "@shop/components/patterns/header/categories-menu"
import { CheckoutHeader } from "@shop/components/patterns/header/checkout-header"
import { MobileMenu } from "@shop/components/patterns/header/mobile-menu"
import { MobileNav } from "@shop/components/patterns/header/mobile-nav"
import { NotificationsMenu } from "@shop/components/patterns/header/notifications-menu"
import { OrderConfirmation } from "@shop/components/patterns/order-confirmation"
import { OrderList } from "@shop/components/patterns/order-list"
import { OrderReview, RecapCard } from "@shop/components/patterns/order-review"
import { OrderSummary } from "@shop/components/patterns/order-summary"
import { PaymentMethods } from "@shop/components/patterns/payment-methods"
import { PersonalForm } from "@shop/components/patterns/personal-form"
import { ProductGallery } from "@shop/components/patterns/product-gallery"
import { ProductInfo } from "@shop/components/patterns/product-info"
import ProductCard, { ProductCardSkeleton } from "@shop/components/patterns/product-card"
import { ProductTabs } from "@shop/components/patterns/product-tabs"
import { PromoBanner } from "@shop/components/patterns/promo-banner"
import { QuickViewDrawer } from "@shop/components/patterns/quick-view"
import { ServiceBlocks } from "@shop/components/patterns/service-blocks"
import { ShippingForm } from "@shop/components/patterns/shipping-form"
import { StepIndicator } from "@shop/components/patterns/step-indicator"
import { AccountAccessForm } from "@shop/components/patterns/account-access-form"

/** El producto de ejemplo sin oferta: el estado «Default» no muestra precio anterior ni descuento. */
const regularProduct: Product = { ...sampleProduct, onSale: false, originalPriceX3: undefined }
/** Ficha completa (descripción, qué incluye, consejos y archivos): la del Dolphin S200. */
const fullProduct: Product = products.find((p) => p.slug === "robot-limpia-piscinas-dolphin-s200") ?? sampleProduct

const noop = () => {}

/** Router de mentira: el Nav busca y «navega» con useRouter; acá no debe salir de la documentación. */
const fakeRouter = {
  push: noop, replace: noop, back: noop, forward: noop, refresh: noop,
  prefetch: () => Promise.resolve(),
} as unknown as NonNullable<React.ContextType<typeof AppRouterContext>>

/** Pedido de ejemplo del resumen de compra: dos productos, 1 y 2 unidades. */
const reviewItems = sampleProducts.slice(0, 2).map((product, i) => ({ product, quantity: i + 1 }))
const reviewSubtotal = reviewItems.reduce((sum, i) => sum + i.product.priceX3 * i.quantity, 0)

/** Los links del patrón llevan a páginas de la tienda: acá no se navega. */
const inert = (e: MouseEvent) => {
  if ((e.target as Element).closest("a")) e.preventDefault()
}

/**
 * Entorno de la tienda para un patrón: los mismos contextos que app/layout.tsx (carrito, entrega, sesión, pedidos, avisos, favoritos y vista rápida),
 * con el carrito opcionalmente precargado. `contain` es para overlays que la tienda dibuja con position: fixed (drawer): el contenedor los encierra en su recuadro.
 */
function Env({ width, cart, contain, children }: { width: number | "full"; cart?: { product: Product; quantity: number }[]; contain?: boolean; children: ReactNode }) {
  return (
    <CartProvider>
      <DeliveryProvider>
        <AuthProvider>
          <OrdersProvider>
            <NotificationsProvider>
              <FavoritesProvider>
                <QuickViewProvider>
                  <div className={`shop-scope demo-w-${width}${contain ? " live-fixed" : ""}`} onClickCapture={inert}>
                    {cart ? <SeedCart items={cart}>{children}</SeedCart> : children}
                  </div>
                  <Toaster />
                </QuickViewProvider>
              </FavoritesProvider>
            </NotificationsProvider>
          </OrdersProvider>
        </AuthProvider>
      </DeliveryProvider>
    </CartProvider>
  )
}

/** Evita que un overlay de la tienda bloquee el scroll de la documentación (la tienda pone overflow: hidden al <body>). */
function useUnlockBody() {
  useEffect(() => {
    const unlock = () => {
      if (document.body.style.overflow === "hidden") document.body.style.overflow = ""
    }
    unlock()
    const mo = new MutationObserver(unlock)
    mo.observe(document.body, { attributes: true, attributeFilter: ["style"] })
    return () => mo.disconnect()
  }, [])
}

/** Mantiene abierto el drawer del carrito. */
function KeepOpen({ children }: { children: ReactNode }) {
  const { isOpen, openCart } = useCart()
  useEffect(() => {
    if (!isOpen) openCart()
  }, [isOpen, openCart])
  useUnlockBody()
  return <>{children}</>
}

/** Abre la vista rápida con un producto (con un pequeño retraso: al montar, el drawer cierra el panel por el cambio de ruta). */
function KeepQuickView({ product }: { product: Product }) {
  const { openQuickView } = useQuickView()
  useEffect(() => {
    const t = setTimeout(() => openQuickView(product), 150)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useUnlockBody()
  return <QuickViewDrawer />
}

/** Nav completo: sin navegar. */
function NavEnv({ children }: { children: ReactNode }) {
  return <AppRouterContext.Provider value={fakeRouter}>{children}</AppRouterContext.Provider>
}

/** El menú de categorías se ancla a .header-subnav-row, igual que en el header. */
function CategoriesDemo() {
  return (
    <div className="demo-minh-560">
      <div className="header-subnav-row">
        <CategoriesMenu />
      </div>
    </div>
  )
}

/** Filtros con estado propio, como en el listado. */
function FiltersDemo({ initial = EMPTY_FILTERS }: { initial?: Filters }) {
  const [filters, setFilters] = useState<Filters>(initial)
  const [sheetOpen, setSheetOpen] = useState(false)
  return (
    <FilterSidebar
      title="Todos los productos"
      resultCount={products.length}
      filters={filters}
      facets={buildFacets(products, filters)}
      onChange={setFilters}
      sheetOpen={sheetOpen}
      onSheetOpenChange={setSheetOpen}
      sortLabel="Destacados"
      onOpenSort={noop}
    />
  )
}

type Delivery = "standard" | "express" | "pickup"
const DELIVERY_RADIO = [
  { value: "standard" as const, label: "Envío Gratis", description: ["Llega entre 3 y 5 días hábiles"] },
  { value: "express" as const, label: "Envío Express", description: ["Tiene un costo de $25.500 y llega hoy"] },
  { value: "pickup" as const, label: "Ketea Ramos Mejía", description: ["Cnel. Brandsen 2230, Ramos Mejía", "Lunes a Viernes de 9 a 18hs."] },
]
function RadioDemo() {
  const [value, setValue] = useState<Delivery>("standard")
  return <RadioGroup<Delivery> name="delivery-demo" legend="Elegí cómo recibirlo" options={DELIVERY_RADIO} value={value} onChange={setValue} />
}

const STEPS = [
  { id: "datos", label: "Datos Personales" },
  { id: "entrega", label: "Domicilio y Entrega" },
  { id: "pago", label: "Método de pago" },
]

const promo = {
  image: sampleProduct.image,
  imageAlt: sampleProduct.name,
  title: "Bombas de calor para piscinas",
  text: "Descuento del mes",
  eyebrow: "¡Nuevos ingresos!",
  href: "/productos",
}

const SERVICES = [
  { image: "/assets/svg/icons/icon1.svg", title: "Soporte 24/7", desc: "Contáctanos las 24 horas, los 7 días de la semana." },
  { image: "/assets/svg/icons/icon2.svg", title: "30 días de devolución", desc: "Reembolso completo dentro de los 30 días posteriores a la compra." },
  { image: "/assets/svg/icons/icon3.svg", title: "Envío gratuito", desc: "Recibe automáticamente envío estándar gratuito en cada pedido." },
]

const sampleOrder = (n: number, items: { product: Product; quantity: number }[]): Order => {
  const subtotal = items.reduce((s, i) => s + i.product.priceX3 * i.quantity, 0)
  return { email: "ana@example.com", ref: `ORD-2026-4821${n}`, date: "13 de noviembre de 2026", items, subtotal, shippingCost: 0, total: subtotal, deliveryLabel: "Envío Gratis", paymentLabel: "MODO" }
}

/** Las mismas stories que Storybook, pero con el componente real renderizado acá (así se puede inspeccionar).
 *  El índice coincide con `shots` del patrón (lib/sb-patterns.ts) y con lib/live-stories.ts. */
const STORIES: Record<string, ReactNode[]> = {
  nav: [
    <Env key="0" width="full"><NavEnv><Nav /></NavEnv></Env>,
    <iframe key="1" className="live-frame live-frame--nav" src="/live/nav-mobile" title="Header en mobile (390 px)" loading="lazy" />,
    <Env key="2" width="full"><CategoriesDemo /></Env>,
    <Env key="3" width={392} contain><MobileMenu onClose={noop} onOpenAuth={noop} /></Env>,
    <Env key="4" width="full"><CheckoutHeader /></Env>,
  ],
  footer: [<Env key="0" width="full"><Footer /></Env>],
  notifications: [
    <Env key="0" width={440}><div className="demo-minh-560 demo-end"><NotificationsMenu /></div></Env>,
  ],
  "support-chat": [
    <Env key="0" width="full"><div className="demo-minh-560 live-fixed"><WhatsappFloat /></div></Env>,
  ],
  hero: [<Env key="0" width="full"><Hero /></Env>],
  "promo-banner": [
    <Env key="0" width={360}><PromoBanner {...promo} size="sm" /></Env>,
    <Env key="1" width={560}><PromoBanner {...promo} size="md" /></Env>,
    <Env key="2" width={880}><PromoBanner {...promo} size="lg" /></Env>,
  ],
  "service-blocks": [<Env key="0" width="full"><ServiceBlocks items={SERVICES} /></Env>],
  "brands-strip": [<Env key="0" width="full"><BrandsStrip /></Env>],
  "empty-state": [
    <Env key="0" width={560}><EmptyState title="Tu carrito está vacío" text="Explorá nuestros productos y empezá tu pedido." /></Env>,
  ],
  "product-card": [
    <Env key="0" width={280}><ProductCard product={regularProduct} /></Env>,
    <Env key="1" width={280}><ProductCard product={saleProduct} /></Env>,
    <Env key="2" width={280}><ProductCardSkeleton /></Env>,
    <Env key="3" width={872}>
      <div className="grid grid-cols-3 gap-4">
        {sampleProducts.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </Env>,
  ],
  "quick-view": [
    <Env key="0" width={520} contain><KeepQuickView product={saleProduct} /></Env>,
  ],
  "product-detail": [
    <Env key="0" width={480}><ProductInfo product={regularProduct} /></Env>,
    <Env key="1" width={480}><div className="demo-h-480"><ProductGallery product={regularProduct} /></div></Env>,
    <Env key="2" width={420}><BuyBox product={regularProduct} /></Env>,
  ],
  "product-tabs": [
    <Env key="0" width={880}><ProductTabs product={fullProduct} /></Env>,
    <Env key="1" width={880}><ProductTabs product={regularProduct} /></Env>,
  ],
  "filter-sidebar": [
    <Env key="0" width={300}><FiltersDemo /></Env>,
    <Env key="1" width={300}><FiltersDemo initial={{ ...EMPTY_FILTERS, brands: ["Dolphin"], freeShipping: true }} /></Env>,
  ],
  "cart-item": [
    <Env key="0" width={560}><CartItem product={regularProduct} quantity={2} onIncrement={noop} onDecrement={noop} onRemove={noop} /></Env>,
    <Env key="1" width={560}><CartItem product={regularProduct} quantity={2} variant="drawer" onIncrement={noop} onDecrement={noop} onRemove={noop} /></Env>,
  ],
  "cart-drawer": [
    <Env key="0" width={520} contain><KeepOpen><CartDrawer /></KeepOpen></Env>,
    <Env key="1" width={520} contain cart={[{ product: sampleProducts[0], quantity: 2 }]}><KeepOpen><CartDrawer /></KeepOpen></Env>,
    <Env key="2" width={520} contain cart={[{ product: sampleProducts[0], quantity: 2 }, { product: sampleProducts[1], quantity: 1 }]}><KeepOpen><CartDrawer /></KeepOpen></Env>,
  ],
  "order-summary": [
    <Env key="0" width={400}><OrderSummary totalItems={2} subtotal={reviewSubtotal} total={reviewSubtotal} onCheckout={noop} /></Env>,
  ],
  "delivery-options": [
    <Env key="0" width={420}><DeliveryOptions /></Env>,
    <Env key="1" width={420}><DeliveryOptions showPostalCode={false} /></Env>,
  ],
  "step-indicator": [
    <Env key="0" width={720}><StepIndicator steps={STEPS} current="datos" onStepClick={noop} /></Env>,
    <Env key="1" width={720}><StepIndicator steps={STEPS} current="pago" onStepClick={noop} /></Env>,
  ],
  "personal-form": [
    <Env key="0" width={720}><PersonalForm defaultValues={EMPTY_PERSONAL} onSubmit={noop} /></Env>,
    <Env key="1" width={720}><PersonalForm defaultValues={{ ...EMPTY_PERSONAL, email: "ana@example.com", nombre: "Ana", apellido: "Pérez", telefono: "11 2233 4455", calle: "Siempre Viva", numero: "742" }} onSubmit={noop} /></Env>,
  ],
  "shipping-form": [
    <Env key="0" width={560}><ShippingForm onSubmit={noop} /></Env>,
    <Env key="1" width={560}><ShippingForm onSubmit={noop} defaultValues={{ calle: "Siempre Viva", numero: "742", cp: "1706", ciudad: "Ramos Mejía" }} /></Env>,
  ],
  "payment-methods": [
    <Env key="0" width={640}><PaymentMethods total={reviewSubtotal} loading={false} onPay={noop} /></Env>,
  ],
  "order-review": [
    <Env key="0" width={420}><OrderReview items={reviewItems} subtotal={reviewSubtotal} total={reviewSubtotal} /></Env>,
    <Env key="1" width={420}>
      <RecapCard title="Datos de entrega" editLabel="Editar datos de entrega" onEdit={noop}>
        <p><strong>Calle:</strong> Siempre Viva</p>
        <p><strong>Número:</strong> 742</p>
        <p><strong>Ciudad:</strong> Ramos Mejía</p>
      </RecapCard>
    </Env>,
  ],
  "order-confirmation": [
    <Env key="0" width="full">
      <OrderConfirmation
        orderRef="ORD-2026-48213"
        dateString="viernes, 13 de noviembre de 2026"
        customer={{ nombre: "Ana", email: "ana@example.com", telefono: "11 2233 4455" }}
        address={{ line1: "Siempre Viva 742", line2: "Ramos Mejía, Buenos Aires (1706)" }}
        delivery={DELIVERY_OPTIONS.standard}
        shippingCost={0}
        payment={paymentSummary("modo")}
        items={reviewItems}
        subtotal={reviewSubtotal}
        total={reviewSubtotal}
      />
    </Env>,
  ],
  "order-list": [
    <Env key="0" width={640}><OrderList orders={[sampleOrder(1, [{ product: sampleProducts[0], quantity: 1 }])]} /></Env>,
    <Env key="1" width={640}><OrderList orders={[sampleOrder(2, [{ product: sampleProducts[1], quantity: 2 }, { product: sampleProducts[2], quantity: 1 }]), sampleOrder(1, [{ product: sampleProducts[0], quantity: 1 }])]} /></Env>,
  ],
  "account-access": [
    <Env key="0" width={440}><AccountAccessForm onSuccess={noop} /></Env>,
    <Env key="1" width={440}><AccountAccessForm initialMode="login" onSuccess={noop} /></Env>,
  ],
  checkbox: [
    <Env key="0" width={360}><Checkbox label="Dolphin" /></Env>,
    <Env key="1" width={360}>
      <Stack gap={2}>
        <Checkbox label="Piscinas" count={35} defaultChecked />
        <Checkbox label="Robots" count={21} />
        <Checkbox label="Accesorios" count={10} />
      </Stack>
    </Env>,
  ],
  switch: [
    <Env key="0" width={360}><Switch label="Envío gratis" /></Env>,
    <Env key="1" width={360}><Switch label="Envío gratis" defaultChecked /></Env>,
  ],
  "radio-card": [
    <Env key="0" width={420}><RadioDemo /></Env>,
  ],
  "form-input": [
    <Env key="0" width={360}><FormInput label="Email" type="email" placeholder="tu@email.com" /></Env>,
    <Env key="1" width={360}><FormInput label="Email" type="email" placeholder="tu@email.com" note="Acá te enviamos la confirmación del pedido." /></Env>,
    <Env key="2" width={360}><FormInput label="Email" type="email" defaultValue="ana@" error="Ingresá un email válido." /></Env>,
    <Env key="3" width={360}><FormInput label="Email" type="email" defaultValue="ana@example.com" valid /></Env>,
  ],
  logo: [
    <Env key="0" width={600}><Logo /></Env>,
    <Env key="1" width={600}><Logo size="lg" /></Env>,
    <Env key="2" width={600}><Logo size="checkout" /></Env>,
  ],
  text: [
    <Env key="0" width={600}><Text>Todo para tu pileta, en un solo lugar.</Text></Env>,
    <Env key="1" width={600}>
      <div className="demo-stack-12">
        {(["display", "headline", "title", "subtitle", "label", "section", "page"] as const).map((size) => (
          <Heading key={size} size={size}>{size}</Heading>
        ))}
      </div>
    </Env>,
  ],
}

/** Vista del header en mobile: se carga en un iframe de 390 px para que apliquen los breakpoints reales. */
export function NavMobileEmbed() {
  return <Env width="full"><NavEnv><Nav /><MobileNav /></NavEnv></Env>
}

export default function LiveStory({ slug, index }: { slug: string; index: number }) {
  return <>{STORIES[slug]?.[index] ?? null}</>
}
