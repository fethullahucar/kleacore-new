"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  AlertTriangle,
  Building2,
  Mail,
  CheckCircle,
  Pause,
  MoreHorizontal,
  Eye,
  Download,
  TrendingDown,
  Calendar,
  AlertCircle,
  AlertOctagon,
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
    id: "F-2024-0199",
    customer: "Mehmet Kaya",
    customerId: "M-003",
    companyName: "KayaSoft Ltd.",
    email: "mehmet@kayasoft.net",
    amount: 899.00,
    createdAt: "2024-06-10",
    dueDate: "2024-06-20",
    daysOverdue: 4,
  },
  {
    id: "F-2024-0180",
    customer: "Kerem Aktaş",
    customerId: "M-025",
    companyName: null,
    email: "kerem@example.com",
    amount: 599.00,
    createdAt: "2024-05-15",
    dueDate: "2024-05-30",
    daysOverdue: 25,
  },
  {
    id: "F-2024-0175",
    customer: "Hasan Demir",
    customerId: "M-015",
    companyName: null,
    email: "hasan@example.com",
    amount: 1299.00,
    createdAt: "2024-05-10",
    dueDate: "2024-05-25",
    daysOverdue: 30,
  },
  {
    id: "F-2024-0168",
    customer: "Selim Korkmaz",
    customerId: "M-018",
    companyName: "Korkmaz İnşaat",
    email: "selim@korkmaz.com.tr",
    amount: 2499.00,
    createdAt: "2024-05-01",
    dueDate: "2024-05-16",
    daysOverdue: 39,
  },
  {
    id: "F-2024-0160",
    customer: "Gizem Aksoy",
    customerId: "M-022",
    companyName: null,
    email: "gizem@example.com",
    amount: 349.00,
    createdAt: "2024-04-25",
    dueDate: "2024-05-10",
    daysOverdue: 45,
  },
  {
    id: "F-2024-0155",
    customer: "Okan Yılmaz",
    customerId: "M-028",
    companyName: "Yılmaz Ticaret",
    email: "okan@yilmaztic.com",
    amount: 1899.00,
    createdAt: "2024-04-20",
    dueDate: "2024-05-05",
    daysOverdue: 50,
  },
];

const severityFilters = [
  { value: "all", label: "Tümü", icon: AlertTriangle },
  { value: "mild", label: "Hafif (1-14 gün)", icon: AlertCircle },
  { value: "moderate", label: "Orta (15-29 gün)", icon: AlertTriangle },
  { value: "severe", label: "Kritik (30+ gün)", icon: AlertOctagon },
];

export default function OverdueInvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (invoice.companyName && invoice.companyName.toLowerCase().includes(searchQuery.toLowerCase()));

    let matchesSeverity = true;
    if (severityFilter === "mild") {
      matchesSeverity = invoice.daysOverdue >= 1 && invoice.daysOverdue <= 14;
    } else if (severityFilter === "moderate") {
      matchesSeverity = invoice.daysOverdue >= 15 && invoice.daysOverdue <= 29;
    } else if (severityFilter === "severe") {
      matchesSeverity = invoice.daysOverdue >= 30;
    }

    return matchesSearch && matchesSeverity;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2,
    }).format(price);
  };

  // Stats
  const totalOverdue = invoices.length;
  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const avgOverdue = Math.round(invoices.reduce((sum, inv) => sum + inv.daysOverdue, 0) / invoices.length);

  // Severity counts
  const severityCounts: Record<string, number> = {
    all: invoices.length,
    mild: invoices.filter(inv => inv.daysOverdue >= 1 && inv.daysOverdue <= 14).length,
    moderate: invoices.filter(inv => inv.daysOverdue >= 15 && inv.daysOverdue <= 29).length,
    severe: invoices.filter(inv => inv.daysOverdue >= 30).length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BlurFade delay={0}>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Gecikmiş Faturalar</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Son ödeme tarihi geçmiş faturalar</p>
        </div>
      </BlurFade>

      {/* Stats Cards */}
      <BlurFade delay={0.05}>
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Toplam Gecikmiş</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">{totalOverdue}</p>
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
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Toplam Borç</p>
                  <p className="text-xl font-bold text-red-600 dark:text-red-500">{formatPrice(totalAmount)}</p>
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
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Ort. Gecikme</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">{avgOverdue} gün</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                  <AlertOctagon className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Kritik (30+ gün)</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">{severityCounts.severe}</p>
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
              {/* Severity Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {severityFilters.map((filter) => {
                  const Icon = filter.icon;
                  const count = severityCounts[filter.value] || 0;
                  return (
                    <Button
                      key={filter.value}
                      size="sm"
                      variant={severityFilter === filter.value ? "default" : "outline"}
                      onClick={() => setSeverityFilter(filter.value)}
                      className={cn(
                        "gap-2",
                        severityFilter === filter.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {filter.label}
                      <span className={cn(
                        "ml-1 px-1.5 py-0.5 rounded text-xs",
                        severityFilter === filter.value
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
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Son Ödeme</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Gecikme</th>
                    <th className="text-right p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <AlertTriangle className="h-8 w-8 text-zinc-400" />
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
                          <span className="text-sm font-medium text-red-600 dark:text-red-500">
                            {formatPrice(invoice.amount)}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-red-600 dark:text-red-500">
                            {new Date(invoice.dueDate).toLocaleDateString("tr-TR")}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
                            invoice.daysOverdue >= 30
                              ? "bg-red-500/20 text-red-700 dark:text-red-400"
                              : invoice.daysOverdue >= 15
                              ? "bg-red-500/10 text-red-600 dark:text-red-500"
                              : "bg-orange-500/10 text-orange-600 dark:text-orange-500"
                          )}>
                            {invoice.daysOverdue >= 30 && <AlertOctagon className="h-3 w-3" />}
                            {invoice.daysOverdue >= 15 && invoice.daysOverdue < 30 && <AlertTriangle className="h-3 w-3" />}
                            {invoice.daysOverdue < 15 && <AlertCircle className="h-3 w-3" />}
                            {invoice.daysOverdue} gün
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
                                <Mail className="h-4 w-4" />
                                Hatırlatma Gönder
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-orange-600 dark:text-orange-500">
                                <Pause className="h-4 w-4" />
                                Hesabı Askıya Al
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
                              <DropdownMenuItem className="flex items-center gap-2 text-green-600 dark:text-green-500">
                                <CheckCircle className="h-4 w-4" />
                                Ödendi İşaretle
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
