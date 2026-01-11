# KLEACORE Hosting Website - Context

## Proje Özeti
Türk hosting şirketi KLEACORE için modern web sitesi. Next.js 14, TypeScript, Tailwind CSS, shadcn/ui ve Magic UI kullanılarak geliştirildi.

## Teknoloji Stack
- **Framework:** Next.js 14 (App Router)
- **Dil:** TypeScript
- **Styling:** Tailwind CSS
- **UI Kütüphaneleri:** shadcn/ui, Magic UI, Aceternity UI
- **Animasyonlar:** Framer Motion
- **Paket Yöneticisi:** pnpm

## Proje Yapısı
```
src/
├── app/                    # Next.js App Router sayfaları
│   ├── domain/            # Domain kayıt, transfer, whois, belgesiz-tr
│   ├── hosting/           # Linux, WordPress, Kurumsal, Reseller hosting
│   ├── sunucu/            # VDS, VPS, Bulut, Fiziksel sunucu
│   ├── ssl/               # Standart, Wildcard, EV, Kurumsal SSL
│   ├── veri-merkezi/      # Barındırma, CDN, DDoS, IP-ASN
│   ├── kurumsal/          # Hakkımızda, İletişim, Kariyer, Blog
│   ├── musteri/           # Panel, Destek, Durum, Şifremi Unuttum
│   └── yasal/             # Gizlilik, KVKK, Kullanım Koşulları
├── components/
│   ├── layout/            # Header, Footer, Topbar
│   ├── sections/          # Hero, Hosting Solutions, Services, CTA, vb.
│   ├── ui/                # shadcn/ui bileşenleri
│   ├── magicui/           # Magic UI bileşenleri
│   ├── aceternity/        # Aceternity UI bileşenleri
│   ├── domain/            # Domain arama, TLD fiyatlandırma
│   └── hosting/           # PricingCard, BillingToggle, FeatureComparison
└── lib/                   # Utility fonksiyonları
```

## Önemli Dosyalar

### Layout Bileşenleri
- `src/components/layout/header.tsx` - Ana navigasyon menüsü (mega menu destekli)
- `src/components/layout/footer.tsx` - Site footer'ı
- `src/components/layout/topbar.tsx` - Üst bilgi çubuğu (email, telefon, sosyal medya)

### Ana Sayfa Bileşenleri
- `src/components/sections/hero.tsx` - Ana hero bölümü
- `src/components/sections/hosting-solutions.tsx` - Hosting paketleri + VDS tablosu
- `src/components/sections/domain-search-section.tsx` - Domain arama
- `src/components/sections/services.tsx` - Hizmetler grid'i
- `src/components/sections/testimonials.tsx` - Müşteri yorumları
- `src/components/sections/cta.tsx` - Call-to-action bölümü

### Hosting Bileşenleri
- `src/components/hosting/pricing-card.tsx` - Fiyatlandırma kartları
- `src/components/hosting/billing-toggle.tsx` - Aylık/Yıllık geçiş butonu
- `src/components/hosting/feature-comparison.tsx` - Özellik karşılaştırma tablosu

## Son Yapılan Değişiklikler

1. **Topbar eklendi** - Tüm sayfalara topbar komponenti eklendi
2. **Email güncellendi** - `destek@kleacore.com` → `support@kleacore.com`
3. **Header animasyonları kaldırıldı** - Statik navigasyon menüsü
4. **Header büyütüldü** - h-16 → h-20, text-sm → text-base
5. **VDS bölümü eklendi** - Ana sayfada "Neden Bizi Tercih Etmelisiniz?" yerine VDS tablosu
6. **Favicon eklendi** - `public/favicon.png` ve metadata güncellendi
7. **ESLint hataları düzeltildi** - Tırnak işaretleri (`'` → `&apos;`)
8. **Tailwind duplicate key hatası düzeltildi**

## cPanel Deployment

### Gerekli Dosyalar
- `.next/` (build çıktısı)
- `public/`
- `package.json`
- `next.config.mjs`
- `server.js`

### cPanel Ayarları
- **Node.js version:** 18+ veya 24.6.0
- **Application mode:** Production
- **Application root:** `kleacore` (veya tercih edilen klasör)
- **Application startup file:** `server.js`
- **Environment:** `NODE_ENV=production`

### Kurulum Adımları
1. Dosyaları cPanel File Manager'a yükle
2. CREATE ile uygulama oluştur
3. "Run NPM Install" çalıştır
4. "Start Application" ile başlat

## GitHub Repository
https://github.com/fethullahucar/kleacore-new

## Komutlar
```bash
# Geliştirme
pnpm dev

# Build
pnpm build

# Production
pnpm start
```

## Notlar
- Tüm sayfalar statik olarak pre-render ediliyor (40 sayfa)
- Dark/Light tema desteği mevcut
- Responsive tasarım (mobil menü dahil)
- Türkçe içerik
