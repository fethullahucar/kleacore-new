"use client";

import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Shield, Download, Globe, Lock, FileText, Mail, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const sections = [
  { id: "veri-sorumlusu", title: "Veri Sorumlusu" },
  { id: "toplanan-veriler", title: "Toplanan Veriler" },
  { id: "hukuki-dayanak", title: "Hukuki Dayanak" },
  { id: "haklariniz", title: "Haklarınız" },
  { id: "veri-saklama", title: "Veri Saklama" },
  { id: "guvenlik", title: "Veri Güvenliği" },
  { id: "uluslararasi", title: "Uluslararası Transferler" },
  { id: "iletisim", title: "İletişim" },
];

const highlights = [
  {
    icon: Shield,
    title: "KVKK Uyumlu",
    description: "6698 sayılı kanuna tam uyum",
  },
  {
    icon: Globe,
    title: "GDPR Uyumlu",
    description: "AB veri koruma standartları",
  },
  {
    icon: Lock,
    title: "Güvenli İşleme",
    description: "Şifreli veri transferi",
  },
];

const otherPolicies = [
  { title: "Gizlilik Politikası", href: "/yasal/gizlilik" },
  { title: "Kullanım Koşulları", href: "/yasal/kullanim-kosullari" },
];

const dataCategories = [
  {
    title: "Kimlik Bilgileri",
    items: ["Ad, soyad", "Kullanıcı adı", "Hesap bilgileri (şifrelenmiş)"],
  },
  {
    title: "İletişim Bilgileri",
    items: ["E-posta adresi", "Telefon numarası (opsiyonel)", "Fatura adresi"],
  },
  {
    title: "Finansal Bilgiler",
    items: ["Ödeme kartı bilgileri (güvenli işlemci)", "Fatura geçmişi", "İşlem kayıtları"],
  },
  {
    title: "Teknik Bilgiler",
    items: ["IP adresi", "Tarayıcı türü ve sürümü", "Erişim logları", "Çerez verileri"],
  },
];

const rights = [
  {
    title: "Bilgi Edinme",
    description: "Kişisel verilerinizin işlenip işlenmediğini öğrenme",
  },
  {
    title: "Erişim",
    description: "İşlenen verilere erişim ve kopya talep etme",
  },
  {
    title: "Düzeltme",
    description: "Eksik veya yanlış verilerin düzeltilmesini isteme",
  },
  {
    title: "Silme",
    description: "Verilerin silinmesini veya yok edilmesini talep etme",
  },
  {
    title: "Aktarım",
    description: "Verilerinizi taşınabilir formatta alma",
  },
  {
    title: "İtiraz",
    description: "Aleyhinize sonuçlanan işlemlere itiraz etme",
  },
];

