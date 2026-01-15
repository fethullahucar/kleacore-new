"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Clock,
  Building2,
  Mail,
  CheckCircle,
  MoreHorizontal,
  Eye,
  Download,
  AlertTriangle,
  Timer,
  TrendingUp,
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
    id: "F-2024-0200",
    customer: "Ayşe Demir",
    customerId: "M-002",
    companyName: "Demir Holding A.Ş.",
    email: "ayse@demir-holding.com",
    amount: 1299.00,
    createdAt: "2024-06-14",
    dueDate: "2024-06-29",
    daysLeft: 5,
  },
  {
    id: "F-2024-0195",
    customer: "Ali Yıldız",
    customerId: "M-007",
    companyName: null,
    email: "ali@example.com",
    amount: 599.00,
    createdAt: "2024-06-10",
    dueDate: "2024-06-25",
    daysLeft: 1,
  },
  {
    id: "F-2024-0192",
    customer: "Deniz Koç",
    customerId: "M-010",
    companyName: null,
    email: "deniz@example.com",
    amount: 349.00,
    createdAt: "2024-06-05",
    dueDate: "2024-06-28",
    daysLeft: 4,
  },
  {
    id: "F-2024-0188",
    customer: "Selin Aydın",
    customerId: "M-012",
    companyName: null,
    email: "selin@example.com",
    amount: 199.00,
    createdAt: "2024-06-01",
    dueDate: "2024-06-30",
    daysLeft: 6,
  },
  {
    id: "F-2024-0185",
    customer: "Mert Kara",
    customerId: "M-015",
    companyName: "Kara İnşaat",
    email: "mert@karains.com",
    amount: 2499.00,
    createdAt: "2024-05-28",
    dueDate: "2024-06-27",
    daysLeft: 3,
  },
  {
    id: "F-2024-0182",
    customer: "Ece Polat",
    customerId: "M-018",
    companyName: null,
    email: "ece@example.com",
    amount: 749.00,
    createdAt: "2024-05-25",
    dueDate: "2024-06-26",
    daysLeft: 2,
  },
];

const urgencyFilters = [
  { value: "all", label: "Tümü", icon: Clock },
  { value: "critical", label: "Kritik (1-2 gün)", icon: AlertTriangle },
  { value: "warning", label: "Yaklaşan (3-5 gün)", icon: Timer },
  { value: "normal", label: "Normal (6+ gün)", icon: CheckCircle },
];

export default function PendingInvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("all");

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (invoice.companyName && invoice.companyName.toLowerCase().includes(searchQuery.toLowerCase()));

    let matchesUrgency = true;
    if (urgencyFilter === "critical") {
      matchesUrgency = invoice.daysLeft <= 2;
    } else if (urgencyFilter === "warning") {
      matchesUrgency = invoice.daysLeft >= 3 && invoice.daysLeft <= 5;
    } else if (urgencyFilter === "normal") {
      matchesUrgency = invoice.daysLeft >= 6;
    }

    return matchesSearch && matchesUrgency;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2,
    }).format(price);
  };

  // Stats
  const totalPending = invoices.length;
  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const criticalCount = invoices.filter(inv => inv.daysLeft <= 2).length;
  const warningCount = invoices.filter(inv => inv.daysLeft >= 3 && inv.daysLeft <= 5).length;

  // Urgency counts
  const urgencyCounts: Record<string, number> = {
    all: invoices.length,
    critical: invoices.filter(inv => inv.daysLeft <= 2).length,
    warning: invoices.filter(inv => inv.daysLeft >= 3 && inv.daysLeft <= 5).length,
    normal: invoices.filter(inv => inv.daysLeft >= 6).length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BlurFade delay={0}>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Bekleyen Faturalar</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Ödeme beklenen faturalar</p>
        </div>
      </BlurFade>

      {/* Stats Cards */}
      <BlurFade delay={0.05}>
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Toplam Bekleyen</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">{totalPending}</p>
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
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Kritik</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">{criticalCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                  <Timer className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Yaklaşan</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">{warningCount}</p>
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
              {/* Urgency Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {urgencyFilters.map((filter) => {
                  const Icon = filter.icon;
                  const count = urgencyCounts[filter.value] || 0;
                  return (
                    <Button
                      key={filter.value}
                      size="sm"
                      variant={urgencyFilter === filter.value ? "default" : "outline"}
                      onClick={() => setUrgencyFilter(filter.value)}
                      className={cn(
                        "gap-2",
                        urgencyFilter === filter.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {filter.label}
                      <span className={cn(
                        "ml-1 px-1.5 py-0.5 rounded text-xs",
                        urgencyFilter === filter.value
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
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Kalan Süre</th>
                    <th className="text-right p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <Clock className="h-8 w-8 text-zinc-400" />
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
                          <span className="text-sm font-medium text-zinc-900 dark:text-white">
                            {formatPrice(invoice.amount)}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">
                            {new Date(invoice.dueDate).toLocaleDateString("tr-TR")}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
                            invoice.daysLeft <= 2
                              ? "bg-red-500/10 text-red-600 dark:text-red-500"
                              : invoice.daysLeft <= 5
                              ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500"
                              : "bg-green-500/10 text-green-600 dark:text-green-500"
                          )}>
                            {invoice.daysLeft <= 2 && <AlertTriangle className="h-3 w-3" />}
                            {invoice.daysLeft >= 3 && invoice.daysLeft <= 5 && <Timer className="h-3 w-3" />}
                            {invoice.daysLeft >= 6 && <Clock className="h-3 w-3" />}
                            {invoice.daysLeft} gün
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
                              <DropdownMenuItem className="flex items-center gap-2 text-blue-600 dark:text-blue-500">
                                <Mail className="h-4 w-4" />
                                Hatırlatma Gönder
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
