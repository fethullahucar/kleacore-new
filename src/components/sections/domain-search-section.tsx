"use client";

import { useState } from "react";
import { Search, Check, X, Loader2, ShoppingCart, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DomainResult {
  domain: string;
  available: boolean;
  price: number;
  renewPrice: number;
}

const tlds = [
  { ext: ".com", price: 149, renewPrice: 199 },
  { ext: ".net", price: 179, renewPrice: 229 },
  { ext: ".org", price: 189, renewPrice: 239 },
  { ext: ".com.tr", price: 99, renewPrice: 149 },
  { ext: ".io", price: 499, renewPrice: 599 },
  { ext: ".co", price: 299, renewPrice: 399 },
];

export function DomainSearchSection() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<DomainResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setHasSearched(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const domainName = query.toLowerCase().replace(/\s+/g, "").split(".")[0];
    const mockResults: DomainResult[] = tlds.map((tld) => ({
      domain: `${domainName}${tld.ext}`,
      available: Math.random() > 0.4,
      price: tld.price,
      renewPrice: tld.renewPrice,
    }));

    setResults(mockResults);
    setIsSearching(false);
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm font-medium mb-4">
            <Globe className="h-4 w-4 text-primary" />
            500+ Uzantı
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Hayalinizdeki Domain&apos;i Bulun
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Markanız için mükemmel domain adını arayın. Anında müsaitlik kontrolü.
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative p-1 rounded-2xl bg-gradient-to-r from-gray-400/50 via-gray-500/50 to-gray-600/50">
            <div className="flex flex-col sm:flex-row gap-3 bg-background rounded-xl p-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Domain adınızı yazın (örn: sirketim)"
                  className="h-14 pl-12 pr-4 text-lg border-0 bg-transparent focus-visible:ring-0"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button
                size="lg"
                className="h-14 px-8 text-lg"
                onClick={handleSearch}
                disabled={isSearching || !query.trim()}
              >
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Aranıyor...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Ara
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        {isSearching && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {!isSearching && hasSearched && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto mt-8 space-y-3"
          >
            {results.map((result, idx) => (
              <motion.div
                key={result.domain}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border transition-all",
                  result.available
                    ? "border-green-500/50 bg-green-500/5 hover:bg-green-500/10"
                    : "border-border opacity-60"
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full",
                      result.available
                        ? "bg-green-500/20 text-green-500"
                        : "bg-red-500/20 text-red-500"
                    )}
                  >
                    {result.available ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <X className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{result.domain}</p>
                    <p className="text-sm text-muted-foreground">
                      {result.available ? "Bu domain müsait!" : "Bu domain alınmış"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {result.available && (
                    <>
                      <div className="text-right hidden sm:block">
                        <p className="font-bold text-xl">₺{result.price}</p>
                        <p className="text-xs text-muted-foreground">
                          Yenileme: ₺{result.renewPrice}/yıl
                        </p>
                      </div>
                      <Button>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Sepete Ekle
                      </Button>
                    </>
                  )}
                  {!result.available && (
                    <Button variant="outline" size="sm">
                      Whois
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}
