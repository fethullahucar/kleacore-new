"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Pause,
  Building2,
  AlertTriangle,
  CreditCard,
  Ban,
  UserX,
  MoreHorizontal,
  Eye,
  Mail,
  Play,
  XCircle,
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

const customers = [
  {
    id: "M-003",
    name: "Mehmet Kaya",
    companyName: "KayaSoft Ltd.",
    email: "mehmet@kayasoft.net",
    phone: "0534 345 67 89",
    suspendedAt: "2024-06-10",
    reason: "payment",
    overdueAmount: 1299.00,
    daysOverdue: 45,
  },
  {
    id: "M-007",
    name: "Ali Yıldız",
    companyName: null,
    email: "ali@example.com",
    phone: "0538 789 01 23",
    suspendedAt: "2024-06-05",
    reason: "violation",
    overdueAmount: 0,
    daysOverdue: 0,
  },
  {
    id: "M-015",
    name: "Hasan Demir",
    companyName: null,
    email: "hasan@example.com",
    phone: "0544 456 78 90",
    suspendedAt: "2024-05-28",
    reason: "payment",
    overdueAmount: 599.00,
    daysOverdue: 60,
  },
  {
    id: "M-018",
    name: "Selim Korkmaz",
    companyName: "Korkmaz İnşaat",
    email: "selim@korkmaz.com.tr",
    phone: "0545 567 89 01",
    suspendedAt: "2024-05-20",
    reason: "fraud",
    overdueAmount: 0,
    daysOverdue: 0,
  },
  {
    id: "M-022",
    name: "Gizem Aksoy",
    companyName: null,
    email: "gizem@example.com",
    phone: "0546 678 90 12",
    suspendedAt: "2024-06-15",
    reason: "payment",
    overdueAmount: 299.00,
    daysOverdue: 20,
  },
];

const reasonConfig: Record<string, { label: string; color: string }> = {
  payment: { label: "Ödeme gecikmesi", color: "text-orange-500" },
  violation: { label: "Kullanım ihlali", color: "text-yellow-500" },
  fraud: { label: "Dolandırıcılık şüphesi", color: "text-red-500" },
};

const stats = [
  {
    title: "Toplam Askıda",
    value: "156",
    icon: Pause,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "Ödeme Gecikmesi",
    value: "120",
    icon: CreditCard,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    title: "Kullanım İhlali",
    value: "28",
    icon: AlertTriangle,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Dolandırıcılık",
    value: "8",
    icon: Ban,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
];

const reasonFilters = [
  { value: "all", label: "Tüm Nedenler", count: 156 },
  { value: "payment", label: "Ödeme Gecikmesi", count: 120, color: "text-orange-500" },
  { value: "violation", label: "Kullanım İhlali", count: 28, color: "text-yellow-500" },
  { value: "fraud", label: "Dolandırıcılık", count: 8, color: "text-red-500" },
];

export default function SuspendedCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [reasonFilter, setReasonFilter] = useState("all");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (customer.companyName && customer.companyName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesReason = reasonFilter === "all" || customer.reason === reasonFilter;
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
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Askıdaki Müşteriler</h1>
            <p className="text-zinc-600 dark:text-zinc-400">Hesabı askıya alınan müşteriler</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/10">
            <Pause className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-medium text-orange-500">156 Askıda</span>
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
                  ? "bg-white dark:bg-zinc-900 text-primary"
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
                placeholder="İsim, firma, e-posta veya müşteri ID ara..."
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
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Müşteri</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">E-Posta</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Askı Nedeni</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Borç Tutarı</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Askı Tarihi</th>
                    <th className="text-right p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <UserX className="h-12 w-12 text-zinc-300 dark:text-zinc-700" />
                          <p className="text-zinc-500 dark:text-zinc-400">Askıdaki müşteri bulunamadı</p>
                          <p className="text-sm text-zinc-400 dark:text-zinc-500">Arama kriterlerinizi değiştirmeyi deneyin</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="border-b border-zinc-200 dark:border-zinc-800 last:border-0 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
                      >
                        <td className="p-4">
                          <div>
                            <p className="text-sm font-medium text-zinc-900 dark:text-white">
                              {customer.name}
                            </p>
                            {customer.companyName && (
                              <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                                <Building2 className="h-3 w-3" />
                                {customer.companyName}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">{customer.email}</span>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className={cn("text-sm font-medium", reasonConfig[customer.reason].color)}>
                              {reasonConfig[customer.reason].label}
                            </p>
                            {customer.daysOverdue > 0 && (
                              <p className="text-xs text-red-500 mt-0.5">{customer.daysOverdue} gün gecikmiş</p>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={cn(
                            "text-sm font-medium",
                            customer.overdueAmount > 0 ? "text-red-500" : "text-zinc-500"
                          )}>
                            {customer.overdueAmount > 0 ? formatPrice(customer.overdueAmount) : "-"}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">
                            {new Date(customer.suspendedAt).toLocaleDateString("tr-TR")}
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
                                <Link href={`/yonetim/musteriler/${customer.id}`} className="flex items-center cursor-pointer">
                                  <Eye className="mr-2 h-4 w-4" />
                                  Detayları Görüntüle
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center cursor-pointer">
                                <Mail className="mr-2 h-4 w-4" />
                                E-posta Gönder
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
                              <DropdownMenuItem className="flex items-center cursor-pointer">
                                <Clock className="mr-2 h-4 w-4" />
                                Aktivite Geçmişi
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center cursor-pointer text-green-600 dark:text-green-500">
                                <Play className="mr-2 h-4 w-4" />
                                Hesabı Aktif Et
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center cursor-pointer text-red-600 dark:text-red-500">
                                <XCircle className="mr-2 h-4 w-4" />
                                Hesabı Kapat
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
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
