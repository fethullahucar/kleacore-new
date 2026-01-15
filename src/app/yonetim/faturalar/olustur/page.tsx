"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Plus,
  Trash2,
  User,
  Package,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { BlurFade } from "@/components/magicui/blur-fade";

export default function CreateInvoicePage() {
  const [items, setItems] = useState([
    { id: 1, description: "", quantity: 1, unitPrice: 0 },
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), description: "", quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: number, field: string, value: string | number) => {
    setItems(items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const tax = 0;
  const total = subtotal + tax;

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

      {/* Page Header */}
      <BlurFade delay={0}>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Yeni Fatura Oluştur</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Manuel fatura oluşturma formu</p>
        </div>
      </BlurFade>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Selection */}
          <BlurFade delay={0.1}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-900 dark:text-white text-base flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Müşteri Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-zinc-700 dark:text-zinc-300">Müşteri Seç</Label>
                    <Select>
                      <SelectTrigger className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white">
                        <SelectValue placeholder="Müşteri seçin..." />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                        <SelectItem value="M-001">Ahmet Yılmaz</SelectItem>
                        <SelectItem value="M-002">Ayşe Demir - Demir Holding A.Ş.</SelectItem>
                        <SelectItem value="M-003">Mehmet Kaya - KayaSoft Ltd.</SelectItem>
                        <SelectItem value="M-004">Fatma Şahin</SelectItem>
                        <SelectItem value="M-006">Zeynep Arslan - Arslan Group</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-700 dark:text-zinc-300">E-Posta</Label>
                    <Input
                      type="email"
                      placeholder="musteri@example.com"
                      className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Invoice Items */}
          <BlurFade delay={0.2}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-900 dark:text-white text-base flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Fatura Kalemleri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <div className="flex-1 space-y-2">
                      <Label className="text-zinc-700 dark:text-zinc-300">Açıklama</Label>
                      <Input
                        placeholder="Ürün/Hizmet açıklaması"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                        className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                      />
                    </div>
                    <div className="w-24 space-y-2">
                      <Label className="text-zinc-700 dark:text-zinc-300">Adet</Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 1)}
                        className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                      />
                    </div>
                    <div className="w-32 space-y-2">
                      <Label className="text-zinc-700 dark:text-zinc-300">Birim Fiyat</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
                        className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                      />
                    </div>
                    <div className="w-32 space-y-2">
                      <Label className="text-zinc-700 dark:text-zinc-300">Toplam</Label>
                      <div className="h-10 flex items-center text-sm font-medium text-zinc-900 dark:text-white">
                        {formatPrice(item.quantity * item.unitPrice)}
                      </div>
                    </div>
                    <div className="pt-8">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                        disabled={items.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addItem}
                  className="w-full border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Kalem Ekle
                </Button>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Invoice Settings */}
          <BlurFade delay={0.3}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-900 dark:text-white text-base flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Fatura Ayarları
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-zinc-700 dark:text-zinc-300">Son Ödeme Tarihi</Label>
                    <Input
                      type="date"
                      className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-700 dark:text-zinc-300">Para Birimi</Label>
                    <Select defaultValue="TRY">
                      <SelectTrigger className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                        <SelectItem value="TRY">TRY - Türk Lirası</SelectItem>
                        <SelectItem value="USD">USD - Amerikan Doları</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - İngiliz Sterlini</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-700 dark:text-zinc-300">Not (Opsiyonel)</Label>
                  <Input
                    placeholder="Fatura notu..."
                    className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                  />
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <BlurFade delay={0.4}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 sticky top-6">
              <CardHeader>
                <CardTitle className="text-zinc-900 dark:text-white text-base">Fatura Özeti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">Ara Toplam</span>
                    <span className="text-zinc-900 dark:text-white">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">KDV (%0)</span>
                    <span className="text-zinc-900 dark:text-white">{formatPrice(tax)}</span>
                  </div>
                  <Separator className="bg-zinc-200 dark:bg-zinc-800" />
                  <div className="flex justify-between">
                    <span className="font-medium text-zinc-900 dark:text-white">Toplam</span>
                    <span className="text-xl font-bold text-zinc-900 dark:text-white">{formatPrice(total)}</span>
                  </div>
                </div>

                <Separator className="bg-zinc-200 dark:bg-zinc-800" />

                <div className="space-y-2">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Fatura Oluştur
                  </Button>
                  <Button variant="outline" className="w-full bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700">
                    Taslak Olarak Kaydet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
