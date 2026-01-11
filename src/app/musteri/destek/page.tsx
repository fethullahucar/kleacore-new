import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  Headphones,
  MessageSquare,
  Phone,
  Mail,
  Search,
  Book,
  FileQuestion,
  Settings,
  Shield,
  Server,
  Globe,
  CreditCard,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const supportCategories = [
  {
    icon: Server,
    title: "Hosting & Sunucu",
    description: "Hosting, VPS ve dedicated sunucu sorunları",
    articles: 45,
    href: "#",
  },
  {
    icon: Globe,
    title: "Alan Adı",
    description: "Domain kayıt, transfer ve DNS ayarları",
    articles: 28,
    href: "#",
  },
  {
    icon: Mail,
    title: "E-posta",
    description: "E-posta kurulumu ve sorun giderme",
    articles: 32,
    href: "#",
  },
  {
    icon: Shield,
    title: "SSL & Güvenlik",
    description: "SSL kurulumu ve güvenlik ayarları",
    articles: 18,
    href: "#",
  },
  {
    icon: CreditCard,
    title: "Faturalandırma",
    description: "Ödeme, fatura ve hesap yönetimi",
    articles: 15,
    href: "#",
  },
  {
    icon: Settings,
    title: "cPanel & WHM",
    description: "Kontrol paneli kullanımı ve ayarları",
    articles: 52,
    href: "#",
  },
];

const popularArticles = [
  {
    title: "cPanel'e Nasıl Giriş Yapılır?",
    category: "cPanel",
    views: 12500,
    href: "#",
  },
  {
    title: "WordPress Kurulumu (1-Tık)",
    category: "Hosting",
    views: 9800,
    href: "#",
  },
  {
    title: "E-posta Hesabı Oluşturma",
    category: "E-posta",
    views: 8200,
    href: "#",
  },
  {
    title: "DNS Kayıtları Nasıl Değiştirilir?",
    category: "Alan Adı",
    views: 7500,
    href: "#",
  },
  {
    title: "SSL Sertifikası Kurulumu",
    category: "SSL",
    views: 6800,
    href: "#",
  },
  {
    title: "FTP Bağlantısı Kurma",
    category: "Hosting",
    views: 5900,
    href: "#",
  },
];

const contactChannels = [
  {
    icon: MessageSquare,
    title: "Canlı Destek",
    description: "Anlık yardım alın",
    availability: "7/24",
    action: "Sohbet Başlat",
    primary: true,
  },
  {
    icon: Headphones,
    title: "Destek Talebi",
    description: "Ticket oluşturun",
    availability: "24 saat içinde yanıt",
    action: "Talep Oluştur",
    primary: false,
  },
  {
    icon: Phone,
    title: "Telefon",
    description: "0850 123 45 67",
    availability: "Pzt-Cuma 09:00-18:00",
    action: "Ara",
    primary: false,
  },
];

const faqs = [
  {
    q: "Hosting paketimi nasıl yükseltebilirim?",
    a: "Müşteri panelinizden Hizmetlerim bölümüne giderek mevcut paketinizi yükseltebilirsiniz.",
  },
  {
    q: "Alan adımı nasıl transfer edebilirim?",
    a: "Mevcut kayıt firmanızdan EPP/Auth kodu alarak transfer işlemini başlatabilirsiniz.",
  },
  {
    q: "SSL sertifikam ne zaman aktif olur?",
    a: "DV SSL sertifikaları dakikalar içinde, OV ve EV sertifikaları doğrulama sürecine bağlı olarak 1-7 gün içinde aktif olur.",
  },
  {
    q: "Yedekleme nasıl yapılır?",
    a: "cPanel'den Yedekleme Sihirbazı ile tam veya kısmi yedek alabilirsiniz. Otomatik yedekleme de mevcuttur.",
  },
];

export default function DestekPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Topbar />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm font-medium mb-4">
                  <Headphones className="h-4 w-4 text-primary" />
                  7/24 Destek
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Destek Merkezi
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Size nasıl yardımcı olabiliriz? Bilgi bankamızda arama yapın
                  veya destek ekibimize ulaşın.
                </p>
              </div>
            </BlurFade>

            {/* Search */}
            <BlurFade delay={0.15} inView>
              <div className="max-w-2xl mx-auto mb-12">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Sorununuzu veya aradığınız konuyu yazın..."
                    className="pl-12 h-14 text-lg"
                  />
                  <Button className="absolute right-2 top-1/2 -translate-y-1/2">
                    Ara
                  </Button>
                </div>
              </div>
            </BlurFade>

            {/* Contact Channels */}
            <BlurFade delay={0.2} inView>
              <div className="grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
                {contactChannels.map((channel) => (
                  <Card
                    key={channel.title}
                    className={`text-center ${
                      channel.primary ? "border-primary" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <channel.icon
                        className={`h-10 w-10 mx-auto mb-3 ${
                          channel.primary ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <h3 className="font-semibold mb-1">{channel.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {channel.description}
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        {channel.availability}
                      </p>
                      <Button
                        variant={channel.primary ? "default" : "outline"}
                        size="sm"
                        className="w-full"
                      >
                        {channel.action}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Yardım Kategorileri
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Konuya göre yardım makalelerini inceleyin
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {supportCategories.map((category) => (
                  <Card
                    key={category.title}
                    className="hover:border-primary/50 transition-colors cursor-pointer group"
                  >
                    <CardContent className="p-6">
                      <category.icon className="h-10 w-10 text-primary mb-4" />
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {category.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {category.articles} makale
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Popüler Makaleler
                </h2>
                <p className="mt-4 text-muted-foreground">
                  En çok okunan yardım makaleleri
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {popularArticles.map((article) => (
                  <Link
                    key={article.title}
                    href={article.href}
                    className="flex items-center gap-4 p-4 bg-card border rounded-lg hover:border-primary/50 transition-colors group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <Book className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {article.category} • {article.views.toLocaleString()} görüntülenme
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Sık Sorulan Sorular
                </h2>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-4 max-w-3xl mx-auto">
                {faqs.map((faq) => (
                  <Card key={faq.q}>
                    <CardContent className="p-6">
                      <div className="flex gap-3">
                        <FileQuestion className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium mb-2">{faq.q}</h3>
                          <p className="text-sm text-muted-foreground">{faq.a}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <div className="text-center mt-8">
                <Button variant="outline">
                  Tüm SSS
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Hala Yardıma mı İhtiyacınız Var?
                </h2>
                <p className="text-muted-foreground mb-8">
                  Destek ekibimiz size yardımcı olmak için hazır.
                  Hemen bir destek talebi oluşturun.
                </p>
                <Button size="lg" className="px-8">
                  Destek Talebi Oluştur
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </BlurFade>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
