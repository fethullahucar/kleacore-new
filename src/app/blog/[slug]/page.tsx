"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  User,
  Tag,
  ChevronRight,
  Share2,
  Facebook,
  Linkedin,
  ArrowLeft,
  ArrowRight,
  BookOpen,
} from "lucide-react";

// Blog posts data
const blogPosts: Record<string, {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  tags: string[];
}> = {
  "2024-web-hosting-trendleri": {
    title: "2024'te Web Hosting Trendleri: Bilmeniz Gereken Her Şey",
    excerpt: "Bulut teknolojileri, edge computing ve yapay zeka destekli hosting çözümleri ile sektörün geleceğine bakıyoruz.",
    category: "Teknoloji",
    author: "Ahmet Yılmaz",
    authorRole: "Baş Teknoloji Editörü",
    date: "15 Ocak 2024",
    readTime: "8 dk",
    tags: ["Hosting", "Bulut", "Teknoloji", "2024"],
    content: `
Web hosting sektörü, teknolojinin hızla gelişmesiyle birlikte sürekli evrim geçiriyor. 2024 yılında hosting dünyasını şekillendirecek trendleri ve bu trendlerin web siteniz için ne anlama geldiğini inceliyoruz.

## 1. Edge Computing'in Yükselişi

Edge computing, içeriğin kullanıcıya en yakın sunucudan sunulmasını sağlayarak gecikme sürelerini minimuma indirir. 2024'te bu teknoloji daha da yaygınlaşacak.

**Avantajları:**
- Düşük gecikme süreleri
- Daha hızlı sayfa yüklenme
- Daha iyi kullanıcı deneyimi
- Global ölçekte tutarlı performans

## 2. Yapay Zeka Destekli Hosting

AI, hosting sektöründe devrim yaratıyor. Otomatik optimizasyon, güvenlik tehdidi tespiti ve kaynak yönetimi artık yapay zeka tarafından gerçekleştiriliyor.

**AI Kullanım Alanları:**
- Otomatik performans optimizasyonu
- Akıllı önbellekleme
- DDoS saldırı tespiti ve önleme
- Predictive scaling (öngörülü ölçeklendirme)

## 3. Yeşil Hosting ve Sürdürülebilirlik

Çevre bilincinin artmasıyla birlikte, yeşil hosting çözümleri popülerlik kazanıyor. Yenilenebilir enerji ile çalışan veri merkezleri tercih ediliyor.

**Yeşil Hosting Özellikleri:**
- %100 yenilenebilir enerji
- Karbon nötr operasyonlar
- Enerji verimli donanım
- Soğutma optimizasyonu

## 4. Serverless ve Container Teknolojileri

Kubernetes ve Docker gibi container teknolojileri, hosting altyapısını daha esnek ve ölçeklenebilir hale getiriyor.

## 5. Gelişmiş Güvenlik Özellikleri

Zero-trust güvenlik modeli, WAF (Web Application Firewall) ve otomatik yedekleme çözümleri standart hale geliyor.

## Sonuç

2024'te hosting seçerken bu trendleri göz önünde bulundurmak, web sitenizin performansı ve güvenliği için kritik önem taşıyor. Modern hosting çözümleri, bu teknolojileri entegre ederek kullanıcılara üstün deneyim sunuyor.
    `,
  },
  "wordpress-hizlandirma-ipuclari": {
    title: "WordPress Sitenizi Hızlandırmanın 10 Yolu",
    excerpt: "WordPress sitenizin yavaş mı çalışıyor? Bu 10 ipucu ile sitenizi optimize edin ve hızını artırın.",
    category: "WordPress",
    author: "Elif Kaya",
    authorRole: "WordPress Uzmanı",
    date: "12 Ocak 2024",
    readTime: "6 dk",
    tags: ["WordPress", "Performans", "Optimizasyon", "Hız"],
    content: `
WordPress, dünyanın en popüler içerik yönetim sistemi olmasına rağmen, doğru optimize edilmediğinde yavaş çalışabilir. İşte sitenizi hızlandırmak için 10 etkili yöntem.

## 1. Kaliteli Hosting Seçimi

Her şey doğru hosting ile başlar. Paylaşımlı hosting yerine VPS veya WordPress optimize edilmiş hosting tercih edin.

**Öneriler:**
- LiteSpeed web server desteği
- NVMe SSD diskler
- PHP 8.x desteği
- Yeterli RAM ve CPU

## 2. Önbellekleme Kullanın

Önbellekleme, sayfa yükleme sürelerini dramatik şekilde azaltır.

**Popüler Önbellek Eklentileri:**
- LiteSpeed Cache
- WP Rocket
- W3 Total Cache

## 3. Görsel Optimizasyonu

Görseller, sayfa boyutunun büyük kısmını oluşturur. Optimize edilmemiş görseller sitenizi yavaşlatır.

**İpuçları:**
- WebP formatı kullanın
- Lazy loading aktifleştirin
- Görselleri sıkıştırın
- Doğru boyutlandırma yapın

## 4. CDN Kullanın

Content Delivery Network, statik içerikleri kullanıcıya en yakın sunucudan sunar.

## 5. Veritabanı Optimizasyonu

Düzenli veritabanı temizliği ve optimizasyonu performansı artırır.

## 6. Gereksiz Eklentileri Kaldırın

Her eklenti site hızını etkiler. Kullanmadığınız eklentileri devre dışı bırakın ve silin.

## 7. Güncel Kalın

WordPress, tema ve eklentilerinizi güncel tutun. Güncellemeler genellikle performans iyileştirmeleri içerir.

## 8. GZIP Sıkıştırma

GZIP sıkıştırma, dosya boyutlarını %70'e kadar azaltabilir.

## 9. HTTP/2 ve HTTP/3

Modern protokoller, sayfa yükleme hızını önemli ölçüde artırır.

## 10. Gereksiz Scriptleri Temizleyin

Kullanılmayan CSS ve JavaScript dosyalarını temizleyin veya ertelenen yükleme uygulayın.

## Sonuç

Bu optimizasyonları uygulayarak WordPress sitenizin hızını 2-3 kat artırabilirsiniz. Hızlı bir site, hem kullanıcı deneyimini iyileştirir hem de SEO'nuzu güçlendirir.
    `,
  },
  "ssl-sertifikasi-nedir": {
    title: "SSL Sertifikası Nedir ve Neden Önemlidir?",
    excerpt: "Web sitenizin güvenliği için SSL sertifikasının önemi ve doğru sertifika seçimi hakkında bilmeniz gerekenler.",
    category: "Güvenlik",
    author: "Mehmet Demir",
    authorRole: "Güvenlik Uzmanı",
    date: "10 Ocak 2024",
    readTime: "5 dk",
    tags: ["SSL", "Güvenlik", "HTTPS", "Sertifika"],
    content: `
İnternette güvenlik her zamankinden daha önemli. SSL sertifikası, web siteniz ile ziyaretçileriniz arasındaki iletişimi şifreleyerek güvenli bir bağlantı sağlar.

## SSL Nedir?

SSL (Secure Sockets Layer) ve modern versiyonu TLS (Transport Layer Security), internet üzerinden güvenli iletişim sağlayan kriptografik protokollerdir.

**SSL Ne Yapar?**
- Veri şifreleme
- Kimlik doğrulama
- Veri bütünlüğü

## Neden SSL Kullanmalısınız?

### 1. Güvenlik
SSL, hassas verilerin (şifreler, kredi kartı bilgileri) üçüncü taraflarca ele geçirilmesini önler.

### 2. SEO Avantajı
Google, HTTPS kullanan siteleri arama sonuçlarında önceliklendirir.

### 3. Kullanıcı Güveni
Tarayıcıdaki yeşil kilit simgesi, ziyaretçilere güven verir.

### 4. Yasal Zorunluluk
E-ticaret siteleri için PCI DSS uyumluluğu gerektirir.

## SSL Sertifika Türleri

### Domain Validation (DV)
- En temel doğrulama
- Hızlı onay
- Kişisel siteler için ideal

### Organization Validation (OV)
- Kuruluş doğrulaması
- Daha yüksek güven
- İşletmeler için önerilir

### Extended Validation (EV)
- En kapsamlı doğrulama
- Yeşil adres çubuğu
- E-ticaret ve finans için ideal

## Ücretsiz vs Ücretli SSL

**Let's Encrypt (Ücretsiz):**
- DV sertifikası
- 90 günlük geçerlilik
- Otomatik yenileme
- Kişisel siteler için yeterli

**Ücretli Sertifikalar:**
- OV ve EV seçenekleri
- Garanti ve destek
- Kurumsal kullanım için

## SSL Kurulumu

1. Sertifika satın alın veya Let's Encrypt kullanın
2. Sunucuya yükleyin
3. HTTPS yönlendirmesi ayarlayın
4. Mixed content hatalarını düzeltin

## Sonuç

SSL sertifikası, modern web için bir zorunluluktur. Doğru sertifika türünü seçerek web sitenizi ve ziyaretçilerinizi koruyun.
    `,
  },
  "vps-vs-paylasimli-hosting": {
    title: "VPS vs Paylaşımlı Hosting: Hangisini Seçmelisiniz?",
    excerpt: "Web siteniz için doğru hosting türünü seçmek kritik önem taşır. VPS ve paylaşımlı hosting arasındaki farkları inceleyin.",
    category: "Hosting",
    author: "Zeynep Arslan",
    authorRole: "Hosting Danışmanı",
    date: "8 Ocak 2024",
    readTime: "7 dk",
    tags: ["VPS", "Hosting", "Sunucu", "Karşılaştırma"],
    content: `
Hosting seçimi, web sitenizin performansını doğrudan etkiler. Paylaşımlı hosting ve VPS arasındaki farkları anlamak, doğru karar vermenize yardımcı olacaktır.

## Paylaşımlı Hosting Nedir?

Paylaşımlı hosting'de birden fazla web sitesi aynı sunucuyu ve kaynaklarını paylaşır.

**Avantajları:**
- Düşük maliyet
- Kolay kullanım
- Teknik bilgi gerektirmez
- Bakım hosting firması tarafından yapılır

**Dezavantajları:**
- Sınırlı kaynaklar
- Diğer sitelerden etkilenme
- Kısıtlı özelleştirme
- Performans dalgalanmaları

## VPS Nedir?

VPS (Virtual Private Server), fiziksel sunucunun sanallaştırılmış bölümüdür. Her VPS kendi işletim sistemi ve ayrılmış kaynaklarına sahiptir.

**Avantajları:**
- Garantili kaynaklar
- Root erişimi
- Tam özelleştirme
- Daha yüksek performans
- İzole ortam

**Dezavantajları:**
- Daha yüksek maliyet
- Teknik bilgi gerektirir
- Kendi güvenliğinizden siz sorumlusunuz

## Karşılaştırma Tablosu

| Özellik | Paylaşımlı | VPS |
|---------|-----------|-----|
| Fiyat | Düşük | Orta |
| Performans | Değişken | Tutarlı |
| Kaynaklar | Paylaşımlı | Ayrılmış |
| Root Erişim | Hayır | Evet |
| Ölçeklenebilirlik | Sınırlı | Yüksek |

## Ne Zaman Paylaşımlı Hosting?

- Yeni başlayan küçük web siteleri
- Düşük trafikli bloglar
- Kişisel projeler
- Sınırlı bütçe

## Ne Zaman VPS?

- Büyüyen web siteleri
- E-ticaret siteleri
- Yüksek trafik
- Özel yazılım ihtiyacı
- Performans kritik uygulamalar

## Sonuç

Başlangıç için paylaşımlı hosting yeterli olabilir, ancak siteniz büyüdükçe VPS'e geçiş düşünmelisiniz. İhtiyaçlarınızı değerlendirin ve buna göre karar verin.
    `,
  },
  "cpanel-kullanim-rehberi": {
    title: "cPanel Kullanım Rehberi: Başlangıçtan İleri Seviyeye",
    excerpt: "cPanel kontrol panelini etkin kullanmak için kapsamlı rehberimizi inceleyin.",
    category: "Rehber",
    author: "Ahmet Yılmaz",
    authorRole: "Teknik Yazar",
    date: "5 Ocak 2024",
    readTime: "10 dk",
    tags: ["cPanel", "Hosting", "Rehber", "Yönetim"],
    content: `
cPanel, web hosting hesabınızı yönetmek için kullanılan en popüler kontrol panelidir. Bu rehberde cPanel'in tüm özelliklerini keşfedeceksiniz.

## cPanel'e Giriş

cPanel'e erişmek için:
- https://domainadiniz.com:2083
- https://domainadiniz.com/cpanel

## Dosya Yönetimi

### File Manager
- Dosya yükleme/indirme
- Dosya düzenleme
- Klasör oluşturma
- İzinleri ayarlama

### FTP Hesapları
FTP istemcisi ile dosya transferi için hesap oluşturun.

## E-posta Yönetimi

### E-posta Hesapları
- Yeni hesap oluşturma
- Kota yönetimi
- Şifre değiştirme

### Forwarders
E-posta yönlendirmeleri ayarlayın.

### Spam Filtreleri
Apache SpamAssassin ile spam'ı engelleyin.

## Veritabanı Yönetimi

### MySQL Veritabanları
- Veritabanı oluşturma
- Kullanıcı ekleme
- Yetkilendirme

### phpMyAdmin
Veritabanını görsel arayüzle yönetin.

## Domain Yönetimi

### Addon Domains
Ek domainler ekleyin.

### Subdomains
Alt domainler oluşturun.

### DNS Zone Editor
DNS kayıtlarını düzenleyin.

## Güvenlik

### SSL/TLS
SSL sertifikası yönetin.

### IP Blocker
Belirli IP'leri engelleyin.

### Hotlink Protection
Görsel hırsızlığını önleyin.

## Yedekleme

### Backup
Tam site yedeği alın.

### Backup Wizard
Adım adım yedekleme sihirbazı.

## Sonuç

cPanel'i etkili kullanarak web sitenizi profesyonel şekilde yönetebilirsiniz. Düzenli yedekleme almayı ve güvenlik ayarlarını kontrol etmeyi unutmayın.
    `,
  },
  "ddos-saldirilari-korunma": {
    title: "DDoS Saldırılarından Korunma Yöntemleri",
    excerpt: "Web sitenizi DDoS saldırılarından korumak için alınması gereken önlemler ve en iyi uygulamalar.",
    category: "Güvenlik",
    author: "Elif Kaya",
    authorRole: "Siber Güvenlik Uzmanı",
    date: "3 Ocak 2024",
    readTime: "6 dk",
    tags: ["DDoS", "Güvenlik", "Saldırı", "Koruma"],
    content: `
DDoS (Distributed Denial of Service) saldırıları, web sitenizi erişilemez hale getirebilir. Bu saldırılardan korunmak için neler yapabileceğinizi öğrenin.

## DDoS Saldırısı Nedir?

DDoS saldırısı, birden fazla kaynaktan hedefe yoğun trafik göndererek sistemin çökmesine neden olmaktır.

## DDoS Saldırı Türleri

### Volumetrik Saldırılar
Bant genişliğini doldurarak erişimi engeller.

### Protokol Saldırıları
Sunucu kaynaklarını tüketir (SYN flood gibi).

### Uygulama Katmanı Saldırıları
Web uygulamasını hedef alır (HTTP flood).

## Korunma Yöntemleri

### 1. DDoS Koruma Hizmeti
Profesyonel DDoS mitigasyon hizmetleri kullanın.

### 2. CDN Kullanımı
Cloudflare gibi CDN'ler DDoS koruması sağlar.

### 3. Rate Limiting
İstek sayısını sınırlayın.

### 4. Web Application Firewall
WAF ile uygulama katmanı saldırılarını engelleyin.

### 5. Yedekli Altyapı
Çoklu sunucu ve load balancer kullanın.

## Saldırı Anında Ne Yapmalı?

1. Hosting sağlayıcınıza haber verin
2. Saldırı IP'lerini engelleyin
3. CDN/DDoS koruma aktifleştirin
4. Trafiği analiz edin

## Sonuç

DDoS saldırılarına karşı proaktif önlemler almak kritiktir. Güvenilir hosting ve koruma hizmetleri ile sitenizi güvende tutun.
    `,
  },
  "eticaret-hosting-secimi": {
    title: "E-ticaret Sitesi İçin Hosting Seçimi",
    excerpt: "Online mağazanız için doğru hosting altyapısını seçerken dikkat etmeniz gereken faktörler.",
    category: "E-ticaret",
    author: "Mehmet Demir",
    authorRole: "E-ticaret Danışmanı",
    date: "1 Ocak 2024",
    readTime: "8 dk",
    tags: ["E-ticaret", "Hosting", "Online Satış", "Performans"],
    content: `
E-ticaret sitesi için doğru hosting seçimi, online işinizin başarısını doğrudan etkiler. Bu rehberde e-ticaret hosting'de dikkat edilmesi gereken noktaları inceliyoruz.

## E-ticaret Hosting Gereksinimleri

### Performans
- Hızlı sayfa yükleme (3 saniyeden az)
- Yüksek uptime (%99.9+)
- Yeterli bant genişliği

### Güvenlik
- SSL sertifikası (zorunlu)
- PCI DSS uyumluluğu
- Düzenli güvenlik taraması
- DDoS koruması

### Ölçeklenebilirlik
- Trafik artışına uyum
- Esnek kaynak yönetimi
- Otomatik ölçeklendirme

## Hosting Türleri

### Paylaşımlı Hosting
- Küçük mağazalar için
- Düşük trafik
- Sınırlı ürün sayısı

### VPS Hosting
- Orta ölçekli mağazalar
- Daha fazla kontrol
- Özelleştirilebilir

### Dedicated Server
- Büyük e-ticaret siteleri
- Yüksek trafik
- Maksimum performans

### Cloud Hosting
- Esnek ölçeklendirme
- Yüksek erişilebilirlik
- Kullandıkça öde

## Platform Seçimi

### WooCommerce
WordPress tabanlı, esnek ve özelleştirilebilir.

### Magento
Büyük ölçekli e-ticaret için güçlü çözüm.

### PrestaShop
Kullanımı kolay, açık kaynak.

## Kontrol Listesi

- [ ] SSL sertifikası dahil mi?
- [ ] Yedekleme hizmeti var mı?
- [ ] Teknik destek 7/24 mü?
- [ ] Ölçeklendirme mümkün mü?
- [ ] CDN desteği var mı?

## Sonuç

E-ticaret siteniz için hosting seçerken güvenlik, performans ve ölçeklenebilirliği ön planda tutun. Doğru hosting, satışlarınızı artırır ve müşteri memnuniyetini sağlar.
    `,
  },
};

