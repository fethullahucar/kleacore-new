# HostingTR - Implementation Plan

## Proje Genel Bakış

Türkiye pazarına yönelik modern, profesyonel bir hosting ve domain hizmetleri web sitesi.

---

## Tech Stack

### Frontend Framework
- **Next.js 14** (App Router) - React tabanlı, SSR/SSG desteği
- **TypeScript** - Tip güvenliği

### UI & Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **shadcn/ui** - Radix UI tabanlı, özelleştirilebilir component library
- **Magic UI** - Animasyonlu componentler (hero, text animations, backgrounds)
- **Lucide React** - Modern ikon seti
- **Framer Motion** - Animasyonlar (Magic UI dependency)

### Form & Validation
- **React Hook Form** - Form yönetimi
- **Zod** - Schema validation

### State Management
- **Zustand** - Hafif state management (sepet, kullanıcı durumu)

### Additional Libraries
- **next-themes** - Dark/Light mode
- **next-intl** - i18n (opsiyonel, gelecekte)

---

## Sayfa Yapısı

### 1. Ana Sayfa (`/`)
- Hero section (domain arama)
- Hizmet kartları
- Fiyat planları özeti
- Müşteri yorumları
- İstatistikler
- CTA bölümü

### 2. Alan Adı Sayfaları (`/domain/...`)

#### 2.1 Domain Kaydı (`/domain/kayit`)
- Domain arama formu
- TLD fiyat listesi (.com, .net, .org, .tr, vb.)
- Toplu domain arama
- Domain önerileri

#### 2.2 Domain Transferi (`/domain/transfer`)
- Transfer süreci açıklaması
- EPP kodu girişi
- Transfer durumu sorgulama

#### 2.3 Belgesiz .TR Domain (`/domain/belgesiz-tr`)
- Özel .tr domain kayıt formu
- Gerekli belgeler bilgisi
- Fiyatlandırma

#### 2.4 Whois Sorgulama (`/domain/whois`)
- Whois arama formu
- Sonuç gösterimi

### 3. Hosting Sayfaları (`/hosting/...`)

#### 3.1 Linux Hosting (`/hosting/linux`)
- Paket karşılaştırma tablosu
- Özellikler listesi
- cPanel demo

#### 3.2 WordPress Hosting (`/hosting/wordpress`)
- WordPress özel özellikleri
- Otomatik kurulum
- Tema/plugin yönetimi

#### 3.3 Kurumsal Hosting (`/hosting/kurumsal`)
- Yüksek performans özellikleri
- SLA garantisi
- Özel destek

#### 3.4 Reseller Hosting (`/hosting/reseller`)
- Bayi paketleri
- WHM erişimi
- White-label çözümler

### 4. Sunucu Sayfaları (`/sunucu/...`)

#### 4.1 VDS Sunucular (`/sunucu/vds`)
- VDS paketleri
- Kaynak yapılandırma
- İşletim sistemi seçimi

#### 4.2 Fiziksel Sunucular (`/sunucu/fiziksel`)
- Dedicated server paketleri
- Donanım özellikleri
- Kurulum süreci

### 5. Veri Merkezi Sayfaları (`/veri-merkezi/...`)

#### 5.1 Sunucu Barındırma (`/veri-merkezi/barindrima`)
- Colocation hizmeti
- Rack fiyatları
- Veri merkezi özellikleri

#### 5.2 IPv4 & ASN Kiralama (`/veri-merkezi/ip-asn`)
- IP blok fiyatları
- ASN başvuru süreci

### 6. Kurumsal Sayfalar (`/kurumsal/...`)

#### 6.1 SSL Sertifikası (`/ssl`)
- SSL türleri (DV, OV, EV)
- Wildcard SSL
- Multi-domain SSL

#### 6.2 Hakkımızda (`/hakkimizda`)
- Şirket hikayesi
- Ekip
- Değerlerimiz

#### 6.3 İletişim (`/iletisim`)
- İletişim formu
- Harita
- Adres bilgileri

#### 6.4 Blog (`/blog`)
- Blog listesi
- Kategori filtreleme
- Arama

#### 6.5 Kariyer (`/kariyer`)
- Açık pozisyonlar
- Başvuru formu

#### 6.6 Ticari Bilgiler (`/ticari-bilgiler`)
- Şirket bilgileri
- Banka hesapları

### 7. Müşteri Sayfaları (`/musteri/...`)

#### 7.1 Giriş Yap (`/giris`)
- Login formu
- Şifremi unuttum

#### 7.2 Kayıt Ol (`/kayit`)
- Kayıt formu
- E-posta doğrulama

