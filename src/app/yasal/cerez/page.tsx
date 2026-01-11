"use client";

import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Cookie, Shield, Settings, BarChart3, Users, Mail, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const sections = [
  { id: "genel", title: "Çerez Nedir?" },
  { id: "kullanim", title: "Çerez Kullanımımız" },
  { id: "zorunlu", title: "Zorunlu Çerezler" },
  { id: "performans", title: "Performans Çerezleri" },
  { id: "islevsel", title: "İşlevsel Çerezler" },
  { id: "hedefleme", title: "Hedefleme Çerezleri" },
  { id: "ucuncu", title: "Üçüncü Taraf Çerezleri" },
  { id: "yonetim", title: "Çerez Yönetimi" },
  { id: "iletisim", title: "İletişim" },
];

const highlights = [
  {
    icon: Shield,
    title: "Gizlilik Odaklı",
    description: "Verileriniz güvende",
  },
  {
    icon: Settings,
    title: "Tam Kontrol",
    description: "Çerez tercihlerinizi yönetin",
  },
  {
    icon: BarChart3,
    title: "Şeffaf Kullanım",
    description: "Hangi verileri topladığımızı bilin",
  },
];

const cookieTypes = [
  {
    type: "Zorunlu",
    icon: Shield,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    description: "Site işlevselliği için gerekli",
    examples: ["Oturum yönetimi", "Güvenlik", "Yük dengeleme"],
    canDisable: false,
  },
  {
    type: "Performans",
    icon: BarChart3,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    description: "Site performansını ölçmek için",
    examples: ["Sayfa görüntüleme", "Hata izleme", "Yükleme süreleri"],
    canDisable: true,
  },
  {
    type: "İşlevsel",
    icon: Settings,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    description: "Gelişmiş özellikler için",
    examples: ["Dil tercihi", "Tema seçimi", "Konum bilgisi"],
    canDisable: true,
  },
  {
    type: "Hedefleme",
    icon: Users,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    description: "Kişiselleştirilmiş içerik için",
    examples: ["Reklam tercihleri", "Sosyal medya", "Pazarlama"],
    canDisable: true,
  },
];

const thirdPartyCookies = [
  { name: "Google Analytics", purpose: "Site trafiği analizi", website: "analytics.google.com" },
  { name: "Google Tag Manager", purpose: "Etiket yönetimi", website: "tagmanager.google.com" },
  { name: "Cloudflare", purpose: "Güvenlik ve performans", website: "cloudflare.com" },
  { name: "Crisp", purpose: "Canlı destek", website: "crisp.chat" },
];

const otherPolicies = [
  { title: "Kullanım Koşulları", href: "/yasal/kullanim-kosullari" },
  { title: "Gizlilik Politikası", href: "/yasal/gizlilik" },
  { title: "İade Koşulları", href: "/yasal/iade-kosullari" },
  { title: "KVKK Aydınlatma", href: "/yasal/kvkk" },
];

