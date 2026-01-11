"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  Building2,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    value: "0850 123 45 67",
    description: "Pazartesi - Cuma, 09:00 - 18:00",
  },
  {
    icon: Mail,
    title: "E-posta",
    value: "info@klehosting.com",
    description: "24 saat içinde yanıt",
  },
  {
    icon: MapPin,
    title: "Adres",
    value: "Maslak, İstanbul",
    description: "Türkiye",
  },
  {
    icon: Clock,
    title: "Çalışma Saatleri",
    value: "7/24 Destek",
    description: "Teknik destek her zaman aktif",
  },
];

const departments = [
  { value: "satis", label: "Satış" },
  { value: "teknik", label: "Teknik Destek" },
  { value: "muhasebe", label: "Muhasebe" },
  { value: "diger", label: "Diğer" },
];

const quickLinks = [
  {
    icon: Headphones,
    title: "Canlı Destek",
    description: "Anında yardım alın",
    href: "#",
  },
  {
    icon: MessageSquare,
    title: "Destek Talebi",
    description: "Ticket oluşturun",
    href: "/musteri/destek",
  },
  {
    icon: Building2,
    title: "Hakkımızda",
    description: "Bizi tanıyın",
    href: "/hakkimizda",
  },
];

export default function IletisimPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simüle edilmiş form gönderimi
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
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
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm font-medium mb-4">
                  <Mail className="h-4 w-4 text-primary" />
                  İletişim
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Bizimle İletişime Geçin
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Sorularınız, önerileriniz veya destek talepleriniz için bize
                  ulaşın. En kısa sürede size dönüş yapacağız.
                </p>
              </div>
            </BlurFade>

            {/* Contact Info Cards */}
            <BlurFade delay={0.2} inView>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
                {contactInfo.map((info) => (
                  <Card
                    key={info.title}
                    className="text-center hover:border-primary/50 transition-colors"
                  >
                    <CardContent className="p-4">
                      <info.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="font-semibold text-sm">{info.value}</p>
                      <p className="text-xs text-muted-foreground">
                        {info.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Contact Form & Quick Links */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-3 max-w-6xl mx-auto">
              {/* Contact Form */}
              <BlurFade delay={0.1} inView className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Send className="h-5 w-5 text-primary" />
                      İletişim Formu
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 mb-4">
                          <CheckCircle className="h-8 w-8 text-green-500" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                          Mesajınız Gönderildi
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          En kısa sürede size dönüş yapacağız.
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsSubmitted(false);
                            setFormData({
                              name: "",
                              email: "",
                              phone: "",
                              department: "",
                              subject: "",
                              message: "",
                            });
                          }}
                        >
                          Yeni Mesaj Gönder
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="name">Ad Soyad</Label>
                            <Input
                              id="name"
                              placeholder="Adınız Soyadınız"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">E-posta</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="ornek@email.com"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Telefon (Opsiyonel)</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="0555 123 45 67"
                              value={formData.phone}
                              onChange={handleChange}
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="department">Departman</Label>
                            <Select
                              value={formData.department}
                              onValueChange={(value) =>
                                setFormData({ ...formData, department: value })
                              }
                              disabled={isSubmitting}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Departman seçin" />
                              </SelectTrigger>
                              <SelectContent>
                                {departments.map((dept) => (
                                  <SelectItem key={dept.value} value={dept.value}>
                                    {dept.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Konu</Label>
                          <Input
                            id="subject"
                            placeholder="Mesajınızın konusu"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Mesajınız</Label>
                          <Textarea
                            id="message"
                            placeholder="Mesajınızı buraya yazın..."
                            rows={6}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="animate-spin mr-2">⏳</span>
                              Gönderiliyor...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Mesaj Gönder
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </BlurFade>

              {/* Sidebar */}
              <BlurFade delay={0.2} inView>
                <div className="space-y-6">
                  {/* Quick Links */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Hızlı Erişim</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {quickLinks.map((link) => (
                        <a
                          key={link.title}
                          href={link.href}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                            <link.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{link.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {link.description}
                            </p>
                          </div>
                        </a>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Office Hours */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Ofis Saatleri</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Pazartesi - Cuma
                        </span>
                        <span className="font-medium">09:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cumartesi</span>
                        <span className="font-medium">10:00 - 14:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pazar</span>
                        <span className="font-medium">Kapalı</span>
                      </div>
                      <div className="pt-3 mt-3 border-t">
                        <p className="text-xs text-muted-foreground">
                          Teknik destek 7/24 aktiftir. Satış ve muhasebe
                          departmanları mesai saatlerinde hizmet vermektedir.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Social */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Sosyal Medya</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-3">
                        {["Twitter", "LinkedIn", "Instagram", "YouTube"].map(
                          (social) => (
                            <Button
                              key={social}
                              variant="outline"
                              size="icon"
                              className="h-10 w-10"
                            >
                              <span className="text-xs font-medium">
                                {social[0]}
                              </span>
                            </Button>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Ofisimizi Ziyaret Edin
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Maslak, İstanbul - Türkiye
                  </p>
                </div>
                <Card className="overflow-hidden">
                  <div className="aspect-[21/9] bg-muted flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">
                        Harita burada görüntülenecek
                      </p>
                    </div>
                  </div>
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
