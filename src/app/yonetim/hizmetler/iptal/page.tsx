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
  MoreHorizontal,
  Eye,
  Building2,
  XCircle,
  Hand,
  CreditCard,
  AlertTriangle,
  Ban,
  RotateCcw,
  Clock,
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
    id: "H-006",
    customerId: "M-006",
    customerName: "Zeynep Arslan",
    companyName: "Arslan Group",
    domain: "arslangroup.com.tr",
    category: "email",
    packageName: "Kurumsal E-posta",
    status: "cancelled",
    cancelledAt: "2024-06-01",
    reason: "request",
    totalSpent: 2380.00,
    price: 199,
  },
  {
    id: "H-025",
    customerId: "M-025",
    customerName: "Kerem Aktaş",
    domain: "keremaktas.com",
    category: "hosting",
    packageName: "Profesyonel Hosting",
    status: "cancelled",
    cancelledAt: "2024-05-15",
    reason: "nonpayment",
    totalSpent: 0,
    price: 99,
  },
  {
    id: "H-032",
    customerId: "M-032",
    customerName: "Oğuz Kara",
    domain: "oguzkara.net",
    category: "vps",
    packageName: "VPS Basic",
    status: "cancelled",
    cancelledAt: "2024-04-20",
    reason: "violation",
    totalSpent: 599.00,
    price: 149,
  },
  {
    id: "H-035",
    customerId: "M-035",
    customerName: "Merve Şahin",
    companyName: "Şahin Danışmanlık",
    domain: "sahindanismanlik.com",
    category: "ssl",
    packageName: "OV SSL",
    status: "cancelled",
    cancelledAt: "2024-03-10",
    reason: "request",
    totalSpent: 2890.00,
    price: 299,
  },
  {
    id: "H-041",
    customerId: "M-041",
    customerName: "Cem Polat",
    domain: "cempolat.io",
    category: "vds",
    packageName: "VDS Small",
    status: "cancelled",
    cancelledAt: "2024-02-28",
    reason: "fraud",
    totalSpent: 0,
    price: 199,
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

const reasonConfig: Record<string, { label: string; color: string }> = {
  request: { label: "Müşteri talebi", color: "text-blue-500" },
  nonpayment: { label: "Ödeme yapılmadı", color: "text-orange-500" },
  violation: { label: "Kullanım ihlali", color: "text-yellow-500" },
  fraud: { label: "Dolandırıcılık", color: "text-red-500" },
};

const stats = [
  {
    title: "Toplam İptal",
    value: "89",
    icon: XCircle,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    title: "Müşteri Talebi",
    value: "42",
    icon: Hand,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Ödeme Yapılmadı",
    value: "28",
    icon: CreditCard,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "İhlal/Dolandırıcılık",
    value: "19",
    icon: Ban,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
];

const reasonFilters = [
  { value: "all", label: "Tüm Nedenler", count: 89 },
  { value: "request", label: "Müşteri Talebi", count: 42, color: "text-blue-500" },
  { value: "nonpayment", label: "Ödeme Yapılmadı", count: 28, color: "text-orange-500" },
  { value: "violation", label: "Kullanım İhlali", count: 11, color: "text-yellow-500" },
  { value: "fraud", label: "Dolandırıcılık", count: 8, color: "text-red-500" },
];

export default function CancelledServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [reasonFilter, setReasonFilter] = useState("all");

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.packageName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesReason = reasonFilter === "all" || service.reason === reasonFilter;
    return matchesSearch && matchesReason;
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
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">İptal Edilen Hizmetler</h1>
            <p className="text-zinc-600 dark:text-zinc-400">İptal edilmiş hizmetlerin listesi</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10">
            <XCircle className="h-5 w-5 text-red-500" />
            <span className="text-sm font-medium text-red-500">89 İptal</span>
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

      {/* Reason Filter Buttons */}
      <BlurFade delay={0.25}>
        <div className="flex flex-wrap gap-2">
          {reasonFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={reasonFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setReasonFilter(filter.value)}
              className={cn(
                reasonFilter === filter.value
                  ? "bg-primary hover:bg-primary/90"
                  : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
            >
              {filter.label}
              <span className={cn(
                "ml-2 px-1.5 py-0.5 rounded text-xs",
                reasonFilter === filter.value
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
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Hizmet</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Müşteri</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">İptal Nedeni</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Toplam Harcama</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">İptal Tarihi</th>
                    <th className="text-right p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <Package className="h-12 w-12 text-zinc-300 dark:text-zinc-700" />
                          <p className="text-zinc-500 dark:text-zinc-400">İptal edilmiş hizmet bulunamadı</p>
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
                            <div className="flex items-center gap-3">
                              <div className={cn("p-2 rounded", categoryConfig[service.category]?.color.split(" ")[1])}>
                                <CategoryIcon className={cn("h-4 w-4", categoryConfig[service.category]?.color.split(" ")[0])} />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-zinc-900 dark:text-white">{service.domain}</p>
                                <p className="text-xs text-zinc-500">{service.packageName}</p>
                              </div>
                            </div>
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
                            <span className={cn("text-sm font-medium", reasonConfig[service.reason].color)}>
                              {reasonConfig[service.reason].label}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="text-sm font-medium text-zinc-900 dark:text-white">
                              {service.totalSpent > 0 ? formatPrice(service.totalSpent) : "-"}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-zinc-600 dark:text-zinc-400">
                              {new Date(service.cancelledAt).toLocaleDateString("tr-TR")}
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
                                <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
                                <DropdownMenuItem className="flex items-center cursor-pointer">
                                  <Clock className="mr-2 h-4 w-4" />
                                  Aktivite Geçmişi
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center cursor-pointer text-blue-600 dark:text-blue-500">
                                  <RotateCcw className="mr-2 h-4 w-4" />
                                  Hizmeti Yeniden Aç
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