export default function CerezPolitikasiPage() {
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
                  <Cookie className="h-4 w-4" />
                  Yasal
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Çerez Politikası
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Web sitemizde çerezleri nasıl kullandığımız hakkında bilgi edinin.
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
                      <h2>1. Çerez Nedir?</h2>
                      <p>
                        Çerezler, web sitelerinin tarayıcınıza yerleştirdiği küçük metin dosyalarıdır.
                        Bu dosyalar, sizi tanımak, tercihlerinizi hatırlamak ve size daha iyi bir
                        deneyim sunmak için kullanılır.
                      </p>
                      <p>
                        Çerezler genellikle şu bilgileri içerir:
                      </p>
                      <ul>
                        <li>Çerezi oluşturan web sitesinin adı</li>
                        <li>Çerezin ömrü (ne kadar süre saklanacağı)</li>
                        <li>Rastgele oluşturulmuş benzersiz bir numara</li>
                      </ul>
                    </section>

                    <section id="kullanim">
                      <h2>2. Çerez Kullanımımız</h2>
                      <p>
                        KLEACORE olarak çerezleri aşağıdaki amaçlarla kullanmaktayız:
                      </p>
                      <ul>
                        <li>Web sitemizin düzgün çalışmasını sağlamak</li>
                        <li>Oturum bilgilerinizi güvenli şekilde saklamak</li>
                        <li>Tercihlerinizi hatırlamak (dil, tema vb.)</li>
                        <li>Site performansını analiz etmek ve iyileştirmek</li>
                        <li>Size kişiselleştirilmiş içerik sunmak</li>
                      </ul>
                    </section>

                    <section id="zorunlu">
                      <h2>3. Zorunlu Çerezler</h2>
                      <p>
                        Bu çerezler web sitemizin temel işlevlerini yerine getirmesi için gereklidir.
                        Bu çerezler olmadan site düzgün çalışmaz.
                      </p>
                      <Card className="not-prose my-6">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 shrink-0">
                              <Shield className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                              <p className="font-medium">Zorunlu Çerezler</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Bu çerezler devre dışı bırakılamaz.
                              </p>
                              <div className="mt-3 flex flex-wrap gap-2">
                                <span className="text-xs bg-muted px-2 py-1 rounded">Oturum yönetimi</span>
                                <span className="text-xs bg-muted px-2 py-1 rounded">CSRF koruması</span>
                                <span className="text-xs bg-muted px-2 py-1 rounded">Yük dengeleme</span>
                                <span className="text-xs bg-muted px-2 py-1 rounded">Sepet bilgileri</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </section>

                    <section id="performans">
                      <h2>4. Performans Çerezleri</h2>
                      <p>
                        Bu çerezler, ziyaretçilerin sitemizi nasıl kullandığını anlamamıza yardımcı olur.
                        Toplanan veriler anonim olarak işlenir.
                      </p>
                      <ul>
                        <li>Hangi sayfaların en çok ziyaret edildiği</li>
                        <li>Kullanıcıların sitede geçirdiği süre</li>
                        <li>Hata mesajları ve teknik sorunlar</li>
                        <li>Sayfa yükleme süreleri</li>
                      </ul>
                    </section>

                    <section id="islevsel">
                      <h2>5. İşlevsel Çerezler</h2>
                      <p>
                        Bu çerezler, size daha kişiselleştirilmiş bir deneyim sunmamızı sağlar:
                      </p>
                      <ul>
                        <li>Dil ve bölge tercihleriniz</li>
                        <li>Tema ayarlarınız (açık/koyu mod)</li>
                        <li>Daha önce görüntülediğiniz ürünler</li>
                        <li>Form bilgilerinin hatırlanması</li>
                      </ul>
                    </section>

                    <section id="hedefleme">
                      <h2>6. Hedefleme ve Reklam Çerezleri</h2>
                      <p>
                        Bu çerezler, ilgi alanlarınıza uygun içerik ve reklamlar göstermek için kullanılır:
                      </p>
                      <ul>
                        <li>İlgi alanlarınıza göre reklam gösterimi</li>
                        <li>Reklam performansının ölçülmesi</li>
                        <li>Sosyal medya entegrasyonu</li>
                        <li>Yeniden pazarlama kampanyaları</li>
                      </ul>
                      <p>
                        Bu çerezleri tarayıcı ayarlarınızdan veya çerez tercih merkezimizden
                        devre dışı bırakabilirsiniz.
                      </p>
                    </section>

                    <section id="ucuncu">
                      <h2>7. Üçüncü Taraf Çerezleri</h2>
                      <p>
                        Web sitemizde aşağıdaki üçüncü taraf hizmetlerinin çerezleri bulunabilir:
                      </p>
                      <Card className="not-prose my-6">
                        <CardContent className="p-0 divide-y">
                          {thirdPartyCookies.map((cookie) => (
                            <div key={cookie.name} className="p-4">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">{cookie.name}</p>
                                <span className="text-xs text-muted-foreground">{cookie.website}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{cookie.purpose}</p>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                      <p>
                        Bu hizmetlerin gizlilik politikaları için ilgili web sitelerini ziyaret edebilirsiniz.
                      </p>
                    </section>

                    <section id="yonetim">
                      <h2>8. Çerez Yönetimi</h2>
                      <p>
                        Çerezleri aşağıdaki yöntemlerle yönetebilirsiniz:
                      </p>

                      <h3>Tarayıcı Ayarları</h3>
                      <p>
                        Tarayıcınızın ayarlarından çerezleri engelleyebilir veya silebilirsiniz:
                      </p>
                      <ul>
                        <li><strong>Chrome:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler</li>
                        <li><strong>Firefox:</strong> Ayarlar → Gizlilik ve Güvenlik → Çerezler</li>
                        <li><strong>Safari:</strong> Tercihler → Gizlilik → Çerezler</li>
                        <li><strong>Edge:</strong> Ayarlar → Gizlilik → Çerezler</li>
                      </ul>

                      <h3>Çerez Tercih Merkezi</h3>
                      <p>
                        Web sitemizin alt kısmındaki &quot;Çerez Ayarları&quot; bağlantısına tıklayarak
                        tercihlerinizi istediğiniz zaman değiştirebilirsiniz.
                      </p>

                      <Card className="not-prose my-6 border-amber-500/50 bg-amber-500/5">
                        <CardContent className="p-4">
                          <p className="font-medium text-amber-600 dark:text-amber-400 mb-2">Önemli Uyarı</p>
                          <p className="text-sm text-muted-foreground">
                            Zorunlu çerezleri devre dışı bırakmanız durumunda web sitemizin bazı
                            özellikleri düzgün çalışmayabilir. Örneğin, oturum açık kalmayabilir veya
                            sepetinizdeki ürünler kaybolabilir.
                          </p>
                        </CardContent>
                      </Card>
                    </section>

                    <section id="iletisim">
                      <h2>9. İletişim</h2>
                      <p>
                        Çerez politikamız hakkında sorularınız için:
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
                              <a href="mailto:privacy@kleacore.com" className="text-sm text-primary hover:underline mt-2 inline-block">
                                privacy@kleacore.com
                              </a>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <p className="text-sm text-muted-foreground">
                        Bu politika, yasal gereklilikler veya hizmetlerimizdeki değişiklikler nedeniyle
                        güncellenebilir. Önemli değişikliklerde sizi bilgilendireceğiz.
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
