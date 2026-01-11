# System Patterns

## Mimari Desenler

### Component Yapısı
```
ComponentName/
├── index.tsx          # Ana component export
├── ComponentName.tsx  # Component implementasyonu
├── types.ts          # Component-specific types
└── utils.ts          # Component-specific utilities
```

### Page Yapısı (App Router)
```
app/
├── page.tsx          # Sayfa componenti
├── layout.tsx        # Sayfa layout (opsiyonel)
├── loading.tsx       # Loading state
├── error.tsx         # Error boundary
└── not-found.tsx     # 404 state
```

## Naming Conventions

### Dosya İsimleri
- Components: `kebab-case.tsx` (örn: `pricing-table.tsx`)
- Pages: `page.tsx` (Next.js convention)
- Hooks: `use-kebab-case.ts` (örn: `use-cart.ts`)
- Types: `kebab-case.ts` (örn: `hosting.ts`)
- Utils: `kebab-case.ts` (örn: `format-price.ts`)

### Component İsimleri
- PascalCase: `PricingTable`, `DomainSearch`
- Props interface: `ComponentNameProps`

### CSS Class Patterns
```tsx
// Tailwind class organization
<div className={cn(
  // Layout
  "flex items-center justify-between",
  // Spacing
  "px-4 py-2 gap-4",
  // Colors
  "bg-white dark:bg-gray-900",
  // Typography
  "text-sm font-medium",
  // States
  "hover:bg-gray-100 focus:ring-2",
  // Responsive
  "md:flex-row lg:px-8",
  // Conditional
  isActive && "border-primary"
)}>
```

## Data Patterns

### Mock Data Yapısı
```typescript
// data/hosting-packages.ts
export const hostingPackages: HostingPackage[] = [
  {
    id: "starter",
    name: "Başlangıç",
    price: 49.90,
    period: "monthly",
    features: [...],
    popular: false
  }
];
```

### API Response Simulation
```typescript
// lib/api.ts
export async function searchDomain(domain: string): Promise<DomainResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Return mock data
  return {
    available: Math.random() > 0.5,
    domain,
    suggestions: [...]
  };
}
```

## State Patterns

### Zustand Store Pattern
```typescript
// store/cart-store.ts
interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  // ...
}));
```

### Form Pattern
```typescript
// React Hook Form + Zod
const formSchema = z.object({
  domain: z.string().min(3).max(63),
  tld: z.string()
});

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: { domain: "", tld: ".com" }
});
```

## UI Patterns

### Section Layout
```tsx
<section className="py-16 md:py-24">
  <div className="container mx-auto px-4">
    <SectionHeader
      title="Başlık"
      description="Açıklama"
    />
    <div className="mt-12">
      {/* Content */}
    </div>
  </div>
</section>
```

### Card Pattern
```tsx
<Card className="p-6 hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle>Başlık</CardTitle>
    <CardDescription>Açıklama</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    <Button>Aksiyon</Button>
  </CardFooter>
</Card>
```

### Pricing Table Pattern
```tsx
<div className="grid md:grid-cols-3 gap-8">
  {packages.map((pkg) => (
    <PricingCard
      key={pkg.id}
      {...pkg}
      highlighted={pkg.popular}
    />
  ))}
</div>
```

## Accessibility Patterns

### Focus Management
```tsx
<Button
  className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
  aria-label="Sepete ekle"
>
```

### Screen Reader
```tsx
<span className="sr-only">Yükleniyor...</span>
<Spinner aria-hidden="true" />
```

## Performance Patterns

### Image Optimization
```tsx
import Image from "next/image";

<Image
  src="/hero.webp"
  alt="Hero görsel"
  width={1200}
  height={600}
  priority // LCP için
  placeholder="blur"
/>
```

### Dynamic Import
```tsx
const HeavyComponent = dynamic(
  () => import("@/components/heavy"),
  { loading: () => <Skeleton /> }
);
```
