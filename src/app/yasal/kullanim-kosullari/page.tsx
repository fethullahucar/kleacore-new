"use client";

import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { FileText, Shield, CreditCard, AlertTriangle, Mail, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const sections = [
  { id: "genel", title: "Genel Hükümler" },
  { id: "hizmetler", title: "Hizmet Tanımları" },
  { id: "hesap", title: "Hesap Güvenliği" },
  { id: "aup", title: "Kabul Edilebilir Kullanım" },
  { id: "kaynak", title: "Kaynak Kullanımı" },
  { id: "odeme", title: "Ödeme Koşulları" },
  { id: "iade", title: "İade Politikası" },
  { id: "sla", title: "SLA Taahhüdü" },
  { id: "yedekleme", title: "Yedekleme" },
  { id: "sorumluluk", title: "Sorumluluk Sınırlaması" },
  { id: "iletisim", title: "İletişim" },
];

const highlights = [
  {
    icon: Shield,
    title: "%99.9 Uptime",
    description: "Hizmet seviyesi garantisi",
  },
  {
    icon: CreditCard,
    title: "30 Gün İade",
    description: "Para iade garantisi",
  },
  {
    icon: AlertTriangle,
    title: "Şeffaf Kurallar",
    description: "Net kullanım politikası",
  },
];

const otherPolicies = [
  { title: "Gizlilik Politikası", href: "/yasal/gizlilik" },
  { title: "KVKK Aydınlatma", href: "/yasal/kvkk" },
];

export default function KullanimKosullariPage() {
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
                  <FileText className="h-4 w-4" />
                  Yasal
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Kullanım Koşulları
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Hizmetlerimizi kullanırken geçerli olan kurallar ve koşullar.
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
                      <h2>1. Genel Hükümler</h2>
                      <p>
                        Bu Kullanım Koşulları, KLEACORE (KLEAWORK DIGITAL LLC) tarafından sunulan hosting,
                        sunucu, alan adı ve ilgili hizmetlerin kullanımını
                        düzenlemektedir. Hizmetlerimizi kullanarak bu koşulları kabul
                        etmiş sayılırsınız.
                      </p>
                    </section>

                    <section id="hizmetler">
                      <h2>2. Hizmet Tanımları</h2>
                      <p>KLEACORE aşağıdaki hizmetleri sunmaktadır:</p>
                      <Card className="not-prose my-6">
                        <CardContent className="p-0 divide-y">
                          <div className="p-4">
                            <p className="font-medium">Web Hosting</p>
                            <p className="text-sm text-muted-foreground">Paylaşımlı, VPS ve dedicated hosting çözümleri</p>
                          </div>
                          <div className="p-4">
                            <p className="font-medium">Alan Adı</p>
                            <p className="text-sm text-muted-foreground">Domain kayıt ve yönetim hizmetleri</p>
                          </div>
                          <div className="p-4">
                            <p className="font-medium">SSL Sertifikaları</p>
                            <p className="text-sm text-muted-foreground">DV, OV ve EV SSL sertifikaları</p>
                          </div>
                          <div className="p-4">
                            <p className="font-medium">Sunucu Barındırma</p>
                            <p className="text-sm text-muted-foreground">Colocation ve veri merkezi hizmetleri</p>
                          </div>
                        </CardContent>
                      </Card>
                    </section>

                    <section id="hesap">
                      <h2>3. Hesap Oluşturma ve Güvenlik</h2>
                      <p>
                        Hizmetlerimizi kullanmak için bir hesap oluşturmanız
                        gerekmektedir. Hesap oluşturma sırasında:
                      </p>
                      <ul>
                        <li>Doğru ve güncel bilgiler vermelisiniz</li>
                        <li>Hesap güvenliğinizden siz sorumlusunuz</li>
                        <li>Şifrenizi gizli tutmalısınız</li>
                        <li>Hesabınızdaki tüm aktivitelerden sorumlusunuz</li>
                        <li>Yetkisiz erişim durumunda derhal bizi bilgilendirmelisiniz</li>
                      </ul>
                    </section>

                    <section id="aup">
                      <h2>4. Kabul Edilebilir Kullanım Politikası</h2>
                      <p>Hizmetlerimizi kullanırken aşağıdaki faaliyetler yasaktır:</p>

                      <Card className="not-prose my-6 border-destructive/50 bg-destructive/5">
                        <CardContent className="p-4">
                          <p className="font-medium text-destructive mb-3">Yasaklanan Faaliyetler</p>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="text-destructive">x</span>
                              <span>Yasa dışı içerik barındırma veya dağıtma</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-destructive">x</span>
                              <span>Spam e-posta gönderimi</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-destructive">x</span>
                              <span>Telif hakkı ihlali</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-destructive">x</span>
                              <span>Kötü amaçlı yazılım dağıtımı</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-destructive">x</span>
                              <span>DDoS saldırıları veya ağ suistimali</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-destructive">x</span>
                              <span>Phishing veya dolandırıcılık faaliyetleri</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </section>

                    <section id="kaynak">
                      <h2>5. Kaynak Kullanımı</h2>
                      <p>
                        Paylaşımlı hosting hizmetlerinde kaynak kullanımı makul
                        sınırlar içinde olmalıdır:
                      </p>
                      <ul>
                        <li>CPU kullanımı diğer kullanıcıları etkilememelidir</li>
                        <li>Disk alanı ve bant genişliği limitlerine uyulmalıdır</li>
                        <li>Aşırı kaynak kullanımı hesap askıya alınmasına neden olabilir</li>
                        <li>Yoğun kaynak gerektiren projeler için VPS veya dedicated sunucu önerilir</li>
                      </ul>
                    </section>

                    <section id="odeme">
                      <h2>6. Ödeme Koşulları</h2>
                      <ul>
                        <li>Hizmet bedelleri peşin olarak tahsil edilir</li>
                        <li>Faturalar e-posta ile gönderilir</li>
                        <li>Ödemeler kredi kartı, banka havalesi veya EFT ile yapılabilir</li>
                        <li>Gecikmeli ödemelerde hizmet askıya alınabilir</li>
                        <li>30 günlük ödeme gecikmesinde hesap silinebilir</li>
                        <li>Fiyatlar KDV dahil veya hariç olarak belirtilir</li>
                      </ul>
                    </section>

                    <section id="iade">
                      <h2>7. İade Politikası</h2>
                      <p>
                        Yeni hosting hizmetlerinde 30 gün para iade garantisi
                        sunulmaktadır:
                      </p>
                      <Card className="not-prose my-6">
                        <CardContent className="p-4">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-sm mb-2 text-green-600 dark:text-green-400">İade Kapsamında</p>
                              <ul className="space-y-1 text-sm text-muted-foreground">
                                <li>Hosting paketleri</li>
                                <li>VPS sunucular</li>
                                <li>İlk 30 gün içinde talep</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-sm mb-2 text-destructive">İade Dışında</p>
                              <ul className="space-y-1 text-sm text-muted-foreground">
                                <li>Alan adı ücretleri</li>
                                <li>SSL sertifikaları</li>
                                <li>Özel yapılandırmalar</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </section>

                    <section id="sla">
                      <h2>8. Hizmet Seviyesi Taahhüdü (SLA)</h2>
                      <p>
                        KLEACORE olarak %99.9 uptime garantisi sunmaktayız:
                      </p>
                      <ul>
                        <li>Planlı bakımlar SLA kapsamı dışındadır</li>
                        <li>DDoS saldırıları SLA kapsamı dışındadır</li>
                        <li>SLA ihlalinde aylık hizmet bedelinden kredi sağlanır</li>
                        <li>Kredi talebi 30 gün içinde yapılmalıdır</li>
                      </ul>
                    </section>

                    <section id="yedekleme">
                      <h2>9. Yedekleme</h2>
                      <ul>
                        <li>Günlük otomatik yedekleme sağlanır</li>
                        <li>Yedekler 7-30 gün saklanır (pakete göre değişir)</li>
                        <li>Kullanıcılar kendi yedeklerini de almalıdır</li>
                        <li>Yedeklerin bütünlüğü garanti edilmez, sorumluluk kabul edilmez</li>
                      </ul>
                    </section>

                    <section id="sorumluluk">
                      <h2>10. Sorumluluk Sınırlaması</h2>
                      <p>KLEACORE aşağıdaki durumlarda sorumluluk kabul etmez:</p>
                      <ul>
                        <li>Veri kaybı veya hasarı</li>
                        <li>İş kaybı veya kar kaybı</li>
                        <li>Üçüncü taraf hizmetlerinin kesintisi</li>
                        <li>Mücbir sebepler (doğal afet, savaş, vb.)</li>
                        <li>Müşteri hatası veya ihmali</li>
                      </ul>
                      <p>
                        Toplam sorumluluk, son 12 ayda ödenen hizmet bedeli ile
                        sınırlıdır.
                      </p>
                    </section>

                    <section id="iletisim">
                      <h2>11. İletişim</h2>
                      <p>
                        Kullanım Koşulları hakkında sorularınız için:
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
                              <a href="mailto:legal@kleacore.com" className="text-sm text-primary hover:underline mt-2 inline-block">
                                legal@kleacore.com
                              </a>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <p className="text-sm text-muted-foreground">
                        Bu sözleşmeden doğan uyuşmazlıklarda Amerika Birleşik Devletleri
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