#### 7.3 Sepet (`/sepet`)
- Sepet içeriği
- Ödeme adımları

### 8. Yasal Sayfalar (`/yasal/...`)

#### 8.1 Gizlilik Politikası (`/yasal/gizlilik`)
#### 8.2 Kullanım Koşulları (`/yasal/kullanim-kosullari`)
#### 8.3 İade Politikası (`/yasal/iade`)
#### 8.4 KVKK (`/yasal/kvkk`)
#### 8.5 Çerez Politikası (`/yasal/cerez`)

---

## Component Yapısı

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Ana sayfa
│   ├── domain/
│   │   ├── kayit/
│   │   ├── transfer/
│   │   ├── belgesiz-tr/
│   │   └── whois/
│   ├── hosting/
│   │   ├── linux/
│   │   ├── wordpress/
│   │   ├── kurumsal/
│   │   └── reseller/
│   ├── sunucu/
│   │   ├── vds/
│   │   └── fiziksel/
│   ├── veri-merkezi/
│   │   ├── barindrima/
│   │   └── ip-asn/
│   ├── ssl/
│   ├── hakkimizda/
│   ├── iletisim/
│   ├── blog/
│   ├── kariyer/
│   ├── ticari-bilgiler/
│   ├── giris/
│   ├── kayit/
│   ├── sepet/
│   └── yasal/
│       ├── gizlilik/
│       ├── kullanim-kosullari/
│       ├── iade/
│       ├── kvkk/
│       └── cerez/
├── components/
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── sheet.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   └── ...
│   ├── magicui/                  # Magic UI components
│   │   ├── animated-beam.tsx     # Bağlantı animasyonları
│   │   ├── bento-grid.tsx        # Bento grid layout
│   │   ├── blur-fade.tsx         # Blur fade efekti
│   │   ├── border-beam.tsx       # Kenarlık animasyonu
│   │   ├── dock.tsx              # macOS dock stili
│   │   ├── globe.tsx             # 3D globe (veri merkezi)
│   │   ├── marquee.tsx           # Kayan yazı/logo
│   │   ├── meteors.tsx           # Meteor animasyonu
│   │   ├── number-ticker.tsx     # Sayı animasyonu
│   │   ├── particles.tsx         # Parçacık efekti
│   │   ├── ripple.tsx            # Dalga efekti
│   │   ├── shimmer-button.tsx    # Parlayan buton
│   │   ├── sparkles.tsx          # Işıltı efekti
│   │   ├── text-reveal.tsx       # Metin açılma efekti
│   │   ├── typing-animation.tsx  # Yazma animasyonu
│   │   └── word-rotate.tsx       # Dönen kelimeler
│   ├── layout/
│   │   ├── header.tsx           # Ana navigation
│   │   ├── footer.tsx           # Footer
│   │   ├── mobile-nav.tsx       # Mobil menü
│   │   └── breadcrumb.tsx
│   ├── sections/
│   │   ├── hero.tsx             # Hero bölümü
│   │   ├── features.tsx         # Özellikler
│   │   ├── pricing-table.tsx    # Fiyat tablosu
│   │   ├── testimonials.tsx     # Müşteri yorumları
│   │   ├── stats.tsx            # İstatistikler
│   │   ├── cta.tsx              # Call to action
│   │   └── faq.tsx              # SSS
│   ├── domain/
│   │   ├── domain-search.tsx    # Domain arama
│   │   ├── tld-pricing.tsx      # TLD fiyatları
│   │   └── whois-result.tsx     # Whois sonucu
│   ├── hosting/
│   │   ├── package-card.tsx     # Paket kartı
│   │   ├── comparison-table.tsx # Karşılaştırma
│   │   └── feature-list.tsx     # Özellik listesi
│   ├── cart/
│   │   ├── cart-item.tsx        # Sepet öğesi
│   │   ├── cart-summary.tsx     # Sepet özeti
│   │   └── checkout-form.tsx    # Ödeme formu
│   └── common/
│       ├── section-header.tsx   # Bölüm başlığı
│       ├── trust-badges.tsx     # Güven rozetleri
│       └── loading.tsx          # Yükleniyor
├── lib/
│   ├── utils.ts                 # Yardımcı fonksiyonlar
│   └── constants.ts             # Sabitler
├── hooks/
│   ├── use-cart.ts              # Sepet hook
│   └── use-domain-search.ts     # Domain arama hook
├── store/
│   └── cart-store.ts            # Zustand store
├── types/
│   ├── domain.ts
│   ├── hosting.ts
│   └── cart.ts
└── styles/
    └── globals.css              # Global stiller
