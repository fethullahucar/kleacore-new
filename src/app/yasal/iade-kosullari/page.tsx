"use client";

import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { RotateCcw, Clock, CheckCircle, XCircle, CreditCard, Mail, ChevronRight, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const sections = [
  { id: "genel", title: "Genel Bilgiler" },
  { id: "kapsam", title: "İade Kapsamı" },
  { id: "sureler", title: "İade Süreleri" },
  { id: "kosullar", title: "İade Koşulları" },
  { id: "istisna", title: "İade Dışı Hizmetler" },
  { id: "talep", title: "İade Talebi Nasıl Yapılır" },
  { id: "odeme", title: "Ödeme İadesi" },
  { id: "iptal", title: "Hizmet İptali" },
  { id: "iletisim", title: "İletişim" },
];

const highlights = [
  {
    icon: Clock,
    title: "30 Gün Garanti",
    description: "Koşulsuz para iade garantisi",
  },
  {
    icon: CreditCard,
    title: "Hızlı İade",
    description: "7-14 iş günü içinde ödeme",
  },
  {
    icon: CheckCircle,
    title: "Kolay Süreç",
    description: "Tek tıkla iptal ve iade",
  },
];

const refundableServices = [
  { name: "Linux Hosting", period: "30 gün" },
  { name: "WordPress Hosting", period: "30 gün" },
  { name: "Kurumsal Hosting", period: "30 gün" },
  { name: "Reseller Hosting", period: "30 gün" },
  { name: "VDS Sunucu", period: "14 gün" },
  { name: "VPS Sunucu", period: "14 gün" },
  { name: "Bulut Sunucu", period: "7 gün" },
];

const nonRefundableServices = [
  "Alan adı kayıt ve transfer ücretleri",
  "SSL sertifikaları",
  "Lisans ücretleri (cPanel, Plesk, vb.)",
  "Kurulum ve yapılandırma hizmetleri",
  "Özel geliştirme hizmetleri",
  "Fiziksel sunucu ve colocation",
  "IP adresi ve ASN tahsisleri",
  "CDN hizmetleri",
];

const otherPolicies = [
  { title: "Kullanım Koşulları", href: "/yasal/kullanim-kosullari" },
  { title: "Gizlilik Politikası", href: "/yasal/gizlilik" },
  { title: "KVKK Aydınlatma", href: "/yasal/kvkk" },
];

export default function IadeKosullariPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Topbar />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background border-b">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border-primary/30 border px-4 py-1.5 text-sm font-medium text-primary mb-4">
                  <RotateCcw className="h-4 w-4" />
                  Yasal
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  İade Koşulları
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Hizmetlerimizden memnun kalmamanız durumunda geçerli olan iade politikamız.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Son güncelleme: 1 Ocak 2024
                </p>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-8 border-b bg-muted/30">
          <div className="container">
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.title} className="flex items-center gap-3 p-4 rounded-lg bg-background border">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid lg:grid-cols-[250px_1fr] gap-12">
              {/* Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <p className="text-sm font-medium mb-4">İçindekiler</p>
                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="block text-sm text-muted-foreground hover:text-foreground py-1.5 transition-colors"
                      >
                        {section.title}
                      </a>
                    ))}
                  </nav>

                  <div className="mt-8 pt-8 border-t">
                    <p className="text-sm font-medium mb-4">Diğer Politikalar</p>
                    <nav className="space-y-1">
                      {otherPolicies.map((policy) => (
                        <Link
                          key={policy.href}
                          href={policy.href}
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground py-1.5 transition-colors"
                        >
                          {policy.title}
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <div className="max-w-3xl">
                <BlurFade delay={0.2} inView>
                  <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24">
                    <section id="genel">
                      <h2>1. Genel Bilgiler</h2>
                      <p>
                        KLEACORE (KLEAWORK DIGITAL LLC) olarak müşteri memnuniyetini ön planda tutuyoruz.
                        Hizmetlerimizden herhangi bir nedenle memnun kalmamanız durumunda, belirli koşullar
                        dahilinde ödemenizin iadesini talep edebilirsiniz.
                      </p>
                      <p>
                        Bu politika, tüm hosting, sunucu ve ilgili hizmetlerimiz için geçerlidir.
                        İade talebinde bulunmadan önce lütfen aşağıdaki koşulları dikkatlice okuyunuz.
                      </p>
                    </section>

                    <section id="kapsam">
                      <h2>2. İade Kapsamındaki Hizmetler</h2>
                      <p>
                        Aşağıdaki hizmetler para iade garantisi kapsamındadır:
                      </p>
                      <Card className="not-prose my-6">
                        <CardContent className="p-0 divide-y">
                          {refundableServices.map((service) => (
                            <div key={service.name} className="p-4 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="font-medium">{service.name}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{service.period}</span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </section>

                    <section id="sureler">
                      <h2>3. İade Süreleri</h2>
                      <p>
                        İade talepleri, hizmet aktivasyonundan itibaren belirtilen süreler içinde yapılmalıdır:
                      </p>
                      <ul>
                        <li><strong>Paylaşımlı Hosting:</strong> İlk 30 gün içinde tam iade</li>
                        <li><strong>VDS/VPS Sunucu:</strong> İlk 14 gün içinde tam iade</li>
                        <li><strong>Bulut Sunucu:</strong> İlk 7 gün içinde tam iade</li>
                        <li><strong>Yenileme Ödemeleri:</strong> Yenileme sonrası 48 saat içinde iade</li>
                      </ul>
                      <Card className="not-prose my-6 border-amber-500/50 bg-amber-500/5">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                            <div>
                              <p className="font-medium text-amber-600 dark:text-amber-400">Önemli Uyarı</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                İade süreleri hizmet aktivasyonundan itibaren başlar. Sipariş tarihi değil,
                                hizmetin aktif edildiği tarih esas alınır.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </section>

                    <section id="kosullar">
                      <h2>4. İade Koşulları</h2>
                      <p>
                        İade talebinin onaylanması için aşağıdaki koşulların sağlanması gerekmektedir:
                      </p>
                      <ul>
                        <li>Hizmet, ilk kez satın alınmış olmalıdır (yenileme değil)</li>
                        <li>Hesap, kullanım koşullarına aykırı kullanılmamış olmalıdır</li>
                        <li>Hesap, spam veya kötü amaçlı yazılım nedeniyle askıya alınmamış olmalıdır</li>
                        <li>İade talebi, belirtilen süre içinde yapılmış olmalıdır</li>
                        <li>Aynı müşteri tarafından daha önce aynı hizmet için iade alınmamış olmalıdır</li>
                      </ul>
                      <p>
                        KLEACORE, şüpheli veya kötüye kullanım amaçlı iade taleplerini reddetme
                        hakkını saklı tutar.
                      </p>
                    </section>

                    <section id="istisna">
                      <h2>5. İade Dışı Hizmetler</h2>
                      <p>
                        Aşağıdaki hizmetler ve ürünler hiçbir koşulda iade kapsamında değildir:
                      </p>
                      <Card className="not-prose my-6 border-destructive/50 bg-destructive/5">
                        <CardContent className="p-4">
                          <p className="font-medium text-destructive mb-3">İade Yapılamayan Hizmetler</p>
                          <ul className="space-y-2 text-sm">
                            {nonRefundableServices.map((service) => (
                              <li key={service} className="flex items-start gap-2">
                                <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                                <span>{service}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                      <p>
                        Alan adı kayıtları, kayıt kuruluşlarına (registry) yapılan ödemeler nedeniyle
                        iade edilemez. SSL sertifikaları, sertifika otoritelerine yapılan ödemeler
                        nedeniyle iade kapsamı dışındadır.
                      </p>
                    </section>

                    <section id="talep">
                      <h2>6. İade Talebi Nasıl Yapılır</h2>
                      <p>
                        İade talebinde bulunmak için aşağıdaki adımları izleyebilirsiniz:
                      </p>
                      <Card className="not-prose my-6">
                        <CardContent className="p-0 divide-y">
                          <div className="p-4 flex items-start gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm shrink-0">
                              1
                            </div>
                            <div>
                              <p className="font-medium">Müşteri Paneline Giriş</p>
                              <p className="text-sm text-muted-foreground">panel.kleacore.com adresinden hesabınıza giriş yapın</p>
                            </div>
                          </div>
                          <div className="p-4 flex items-start gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm shrink-0">
                              2
                            </div>
                            <div>
                              <p className="font-medium">Destek Talebi Açın</p>
                              <p className="text-sm text-muted-foreground">Destek bölümünden &quot;İade Talebi&quot; konulu yeni bir ticket oluşturun</p>
                            </div>
                          </div>
                          <div className="p-4 flex items-start gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm shrink-0">
                              3
                            </div>
                            <div>
                              <p className="font-medium">Bilgileri Sağlayın</p>
                              <p className="text-sm text-muted-foreground">Hizmet adı, sipariş numarası ve iade nedeninizi belirtin</p>
                            </div>
                          </div>
                          <div className="p-4 flex items-start gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm shrink-0">
                              4
                            </div>
                            <div>
                              <p className="font-medium">Onay Bekleyin</p>
                              <p className="text-sm text-muted-foreground">Talebiniz 24-48 saat içinde değerlendirilecektir</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <p>
                        Alternatif olarak <a href="mailto:support@kleacore.com">support@kleacore.com</a> adresine
                        e-posta göndererek de iade talebinde bulunabilirsiniz.
                      </p>
                    </section>

                    <section id="odeme">
                      <h2>7. Ödeme İadesi</h2>
                      <p>
                        Onaylanan iade talepleri için ödeme iadesi aşağıdaki şekilde yapılır:
                      </p>
                      <ul>
                        <li><strong>Kredi Kartı:</strong> Ödeme yapılan karta 7-14 iş günü içinde</li>
                        <li><strong>Banka Havalesi/EFT:</strong> Belirtilen hesaba 3-5 iş günü içinde</li>
                        <li><strong>Hesap Bakiyesi:</strong> Anında hesap bakiyesine yüklenir</li>
                      </ul>
                      <p>
                        İade tutarından, varsa kullanılan kaynak bedeli ve işlem masrafları düşülebilir.
                        Kısmi kullanım durumunda orantılı iade yapılabilir.
                      </p>
                    </section>

                    <section id="iptal">
                      <h2>8. Hizmet İptali</h2>
                      <p>
                        İade talebiniz onaylandığında ilgili hizmet otomatik olarak iptal edilir:
                      </p>
                      <ul>
                        <li>Tüm verileriniz 7 gün içinde silinir</li>
                        <li>Silinen veriler kurtarılamaz</li>
                        <li>Alan adları (varsa) serbest bırakılır veya transfer edilebilir</li>
                        <li>E-posta hesapları ve içerikleri silinir</li>
                      </ul>
                      <Card className="not-prose my-6 border-amber-500/50 bg-amber-500/5">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                            <div>
                              <p className="font-medium text-amber-600 dark:text-amber-400">Veri Yedekleme</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                İade talebi yapmadan önce tüm verilerinizi yedeklemenizi önemle tavsiye ederiz.
                                İptal sonrası verilerinize erişim mümkün olmayacaktır.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </section>

                    <section id="iletisim">
                      <h2>9. İletişim</h2>
                      <p>
                        İade politikamız hakkında sorularınız için:
                      </p>

                      <Card className="not-prose my-6">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <Mail className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">KLEAWORK DIGITAL LLC</p>
                              <p className="text-sm text-muted-foreground mt-1">30 N Gould St Ste R, Sheridan, WY 82801, USA</p>
                              <p className="text-sm text-muted-foreground">EIN: 36-5157418</p>
                              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2">
                                <a href="mailto:support@kleacore.com" className="text-sm text-primary hover:underline">
                                  support@kleacore.com
                                </a>
                                <a href="mailto:billing@kleacore.com" className="text-sm text-primary hover:underline">
                                  billing@kleacore.com
                                </a>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <p className="text-sm text-muted-foreground">
                        Bu politikadan doğan uyuşmazlıklarda Amerika Birleşik Devletleri
                        Wyoming eyaleti kanunları uygulanır.
                      </p>
                    </section>
                  </div>
                </BlurFade>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
