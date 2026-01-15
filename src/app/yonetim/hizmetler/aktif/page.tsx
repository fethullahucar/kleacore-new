"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Package,
  Server,
  HardDrive,
  Cloud,
  Globe,
  Shield,
  Mail,
  CheckCircle,
  Pause,
  XCircle,
  MoreHorizontal,
  Eye,
  Edit,
  FileText,
  RefreshCcw,
  Building2,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";

const services = [
  {
    id: "H-001",
    customerId: "M-001",
    customerName: "Ahmet Yılmaz",
    domain: "ahmetyilmaz.com",
    category: "hosting",
    packageName: "Profesyonel Hosting",
    status: "active",
    nextRenewal: "2024-12-15",
    price: 99,
  },
  {
    id: "H-002",
    customerId: "M-002",
    customerName: "Ayşe Demir",
    companyName: "Demir Holding A.Ş.",
    domain: "demir-holding.com",
    category: "vds",
    packageName: "VDS Medium",
    status: "active",
    nextRenewal: "2024-08-20",
    price: 349,
  },
  {
    id: "H-004",
    customerId: "M-004",
    customerName: "Fatma Şahin",
    domain: "fatmasahin.com.tr",
    category: "ssl",
    packageName: "Wildcard SSL",
    status: "active",
    nextRenewal: "2025-01-05",
    price: 499,
  },
  {
    id: "H-007",
    customerId: "M-007",
    customerName: "Ali Yıldız",
    domain: "aliyildiz.co.uk",
    category: "domain",
    packageName: ".co.uk Domain",
    status: "active",
    nextRenewal: "2024-09-08",
    price: 159,
  },
  {
    id: "H-008",
    customerId: "M-008",
    customerName: "Elif Çelik",
    companyName: "Çelik Tech",
    domain: "celiktech.io",
    category: "server",
    packageName: "Business Server",
    status: "active",
    nextRenewal: "2024-10-30",
    price: 1499,
  },
];

const categoryConfig: Record<string, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  hosting: { label: "Hosting", icon: Server, color: "text-blue-500 bg-blue-500/10" },
  vds: { label: "VDS", icon: HardDrive, color: "text-purple-500 bg-purple-500/10" },
  vps: { label: "VPS", icon: Cloud, color: "text-cyan-500 bg-cyan-500/10" },
  server: { label: "Sunucu", icon: Server, color: "text-orange-500 bg-orange-500/10" },
  domain: { label: "Domain", icon: Globe, color: "text-green-500 bg-green-500/10" },
  ssl: { label: "SSL", icon: Shield, color: "text-yellow-500 bg-yellow-500/10" },
  email: { label: "E-posta", icon: Mail, color: "text-pink-500 bg-pink-500/10" },
};

