"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  GripVertical,
  Edit,
  MoreVertical,
  Eye,
  EyeOff,
  Package,
  Layers,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
import { Input } from "@/components/ui/input";
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

const stats = [
  { title: "Toplam Kategori", value: "7", icon: Layers, change: "Tümü" },
  { title: "Aktif Kategori", value: "6", icon: Eye, change: "%85.7" },
  { title: "Toplam Ürün", value: "40", icon: Package, change: "Tüm kategorilerde" },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);

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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BlurFade delay={0}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Kategoriler</h1>
            <p className="text-zinc-400">Ürün kategorilerini yönetin</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Kategori Ekle
          </Button>
        </div>
      </BlurFade>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
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

      {/* Categories Grid */}
      <BlurFade delay={0.3}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((category) => {
              const config = categoryConfig[category.slug as ProductCategorySlug];
              const IconComponent = config?.icon;

              return (
                <Card
                  key={category.id}
                  className={cn(
                    "bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all group",
                    !category.isActive && "opacity-60"
                  )}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="cursor-grab text-zinc-600 hover:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <GripVertical className="h-5 w-5" />
                        </div>
                        <div
                          className={cn(
                            "p-2 rounded-lg",
                            config?.color || "bg-zinc-800 text-zinc-400"
                          )}
                        >
                          {IconComponent && <IconComponent className="h-5 w-5" />}
                        </div>
                        <div>
                          <CardTitle className="text-base text-white">
                            {category.name}
                          </CardTitle>
                          <p className="text-xs text-zinc-500 font-mono">
                            {category.slug}
                          </p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-white"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-zinc-900 border-zinc-800"
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
                          <DropdownMenuSeparator className="bg-zinc-800" />
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
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-400 mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                          {category.productCount} Ürün
                        </Badge>
                        <Badge
                          variant={category.isActive ? "default" : "secondary"}
                          className={cn(
                            category.isActive
                              ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                              : "bg-zinc-800 text-zinc-500"
                          )}
                        >
                          {category.isActive ? "Aktif" : "Pasif"}
                        </Badge>
                      </div>
                      <Switch
                        checked={category.isActive}
                        onCheckedChange={() => handleToggleActive(category.id)}
                        className="data-[state=checked]:bg-primary"
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </BlurFade>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-white">Kategori Düzenle</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Kategori bilgilerini güncelleyin.
            </DialogDescription>
          </DialogHeader>
          {editingCategory && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-zinc-300">
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
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug" className="text-zinc-300">
                  Slug
                </Label>
                <Input
                  id="slug"
                  value={editingCategory.slug}
                  disabled
                  className="bg-zinc-800 border-zinc-700 text-zinc-500"
                />
                <p className="text-xs text-zinc-500">
                  Slug değiştirilemez.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="text-zinc-300">
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
                  className="bg-zinc-800 border-zinc-700 text-white resize-none"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="displayOrder" className="text-zinc-300">
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
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
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
