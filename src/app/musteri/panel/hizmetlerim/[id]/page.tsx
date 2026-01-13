"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  Server,
  Shield,
  Cloud,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  XCircle,
  ExternalLink,
  RefreshCcw,
  Settings,
  CreditCard,
  Calendar,
  Globe,
  HardDrive,
  Cpu,
  MemoryStick,
  Activity,
  Download,
  Upload,
  Power,
  Terminal,
  Copy,
  FileText,
  Mail,
  Database,
  FolderOpen,
  Users,
  Lock,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock services database
const servicesDB: Record<string, {
  id: number;
  name: string;
  type: "hosting" | "server" | "ssl";
  category: string;
  domain: string;
  status: "active" | "expiring" | "expired" | "suspended";
  createdAt: string;
  expiresAt: string;
  price: string;
  billingCycle: string;
  ip?: string;
  nameservers?: string[];
  specs?: {
    cpu?: string;
    ram?: string;
    storage?: string;
    bandwidth?: string;
    os?: string;
  };
  usage?: {
    disk?: { used: number; total: number };
    bandwidth?: { used: number; total: number };
    cpu?: number;
    ram?: number;
    emails?: number;
    databases?: number;
    subdomains?: number;
  };
  features?: string[];
}> = {
  "1": {
    id: 1,
    name: "Linux Hosting Pro",
    type: "hosting",
    category: "Hosting",
    domain: "example.com",
    status: "active",
    createdAt: "15 Ocak 2024",
    expiresAt: "15 Ocak 2026",
    price: "199.00",
    billingCycle: "Yıllık",
    ip: "185.92.1.45",
    nameservers: ["ns1.kleacore.com", "ns2.kleacore.com"],
    specs: {
      storage: "50 GB NVMe SSD",
      bandwidth: "Sınırsız",
    },
    usage: {
      disk: { used: 12.5, total: 50 },
      bandwidth: { used: 45.2, total: 1000 },
      emails: 15,
      databases: 3,
      subdomains: 5,
    },
    features: ["cPanel", "Ücretsiz SSL", "Günlük Yedekleme", "E-posta Hesapları", "MySQL Veritabanı"],
  },
  "2": {
    id: 2,
    name: "WordPress Starter",
    type: "hosting",
    category: "WordPress",
    domain: "blog.example.com",
    status: "active",
    createdAt: "20 Mart 2024",
    expiresAt: "20 Mart 2025",
    price: "149.00",
    billingCycle: "Yıllık",
    ip: "185.92.1.78",
    nameservers: ["ns1.kleacore.com", "ns2.kleacore.com"],
    specs: {
      storage: "25 GB NVMe SSD",
      bandwidth: "Sınırsız",
    },
    usage: {
      disk: { used: 8.3, total: 25 },
      bandwidth: { used: 28.7, total: 500 },
      emails: 5,
      databases: 1,
      subdomains: 2,
    },
    features: ["WordPress Optimize", "Otomatik Güncelleme", "Staging Ortamı", "CDN Desteği"],
  },
  "3": {
    id: 3,
    name: "VDS-M Sunucu",
    type: "server",
    category: "VDS",
    domain: "srv1.example.com",
    status: "active",
    createdAt: "10 Şubat 2024",
    expiresAt: "10 Şubat 2025",
    price: "549.00",
    billingCycle: "Aylık",
    ip: "203.0.113.42",
    specs: {
      cpu: "4 vCPU (AMD EPYC)",
      ram: "8 GB DDR4 ECC",
      storage: "100 GB NVMe SSD",
      bandwidth: "5 TB",
      os: "Ubuntu 22.04 LTS",
    },
    usage: {
      cpu: 35,
      ram: 62,
      disk: { used: 45, total: 100 },
      bandwidth: { used: 1.2, total: 5 },
    },
    features: ["Root Erişimi", "KVM Sanallaştırma", "DDoS Koruması", "Snapshot", "Private Network"],
  },
  "4": {
    id: 4,
    name: "Cloud-S",
    type: "server",
    category: "Bulut",
    domain: "cloud.example.com",
    status: "active",
    createdAt: "5 Nisan 2024",
    expiresAt: "5 Nisan 2025",
    price: "299.00",
    billingCycle: "Aylık",
    ip: "203.0.113.88",
    specs: {
      cpu: "2 vCPU",
      ram: "4 GB DDR5",
      storage: "80 GB NVMe SSD",
      bandwidth: "3 TB",
      os: "Debian 12",
    },
    usage: {
      cpu: 18,
      ram: 45,
      disk: { used: 22, total: 80 },
      bandwidth: { used: 0.8, total: 3 },
    },
    features: ["Otomatik Ölçeklendirme", "Load Balancer", "API Desteği", "Anlık Snapshot"],
  },
  "5": {
    id: 5,
    name: "Wildcard SSL",
    type: "ssl",
    category: "SSL",
    domain: "*.example.com",
    status: "expiring",
    createdAt: "1 Ocak 2024",
    expiresAt: "1 Ocak 2025",
    price: "599.00",
    billingCycle: "Yıllık",
    features: ["256-bit Şifreleme", "Wildcard Desteği", "Sınırsız Subdomain", "Mobil Uyumlu", "$250,000 Garanti"],
  },
};

