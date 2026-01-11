"use client";

import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Shield, Lock, Eye, Mail, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const sections = [
  { id: "giris", title: "Giriş" },
  { id: "toplanan-bilgiler", title: "Toplanan Bilgiler" },
  { id: "kullanim-amaclari", title: "Kullanım Amaçları" },
  { id: "bilgi-paylasimi", title: "Bilgi Paylaşımı" },
  { id: "cerezler", title: "Çerezler" },
  { id: "veri-guvenligi", title: "Veri Güvenliği" },
  { id: "saklama-suresi", title: "Saklama Süresi" },
  { id: "haklariniz", title: "Haklarınız" },
  { id: "iletisim", title: "İletişim" },
];

const highlights = [
  {
    icon: Lock,
    title: "256-bit Şifreleme",
    description: "Tüm verileriniz SSL/TLS ile şifrelenir",
  },
  {
    icon: Eye,
    title: "Şeffaflık",
    description: "Verilerinizi nasıl kullandığımızı açıkça belirtiyoruz",
  },
  {
    icon: Shield,
    title: "KVKK Uyumlu",
    description: "Türk veri koruma mevzuatına tam uyum",
  },
];

const otherPolicies = [
  { title: "Kullanım Koşulları", href: "/yasal/kullanim-kosullari" },
  { title: "KVKK Aydınlatma", href: "/yasal/kvkk" },
];

export default function GizlilikPage() {
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
                  Yasal
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Gizlilik Politikası
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu öğrenin.
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
                    <section id="giris">
                      <h2>1. Giriş</h2>
                      <p>
                        KLEACORE (KLEAWORK DIGITAL LLC) olarak, müşterilerimizin gizliliğine büyük önem
                        veriyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret
                        ettiğinizde ve hizmetlerimizi kullandığınızda kişisel
                        verilerinizi nasıl topladığımızı, kullandığımızı ve
                        koruduğumuzu açıklamaktadır.
                      </p>
                    </section>

                    <section id="toplanan-bilgiler">
                      <h2>2. Toplanan Bilgiler</h2>
                      <p>Aşağıdaki türde kişisel veriler toplanabilir:</p>

                      <Card className="not-prose my-6">
                        <CardContent className="p-0 divide-y">
                          <div className="p-4">
                            <p className="font-medium">Kimlik Bilgileri</p>
                            <p className="text-sm text-muted-foreground">Ad, soyad, TC kimlik numarası (kurumsal müşteriler için vergi numarası)</p>
                          </div>
                          <div className="p-4">
                            <p className="font-medium">İletişim Bilgileri</p>
                            <p className="text-sm text-muted-foreground">E-posta adresi, telefon numarası, posta adresi</p>
                          </div>
                          <div className="p-4">
                            <p className="font-medium">Hesap Bilgileri</p>
                            <p className="text-sm text-muted-foreground">Kullanıcı adı, şifre (şifrelenmiş olarak)</p>
                          </div>
                          <div className="p-4">
                            <p className="font-medium">Ödeme Bilgileri</p>
                            <p className="text-sm text-muted-foreground">Kredi kartı bilgileri (PCI-DSS uyumlu şekilde işlenir)</p>
                          </div>
                          <div className="p-4">
                            <p className="font-medium">Teknik Bilgiler</p>
                            <p className="text-sm text-muted-foreground">IP adresi, tarayıcı türü, işletim sistemi, erişim zamanları</p>
                          </div>
                        </CardContent>
                      </Card>
                    </section>

                    <section id="kullanim-amaclari">
                      <h2>3. Bilgilerin Kullanım Amaçları</h2>
                      <p>Toplanan kişisel veriler aşağıdaki amaçlarla kullanılır:</p>
                      <ul>
                        <li>Hizmet sağlama ve sipariş işleme</li>
                        <li>Müşteri desteği sunma</li>
                        <li>Fatura ve ödeme işlemleri</li>
                        <li>Hizmet güncellemeleri ve bildirimleri gönderme</li>
                        <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                        <li>Hizmet kalitesinin iyileştirilmesi</li>
                      </ul>
                    </section>

                    <section id="bilgi-paylasimi">
                      <h2>4. Bilgi Paylaşımı</h2>
                      <p>
                        Kişisel verileriniz, aşağıdaki durumlar dışında üçüncü
                        taraflarla paylaşılmaz:
                      </p>
                      <ul>
                        <li>Yasal zorunluluk halinde yetkili kurumlarla</li>
                        <li>Hizmet sağlayıcılarımızla (ödeme işlemcileri, veri merkezi ortakları)</li>
                        <li>Açık rızanız ile</li>
                      </ul>
                    </section>

                    <section id="cerezler">
                      <h2>5. Çerezler (Cookies)</h2>
                      <p>
                        Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler
                        kullanmaktadır. Çerezler hakkında detaylı bilgi için Çerez
                        Politikamızı inceleyebilirsiniz. Tarayıcı ayarlarınızdan
                        çerezleri devre dışı bırakabilirsiniz.
                      </p>
                    </section>

                    <section id="veri-guvenligi">
                      <h2>6. Veri Güvenliği</h2>
                      <p>
                        Kişisel verilerinizin güvenliğini sağlamak için aşağıdaki
                        önlemleri alıyoruz:
                      </p>
                      <ul>
                        <li>SSL/TLS şifreleme</li>
                        <li>Güvenlik duvarları ve saldırı tespit sistemleri</li>
                        <li>Düzenli güvenlik denetimleri</li>
                        <li>Erişim kontrolleri ve yetkilendirme</li>
                        <li>Çalışan eğitimleri</li>
                      </ul>
                    </section>

                    <section id="saklama-suresi">
                      <h2>7. Veri Saklama Süresi</h2>
                      <p>
                        Kişisel verileriniz, hizmet ilişkisi süresince ve yasal
                        saklama süreleri boyunca muhafaza edilir. Hesap
                        kapatıldığında, yasal yükümlülükler saklı kalmak kaydıyla
                        verileriniz silinir veya anonimleştirilir.
                      </p>
                    </section>

                    <section id="haklariniz">
                      <h2>8. Haklarınız</h2>
                      <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
                      <ul>
                        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                        <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                        <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                        <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
                        <li>Silinmesini veya yok edilmesini isteme</li>
                        <li>İşlenen verilerin üçüncü kişilere bildirilmesini isteme</li>
                        <li>Aleyhine bir sonuç çıkmasına itiraz etme</li>
                        <li>Zarara uğramanız halinde tazminat talep etme</li>
                      </ul>
                    </section>

                    <section id="iletisim">
                      <h2>9. İletişim</h2>
                      <p>
                        Gizlilik Politikamız hakkında sorularınız için bizimle
                        iletişime geçebilirsiniz:
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