const stats = [
  {
    title: "Toplam Aktif",
    value: "3,456",
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Bu Ay Yenilenecek",
    value: "234",
    icon: Calendar,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Aylık Gelir",
    value: "₺456.789",
    icon: TrendingUp,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "Yıllık Gelir",
    value: "₺5.481.468",
    icon: TrendingUp,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
];

const categoryFilters = [
  { value: "all", label: "Tüm Kategoriler", count: 3456 },
  { value: "hosting", label: "Hosting", count: 1420, color: "text-blue-500" },
  { value: "vds", label: "VDS", count: 412, color: "text-purple-500" },
  { value: "vps", label: "VPS", count: 623, color: "text-cyan-500" },
  { value: "server", label: "Sunucu", count: 98, color: "text-orange-500" },
  { value: "domain", label: "Domain", count: 489, color: "text-green-500" },
  { value: "ssl", label: "SSL", count: 278, color: "text-yellow-500" },
  { value: "email", label: "E-posta", count: 136, color: "text-pink-500" },
];

export default function ActiveServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.packageName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BlurFade delay={0}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Aktif Hizmetler</h1>
            <p className="text-zinc-600 dark:text-zinc-400">Şu anda aktif olan tüm hizmetler</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-green-500">3,456 Aktif</span>
          </div>
        </div>
      </BlurFade>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <BlurFade key={stat.title} delay={0.05 + index * 0.05}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 rounded-lg", stat.bgColor)}>
                    <stat.icon className={cn("h-6 w-6", stat.color)} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{stat.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>

      {/* Category Filter Buttons */}
      <BlurFade delay={0.25}>
        <div className="flex flex-wrap gap-2">
          {categoryFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={categoryFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter(filter.value)}
              className={cn(
                categoryFilter === filter.value
                  ? "bg-primary hover:bg-primary/90"
                  : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
            >
              {filter.label}
              <span className={cn(
                "ml-2 px-1.5 py-0.5 rounded text-xs",
                categoryFilter === filter.value
                  ? "bg-white/20 text-white"
                  : filter.color || "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400"
              )}>
                {filter.count}
              </span>
            </Button>
          ))}
        </div>
      </BlurFade>

      {/* Search */}
      <BlurFade delay={0.3}>
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                type="search"
                placeholder="Hizmet ID, müşteri, domain veya paket ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
              />
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Table */}
      <BlurFade delay={0.35}>
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Hizmet ID</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Müşteri</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Domain</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Kategori / Paket</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Fiyat</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Sonraki Yenileme</th>
                    <th className="text-right p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <Package className="h-12 w-12 text-zinc-300 dark:text-zinc-700" />
                          <p className="text-zinc-500 dark:text-zinc-400">Aktif hizmet bulunamadı</p>
                          <p className="text-sm text-zinc-400 dark:text-zinc-500">Arama kriterlerinizi değiştirmeyi deneyin</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredServices.map((service) => {
                      const CategoryIcon = categoryConfig[service.category]?.icon || Package;
                      return (
                        <tr
                          key={service.id}
                          className="border-b border-zinc-200 dark:border-zinc-800 last:border-0 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
                        >
                          <td className="p-4">
                            <span className="text-sm font-mono text-zinc-900 dark:text-white">{service.id}</span>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="text-sm font-medium text-zinc-900 dark:text-white">
                                {service.customerName}
                              </p>
                              {service.companyName && (
                                <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                                  <Building2 className="h-3 w-3" />
                                  {service.companyName}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-zinc-600 dark:text-zinc-400">{service.domain}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className={cn("p-1.5 rounded", categoryConfig[service.category]?.color.split(" ")[1])}>
                                <CategoryIcon className={cn("h-3.5 w-3.5", categoryConfig[service.category]?.color.split(" ")[0])} />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-zinc-900 dark:text-white">{categoryConfig[service.category]?.label}</p>
                                <p className="text-xs text-zinc-500">{service.packageName}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-sm font-medium text-zinc-900 dark:text-white">
                              {formatPrice(service.price)}
                              <span className="text-xs font-normal text-zinc-500">/ay</span>
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-zinc-600 dark:text-zinc-400">
                              {service.nextRenewal
                                ? new Date(service.nextRenewal).toLocaleDateString("tr-TR")
                                : "-"}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                                <DropdownMenuItem asChild>
                                  <Link href={`/yonetim/hizmetler/${service.id}`} className="flex items-center cursor-pointer">
                                    <Eye className="mr-2 h-4 w-4" />
                                    Detayları Görüntüle
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center cursor-pointer">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Düzenle
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center cursor-pointer">
                                  <FileText className="mr-2 h-4 w-4" />
                                  Fatura Oluştur
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
                                <DropdownMenuItem className="flex items-center cursor-pointer">
                                  <RefreshCcw className="mr-2 h-4 w-4" />
                                  Yenileme Geçmişi
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center cursor-pointer text-orange-600 dark:text-orange-500">
                                  <Pause className="mr-2 h-4 w-4" />
                                  Askıya Al
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center cursor-pointer text-red-600 dark:text-red-500">
                                  <XCircle className="mr-2 h-4 w-4" />
                                  İptal Et
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}
