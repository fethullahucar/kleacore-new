"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  Check,
  Search,
  Loader2,
  FileX,
  Zap,
  Clock,
  Shield,
} from "lucide-react";

const belgesizTlds = [
  { ext: ".gen.tr", price: 79, description: "Genel kullanım" },
  { ext: ".web.tr", price: 79, description: "Web projeleri için" },
  { ext: ".tv.tr", price: 79, description: "Medya ve yayıncılık" },
  { ext: ".name.tr", price: 79, description: "Kişisel siteler" },
  { ext: ".info.tr", price: 79, description: "Bilgi siteleri" },
  { ext: ".bbs.tr", price: 79, description: "Forum ve topluluklar" },
];

const features = [
  {
    icon: FileX,
    title: "Belge Gerektirmez",
    description: "Kimlik veya şirket belgesi olmadan kayıt",
  },
  {
    icon: Zap,
    title: "Anında Aktivasyon",
    description: "Ödeme sonrası hemen aktif",
  },
  {
    icon: Clock,
    title: "Dakikalar İçinde",
    description: "Hızlı kayıt süreci",
  },
  {
    icon: Shield,
    title: "Türkiye Uzantısı",
    description: "Yerel güvenilirlik",
  },
];

export default function BelgesizTRPage() {
  const [domain, setDomain] = useState("");
  const [selectedTld, setSelectedTld] = useState(".gen.tr");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<null | { available: boolean }>(null);

  const handleSearch = async () => {
    if (!domain.trim()) return;

    setIsSearching(true);
    setResult(null);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setResult({ available: Math.random() > 0.4 });
    setIsSearching(false);
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
                <div className="inline-flex items-center gap-2 rounded-full border bg-primary/10 border-primary/30 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                  <FileX className="h-4 w-4" />
                  Belge Gerektirmez
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Belgesiz .TR Domain
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Kimlik veya şirket belgesi olmadan Türkiye uzantılı domain
                  kaydedin. Anında aktivasyon, uygun fiyat.
                </p>
              </div>
            </BlurFade>

            {/* Search */}
            <BlurFade delay={0.2} inView>
              <Card className="max-w-2xl mx-auto relative overflow-hidden">
                <BorderBeam
                  size={150}
                  duration={10}
                />
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Input
                        placeholder="Domain adınız"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="pr-24"
                      />
                      <select
                        value={selectedTld}
                        onChange={(e) => setSelectedTld(e.target.value)}
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-2 rounded bg-muted border-0 text-sm focus:ring-0"
                      >
                        {belgesizTlds.map((tld) => (
                          <option key={tld.ext} value={tld.ext}>
                            {tld.ext}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Button
                      onClick={handleSearch}
                      disabled={isSearching || !domain.trim()}
                    >
                      {isSearching ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Sorgula
                        </>
                      )}
                    </Button>
                  </div>

                  {result && (
                    <div
                      className={`mt-4 p-4 rounded-lg flex items-center justify-between ${
                        result.available
                          ? "bg-primary/10 border border-primary/30"
                          : "bg-destructive/10 border border-destructive/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {result.available ? (
                          <Check className="h-5 w-5 text-primary" />
                        ) : (
                          <FileX className="h-5 w-5 text-destructive" />
                        )}
                        <div>
                          <p className="font-semibold">
                            {domain}
                            {selectedTld}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {result.available
                              ? "Bu domain müsait!"
                              : "Bu domain alınmış"}
                          </p>
                        </div>
                      </div>
                      {result.available && (
                        <Button>
                          ₺79 - Satın Al
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </BlurFade>

            {/* Features */}
            <BlurFade delay={0.3} inView>
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="text-center p-4"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-3">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-medium text-sm">{feature.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* TLD Options */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Belgesiz .TR Uzantıları
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Tüm uzantılar aynı fiyat, belge gerektirmez
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
                {belgesizTlds.map((tld) => (
                  <Card
                    key={tld.ext}
                    className="hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedTld(tld.ext)}
                  >
                    <CardContent className="p-6 text-center">
                      <p className="text-2xl font-bold text-primary">
                        {tld.ext}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {tld.description}
                      </p>
                      <p className="text-3xl font-bold mt-4">₺{tld.price}</p>
                      <p className="text-xs text-muted-foreground">/yıl</p>
                      <Button className="w-full mt-4" variant="outline">
                        Kaydet
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <BlurFade delay={0.1} inView>
              <h2 className="text-3xl font-bold tracking-tight text-center mb-10">
                Belgeli vs Belgesiz Karşılaştırma
              </h2>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Belgeli .TR Uzantıları</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        .com.tr, .net.tr, .org.tr
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        Kimlik/Vergi levhası gerekli
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        1-2 iş günü aktivasyon
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        Daha kurumsal görünüm
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Belgesiz .TR Uzantıları
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                        Önerilen
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        .gen.tr, .web.tr, .tv.tr
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        Belge gerektirmez
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        Anında aktivasyon
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        Uygun fiyat: ₺79/yıl
                      </li>
                    </ul>
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
