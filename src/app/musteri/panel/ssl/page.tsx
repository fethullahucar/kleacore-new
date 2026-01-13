"use client";

import { useState } from "react";
import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Mock SSL certificates data
const certificates = [
  {
    id: 1,
    domain: "example.com",
    type: "Wildcard SSL",
    issuer: "Sectigo",
    status: "active",
    validFrom: "15 Ocak 2024",
    validTo: "15 Ocak 2025",
    autoRenew: true,
    coverage: "*.example.com",
  },
  {
    id: 2,
    domain: "example.com.tr",
    type: "Domain Validated",
    issuer: "Let&apos;s Encrypt",
    status: "active",
    validFrom: "20 Mart 2024",
    validTo: "20 Haziran 2024",
    autoRenew: true,
    coverage: "example.com.tr, www.example.com.tr",
  },
  {
    id: 3,
    domain: "myshop.net",
    type: "Extended Validation",
    issuer: "DigiCert",
    status: "expiring",
    validFrom: "10 Şubat 2024",
    validTo: "7 gün kaldı",
    autoRenew: false,
    coverage: "myshop.net, www.myshop.net",
  },
  {
    id: 4,
    domain: "oldsite.com",
    type: "Domain Validated",
    issuer: "Sectigo",
    status: "expired",
    validFrom: "1 Ocak 2023",
    validTo: "1 Ocak 2024",
    autoRenew: false,
    coverage: "oldsite.com",
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
};

export default function SSLPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCertificates = certificates.filter((cert) =>
    cert.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: certificates.length,
    active: certificates.filter((c) => c.status === "active").length,
    expiring: certificates.filter((c) => c.status === "expiring").length,
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
            <Link href="/ssl/standart">Yeni SSL Al</Link>
          </Button>
        </div>
      </BlurFade>

      {/* Stats */}
      <BlurFade delay={0.15} inView>
        <div className="grid gap-4 sm:grid-cols-3">
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
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
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
        </div>
      </BlurFade>

      {/* Search */}
      <BlurFade delay={0.2} inView>
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Domain ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
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
                const StatusIcon = status.icon;

                return (
                  <div
                    key={cert.id}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:shadow-sm transition-shadow"
                  >
                    <div className={cn("p-3 rounded-lg", status.bgColor)}>
                      <Shield className={cn("h-6 w-6", status.color)} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold truncate">{cert.domain}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                          {cert.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Kapsam: {cert.coverage}
                      </p>
                    </div>

                    <div className="hidden md:block text-right">
                      <p className="text-sm font-medium">
                        Bitiş: {cert.validTo}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Sağlayıcı: {cert.issuer}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={cn("flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium", status.bgColor, status.color)}>
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Sertifikayı İndir
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Key className="mr-2 h-4 w-4" />
                            Private Key
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            CSR Görüntüle
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            Yenile
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
    </div>
  );
}
