"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  UserX,
  Building2,
  Hand,
  CreditCard,
  AlertTriangle,
  Ban,
  MoreHorizontal,
  Eye,
  Mail,
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

const customers = [
  {
    id: "M-025",
    name: "Kerem Aktaş",
    companyName: null,
    email: "kerem@example.com",
    phone: "0547 789 01 23",
    closedAt: "2024-06-01",
    reason: "request",
    totalSpent: 1580.00,
  },
  {
    id: "M-028",
    name: "Derya Yılmaz",
    companyName: "Yılmaz Medya",
    email: "derya@yilmazmedya.com",
    phone: "0548 890 12 34",
    closedAt: "2024-05-15",
    reason: "nonpayment",
    totalSpent: 0,
  },
  {
    id: "M-032",
    name: "Oğuz Kara",
    companyName: null,
    email: "oguz@example.com",
    phone: "0549 901 23 45",
    closedAt: "2024-04-20",
    reason: "violation",
    totalSpent: 599.00,
  },
  {
    id: "M-035",
    name: "Merve Şahin",
    companyName: "Şahin Danışmanlık",
    email: "merve@sahindanismanlik.com",
    phone: "0550 012 34 56",
    closedAt: "2024-03-10",
    reason: "request",
    totalSpent: 2890.00,
  },
  {
    id: "M-041",
    name: "Cem Polat",
    companyName: null,
    email: "cem@example.com",
    phone: "0551 123 45 67",
    closedAt: "2024-02-28",
    reason: "fraud",
    totalSpent: 0,
  },
];

const reasonConfig: Record<string, { label: string; color: string }> = {
  request: { label: "Müşteri talebi", color: "text-blue-500" },
  nonpayment: { label: "Ödeme yapılmadı", color: "text-orange-500" },
  violation: { label: "Kullanım ihlali", color: "text-yellow-500" },
  fraud: { label: "Dolandırıcılık", color: "text-red-500" },
};

const stats = [
  {
    title: "Toplam Kapalı",
    value: "57",
    icon: UserX,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    title: "Müşteri Talebi",
    value: "32",
    icon: Hand,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Ödeme Yapılmadı",
    value: "15",
    icon: CreditCard,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "İhlal/Dolandırıcılık",
    value: "10",
    icon: Ban,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
];

const reasonFilters = [
  { value: "all", label: "Tüm Nedenler", count: 57 },
  { value: "request", label: "Müşteri Talebi", count: 32, color: "text-blue-500" },
  { value: "nonpayment", label: "Ödeme Yapılmadı", count: 15, color: "text-orange-500" },
  { value: "violation", label: "Kullanım İhlali", count: 6, color: "text-yellow-500" },
  { value: "fraud", label: "Dolandırıcılık", count: 4, color: "text-red-500" },
];

export default function ClosedCustomersPage() {
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
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Kapalı Hesaplar</h1>
            <p className="text-zinc-600 dark:text-zinc-400">Kapatılmış müşteri hesapları</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10">
            <UserX className="h-5 w-5 text-red-500" />
            <span className="text-sm font-medium text-red-500">57 Kapalı</span>
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
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Telefon</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Kapanış Nedeni</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Toplam Harcama</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Kapanış Tarihi</th>
                    <th className="text-right p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <UserX className="h-12 w-12 text-zinc-300 dark:text-zinc-700" />
                          <p className="text-zinc-500 dark:text-zinc-400">Kapalı hesap bulunamadı</p>
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
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">{customer.phone}</span>
                        </td>
                        <td className="p-4">
                          <span className={cn("text-sm font-medium", reasonConfig[customer.reason].color)}>
                            {reasonConfig[customer.reason].label}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm font-medium text-zinc-900 dark:text-white">
                            {customer.totalSpent > 0 ? formatPrice(customer.totalSpent) : "-"}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">
                            {new Date(customer.closedAt).toLocaleDateString("tr-TR")}
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
                              <DropdownMenuItem className="flex items-center cursor-pointer text-blue-600 dark:text-blue-500">
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Hesabı Yeniden Aç
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
