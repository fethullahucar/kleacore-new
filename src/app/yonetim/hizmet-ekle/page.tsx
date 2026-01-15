"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Server,
  HardDrive,
  Cloud,
  Globe,
  Shield,
  Mail,
  User,
  Package,
  Calendar,
  CreditCard,
  Save,
  Loader2,
  Search,
  Check,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";

// Kategori konfigürasyonu
const categories = [
  { id: "hosting", name: "Web Hosting", icon: Server, color: "bg-blue-500/10 text-blue-500 border-blue-500/30" },
  { id: "vds", name: "VDS Sunucu", icon: HardDrive, color: "bg-purple-500/10 text-purple-500 border-purple-500/30" },
  { id: "vps", name: "VPS Sunucu", icon: Cloud, color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/30" },
  { id: "server", name: "Fiziksel Sunucu", icon: Server, color: "bg-orange-500/10 text-orange-500 border-orange-500/30" },
  { id: "domain", name: "Domain", icon: Globe, color: "bg-green-500/10 text-green-500 border-green-500/30" },
  { id: "ssl", name: "SSL Sertifikası", icon: Shield, color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30" },
  { id: "email", name: "Kurumsal E-posta", icon: Mail, color: "bg-pink-500/10 text-pink-500 border-pink-500/30" },
];

// Mock ürün paketleri
const packages: Record<string, Array<{ id: string; name: string; price: number; features: string[] }>> = {
  hosting: [
    { id: "host-starter", name: "Starter Hosting", price: 49, features: ["5 GB SSD", "50 GB Trafik", "5 E-posta"] },
    { id: "host-pro", name: "Profesyonel Hosting", price: 99, features: ["10 GB SSD", "100 GB Trafik", "25 E-posta"] },
    { id: "host-business", name: "Kurumsal Hosting", price: 199, features: ["25 GB SSD", "Sınırsız Trafik", "50 E-posta"] },
  ],
  vds: [
    { id: "vds-small", name: "VDS Small", price: 199, features: ["2 vCPU", "4 GB RAM", "50 GB SSD"] },
    { id: "vds-medium", name: "VDS Medium", price: 349, features: ["4 vCPU", "8 GB RAM", "100 GB SSD"] },
    { id: "vds-large", name: "VDS Large", price: 549, features: ["8 vCPU", "16 GB RAM", "200 GB SSD"] },
  ],
  vps: [
    { id: "vps-basic", name: "VPS Basic", price: 149, features: ["1 vCPU", "2 GB RAM", "30 GB SSD"] },
    { id: "vps-standard", name: "VPS Standard", price: 249, features: ["2 vCPU", "4 GB RAM", "60 GB SSD"] },
    { id: "vps-premium", name: "VPS Premium", price: 399, features: ["4 vCPU", "8 GB RAM", "120 GB SSD"] },
  ],
  server: [
    { id: "srv-entry", name: "Entry Server", price: 999, features: ["Intel Xeon", "16 GB RAM", "500 GB HDD"] },
    { id: "srv-business", name: "Business Server", price: 1499, features: ["Intel Xeon", "32 GB RAM", "1 TB SSD"] },
  ],
  domain: [
    { id: "dom-com", name: ".com Domain", price: 129, features: ["1 Yıl", "WHOIS Gizliliği", "DNS Yönetimi"] },
    { id: "dom-net", name: ".net Domain", price: 139, features: ["1 Yıl", "WHOIS Gizliliği", "DNS Yönetimi"] },
    { id: "dom-tr", name: ".com.tr Domain", price: 89, features: ["1 Yıl", "DNS Yönetimi"] },
  ],
  ssl: [
    { id: "ssl-dv", name: "DV SSL", price: 99, features: ["Domain Doğrulama", "256-bit", "1 Domain"] },
    { id: "ssl-ov", name: "OV SSL", price: 299, features: ["Organizasyon Doğrulama", "256-bit", "1 Domain"] },
    { id: "ssl-wildcard", name: "Wildcard SSL", price: 499, features: ["Domain Doğrulama", "256-bit", "Sınırsız Alt Domain"] },
  ],
  email: [
    { id: "email-basic", name: "Temel E-posta", price: 49, features: ["5 Hesap", "5 GB/hesap", "Webmail"] },
    { id: "email-pro", name: "Profesyonel E-posta", price: 99, features: ["25 Hesap", "10 GB/hesap", "Webmail + IMAP"] },
    { id: "email-enterprise", name: "Kurumsal E-posta", price: 199, features: ["Sınırsız Hesap", "25 GB/hesap", "Exchange"] },
  ],
};

// Mock müşteri listesi
const customers = [
  { id: "M-001", name: "Ahmet Yılmaz", email: "ahmet@example.com" },
  { id: "M-002", name: "Ayşe Demir", email: "ayse@example.com" },
  { id: "M-003", name: "Mehmet Kaya", email: "mehmet@example.com" },
  { id: "M-004", name: "Fatma Şahin", email: "fatma@example.com" },
  { id: "M-005", name: "Can Özkan", email: "can@example.com" },
];

// Mock sunucu listesi
const servers = [
  { id: "SRV-01", name: "Web Server 01", ip: "185.123.45.67", location: "İstanbul" },
  { id: "SRV-02", name: "Web Server 02", ip: "185.123.45.68", location: "İstanbul" },
  { id: "SRV-03", name: "VDS Server 01", ip: "185.123.45.70", location: "Frankfurt" },
  { id: "SRV-04", name: "VPS Server 01", ip: "185.123.45.71", location: "Amsterdam" },
];

// Faturalama dönemleri
const billingPeriods = [
  { id: "monthly", name: "Aylık", months: 1, discount: 0 },
  { id: "quarterly", name: "3 Aylık", months: 3, discount: 5 },
  { id: "semiannual", name: "6 Aylık", months: 6, discount: 10 },
  { id: "yearly", name: "Yıllık", months: 12, discount: 16 },
  { id: "biennial", name: "2 Yıllık", months: 24, discount: 20 },
];

export default function AddServicePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");

  const [formData, setFormData] = useState({
    customerId: "",
    category: "",
    packageId: "",
    domain: "",
    billingPeriod: "yearly",
    serverId: "",
    status: "active",
    startDate: new Date().toISOString().split("T")[0],
    notes: "",
    createInvoice: true,
    sendNotification: true,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Kategori değiştiğinde paket seçimini sıfırla
    if (field === "category") {
      setFormData((prev) => ({ ...prev, packageId: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simüle edilmiş API çağrısı
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Başarılı kayıt sonrası yönlendirme
    router.push("/yonetim/hizmetler");
  };

  // Seçili kategori için paketleri getir
  const selectedPackages = formData.category ? packages[formData.category] || [] : [];

  // Seçili paket bilgisi
  const selectedPackage = selectedPackages.find((p) => p.id === formData.packageId);

  // Seçili müşteri bilgisi
  const selectedCustomer = customers.find((c) => c.id === formData.customerId);

  // Seçili faturalama dönemi
  const selectedPeriod = billingPeriods.find((p) => p.id === formData.billingPeriod);

  // Fiyat hesaplama
  const calculatePrice = () => {
    if (!selectedPackage || !selectedPeriod) return { base: 0, discount: 0, total: 0 };
    const base = selectedPackage.price * selectedPeriod.months;
    const discount = base * (selectedPeriod.discount / 100);
    const total = base - discount;
    return { base, discount, total };
  };

  const pricing = calculatePrice();

  // Müşteri filtreleme
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(customerSearch.toLowerCase())
  );

  // Kategori için domain gerekli mi?
  const needsDomain = ["hosting", "ssl", "email", "domain"].includes(formData.category);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <BlurFade delay={0}>
        <Link
          href="/yonetim/hizmetler"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Hizmetlere Dön
        </Link>
      </BlurFade>

      {/* Page Header */}
      <BlurFade delay={0.1}>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Yeni Hizmet Ekle</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Müşteriye yeni bir hizmet tanımlayın</p>
        </div>
      </BlurFade>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Müşteri Seçimi */}
            <BlurFade delay={0.2}>
              <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-900 dark:text-white flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Müşteri Seçimi
                  </CardTitle>
                  <CardDescription className="text-zinc-500">
                    Hizmetin tanımlanacağı müşteriyi seçin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <Input
                      placeholder="Müşteri ara..."
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                      className="pl-10 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                    />
                  </div>
                  <div className="grid gap-2 max-h-48 overflow-y-auto">
                    {filteredCustomers.map((customer) => (
                      <button
                        key={customer.id}
                        type="button"
                        onClick={() => handleInputChange("customerId", customer.id)}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg border transition-all text-left",
                          formData.customerId === customer.id
                            ? "border-primary bg-primary/5"
                            : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm font-medium">
                            {customer.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <p className={cn(
                              "text-sm font-medium",
                              formData.customerId === customer.id ? "text-primary" : "text-zinc-900 dark:text-white"
                            )}>
                              {customer.name}
                            </p>
                            <p className="text-xs text-zinc-500">{customer.email}</p>
                          </div>
                        </div>
                        {formData.customerId === customer.id && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </BlurFade>

            {/* Kategori Seçimi */}
            <BlurFade delay={0.3}>
              <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-900 dark:text-white flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Hizmet Kategorisi
                  </CardTitle>
                  <CardDescription className="text-zinc-500">
                    Eklenecek hizmetin kategorisini seçin
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      const isSelected = formData.category === category.id;
                      return (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => handleInputChange("category", category.id)}
                          className={cn(
                            "flex flex-col items-center p-4 rounded-lg border-2 transition-all",
                            isSelected
                              ? "border-primary bg-primary/5"
                              : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
                          )}
                        >
                          <div className={cn("p-2 rounded-lg mb-2", category.color)}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className={cn(
                            "text-xs font-medium text-center",
                            isSelected ? "text-primary" : "text-zinc-700 dark:text-zinc-300"
                          )}>
                            {category.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </BlurFade>

            {/* Paket Seçimi */}
            {formData.category && (
              <BlurFade delay={0.35}>
                <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-zinc-900 dark:text-white flex items-center gap-2">
                      <Server className="h-5 w-5" />
                      Paket Seçimi
                    </CardTitle>
                    <CardDescription className="text-zinc-500">
                      Müşteriye tanımlanacak paketi seçin
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 md:grid-cols-3">
                      {selectedPackages.map((pkg) => {
                        const isSelected = formData.packageId === pkg.id;
                        return (
                          <button
                            key={pkg.id}
                            type="button"
                            onClick={() => handleInputChange("packageId", pkg.id)}
                            className={cn(
                              "p-4 rounded-lg border-2 transition-all text-left",
                              isSelected
                                ? "border-primary bg-primary/5"
                                : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
                            )}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className={cn(
                                "font-medium",
                                isSelected ? "text-primary" : "text-zinc-900 dark:text-white"
                              )}>
                                {pkg.name}
                              </span>
                              {isSelected && <Check className="h-4 w-4 text-primary" />}
                            </div>
                            <p className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                              ₺{pkg.price}<span className="text-xs font-normal text-zinc-500">/ay</span>
                            </p>
                            <div className="space-y-1">
                              {pkg.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <div className="h-1 w-1 rounded-full bg-zinc-400" />
                                  <span className="text-xs text-zinc-500">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            )}

            {/* Domain ve Ek Bilgiler */}
            {formData.packageId && (
              <BlurFade delay={0.4}>
                <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-zinc-900 dark:text-white flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Hizmet Detayları
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {needsDomain && (
                      <div className="space-y-2">
                        <Label htmlFor="domain" className="text-zinc-700 dark:text-zinc-300">
                          Domain Adı <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="domain"
                          placeholder="ornek.com"
                          value={formData.domain}
                          onChange={(e) => handleInputChange("domain", e.target.value)}
                          required={needsDomain}
                          className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                        />
                      </div>
                    )}

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-zinc-700 dark:text-zinc-300">Sunucu</Label>
                        <Select
                          value={formData.serverId}
                          onValueChange={(value) => handleInputChange("serverId", value)}
                        >
                          <SelectTrigger className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white">
                            <SelectValue placeholder="Sunucu seçin" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                            {servers.map((server) => (
                              <SelectItem key={server.id} value={server.id}>
                                {server.name} ({server.location})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="startDate" className="text-zinc-700 dark:text-zinc-300">
                          Başlangıç Tarihi
                        </Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => handleInputChange("startDate", e.target.value)}
                          className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            )}
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="space-y-6">
            {/* Faturalama Dönemi */}
            <BlurFade delay={0.45}>
              <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-900 dark:text-white text-base flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Faturalama Dönemi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {billingPeriods.map((period) => (
                    <button
                      key={period.id}
                      type="button"
                      onClick={() => handleInputChange("billingPeriod", period.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-lg border transition-all",
                        formData.billingPeriod === period.id
                          ? "border-primary bg-primary/5"
                          : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
                      )}
                    >
                      <span className={cn(
                        "text-sm font-medium",
                        formData.billingPeriod === period.id ? "text-primary" : "text-zinc-900 dark:text-white"
                      )}>
                        {period.name}
                      </span>
                      {period.discount > 0 && (
                        <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                          %{period.discount} indirim
                        </Badge>
                      )}
                    </button>
                  ))}
                </CardContent>
              </Card>
            </BlurFade>

            {/* Fiyat Özeti */}
            <BlurFade delay={0.5}>
              <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-900 dark:text-white text-base flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Fiyat Özeti
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedPackage ? (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-500">Paket</span>
                        <span className="text-zinc-900 dark:text-white">{selectedPackage.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-500">Dönem</span>
                        <span className="text-zinc-900 dark:text-white">{selectedPeriod?.name}</span>
                      </div>
                      <Separator className="bg-zinc-200 dark:bg-zinc-800" />
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-500">Ara Toplam</span>
                        <span className="text-zinc-900 dark:text-white">₺{pricing.base.toLocaleString("tr-TR")}</span>
                      </div>
                      {pricing.discount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-500">İndirim</span>
                          <span className="text-green-500">-₺{pricing.discount.toLocaleString("tr-TR")}</span>
                        </div>
                      )}
                      <Separator className="bg-zinc-200 dark:bg-zinc-800" />
                      <div className="flex justify-between">
                        <span className="font-medium text-zinc-900 dark:text-white">Toplam</span>
                        <span className="text-xl font-bold text-primary">₺{pricing.total.toLocaleString("tr-TR")}</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-zinc-500 text-center py-4">
                      Paket seçildiğinde fiyat görüntülenecek
                    </p>
                  )}
                </CardContent>
              </Card>
            </BlurFade>

            {/* Ek Seçenekler */}
            <BlurFade delay={0.55}>
              <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-900 dark:text-white text-base">Ek Seçenekler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">Fatura Oluştur</p>
                      <p className="text-xs text-zinc-500">Otomatik fatura oluştur</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleInputChange("createInvoice", !formData.createInvoice)}
                      className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                        formData.createInvoice ? "bg-primary" : "bg-zinc-300 dark:bg-zinc-700"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                          formData.createInvoice ? "translate-x-6" : "translate-x-1"
                        )}
                      />
                    </button>
                  </div>
                  <Separator className="bg-zinc-200 dark:bg-zinc-800" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">Bildirim Gönder</p>
                      <p className="text-xs text-zinc-500">Müşteriye e-posta gönder</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleInputChange("sendNotification", !formData.sendNotification)}
                      className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                        formData.sendNotification ? "bg-primary" : "bg-zinc-300 dark:bg-zinc-700"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                          formData.sendNotification ? "translate-x-6" : "translate-x-1"
                        )}
                      />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>

            {/* Notlar */}
            <BlurFade delay={0.6}>
              <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-900 dark:text-white text-base flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Notlar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Hizmet hakkında özel notlar..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500 min-h-20"
                  />
                </CardContent>
              </Card>
            </BlurFade>

            {/* Action Buttons */}
            <BlurFade delay={0.65}>
              <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <CardContent className="p-4 space-y-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.customerId || !formData.packageId}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Kaydediliyor...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Hizmeti Kaydet
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/yonetim/hizmetler")}
                    className="w-full border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  >
                    İptal
                  </Button>
                </CardContent>
              </Card>
            </BlurFade>
          </div>
        </div>
      </form>
    </div>
  );
}
