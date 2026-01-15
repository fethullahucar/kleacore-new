"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  XCircle,
  Building2,
  RotateCcw,
  Calendar,
  TrendingDown,
  FileX,
  MoreHorizontal,
  Eye,
  Download,
  Trash2,
  ShoppingCart,
  UserX,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlurFade } from "@/components/magicui/blur-fade";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const invoices = [
  {
    id: "F-2024-0197",
    customer: "Can Özkan",
    customerId: "M-005",
    companyName: null,
    amount: 599.00,
    createdAt: "2024-06-05",
    cancelledAt: "2024-06-08",
    reason: "Sipariş iptali",
  },
  {
    id: "F-2024-0182",
    customer: "Oğuz Kara",
    customerId: "M-032",
    companyName: null,
    amount: 299.00,
    createdAt: "2024-05-18",
    cancelledAt: "2024-05-20",
    reason: "Müşteri talebi",
  },
  {
    id: "F-2024-0170",
    customer: "Merve Şahin",
    customerId: "M-035",
    companyName: "Şahin Danışmanlık",
    amount: 1499.00,
    createdAt: "2024-05-05",
    cancelledAt: "2024-05-10",
    reason: "Hatalı fatura",
  },
  {
    id: "F-2024-0155",
    customer: "Cem Polat",
    customerId: "M-041",
    companyName: null,
    amount: 799.00,
    createdAt: "2024-04-20",
    cancelledAt: "2024-04-22",
    reason: "Sipariş iptali",
  },
  {
    id: "F-2024-0143",
    customer: "Elif Yıldız",
    customerId: "M-048",
    companyName: "Yıldız Medya",
    amount: 2499.00,
    createdAt: "2024-04-10",
    cancelledAt: "2024-04-12",
    reason: "Müşteri talebi",
  },
  {
    id: "F-2024-0128",
    customer: "Burak Aksoy",
    customerId: "M-055",
    companyName: null,
    amount: 399.00,
    createdAt: "2024-03-25",
    cancelledAt: "2024-03-28",
    reason: "Hatalı fatura",
  },
  {
    id: "F-2024-0115",
    customer: "Selin Koç",
    customerId: "M-062",
    companyName: "Koç Yazılım Ltd.",
    amount: 1899.00,
    createdAt: "2024-03-15",
    cancelledAt: "2024-03-18",
    reason: "Sipariş iptali",
  },
  {
    id: "F-2024-0098",
    customer: "Emre Demir",
    customerId: "M-071",
    companyName: null,
    amount: 649.00,
    createdAt: "2024-03-01",
    cancelledAt: "2024-03-05",
    reason: "Müşteri talebi",
  },
];

const reasonFilters = [
  { value: "all", label: "Tümü", icon: XCircle },
  { value: "Sipariş iptali", label: "Sipariş İptali", icon: ShoppingCart },
  { value: "Müşteri talebi", label: "Müşteri Talebi", icon: UserX },
  { value: "Hatalı fatura", label: "Hatalı Fatura", icon: AlertCircle },
];

