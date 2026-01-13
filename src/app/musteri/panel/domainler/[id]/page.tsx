"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Globe,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RefreshCcw,
  Settings,
  Shield,
  Lock,
  Unlock,
  Calendar,
  Server,
  Plus,
  Trash2,
  Edit,
  Copy,
  ExternalLink,
  ArrowRightLeft,
  Clock,
  FileText,
  Mail,
  MapPin,
  Building,
  User,
  Phone,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock domains database
const domainsDB: Record<string, {
  id: number;
  name: string;
  registrar: string;
  status: "active" | "expiring" | "expired";
  autoRenew: boolean;
  privacy: boolean;
  ssl: boolean;
  registeredAt: string;
  expiresAt: string;
  price: string;
  nameservers: string[];
  dnsRecords: Array<{
    id: number;
    type: string;
    name: string;
    value: string;
    ttl: number;
    priority?: number;
  }>;
  whois: {
    registrant: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  };
}> = {
  "1": {
    id: 1,
    name: "example.com",
    registrar: "KLEACORE",
    status: "active",
    autoRenew: true,
    privacy: true,
    ssl: true,
    registeredAt: "15 Ocak 2020",
    expiresAt: "15 Ocak 2026",
    price: "149.00",
    nameservers: ["ns1.kleacore.com", "ns2.kleacore.com"],
    dnsRecords: [
      { id: 1, type: "A", name: "@", value: "185.92.1.45", ttl: 3600 },
      { id: 2, type: "A", name: "www", value: "185.92.1.45", ttl: 3600 },
      { id: 3, type: "CNAME", name: "mail", value: "mail.example.com", ttl: 3600 },
      { id: 4, type: "MX", name: "@", value: "mail.example.com", ttl: 3600, priority: 10 },
      { id: 5, type: "TXT", name: "@", value: "v=spf1 include:_spf.kleacore.com ~all", ttl: 3600 },
    ],
    whois: {
      registrant: "Ahmet Yılmaz",
      email: "info@example.com",
      phone: "+90 212 555 0000",
      address: "Örnek Mah. Test Sok. No:1",
      city: "İstanbul",
      country: "Türkiye",
    },
  },
  "2": {
    id: 2,
    name: "example.com.tr",
    registrar: "KLEACORE",
    status: "active",
    autoRenew: true,
    privacy: false,
    ssl: true,
    registeredAt: "20 Mart 2021",
    expiresAt: "20 Mart 2025",
    price: "89.00",
    nameservers: ["ns1.kleacore.com", "ns2.kleacore.com"],
    dnsRecords: [
      { id: 1, type: "A", name: "@", value: "185.92.1.78", ttl: 3600 },
      { id: 2, type: "A", name: "www", value: "185.92.1.78", ttl: 3600 },
      { id: 3, type: "MX", name: "@", value: "mail.example.com.tr", ttl: 3600, priority: 10 },
    ],
    whois: {
      registrant: "Ahmet Yılmaz",
      email: "info@example.com.tr",
      phone: "+90 212 555 0000",
      address: "Örnek Mah. Test Sok. No:1",
      city: "İstanbul",
      country: "Türkiye",
    },
  },
  "3": {
    id: 3,
    name: "myshop.net",
    registrar: "KLEACORE",
    status: "expiring",
    autoRenew: false,
    privacy: true,
    ssl: false,
    registeredAt: "10 Şubat 2023",
    expiresAt: "10 Şubat 2025",
    price: "199.00",
    nameservers: ["ns1.kleacore.com", "ns2.kleacore.com"],
    dnsRecords: [
      { id: 1, type: "A", name: "@", value: "185.92.2.100", ttl: 3600 },
      { id: 2, type: "A", name: "www", value: "185.92.2.100", ttl: 3600 },
    ],
    whois: {
      registrant: "Ahmet Yılmaz",
      email: "shop@myshop.net",
      phone: "+90 212 555 0000",
      address: "Örnek Mah. Test Sok. No:1",
      city: "İstanbul",
      country: "Türkiye",
    },
  },
  "4": {
    id: 4,
    name: "testsite.org",
    registrar: "KLEACORE",
    status: "active",
    autoRenew: true,
    privacy: true,
    ssl: true,
    registeredAt: "5 Haziran 2022",
    expiresAt: "5 Haziran 2025",
    price: "179.00",
    nameservers: ["ns1.kleacore.com", "ns2.kleacore.com"],
    dnsRecords: [
      { id: 1, type: "A", name: "@", value: "185.92.3.50", ttl: 3600 },
      { id: 2, type: "A", name: "www", value: "185.92.3.50", ttl: 3600 },
      { id: 3, type: "AAAA", name: "@", value: "2001:db8::1", ttl: 3600 },
    ],
    whois: {
      registrant: "Ahmet Yılmaz",
      email: "admin@testsite.org",
      phone: "+90 212 555 0000",
      address: "Örnek Mah. Test Sok. No:1",
      city: "İstanbul",
      country: "Türkiye",
    },
  },
  "5": {
    id: 5,
    name: "oldsite.com",
    registrar: "KLEACORE",
    status: "expired",
    autoRenew: false,
    privacy: false,
    ssl: false,
    registeredAt: "1 Ocak 2021",
    expiresAt: "1 Ocak 2024",
    price: "149.00",
    nameservers: ["ns1.kleacore.com", "ns2.kleacore.com"],
    dnsRecords: [
      { id: 1, type: "A", name: "@", value: "185.92.4.200", ttl: 3600 },
    ],
    whois: {
      registrant: "Ahmet Yılmaz",
      email: "old@oldsite.com",
      phone: "+90 212 555 0000",
      address: "Örnek Mah. Test Sok. No:1",
      city: "İstanbul",
      country: "Türkiye",
    },
  },
};