const statusConfig = {
  active: {
    label: "Aktif",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    icon: CheckCircle2,
  },
  expiring: {
    label: "Sona Eriyor",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    icon: AlertCircle,
  },
  expired: {
    label: "Süresi Doldu",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    icon: XCircle,
  },
  suspended: {
    label: "Askıda",
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
    borderColor: "border-gray-500/30",
    icon: Clock,
  },
};

const typeIcons = {
  hosting: Package,
  server: Server,
  ssl: Shield,
};

// Recent activity mock data
const recentActivity = [
  { action: "Giriş yapıldı", detail: "cPanel", time: "2 saat önce", icon: ExternalLink },
  { action: "Yedekleme tamamlandı", detail: "Otomatik", time: "6 saat önce", icon: Download },
  { action: "SSL yenilendi", detail: "Let's Encrypt", time: "1 gün önce", icon: Shield },
  { action: "DNS güncellendi", detail: "A kaydı", time: "3 gün önce", icon: Globe },
];

export default function HizmetDetayPage() {
  const params = useParams();
  const id = params.id as string;
  const service = servicesDB[id];

  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Package className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Hizmet Bulunamadı</h2>
        <p className="text-muted-foreground mb-4">İstediğiniz hizmet mevcut değil.</p>
        <Button asChild>
          <Link href="/musteri/panel/hizmetlerim">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Hizmetlere Dön
          </Link>
        </Button>
      </div>
    );
  }

  const status = statusConfig[service.status];
  const StatusIcon = status.icon;
  const TypeIcon = typeIcons[service.type];

  return (
    <div className="space-y-6">
      {/* Back Button & Header */}
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col gap-4">
          <Link
            href="/musteri/panel/hizmetlerim"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Hizmetlere Dön
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={cn("p-4 rounded-xl", status.bgColor)}>
                <TypeIcon className={cn("h-8 w-8", status.color)} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold tracking-tight">{service.name}</h1>
                  <span className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                    status.bgColor, status.color
                  )}>
                    <StatusIcon className="h-3 w-3" />
                    {status.label}
                  </span>
                </div>
                <p className="text-muted-foreground mt-1">{service.domain}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Bitiş: {service.expiresAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <CreditCard className="h-4 w-4" />
                    {service.price} TL / {service.billingCycle}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Yenile
              </Button>
              <Button>
                <Settings className="mr-2 h-4 w-4" />
                Yönet
              </Button>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Quick Actions */}
      <BlurFade delay={0.15} inView>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Hızlı İşlemler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              {service.type === "hosting" && (
                <>
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <ExternalLink className="mr-2 h-4 w-4 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">cPanel</p>
                      <p className="text-xs text-muted-foreground">Kontrol paneli</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3" asChild>
                    <Link href="/musteri/panel/webmail">
                      <Mail className="mr-2 h-4 w-4 text-primary" />
                      <div className="text-left">
                        <p className="font-medium">Webmail</p>
                        <p className="text-xs text-muted-foreground">E-posta yönetimi</p>
                      </div>
                    </Link>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <Database className="mr-2 h-4 w-4 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">phpMyAdmin</p>
                      <p className="text-xs text-muted-foreground">Veritabanı yönetimi</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <FolderOpen className="mr-2 h-4 w-4 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">Dosya Yöneticisi</p>
                      <p className="text-xs text-muted-foreground">Dosya işlemleri</p>
                    </div>
                  </Button>
                </>
              )}
              {service.type === "server" && (
                <>
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <Terminal className="mr-2 h-4 w-4 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">SSH Konsol</p>
                      <p className="text-xs text-muted-foreground">Terminal erişimi</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <Power className="mr-2 h-4 w-4 text-orange-500" />
                    <div className="text-left">
                      <p className="font-medium">Yeniden Başlat</p>
                      <p className="text-xs text-muted-foreground">Sunucuyu restart et</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <Download className="mr-2 h-4 w-4 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">Snapshot Al</p>
                      <p className="text-xs text-muted-foreground">Anlık görüntü</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <Settings className="mr-2 h-4 w-4 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">OS Değiştir</p>
                      <p className="text-xs text-muted-foreground">İşletim sistemi</p>
                    </div>
                  </Button>
                </>
              )}
              {service.type === "ssl" && (
                <>
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <Download className="mr-2 h-4 w-4 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">Sertifika İndir</p>
                      <p className="text-xs text-muted-foreground">CRT dosyası</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <Lock className="mr-2 h-4 w-4 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">Private Key</p>
                      <p className="text-xs text-muted-foreground">Özel anahtar</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <RefreshCcw className="mr-2 h-4 w-4 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">Yeniden Oluştur</p>
                      <p className="text-xs text-muted-foreground">CSR & Key</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <FileText className="mr-2 h-4 w-4 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">CA Bundle</p>
                      <p className="text-xs text-muted-foreground">Ara sertifika</p>
                    </div>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Resource Usage - For Hosting & Server */}
          {(service.type === "hosting" || service.type === "server") && service.usage && (
            <BlurFade delay={0.2} inView>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Kaynak Kullanımı
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {service.usage.disk && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="flex items-center gap-2">
                          <HardDrive className="h-4 w-4 text-muted-foreground" />
                          Disk Kullanımı
                        </span>
                        <span className="font-medium">
                          {service.usage.disk.used} GB / {service.usage.disk.total} GB
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            (service.usage.disk.used / service.usage.disk.total) * 100 > 80
                              ? "bg-red-500"
                              : (service.usage.disk.used / service.usage.disk.total) * 100 > 60
                              ? "bg-orange-500"
                              : "bg-primary"
                          )}
                          style={{ width: `${(service.usage.disk.used / service.usage.disk.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {service.usage.bandwidth && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="flex items-center gap-2">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          Bant Genişliği
                        </span>
                        <span className="font-medium">
                          {service.usage.bandwidth.used} {service.type === "server" ? "TB" : "GB"} / {service.usage.bandwidth.total} {service.type === "server" ? "TB" : "GB"}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${(service.usage.bandwidth.used / service.usage.bandwidth.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {service.type === "server" && service.usage.cpu !== undefined && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="flex items-center gap-2">
                          <Cpu className="h-4 w-4 text-muted-foreground" />
                          CPU Kullanımı
                        </span>
                        <span className="font-medium">{service.usage.cpu}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            service.usage.cpu > 80 ? "bg-red-500" : service.usage.cpu > 60 ? "bg-orange-500" : "bg-green-500"
                          )}
                          style={{ width: `${service.usage.cpu}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {service.type === "server" && service.usage.ram !== undefined && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="flex items-center gap-2">
                          <MemoryStick className="h-4 w-4 text-muted-foreground" />
                          RAM Kullanımı
                        </span>
                        <span className="font-medium">{service.usage.ram}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            service.usage.ram > 80 ? "bg-red-500" : service.usage.ram > 60 ? "bg-orange-500" : "bg-purple-500"
                          )}
                          style={{ width: `${service.usage.ram}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {service.type === "hosting" && (
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <Mail className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
                        <p className="text-2xl font-bold">{service.usage.emails}</p>
                        <p className="text-xs text-muted-foreground">E-posta</p>
                      </div>
                      <div className="text-center">
                        <Database className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
                        <p className="text-2xl font-bold">{service.usage.databases}</p>
                        <p className="text-xs text-muted-foreground">Veritabanı</p>
                      </div>
                      <div className="text-center">
                        <Globe className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
                        <p className="text-2xl font-bold">{service.usage.subdomains}</p>
                        <p className="text-xs text-muted-foreground">Subdomain</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </BlurFade>
          )}

          {/* Server Specs - For Servers */}
          {service.type === "server" && service.specs && (
            <BlurFade delay={0.25} inView>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-primary" />
                    Sunucu Özellikleri
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {service.specs.cpu && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Cpu className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">İşlemci</p>
                          <p className="font-medium">{service.specs.cpu}</p>
                        </div>
                      </div>
                    )}
                    {service.specs.ram && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <MemoryStick className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="text-xs text-muted-foreground">RAM</p>
                          <p className="font-medium">{service.specs.ram}</p>
                        </div>
                      </div>
                    )}
                    {service.specs.storage && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <HardDrive className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-xs text-muted-foreground">Depolama</p>
                          <p className="font-medium">{service.specs.storage}</p>
                        </div>
                      </div>
                    )}
                    {service.specs.bandwidth && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Activity className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="text-xs text-muted-foreground">Bant Genişliği</p>
                          <p className="font-medium">{service.specs.bandwidth}</p>
                        </div>
                      </div>
                    )}
                    {service.specs.os && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 sm:col-span-2">
                        <Terminal className="h-5 w-5 text-orange-500" />
                        <div>
                          <p className="text-xs text-muted-foreground">İşletim Sistemi</p>
                          <p className="font-medium">{service.specs.os}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          )}

          {/* SSL Details */}
          {service.type === "ssl" && (
            <BlurFade delay={0.2} inView>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Sertifika Detayları
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Sertifika Tipi</p>
                      <p className="font-semibold mt-1">Wildcard SSL</p>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Şifreleme</p>
                      <p className="font-semibold mt-1">256-bit</p>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Kapsam</p>
                      <p className="font-semibold mt-1">{service.domain}</p>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Garanti</p>
                      <p className="font-semibold mt-1">$250,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          )}

          {/* Features */}
          {service.features && (
            <BlurFade delay={0.3} inView>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Özellikler
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Service Info */}
          <BlurFade delay={0.35} inView>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Hizmet Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hizmet ID</span>
                    <span className="font-medium">#{service.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Kategori</span>
                    <span className="font-medium">{service.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Başlangıç</span>
                    <span className="font-medium">{service.createdAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bitiş</span>
                    <span className="font-medium">{service.expiresAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fiyat</span>
                    <span className="font-medium">{service.price} TL / {service.billingCycle}</span>
                  </div>
                  {service.ip && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">IP Adresi</span>
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-xs">{service.ip}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {service.nameservers && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Nameservers</p>
                    <div className="space-y-1">
                      {service.nameservers.map((ns, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <code className="text-xs bg-muted px-2 py-1 rounded">{ns}</code>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t space-y-2">
                  <Button className="w-full" variant="outline">
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Hizmeti Yenile
                  </Button>
                  <Button className="w-full" variant="outline">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Faturayı Görüntüle
                  </Button>
                </div>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Recent Activity */}
          <BlurFade delay={0.4} inView>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Son Aktiviteler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <div className="p-1.5 rounded-lg bg-muted">
                        <activity.icon className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.detail}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Support */}
          <BlurFade delay={0.45} inView>
            <Card className="border-dashed">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium mb-1">Yardıma mı ihtiyacınız var?</p>
                    <p className="text-muted-foreground mb-3">
                      7/24 teknik destek ekibimiz size yardımcı olmaya hazır.
                    </p>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/musteri/panel/destek">
                        Destek Talebi Aç
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
