"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Mail,
  CheckCircle,
  Printer,
  CreditCard,
  Clock,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";

// Mock invoice data
const invoiceData = {
  id: "F-2024-0201",
  status: "paid",
  createdAt: "2024-06-15",
  dueDate: "2024-06-30",
  paidAt: "2024-06-18",
  paymentMethod: "Kredi Kartı",
  customer: {
    id: "M-001",
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    company: "Yılmaz Teknoloji Ltd.",
    address: "Atatürk Cad. No:123, Kadıköy, İstanbul",
    taxNumber: "1234567890",
  },
  items: [
    {
      id: 1,
      description: "Profesyonel Hosting - yilmaztech.com",
      period: "01.06.2024 - 01.06.2025",
      quantity: 1,
      unitPrice: 299,
      total: 299,
    },
    {
      id: 2,
      description: "Wildcard SSL Sertifikası - yilmaztech.com",
      period: "01.06.2024 - 01.06.2025",
      quantity: 1,
      unitPrice: 199,
      total: 199,
    },
    {
      id: 3,
      description: "Kurumsal E-posta (10 hesap) - yilmaztech.com",
      period: "01.06.2024 - 01.06.2025",
      quantity: 1,
      unitPrice: 149,
      total: 149,
    },
  ],
  subtotal: 647,
  tax: 0,
  discount: 0,
  total: 647,
};

