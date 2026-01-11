import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
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
  title: "2024'te Web Hosting Trendleri: Bilmeniz Gereken 10 Gelişme",
  excerpt:
    "Yapay zeka destekli hosting, edge computing ve sürdürülebilir veri merkezleri... Bu yıl hosting dünyasını şekillendirecek trendleri inceliyoruz.",
  date: "15 Ocak 2024",
  readTime: "8 dk",
  author: "Ahmet Yılmaz",
  category: "Teknoloji",
  image: "/blog/featured.jpg",
  slug: "2024-web-hosting-trendleri",
};

const posts = [
  {
    title: "WordPress Sitenizi Hızlandırmanın 15 Yolu",
    excerpt:
      "WordPress performansını artırmak için uygulanabilir pratik ipuçları ve optimizasyon teknikleri.",
    date: "12 Ocak 2024",
    readTime: "6 dk",
    author: "Mehmet Kaya",
    category: "WordPress",
    slug: "wordpress-hizlandirma",
  },
  {
    title: "SSL Sertifikası Nedir ve Neden Önemli?",
    excerpt:
      "Web sitenizin güvenliği için SSL sertifikalarının önemi ve doğru sertifika seçimi.",
    date: "10 Ocak 2024",
    readTime: "5 dk",
    author: "Ayşe Demir",
    category: "Güvenlik",
    slug: "ssl-sertifikasi-nedir",
  },
  {
    title: "VPS vs Dedicated Sunucu: Hangisi Sizin İçin?",
    excerpt:
      "Projeniz için doğru sunucu seçimi. VPS ve dedicated sunucu karşılaştırması.",
    date: "8 Ocak 2024",
    readTime: "7 dk",
    author: "Ali Yıldız",
    category: "Sunucu",
    slug: "vps-vs-dedicated",
  },
  {
    title: "E-ticaret Sitesi İçin Hosting Seçimi",
    excerpt:
      "Online mağazanız için performanslı ve güvenli hosting altyapısı nasıl seçilir?",
    date: "5 Ocak 2024",
    readTime: "6 dk",
    author: "Fatma Özkan",
    category: "E-ticaret",
    slug: "e-ticaret-hosting",
  },
  {
    title: "DNS Nedir? DNS Ayarları Nasıl Yapılır?",
    excerpt:
      "Alan adı sistemi (DNS) hakkında bilmeniz gereken her şey ve adım adım yapılandırma.",
    date: "3 Ocak 2024",
    readTime: "5 dk",
    author: "Mehmet Kaya",
    category: "Teknik",
    slug: "dns-nedir",
  },
  {
    title: "Yedekleme Stratejileri: Verilerinizi Koruyun",
    excerpt:
      "Veri kaybını önlemek için etkili yedekleme stratejileri ve en iyi uygulamalar.",
    date: "1 Ocak 2024",
    readTime: "6 dk",
    author: "Ahmet Yılmaz",
    category: "Güvenlik",
    slug: "yedekleme-stratejileri",
  },
];

const categories = [
  { name: "Tümü", count: 48 },
  { name: "Teknoloji", count: 12 },
  { name: "WordPress", count: 8 },
  { name: "Güvenlik", count: 10 },
  { name: "Sunucu", count: 6 },
  { name: "E-ticaret", count: 5 },
  { name: "Teknik", count: 7 },
];

const popularTags = [
  "WordPress",
  "SSL",
  "VPS",
  "Hosting",
  "Güvenlik",
  "DNS",
  "Linux",
  "cPanel",
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
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Blog
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Hosting, sunucu yönetimi ve web teknolojileri hakkında
                  güncel bilgiler ve rehberler.
                </p>
              </div>
            </BlurFade>

            {/* Search */}
            <BlurFade delay={0.15} inView>
              <div className="max-w-xl mx-auto mb-12">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Blog yazılarında ara..."
                    className="pl-10 h-12"
                  />
                </div>
              </div>
            </BlurFade>

            {/* Featured Post */}
            <BlurFade delay={0.2} inView>
              <Card className="max-w-4xl mx-auto overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-video md:aspect-auto bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-6xl">📝</span>
                  </div>
                  <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                        {featuredPost.category}
                      </span>
                      <span className="text-xs text-muted-foreground">Öne Çıkan</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">
                      <Link href={`/blog/${featuredPost.slug}`} className="hover:text-primary transition-colors">
                        {featuredPost.title}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {featuredPost.author}
                      </span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </BlurFade>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <BlurFade delay={0.1} inView>
                  <h2 className="text-2xl font-bold mb-8">Son Yazılar</h2>
                </BlurFade>

                <BlurFade delay={0.2} inView>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {posts.map((post) => (
                      <Card key={post.slug} className="overflow-hidden hover:border-primary/50 transition-colors">
                        <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                          <span className="text-4xl">📄</span>
                        </div>
                        <CardContent className="p-5">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">
                              {post.category}
                            </span>
                          </div>
                          <h3 className="font-semibold mb-2 line-clamp-2">
                            <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </BlurFade>

                {/* Pagination */}
                <BlurFade delay={0.3} inView>
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
              <div className="space-y-8">
                {/* Categories */}
                <BlurFade delay={0.2} inView>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Kategoriler</h3>
                      <ul className="space-y-2">
                        {categories.map((category) => (
                          <li key={category.name}>
                            <Link
                              href={`/blog/kategori/${category.name.toLowerCase()}`}
                              className="flex items-center justify-between py-2 text-sm hover:text-primary transition-colors"
                            >
                              <span>{category.name}</span>
                              <span className="text-muted-foreground">
                                ({category.count})
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </BlurFade>

                {/* Popular Tags */}
                <BlurFade delay={0.25} inView>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Popüler Etiketler</h3>
                      <div className="flex flex-wrap gap-2">
                        {popularTags.map((tag) => (
                          <Link
                            key={tag}
                            href={`/blog/etiket/${tag.toLowerCase()}`}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                          >
                            <Tag className="h-3 w-3" />
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </BlurFade>

                {/* Newsletter */}
                <BlurFade delay={0.3} inView>
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">Bültenimize Katılın</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Yeni yazılar ve güncellemelerden haberdar olun.
                      </p>
                      <div className="space-y-3">
                        <Input placeholder="E-posta adresiniz" />
                        <Button className="w-full">
                          Abone Ol
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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