export default function KVKKPage() {
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
                  <Shield className="h-4 w-4" />
                  Veri Koruma
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  KVKK Aydınlatma Metni
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  6698 Sayılı Kişisel Verilerin Korunması Kanunu kapsamında haklarınız ve verilerinizin işlenme koşulları.
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
                    <section id="veri-sorumlusu">
                      <h2>1. Veri Sorumlusu</h2>
                      <p>
                        KLEAWORK DIGITAL LLC, KLEACORE markası altında faaliyet gösteren
                        ve kişisel verilerinizin işlenmesinden sorumlu veri sorumlusudur.
                      </p>

                      <Card className="not-prose my-6">
                        <CardContent className="p-6">
                          <div className="grid sm:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Şirket</p>
                              <p className="font-medium">KLEAWORK DIGITAL LLC</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Marka</p>
                              <p className="font-medium">KLEACORE</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Adres</p>
                              <p className="font-medium">30 N Gould St Ste R, Sheridan, WY 82801, USA</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">EIN</p>
                              <p className="font-medium">36-5157418</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </section>

                    <section id="toplanan-veriler">
                      <h2>2. Toplanan Kişisel Veriler</h2>
                      <p>
                        Aşağıdaki kategorilerde kişisel veriler toplanmakta ve işlenmektedir:
                      </p>

                      <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
                        {dataCategories.map((category) => (
                          <Card key={category.title}>
                            <CardContent className="p-4">
                              <p className="font-medium mb-2">{category.title}</p>
                              <ul className="space-y-1">
                                {category.items.map((item) => (
                                  <li key={item} className="text-sm text-muted-foreground">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </section>

                    <section id="hukuki-dayanak">
                      <h2>3. İşlemenin Hukuki Dayanağı</h2>
                      <p>Kişisel verileriniz aşağıdaki hukuki dayanaklara göre işlenmektedir:</p>
                      <ul>
                        <li><strong>Sözleşmenin ifası:</strong> Hizmet sunumu için gerekli işlemler</li>
                        <li><strong>Yasal yükümlülük:</strong> Vergi, muhasebe ve düzenleyici uyum</li>
                        <li><strong>Meşru menfaat:</strong> Güvenlik ve dolandırıcılık önleme</li>
                        <li><strong>Açık rıza:</strong> Pazarlama iletişimleri</li>
                      </ul>
                    </section>

                    <section id="haklariniz">
                      <h2>4. Haklarınız</h2>
                      <p>
                        KVKK ve GDPR kapsamında aşağıdaki haklara sahipsiniz:
                      </p>

                      <div className="not-prose grid sm:grid-cols-2 gap-3 my-6">
                        {rights.map((right) => (
                          <div key={right.title} className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                              <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{right.title}</p>
                              <p className="text-xs text-muted-foreground">{right.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section id="veri-saklama">
                      <h2>5. Veri Saklama Süreleri</h2>
                      <p>
                        Kişisel verileriniz, hizmet sunumu için gerekli olan süre boyunca
                        ve yasal yükümlülüklerimize uygun olarak saklanır. Hesap verileri,
                        hizmet ilişkisi süresince ve yasal saklama süresi boyunca muhafaza edilir.
                      </p>
                    </section>

                    <section id="guvenlik">
                      <h2>6. Veri Güvenliği</h2>
                      <p>
                        Kişisel verilerinizi korumak için uygun teknik ve organizasyonel
                        önlemler uygulamaktayız:
                      </p>
                      <ul>
                        <li>Aktarım sırasında SSL/TLS şifreleme</li>
                        <li>Hassas veriler için depolama şifrelemesi</li>
                        <li>Erişim kontrolleri ve kimlik doğrulama</li>
                        <li>Düzenli güvenlik denetimleri</li>
                        <li>Veri koruma eğitimleri</li>
                      </ul>
                    </section>

                    <section id="uluslararasi">
                      <h2>7. Uluslararası Veri Transferleri</h2>
                      <p>
                        Verileriniz Amerika Birleşik Devletleri&apos;ne aktarılabilir ve burada
                        işlenebilir. Uluslararası veri aktarımları için yürürlükteki
                        mevzuata uygun güvenceler sağlanmaktadır.
                      </p>
                    </section>

                    <section id="iletisim">
                      <h2>8. İletişim</h2>
                      <p>
                        Bu aydınlatma metni hakkında sorularınız veya haklarınızı
                        kullanmak için:
                      </p>

                      <Card className="not-prose my-6">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <Mail className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Veri Koruma İletişim</p>
                              <a href="mailto:privacy@kleacore.com" className="text-sm text-primary hover:underline">
                                privacy@kleacore.com
                              </a>
                              <p className="text-sm text-muted-foreground mt-2">
                                30 N Gould St Ste R, Sheridan, WY 82801, USA
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </section>

                    {/* Download Section */}
                    <Card className="not-prose mt-8">
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-4">Başvuru Formları</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Haklarınızı kullanmak için aşağıdaki formları indirebilirsiniz:
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button variant="outline" className="flex-1">
                            <Download className="mr-2 h-4 w-4" />
                            Bilgi Edinme Formu
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Download className="mr-2 h-4 w-4" />
                            Silme Talep Formu
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
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
