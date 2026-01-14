import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";
import {
  Building2,
  Rocket,
  Globe,
  Target,
  Zap,
  Shield,
  Clock,
  Lightbulb,
  HeartHandshake,
  Server,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { value: 99.9, suffix: "%", label: "Uptime Garantisi", decimals: 1 },
  { value: 24, suffix: "/7", label: "Teknik Destek" },
  { value: 100, suffix: "+", label: "Mutlu Müşteri" },
  { value: 2026, suffix: "", label: "Kuruluş Yılı", decimals: 0 },
];

const values = [
  {
    icon: Lightbulb,
    title: "Yenilikçi Yaklaşım",
    description:
      "2026'nın modern standartlarıyla kurulduğumuz için eski nesil hantallıklardan uzağız.",
  },
  {
    icon: Zap,
    title: "Hız Odaklılık",
    description:
      "Dijitalde zamanın ne kadar kıymetli olduğunu biliyoruz. Altyapımızı maksimum performans için optimize ediyoruz.",
  },
  {
    icon: HeartHandshake,
    title: "Kesintisiz Destek",
    description:
      "Karmaşık terimlerle değil, sizin dilinizden konuşan bir destek anlayışıyla her zaman yanınızdayız.",
  },
  {
    icon: Shield,
    title: "Güvenli Altyapı",
    description:
      "Verilerinizin güvenliğini, en modern güvenlik protokolleriyle en üst seviyede tutuyoruz.",
  },
];

const features = [
  {
    icon: Server,
    title: "Modern Altyapı",
    description: "En güncel donanım ve yazılım çözümleriyle projelerinizi barındırıyoruz.",
  },
  {
    icon: Clock,
    title: "Hızlı Kurulum",
    description: "Siparişleriniz anında aktif edilir, zaman kaybetmezsiniz.",
  },
  {
    icon: Globe,
    title: "Global Erişim",
    description: "Dünya genelinde düşük gecikme süreli bağlantı imkanı.",
  },
  {
    icon: Rocket,
    title: "Sürekli Gelişim",
    description: "Teknolojinin değişimine ayak uydurarak sürekli kendimizi yeniliyoruz.",
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
                  2026&apos;da Kurulan
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Hakkımızda
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Dijital dünyanın hızına ve dinamizmine uyum sağlamak amacıyla temellerimizi attık.
                  Yalnızca bir yer sağlayıcı değil, işinizi dijitalde büyüten teknoloji ortağınız olmayı hedefliyoruz.
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
                      2026 yılında, dijital dünyanın hızına ve dinamizmine uyum sağlamak
                      amacıyla temellerimizi attık. KLEACORE olarak, yalnızca bir yer
                      sağlayıcı değil, işinizi dijitalde büyüten teknoloji ortağınız
                      olmayı hedefliyoruz.
                    </p>
                    <p>
                      Teknolojinin her saniye değiştiği bir çağda, yerimizde saymıyoruz.
                      Sektördeki en yeni donanımları ve yazılım çözümlerini yakından takip
                      ederek, projelerinizi en güncel altyapıda barındırıyoruz.
                    </p>
                    <p>
                      Bizim için teknoloji, karmaşıklık değil; size sunulan bir kolaylık
                      ve hız demektir. Her adımda müşterilerimizin yanında olarak,
                      dijital başarılarına ortak olmayı amaçlıyoruz.
                    </p>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <div className="relative">
                  <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Rocket className="h-24 w-24 text-primary/50" />
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* Why KLEACORE */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Neden KLEACORE?
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Bizi tercih etmeniz için dört önemli neden
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

        {/* Features */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Sunduklarımız
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Modern teknoloji altyapımızla size sunduğumuz avantajlar
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
                {features.map((feature) => (
                  <div key={feature.title} className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
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
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Vizyonumuz ve Değerlerimiz
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Teknolojinin her saniye değiştiği bir çağda, yerimizde saymıyoruz
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                <Card>
                  <CardContent className="p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Misyonumuz</h3>
                    <p className="text-muted-foreground">
                      İşletmelerin dijital dönüşümüne güvenilir, yüksek performanslı
                      ve modern altyapı çözümleriyle katkıda bulunmak. Karmaşıklığı
                      basitleştirerek, teknolojinin size sunduğu kolaylık ve hızı
                      deneyimlemenizi sağlamak.
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
                      Sektördeki en yeni donanımları ve yazılım çözümlerini yakından
                      takip ederek, projelerinizi en güncel altyapıda barındırmak.
                      Yalnızca bir hizmet sağlayıcı değil, işinizi dijitalde büyüten
                      gerçek bir teknoloji ortağı olmak.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Dijital Yolculuğunuza Başlayın
                </h2>
                <p className="text-muted-foreground mb-8">
                  KLEACORE ile tanışın, projelerinizi en güncel teknoloji altyapısında barındırın.
                  Sorularınız için 7/24 destek ekibimiz yanınızda.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/iletisim"
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Bize Ulaşın
                  </a>
                  <a
                    href="/hosting/linux"
                    className="inline-flex items-center justify-center rounded-lg border bg-background px-8 py-3 text-sm font-medium hover:bg-muted transition-colors"
                  >
                    Paketleri İncele
                  </a>
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
