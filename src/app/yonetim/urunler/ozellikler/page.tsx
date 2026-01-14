"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MoreVertical,
  GripVertical,
  Eye,
  EyeOff,
  Tag,
  CheckCircle,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  { id: "f19", categoryId: "ssl", name: "Garanti", slug: "warranty", unit: "$", icon: "DollarSign", isHighlighted: true, displayOrder: 2, isActive: true },
];

const categoryOptions = Object.entries(categoryConfig).map(([slug, config]) => ({
  value: slug,
  label: config.name,
}));

const stats = [
  { title: "Toplam Özellik", value: "19", icon: Tag, change: "Tüm kategorilerde" },
  { title: "Aktif Özellik", value: "19", icon: CheckCircle, change: "%100" },
  { title: "Öne Çıkan", value: "12", icon: Star, change: "Vurgulanmış" },
];

export default function FeaturesPage() {
  const [features, setFeatures] = useState(mockFeatures);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<ProductFeature | null>(null);

  // Group features by category
  const groupedFeatures = features.reduce((acc, feature) => {
    if (!acc[feature.categoryId]) {
      acc[feature.categoryId] = [];
    }
    acc[feature.categoryId].push(feature);
    return acc;
  }, {} as Record<string, ProductFeature[]>);

  const filteredCategories = categoryFilter === "all"
    ? Object.keys(groupedFeatures)
    : [categoryFilter];

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
        // Update existing
        setFeatures((prev) =>
          prev.map((f) =>
            f.id === editingFeature.id ? editingFeature : f
          )
        );
      } else {
        // Create new
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BlurFade delay={0}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Özellikler</h1>
            <p className="text-zinc-400">Ürün özelliklerini tanımlayın ve yönetin</p>
          </div>
          <Button onClick={handleNewFeature} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Özellik Ekle
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

      {/* Filters */}
      <BlurFade delay={0.3}>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700 text-white">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
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
                  className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Features by Category */}
      <BlurFade delay={0.4}>
        <Accordion type="multiple" defaultValue={filteredCategories} className="space-y-4">
          {filteredCategories.map((categoryId) => {
            const categoryFeatures = groupedFeatures[categoryId] || [];
            const config = categoryConfig[categoryId as ProductCategorySlug];
            const IconComponent = config?.icon;

            const filteredFeatures = categoryFeatures.filter((f) =>
              f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              f.slug.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (filteredFeatures.length === 0 && searchQuery) return null;

            return (
              <AccordionItem
                key={categoryId}
                value={categoryId}
                className="border-0"
              >
                <Card className="bg-zinc-900 border-zinc-800">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline [&[data-state=open]>div>svg]:rotate-0">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          config?.color || "bg-zinc-800 text-zinc-400"
                        )}
                      >
                        {IconComponent && <IconComponent className="h-5 w-5" />}
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-white">{config?.name}</h3>
                        <p className="text-xs text-zinc-500">
                          {filteredFeatures.length} özellik
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-4 pb-4">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-zinc-800">
                              <th className="text-left p-3 text-sm font-medium text-zinc-400 w-8"></th>
                              <th className="text-left p-3 text-sm font-medium text-zinc-400">Özellik Adı</th>
                              <th className="text-left p-3 text-sm font-medium text-zinc-400">Slug</th>
                              <th className="text-left p-3 text-sm font-medium text-zinc-400">Birim</th>
                              <th className="text-center p-3 text-sm font-medium text-zinc-400">Öne Çıkan</th>
                              <th className="text-center p-3 text-sm font-medium text-zinc-400">Durum</th>
                              <th className="text-right p-3 text-sm font-medium text-zinc-400">İşlemler</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredFeatures
                              .sort((a, b) => a.displayOrder - b.displayOrder)
                              .map((feature) => (
                                <tr
                                  key={feature.id}
                                  className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50 transition-colors"
                                >
                                  <td className="p-3">
                                    <GripVertical className="h-4 w-4 text-zinc-600 cursor-grab" />
                                  </td>
                                  <td className="p-3">
                                    <div className="flex items-center gap-2">
                                      <Tag className="h-4 w-4 text-zinc-500" />
                                      <span className="text-sm font-medium text-white">
                                        {feature.name}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="p-3">
                                    <code className="text-xs text-zinc-400 bg-zinc-800 px-2 py-1 rounded">
                                      {feature.slug}
                                    </code>
                                  </td>
                                  <td className="p-3">
                                    <span className="text-sm text-zinc-400">{feature.unit}</span>
                                  </td>
                                  <td className="p-3 text-center">
                                    <button
                                      onClick={() => handleToggleHighlighted(feature.id)}
                                      className={cn(
                                        "p-1 rounded transition-colors",
                                        feature.isHighlighted
                                          ? "text-yellow-500 hover:text-yellow-400"
                                          : "text-zinc-600 hover:text-zinc-400"
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
                                  <td className="p-3 text-center">
                                    <Switch
                                      checked={feature.isActive}
                                      onCheckedChange={() => handleToggleActive(feature.id)}
                                      className="data-[state=checked]:bg-primary"
                                    />
                                  </td>
                                  <td className="p-3 text-right">
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
                                          onClick={() => handleEditFeature(feature)}
                                        >
                                          <Edit className="mr-2 h-4 w-4" />
                                          Düzenle
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-zinc-800" />
                                        <DropdownMenuItem
                                          className="cursor-pointer text-red-400"
                                          onClick={() => handleDeleteFeature(feature.id)}
                                        >
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Sil
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            );
          })}
        </Accordion>
      </BlurFade>

      {/* Edit/Create Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingFeature?.id ? "Özellik Düzenle" : "Yeni Özellik"}
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Özellik bilgilerini {editingFeature?.id ? "güncelleyin" : "girin"}.
            </DialogDescription>
          </DialogHeader>
          {editingFeature && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="category" className="text-zinc-300">
                  Kategori
                </Label>
                <Select
                  value={editingFeature.categoryId}
                  onValueChange={(value) =>
                    setEditingFeature({ ...editingFeature, categoryId: value })
                  }
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
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
                  <Label htmlFor="name" className="text-zinc-300">
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
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="slug" className="text-zinc-300">
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
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="unit" className="text-zinc-300">
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
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="displayOrder" className="text-zinc-300">
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
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Star
                    className={cn(
                      "h-4 w-4",
                      editingFeature.isHighlighted
                        ? "text-yellow-500 fill-current"
                        : "text-zinc-500"
                    )}
                  />
                  <Label htmlFor="isHighlighted" className="text-zinc-300">
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
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-zinc-500" />
                  <Label htmlFor="isActive" className="text-zinc-300">
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
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
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