const paymentHistory = [
  {
    date: "2024-06-18 14:32",
    method: "Kredi Kartı (****6411)",
    amount: 647,
    status: "success",
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  paid: { label: "Ödendi", color: "bg-green-500/10 text-green-600 dark:text-green-500", icon: CheckCircle },
  pending: { label: "Bekliyor", color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500", icon: Clock },
  overdue: { label: "Gecikmiş", color: "bg-red-500/10 text-red-600 dark:text-red-500", icon: AlertTriangle },
  cancelled: { label: "İptal", color: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-500", icon: XCircle },
};

export default function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const StatusIcon = statusConfig[invoiceData.status].icon;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/yonetim/faturalar"
        className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Faturalara Dön
      </Link>

      {/* Header */}
      <BlurFade delay={0}>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Fatura {invoiceData.id}</h1>
              <span className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                statusConfig[invoiceData.status].color
              )}>
                <StatusIcon className="h-3.5 w-3.5" />
                {statusConfig[invoiceData.status].label}
              </span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">
              Oluşturulma: {new Date(invoiceData.createdAt).toLocaleDateString("tr-TR")}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700">
              <Printer className="mr-2 h-4 w-4" />
              Yazdır
            </Button>
            <Button variant="outline" className="bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700">
              <Download className="mr-2 h-4 w-4" />
              PDF İndir
            </Button>
            <Button variant="outline" className="bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700">
              <Mail className="mr-2 h-4 w-4" />
              E-posta Gönder
            </Button>
            {invoiceData.status === "pending" && (
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle className="mr-2 h-4 w-4" />
                Ödendi İşaretle
              </Button>
            )}
          </div>
        </div>
      </BlurFade>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Invoice */}
        <div className="lg:col-span-2">
          <BlurFade delay={0.1}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex justify-between mb-8">
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">KLEACORE</h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">30 N Gould St Ste R</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Sheridan, WY 82801, USA</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">EIN: 36-5157418</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">FATURA</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">No: {invoiceData.id}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Tarih: {new Date(invoiceData.createdAt).toLocaleDateString("tr-TR")}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Son Ödeme: {new Date(invoiceData.dueDate).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="mb-8 p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800/50">
                  <p className="text-sm text-zinc-500 mb-2">Fatura Adresi</p>
                  <p className="text-zinc-900 dark:text-white font-medium">{invoiceData.customer.name}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{invoiceData.customer.company}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{invoiceData.customer.address}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Vergi No: {invoiceData.customer.taxNumber}</p>
                </div>

                {/* Items */}
                <div className="mb-8">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-200 dark:border-zinc-800">
                        <th className="text-left py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">Açıklama</th>
                        <th className="text-center py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">Adet</th>
                        <th className="text-right py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">Birim Fiyat</th>
                        <th className="text-right py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">Toplam</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData.items.map((item) => (
                        <tr key={item.id} className="border-b border-zinc-200 dark:border-zinc-800">
                          <td className="py-4">
                            <p className="text-sm text-zinc-900 dark:text-white">{item.description}</p>
                            <p className="text-xs text-zinc-500">{item.period}</p>
                          </td>
                          <td className="py-4 text-center text-sm text-zinc-700 dark:text-zinc-300">{item.quantity}</td>
                          <td className="py-4 text-right text-sm text-zinc-700 dark:text-zinc-300">
                            {formatPrice(item.unitPrice)}
                          </td>
                          <td className="py-4 text-right text-sm font-medium text-zinc-900 dark:text-white">
                            {formatPrice(item.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-600 dark:text-zinc-400">Ara Toplam</span>
                      <span className="text-zinc-700 dark:text-zinc-300">{formatPrice(invoiceData.subtotal)}</span>
                    </div>
                    {invoiceData.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">İndirim</span>
                        <span className="text-green-600 dark:text-green-500">-{formatPrice(invoiceData.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-600 dark:text-zinc-400">KDV (%0)</span>
                      <span className="text-zinc-700 dark:text-zinc-300">{formatPrice(invoiceData.tax)}</span>
                    </div>
                    <Separator className="bg-zinc-200 dark:bg-zinc-800" />
                    <div className="flex justify-between">
                      <span className="font-medium text-zinc-900 dark:text-white">Toplam</span>
                      <span className="text-xl font-bold text-zinc-900 dark:text-white">{formatPrice(invoiceData.total)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Invoice Info */}
          <BlurFade delay={0.15}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-900 dark:text-white text-base">Fatura Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600 dark:text-zinc-500">Durum</span>
                  <span className={cn(
                    "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
                    statusConfig[invoiceData.status].color
                  )}>
                    <StatusIcon className="h-3 w-3" />
                    {statusConfig[invoiceData.status].label}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600 dark:text-zinc-500">Oluşturulma</span>
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    {new Date(invoiceData.createdAt).toLocaleDateString("tr-TR")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600 dark:text-zinc-500">Son Ödeme</span>
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    {new Date(invoiceData.dueDate).toLocaleDateString("tr-TR")}
                  </span>
                </div>
                {invoiceData.paidAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-600 dark:text-zinc-500">Ödeme Tarihi</span>
                    <span className="text-sm text-green-600 dark:text-green-500">
                      {new Date(invoiceData.paidAt).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </BlurFade>

          {/* Customer */}
          <BlurFade delay={0.2}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-900 dark:text-white text-base">Müşteri</CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/yonetim/musteriler/${invoiceData.customer.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white text-sm font-medium">
                    {invoiceData.customer.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">{invoiceData.customer.name}</p>
                    <p className="text-xs text-zinc-500">{invoiceData.customer.email}</p>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Payment History */}
          <BlurFade delay={0.25}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-900 dark:text-white text-base">Ödeme Geçmişi</CardTitle>
              </CardHeader>
              <CardContent>
                {paymentHistory.length > 0 ? (
                  <div className="space-y-4">
                    {paymentHistory.map((payment, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/50">
                        <CreditCard className="h-5 w-5 text-green-500 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-zinc-900 dark:text-white">
                              {formatPrice(payment.amount)}
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-500">
                              Başarılı
                            </span>
                          </div>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">{payment.method}</p>
                          <p className="text-xs text-zinc-500">{payment.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-zinc-500 text-center py-4">Henüz ödeme yapılmadı</p>
                )}

                {invoiceData.status !== "paid" && (
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Manuel Ödeme Kaydet
                  </Button>
                )}
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
