import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  Heart,
  Zap,
  Coffee,
  GraduationCap,
  Plane,
  Dumbbell,
  ArrowRight,
  Building2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const openPositions = [
  {
    title: "Senior Backend Developer",
    department: "Yazılım",
    location: "İstanbul (Hibrit)",
    type: "Tam Zamanlı",
    experience: "5+ yıl",
    slug: "senior-backend-developer",
  },
  {
    title: "DevOps Engineer",
    department: "Altyapı",
    location: "İstanbul (Uzaktan)",
    type: "Tam Zamanlı",
    experience: "3+ yıl",
    slug: "devops-engineer",
  },
  {
    title: "Müşteri Temsilcisi",
    department: "Destek",
    location: "İstanbul (Ofis)",
    type: "Tam Zamanlı",
    experience: "1+ yıl",
    slug: "musteri-temsilcisi",
  },
  {
    title: "Linux Sistem Yöneticisi",
    department: "Altyapı",
    location: "İstanbul (Hibrit)",
    type: "Tam Zamanlı",
    experience: "3+ yıl",
    slug: "linux-sistem-yoneticisi",
  },
  {
    title: "Frontend Developer",
    department: "Yazılım",
    location: "İstanbul (Uzaktan)",
    type: "Tam Zamanlı",
    experience: "2+ yıl",
    slug: "frontend-developer",
  },
  {
    title: "Satış Uzmanı",
    department: "Satış",
    location: "İstanbul (Ofis)",
    type: "Tam Zamanlı",
    experience: "2+ yıl",
    slug: "satis-uzmani",
  },
];

const benefits = [
  {
    icon: Heart,
    title: "Sağlık Sigortası",
    description: "Özel sağlık sigortası sana ve ailene",
  },
  {
    icon: Coffee,
    title: "Esnek Çalışma",
    description: "Hibrit ve uzaktan çalışma imkanı",
  },
  {
    icon: GraduationCap,
    title: "Eğitim Desteği",
    description: "Konferans, kurs ve sertifika desteği",
  },
  {
    icon: Plane,
    title: "Yıllık İzin",
    description: "Yılda 20 gün ücretli izin",
  },
  {
    icon: Dumbbell,
    title: "Spor Üyeliği",
    description: "Spor salonu üyelik desteği",
  },
  {
    icon: Zap,
    title: "Yemek Kartı",
    description: "Günlük yemek kartı hakki",
  },
];

const culture = [
  {
    title: "Açık İletişim",
    description: "Fikirlerinizi özgürce paylaşabileceğiniz bir ortam",
  },
  {
    title: "Sürekli Öğrenme",
    description: "Teknoloji ve kişisel gelişime yatırım",
  },
  {
    title: "Takım Ruhu",
    description: "Birlikte başaran, birlikte kutlayan ekip",
  },
  {
    title: "İnovasyon",
    description: "Yeni fikirlere açık, deneyime teşvik eden kültür",
  },
];

const departments = [
  { name: "Yazılım", positions: 8 },
  { name: "Altyapı", positions: 5 },
  { name: "Destek", positions: 4 },
  { name: "Satış", positions: 3 },
  { name: "Pazarlama", positions: 2 },
  { name: "İnsan Kaynakları", positions: 1 },
];

export default function KariyerPage() {
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
                  <Briefcase className="h-4 w-4 text-primary" />
                  {openPositions.length} Açık Pozisyon
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Kariyer
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Türkiye&apos;nin lider hosting şirketinde kariyer fırsatlarını keşfedin.
                  Yetenekli ekibimize katılın!
                </p>
              </div>
            </BlurFade>

            {/* Stats */}
            <BlurFade delay={0.2} inView>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                <div className="text-center p-4 rounded-xl bg-card border">
                  <p className="text-3xl font-bold text-primary">120+</p>
                  <p className="text-sm text-muted-foreground">Çalışan</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-card border">
                  <p className="text-3xl font-bold text-primary">6</p>
                  <p className="text-sm text-muted-foreground">Departman</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-card border">
                  <p className="text-3xl font-bold text-primary">15</p>
                  <p className="text-sm text-muted-foreground">Yıllık Deneyim</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-card border">
                  <p className="text-3xl font-bold text-primary">4.6/5</p>
                  <p className="text-sm text-muted-foreground">Çalışan Memnuniyeti</p>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Açık Pozisyonlar
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Size uygun pozisyonu bulun ve başvurun
                </p>
              </div>
            </BlurFade>

            {/* Department Filter */}
            <BlurFade delay={0.15} inView>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                <Button variant="default" size="sm">
                  Tümü ({openPositions.length})
                </Button>
                {departments.slice(0, 4).map((dept) => (
                  <Button key={dept.name} variant="outline" size="sm">
                    {dept.name} ({dept.positions})
                  </Button>
                ))}
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-4 max-w-4xl mx-auto">
                {openPositions.map((position) => (
                  <Card
                    key={position.slug}
                    className="hover:border-primary/50 transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">
                            <Link
                              href={`/kariyer/${position.slug}`}
                              className="hover:text-primary transition-colors"
                            >
                              {position.title}
                            </Link>
                          </h3>
                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Building2 className="h-4 w-4" />
                              {position.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {position.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {position.type}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {position.experience}
                            </span>
                          </div>
                        </div>
                        <Button asChild>
                          <Link href={`/kariyer/${position.slug}`}>
                            Başvur
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Yan Haklar
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Çalışanlarımızın mutluluğu ve refahı önceliğimiz
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {benefits.map((benefit) => (
                  <Card key={benefit.title} className="text-center">
                    <CardContent className="p-6">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <benefit.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Culture */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center max-w-6xl mx-auto">
              <BlurFade delay={0.1} inView>
                <div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                    Kültürümüz
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Açık iletişim, sürekli öğrenme ve takım ruhu ile birlikte
                    büyüyoruz. Her fikir değerlidir ve herkes katkıda bulunabilir.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {culture.map((item) => (
                      <div key={item.title} className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-6xl">🚀</span>
                  </div>
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mt-8">
                    <span className="text-6xl">💡</span>
                  </div>
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center -mt-8">
                    <span className="text-6xl">🤝</span>
                  </div>
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-6xl">🎯</span>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Uygun Pozisyon Bulamadınız mı?
                </h2>
                <p className="text-muted-foreground mb-8">
                  Yeteneklerinizi bizimle paylaşın. Açık pozisyonlar için
                  sizi arayalım.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="px-8">
                    Açık Başvuru Yap
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="px-8">
                    careers@kleacore.com
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
