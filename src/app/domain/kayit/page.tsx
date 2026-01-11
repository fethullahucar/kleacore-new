import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DomainSearch } from "@/components/domain/domain-search";
import { TldPricing } from "@/components/domain/tld-pricing";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Check, Shield, Clock, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Ücretsiz WHOIS Gizlilik",
    description: "Kişisel bilgileriniz korunur",
  },
  {
    icon: Clock,
    title: "Anında Aktivasyon",
    description: "Domain hemen aktif olur",
  },
  {
    icon: Headphones,
    title: "7/24 Destek",
    description: "Her zaman yanınızdayız",
  },
];

export default function DomainKayitPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Topbar />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-10">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Domain Kaydı
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  500+ uzantı arasından hayalinizdeki domain adını bulun ve
                  kaydedin. Hemen arama yapın!
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="max-w-4xl mx-auto">
                <DomainSearch />
              </div>
            </BlurFade>

            {/* Features */}
            <BlurFade delay={0.3} inView>
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex items-center gap-3 text-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{feature.title}</p>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* TLD Pricing */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Tüm Domain Uzantıları
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Popüler uzantılardan özel TLD&apos;lere kadar geniş seçenek.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <TldPricing />
            </BlurFade>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Neden KLEACORE?
                </h2>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  "Rekabetçi fiyatlar",
                  "Ücretsiz WHOIS gizliliği",
                  "Kolay DNS yönetimi",
                  "Otomatik yenileme",
                  "Ücretsiz e-posta yönlendirme",
                  "Domain kilitleme",
                  "Transfer kolaylığı",
                  "7/24 teknik destek",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 p-4 rounded-lg bg-card border"
                  >
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
