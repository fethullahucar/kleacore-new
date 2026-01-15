"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Pause,
  Play,
  Edit,
  Mail,
  Printer,
  FileText,
  Package,
  User,
  Building2,
  Calendar,
  CreditCard,
  Globe,
  Server,
  RefreshCw,
  AlertTriangle,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Mock order data
const orderData = {
  id: "S-2024-00345",
  status: "active",
  createdAt: "2024-06-18T10:30:00",
  approvedAt: "2024-06-18T11:15:00",
  activatedAt: "2024-06-18T11:20:00",
  renewalDate: "2025-06-18",
  billingCycle: "yearly",
  paymentMethod: "Kredi Kartı",
  domain: "ahmetyilmaz.com",
  ipAddress: "185.92.1.45",
  notes: "Müşteri özel disk alanı talep etti, 20GB ek disk eklendi.",

  customer: {
    id: "M-001",
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    phone: "0532 123 45 67",
    company: "Yılmaz Teknoloji Ltd.",
  },

  product: {
    id: "P-001",
    name: "Pro Hosting",
    category: "Hosting",
    sku: "HOST-PRO-001",
    features: [
      "50 GB NVMe Disk",
      "Sınırsız Bandwidth",
      "Ücretsiz SSL",
      "Günlük Yedekleme",
      "7/24 Destek",
    ],
  },

  addons: [
    { name: "Ek 20GB Disk", price: 49, period: "Aylık" },
    { name: "Yedekleme Pro", price: 29, period: "Aylık" },
  ],

  pricing: {
    basePrice: 299,
    addonsTotal: 78,
    discount: 50,
    discountCode: "SUMMER2024",
    subtotal: 327,
    tax: 0,
    total: 327,
  },

  invoice: {
    id: "F-2024-0201",
    status: "paid",
    paidAt: "2024-06-18T11:10:00",
  },

  service: {
    id: "H-001",
    status: "active",
  },
};

const timeline = [
  {
    date: "2024-06-18 11:20",
    action: "Hizmet aktif edildi",
    description: "Hosting hesabı oluşturuldu ve aktif edildi",
    type: "success",
    icon: CheckCircle,
  },
  {
    date: "2024-06-18 11:15",
    action: "Sipariş onaylandı",
    description: "Admin tarafından onaylandı",
    type: "success",
    icon: CheckCircle,
  },
  {
    date: "2024-06-18 11:10",
    action: "Ödeme alındı",
    description: "Kredi kartı ile ₺327,00 ödeme yapıldı",
    type: "success",
    icon: CreditCard,
  },
  {
    date: "2024-06-18 10:30",
    action: "Sipariş oluşturuldu",
    description: "Müşteri tarafından sipariş verildi",
    type: "info",
    icon: Package,
  },
];

const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  pending: { label: "Beklemede", color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  approved: { label: "Onaylandı", color: "text-blue-500", bgColor: "bg-blue-500/10" },
  active: { label: "Aktif", color: "text-green-500", bgColor: "bg-green-500/10" },
  suspended: { label: "Askıda", color: "text-orange-500", bgColor: "bg-orange-500/10" },
  cancelled: { label: "İptal", color: "text-red-500", bgColor: "bg-red-500/10" },
  completed: { label: "Tamamlandı", color: "text-green-500", bgColor: "bg-green-500/10" },
};

