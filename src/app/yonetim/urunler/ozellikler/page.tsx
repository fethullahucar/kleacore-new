"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MoreVertical,
  Eye,
  EyeOff,
  Tag,
  CheckCircle,
  Star,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";
import { categoryConfig } from "@/lib/products/constants";
import type { ProductFeature, ProductCategorySlug } from "@/types/products";

// Mock data for features
const mockFeatures: ProductFeature[] = [
  // Hosting Features
  { id: "f1", categoryId: "hosting", name: "Disk Alanı", slug: "disk-space", unit: "GB", icon: "HardDrive", isHighlighted: true, displayOrder: 1, isActive: true },
  { id: "f2", categoryId: "hosting", name: "Aylık Trafik", slug: "bandwidth", unit: "GB", icon: "RefreshCcw", isHighlighted: true, displayOrder: 2, isActive: true },
  { id: "f3", categoryId: "hosting", name: "E-posta Hesabı", slug: "email-accounts", unit: "Adet", icon: "Mail", isHighlighted: true, displayOrder: 3, isActive: true },
  { id: "f4", categoryId: "hosting", name: "Veritabanı", slug: "databases", unit: "Adet", icon: "Database", isHighlighted: false, displayOrder: 4, isActive: true },
  { id: "f5", categoryId: "hosting", name: "Domain", slug: "domains", unit: "Adet", icon: "Globe", isHighlighted: false, displayOrder: 5, isActive: true },
  { id: "f6", categoryId: "hosting", name: "Alt Domain", slug: "subdomains", unit: "Adet", icon: "Globe", isHighlighted: false, displayOrder: 6, isActive: true },
  { id: "f7", categoryId: "hosting", name: "FTP Hesabı", slug: "ftp-accounts", unit: "Adet", icon: "Server", isHighlighted: false, displayOrder: 7, isActive: true },
  { id: "f8", categoryId: "hosting", name: "SSL Sertifikası", slug: "ssl", unit: "Adet", icon: "Shield", isHighlighted: true, displayOrder: 8, isActive: true },
  // VDS Features
  { id: "f9", categoryId: "vds", name: "CPU Çekirdek", slug: "cpu-cores", unit: "Adet", icon: "Cpu", isHighlighted: true, displayOrder: 1, isActive: true },
  { id: "f10", categoryId: "vds", name: "RAM", slug: "ram", unit: "GB", icon: "MemoryStick", isHighlighted: true, displayOrder: 2, isActive: true },
  { id: "f11", categoryId: "vds", name: "SSD Disk", slug: "ssd-disk", unit: "GB", icon: "HardDrive", isHighlighted: true, displayOrder: 3, isActive: true },
  { id: "f12", categoryId: "vds", name: "IP Adresi", slug: "ip-addresses", unit: "Adet", icon: "Globe", isHighlighted: false, displayOrder: 4, isActive: true },
  // VPS Features
  { id: "f13", categoryId: "vps", name: "CPU Çekirdek", slug: "cpu-cores", unit: "Adet", icon: "Cpu", isHighlighted: true, displayOrder: 1, isActive: true },
  { id: "f14", categoryId: "vps", name: "RAM", slug: "ram", unit: "GB", icon: "MemoryStick", isHighlighted: true, displayOrder: 2, isActive: true },
  { id: "f15", categoryId: "vps", name: "NVMe Disk", slug: "nvme-disk", unit: "GB", icon: "HardDrive", isHighlighted: true, displayOrder: 3, isActive: true },
  // Domain Features
  { id: "f16", categoryId: "domain", name: "WHOIS Gizliliği", slug: "whois-privacy", unit: "-", icon: "Shield", isHighlighted: true, displayOrder: 1, isActive: true },
  { id: "f17", categoryId: "domain", name: "DNS Yönetimi", slug: "dns-management", unit: "-", icon: "Server", isHighlighted: false, displayOrder: 2, isActive: true },
  // SSL Features
  { id: "f18", categoryId: "ssl", name: "Doğrulama Tipi", slug: "validation-type", unit: "-", icon: "Shield", isHighlighted: true, displayOrder: 1, isActive: true },
  { id: "f19", categoryId: "ssl", name: "Garanti", slug: "warranty", unit: "$", icon: "DollarSign", isHighlighted: true, displayOrder: 2, isActive: false },
];

const categoryOptions = Object.entries(categoryConfig).map(([slug, config]) => ({
  value: slug,
  label: config.name,
}));

