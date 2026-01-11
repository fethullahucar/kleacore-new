# Technical Context

## Tech Stack

### Core Framework
| Teknoloji | Versiyon | Kullanım Amacı |
|-----------|----------|----------------|
| Next.js | 14.x | React framework, App Router |
| TypeScript | 5.x | Tip güvenliği |
| React | 18.x | UI library |

### Styling & UI
| Teknoloji | Versiyon | Kullanım Amacı |
|-----------|----------|----------------|
| Tailwind CSS | 3.4.x | Utility-first CSS |
| shadcn/ui | latest | Temel component library |
| Magic UI | latest | Animasyonlu componentler |
| Lucide React | latest | İkon seti |
| Framer Motion | 10.x | Animasyonlar (Magic UI dep.) |

### Magic UI Componentleri
| Component | Kullanım |
|-----------|----------|
| particles | Hero arka plan |
| typing-animation | Dinamik başlıklar |
| shimmer-button | CTA butonları |
| number-ticker | İstatistik sayaçları |
| marquee | Kayan logolar |
| border-beam | Öne çıkan kartlar |
| bento-grid | Hizmet grid'i |
| globe | Veri merkezi görseli |
| blur-fade | Geçiş animasyonları |

### State & Forms
| Teknoloji | Versiyon | Kullanım Amacı |
|-----------|----------|----------------|
| Zustand | 4.x | Global state (sepet) |
| React Hook Form | 7.x | Form yönetimi |
| Zod | 3.x | Validation |

### Utilities
| Teknoloji | Versiyon | Kullanım Amacı |
|-----------|----------|----------------|
| next-themes | 0.2.x | Dark/Light mode |
| clsx | 2.x | Conditional classes |
| tailwind-merge | 2.x | Class merging |

## Development Tools
- **Node.js**: 18.x veya 20.x
- **pnpm**: Package manager (önerilen)
- **ESLint**: Linting
- **Prettier**: Formatting

## Klasör Yapısı
```
theme/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui base components
│   │   ├── layout/      # Layout components
│   │   ├── sections/    # Page sections
│   │   └── common/      # Shared components
│   ├── lib/             # Utilities & helpers
│   ├── hooks/           # Custom hooks
│   ├── store/           # Zustand stores
│   ├── types/           # TypeScript types
│   └── styles/          # Global styles
├── public/              # Static assets
├── memory-bank/         # Project documentation
└── implementation.md    # Implementation plan
```

## Önemli Konfigürasyonlar

### Tailwind Config
- Custom renk paleti
- Türkçe font desteği (Inter veya Geist)
- Responsive breakpoints

### Next.js Config
- Image optimization
- Metadata API for SEO
- Static export (opsiyonel)

## Kodlama Standartları
1. Component'ler PascalCase
2. Hooks use* prefix
3. Utility functions camelCase
4. Constants UPPER_SNAKE_CASE
5. Types/Interfaces PascalCase with I prefix (opsiyonel)

## Performance Hedefleri
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Lighthouse score > 90