// Related posts for sidebar
const relatedPosts = [
  { title: "WordPress Hızlandırma İpuçları", slug: "wordpress-hizlandirma-ipuclari" },
  { title: "SSL Sertifikası Nedir?", slug: "ssl-sertifikasi-nedir" },
  { title: "VPS vs Paylaşımlı Hosting", slug: "vps-vs-paylasimli-hosting" },
  { title: "cPanel Kullanım Rehberi", slug: "cpanel-kullanim-rehberi" },
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Topbar />
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Yazı Bulunamadı</h1>
            <Link href="/blog">
              <Button>Blog'a Dön</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get other posts for "more posts" section
  const otherPosts = Object.entries(blogPosts)
    .filter(([key]) => key !== slug)
    .slice(0, 3)
    .map(([key, value]) => ({ slug: key, ...value }));

  return (
    <div className="flex min-h-screen flex-col">
      <Topbar />
      <Header />
      <main className="flex-1">
        {/* Article Header */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <Link href="/blog" className="hover:text-foreground">
                    Blog
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span>{post.category}</span>
                </nav>

                {/* Category & Read Time */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {post.category}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime} okuma
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-lg text-muted-foreground mb-6">
                  {post.excerpt}
                </p>

                {/* Author & Date */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{post.author}</p>
                      <p className="text-sm text-muted-foreground">{post.authorRole}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-4 max-w-6xl mx-auto">
              {/* Main Content */}
              <BlurFade delay={0.2} inView className="lg:col-span-3">
                <Card>
                  <CardContent className="p-6 md:p-10">
                    <article className="prose prose-gray dark:prose-invert max-w-none">
                      {post.content.split('\n').map((line, idx) => {
                        if (line.startsWith('## ')) {
                          return <h2 key={idx} className="text-2xl font-bold mt-10 mb-4">{line.replace('## ', '')}</h2>;
                        }
                        if (line.startsWith('### ')) {
                          return <h3 key={idx} className="text-xl font-semibold mt-8 mb-3">{line.replace('### ', '')}</h3>;
                        }
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return <p key={idx} className="font-semibold mt-4 mb-2">{line.replace(/\*\*/g, '')}</p>;
                        }
                        if (line.startsWith('- ')) {
                          return <li key={idx} className="ml-4 mb-1">{line.replace('- ', '')}</li>;
                        }
                        if (line.startsWith('|')) {
                          return null; // Skip table formatting for simplicity
                        }
                        if (line.trim() === '') {
                          return <br key={idx} />;
                        }
                        return <p key={idx} className="mb-4 text-muted-foreground leading-relaxed">{line}</p>;
                      })}
                    </article>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2 mt-10 pt-8 border-t">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog/etiket/${tag.toLowerCase()}`}
                          className="px-3 py-1 rounded-full bg-muted text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>

                    {/* Share */}
                    <div className="flex items-center gap-4 mt-6 pt-6 border-t">
                      <span className="text-sm text-muted-foreground">Paylaş:</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <Facebook className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </Button>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Author Box */}
                <Card className="mt-8">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{post.author}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{post.authorRole}</p>
                        <p className="text-sm text-muted-foreground">
                          Web hosting ve dijital teknolojiler konusunda uzman yazar.
                          Teknik konuları anlaşılır şekilde aktarmayı seviyor.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>

              {/* Sidebar */}
              <BlurFade delay={0.3} inView className="space-y-6">
                {/* Related Posts */}
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      İlgili Yazılar
                    </h3>
                    <ul className="space-y-3">
                      {relatedPosts.filter(p => p.slug !== slug).slice(0, 4).map((related) => (
                        <li key={related.slug}>
                          <Link
                            href={`/blog/${related.slug}`}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                          >
                            <ChevronRight className="h-3 w-3" />
                            {related.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Back to Blog */}
                <Link href="/blog">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Tüm Yazılar
                  </Button>
                </Link>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* More Posts */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-8">Diğer Yazılar</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {otherPosts.map((otherPost) => (
                    <Card key={otherPost.slug} className="overflow-hidden hover:border-primary/50 transition-colors">
                      <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                        <BookOpen className="h-10 w-10 text-muted-foreground/50" />
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            {otherPost.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {otherPost.readTime}
                          </span>
                        </div>
                        <h3 className="font-semibold mb-2 line-clamp-2">
                          <Link href={`/blog/${otherPost.slug}`} className="hover:text-primary transition-colors">
                            {otherPost.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {otherPost.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </BlurFade>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