export default function FeaturesPage() {
  const [features, setFeatures] = useState(mockFeatures);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<ProductFeature | null>(null);

  const filteredFeatures = features
    .filter((feature) => {
      const matchesSearch =
        feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feature.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || feature.categoryId === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (a.categoryId !== b.categoryId) {
        return a.categoryId.localeCompare(b.categoryId);
      }
      return a.displayOrder - b.displayOrder;
    });

  const handleToggleActive = (featureId: string) => {
    setFeatures((prev) =>
      prev.map((f) =>
        f.id === featureId ? { ...f, isActive: !f.isActive } : f
      )
    );
  };

  const handleToggleHighlighted = (featureId: string) => {
    setFeatures((prev) =>
      prev.map((f) =>
        f.id === featureId ? { ...f, isHighlighted: !f.isHighlighted } : f
      )
    );
  };

  const handleEditFeature = (feature: ProductFeature) => {
    setEditingFeature(feature);
    setDialogOpen(true);
  };

  const handleNewFeature = () => {
    setEditingFeature({
      id: "",
      categoryId: categoryFilter !== "all" ? categoryFilter : "hosting",
      name: "",
      slug: "",
      unit: "",
      icon: "Tag",
      isHighlighted: false,
      displayOrder: 1,
      isActive: true,
    });
    setDialogOpen(true);
  };

  const handleSaveFeature = () => {
    if (editingFeature) {
      if (editingFeature.id) {
        setFeatures((prev) =>
          prev.map((f) =>
            f.id === editingFeature.id ? editingFeature : f
          )
        );
      } else {
        const newFeature = {
          ...editingFeature,
          id: `f-${Date.now()}`,
        };
        setFeatures((prev) => [...prev, newFeature]);
      }
    }
    setDialogOpen(false);
    setEditingFeature(null);
  };

  const handleDeleteFeature = (featureId: string) => {
    setFeatures((prev) => prev.filter((f) => f.id !== featureId));
  };

  const activeCount = features.filter((f) => f.isActive).length;
  const highlightedCount = features.filter((f) => f.isHighlighted).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BlurFade delay={0}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Özellikler</h1>
            <p className="text-zinc-600 dark:text-zinc-400">Ürün özelliklerini tanımlayın ve yönetin</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10">
              <Tag className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">{features.length} Özellik</span>
            </div>
            <Button onClick={handleNewFeature} className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Özellik Ekle
            </Button>
          </div>
        </div>
      </BlurFade>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <BlurFade delay={0.05}>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Tag className="h-5 w-5 text-zinc-500" />
                <span className="text-xs text-zinc-500">Tüm kategorilerde</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">{features.length}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Toplam Özellik</p>
            </CardContent>
          </Card>
        </BlurFade>
        <BlurFade delay={0.1}>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-xs text-green-500">%{((activeCount / features.length) * 100).toFixed(0)}</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">{activeCount}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Aktif Özellik</p>
            </CardContent>
          </Card>
        </BlurFade>
        <BlurFade delay={0.15}>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-xs text-yellow-500">Vurgulanmış</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">{highlightedCount}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Öne Çıkan</p>
            </CardContent>
          </Card>
        </BlurFade>
      </div>

      {/* Filters */}
      <BlurFade delay={0.2}>
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px] bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                    <SelectItem value="all">Tüm Kategoriler</SelectItem>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  type="search"
                  placeholder="Özellik adı veya slug ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Features Table */}
      <BlurFade delay={0.25}>
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400 w-20">Sıra</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Özellik</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Kategori</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Slug</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Birim</th>
                    <th className="text-center p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Öne Çıkan</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Durum</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Aktif</th>
                    <th className="text-right p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFeatures.map((feature, index) => {
                    const config = categoryConfig[feature.categoryId as ProductCategorySlug];
                    const IconComponent = config?.icon;

                    return (
                      <tr
                        key={feature.id}
                        className={cn(
                          "border-b border-zinc-200 dark:border-zinc-800 last:border-0 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors",
                          !feature.isActive && "opacity-60"
                        )}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                            >
                              <ArrowUp className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium text-zinc-500 w-4 text-center">
                              {feature.displayOrder}
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                            >
                              <ArrowDown className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-zinc-500" />
                            <span className="text-sm font-medium text-zinc-900 dark:text-white">
                              {feature.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "p-1.5 rounded",
                                config?.color || "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                              )}
                            >
                              {IconComponent && <IconComponent className="h-3.5 w-3.5" />}
                            </div>
                            <span className="text-sm text-zinc-600 dark:text-zinc-400">
                              {config?.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <code className="text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded font-mono">
                            {feature.slug}
                          </code>
                        </td>
                        <td className="p-4">
                          <Badge className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                            {feature.unit}
                          </Badge>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleToggleHighlighted(feature.id)}
                            className={cn(
                              "p-1.5 rounded transition-colors",
                              feature.isHighlighted
                                ? "text-yellow-500 hover:text-yellow-400 bg-yellow-500/10"
                                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                            )}
                          >
                            <Star
                              className={cn(
                                "h-4 w-4",
                                feature.isHighlighted && "fill-current"
                              )}
                            />
                          </button>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={cn(
                              feature.isActive
                                ? "bg-green-500/10 text-green-600 dark:text-green-500"
                                : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-500"
                            )}
                          >
                            {feature.isActive ? "Aktif" : "Pasif"}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Switch
                            checked={feature.isActive}
                            onCheckedChange={() => handleToggleActive(feature.id)}
                            className="data-[state=checked]:bg-primary"
                          />
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-blue-500 hover:text-blue-600 hover:bg-blue-500/10"
                              onClick={() => handleEditFeature(feature)}
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
                                  onClick={() => handleEditFeature(feature)}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Düzenle
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="cursor-pointer"
                                  onClick={() => handleToggleHighlighted(feature.id)}
                                >
                                  <Star className="mr-2 h-4 w-4" />
                                  {feature.isHighlighted ? "Öne Çıkarmayı Kaldır" : "Öne Çıkar"}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
                                <DropdownMenuItem
                                  className="cursor-pointer"
                                  onClick={() => handleToggleActive(feature.id)}
                                >
                                  {feature.isActive ? (
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
                                  onClick={() => handleDeleteFeature(feature.id)}
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

            {filteredFeatures.length === 0 && (
              <div className="p-8 text-center">
                <Tag className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
                  Özellik bulunamadı
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Arama kriterlerinize uygun özellik bulunmuyor.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </BlurFade>

      {/* Edit/Create Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-zinc-900 dark:text-white">
              {editingFeature?.id ? "Özellik Düzenle" : "Yeni Özellik"}
            </DialogTitle>
            <DialogDescription className="text-zinc-600 dark:text-zinc-400">
              Özellik bilgilerini {editingFeature?.id ? "güncelleyin" : "girin"}.
            </DialogDescription>
          </DialogHeader>
          {editingFeature && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="category" className="text-zinc-700 dark:text-zinc-300">
                  Kategori
                </Label>
                <Select
                  value={editingFeature.categoryId}
                  onValueChange={(value) =>
                    setEditingFeature({ ...editingFeature, categoryId: value })
                  }
                >
                  <SelectTrigger className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white">
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-zinc-700 dark:text-zinc-300">
                    Özellik Adı
                  </Label>
                  <Input
                    id="name"
                    value={editingFeature.name}
                    onChange={(e) =>
                      setEditingFeature({
                        ...editingFeature,
                        name: e.target.value,
                      })
                    }
                    placeholder="Örn: Disk Alanı"
                    className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="slug" className="text-zinc-700 dark:text-zinc-300">
                    Slug
                  </Label>
                  <Input
                    id="slug"
                    value={editingFeature.slug}
                    onChange={(e) =>
                      setEditingFeature({
                        ...editingFeature,
                        slug: e.target.value,
                      })
                    }
                    placeholder="Örn: disk-space"
                    className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="unit" className="text-zinc-700 dark:text-zinc-300">
                    Birim
                  </Label>
                  <Input
                    id="unit"
                    value={editingFeature.unit}
                    onChange={(e) =>
                      setEditingFeature({
                        ...editingFeature,
                        unit: e.target.value,
                      })
                    }
                    placeholder="Örn: GB, Adet"
                    className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="displayOrder" className="text-zinc-700 dark:text-zinc-300">
                    Sıralama
                  </Label>
                  <Input
                    id="displayOrder"
                    type="number"
                    value={editingFeature.displayOrder}
                    onChange={(e) =>
                      setEditingFeature({
                        ...editingFeature,
                        displayOrder: parseInt(e.target.value) || 0,
                      })
                    }
                    className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
                <div className="flex items-center gap-2">
                  <Star
                    className={cn(
                      "h-4 w-4",
                      editingFeature.isHighlighted
                        ? "text-yellow-500 fill-current"
                        : "text-zinc-500"
                    )}
                  />
                  <Label htmlFor="isHighlighted" className="text-zinc-700 dark:text-zinc-300">
                    Öne Çıkan Özellik
                  </Label>
                </div>
                <Switch
                  id="isHighlighted"
                  checked={editingFeature.isHighlighted}
                  onCheckedChange={(checked) =>
                    setEditingFeature({
                      ...editingFeature,
                      isHighlighted: checked,
                    })
                  }
                  className="data-[state=checked]:bg-yellow-500"
                />
              </div>
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-zinc-500" />
                  <Label htmlFor="isActive" className="text-zinc-700 dark:text-zinc-300">
                    Aktif
                  </Label>
                </div>
                <Switch
                  id="isActive"
                  checked={editingFeature.isActive}
                  onCheckedChange={(checked) =>
                    setEditingFeature({
                      ...editingFeature,
                      isActive: checked,
                    })
                  }
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              İptal
            </Button>
            <Button
              onClick={handleSaveFeature}
              className="bg-primary hover:bg-primary/90"
            >
              {editingFeature?.id ? "Kaydet" : "Oluştur"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
