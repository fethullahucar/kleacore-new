"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  User,
  Lock,
  Mail,
  ArrowRight,
  Shield,
  Headphones,
  FileText,
  CreditCard,
  Server,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const quickLinks = [
  {
    icon: Server,
    title: "Hizmetlerim",
    description: "Aktif hosting ve sunucu hizmetleri",
    href: "/musteri/panel/hizmetlerim",
  },
  {
    icon: Globe,
    title: "Alan Adlarım",
    description: "Domain yönetimi ve DNS ayarları",
    href: "/musteri/panel/domainler",
  },
  {
    icon: CreditCard,
    title: "Faturalarım",
    description: "Ödeme geçmişi ve faturalar",
    href: "/musteri/panel/faturalar",
  },
  {
    icon: Headphones,
    title: "Destek Talepleri",
    description: "Açık ve kapalı talepler",
    href: "/musteri/panel/destek",
  },
];

const features = [
  {
    icon: Shield,
    title: "Güvenli Giriş",
    description: "2FA ve SSL şifreleme ile korunan hesap",
  },
  {
    icon: FileText,
    title: "Kolay Yönetim",
    description: "Tüm hizmetlerinizi tek panelden yönetin",
  },
  {
    icon: Headphones,
    title: "7/24 Destek",
    description: "Anlık destek talebi oluşturma",
  },
];

export default function GirisPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: redirect to panel
    window.location.href = "/musteri/panel";
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Topbar />
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center max-w-6xl mx-auto">
              {/* Form */}
              <BlurFade delay={0.1} inView>
                <Card className="max-w-md mx-auto lg:mx-0">
                  <CardHeader className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                      <User className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">
                      {isLogin ? "Müşteri Girişi" : "Hesap Oluştur"}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                      {isLogin
                        ? "Hesabınıza giriş yapın"
                        : "Yeni bir hesap oluşturun"}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {!isLogin && (
                        <div className="space-y-2">
                          <Label htmlFor="name">Ad Soyad</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="name"
                              placeholder="Adınız Soyadınız"
                              className="pl-10"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              required={!isLogin}
                            />
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="email">E-posta</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="ornek@email.com"
                            className="pl-10"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Şifre</Label>
                          {isLogin && (
                            <Link
                              href="/musteri/sifremi-unuttum"
                              className="text-xs text-primary hover:underline"
                            >
                              Şifremi Unuttum
                            </Link>
                          )}
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="********"
                            className="pl-10"
                            value={formData.password}
                            onChange={(e) =>
                              setFormData({ ...formData, password: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>

                      {!isLogin && (
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="confirmPassword"
                              type="password"
                              placeholder="********"
                              className="pl-10"
                              value={formData.confirmPassword}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  confirmPassword: e.target.value,
                                })
                              }
                              required={!isLogin}
                            />
                          </div>
                        </div>
                      )}

                      <Button type="submit" className="w-full">
                        {isLogin ? "Giriş Yap" : "Hesap Oluştur"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                      {isLogin ? (
                        <p className="text-muted-foreground">
                          Hesabınız yok mu?{" "}
                          <button
                            onClick={() => setIsLogin(false)}
                            className="text-primary hover:underline font-medium"
                          >
                            Kayıt Olun
                          </button>
                        </p>
                      ) : (
                        <p className="text-muted-foreground">
                          Zaten hesabınız var mı?{" "}
                          <button
                            onClick={() => setIsLogin(true)}
                            className="text-primary hover:underline font-medium"
                          >
                            Giriş Yapın
                          </button>
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>

              {/* Info */}
              <BlurFade delay={0.2} inView>
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                      Müşteri Paneli
                    </h1>
                    <p className="text-muted-foreground">
                      Tüm hosting hizmetlerinizi, alan adlarınızı ve faturalarınızı
                      tek bir panelden yönetin. 7/24 destek talebi oluşturun.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {quickLinks.map((link) => (
                      <Card
                        key={link.title}
                        className="hover:border-primary/50 transition-colors cursor-pointer"
                      >
                        <CardContent className="p-4 flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                            <link.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-sm">{link.title}</h3>
                            <p className="text-xs text-muted-foreground">
                              {link.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {features.map((feature) => (
                      <div key={feature.title} className="text-center">
                        <feature.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                        <h4 className="font-medium text-sm">{feature.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    ))}
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
