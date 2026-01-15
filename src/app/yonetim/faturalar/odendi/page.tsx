"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  CheckCircle,
  Building2,
  MoreHorizontal,
  Eye,
  Download,
  Mail,
  CreditCard,
  Banknote,
  TrendingUp,
  Calendar,
  Receipt,
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const invoices = [
  {
    id: "F-2024-0201",
    customer: "Ahmet Yılmaz",
    customerId: "M-001",
    companyName: null,
    amount: 647.00,
    createdAt: "2024-06-15",
    paidAt: "2024-06-18",
    paymentMethod: "Kredi Kartı",
  },
  {
    id: "F-2024-0198",
    customer: "Fatma Şahin",
    customerId: "M-004",
    companyName: null,
    amount: 299.00,
    createdAt: "2024-06-08",
    paidAt: "2024-06-10",
    paymentMethod: "Havale/EFT",
  },
  {
    id: "F-2024-0196",
    customer: "Zeynep Arslan",
    customerId: "M-006",
    companyName: "Arslan Group",
    amount: 1599.00,
    createdAt: "2024-06-01",
    paidAt: "2024-06-02",
    paymentMethod: "Kredi Kartı",
  },
  {
    id: "F-2024-0190",
    customer: "Elif Çelik",
    customerId: "M-008",
    companyName: "Çelik Tech",
    amount: 899.00,
    createdAt: "2024-05-25",
    paidAt: "2024-05-26",
    paymentMethod: "Kredi Kartı",
  },
  {
    id: "F-2024-0185",
    customer: "Burak Demir",
    customerId: "M-009",
    companyName: null,
    amount: 449.00,
    createdAt: "2024-05-20",
    paidAt: "2024-05-22",
    paymentMethod: "Havale/EFT",
  },
  {
    id: "F-2024-0180",
    customer: "Selin Koç",
    customerId: "M-010",
    companyName: "Koç Yazılım",
    amount: 1299.00,
    createdAt: "2024-05-15",
    paidAt: "2024-05-16",
    paymentMethod: "Kredi Kartı",
  },
  {
    id: "F-2024-0175",
    customer: "Emre Yıldız",
    customerId: "M-011",
    companyName: null,
    amount: 549.00,
    createdAt: "2024-05-10",
    paidAt: "2024-05-12",
    paymentMethod: "Havale/EFT",
  },
  {
    id: "F-2024-0170",
    customer: "Deniz Aktaş",
    customerId: "M-012",
    companyName: "Aktaş Medya",
    amount: 1899.00,
    createdAt: "2024-05-05",
    paidAt: "2024-05-06",
    paymentMethod: "Kredi Kartı",
  },
];

const paymentFilters = [
  { value: "all", label: "Tümü", icon: Receipt },
  { value: "Kredi Kartı", label: "Kredi Kartı", icon: CreditCard },
  { value: "Havale/EFT", label: "Havale/EFT", icon: Banknote },
];

export default function PaidInvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (invoice.companyName && invoice.companyName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPayment = paymentFilter === "all" || invoice.paymentMethod === paymentFilter;
    return matchesSearch && matchesPayment;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2,
    }).format(price);
  };

  // Stats
  const totalPaid = invoices.length;
  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const cardPayments = invoices.filter(inv => inv.paymentMethod === "Kredi Kartı").reduce((sum, inv) => sum + inv.amount, 0);
  const bankPayments = invoices.filter(inv => inv.paymentMethod === "Havale/EFT").reduce((sum, inv) => sum + inv.amount, 0);

  // Payment method counts
  const paymentCounts = paymentFilters.reduce((acc, filter) => {
    if (filter.value === "all") {
      acc[filter.value] = invoices.length;
    } else {
      acc[filter.value] = invoices.filter(inv => inv.paymentMethod === filter.value).length;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BlurFade delay={0}>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Ödenen Faturalar</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Ödemesi tamamlanmış faturalar</p>
        </div>
      </BlurFade>

      {/* Stats Cards */}
      <BlurFade delay={0.05}>
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Toplam Ödenen</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">{totalPaid}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Toplam Tutar</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">{formatPrice(totalAmount)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                  <CreditCard className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Kredi Kartı</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">{formatPrice(cardPayments)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                  <Banknote className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Havale/EFT</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">{formatPrice(bankPayments)}</p>
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
              {/* Payment Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {paymentFilters.map((filter) => {
                  const Icon = filter.icon;
                  const count = paymentCounts[filter.value] || 0;
                  return (
                    <Button
                      key={filter.value}
                      size="sm"
                      variant={paymentFilter === filter.value ? "default" : "outline"}
                      onClick={() => setPaymentFilter(filter.value)}
                      className={cn(
                        "gap-2",
                        paymentFilter === filter.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {filter.label}
                      <span className={cn(
                        "ml-1 px-1.5 py-0.5 rounded text-xs",
                        paymentFilter === filter.value
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
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Oluşturma</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Ödeme Tarihi</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Ödeme Yöntemi</th>
                    <th className="text-right p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <CheckCircle className="h-8 w-8 text-zinc-400" />
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
                          <Link
                            href={`/yonetim/faturalar/${invoice.id}`}
                            className="text-sm font-medium text-zinc-900 dark:text-white hover:text-primary transition-colors"
                          >
                            {invoice.id}
                          </Link>
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
                          <span className="text-sm font-medium text-green-600 dark:text-green-500">
                            {formatPrice(invoice.amount)}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">
                            {new Date(invoice.createdAt).toLocaleDateString("tr-TR")}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-green-600 dark:text-green-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(invoice.paidAt).toLocaleDateString("tr-TR")}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
                            invoice.paymentMethod === "Kredi Kartı"
                              ? "bg-purple-500/10 text-purple-600 dark:text-purple-500"
                              : "bg-orange-500/10 text-orange-600 dark:text-orange-500"
                          )}>
                            {invoice.paymentMethod === "Kredi Kartı" ? (
                              <CreditCard className="h-3 w-3" />
                            ) : (
                              <Banknote className="h-3 w-3" />
                            )}
                            {invoice.paymentMethod}
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
                              <DropdownMenuItem className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                                <Mail className="h-4 w-4" />
                                Makbuz Gönder
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
