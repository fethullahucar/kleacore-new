"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  RefreshCcw,
  Pause,
  Play,
  Package,
  CheckCircle,
  Clock,
  AlertTriangle,
  Server,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";

const services = [
  {
    id: "H-001",
    type: "hosting",
    typeName: "Profesyonel Hosting",
    customer: "Ahmet Yılmaz",
    customerId: "M-001",
    domain: "yilmaztech.com",
    server: "SRV-01",
    status: "active",
    expiresAt: "2025-05-15",
    price: 299,
  },
  {
    id: "H-002",
    type: "ssl",
    typeName: "Wildcard SSL",
    customer: "Ayşe Demir",
    customerId: "M-002",
    domain: "demir-holding.com",
    server: "-",
    status: "active",
    expiresAt: "2025-08-22",
    price: 599,
  },
  {
    id: "H-003",
    type: "vds",
    typeName: "VDS Sunucu Pro",
    customer: "Mehmet Kaya",
    customerId: "M-003",
    domain: "kayasoft.net",
    server: "SRV-03",
    status: "suspended",
    expiresAt: "2024-11-10",
    price: 899,
  },
  {
    id: "H-004",
    type: "hosting",
    typeName: "Başlangıç Hosting",
    customer: "Fatma Şahin",
    customerId: "M-004",
    domain: "sahingiyim.com",
    server: "SRV-01",
    status: "active",
    expiresAt: "2025-01-05",
    price: 99,
  },
  {
    id: "H-005",
    type: "hosting",
    typeName: "Kurumsal Hosting",
    customer: "Zeynep Arslan",
    customerId: "M-006",
    domain: "arslangroup.com.tr",
    server: "SRV-02",
    status: "expiring",
    expiresAt: "2024-07-18",
    price: 599,
  },
  {
    id: "H-006",
    type: "email",
    typeName: "Kurumsal E-posta",
    customer: "Ali Yıldız",
    customerId: "M-007",
    domain: "yildizlar.org",
    server: "-",
    status: "pending",
    expiresAt: "2025-09-08",
    price: 149,
  },
  {
    id: "H-007",
    type: "vps",
    typeName: "VPS Sunucu",
    customer: "Elif Çelik",
    customerId: "M-008",
    domain: "celiktech.io",
    server: "SRV-04",
    status: "active",
    expiresAt: "2025-06-30",
    price: 449,
  },
];

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: any }> = {
  active: { label: "Aktif", variant: "default", icon: CheckCircle },
  suspended: { label: "Askıda", variant: "destructive", icon: Pause },
  pending: { label: "Beklemede", variant: "secondary", icon: Clock },
  expiring: { label: "Süresi Doluyor", variant: "outline", icon: AlertTriangle },
};

const typeConfig: Record<string, { label: string; color: string }> = {
  hosting: { label: "Hosting", color: "bg-blue-500/10 text-blue-500" },
  ssl: { label: "SSL", color: "bg-green-500/10 text-green-500" },
  vds: { label: "VDS", color: "bg-purple-500/10 text-purple-500" },
  vps: { label: "VPS", color: "bg-orange-500/10 text-orange-500" },
  email: { label: "E-posta", color: "bg-cyan-500/10 text-cyan-500" },
};

const stats = [
  { title: "Toplam Hizmet", value: "4,521", icon: Package, change: "+156 bu ay" },
  { title: "Aktif", value: "4,156", icon: CheckCircle, change: "%92" },
  { title: "Beklemede", value: "23", icon: Clock, change: "Aktivasyon bekliyor" },
  { title: "Süresi Dolan", value: "48", icon: AlertTriangle, change: "Bu ay" },
];

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || service.status === statusFilter;
    const matchesType = typeFilter === "all" || service.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BlurFade delay={0}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Hizmetler</h1>
            <p className="text-zinc-400">Tüm hizmetleri yönetin</p>
          </div>
        </div>
      </BlurFade>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <BlurFade key={stat.title} delay={0.1 + index * 0.05}>
            <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <stat.icon className="h-5 w-5 text-zinc-500" />
                  <span className="text-xs text-zinc-500">{stat.change}</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-zinc-400">{stat.title}</p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>

      {/* Filters */}
      <BlurFade delay={0.3}>
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[130px] bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Tip" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="all">Tüm Tipler</SelectItem>
                  <SelectItem value="hosting">Hosting</SelectItem>
                  <SelectItem value="ssl">SSL</SelectItem>
                  <SelectItem value="vds">VDS</SelectItem>
                  <SelectItem value="vps">VPS</SelectItem>
                  <SelectItem value="email">E-posta</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-zinc-800 border-zinc-700 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Durum" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="suspended">Askıda</SelectItem>
                  <SelectItem value="pending">Beklemede</SelectItem>
                  <SelectItem value="expiring">Süresi Doluyor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                type="search"
                placeholder="Domain, müşteri veya hizmet ID ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      </BlurFade>

      {/* Table */}
      <BlurFade delay={0.4}>
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">ID</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Hizmet</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Müşteri</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Domain</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Sunucu</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Durum</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Bitiş</th>
                  <th className="text-right p-4 text-sm font-medium text-zinc-400">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                  >
                    <td className="p-4">
                      <span className="text-sm font-mono text-zinc-400">{service.id}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-xs font-medium",
                          typeConfig[service.type].color
                        )}>
                          {typeConfig[service.type].label}
                        </span>
                        <Link
                          href={`/yonetim/hizmetler/${service.id}`}
                          className="text-sm font-medium text-white hover:text-primary"
                        >
                          {service.typeName}
                        </Link>
                      </div>
                    </td>
                    <td className="p-4">
                      <Link
                        href={`/yonetim/musteriler/${service.customerId}`}
                        className="text-sm text-zinc-400 hover:text-white"
                      >
                        {service.customer}
                      </Link>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-zinc-300">{service.domain}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-zinc-400">{service.server}</span>
                    </td>
                    <td className="p-4">
                      <Badge variant={statusConfig[service.status].variant}>
                        {statusConfig[service.status].label}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        "text-sm",
                        service.status === "expiring" ? "text-yellow-500" : "text-zinc-400"
                      )}>
                        {new Date(service.expiresAt).toLocaleDateString("tr-TR")}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                          <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href={`/yonetim/hizmetler/${service.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              Detayları Gör
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            Yenile
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-zinc-800" />
                          {service.status === "active" ? (
                            <DropdownMenuItem className="cursor-pointer text-yellow-400">
                              <Pause className="mr-2 h-4 w-4" />
                              Askıya Al
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="cursor-pointer text-green-400">
                              <Play className="mr-2 h-4 w-4" />
                              Aktif Et
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      </BlurFade>
    </div>
  );
}