```

---

## Renk Paleti

```css
/* Primary - Mavi tonları (güven, teknoloji) */
--primary-50: #eff6ff;
--primary-100: #dbeafe;
--primary-500: #3b82f6;
--primary-600: #2563eb;
--primary-700: #1d4ed8;

/* Secondary - Yeşil (başarı, canlılık) */
--secondary-500: #22c55e;
--secondary-600: #16a34a;

/* Accent - Turuncu (dikkat çekici) */
--accent-500: #f97316;
--accent-600: #ea580c;

/* Neutral - Gri tonları */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-900: #111827;

/* Dark mode */
--dark-bg: #0f172a;
--dark-card: #1e293b;
```

---

## Tasarım Prensipleri

1. **Modern & Minimalist** - Temiz, boşluklu tasarım
2. **Trust-First** - Güven oluşturan elementler (sertifikalar, müşteri sayısı)
3. **Mobile-First** - Responsive tasarım
4. **Fast Loading** - Performans odaklı
5. **Accessible** - WCAG 2.1 uyumlu
6. **Turkish Locale** - Türkçe karakter ve format desteği

---

## Magic UI Kullanım Planı

### Ana Sayfa
| Component | Kullanım Yeri | Amaç |
|-----------|---------------|------|
| `particles` | Hero background | Dinamik arka plan |
| `typing-animation` | Hero başlık | "Domain, Hosting, Sunucu" döngüsü |
| `shimmer-button` | CTA butonları | Dikkat çekici aksiyon |
| `number-ticker` | İstatistikler | Animasyonlu sayaçlar |
| `marquee` | Müşteri logoları | Kayan referanslar |
| `border-beam` | Öne çıkan paket | Popüler paket vurgusu |
| `bento-grid` | Hizmet kartları | Modern grid layout |

### Domain Sayfaları
| Component | Kullanım Yeri | Amaç |
|-----------|---------------|------|
| `ripple` | Arama butonu | Tıklama feedback |
| `blur-fade` | Arama sonuçları | Yumuşak geçiş |
| `sparkles` | "Müsait" domain | Başarı vurgusu |

### Hosting & Sunucu
| Component | Kullanım Yeri | Amaç |
|-----------|---------------|------|
| `animated-beam` | Özellik karşılaştırma | Bağlantı gösterimi |
| `globe` | Veri merkezi sayfası | Lokasyon gösterimi |
| `meteors` | Premium paketler | Özel efekt |

### Genel Kullanım
| Component | Kullanım Yeri | Amaç |
|-----------|---------------|------|
| `blur-fade` | Sayfa geçişleri | Smooth transitions |
| `text-reveal` | Section başlıkları | Scroll animasyonu |
| `dock` | Hızlı erişim (opsiyonel) | Alt navigasyon |

---

## Uygulama Fazları

### Faz 1: Temel Kurulum
- [ ] Next.js projesi oluşturma
- [ ] Tailwind CSS kurulumu
- [ ] shadcn/ui kurulumu
- [ ] Temel layout (header, footer)
- [ ] Tema sistemi (dark/light)

### Faz 2: Ana Sayfa
- [ ] Hero section
- [ ] Domain arama componenti
- [ ] Hizmet kartları
- [ ] Fiyat planları
- [ ] İstatistikler
- [ ] Footer

### Faz 3: Domain Sayfaları
- [ ] Domain kayıt sayfası
- [ ] Domain transfer sayfası
- [ ] Belgesiz TR sayfası
- [ ] Whois sorgulama

### Faz 4: Hosting Sayfaları
- [ ] Linux hosting
- [ ] WordPress hosting
- [ ] Kurumsal hosting
- [ ] Reseller hosting

### Faz 5: Sunucu & Veri Merkezi
- [ ] VDS sunucular
- [ ] Fiziksel sunucular
- [ ] Sunucu barındırma
- [ ] IPv4/ASN kiralama

### Faz 6: Kurumsal Sayfalar
- [ ] SSL sertifikası
- [ ] Hakkımızda
- [ ] İletişim
- [ ] Blog
- [ ] Kariyer

### Faz 7: Müşteri & Yasal
- [ ] Giriş/Kayıt sayfaları
- [ ] Sepet sistemi
- [ ] Yasal sayfalar

### Faz 8: Polish & Deploy
- [ ] SEO optimizasyonu
- [ ] Performance tuning
- [ ] Test & bug fix
- [ ] Deploy

---

## Notlar

- Tüm fiyatlar TL cinsinden gösterilecek
- Domain aramaları mock API ile simüle edilecek (gerçek WHMCS entegrasyonu için backend gerekli)
- Responsive breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px)
