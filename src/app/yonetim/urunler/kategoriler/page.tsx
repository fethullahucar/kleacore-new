"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit,
  MoreVertical,
  Eye,
  EyeOff,
  Package,
  Layers,
  Trash2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";
import { categoryConfig } from "@/lib/products/constants";
import type { ProductCategory, ProductCategorySlug } from "@/types/products";

// Mock data
const mockCategories: ProductCategory[] = [
  {
    id: "cat-1",
    slug: "hosting",
    name: "Web Hosting",
    description: "Paylaşımlı ve özel web hosting paketleri",
    icon: "Server",
    displayOrder: 1,
    productCount: 8,
    isActive: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-06-20T14:30:00Z",
  },
  {
    id: "cat-2",
    slug: "vds",
    name: "VDS Sunucu",
    description: "Virtual Dedicated Server çözümleri",
    icon: "HardDrive",
    displayOrder: 2,
    productCount: 5,
    isActive: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-06-20T14:30:00Z",
  },
  {
    id: "cat-3",
    slug: "vps",
    name: "VPS Sunucu",
    description: "Virtual Private Server paketleri",
    icon: "Cloud",
    displayOrder: 3,
    productCount: 6,
    isActive: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-06-20T14:30:00Z",
  },
  {
    id: "cat-4",
    slug: "server",
    name: "Fiziksel Sunucu",
    description: "Dedicated sunucu çözümleri",
    icon: "Server",
    displayOrder: 4,
    productCount: 4,
    isActive: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-06-20T14:30:00Z",
  },
  {
    id: "cat-5",
    slug: "domain",
    name: "Domain",
    description: "Alan adı kayıt ve transfer",
    icon: "Globe",
    displayOrder: 5,
    productCount: 12,
    isActive: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-06-20T14:30:00Z",
  },
  {
    id: "cat-6",
    slug: "ssl",
    name: "SSL Sertifikası",
    description: "SSL/TLS güvenlik sertifikaları",
    icon: "Shield",
    displayOrder: 6,
    productCount: 3,
    isActive: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-06-20T14:30:00Z",
  },
  {
    id: "cat-7",
    slug: "email",
    name: "Kurumsal E-posta",
    description: "Profesyonel e-posta hizmetleri",
    icon: "Mail",
    displayOrder: 7,
    productCount: 2,
    isActive: false,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-06-20T14:30:00Z",
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);

  const filteredCategories = categories
    .filter((category) => {
      return (
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const handleToggleActive = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, isActive: !cat.isActive } : cat
      )
    );
  };

  const handleEditCategory = (category: ProductCategory) => {
    setEditingCategory(category);
    setEditDialogOpen(true);
  };

  const handleSaveCategory = () => {
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id ? editingCategory : cat
        )
      );
    }
    setEditDialogOpen(false);
    setEditingCategory(null);
  };

  const handleMoveUp = (categoryId: string) => {
    setCategories((prev) => {
      const sorted = [...prev].sort((a, b) => a.displayOrder - b.displayOrder);
      const index = sorted.findIndex((cat) => cat.id === categoryId);
      if (index > 0) {
        const currentOrder = sorted[index].displayOrder;
        const prevOrder = sorted[index - 1].displayOrder;
        return prev.map((cat) => {
          if (cat.id === categoryId) return { ...cat, displayOrder: prevOrder };
          if (cat.id === sorted[index - 1].id) return { ...cat, displayOrder: currentOrder };
          return cat;
        });
      }
      return prev;
    });
  };

  const handleMoveDown = (categoryId: string) => {
    setCategories((prev) => {
      const sorted = [...prev].sort((a, b) => a.displayOrder - b.displayOrder);
      const index = sorted.findIndex((cat) => cat.id === categoryId);
      if (index < sorted.length - 1) {
        const currentOrder = sorted[index].displayOrder;
        const nextOrder = sorted[index + 1].displayOrder;
        return prev.map((cat) => {
          if (cat.id === categoryId) return { ...cat, displayOrder: nextOrder };
          if (cat.id === sorted[index + 1].id) return { ...cat, displayOrder: currentOrder };
          return cat;
        });
      }
      return prev;
    });
  };

  const activeCount = categories.filter((cat) => cat.isActive).length;
  const totalProducts = categories.reduce((sum, cat) => sum + cat.productCount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BlurFade delay={0}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Kategoriler</h1>
            <p className="text-zinc-600 dark:text-zinc-400">Ürün kategorilerini yönetin</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10">
              <Layers className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">{categories.length} Kategori</span>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Kategori Ekle
            </Button>
          </div>
        </div>
      </BlurFade>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <BlurFade delay={0.05}>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Layers className="h-5 w-5 text-zinc-500" />
                <span className="text-xs text-zinc-500">Tümü</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">{categories.length}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Toplam Kategori</p>
            </CardContent>
          </Card>
        </BlurFade>
        <BlurFade delay={0.1}>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Eye className="h-5 w-5 text-green-500" />
                <span className="text-xs text-green-500">%{((activeCount / categories.length) * 100).toFixed(0)}</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">{activeCount}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Aktif Kategori</p>
            </CardContent>
          </Card>
        </BlurFade>
        <BlurFade delay={0.15}>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Package className="h-5 w-5 text-blue-500" />
                <span className="text-xs text-zinc-500">Tüm kategorilerde</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">{totalProducts}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Toplam Ürün</p>
            </CardContent>
          </Card>
        </BlurFade>
      </div>

      {/* Search */}
      <BlurFade delay={0.2}>
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                type="search"
                placeholder="Kategori adı, slug veya açıklama ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
              />
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Table */}
      <BlurFade delay={0.25}>
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400 w-20">Sıra</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Kategori</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Açıklama</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Ürün</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Durum</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Aktif</th>
                    <th className="text-right p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category, index) => {
                    const config = categoryConfig[category.slug as ProductCategorySlug];
                    const IconComponent = config?.icon;

                    return (
                      <tr
                        key={category.id}
                        className={cn(
                          "border-b border-zinc-200 dark:border-zinc-800 last:border-0 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors",
                          !category.isActive && "opacity-60"
                        )}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                              onClick={() => handleMoveUp(category.id)}
                              disabled={index === 0}
                            >
                              <ArrowUp className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium text-zinc-500 w-4 text-center">
                              {category.displayOrder}
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                              onClick={() => handleMoveDown(category.id)}
                              disabled={index === filteredCategories.length - 1}
                            >
                              <ArrowDown className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "p-2 rounded-lg",
                                config?.color || "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                              )}
                            >
                              {IconComponent && <IconComponent className="h-4 w-4" />}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-zinc-900 dark:text-white">
                                {category.name}
                              </p>
                              <p className="text-xs text-zinc-500 font-mono">
                                {category.slug}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xs truncate">
                            {category.description}
                          </p>
                        </td>
                        <td className="p-4">
                          <Link
                            href={`/yonetim/urunler/paketler?kategori=${category.slug}`}
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                          >
                            <Package className="h-3 w-3" />
                            {category.productCount}
                          </Link>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={cn(
                              category.isActive
                                ? "bg-green-500/10 text-green-600 dark:text-green-500 hover:bg-green-500/20"
                                : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-500"
                            )}
                          >
                            {category.isActive ? "Aktif" : "Pasif"}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Switch
                            checked={category.isActive}
                            onCheckedChange={() => handleToggleActive(category.id)}
                            className="data-[state=checked]:bg-primary"
                          />
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-blue-500 hover:text-blue-600 hover:bg-blue-500/10"
                              onClick={() => handleEditCategory(category)}
                              title="Düzenle"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                              >
                                <DropdownMenuItem
                                  className="cursor-pointer"
                                  onClick={() => handleEditCategory(category)}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Düzenle
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="cursor-pointer">
                                  <Link href={`/yonetim/urunler/paketler?kategori=${category.slug}`}>
                                    <Package className="mr-2 h-4 w-4" />
                                    Ürünleri Gör
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
                                <DropdownMenuItem
                                  className="cursor-pointer"
                                  onClick={() => handleToggleActive(category.id)}
                                >
                                  {category.isActive ? (
                                    <>
                                      <EyeOff className="mr-2 h-4 w-4" />
                                      Pasif Yap
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="mr-2 h-4 w-4" />
                                      Aktif Yap
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
                                <DropdownMenuItem
                                  className="cursor-pointer text-red-500 focus:text-red-500"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Sil
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredCategories.length === 0 && (
              <div className="p-8 text-center">
                <Layers className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
                <p className="text-zinc-600 dark:text-zinc-400">Kategori bulunamadı</p>
              </div>
            )}
          </CardContent>
        </Card>
      </BlurFade>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-zinc-900 dark:text-white">Kategori Düzenle</DialogTitle>
            <DialogDescription className="text-zinc-600 dark:text-zinc-400">
              Kategori bilgilerini güncelleyin.
            </DialogDescription>
          </DialogHeader>
          {editingCategory && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-zinc-700 dark:text-zinc-300">
                  Kategori Adı
                </Label>
                <Input
                  id="name"
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      name: e.target.value,
                    })
                  }
                  className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug" className="text-zinc-700 dark:text-zinc-300">
                  Slug
                </Label>
                <Input
                  id="slug"
                  value={editingCategory.slug}
                  disabled
                  className="bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-500"
                />
                <p className="text-xs text-zinc-500">
                  Slug değiştirilemez.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="text-zinc-700 dark:text-zinc-300">
                  Açıklama
                </Label>
                <Textarea
                  id="description"
                  value={editingCategory.description}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      description: e.target.value,
                    })
                  }
                  className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white resize-none"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="displayOrder" className="text-zinc-700 dark:text-zinc-300">
                  Sıralama
                </Label>
                <Input
                  id="displayOrder"
                  type="number"
                  value={editingCategory.displayOrder}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      displayOrder: parseInt(e.target.value) || 0,
                    })
                  }
                  className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              className="border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              İptal
            </Button>
            <Button
              onClick={handleSaveCategory}
              className="bg-primary hover:bg-primary/90"
            >
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
