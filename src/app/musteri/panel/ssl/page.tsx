"use client";

import { useState } from "react";
import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Shield,
  Search,
  MoreVertical,
  RefreshCcw,
  Download,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Lock,
  Key,
  FileText,
  Plus,
  Clock,
  Globe,
  Server,
  Eye,
  Copy,
  ExternalLink,
  Calendar,
  Building,
  ShieldCheck,
  ShieldAlert,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Mock SSL certificates data
const certificates = [
  {
    id: 1,
    domain: "kleacore.com",
    type: "Wildcard SSL",
    typeLabel: "Wildcard",
    issuer: "Sectigo",
    status: "active",
    validFrom: "15 Ocak 2024",
    validTo: "15 Ocak 2025",
    daysLeft: 342,
    autoRenew: true,
    coverage: ["*.kleacore.com", "kleacore.com"],
    installed: true,
    validated: true,
    algorithm: "RSA 2048-bit",
    serialNumber: "04:E3:A1:B2:C3:D4:E5:F6",
  },
  {
    id: 2,
    domain: "example.com.tr",
    type: "Domain Validated",
    typeLabel: "DV",
    issuer: "Let's Encrypt",
    status: "active",
    validFrom: "20 Mart 2024",
    validTo: "20 Haziran 2024",
    daysLeft: 89,
    autoRenew: true,
    coverage: ["example.com.tr", "www.example.com.tr"],
    installed: true,
    validated: true,
    algorithm: "ECDSA P-256",
    serialNumber: "03:F4:B2:C3:D4:E5:F6:A1",
  },
  {
    id: 3,
    domain: "myshop.net",
    type: "Extended Validation",
    typeLabel: "EV",
    issuer: "DigiCert",
    status: "expiring",
    validFrom: "10 Şubat 2024",
    validTo: "17 Şubat 2025",
    daysLeft: 7,
    autoRenew: false,
    coverage: ["myshop.net", "www.myshop.net"],
    installed: true,
    validated: true,
    algorithm: "RSA 4096-bit",
    serialNumber: "05:G5:C3:D4:E5:F6:A1:B2",
  },
  {
    id: 4,
    domain: "oldsite.com",
    type: "Domain Validated",
    typeLabel: "DV",
    issuer: "Sectigo",
    status: "expired",
    validFrom: "1 Ocak 2023",
    validTo: "1 Ocak 2024",
    daysLeft: 0,
    autoRenew: false,
    coverage: ["oldsite.com"],
    installed: false,
    validated: false,
    algorithm: "RSA 2048-bit",
    serialNumber: "02:D2:A1:B2:C3:D4:E5:F6",
  },
  {
    id: 5,
    domain: "newproject.io",
    type: "Organization Validated",
    typeLabel: "OV",
    issuer: "GlobalSign",
    status: "pending",
    validFrom: "-",
    validTo: "-",
    daysLeft: 0,
    autoRenew: true,
    coverage: ["newproject.io", "www.newproject.io", "api.newproject.io"],
    installed: false,
    validated: false,
    algorithm: "RSA 2048-bit",
    serialNumber: "-",
  },
];

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
  pending: {
    label: "Beklemede",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    icon: Clock,
  },
};

const typeConfig = {
  "DV": { color: "bg-blue-500", label: "Domain Validated" },
  "OV": { color: "bg-purple-500", label: "Organization Validated" },
  "EV": { color: "bg-green-500", label: "Extended Validation" },
  "Wildcard": { color: "bg-orange-500", label: "Wildcard SSL" },
};

const filterOptions = [
  { value: "all", label: "Tümü" },
  { value: "active", label: "Aktif" },
  { value: "expiring", label: "Sona Eriyor" },
  { value: "expired", label: "Süresi Doldu" },
  { value: "pending", label: "Beklemede" },
];