const statusConfig = {
  active: {
    label: "Aktif",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    icon: CheckCircle2,
  },
  expiring: {
    label: "Sona Eriyor",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    icon: AlertCircle,
  },
  expired: {
    label: "Süresi Doldu",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    icon: XCircle,
  },
};

const dnsTypeColors: Record<string, string> = {
  A: "bg-blue-500",
  AAAA: "bg-purple-500",
  CNAME: "bg-green-500",
  MX: "bg-orange-500",
  TXT: "bg-gray-500",
  NS: "bg-pink-500",
  SRV: "bg-yellow-500",
};

// Recent activity
const recentActivity = [
  { action: "DNS kaydı güncellendi", detail: "A kaydı - @", time: "2 saat önce", icon: Settings },
  { action: "SSL sertifikası yenilendi", detail: "Let's Encrypt", time: "3 gün önce", icon: Shield },
  { action: "Nameserver değiştirildi", detail: "ns1.kleacore.com", time: "1 hafta önce", icon: Server },
  { action: "Domain yenilendi", detail: "1 yıllık", time: "2 hafta önce", icon: RefreshCcw },
];

export default function DomainDetayPage() {
  const params = useParams();
  const id = params.id as string;
  const domain = domainsDB[id];

  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!domain) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Globe className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Domain Bulunamadı</h2>
        <p className="text-muted-foreground mb-4">İstediğiniz domain mevcut değil.</p>
        <Button asChild>
          <Link href="/musteri/panel/domainler">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Domainlere Dön
          </Link>
        </Button>
      </div>
    );
  }

  const status = statusConfig[domain.status];
  const StatusIcon = status.icon;

  return (
    <div className="space-y-6">
      {/* Back Button & Header */}
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col gap-4">
          <Link
            href="/musteri/panel/domainler"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Domainlere Dön
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={cn("p-4 rounded-xl", status.bgColor)}>
                <Globe className={cn("h-8 w-8", status.color)} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold tracking-tight">{domain.name}</h1>
                  <span className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                    status.bgColor, status.color
                  )}>
                    <StatusIcon className="h-3 w-3" />
                    {status.label}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Bitiş: {domain.expiresAt}
                  </span>
                  <span>•</span>
                  <span>{domain.registrar}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {domain.ssl && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-green-500/10 text-green-500">
                      <Shield className="h-3 w-3" />
                      SSL
                    </span>
                  )}
                  {domain.privacy && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-blue-500/10 text-blue-500">
                      <Lock className="h-3 w-3" />
                      Gizlilik
                    </span>
                  )}
                  {domain.autoRenew && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-purple-500/10 text-purple-500">
                      <RefreshCcw className="h-3 w-3" />
                      Oto. Yenileme
                    </span>
                  )}
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
              <Button variant="outline" className="justify-start h-auto py-3">
                <Settings className="mr-2 h-4 w-4 text-primary" />
                <div className="text-left">
                  <p className="font-medium">DNS Yönetimi</p>
                  <p className="text-xs text-muted-foreground">Kayıtları düzenle</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3">
                <Server className="mr-2 h-4 w-4 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Nameserver</p>
                  <p className="text-xs text-muted-foreground">NS değiştir</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3">
                <ArrowRightLeft className="mr-2 h-4 w-4 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Transfer</p>
                  <p className="text-xs text-muted-foreground">EPP kodu al</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3">
                <ExternalLink className="mr-2 h-4 w-4 text-primary" />
                <div className="text-left">
                  <p className="font-medium">WHOIS</p>
                  <p className="text-xs text-muted-foreground">Bilgileri görüntüle</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* DNS Records */}
          <BlurFade delay={0.2} inView>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      DNS Kayıtları
                    </CardTitle>
                    <CardDescription>
                      Domain için tanımlı DNS kayıtları
                    </CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Kayıt Ekle
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {domain.dnsRecords.map((record) => (
                    <div
                      key={record.id}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:shadow-sm transition-shadow"
                    >
                      <span className={cn(
                        "px-2 py-1 rounded text-xs font-bold text-white min-w-[50px] text-center",
                        dnsTypeColors[record.type] || "bg-gray-500"
                      )}>
                        {record.type}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-sm font-medium">{record.name}</p>
                        <p className="font-mono text-xs text-muted-foreground truncate">
                          {record.value}
                        </p>
                      </div>
                      {record.priority !== undefined && (
                        <span className="text-xs text-muted-foreground">
                          Öncelik: {record.priority}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        TTL: {record.ttl}
                      </span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Nameservers */}
          <BlurFade delay={0.25} inView>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="h-5 w-5 text-primary" />
                      Nameservers
                    </CardTitle>
                    <CardDescription>
                      Domain için tanımlı isim sunucuları
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Değiştir
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {domain.nameservers.map((ns, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-muted-foreground">
                          NS{index + 1}
                        </span>
                        <code className="font-mono text-sm">{ns}</code>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleCopy(ns)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </BlurFade>

          {/* WHOIS Info */}
          <BlurFade delay={0.3} inView>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      WHOIS Bilgileri
                    </CardTitle>
                    <CardDescription>
                      {domain.privacy ? "Gizlilik koruması aktif - bilgiler gizli" : "Kayıt sahibi bilgileri"}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Düzenle
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {domain.privacy ? (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Lock className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-blue-500">Gizlilik Koruması Aktif</p>
                      <p className="text-sm text-muted-foreground">
                        WHOIS bilgileriniz herkese açık sorgulamalarda gizlenir.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Kayıt Sahibi</p>
                        <p className="font-medium">{domain.whois.registrant}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">E-posta</p>
                        <p className="font-medium">{domain.whois.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Telefon</p>
                        <p className="font-medium">{domain.whois.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Konum</p>
                        <p className="font-medium">{domain.whois.city}, {domain.whois.country}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </BlurFade>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Domain Settings */}
          <BlurFade delay={0.35} inView>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Domain Ayarları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCcw className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="auto-renew">Otomatik Yenileme</Label>
                  </div>
                  <Switch id="auto-renew" defaultChecked={domain.autoRenew} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="privacy">Gizlilik Koruması</Label>
                  </div>
                  <Switch id="privacy" defaultChecked={domain.privacy} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="transfer-lock">Transfer Kilidi</Label>
                  </div>
                  <Switch id="transfer-lock" defaultChecked={true} />
                </div>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Domain Info */}
          <BlurFade delay={0.4} inView>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Domain Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Kayıt Tarihi</span>
                  <span className="font-medium">{domain.registeredAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bitiş Tarihi</span>
                  <span className="font-medium">{domain.expiresAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Yenileme Ücreti</span>
                  <span className="font-medium">{domain.price} TL/yıl</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registrar</span>
                  <span className="font-medium">{domain.registrar}</span>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <Button className="w-full" variant="outline">
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Domaini Yenile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Recent Activity */}
          <BlurFade delay={0.45} inView>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Son İşlemler</CardTitle>
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

          {/* Info Note */}
          <BlurFade delay={0.5} inView>
            <Card className="border-dashed">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">DNS Değişiklikleri</p>
                    <p>
                      DNS değişikliklerinin yayılması 24-48 saat sürebilir.
                      Değişikliklerinizi yaptıktan sonra sabırlı olun.
                    </p>
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