export default function CancelledInvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [reasonFilter, setReasonFilter] = useState("all");

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (invoice.companyName && invoice.companyName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesReason = reasonFilter === "all" || invoice.reason === reasonFilter;

    return matchesSearch && matchesReason;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2,
    }).format(price);
  };

  // Stats
  const totalCancelled = invoices.length;
  const thisMonthCancelled = invoices.filter(inv => {
    const date = new Date(inv.cancelledAt);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;
  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);

  // Reason counts
  const reasonCounts = reasonFilters.reduce((acc, filter) => {
    if (filter.value === "all") {
      acc[filter.value] = invoices.length;
    } else {
      acc[filter.value] = invoices.filter(inv => inv.reason === filter.value).length;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BlurFade delay={0}>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">İptal Edilen Faturalar</h1>
          <p className="text-zinc-600 dark:text-zinc-400">İptal edilmiş faturaların listesi ve yönetimi</p>
        </div>
      </BlurFade>

      {/* Stats Cards */}
      <BlurFade delay={0.05}>
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                  <XCircle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Toplam İptal</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">{totalCancelled}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                  <Calendar className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Bu Ay İptal</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">{thisMonthCancelled}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10">
                  <TrendingDown className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">İptal Tutarı</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">{formatPrice(totalAmount)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-500/10">
                  <FileX className="h-5 w-5 text-zinc-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Ort. Tutar</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">{formatPrice(totalAmount / totalCancelled)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </BlurFade>

      {/* Filters */}
      <BlurFade delay={0.1}>
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Reason Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {reasonFilters.map((filter) => {
                  const Icon = filter.icon;
                  const count = reasonCounts[filter.value] || 0;
                  return (
                    <Button
                      key={filter.value}
                      size="sm"
                      variant={reasonFilter === filter.value ? "default" : "outline"}
                      onClick={() => setReasonFilter(filter.value)}
                      className={cn(
                        "gap-2",
                        reasonFilter === filter.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {filter.label}
                      <span className={cn(
                        "ml-1 px-1.5 py-0.5 rounded text-xs",
                        reasonFilter === filter.value
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400"
                      )}>
                        {count}
                      </span>
                    </Button>
                  );
                })}
              </div>

              {/* Search */}
              <div className="flex-1 md:max-w-xs md:ml-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <Input
                    type="search"
                    placeholder="Fatura no, müşteri ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Table */}
      <BlurFade delay={0.15}>
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Fatura No</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Müşteri</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Tutar</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">İptal Nedeni</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Oluşturma</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">İptal Tarihi</th>
                    <th className="text-right p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <XCircle className="h-8 w-8 text-zinc-400" />
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Sonuç bulunamadı
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredInvoices.map((invoice) => (
                      <tr
                        key={invoice.id}
                        className="border-b border-zinc-200 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                      >
                        <td className="p-4">
                          <span className="text-sm font-medium text-zinc-500 line-through">{invoice.id}</span>
                        </td>
                        <td className="p-4">
                          <div>
                            <Link
                              href={`/yonetim/musteriler/${invoice.customerId}`}
                              className="text-sm font-medium text-zinc-900 dark:text-white hover:text-primary transition-colors"
                            >
                              {invoice.customer}
                            </Link>
                            {invoice.companyName && (
                              <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                                <Building2 className="h-3 w-3" />
                                {invoice.companyName}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm font-medium text-zinc-500 line-through">
                            {formatPrice(invoice.amount)}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
                            invoice.reason === "Sipariş iptali" && "bg-orange-500/10 text-orange-600 dark:text-orange-500",
                            invoice.reason === "Müşteri talebi" && "bg-blue-500/10 text-blue-600 dark:text-blue-500",
                            invoice.reason === "Hatalı fatura" && "bg-red-500/10 text-red-600 dark:text-red-500"
                          )}>
                            {invoice.reason === "Sipariş iptali" && <ShoppingCart className="h-3 w-3" />}
                            {invoice.reason === "Müşteri talebi" && <UserX className="h-3 w-3" />}
                            {invoice.reason === "Hatalı fatura" && <AlertCircle className="h-3 w-3" />}
                            {invoice.reason}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">
                            {new Date(invoice.createdAt).toLocaleDateString("tr-TR")}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">
                            {new Date(invoice.cancelledAt).toLocaleDateString("tr-TR")}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                              <DropdownMenuItem asChild>
                                <Link href={`/yonetim/faturalar/${invoice.id}`} className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                                  <Eye className="h-4 w-4" />
                                  Detayları Gör
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                                <Download className="h-4 w-4" />
                                PDF İndir
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
                              <DropdownMenuItem className="flex items-center gap-2 text-blue-600 dark:text-blue-500">
                                <RotateCcw className="h-4 w-4" />
                                Yeniden Oluştur
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
                              <DropdownMenuItem className="flex items-center gap-2 text-red-600 dark:text-red-500">
                                <Trash2 className="h-4 w-4" />
                                Kalıcı Sil
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