export default function SSLPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [certs, setCerts] = useState(certificates);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredCertificates = certs.filter((cert) => {
    const matchesSearch = cert.domain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || cert.status === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: certs.length,
    active: certs.filter((c) => c.status === "active").length,
    expiring: certs.filter((c) => c.status === "expiring").length,
    expired: certs.filter((c) => c.status === "expired").length,
  };

  const toggleAutoRenew = (id: number) => {
    setCerts(certs.map((c) =>
      c.id === id ? { ...c, autoRenew: !c.autoRenew } : c
    ));
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">SSL Sertifikaları</h1>
            <p className="text-muted-foreground">
              SSL sertifikalarınızı görüntüleyin ve yönetin.
            </p>
          </div>
          <Button asChild>
            <Link href="/ssl">
              <Plus className="mr-2 h-4 w-4" />
              Yeni SSL Al
            </Link>
          </Button>
        </div>
      </BlurFade>

      {/* Stats */}
      <BlurFade delay={0.15} inView>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Shield className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Toplam SSL</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <ShieldCheck className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Aktif</p>
                  <p className="text-2xl font-bold">{stats.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sona Eriyor</p>
                  <p className="text-2xl font-bold">{stats.expiring}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <ShieldAlert className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Süresi Doldu</p>
                  <p className="text-2xl font-bold">{stats.expired}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </BlurFade>

      {/* Search & Filter */}
      <BlurFade delay={0.2} inView>
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-2">
                {filterOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={filter === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Domain ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Certificates List */}
      <BlurFade delay={0.25} inView>
        <Card>
          <CardHeader>
            <CardTitle>Sertifikalar ({filteredCertificates.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCertificates.map((cert) => {
                const status = statusConfig[cert.status as keyof typeof statusConfig];
                const typeInfo = typeConfig[cert.typeLabel as keyof typeof typeConfig];
                const StatusIcon = status.icon;

                return (
                  <div
                    key={cert.id}
                    className="p-4 rounded-lg border hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn("p-3 rounded-lg", status.bgColor)}>
                        <Shield className={cn("h-6 w-6", status.color)} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold">{cert.domain}</p>
                          <span className={cn(
                            "text-xs px-2 py-0.5 rounded-full text-white",
                            typeInfo?.color || "bg-gray-500"
                          )}>
                            {cert.typeLabel}
                          </span>
                          <div className={cn("flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", status.bgColor, status.color)}>
                            <StatusIcon className="h-3 w-3" />
                            {status.label}
                          </div>
                        </div>

                        <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Building className="h-4 w-4" />
                            <span>Sağlayıcı: {cert.issuer}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Bitiş: {cert.validTo}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Lock className="h-4 w-4" />
                            <span>{cert.algorithm}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {cert.installed ? (
                              <span className="flex items-center gap-1 text-green-500">
                                <CheckCircle2 className="h-4 w-4" />
                                Kurulu
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-orange-500">
                                <AlertCircle className="h-4 w-4" />
                                Kurulmadı
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1">
                          {cert.coverage.map((domain, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 rounded bg-muted">
                              {domain}
                            </span>
                          ))}
                        </div>

                        {cert.status === "expiring" && cert.daysLeft > 0 && (
                          <div className="mt-3 p-2 rounded bg-orange-500/10 text-orange-500 text-sm">
                            <AlertCircle className="inline h-4 w-4 mr-1" />
                            Sertifikanızın süresi {cert.daysLeft} gün içinde dolacak. Yenilemeyi unutmayın!
                          </div>
                        )}

                        {cert.status === "pending" && (
                          <div className="mt-3 p-2 rounded bg-blue-500/10 text-blue-500 text-sm">
                            <Clock className="inline h-4 w-4 mr-1" />
                            Sertifikanız doğrulama aşamasında. DNS kayıtlarını kontrol edin.
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Otomatik Yenileme</span>
                          <Switch
                            checked={cert.autoRenew}
                            onCheckedChange={() => toggleAutoRenew(cert.id)}
                            disabled={cert.status === "expired" || cert.status === "pending"}
                          />
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          {cert.status !== "pending" && cert.status !== "expired" && (
                            <>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/musteri/panel/ssl/${cert.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Detay
                                </Link>
                              </Button>
                            </>
                          )}

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {cert.status !== "pending" && (
                                <>
                                  <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" />
                                    Sertifikayı İndir
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Key className="mr-2 h-4 w-4" />
                                    Private Key İndir
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <FileText className="mr-2 h-4 w-4" />
                                    CSR Görüntüle
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                </>
                              )}
                              {cert.status === "pending" && (
                                <DropdownMenuItem>
                                  <RefreshCcw className="mr-2 h-4 w-4" />
                                  Doğrulamayı Kontrol Et
                                </DropdownMenuItem>
                              )}
                              {(cert.status === "expiring" || cert.status === "expired") && (
                                <DropdownMenuItem>
                                  <RefreshCcw className="mr-2 h-4 w-4" />
                                  Yenile
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                Ayarlar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => copyToClipboard(cert.serialNumber, cert.id)}
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                {copiedId === cert.id ? "Kopyalandı!" : "Seri No Kopyala"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredCertificates.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Aramanızla eşleşen sertifika bulunamadı.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* SSL Types Info */}
      <BlurFade delay={0.3} inView>
        <Card>
          <CardHeader>
            <CardTitle>SSL Sertifika Türleri</CardTitle>
            <CardDescription>
              İhtiyacınıza uygun SSL sertifikası seçin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-3 w-3 rounded-full bg-blue-500" />
                  <p className="font-medium">Domain Validated (DV)</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Temel şifreleme. Hızlı doğrulama. Kişisel siteler için ideal.
                </p>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-3 w-3 rounded-full bg-purple-500" />
                  <p className="font-medium">Organization Validated (OV)</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Şirket doğrulaması. İş siteleri için önerilir.
                </p>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                  <p className="font-medium">Extended Validation (EV)</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  En yüksek güven. E-ticaret ve bankacılık için ideal.
                </p>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-3 w-3 rounded-full bg-orange-500" />
                  <p className="font-medium">Wildcard SSL</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Tüm alt domainleri kapsar. Çoklu site sahipleri için.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}
