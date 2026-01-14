"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Mail,
  Ban,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  UserPlus,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const customers = [
  {
    id: "M-001",
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    phone: "0532 123 45 67",
    services: 3,
    balance: 0,
    status: "active",
    registeredAt: "2023-05-15",
  },
  {
    id: "M-002",
    name: "Ayşe Demir",
    email: "ayse@example.com",
    phone: "0533 234 56 78",
    services: 5,
    balance: 250,
    status: "active",
    registeredAt: "2023-08-22",
  },
  {
    id: "M-003",
    name: "Mehmet Kaya",
    email: "mehmet@example.com",
    phone: "0534 345 67 89",
    services: 2,
    balance: -1250,
    status: "suspended",
    registeredAt: "2022-11-10",
  },
  {
    id: "M-004",
    name: "Fatma Şahin",
    email: "fatma@example.com",
    phone: "0535 456 78 90",
    services: 1,
    balance: 0,
    status: "active",
    registeredAt: "2024-01-05",
  },
  {
    id: "M-005",
    name: "Can Özkan",
    email: "can@example.com",
    phone: "0536 567 89 01",
    services: 0,
    balance: 0,
    status: "pending",
    registeredAt: "2024-06-20",
  },
  {
    id: "M-006",
    name: "Zeynep Arslan",
    email: "zeynep@example.com",
    phone: "0537 678 90 12",
    services: 4,
    balance: 500,
    status: "active",
    registeredAt: "2023-03-18",
  },
  {
    id: "M-007",
    name: "Ali Yıldız",
    email: "ali@example.com",
    phone: "0538 789 01 23",
    services: 2,
    balance: -750,
    status: "suspended",
    registeredAt: "2023-09-08",
  },
  {
    id: "M-008",
    name: "Elif Çelik",
    email: "elif@example.com",
    phone: "0539 890 12 34",
    services: 6,
    balance: 0,
    status: "active",
    registeredAt: "2022-06-30",
  },
];

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  active: { label: "Aktif", variant: "default" },
  suspended: { label: "Askıda", variant: "destructive" },
  pending: { label: "Beklemede", variant: "secondary" },
};

const stats = [
  { title: "Toplam Müşteri", value: "2,847", icon: Users, change: "+48 bu ay" },
  { title: "Aktif Müşteri", value: "2,634", icon: CheckCircle, change: "%92.5" },
  { title: "Yeni Kayıtlar", value: "48", icon: UserPlus, change: "Bu ay" },
  { title: "Ortalama LTV", value: "₺3,240", icon: TrendingUp, change: "+12%" },
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Müşteriler</h1>
          <p className="text-zinc-400">Tüm müşterilerinizi yönetin</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <UserPlus className="mr-2 h-4 w-4" />
          Müşteri Ekle
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <stat.icon className="h-5 w-5 text-zinc-500" />
                <span className="text-xs text-zinc-500">{stat.change}</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-zinc-400">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
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
                </SelectContent>
              </Select>
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                type="search"
                placeholder="İsim, e-posta veya müşteri ID ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">ID</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Müşteri</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Telefon</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Hizmetler</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Bakiye</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Durum</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Kayıt Tarihi</th>
                  <th className="text-right p-4 text-sm font-medium text-zinc-400">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                  >
                    <td className="p-4">
                      <span className="text-sm font-mono text-zinc-400">{customer.id}</span>
                    </td>
                    <td className="p-4">
                      <div>
                        <Link
                          href={`/yonetim/musteriler/${customer.id}`}
                          className="text-sm font-medium text-white hover:text-primary"
                        >
                          {customer.name}
                        </Link>
                        <p className="text-xs text-zinc-500">{customer.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-zinc-400">{customer.phone}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-white">{customer.services}</span>
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        "text-sm font-medium",
                        customer.balance > 0 ? "text-green-500" :
                        customer.balance < 0 ? "text-red-500" : "text-zinc-400"
                      )}>
                        {customer.balance >= 0 ? "₺" : "-₺"}{Math.abs(customer.balance).toLocaleString("tr-TR")}
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge variant={statusConfig[customer.status].variant}>
                        {statusConfig[customer.status].label}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-zinc-400">
                        {new Date(customer.registeredAt).toLocaleDateString("tr-TR")}
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
                            <Link href={`/yonetim/musteriler/${customer.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              Detayları Gör
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Mail className="mr-2 h-4 w-4" />
                            E-posta Gönder
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-zinc-800" />
                          {customer.status === "active" ? (
                            <DropdownMenuItem className="cursor-pointer text-red-400">
                              <Ban className="mr-2 h-4 w-4" />
                              Askıya Al
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="cursor-pointer text-green-400">
                              <CheckCircle className="mr-2 h-4 w-4" />
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
    </div>
  );
}
