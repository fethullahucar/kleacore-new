"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Building2,
  CheckCircle,
  Pause,
  Clock,
  UserX,
  MoreHorizontal,
  Eye,
  Mail,
  FileText,
  XCircle,
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
    id: "M-002",
    name: "Ayşe Demir",
    companyName: "Demir Holding A.Ş.",
    taxNumber: "1234567890",
    email: "ayse@demir-holding.com",
    phone: "0533 234 56 78",
    country: "Türkiye",
    currency: "TRY",
    createdAt: "2023-08-22",
    lastLogin: "2024-06-19",
    status: "active",
  },
  {
    id: "M-003",
    name: "Mehmet Kaya",
    companyName: "KayaSoft Ltd.",
    taxNumber: "9876543210",
    email: "mehmet@kayasoft.net",
    phone: "0534 345 67 89",
    country: "Türkiye",
    currency: "TRY",
    createdAt: "2022-11-10",
    lastLogin: "2024-05-15",
    status: "suspended",
  },
  {
    id: "M-006",
    name: "Zeynep Arslan",
    companyName: "Arslan Group",
    taxNumber: "5678901234",
    email: "zeynep@arslangroup.com.tr",
    phone: "0537 678 90 12",
    country: "Türkiye",
    currency: "TRY",
    createdAt: "2023-03-18",
    lastLogin: "2024-06-20",
    status: "active",
  },
  {
    id: "M-008",
    name: "Elif Çelik",
    companyName: "Çelik Tech",
    taxNumber: "3456789012",
    email: "elif@celiktech.io",
    phone: "0539 890 12 34",
    country: "Türkiye",
    currency: "TRY",
    createdAt: "2022-06-30",
    lastLogin: "2024-06-19",
    status: "active",
  },
  {
    id: "M-011",
    name: "Burak Öztürk",
    companyName: "Öztürk Yazılım A.Ş.",
    taxNumber: "7890123456",
    email: "burak@ozturkyazilim.com",
    phone: "0542 234 56 78",
    country: "Türkiye",
    currency: "TRY",
    createdAt: "2023-11-05",
    lastLogin: "2024-06-18",
    status: "active",
  },
  {
    id: "M-013",
    name: "Emre Yılmaz",
    companyName: "Yılmaz Teknoloji Ltd.",
    taxNumber: "2345678901",
    email: "emre@yilmaztech.com.tr",
    phone: "0543 345 67 89",
    country: "Türkiye",
    currency: "TRY",
    createdAt: "2024-01-20",
    lastLogin: "2024-06-17",
    status: "active",
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: "Aktif", color: "bg-green-500/10 text-green-500" },
  suspended: { label: "Askıda", color: "bg-orange-500/10 text-orange-500" },
  pending: { label: "Beklemede", color: "bg-yellow-500/10 text-yellow-500" },
};

const stats = [
  {
    title: "Toplam Kurumsal",
    value: "847",
    icon: Building2,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "Aktif",
    value: "784",
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Askıda",
    value: "56",
    icon: Pause,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "Beklemede",
    value: "7",
    icon: Clock,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
];

const statusFilters = [
  { value: "all", label: "Tüm Durumlar", count: 847 },
  { value: "active", label: "Aktif", count: 784, color: "text-green-500" },
  { value: "suspended", label: "Askıda", count: 56, color: "text-orange-500" },
  { value: "pending", label: "Beklemede", count: 7, color: "text-yellow-500" },
];

export default function CorporateCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BlurFade delay={0}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Kurumsal Müşteriler</h1>
            <p className="text-zinc-600 dark:text-zinc-400">Şirket/firma hesabı olan müşteriler</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/10">
            <Building2 className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-medium text-orange-500">847 Kurumsal</span>
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

      {/* Status Filter Buttons */}
      <BlurFade delay={0.25}>
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={statusFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(filter.value)}
              className={cn(
                statusFilter === filter.value
                  ? "bg-primary hover:bg-primary/90"
                  : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
            >
              {filter.label}
              <span className={cn(
                "ml-2 px-1.5 py-0.5 rounded text-xs",
                statusFilter === filter.value
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
                placeholder="Firma adı, yetkili, e-posta veya müşteri ID ara..."
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
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Firma / Yetkili</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Vergi No</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">E-Posta</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Telefon</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Oluşturma / Son Giriş</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Durum</th>
                    <th className="text-right p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <UserX className="h-12 w-12 text-zinc-300 dark:text-zinc-700" />
                          <p className="text-zinc-500 dark:text-zinc-400">Kurumsal müşteri bulunamadı</p>
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
                            <p className="text-sm font-medium text-zinc-900 dark:text-white flex items-center gap-1.5">
                              <Building2 className="h-4 w-4 text-orange-500" />
                              {customer.companyName}
                            </p>
                            <p className="text-xs text-zinc-500 mt-0.5">{customer.name}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-zinc-600 dark:text-zinc-400 font-mono">{customer.taxNumber}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">{customer.email}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">{customer.phone}</span>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="text-sm text-zinc-900 dark:text-white">
                              {new Date(customer.createdAt).toLocaleDateString("tr-TR")}
                            </p>
                            <p className="text-xs text-zinc-500">
                              {customer.lastLogin
                                ? new Date(customer.lastLogin).toLocaleDateString("tr-TR")
                                : "Henüz giriş yok"}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={cn(
                            "inline-flex px-2 py-0.5 rounded text-xs font-medium",
                            statusConfig[customer.status].color
                          )}>
                            {statusConfig[customer.status].label}
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
                              <DropdownMenuItem className="flex items-center cursor-pointer">
                                <FileText className="mr-2 h-4 w-4" />
                                Fatura Oluştur
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
                              <DropdownMenuItem className="flex items-center cursor-pointer">
                                <Clock className="mr-2 h-4 w-4" />
                                Aktivite Geçmişi
                              </DropdownMenuItem>
                              {customer.status === "active" && (
                                <DropdownMenuItem className="flex items-center cursor-pointer text-orange-600 dark:text-orange-500">
                                  <Pause className="mr-2 h-4 w-4" />
                                  Hesabı Askıya Al
                                </DropdownMenuItem>
                              )}
                              {customer.status === "suspended" && (
                                <DropdownMenuItem className="flex items-center cursor-pointer text-green-600 dark:text-green-500">
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Hesabı Aktif Et
                                </DropdownMenuItem>
                              )}
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
