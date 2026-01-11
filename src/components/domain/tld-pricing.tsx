"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const allTlds = [
  // Popüler
  { ext: ".com", category: "Popüler", price: 149, renewPrice: 199, transfer: 149 },
  { ext: ".net", category: "Popüler", price: 179, renewPrice: 229, transfer: 179 },
  { ext: ".org", category: "Popüler", price: 189, renewPrice: 239, transfer: 189 },
  { ext: ".info", category: "Popüler", price: 99, renewPrice: 149, transfer: 99 },
  { ext: ".biz", category: "Popüler", price: 129, renewPrice: 179, transfer: 129 },

  // Türkiye
  { ext: ".com.tr", category: "Türkiye", price: 99, renewPrice: 149, transfer: 99 },
  { ext: ".net.tr", category: "Türkiye", price: 99, renewPrice: 149, transfer: 99 },
  { ext: ".org.tr", category: "Türkiye", price: 99, renewPrice: 149, transfer: 99 },
  { ext: ".gen.tr", category: "Türkiye", price: 79, renewPrice: 99, transfer: 79 },
  { ext: ".web.tr", category: "Türkiye", price: 79, renewPrice: 99, transfer: 79 },
  { ext: ".tv.tr", category: "Türkiye", price: 79, renewPrice: 99, transfer: 79 },

  // Teknoloji
  { ext: ".io", category: "Teknoloji", price: 499, renewPrice: 599, transfer: 499 },
  { ext: ".dev", category: "Teknoloji", price: 199, renewPrice: 249, transfer: 199 },
  { ext: ".app", category: "Teknoloji", price: 199, renewPrice: 249, transfer: 199 },
  { ext: ".tech", category: "Teknoloji", price: 299, renewPrice: 399, transfer: 299 },
  { ext: ".ai", category: "Teknoloji", price: 899, renewPrice: 999, transfer: 899 },

  // İş
  { ext: ".co", category: "İş", price: 299, renewPrice: 399, transfer: 299 },
  { ext: ".company", category: "İş", price: 149, renewPrice: 199, transfer: 149 },
  { ext: ".business", category: "İş", price: 149, renewPrice: 199, transfer: 149 },
  { ext: ".agency", category: "İş", price: 249, renewPrice: 299, transfer: 249 },

  // Diğer
  { ext: ".online", category: "Diğer", price: 49, renewPrice: 299, transfer: 49 },
  { ext: ".site", category: "Diğer", price: 39, renewPrice: 299, transfer: 39 },
  { ext: ".store", category: "Diğer", price: 69, renewPrice: 499, transfer: 69 },
  { ext: ".blog", category: "Diğer", price: 299, renewPrice: 399, transfer: 299 },
];

const categories = ["Tümü", "Popüler", "Türkiye", "Teknoloji", "İş", "Diğer"];

export function TldPricing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  const filteredTlds = allTlds.filter((tld) => {
    const matchesSearch = tld.ext
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tümü" || tld.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Uzantı ara... (örn: .com)"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* TLD Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTlds.map((tld) => (
          <Card
            key={tld.ext}
            className="hover:border-primary/50 transition-colors"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-primary">{tld.ext}</CardTitle>
              <CardDescription>{tld.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Kayıt</span>
                  <span className="font-bold">₺{tld.price}/yıl</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Yenileme</span>
                  <span className="text-sm">₺{tld.renewPrice}/yıl</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Transfer</span>
                  <span className="text-sm">₺{tld.transfer}</span>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline" size="sm">
                Kaydet
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTlds.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Aramanızla eşleşen uzantı bulunamadı.
        </div>
      )}
    </div>
  );
}
