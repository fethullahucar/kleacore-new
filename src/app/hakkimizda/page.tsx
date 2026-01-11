import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";
import {
  Building2,
  Target,
  Eye,
  Users,
  Award,
  Clock,
  Shield,
  Zap,
  Heart,
  Globe,
  Server,
  Headphones,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stats = [
  {
    value: 15,
    suffix: "+",
    label: "Yıllık Deneyim",
    icon: Clock,
  },
  {
    value: 10000,
    suffix: "+",
    label: "Mutlu Müşteri",
    icon: Users,
  },
  {
    value: 99.9,
    suffix: "%",
    label: "Uptime Garantisi",
    icon: Server,
    decimal: 1,
  },
  {
    value: 24,
    suffix: "/7",
    label: "Teknik Destek",
    icon: Headphones,
  },
];

const values = [
  {
    icon: Shield,
    title: "Güvenilirlik",
    description:
      "Müşterilerimizin verilerini en üst düzey güvenlik standartlarıyla koruyoruz.",
  },
  {
    icon: Zap,
    title: "Performans",
    description:
      "En son teknolojileri kullanarak maksimum hız ve verimlilik sağlıyoruz.",
  },
  {
    icon: Heart,
    title: "Müşteri Odaklılık",
    description:
      "Her müşterimizin ihtiyacını anlayarak özelleştirilmiş çözümler sunuyoruz.",
  },
  {
    icon: Globe,
    title: "Yenilikçilik",
    description:
      "Sektördeki gelişmeleri takip ederek sürekli kendimizi geliştiriyoruz.",
  },
];

const milestones = [
  {
    year: "2009",
    title: "Kuruluş",
    description: "İstanbul'da küçük bir ekiple hosting hizmeti vermeye başladık.",
  },
  {
    year: "2012",
    title: "İlk Veri Merkezi",
    description: "Kendi veri merkezimizi kurarak altyapımızı güçlendirdik.",
  },
  {
    year: "2016",
    title: "10.000 Müşteri",
    description: "Güvenilir hizmetlerimizle 10.000 müşteriye ulaştık.",
  },
  {
    year: "2020",
    title: "Bulut Altyapısı",
    description: "Modern bulut sunucu hizmetlerimizi devreye aldık.",
  },
  {
    year: "2024",
    title: "Uluslararası Genişleme",
    description: "Avrupa veri merkezleriyle global hizmet vermeye başladık.",
  },
];

const team = [
  {
    name: "Ahmet Yılmaz",
    role: "Kurucu & CEO",
    description: "20 yıllık sektör deneyimi",
  },
  {
    name: "Elif Kaya",
    role: "CTO",
    description: "Altyapı ve güvenlik uzmanı",
  },
  {
    name: "Mehmet Demir",
    role: "Operasyon Direktörü",
    description: "Müşteri deneyimi odaklı",
  },
  {
    name: "Zeynep Arslan",
    role: "Müşteri İlişkileri Müdürü",
    description: "7/24 destek koordinasyonu",
  },
];

export default function HakkimizdaPage() {
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
                  <Building2 className="h-4 w-4 text-primary" />
                  Hakkımızda
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Türkiye&apos;nin Güvenilir
                  <br />
                  <span className="text-primary">Hosting Partneri</span>
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  2009&apos;dan bu yana binlerce işletmeye güvenilir, hızlı ve
                  uygun fiyatlı hosting çözümleri sunuyoruz.
                </p>
              </div>
            </BlurFade>

            {/* Stats */}
            <BlurFade delay={0.2} inView>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {stats.map((stat) => (
                  <Card key={stat.label} className="text-center">
                    <CardContent className="p-6">
                      <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                      <div className="flex justify-center items-baseline gap-0.5">
                        <NumberTicker
                          value={stat.value}
                          className="text-3xl font-bold"
                          decimalPlaces={stat.decimal || 0}
                        />
                        <span className="text-xl font-bold text-primary">
                          {stat.suffix}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
              <BlurFade delay={0.1} inView>
                <Card className="h-full hover:border-primary/50 transition-colors">
                  <CardContent className="p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-6">
                      <Target className="h-7 w-7 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Misyonumuz</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Her ölçekteki işletmeye erişilebilir, güvenilir ve yüksek
                      performanslı web hosting çözümleri sunarak dijital
                      dünyada büyümelerine yardımcı olmak. Müşterilerimizin
                      teknik detaylarla uğraşmadan işlerine odaklanmalarını
                      sağlıyoruz.
                    </p>
                  </CardContent>
                </Card>
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <Card className="h-full hover:border-primary/50 transition-colors">
                  <CardContent className="p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-6">
                      <Eye className="h-7 w-7 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Vizyonumuz</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Türkiye&apos;nin ve bölgenin en güvenilir hosting sağlayıcısı
                      olmak. Sürekli yenilik ve müşteri memnuniyeti odaklı
                      yaklaşımımızla sektörde standartları belirlemeyi ve
                      dijital dönüşüme öncülük etmeyi hedefliyoruz.
                    </p>
                  </CardContent>
                </Card>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Değerlerimiz
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Bizi biz yapan temel ilkeler
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
                {values.map((value) => (
                  <Card
                    key={value.title}
                    className="text-center hover:border-primary/50 transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Yolculuğumuz
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  2009&apos;dan bugüne önemli kilometre taşlarımız
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-0.5" />

                  {milestones.map((milestone, idx) => (
                    <div
                      key={milestone.year}
                      className={`relative flex gap-6 pb-10 last:pb-0 ${
                        idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Dot */}
                      <div className="absolute left-8 w-4 h-4 rounded-full bg-primary border-4 border-background md:left-1/2 md:-translate-x-1/2 z-10" />

                      {/* Content */}
                      <div
                        className={`ml-16 md:ml-0 md:w-1/2 ${
                          idx % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                        }`}
                      >
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                          {milestone.year}
                        </span>
                        <h3 className="font-semibold text-lg">
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Ekibimiz
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Deneyimli ve tutkulu ekibimizle yanınızdayız
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
                {team.map((member) => (
                  <Card
                    key={member.name}
                    className="text-center hover:border-primary/50 transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mx-auto mb-4 flex items-center justify-center">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-primary">{member.role}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {member.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="max-w-3xl mx-auto text-center">
                <Award className="h-12 w-12 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Siz de Ailemize Katılın
                </h2>
                <p className="text-muted-foreground mb-8">
                  10.000&apos;den fazla mutlu müşterimize katılın ve dijital
                  dünyadaki yerinizi alın. Sorularınız için bize ulaşın.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="px-8" asChild>
                    <Link href="/iletisim">Bize Ulaşın</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="px-8" asChild>
                    <Link href="/hosting">Hizmetlerimizi İnceleyin</Link>
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