const billingCycleLabels: Record<string, string> = {
  monthly: "Aylık",
  quarterly: "3 Aylık",
  semiannual: "6 Aylık",
  yearly: "Yıllık",
  biennial: "2 Yıllık",
  triennial: "3 Yıllık",
};

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/yonetim/siparisler"
        className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Siparişlere Dön
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Sipariş {orderData.id}</h1>
            <span className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium",
              statusConfig[orderData.status].bgColor,
              statusConfig[orderData.status].color
            )}>
              <CheckCircle className="h-4 w-4" />
              {statusConfig[orderData.status].label}
            </span>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400">
            Oluşturulma: {formatDateTime(orderData.createdAt)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {orderData.status === "pending" && (
            <>
              <Button className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="mr-2 h-4 w-4" />
                Onayla
              </Button>
              <Button variant="destructive">
                <XCircle className="mr-2 h-4 w-4" />
                Reddet
              </Button>
            </>
          )}
          {orderData.status === "active" && (
            <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500/10">
              <Pause className="mr-2 h-4 w-4" />
              Askıya Al
            </Button>
          )}
          {orderData.status === "suspended" && (
            <Button className="bg-green-600 hover:bg-green-700">
              <Play className="mr-2 h-4 w-4" />
              Aktif Et
            </Button>
          )}
          <Button variant="outline" className="border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
            <Edit className="mr-2 h-4 w-4" />
            Düzenle
          </Button>
          <Button variant="outline" className="border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
            <Mail className="mr-2 h-4 w-4" />
            E-posta
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Info */}
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-900 dark:text-white text-base flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Ürün Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{orderData.product.name}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{orderData.product.category} - {orderData.product.sku}</p>
                  {orderData.domain && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <Globe className="h-4 w-4" />
                      <span>{orderData.domain}</span>
                    </div>
                  )}
                  {orderData.ipAddress && (
                    <div className="flex items-center gap-2 mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      <Server className="h-4 w-4" />
                      <span>{orderData.ipAddress}</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-zinc-900 dark:text-white">{formatPrice(orderData.pricing.basePrice)}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{billingCycleLabels[orderData.billingCycle]}</p>
                </div>
              </div>

              {/* Features */}
              <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800/50">
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Paket Özellikleri</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {orderData.product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Addons */}
              {orderData.addons.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Eklentiler</p>
                  <div className="space-y-2">
                    {orderData.addons.map((addon, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/50">
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">{addon.name}</span>
                        <span className="text-sm font-medium text-zinc-900 dark:text-white">
                          {formatPrice(addon.price)}/{addon.period}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pricing Breakdown */}
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-900 dark:text-white text-base flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Fiyat Dökümü
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Paket Ücreti ({billingCycleLabels[orderData.billingCycle]})</span>
                  <span className="text-zinc-900 dark:text-white">{formatPrice(orderData.pricing.basePrice)}</span>
                </div>
                {orderData.pricing.addonsTotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">Eklentiler</span>
                    <span className="text-zinc-900 dark:text-white">{formatPrice(orderData.pricing.addonsTotal)}</span>
                  </div>
                )}
                {orderData.pricing.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      İndirim
                      {orderData.pricing.discountCode && (
                        <span className="ml-2 px-2 py-0.5 bg-green-500/10 text-green-500 rounded text-xs">
                          {orderData.pricing.discountCode}
                        </span>
                      )}
                    </span>
                    <span className="text-green-500">-{formatPrice(orderData.pricing.discount)}</span>
                  </div>
                )}
                <Separator className="bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Ara Toplam</span>
                  <span className="text-zinc-900 dark:text-white">{formatPrice(orderData.pricing.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">KDV (%0)</span>
                  <span className="text-zinc-900 dark:text-white">{formatPrice(orderData.pricing.tax)}</span>
                </div>
                <Separator className="bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex justify-between">
                  <span className="font-medium text-zinc-900 dark:text-white">Toplam</span>
                  <span className="text-xl font-bold text-zinc-900 dark:text-white">{formatPrice(orderData.pricing.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-900 dark:text-white text-base flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Sipariş Geçmişi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full shrink-0",
                        item.type === "success" ? "bg-green-500/10" : "bg-blue-500/10"
                      )}>
                        <Icon className={cn(
                          "h-5 w-5",
                          item.type === "success" ? "text-green-500" : "text-blue-500"
                        )} />
                      </div>
                      <div className="flex-1 pb-4 border-b border-zinc-200 dark:border-zinc-800 last:border-0 last:pb-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-zinc-900 dark:text-white">{item.action}</p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
                          </div>
                          <span className="text-xs text-zinc-500">{item.date}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Order Info */}
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-900 dark:text-white text-base">Sipariş Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Durum</span>
                <span className={cn(
                  "text-sm font-medium",
                  statusConfig[orderData.status].color
                )}>
                  {statusConfig[orderData.status].label}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Fatura Dönemi</span>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">{billingCycleLabels[orderData.billingCycle]}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Oluşturulma</span>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">{formatDate(orderData.createdAt)}</span>
              </div>
              {orderData.approvedAt && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500">Onaylanma</span>
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">{formatDate(orderData.approvedAt)}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Yenileme Tarihi</span>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">{formatDate(orderData.renewalDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Ödeme Yöntemi</span>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">{orderData.paymentMethod}</span>
              </div>
            </CardContent>
          </Card>

          {/* Customer */}
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-900 dark:text-white text-base">Müşteri</CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href={`/yonetim/musteriler/${orderData.customer.id}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white text-sm font-medium">
                  {orderData.customer.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">{orderData.customer.name}</p>
                  {orderData.customer.company && (
                    <p className="text-xs text-zinc-500 flex items-center gap-1 truncate">
                      <Building2 className="h-3 w-3 shrink-0" />
                      {orderData.customer.company}
                    </p>
                  )}
                </div>
                <ExternalLink className="h-4 w-4 text-zinc-400" />
              </Link>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                  <Mail className="h-4 w-4" />
                  <span>{orderData.customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                  <User className="h-4 w-4" />
                  <span>{orderData.customer.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Invoice */}
          {orderData.invoice && (
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-900 dark:text-white text-base">İlgili Fatura</CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/yonetim/faturalar/${orderData.invoice.id}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">{orderData.invoice.id}</p>
                      <p className="text-xs text-zinc-500">
                        {orderData.invoice.status === "paid" ? "Ödendi" : "Bekliyor"}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-zinc-400" />
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Related Service */}
          {orderData.service && (
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-900 dark:text-white text-base">İlgili Hizmet</CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/yonetim/siparisler/${orderData.service.id}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Server className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">{orderData.service.id}</p>
                      <p className="text-xs text-green-500">Aktif</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-zinc-400" />
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Admin Notes */}
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-900 dark:text-white text-base flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Admin Notları
              </CardTitle>
            </CardHeader>
            <CardContent>
              {orderData.notes ? (
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{orderData.notes}</p>
              ) : (
                <p className="text-sm text-zinc-500 italic">Henüz not eklenmemiş</p>
              )}
              <Button variant="ghost" size="sm" className="mt-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                Not Ekle
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
