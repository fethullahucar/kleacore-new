"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  CheckCircle,
  Shield,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SifremiUnuttumPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simüle edilmiş API çağrısı
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Topbar />
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="max-w-md mx-auto">
              <BlurFade delay={0.1} inView>
                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                      {isSubmitted ? (
                        <CheckCircle className="h-7 w-7 text-green-500" />
                      ) : (
                        <KeyRound className="h-7 w-7 text-primary" />
                      )}
                    </div>
                    <CardTitle className="text-2xl">
                      {isSubmitted ? "E-posta Gönderildi" : "Şifremi Unuttum"}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                      {isSubmitted
                        ? "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi."
                        : "E-posta adresinizi girin, şifre sıfırlama bağlantısı gönderelim."}
                    </p>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="space-y-6">
                        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                          <p className="text-sm text-center">
                            <strong>{email}</strong> adresine şifre sıfırlama
                            bağlantısı gönderildi. Lütfen gelen kutunuzu kontrol edin.
                          </p>
                        </div>

                        <div className="space-y-3 text-sm text-muted-foreground">
                          <p className="flex items-start gap-2">
                            <Shield className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                            <span>
                              Bağlantı 30 dakika içinde geçerliliğini yitirecektir.
                            </span>
                          </p>
                          <p className="flex items-start gap-2">
                            <Mail className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                            <span>
                              E-posta gelmezse spam klasörünü kontrol edin.
                            </span>
                          </p>
                        </div>

                        <div className="flex flex-col gap-3">
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => {
                              setIsSubmitted(false);
                              setEmail("");
                            }}
                          >
                            Farklı E-posta Dene
                          </Button>
                          <Button asChild className="w-full">
                            <Link href="/musteri/panel">
                              <ArrowLeft className="mr-2 h-4 w-4" />
                              Giriş Sayfasına Dön
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">E-posta Adresi</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="ornek@email.com"
                              className="pl-10"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              disabled={isLoading}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Kayıtlı e-posta adresinizi girin.
                          </p>
                        </div>

                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isLoading || !email}
                        >
                          {isLoading ? (
                            <>
                              <span className="animate-spin mr-2">⏳</span>
                              Gönderiliyor...
                            </>
                          ) : (
                            <>
                              Sıfırlama Bağlantısı Gönder
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">
                              veya
                            </span>
                          </div>
                        </div>

                        <Button variant="outline" asChild className="w-full">
                          <Link href="/musteri/panel">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Giriş Sayfasına Dön
                          </Link>
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </BlurFade>

              {/* Help Section */}
              <BlurFade delay={0.2} inView>
                <div className="mt-8 text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Hala sorun mu yaşıyorsunuz?
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link
                      href="/musteri/destek"
                      className="text-sm text-primary hover:underline"
                    >
                      Destek Talebi Oluştur
                    </Link>
                    <span className="text-muted-foreground">•</span>
                    <Link
                      href="/iletisim"
                      className="text-sm text-primary hover:underline"
                    >
                      Bize Ulaşın
                    </Link>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
