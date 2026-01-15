"use client";

import { useState } from "react";
import {
  Building2,
  Mail,
  Bell,
  Shield,
  Users,
  Key,
  Globe,
  CreditCard,
  Save,
  Upload,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/magicui/blur-fade";

const adminUsers = [
  { id: 1, name: "Admin", email: "admin@kleacore.com", role: "Super Admin", lastLogin: "2024-06-25 14:32" },
  { id: 2, name: "Destek Uzmanı", email: "destek@kleacore.com", role: "Destek", lastLogin: "2024-06-25 10:15" },
  { id: 3, name: "Muhasebe", email: "muhasebe@kleacore.com", role: "Finans", lastLogin: "2024-06-24 16:45" },
];

const apiKeys = [
  { id: 1, name: "WHMCS Entegrasyon", key: "kl_live_**********************a8f2", created: "2024-01-15", lastUsed: "2024-06-25" },
  { id: 2, name: "Payment Gateway", key: "kl_live_**********************b3c1", created: "2024-03-20", lastUsed: "2024-06-25" },
];

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [autoInvoice, setAutoInvoice] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BlurFade delay={0}>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Ayarlar</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Sistem ayarlarını yapılandırın</p>
        </div>
      </BlurFade>

      <BlurFade delay={0.1}>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-zinc-100 dark:bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="general" className="data-[state=active]:bg-zinc-200 dark:data-[state=active]:bg-zinc-700">
            <Building2 className="mr-2 h-4 w-4" />
            Genel
          </TabsTrigger>
          <TabsTrigger value="email" className="data-[state=active]:bg-zinc-200 dark:data-[state=active]:bg-zinc-700">
            <Mail className="mr-2 h-4 w-4" />
            E-posta
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-zinc-200 dark:data-[state=active]:bg-zinc-700">
            <Bell className="mr-2 h-4 w-4" />
            Bildirimler
          </TabsTrigger>
          <TabsTrigger value="payment" className="data-[state=active]:bg-zinc-200 dark:data-[state=active]:bg-zinc-700">
            <CreditCard className="mr-2 h-4 w-4" />
            Ödeme
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-zinc-200 dark:data-[state=active]:bg-zinc-700">
            <Shield className="mr-2 h-4 w-4" />
            Güvenlik
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-zinc-200 dark:data-[state=active]:bg-zinc-700">
            <Users className="mr-2 h-4 w-4" />
            Kullanıcılar
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-zinc-200 dark:data-[state=active]:bg-zinc-700">
            <Key className="mr-2 h-4 w-4" />
            API
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="mt-6 space-y-6">
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-900 dark:text-white">Şirket Bilgileri</CardTitle>
              <CardDescription className="text-zinc-500">
                Şirketinizin temel bilgilerini güncelleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-zinc-700 dark:text-zinc-300">Şirket Adı</Label>
                  <Input
                    defaultValue="KLEACORE"
                    className="bg-zinc-100 dark:bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-700 dark:text-zinc-300">Vergi Numarası</Label>
                  <Input
                    defaultValue="36-5157418"
                    className="bg-zinc-100 dark:bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-700 dark:text-zinc-300">Adres</Label>
                <Textarea
                  defaultValue="30 N Gould St Ste R, Sheridan, WY 82801, USA"
                  className="bg-zinc-100 dark:bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white min-h-20"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-zinc-700 dark:text-zinc-300">E-posta</Label>
                  <Input
                    defaultValue="support@kleacore.com"
                    className="bg-zinc-100 dark:bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-700 dark:text-zinc-300">Telefon</Label>
                  <Input
                    defaultValue="+1 (307) 555-0123"
                    className="bg-zinc-100 dark:bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-900 dark:text-white">Logo</CardTitle>
              <CardDescription className="text-zinc-500">
                Site logonuzu güncelleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="h-16 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">KLEACORE</span>
                </div>
                <Button variant="outline" className="border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                  <Upload className="mr-2 h-4 w-4" />
                  Logo Yükle
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="bg-primary hover:bg-primary/90">
              <Save className="mr-2 h-4 w-4" />
              Değişiklikleri Kaydet
            </Button>
          </div>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="mt-6 space-y-6">
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-900 dark:text-white">SMTP Ayarları</CardTitle>
              <CardDescription className="text-zinc-500">
                E-posta gönderimi için SMTP sunucunuzu yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-zinc-700 dark:text-zinc-300">SMTP Sunucu</Label>
                  <Input
                    defaultValue="smtp.kleacore.com"
                    className="bg-zinc-100 dark:bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-700 dark:text-zinc-300">Port</Label>
                  <Input
                    defaultValue="587"
                    className="bg-zinc-100 dark:bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-zinc-700 dark:text-zinc-300">Kullanıcı Adı</Label>
                  <Input
                    defaultValue="noreply@kleacore.com"
                    className="bg-zinc-100 dark:bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-700 dark:text-zinc-300">Şifre</Label>
                  <Input
                    type="password"
                    defaultValue="************"
                    className="bg-zinc-100 dark:bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-900 dark:text-white">E-posta Şablonları</CardTitle>
              <CardDescription className="text-zinc-500">
                Otomatik e-posta şablonlarını düzenleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Hoş Geldiniz", description: "Yeni kayıt sonrası gönderilir" },
                  { name: "Fatura Bildirimi", description: "Yeni fatura oluşturulduğunda" },
                  { name: "Ödeme Hatırlatma", description: "Vadesi yaklaşan faturalar için" },
                  { name: "Hizmet Yenileme", description: "Süre bitimi yaklaşırken" },
                  { name: "Destek Yanıtı", description: "Destek talebine yanıt verildiğinde" },
                ].map((template) => (
                  <div
                    key={template.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-zinc-100 dark:bg-zinc-200 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-200 dark:bg-zinc-800 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">{template.name}</p>
                      <p className="text-xs text-zinc-500">{template.description}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                      Düzenle
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-900 dark:text-white">Bildirim Tercihleri</CardTitle>
              <CardDescription className="text-zinc-500">
                Hangi bildirimleri almak istediğinizi seçin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">E-posta Bildirimleri</p>
                  <p className="text-xs text-zinc-500">Önemli güncellemeler için e-posta alın</p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <Separator className="bg-zinc-200 dark:bg-zinc-800" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">SMS Bildirimleri</p>
                  <p className="text-xs text-zinc-500">Kritik durumlar için SMS alın</p>
                </div>
                <Switch
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>
              <Separator className="bg-zinc-200 dark:bg-zinc-800" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">Otomatik Faturalama</p>
                  <p className="text-xs text-zinc-500">Faturaları otomatik oluştur ve gönder</p>
                </div>
                <Switch
                  checked={autoInvoice}
                  onCheckedChange={setAutoInvoice}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment" className="mt-6 space-y-6">
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-900 dark:text-white">Ödeme Yöntemleri</CardTitle>
              <CardDescription className="text-zinc-500">
                Kabul edilen ödeme yöntemlerini yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Kredi Kartı", provider: "Stripe", status: "active" },
                { name: "Banka Havale/EFT", provider: "Manuel", status: "active" },
                { name: "PayPal", provider: "PayPal", status: "inactive" },
              ].map((method) => (
                <div
                  key={method.name}
                  className="flex items-center justify-between p-4 rounded-lg bg-zinc-100 dark:bg-zinc-200 dark:bg-zinc-800/50"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-zinc-500" />
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">{method.name}</p>
                      <p className="text-xs text-zinc-500">{method.provider}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={method.status === "active" ? "default" : "secondary"}>
                      {method.status === "active" ? "Aktif" : "Pasif"}
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                      Yapılandır
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="mt-6 space-y-6">
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-900 dark:text-white">Güvenlik Ayarları</CardTitle>
              <CardDescription className="text-zinc-500">
                Hesap güvenliğinizi yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">İki Faktörlü Doğrulama</p>
                  <p className="text-xs text-zinc-500">Giriş için ek güvenlik katmanı</p>
                </div>
                <Switch
                  checked={twoFactor}
                  onCheckedChange={setTwoFactor}
                />
              </div>
              <Separator className="bg-zinc-200 dark:bg-zinc-800" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">Şifre Değiştir</p>
                  <p className="text-xs text-zinc-500">Son değişiklik: 3 ay önce</p>
                </div>
                <Button variant="outline" size="sm" className="border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                  Değiştir
                </Button>
              </div>
              <Separator className="bg-zinc-200 dark:bg-zinc-800" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">Aktif Oturumlar</p>
                  <p className="text-xs text-zinc-500">2 aktif oturum</p>
                </div>
                <Button variant="outline" size="sm" className="border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                  Görüntüle
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users */}
        <TabsContent value="users" className="mt-6 space-y-6">
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-zinc-900 dark:text-white">Admin Kullanıcıları</CardTitle>
                <CardDescription className="text-zinc-500">
                  Yönetim paneline erişimi olan kullanıcılar
                </CardDescription>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Users className="mr-2 h-4 w-4" />
                Kullanıcı Ekle
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {adminUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-zinc-100 dark:bg-zinc-200 dark:bg-zinc-800/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white text-sm font-medium">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-zinc-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge variant="outline">{user.role}</Badge>
                        <p className="text-xs text-zinc-500 mt-1">Son: {user.lastLogin}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                        Düzenle
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API */}
        <TabsContent value="api" className="mt-6 space-y-6">
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-zinc-900 dark:text-white">API Anahtarları</CardTitle>
                <CardDescription className="text-zinc-500">
                  Entegrasyonlar için API anahtarlarınızı yönetin
                </CardDescription>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Key className="mr-2 h-4 w-4" />
                Yeni Anahtar
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {apiKeys.map((key) => (
                  <div
                    key={key.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-zinc-100 dark:bg-zinc-200 dark:bg-zinc-800/50"
                  >
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">{key.name}</p>
                      <p className="text-xs font-mono text-zinc-500">{key.key}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right text-xs text-zinc-500">
                        <p>Oluşturulma: {key.created}</p>
                        <p>Son kullanım: {key.lastUsed}</p>
                      </div>
                      <Button variant="destructive" size="sm">
                        İptal Et
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-900 dark:text-white">Webhook URL&apos;leri</CardTitle>
              <CardDescription className="text-zinc-500">
                Olayları harici sistemlere bildirin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-zinc-700 dark:text-zinc-300">Sipariş Webhook</Label>
                <Input
                  placeholder="https://example.com/webhook/orders"
                  className="bg-zinc-100 dark:bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-600"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-700 dark:text-zinc-300">Ödeme Webhook</Label>
                <Input
                  placeholder="https://example.com/webhook/payments"
                  className="bg-zinc-100 dark:bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-600"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Save className="mr-2 h-4 w-4" />
                Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </BlurFade>
    </div>
  );
}
