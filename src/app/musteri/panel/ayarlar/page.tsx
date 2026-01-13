"use client";

import { useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Mail,
  Phone,
  Lock,
  Bell,
  Shield,
  Key,
  Smartphone,
  Building,
  MapPin,
  Save,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Trash2,
  AlertTriangle,
  Monitor,
  LogOut,
  Clock,
  CheckCircle2,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock user data
const userData = {
  firstName: "Ahmet",
  lastName: "Yılmaz",
  email: "ahmet@example.com",
  phone: "+90 532 123 45 67",
  company: "Örnek Şirket A.Ş.",
  taxNumber: "1234567890",
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

const apiKeys = [
  {
    id: "api_1",
    name: "Üretim API Anahtarı",
    key: "sk_live_xxxxxxxxxxxxxxxxxxxx",
    createdAt: "15 Ocak 2024",
    lastUsed: "Bugün",
  },
  {
    id: "api_2",
    name: "Test API Anahtarı",
    key: "sk_test_xxxxxxxxxxxxxxxxxxxx",
    createdAt: "10 Ocak 2024",
    lastUsed: "3 gün önce",
  },
];

const sessions = [
  {
    id: "session_1",
    device: "Chrome - Windows",
    ip: "195.85.201.xxx",
    location: "İstanbul, Türkiye",
    lastActive: "Şu an aktif",
    current: true,
  },
  {
    id: "session_2",
    device: "Safari - iPhone",
    ip: "176.42.xxx.xxx",
    location: "İstanbul, Türkiye",
    lastActive: "2 saat önce",
    current: false,
  },
  {
    id: "session_3",
    device: "Firefox - MacOS",
    ip: "85.107.xxx.xxx",
    location: "Ankara, Türkiye",
    lastActive: "3 gün önce",
    current: false,
  },
];

export default function AyarlarPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [notifications, setNotifications] = useState(notificationSettings);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const tabs = [
    { id: "profile", label: "Profil", icon: User },
    { id: "security", label: "Güvenlik", icon: Shield },
    { id: "notifications", label: "Bildirimler", icon: Bell },
    { id: "api", label: "API", icon: Key },
    { id: "sessions", label: "Oturumlar", icon: Monitor },
  ];

  const toggleNotification = (id: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, enabled: !n.enabled } : n
      )
    );
  };

  const copyToClipboard = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
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
        <div className="flex gap-2 border-b pb-2 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className="gap-2 shrink-0"
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
                <div className="grid gap-4 sm:grid-cols-2">
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
                    <Label htmlFor="taxNumber">Vergi No</Label>
                    <Input
                      id="taxNumber"
                      value={formData.taxNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, taxNumber: e.target.value })
                      }
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

            {/* Danger Zone */}
            <Card className="lg:col-span-2 border-red-500/20">
              <CardHeader>
                <CardTitle className="text-red-500 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Tehlikeli Bölge
                </CardTitle>
                <CardDescription>
                  Bu işlemler geri alınamaz. Dikkatli olun.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                  <div>
                    <p className="font-medium">Hesabı Sil</p>
                    <p className="text-sm text-muted-foreground">
                      Hesabınızı ve tüm verilerinizi kalıcı olarak silin. Bu işlem geri alınamaz.
                    </p>
                  </div>
                  <Button variant="destructive" className="shrink-0">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Hesabı Sil
                  </Button>
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
                    <Switch
                      checked={notification.enabled}
                      onCheckedChange={() => toggleNotification(notification.id)}
                    />
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

      {/* API Tab */}
      {activeTab === "api" && (
        <BlurFade delay={0.2} inView>
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>API Anahtarları</CardTitle>
                  <CardDescription>
                    API entegrasyonlarınız için anahtarlarınızı yönetin
                  </CardDescription>
                </div>
                <Button>
                  <Key className="mr-2 h-4 w-4" />
                  Yeni Anahtar
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiKeys.map((apiKey) => (
                    <div
                      key={apiKey.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Key className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{apiKey.name}</p>
                          <p className="text-sm font-mono text-muted-foreground">
                            {apiKey.key}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Oluşturuldu: {apiKey.createdAt} • Son kullanım: {apiKey.lastUsed}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                        >
                          {copiedKey === apiKey.id ? (
                            <>
                              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                              Kopyalandı
                            </>
                          ) : (
                            <>
                              <Copy className="mr-2 h-4 w-4" />
                              Kopyala
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Yenile
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Dokümantasyonu</CardTitle>
                <CardDescription>
                  API entegrasyonunuz için gerekli bilgiler
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Base URL</p>
                    <p className="font-mono text-sm mt-1">https://api.kleacore.com/v1</p>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Rate Limit</p>
                    <p className="font-mono text-sm mt-1">1000 istek/dakika</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" asChild>
                    <a href="/api-docs" target="_blank">
                      <Globe className="mr-2 h-4 w-4" />
                      API Dokümantasyonunu Görüntüle
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </BlurFade>
      )}

      {/* Sessions Tab */}
      {activeTab === "sessions" && (
        <BlurFade delay={0.2} inView>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Aktif Oturumlar</CardTitle>
                <CardDescription>
                  Hesabınıza bağlı cihazları görüntüleyin ve yönetin
                </CardDescription>
              </div>
              <Button variant="outline" className="text-red-500 hover:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                Tüm Oturumları Kapat
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={cn(
                      "flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border",
                      session.current && "border-green-500/50 bg-green-500/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        session.current ? "bg-green-500/10" : "bg-muted"
                      )}>
                        <Monitor className={cn(
                          "h-5 w-5",
                          session.current ? "text-green-500" : "text-muted-foreground"
                        )} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{session.device}</p>
                          {session.current && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">
                              Bu cihaz
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {session.ip} • {session.location}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {session.lastActive}
                        </p>
                      </div>
                    </div>
                    {!session.current && (
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                        <LogOut className="mr-2 h-4 w-4" />
                        Oturumu Kapat
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      )}
    </div>
  );
}
