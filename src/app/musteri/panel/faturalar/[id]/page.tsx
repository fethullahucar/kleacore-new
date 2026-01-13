"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  ArrowLeft,
  Download,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  Printer,
  Calendar,
  Building,
  Receipt,
  Tag,
  Package,
  Mail,
  Banknote,
  Info,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock invoices database
const invoicesDB: Record<string, {
  id: string;
  description: string;
  status: "paid" | "pending" | "overdue" | "cancelled";
  createdAt: string;
  dueDate: string;
  paidDate: string | null;
  paymentMethod: string | null;
  transactionId: string | null;
  items: Array<{
    id: number;
    name: string;
    description: string;
    period: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  tax: number;
  taxRate: number;
  total: number;
  billingInfo: {
    name: string;
    company?: string;
    address: string;
    city: string;
    country: string;
    taxId?: string;
    email: string;
  };
  relatedService?: {
    id: number;
    name: string;
    type: string;
  };
}> = {
  "INV-2024-0156": {
    id: "INV-2024-0156",
    description: "Linux Hosting Pro - 12 Aylık",
    status: "paid",
    createdAt: "1 Ocak 2024",
    dueDate: "15 Ocak 2024",
    paidDate: "14 Ocak 2024",
    paymentMethod: "Kredi Kartı",
    transactionId: "TXN-98765432",
    items: [
      {
        id: 1,
        name: "Linux Hosting Pro",
        description: "Profesyonel Linux hosting paketi",
        period: "1 Ocak 2024 - 1 Ocak 2025",
        quantity: 1,
        unitPrice: 199.0,
        total: 2388.0,
      },
    ],
    subtotal: 2388.0,
    tax: 0,
    taxRate: 0,
    total: 2388.0,
    billingInfo: {
      name: "Ahmet Yılmaz",
      company: "Örnek Şirket Ltd. Şti.",
      address: "Örnek Mah. Test Sok. No:1",
      city: "İstanbul",
      country: "Türkiye",
      taxId: "1234567890",
      email: "ahmet@example.com",
    },
    relatedService: {
      id: 1,
      name: "Linux Hosting Pro",
      type: "Hosting",
    },
  },
  "INV-2024-0178": {
    id: "INV-2024-0178",
    description: "VDS-M Sunucu - Aylık",
    status: "paid",
    createdAt: "1 Şubat 2024",
    dueDate: "10 Şubat 2024",
    paidDate: "10 Şubat 2024",
    paymentMethod: "Havale/EFT",
    transactionId: "HVL-12345678",
    items: [
      {
        id: 1,
        name: "VDS-M Sunucu",
        description: "4 vCPU, 8GB RAM, 100GB SSD",
        period: "1 Şubat 2024 - 1 Mart 2024",
        quantity: 1,
        unitPrice: 549.0,
        total: 549.0,
      },
    ],
    subtotal: 549.0,
    tax: 0,
    taxRate: 0,
    total: 549.0,
    billingInfo: {
      name: "Ahmet Yılmaz",
      address: "Örnek Mah. Test Sok. No:1",
      city: "İstanbul",
      country: "Türkiye",
      email: "ahmet@example.com",
    },
    relatedService: {
      id: 3,
      name: "VDS-M Sunucu",
      type: "VDS",
    },
  },
  "INV-2024-0195": {
    id: "INV-2024-0195",
    description: "Wildcard SSL - Yıllık",
    status: "pending",
    createdAt: "10 Ocak 2025",
    dueDate: "17 Ocak 2025",
    paidDate: null,
    paymentMethod: null,
    transactionId: null,
    items: [
      {
        id: 1,
        name: "Wildcard SSL Sertifikası",
        description: "*.example.com için wildcard SSL",
        period: "17 Ocak 2025 - 17 Ocak 2026",
        quantity: 1,
        unitPrice: 599.0,
        total: 599.0,
      },
    ],
    subtotal: 599.0,
    tax: 0,
    taxRate: 0,
    total: 599.0,
    billingInfo: {
      name: "Ahmet Yılmaz",
      address: "Örnek Mah. Test Sok. No:1",
      city: "İstanbul",
      country: "Türkiye",
      email: "ahmet@example.com",
    },
    relatedService: {
      id: 5,
      name: "Wildcard SSL",
      type: "SSL",
    },
  },
  "INV-2024-0201": {
    id: "INV-2024-0201",
    description: "Cloud-S - Aylık",
    status: "pending",
    createdAt: "6 Ocak 2025",
    dueDate: "20 Ocak 2025",
    paidDate: null,
    paymentMethod: null,
    transactionId: null,
    items: [
      {
        id: 1,
        name: "Cloud-S Sunucu",
        description: "2 vCPU, 4GB RAM, 80GB SSD",
        period: "6 Ocak 2025 - 6 Şubat 2025",
        quantity: 1,
        unitPrice: 299.0,
        total: 299.0,
      },
    ],
    subtotal: 299.0,
    tax: 0,
    taxRate: 0,
    total: 299.0,
    billingInfo: {
      name: "Ahmet Yılmaz",
      address: "Örnek Mah. Test Sok. No:1",
      city: "İstanbul",
      country: "Türkiye",
      email: "ahmet@example.com",
    },
    relatedService: {
      id: 4,
      name: "Cloud-S",
      type: "Bulut Sunucu",
    },
  },
  "INV-2024-0089": {
    id: "INV-2024-0089",
    description: "Domain Yenileme - example.com",
    status: "overdue",
    createdAt: "15 Aralık 2023",
    dueDate: "1 Ocak 2024",
    paidDate: null,
    paymentMethod: null,
    transactionId: null,
    items: [
      {
        id: 1,
        name: "Domain Yenileme",
        description: "example.com - 1 yıllık yenileme",
        period: "1 Ocak 2024 - 1 Ocak 2025",
        quantity: 1,
        unitPrice: 149.0,
        total: 149.0,
      },
    ],
    subtotal: 149.0,
    tax: 0,
    taxRate: 0,
    total: 149.0,
    billingInfo: {
      name: "Ahmet Yılmaz",
      address: "Örnek Mah. Test Sok. No:1",
      city: "İstanbul",
      country: "Türkiye",
      email: "ahmet@example.com",
    },
  },
  "INV-2024-0145": {
    id: "INV-2024-0145",
    description: "VPS-S - Aylık",
    status: "cancelled",
    createdAt: "1 Aralık 2023",
    dueDate: "15 Aralık 2023",
    paidDate: null,
    paymentMethod: null,
    transactionId: null,
    items: [
      {
        id: 1,
        name: "VPS-S Sunucu",
        description: "2 vCPU, 2GB RAM, 40GB SSD",
        period: "15 Aralık 2023 - 15 Ocak 2024",
        quantity: 1,
        unitPrice: 199.0,
        total: 199.0,
      },
    ],
    subtotal: 199.0,
    tax: 0,
    taxRate: 0,
    total: 199.0,
    billingInfo: {
      name: "Ahmet Yılmaz",
      address: "Örnek Mah. Test Sok. No:1",
      city: "İstanbul",
      country: "Türkiye",
      email: "ahmet@example.com",
    },
  },
};

const statusConfig = {
  paid: {
    label: "Ödendi",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    icon: CheckCircle2,
  },
  pending: {
    label: "Ödeme Bekliyor",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    icon: Clock,
  },
  overdue: {
    label: "Gecikmiş",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    icon: AlertCircle,
  },
  cancelled: {
    label: "İptal Edildi",
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
    borderColor: "border-gray-500/30",
    icon: XCircle,
  },
};

export default function FaturaDetayPage() {
  const params = useParams();
  const id = params.id as string;
  const invoice = invoicesDB[id];

  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <FileText className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Fatura Bulunamadı</h2>
        <p className="text-muted-foreground mb-4">İstediğiniz fatura mevcut değil.</p>
        <Button asChild>
          <Link href="/musteri/panel/faturalar">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Faturalara Dön
          </Link>
        </Button>
      </div>
    );
  }

  const status = statusConfig[invoice.status];
  const StatusIcon = status.icon;
  const canPay = invoice.status === "pending" || invoice.status === "overdue";

  return (
    <div className="space-y-6">
      {/* Back Button & Header */}
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col gap-4">
          <Link
            href="/musteri/panel/faturalar"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Faturalara Dön
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={cn("p-4 rounded-xl", status.bgColor)}>
                <FileText className={cn("h-8 w-8", status.color)} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold tracking-tight">{invoice.id}</h1>
                  <span className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                    status.bgColor, status.color
                  )}>
                    <StatusIcon className="h-3 w-3" />
                    {status.label}
                  </span>
                </div>
                <p className="text-muted-foreground mt-1">{invoice.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Oluşturulma: {invoice.createdAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Son Ödeme: {invoice.dueDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Printer className="h-4 w-4" />
              </Button>
              {canPay && (
                <Button>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Şimdi Öde
                </Button>
              )}
            </div>
          </div>
        </div>
      </BlurFade>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Items */}
          <BlurFade delay={0.15} inView>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-primary" />
                  Fatura Kalemleri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoice.items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-lg border"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Dönem: {item.period}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{item.total.toFixed(2)} TL</p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-muted-foreground">
                              {item.quantity} x {item.unitPrice.toFixed(2)} TL
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Totals */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ara Toplam</span>
                      <span>{invoice.subtotal.toFixed(2)} TL</span>
                    </div>
                    {invoice.tax > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">KDV (%{invoice.taxRate})</span>
                        <span>{invoice.tax.toFixed(2)} TL</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                      <span>Toplam</span>
                      <span className={status.color}>{invoice.total.toFixed(2)} TL</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Payment Info - Only for paid invoices */}
          {invoice.status === "paid" && (
            <BlurFade delay={0.2} inView>
              <Card className="border-green-500/30 bg-green-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-500">
                    <CheckCircle2 className="h-5 w-5" />
                    Ödeme Bilgileri
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-3">
                      <Banknote className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Ödeme Yöntemi</p>
                        <p className="font-medium">{invoice.paymentMethod}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Ödeme Tarihi</p>
                        <p className="font-medium">{invoice.paidDate}</p>
                      </div>
                    </div>
                    {invoice.transactionId && (
                      <div className="flex items-center gap-3 sm:col-span-2">
                        <Tag className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">İşlem Numarası</p>
                          <p className="font-mono text-sm">{invoice.transactionId}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          )}

          {/* Overdue Warning */}
          {invoice.status === "overdue" && (
            <BlurFade delay={0.2} inView>
              <Card className="border-red-500/30 bg-red-500/5">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-500">Ödeme Gecikmiş</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Bu faturanın son ödeme tarihi geçmiştir. Hizmetinizin askıya alınmaması için
                        lütfen en kısa sürede ödemenizi gerçekleştirin.
                      </p>
                      <Button className="mt-3" size="sm">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Hemen Öde
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          )}

          {/* Billing Info */}
          <BlurFade delay={0.25} inView>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Fatura Adresi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="font-semibold">{invoice.billingInfo.name}</p>
                    {invoice.billingInfo.company && (
                      <p className="text-sm text-muted-foreground">{invoice.billingInfo.company}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">
                      {invoice.billingInfo.address}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {invoice.billingInfo.city}, {invoice.billingInfo.country}
                    </p>
                  </div>
                  <div>
                    {invoice.billingInfo.taxId && (
                      <div className="mb-2">
                        <p className="text-xs text-muted-foreground">Vergi No</p>
                        <p className="font-medium">{invoice.billingInfo.taxId}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-muted-foreground">E-posta</p>
                      <p className="font-medium">{invoice.billingInfo.email}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Invoice Summary */}
          <BlurFade delay={0.3} inView>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Fatura Özeti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fatura No</span>
                    <span className="font-medium">{invoice.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Oluşturulma</span>
                    <span className="font-medium">{invoice.createdAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Son Ödeme</span>
                    <span className="font-medium">{invoice.dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Durum</span>
                    <span className={cn("font-medium", status.color)}>{status.label}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <span className="font-medium">Toplam</span>
                    <span className="text-xl font-bold">{invoice.total.toFixed(2)} TL</span>
                  </div>
                </div>

                {canPay && (
                  <Button className="w-full" size="lg">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Ödeme Yap
                  </Button>
                )}
              </CardContent>
            </Card>
          </BlurFade>

          {/* Related Service */}
          {invoice.relatedService && (
            <BlurFade delay={0.35} inView>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">İlgili Hizmet</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Package className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{invoice.relatedService.name}</p>
                      <p className="text-xs text-muted-foreground">{invoice.relatedService.type}</p>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/musteri/panel/hizmetlerim/${invoice.relatedService.id}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          )}

          {/* Actions */}
          <BlurFade delay={0.4} inView>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">İşlemler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  PDF İndir
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Printer className="mr-2 h-4 w-4" />
                  Yazdır
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="mr-2 h-4 w-4" />
                  E-posta Gönder
                </Button>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Help */}
          <BlurFade delay={0.45} inView>
            <Card className="border-dashed">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">Ödeme Sorunları</p>
                    <p>
                      Fatura ile ilgili sorun yaşıyorsanız destek ekibimize ulaşabilirsiniz.
                    </p>
                    <Button variant="link" className="h-auto p-0 mt-2" asChild>
                      <Link href="/musteri/panel/destek">
                        Destek Talebi Oluştur
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
