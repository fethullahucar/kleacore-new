"use client";

import { useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Mail,
  Phone,
  Lock,
  Bell,
  Shield,
  Key,
  Smartphone,
  Globe,
  Building,
  MapPin,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock user data
const userData = {
  firstName: "Ahmet",
  lastName: "Yılmaz",
  email: "ahmet@example.com",
  phone: "+90 532 123 45 67",
  company: "Örnek Şirket A.Ş.",
  address: "Levent Mah. Büyükdere Cad. No:123",
  city: "İstanbul",
  country: "Türkiye",
  postalCode: "34330",
};

const notificationSettings = [
  { id: "email_invoices", label: "Fatura bildirimleri", description: "Yeni fatura ve ödeme hatırlatmaları", enabled: true },
  { id: "email_services", label: "Hizmet bildirimleri", description: "Hizmet yenileme ve sona erme uyarıları", enabled: true },
  { id: "email_support", label: "Destek bildirimleri", description: "Destek talebi yanıtları", enabled: true },
  { id: "email_marketing", label: "Pazarlama e-postaları", description: "Kampanya ve duyurular", enabled: false },
  { id: "sms_critical", label: "SMS bildirimleri", description: "Kritik uyarılar için SMS", enabled: true },
];

export default function AyarlarPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [notifications, setNotifications] = useState(notificationSettings);

  const tabs = [
    { id: "profile", label: "Profil", icon: User },
    { id: "security", label: "Güvenlik", icon: Shield },
    { id: "notifications", label: "Bildirimler", icon: Bell },
  ];

  const toggleNotification = (id: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, enabled: !n.enabled } : n
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <BlurFade delay={0.1} inView>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Hesap Ayarları</h1>
          <p className="text-muted-foreground">
            Hesap bilgilerinizi ve tercihlerinizi yönetin.
          </p>
        </div>
      </BlurFade>

      {/* Tabs */}
      <BlurFade delay={0.15} inView>
        <div className="flex gap-2 border-b pb-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className="gap-2"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>
      </BlurFade>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <BlurFade delay={0.2} inView>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Personal Info */}
            <Card>
              <CardHeader>
                <CardTitle>Kişisel Bilgiler</CardTitle>
                <CardDescription>
                  Ad, soyad ve iletişim bilgileriniz
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ad</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Soyad</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button className="w-full sm:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Kaydet
                </Button>
              </CardContent>
            </Card>

            {/* Company & Address */}
            <Card>
              <CardHeader>
                <CardTitle>Şirket & Adres</CardTitle>
                <CardDescription>
                  Fatura ve teslimat bilgileri
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Şirket Adı</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adres</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="pl-10 min-h-[80px]"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">Şehir</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Ülke</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Posta Kodu</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) =>
                        setFormData({ ...formData, postalCode: e.target.value })
                      }
                    />
                  </div>
                </div>

                <Button className="w-full sm:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Kaydet
                </Button>
              </CardContent>
            </Card>
          </div>
        </BlurFade>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <BlurFade delay={0.2} inView>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Change Password */}
            <Card>
              <CardHeader>
                <CardTitle>Şifre Değiştir</CardTitle>
                <CardDescription>
                  Hesap güvenliğiniz için güçlü bir şifre kullanın
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Yeni Şifre</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button>
                  <Lock className="mr-2 h-4 w-4" />
                  Şifreyi Değiştir
                </Button>
              </CardContent>
            </Card>

            {/* Two-Factor Authentication */}
            <Card>
              <CardHeader>
                <CardTitle>İki Faktörlü Doğrulama</CardTitle>
                <CardDescription>
                  Hesabınıza ekstra güvenlik katmanı ekleyin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <Smartphone className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Authenticator Uygulaması</p>
                      <p className="text-sm text-muted-foreground">
                        Google Authenticator veya Authy
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Aktifleştir</Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Mail className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">E-posta Doğrulama</p>
                      <p className="text-sm text-muted-foreground">
                        Giriş kodunu e-posta ile al
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-green-500 font-medium">Aktif</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Phone className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-medium">SMS Doğrulama</p>
                      <p className="text-sm text-muted-foreground">
                        Giriş kodunu SMS ile al
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Aktifleştir</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </BlurFade>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <BlurFade delay={0.2} inView>
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Tercihleri</CardTitle>
              <CardDescription>
                Hangi bildirimleri almak istediğinizi seçin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          notification.enabled
                            ? "bg-green-500/10"
                            : "bg-muted"
                        )}
                      >
                        <Bell
                          className={cn(
                            "h-5 w-5",
                            notification.enabled
                              ? "text-green-500"
                              : "text-muted-foreground"
                          )}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{notification.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleNotification(notification.id)}
                      className={cn(
                        "relative w-11 h-6 rounded-full transition-colors",
                        notification.enabled ? "bg-green-500" : "bg-muted"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                          notification.enabled && "translate-x-5"
                        )}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Tercihleri Kaydet
                </Button>
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      )}
    </div>
  );
}
