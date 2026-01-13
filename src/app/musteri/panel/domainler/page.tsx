"use client";

import { useState } from "react";
import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Globe,
  Search,
  MoreVertical,
  RefreshCcw,
  Settings,
  Shield,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ExternalLink,
  ArrowRightLeft,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Mock domains data
const domains = [
  {
    id: 1,
    name: "example.com",
    registrar: "KLEACORE",
    status: "active",
    autoRenew: true,
    privacy: true,
    ssl: true,
    registeredAt: "15 Ocak 2020",
    expiresAt: "15 Ocak 2026",
    nameservers: ["ns1.kleacore.com", "ns2.kleacore.com"],
  },
  {
    id: 2,
    name: "example.com.tr",
    registrar: "KLEACORE",
    status: "active",
    autoRenew: true,
    privacy: false,
    ssl: true,
    registeredAt: "20 Mart 2021",
    expiresAt: "20 Mart 2025",
    nameservers: ["ns1.kleacore.com", "ns2.kleacore.com"],
  },
  {
    id: 3,
    name: "myshop.net",
    registrar: "KLEACORE",
    status: "expiring",
    autoRenew: false,
    privacy: true,
    ssl: false,
    registeredAt: "10 Şubat 2023",
    expiresAt: "15 gün kaldı",
    nameservers: ["ns1.kleacore.com", "ns2.kleacore.com"],
  },
  {
    id: 4,
    name: "testsite.org",
    registrar: "KLEACORE",
    status: "active",
    autoRenew: true,
    privacy: true,
    ssl: true,
    registeredAt: "5 Haziran 2022",
    expiresAt: "5 Haziran 2025",
    nameservers: ["ns1.kleacore.com", "ns2.kleacore.com"],
  },
  {
    id: 5,
    name: "oldsite.com",
    registrar: "KLEACORE",
    status: "expired",
    autoRenew: false,
    privacy: false,
    ssl: false,
    registeredAt: "1 Ocak 2021",
    expiresAt: "1 Ocak 2024",
    nameservers: ["ns1.kleacore.com", "ns2.kleacore.com"],
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

export default function DomainlerPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDomains = domains.filter((domain) =>
    domain.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: domains.length,
    active: domains.filter((d) => d.status === "active").length,
    expiring: domains.filter((d) => d.status === "expiring").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Domainlerim</h1>
            <p className="text-muted-foreground">
              Alan adlarınızı görüntüleyin ve yönetin.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/domain/transfer">Transfer Et</Link>
            </Button>
            <Button asChild>
              <Link href="/domain/kayit">Yeni Domain</Link>
            </Button>
          </div>
        </div>
      </BlurFade>

      {/* Stats */}
      <BlurFade delay={0.15} inView>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Globe className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Domain</p>
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

      {/* Domains List */}
      <BlurFade delay={0.25} inView>
        <Card>
          <CardHeader>
            <CardTitle>Domainler ({filteredDomains.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredDomains.map((domain) => {
                const status = statusConfig[domain.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;

                return (
                  <Link
                    key={domain.id}
                    href={`/musteri/panel/domainler/${domain.id}`}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:shadow-sm transition-shadow cursor-pointer"
                  >
                    <div className={cn("p-3 rounded-lg", status.bgColor)}>
                      <Globe className={cn("h-6 w-6", status.color)} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold truncate">{domain.name}</p>
                        <div className="flex items-center gap-1">
                          {domain.ssl && (
                            <span title="SSL Aktif" className="text-green-500">
                              <Shield className="h-4 w-4" />
                            </span>
                          )}
                          {domain.privacy && (
                            <span title="Gizlilik Koruması" className="text-blue-500">
                              <Lock className="h-4 w-4" />
                            </span>
                          )}
                          {domain.autoRenew && (
                            <span title="Otomatik Yenileme" className="text-purple-500">
                              <RefreshCcw className="h-4 w-4" />
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Kayıt: {domain.registeredAt}
                      </p>
                    </div>

                    <div className="hidden md:block text-right">
                      <p className="text-sm font-medium">
                        Bitiş: {domain.expiresAt}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {domain.registrar}
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
                            <Settings className="mr-2 h-4 w-4" />
                            DNS Yönetimi
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            Yenile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {domain.privacy ? (
                              <>
                                <Unlock className="mr-2 h-4 w-4" />
                                Gizliliği Kapat
                              </>
                            ) : (
                              <>
                                <Lock className="mr-2 h-4 w-4" />
                                Gizlilik Ekle
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <ArrowRightLeft className="mr-2 h-4 w-4" />
                            Transfer Et
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            WHOIS
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </Link>
                );
              })}

              {filteredDomains.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Aramanızla eşleşen domain bulunamadı.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}
