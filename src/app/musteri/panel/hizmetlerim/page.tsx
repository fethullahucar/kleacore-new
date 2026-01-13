"use client";

import { useState } from "react";
import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Package,
  Server,
  Shield,
  Cloud,
  Search,
  Filter,
  MoreVertical,
  RefreshCcw,
  Settings,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Mock services data
const services = [
  {
    id: 1,
    name: "Linux Hosting Pro",
    type: "hosting",
    category: "Hosting",
    domain: "example.com",
    status: "active",
    createdAt: "15 Ocak 2024",
    expiresAt: "15 Ocak 2026",
    price: "199.00 TL/yıl",
    icon: Package,
  },
  {
    id: 2,
    name: "WordPress Starter",
    type: "hosting",
    category: "WordPress",
    domain: "blog.example.com",
    status: "active",
    createdAt: "20 Mart 2024",
    expiresAt: "20 Mart 2025",
    price: "149.00 TL/yıl",
    icon: Package,
  },
  {
    id: 3,
    name: "VDS-M Sunucu",
    type: "server",
    category: "VDS",
    domain: "srv1.example.com",
    status: "active",
    createdAt: "10 Şubat 2024",
    expiresAt: "10 Şubat 2025",
    price: "549.00 TL/ay",
    icon: Server,
  },
  {
    id: 4,
    name: "Cloud-S",
    type: "server",
    category: "Bulut",
    domain: "cloud.example.com",
    status: "active",
    createdAt: "5 Nisan 2024",
    expiresAt: "5 Nisan 2025",
    price: "299.00 TL/ay",
    icon: Cloud,
  },
  {
    id: 5,
    name: "Wildcard SSL",
    type: "ssl",
    category: "SSL",
    domain: "*.example.com",
    status: "expiring",
    createdAt: "1 Ocak 2024",
    expiresAt: "7 gün kaldı",
    price: "599.00 TL/yıl",
    icon: Shield,
  },
  {
    id: 6,
    name: "Linux Hosting Basic",
    type: "hosting",
    category: "Hosting",
    domain: "test.example.com",
    status: "expired",
    createdAt: "10 Haziran 2023",
    expiresAt: "10 Haziran 2024",
    price: "99.00 TL/yıl",
    icon: Package,
  },
  {
    id: 7,
    name: "VPS-S",
    type: "server",
    category: "VPS",
    domain: "vps.example.com",
    status: "suspended",
    createdAt: "15 Temmuz 2024",
    expiresAt: "Askıya alındı",
    price: "199.00 TL/ay",
    icon: Server,
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
  suspended: {
    label: "Askıda",
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
    icon: Clock,
  },
};

const filterOptions = [
  { value: "all", label: "Tümü" },
  { value: "hosting", label: "Hosting" },
  { value: "server", label: "Sunucu" },
  { value: "ssl", label: "SSL" },
];

export default function HizmetlerimPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.domain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || service.type === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: services.length,
    active: services.filter((s) => s.status === "active").length,
    expiring: services.filter((s) => s.status === "expiring").length,
    expired: services.filter((s) => s.status === "expired").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Hizmetlerim</h1>
            <p className="text-muted-foreground">
              Tüm aktif hizmetlerinizi görüntüleyin ve yönetin.
            </p>
          </div>
          <Button asChild>
            <Link href="/hosting/linux">Yeni Hizmet Al</Link>
          </Button>
        </div>
      </BlurFade>

      {/* Stats */}
      <BlurFade delay={0.15} inView>
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Toplam Hizmet</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Aktif</p>
              <p className="text-2xl font-bold text-green-500">{stats.active}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Sona Eriyor</p>
              <p className="text-2xl font-bold text-orange-500">{stats.expiring}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Süresi Doldu</p>
              <p className="text-2xl font-bold text-red-500">{stats.expired}</p>
            </CardContent>
          </Card>
        </div>
      </BlurFade>

      {/* Filters */}
      <BlurFade delay={0.2} inView>
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Hizmet veya domain ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
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
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Services List */}
      <BlurFade delay={0.25} inView>
        <Card>
          <CardHeader>
            <CardTitle>
              Hizmetler ({filteredServices.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredServices.map((service) => {
                const status = statusConfig[service.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;

                return (
                  <Link
                    key={service.id}
                    href={`/musteri/panel/hizmetlerim/${service.id}`}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:shadow-sm transition-shadow cursor-pointer"
                  >
                    <div className={cn("p-3 rounded-lg", status.bgColor)}>
                      <service.icon className={cn("h-6 w-6", status.color)} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold truncate">{service.name}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                          {service.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {service.domain}
                      </p>
                    </div>

                    <div className="hidden md:block text-right">
                      <p className="text-sm font-medium">{service.price}</p>
                      <p className="text-xs text-muted-foreground">
                        Bitiş: {service.expiresAt}
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
                            Yönet
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            Yenile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            cPanel
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </Link>
                );
              })}

              {filteredServices.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Aramanızla eşleşen hizmet bulunamadı.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}
