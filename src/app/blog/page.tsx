import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Tag,
  Search,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const featuredPost = {
  title: "2024'te Web Hosting Trendleri: Bilmeniz Gereken Her Şey",
  excerpt:
    "Bulut teknolojileri, edge computing ve yapay zeka destekli hosting çözümleri ile sektörün geleceğine bakıyoruz. Web sitelerinin performansını artırmak için en son teknolojileri keşfedin.",
  image: "/blog/featured.jpg",
  category: "Teknoloji",
  author: "Ahmet Yılmaz",
  date: "15 Ocak 2024",
  readTime: "8 dk",
  slug: "2024-web-hosting-trendleri",
};

const posts = [
  {
    title: "WordPress Sitenizi Hızlandırmanın 10 Yolu",
    excerpt:
      "WordPress sitenizin yavaş mı çalışıyor? Bu 10 ipucu ile sitenizi optimize edin ve hızını artırın.",
    category: "WordPress",
    author: "Elif Kaya",
    date: "12 Ocak 2024",
    readTime: "6 dk",
    slug: "wordpress-hizlandirma-ipuclari",
  },
  {
    title: "SSL Sertifikası Nedir ve Neden Önemlidir?",
    excerpt:
      "Web sitenizin güvenliği için SSL sertifikasının önemi ve doğru sertifika seçimi hakkında bilmeniz gerekenler.",
    category: "Güvenlik",
    author: "Mehmet Demir",
    date: "10 Ocak 2024",
    readTime: "5 dk",
    slug: "ssl-sertifikasi-nedir",
  },
  {
    title: "VPS vs Paylaşımlı Hosting: Hangisini Seçmelisiniz?",
    excerpt:
      "Web siteniz için doğru hosting türünü seçmek kritik önem taşır. VPS ve paylaşımlı hosting arasındaki farkları inceleyin.",
    category: "Hosting",
    author: "Zeynep Arslan",
    date: "8 Ocak 2024",
    readTime: "7 dk",
    slug: "vps-vs-paylasimli-hosting",
  },
  {
    title: "cPanel Kullanım Rehberi: Başlangıçtan İleri Seviyeye",
    excerpt:
      "cPanel kontrol panelini etkin kullanmak için kapsamlı rehberimizi inceleyin. E-posta, veritabanı ve dosya yönetimi.",
    category: "Rehber",
    author: "Ahmet Yılmaz",
    date: "5 Ocak 2024",
    readTime: "10 dk",
    slug: "cpanel-kullanim-rehberi",
  },
  {
    title: "DDoS Saldırılarından Korunma Yöntemleri",
    excerpt:
      "Web sitenizi DDoS saldırılarından korumak için alınması gereken önlemler ve en iyi uygulamalar.",
    category: "Güvenlik",
    author: "Elif Kaya",
    date: "3 Ocak 2024",
    readTime: "6 dk",
    slug: "ddos-saldirilari-korunma",
  },
  {
    title: "E-ticaret Sitesi İçin Hosting Seçimi",
    excerpt:
      "Online mağazanız için doğru hosting altyapısını seçerken dikkat etmeniz gereken faktörler.",
    category: "E-ticaret",
    author: "Mehmet Demir",
    date: "1 Ocak 2024",
    readTime: "8 dk",
    slug: "eticaret-hosting-secimi",
  },
];

const categories = [
  { name: "Tümü", count: 24 },
  { name: "Hosting", count: 8 },
  { name: "WordPress", count: 6 },
  { name: "Güvenlik", count: 5 },
  { name: "Rehber", count: 3 },
  { name: "E-ticaret", count: 2 },
];

const popularTags = [
  "WordPress",
  "SSL",
  "VPS",
  "cPanel",
  "Güvenlik",
  "Performans",
  "SEO",
  "E-ticaret",
  "Domain",
  "Yedekleme",
];

export default function BlogPage() {
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
                  Blog
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Hosting & Teknoloji Blog
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Web hosting, güvenlik, performans ve dijital dünya hakkında
                  en güncel bilgiler ve ipuçları.
                </p>
              </div>
            </BlurFade>

            {/* Search */}
            <BlurFade delay={0.2} inView>
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Blog yazılarında ara..."
                    className="pl-10 h-12"
                  />
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-8">Öne Çıkan Yazı</h2>
                <Card className="overflow-hidden hover:border-primary/50 transition-colors">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="aspect-video md:aspect-auto bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-primary/50" />
                    </div>
                    <CardContent className="p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {featuredPost.category}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {featuredPost.readTime}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3">
                        <Link
                          href={`/blog/${featuredPost.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {featuredPost.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {featuredPost.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {featuredPost.date}
                        </span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-4 max-w-6xl mx-auto">
              {/* Posts */}
              <div className="lg:col-span-3">
                <BlurFade delay={0.1} inView>
                  <h2 className="text-2xl font-bold mb-8">Son Yazılar</h2>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {posts.map((post, idx) => (
                      <Card
                        key={post.slug}
                        className="overflow-hidden hover:border-primary/50 transition-colors"
                      >
                        <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                          <BookOpen className="h-10 w-10 text-muted-foreground/50" />
                        </div>
                        <CardContent className="p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                              {post.category}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="font-semibold mb-2 line-clamp-2">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="hover:text-primary transition-colors"
                            >
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {post.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {post.date}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center gap-2 mt-12">
                    <Button variant="outline" disabled>
                      Önceki
                    </Button>
                    <Button variant="outline" className="bg-primary text-primary-foreground">
                      1
                    </Button>
                    <Button variant="outline">2</Button>
                    <Button variant="outline">3</Button>
                    <Button variant="outline">
                      Sonraki
                    </Button>
                  </div>
                </BlurFade>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <BlurFade delay={0.2} inView>
                  <div className="space-y-8">
                    {/* Categories */}
                    <Card>
                      <CardContent className="p-5">
                        <h3 className="font-semibold mb-4">Kategoriler</h3>
                        <ul className="space-y-2">
                          {categories.map((category) => (
                            <li key={category.name}>
                              <Link
                                href={`/blog/kategori/${category.name.toLowerCase()}`}
                                className="flex items-center justify-between py-1.5 text-sm hover:text-primary transition-colors"
                              >
                                <span>{category.name}</span>
                                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                  {category.count}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Popular Tags */}
                    <Card>
                      <CardContent className="p-5">
                        <h3 className="font-semibold mb-4">Popüler Etiketler</h3>
                        <div className="flex flex-wrap gap-2">
                          {popularTags.map((tag) => (
                            <Link
                              key={tag}
                              href={`/blog/etiket/${tag.toLowerCase()}`}
                              className="px-3 py-1 rounded-full bg-muted text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                              {tag}
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Newsletter */}
                    <Card className="bg-primary text-primary-foreground">
                      <CardContent className="p-5">
                        <h3 className="font-semibold mb-2">Bültenimize Katılın</h3>
                        <p className="text-sm opacity-90 mb-4">
                          En son yazılar ve hosting ipuçları için abone olun.
                        </p>
                        <div className="space-y-2">
                          <Input
                            placeholder="E-posta adresiniz"
                            className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                          />
                          <Button
                            variant="secondary"
                            className="w-full"
                          >
                            Abone Ol
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

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Hosting Hizmetlerimizi Keşfedin
                </h2>
                <p className="text-muted-foreground mb-8">
                  Blog yazılarımızda öğrendiklerinizi uygulamak için güvenilir
                  hosting altyapımızı deneyin.
                </p>
                <Button size="lg" className="px-8" asChild>
                  <Link href="/hosting">
                    Hosting Paketleri
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
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
