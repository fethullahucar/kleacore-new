"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  FileText,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  CreditCard,
  Calendar,
  ExternalLink,
  Receipt,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock service data
const getServiceById = (id: string) => {
  const services: Record<string, {
    id: number;
    name: string;
    type: string;
    domain: string;
  }> = {
    "1": { id: 1, name: "Linux Hosting Pro", type: "Hosting", domain: "example.com" },
    "2": { id: 2, name: "VDS Starter", type: "Sunucu", domain: "vds1.example.com" },
    "3": { id: 3, name: "Wildcard SSL", type: "SSL", domain: "*.example.com" },
  };
  return services[id] || services["1"];
};

// Mock invoices for the service
const getInvoicesForService = (serviceId: string) => {
  const allInvoices = [
    {
      id: "INV-2024-001",
      date: "15 Ocak 2024",
      dueDate: "25 Ocak 2024",
      amount: 199.00,
      status: "paid",
      type: "Yenileme",
      paidAt: "16 Ocak 2024",
      paymentMethod: "Kredi Kartı",
    },
    {
      id: "INV-2023-156",
      date: "15 Ocak 2023",
      dueDate: "25 Ocak 2023",
      amount: 179.00,
      status: "paid",
      type: "Yenileme",
      paidAt: "15 Ocak 2023",
      paymentMethod: "Havale/EFT",
    },
    {
      id: "INV-2022-089",
      date: "15 Ocak 2022",
      dueDate: "25 Ocak 2022",
      amount: 149.00,
      status: "paid",
      type: "İlk Kayıt",
      paidAt: "15 Ocak 2022",
      paymentMethod: "Kredi Kartı",
    },
  ];

  // For service 2 (VDS), show different invoices
  if (serviceId === "2") {
    return [
      {
        id: "INV-2024-089",
        date: "1 Şubat 2024",
        dueDate: "10 Şubat 2024",
        amount: 299.00,
        status: "pending",
        type: "Yenileme",
        paidAt: null,
        paymentMethod: null,
      },
      {
        id: "INV-2024-045",
        date: "1 Ocak 2024",
        dueDate: "10 Ocak 2024",
        amount: 299.00,
        status: "paid",
        type: "Yenileme",
        paidAt: "5 Ocak 2024",
        paymentMethod: "Kredi Kartı",
      },
    ];
  }

  return allInvoices;
};

const statusConfig = {
  paid: {
    label: "Ödendi",
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-500/10",
  },
  pending: {
    label: "Bekliyor",
    icon: Clock,
    color: "text-yellow-600",
    bg: "bg-yellow-500/10",
  },
  overdue: {
    label: "Gecikmiş",
    icon: AlertCircle,
    color: "text-red-600",
    bg: "bg-red-500/10",
  },
};

export default function ServiceInvoicesPage() {
  const params = useParams();
  const serviceId = params.id as string;
  const service = getServiceById(serviceId);
  const invoices = getInvoicesForService(serviceId);

  const totalPaid = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const pendingAmount = invoices
    .filter((inv) => inv.status === "pending" || inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <BlurFade delay={0.1} inView>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/musteri/panel/hizmetlerim/${serviceId}`}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Hizmet Faturaları</h1>
            <p className="text-muted-foreground">
              {service.name} - {service.domain}
            </p>
          </div>
        </div>
      </BlurFade>

      {/* Stats */}
      <BlurFade delay={0.15} inView>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Receipt className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Fatura</p>
                  <p className="text-2xl font-bold">{invoices.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Ödenen</p>
                  <p className="text-2xl font-bold">₺{totalPaid.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  pendingAmount > 0 ? "bg-yellow-500/10" : "bg-gray-500/10"
                )}>
                  <Clock className={cn(
                    "h-5 w-5",
                    pendingAmount > 0 ? "text-yellow-500" : "text-gray-500"
                  )} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bekleyen</p>
                  <p className="text-2xl font-bold">₺{pendingAmount.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </BlurFade>

      {/* Invoices List */}
      <BlurFade delay={0.2} inView>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Fatura Geçmişi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => {
                const status = statusConfig[invoice.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;

                return (
                  <div
                    key={invoice.id}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:shadow-sm transition-shadow"
                  >
                    <div className={cn("p-3 rounded-lg", status.bg)}>
                      <FileText className={cn("h-6 w-6", status.color)} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold">{invoice.id}</p>
                        <span className={cn(
                          "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full",
                          status.bg,
                          status.color
                        )}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </span>
                        <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
                          {invoice.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {invoice.date}
                        </span>
                        {invoice.status === "paid" && invoice.paidAt && (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                            Ödeme: {invoice.paidAt}
                          </span>
                        )}
                        {invoice.status === "pending" && (
                          <span className="flex items-center gap-1 text-yellow-600">
                            <Clock className="h-3 w-3" />
                            Son Ödeme: {invoice.dueDate}
                          </span>
                        )}
                      </div>

                      {invoice.paymentMethod && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <CreditCard className="h-3 w-3" />
                          {invoice.paymentMethod}
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold">₺{invoice.amount.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {invoice.status === "pending" && (
                        <Button size="sm">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Öde
                        </Button>
                      )}
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/musteri/panel/faturalar/${invoice.id}`}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Detay
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}

              {invoices.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Bu hizmete ait fatura bulunamadı.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Quick Actions */}
      <BlurFade delay={0.25} inView>
        <Card className="border-dashed">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium">Tüm faturalarınızı görmek ister misiniz?</p>
                  <p className="text-muted-foreground">
                    Faturalar sayfasından tüm hizmetlerinize ait faturaları görüntüleyebilirsiniz.
                  </p>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link href="/musteri/panel/faturalar">
                  Tüm Faturalar
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}
