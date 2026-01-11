"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Check,
  Loader2,
  RefreshCw,
  Shield,
  Clock,
  Gift,
} from "lucide-react";

const transferSteps = [
  {
    step: 1,
    title: "Domain Kilidini Aç",
    description:
      "Mevcut sağlayıcınızdan domain kilidini açın ve EPP/Auth kodunu alın.",
  },
  {
    step: 2,
    title: "Transfer Başlat",
    description: "Domain adınızı ve EPP kodunu girerek transfer sürecini başlatın.",
  },
  {
    step: 3,
    title: "E-posta Onayı",
    description: "Domain sahibi e-posta adresine gelen onay linkine tıklayın.",
  },
  {
    step: 4,
    title: "Tamamlandı",
    description: "Transfer 5-7 gün içinde tamamlanır. +1 yıl uzatma hediye!",
  },
];

const benefits = [
  {
    icon: Gift,
    title: "+1 Yıl Ücretsiz Uzatma",
    description: "Her transferde domain süreniz 1 yıl uzar",
  },
  {
    icon: Shield,
    title: "Ücretsiz WHOIS Gizliliği",
    description: "Kişisel bilgileriniz korunsun",
  },
  {
    icon: Clock,
    title: "Hızlı Transfer",
    description: "Ortalama 5-7 gün içinde tamamlanır",
  },
];

export default function DomainTransferPage() {
  const [domain, setDomain] = useState("");
  const [eppCode, setEppCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<null | { success: boolean; message: string }>(null);

  const handleTransfer = async () => {
    if (!domain.trim() || !eppCode.trim()) return;

    setIsLoading(true);
    setResult(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock result
    const success = Math.random() > 0.3;
    setResult({
      success,
      message: success
        ? "Transfer talebi başarıyla oluşturuldu! E-posta onayı bekleniyor."
        : "EPP kodu hatalı veya domain transfer için uygun değil.",
    });

    setIsLoading(false);
  };

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
                  Domain Transferi
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Domaininizi bize transfer edin, +1 yıl ücretsiz uzatma kazanın.
                  Hızlı ve güvenli transfer süreci.
                </p>
              </div>
            </BlurFade>

            {/* Transfer Form */}
            <BlurFade delay={0.2} inView>
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-primary" />
                    Transfer Başlat
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Domain Adı
                    </label>
                    <Input
                      placeholder="ornek.com"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      EPP / Auth Kodu
                    </label>
                    <Input
                      placeholder="EPP kodunuzu girin"
                      value={eppCode}
                      onChange={(e) => setEppCode(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      EPP kodunu mevcut sağlayıcınızdan alabilirsiniz.
                    </p>
                  </div>

                  {result && (
                    <div
                      className={`p-4 rounded-lg ${
                        result.success
                          ? "bg-green-500/10 text-green-600"
                          : "bg-red-500/10 text-red-600"
                      }`}
                    >
                      {result.message}
                    </div>
                  )}

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleTransfer}
                    disabled={isLoading || !domain.trim() || !eppCode.trim()}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Kontrol Ediliyor...
                      </>
                    ) : (
                      <>
                        Transfer Başlat
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </BlurFade>

            {/* Benefits */}
            <BlurFade delay={0.3} inView>
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-3 p-4 rounded-lg bg-card border"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <benefit.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{benefit.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Transfer Nasıl Çalışır?
                </h2>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-8 md:grid-cols-4 max-w-5xl mx-auto">
                {transferSteps.map((item, idx) => (
                  <div key={item.step} className="relative">
                    {idx < transferSteps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-border" />
                    )}
                    <div className="text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                        {item.step}
                      </div>
                      <h3 className="mt-4 font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-3xl">
            <BlurFade delay={0.1} inView>
              <h2 className="text-3xl font-bold tracking-tight text-center mb-10">
                Sık Sorulan Sorular
              </h2>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="space-y-4">
                {[
                  {
                    q: "Transfer ne kadar sürer?",
                    a: "Genellikle 5-7 gün içinde tamamlanır. .tr uzantıları için bu süre 1-2 gün olabilir.",
                  },
                  {
                    q: "EPP kodu nedir?",
                    a: "EPP (Authorization) kodu, domain transferi için gereken güvenlik kodudur. Mevcut sağlayıcınızın kontrol panelinden alabilirsiniz.",
                  },
                  {
                    q: "Transfer ücreti var mı?",
                    a: "Transfer ücreti domain uzantısına göre değişir ve genellikle kayıt ücreti ile aynıdır. Ayrıca +1 yıl uzatma hediye edilir.",
                  },
                  {
                    q: "Transfer sırasında sitem çalışır mı?",
                    a: "Evet, DNS ayarlarınız korunduğu sürece siteniz kesintisiz çalışmaya devam eder.",
                  },
                ].map((faq) => (
                  <Card key={faq.q}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold">{faq.q}</h3>
                      <p className="mt-2 text-muted-foreground">{faq.a}</p>
                    </CardContent>
                  </Card>
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
