"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  BookOpen,
  Search,
  Server,
  Globe,
  Shield,
  Mail,
  Database,
  Settings,
  HelpCircle,
  FileText,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const categories = [
  {
    icon: Server,
    title: "Hosting",
    description: "cPanel, FTP, veritabanı ve hosting yönetimi",
    articleCount: 45,
    href: "/bilgi-bankasi/hosting",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Globe,
    title: "Domain",
    description: "Alan adı kaydı, transfer ve DNS ayarları",
    articleCount: 28,
    href: "/bilgi-bankasi/domain",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Shield,
    title: "SSL Sertifikası",
    description: "SSL kurulumu, yenileme ve sorun giderme",
    articleCount: 18,
    href: "/bilgi-bankasi/ssl",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Mail,
    title: "E-posta",
    description: "E-posta hesapları, yapılandırma ve sorunlar",
    articleCount: 32,
    href: "/bilgi-bankasi/email",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Database,
    title: "Sunucu",
    description: "VPS, VDS ve sunucu yönetimi",
    articleCount: 24,
    href: "/bilgi-bankasi/sunucu",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Settings,
    title: "Teknik Rehberler",
    description: "Kurulum, yapılandırma ve optimizasyon",
    articleCount: 56,
    href: "/bilgi-bankasi/teknik",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
];

const popularArticles = [
  {
    title: "cPanel'e Nasıl Giriş Yapılır?",
    category: "Hosting",
    href: "/bilgi-bankasi/hosting/cpanel-giris",
  },
  {
    title: "WordPress Kurulumu (1-Tık)",
    category: "Hosting",
    href: "/bilgi-bankasi/hosting/wordpress-kurulum",
  },
  {
    title: "DNS Kayıtları Nasıl Düzenlenir?",
    category: "Domain",
    href: "/bilgi-bankasi/domain/dns-kayitlari",
  },
  {
    title: "SSL Sertifikası Kurulumu",
    category: "SSL",
    href: "/bilgi-bankasi/ssl/kurulum",
  },
  {
    title: "E-posta Hesabı Oluşturma",
    category: "E-posta",
    href: "/bilgi-bankasi/email/hesap-olusturma",
  },
  {
    title: "FTP Bağlantısı Nasıl Yapılır?",
    category: "Hosting",
    href: "/bilgi-bankasi/hosting/ftp-baglanti",
  },
  {
    title: "Veritabanı Yedekleme",
    category: "Hosting",
    href: "/bilgi-bankasi/hosting/veritabani-yedekleme",
  },
  {
    title: "Nameserver Değişikliği",
    category: "Domain",
    href: "/bilgi-bankasi/domain/nameserver",
  },
];

const recentArticles = [
  {
    title: "Node.js Uygulaması Yayınlama",
    category: "Teknik",
    date: "15 Ocak 2024",
    href: "/bilgi-bankasi/teknik/nodejs-deploy",
  },
  {
    title: "Let's Encrypt SSL Yenileme",
    category: "SSL",
    date: "14 Ocak 2024",
    href: "/bilgi-bankasi/ssl/lets-encrypt-yenileme",
  },
  {
    title: "cPanel Yedekleme Rehberi",
    category: "Hosting",
    date: "12 Ocak 2024",
    href: "/bilgi-bankasi/hosting/cpanel-yedekleme",
  },
  {
    title: "DKIM ve SPF Ayarları",
    category: "E-posta",
    date: "10 Ocak 2024",
    href: "/bilgi-bankasi/email/dkim-spf",
  },
  {
    title: "PHP Sürümü Değiştirme",
    category: "Hosting",
    date: "8 Ocak 2024",
    href: "/bilgi-bankasi/hosting/php-surum",
  },
];

const faqs = [
  {
    question: "Hosting paketimi nasıl yükseltebilirim?",
    answer:
      "Müşteri panelinize giriş yaparak 'Hizmetlerim' bölümünden mevcut paketinizi seçip 'Yükselt' butonuna tıklayabilirsiniz.",
  },
  {
    question: "Domain transferi ne kadar sürer?",
    answer:
      "Domain transferi genellikle 5-7 gün sürer. .tr uzantılı domainler için bu süre 24-48 saat olabilir.",
  },
  {
    question: "SSL sertifikam ne zaman aktif olur?",
    answer:
      "Ücretsiz SSL sertifikaları genellikle birkaç dakika içinde aktif olur. Ücretli sertifikalar doğrulama sürecine bağlı olarak 1-3 gün sürebilir.",
  },
  {
    question: "Yedeklemeler ne sıklıkla alınıyor?",
    answer:
      "Tüm hosting paketlerinde günlük otomatik yedekleme yapılmaktadır. Yedekler 30 gün boyunca saklanır.",
  },
];

export default function BilgiBankasiPage() {
  const [searchQuery, setSearchQuery] = useState("");

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
                  <BookOpen className="h-4 w-4 text-primary" />
                  Bilgi Bankası
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Nasıl Yardımcı Olabiliriz?
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Hosting, domain, SSL ve daha fazlası hakkında detaylı
                  rehberler ve çözümler.
                </p>
              </div>
            </BlurFade>

            {/* Search */}
            <BlurFade delay={0.2} inView>
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Arama yapın... (örn: cPanel giriş, SSL kurulum)"
                    className="pl-12 h-14 text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button className="absolute right-2 top-1/2 -translate-y-1/2">
                    Ara
                  </Button>
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
                  <span className="text-muted-foreground">Popüler:</span>
                  <Link
                    href="/bilgi-bankasi/hosting/cpanel-giris"
                    className="text-primary hover:underline"
                  >
                    cPanel Giriş
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <Link
                    href="/bilgi-bankasi/domain/dns-kayitlari"
                    className="text-primary hover:underline"
                  >
                    DNS Ayarları
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <Link
                    href="/bilgi-bankasi/ssl/kurulum"
                    className="text-primary hover:underline"
                  >
                    SSL Kurulum
                  </Link>
                </div>
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
                  Kategoriler
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Aradığınız konuyu kategorilere göre bulun
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                  <Link key={category.title} href={category.href}>
                    <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-lg ${category.bgColor}`}
                          >
                            <category.icon
                              className={`h-6 w-6 ${category.color}`}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                              {category.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {category.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {category.articleCount} makale
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Popular & Recent Articles */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Popular Articles */}
              <BlurFade delay={0.1} inView>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      Popüler Makaleler
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {popularArticles.map((article) => (
                        <li key={article.title}>
                          <Link
                            href={article.href}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm group-hover:text-primary transition-colors">
                                {article.title}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                              {article.category}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </BlurFade>

              {/* Recent Articles */}
              <BlurFade delay={0.2} inView>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Son Eklenen Makaleler
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {recentArticles.map((article) => (
                        <li key={article.title}>
                          <Link
                            href={article.href}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <span className="text-sm group-hover:text-primary transition-colors block">
                                  {article.title}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {article.date}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                              {article.category}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </BlurFade>
            </div>
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
                <p className="mt-4 text-muted-foreground">
                  En çok merak edilen sorular ve cevapları
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Aradığınızı Bulamadınız mı?
                </h2>
                <p className="text-muted-foreground mb-8">
                  Teknik destek ekibimiz size yardımcı olmaktan mutluluk duyar.
                  Destek talebi oluşturun veya canlı destek ile iletişime geçin.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="px-8" asChild>
                    <Link href="/musteri/destek">
                      Destek Talebi Oluştur
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="px-8" asChild>
                    <Link href="/iletisim">Bize Ulaşın</Link>
                  </Button>
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
