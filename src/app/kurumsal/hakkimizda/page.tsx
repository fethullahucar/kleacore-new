import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";
import {
  Building2,
  Users,
  Globe,
  Award,
  Target,
  Heart,
  Zap,
  Shield,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { value: 15, suffix: "+", label: "Yıllık Deneyim" },
  { value: 50000, suffix: "+", label: "Aktif Müşteri" },
  { value: 99.9, suffix: "%", label: "Uptime", decimals: 1 },
  { value: 24, suffix: "/7", label: "Teknik Destek" },
];

const values = [
  {
    icon: Shield,
    title: "Güvenilirlik",
    description:
      "Müşterilerimizin verilerini en yüksek güvenlik standartlarıyla koruyoruz.",
  },
  {
    icon: Zap,
    title: "Performans",
    description:
      "En güncel teknolojilerle maksimum hız ve performans sunuyoruz.",
  },
  {
    icon: Heart,
    title: "Müşteri Odaklılık",
    description:
      "Her kararımızda müşteri memnuniyetini ön planda tutuyoruz.",
  },
  {
    icon: TrendingUp,
    title: "Sürekli Gelişim",
    description:
      "Teknoloji ve hizmet kalitemizi sürekli geliştirmeye devam ediyoruz.",
  },
];

const milestones = [
  { year: "2009", event: "Şirket kuruluşu, ilk veri merkezi" },
  { year: "2012", event: "10.000 müşteriye ulaşıldı" },
  { year: "2015", event: "Tier III veri merkezi sertifikası" },
  { year: "2018", event: "25.000 müşteri, yeni DC yatırımı" },
  { year: "2021", event: "ISO 27001 sertifikası" },
  { year: "2024", event: "50.000+ müşteri, global genişleme" },
];

const team = [
  { name: "Ahmet Yılmaz", role: "CEO & Kurucu", image: "AY" },
  { name: "Mehmet Kaya", role: "CTO", image: "MK" },
  { name: "Ayşe Demir", role: "COO", image: "AD" },
  { name: "Fatma Özkan", role: "CFO", image: "FÖ" },
];

const certifications = [
  "ISO 27001",
  "ISO 9001",
  "Tier III Uptime Institute",
  "PCI DSS",
  "SOC 2 Type II",
  "KVKK Uyumlu",
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
                  2009&apos;dan Beri
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Hakkımızda
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  15 yılı aşkın deneyimimizle Türkiye&apos;nin lider hosting ve veri
                  merkezi şirketlerinden biriyiz.
                </p>
              </div>
            </BlurFade>

            {/* Stats */}
            <BlurFade delay={0.2} inView>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-6 rounded-xl bg-card border"
                  >
                    <div className="flex justify-center items-baseline gap-1">
                      <NumberTicker
                        value={stat.value}
                        className="text-3xl font-bold"
                        decimalPlaces={stat.decimals || 0}
                      />
                      <span className="text-xl font-bold text-primary">
                        {stat.suffix}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center max-w-6xl mx-auto">
              <BlurFade delay={0.1} inView>
                <div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                    Hikayemiz
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      2009 yılında İstanbul&apos;da küçük bir ekip olarak yola çıktık.
                      Amacımız, Türkiye&apos;deki işletmelere dünya standartlarında
                      hosting hizmeti sunmaktı.
                    </p>
                    <p>
                      Yıllar içinde büyüyerek kendi veri merkezlerimizi kurduk,
                      binlerce işletmenin dijital altyapısına güç verdik. Bugün
                      50.000&apos;den fazla müşterimize 7/24 kesintisiz hizmet sunuyoruz.
                    </p>
                    <p>
                      Misyonumuz, her ölçekteki işletmenin dijital dönüşümüne
                      güvenilir ve uygun maliyetli çözümlerle katkıda bulunmak.
                      Vizyonumuz ise bölgenin en güvenilir veri merkezi ve hosting
                      şirketi olmak.
                    </p>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <div className="relative">
                  <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Building2 className="h-24 w-24 text-primary/50" />
                  </div>
                </div>
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
                  İş yapış şeklimizi belirleyen temel değerler
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {values.map((value) => (
                  <Card
                    key={value.title}
                    className="text-center hover:border-primary/50 transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <value.icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
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
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

                  {milestones.map((milestone, idx) => (
                    <div
                      key={milestone.year}
                      className={`relative flex items-center gap-6 mb-8 ${
                        idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      <div
                        className={`flex-1 ${
                          idx % 2 === 0 ? "md:text-right" : "md:text-left"
                        } hidden md:block`}
                      >
                        <div className="p-4 bg-card border rounded-lg inline-block">
                          <p className="font-bold text-primary">{milestone.year}</p>
                          <p className="text-sm text-muted-foreground">
                            {milestone.event}
                          </p>
                        </div>
                      </div>

                      <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {idx + 1}
                      </div>

                      <div className="flex-1 md:hidden">
                        <p className="font-bold text-primary">{milestone.year}</p>
                        <p className="text-sm text-muted-foreground">
                          {milestone.event}
                        </p>
                      </div>

                      <div className="flex-1 hidden md:block" />
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
                  Yönetim Ekibi
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Deneyimli liderlik kadromuz
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
                {team.map((member) => (
                  <Card key={member.name} className="text-center">
                    <CardContent className="p-6">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary mb-4">
                        {member.image}
                      </div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Sertifikalar & Uyumluluk
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Uluslararası standartlarda hizmet kalitesi
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
                {certifications.map((cert) => (
                  <div
                    key={cert}
                    className="flex items-center gap-2 px-6 py-3 bg-card border rounded-full hover:border-primary/50 transition-colors"
                  >
                    <Award className="h-5 w-5 text-primary" />
                    <span className="font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                <Card>
                  <CardContent className="p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Misyonumuz</h3>
                    <p className="text-muted-foreground">
                      Her ölçekteki işletmenin dijital dönüşümüne güvenilir,
                      yüksek performanslı ve uygun maliyetli altyapı çözümleriyle
                      katkıda bulunmak. Müşterilerimizin başarısı, bizim başarımızdır.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Vizyonumuz</h3>
                    <p className="text-muted-foreground">
                      Türkiye ve bölgenin en güvenilir veri merkezi ve bulut
                      hizmetleri sağlayıcısı olmak. Teknoloji ve inovasyon
                      liderliğiyle global standartlarda hizmet sunmak.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </BlurFade>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
