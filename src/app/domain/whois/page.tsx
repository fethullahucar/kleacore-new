"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Loader2,
  User,
  Building,
  Calendar,
  Server,
  Globe,
  Mail,
  RefreshCw,
} from "lucide-react";

interface WhoisData {
  domain: string;
  registrar: string;
  registrant: string;
  createdDate: string;
  expiryDate: string;
  updatedDate: string;
  status: string[];
  nameServers: string[];
  dnssec: string;
}

export default function WhoisPage() {
  const [domain, setDomain] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<WhoisData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!domain.trim()) return;

    setIsSearching(true);
    setResult(null);
    setError(null);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock data
    const domainName = domain.toLowerCase().replace(/\s+/g, "");

    if (Math.random() > 0.2) {
      setResult({
        domain: domainName.includes(".") ? domainName : `${domainName}.com`,
        registrar: "KLEACORE Domain Services",
        registrant: "REDACTED FOR PRIVACY",
        createdDate: "2020-03-15",
        expiryDate: "2025-03-15",
        updatedDate: "2024-01-10",
        status: ["clientTransferProhibited", "clientDeleteProhibited"],
        nameServers: ["ns1.kleacore.com", "ns2.kleacore.com"],
        dnssec: "unsigned",
      });
    } else {
      setError("Bu domain için WHOIS bilgisi bulunamadı veya domain kayıtlı değil.");
    }

    setIsSearching(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Topbar />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-10">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  WHOIS Sorgulama
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Domain sahiplik bilgilerini, kayıt tarihini ve nameserver
                  bilgilerini öğrenin.
                </p>
              </div>
            </BlurFade>

            {/* Search */}
            <BlurFade delay={0.2} inView>
              <div className="max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Globe className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Domain adı girin (örn: example.com)"
                      className="h-14 pl-12 text-lg"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                  </div>
                  <Button
                    size="lg"
                    className="h-14 px-8"
                    onClick={handleSearch}
                    disabled={isSearching || !domain.trim()}
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sorgulanıyor...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-5 w-5" />
                        Sorgula
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Results */}
        {(result || error) && (
          <section className="py-12">
            <div className="container max-w-4xl">
              <BlurFade delay={0.1} inView>
                {error ? (
                  <Card className="border-red-500/50 bg-red-500/5">
                    <CardContent className="p-6 text-center">
                      <p className="text-red-600">{error}</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          setError(null);
                          setDomain("");
                        }}
                      >
                        Yeni Sorgu
                      </Button>
                    </CardContent>
                  </Card>
                ) : result ? (
                  <div className="space-y-6">
                    {/* Domain Header */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <Globe className="h-6 w-6 text-primary" />
                          {result.domain}
                        </CardTitle>
                      </CardHeader>
                    </Card>

                    {/* Info Grid */}
                    <div className="grid gap-4 md:grid-cols-2">
                      {/* Registrar Info */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Building className="h-5 w-5 text-primary" />
                            Kayıt Bilgileri
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Kayıt Firması
                            </p>
                            <p className="font-medium">{result.registrar}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Domain Sahibi
                            </p>
                            <p className="font-medium">{result.registrant}</p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Dates */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            Tarihler
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Kayıt Tarihi
                            </p>
                            <p className="font-medium">
                              {formatDate(result.createdDate)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Bitiş Tarihi
                            </p>
                            <p className="font-medium">
                              {formatDate(result.expiryDate)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Son Güncelleme
                            </p>
                            <p className="font-medium">
                              {formatDate(result.updatedDate)}
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Name Servers */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Server className="h-5 w-5 text-primary" />
                            Name Servers
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {result.nameServers.map((ns) => (
                              <li
                                key={ns}
                                className="font-mono text-sm bg-muted px-3 py-2 rounded"
                              >
                                {ns}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Status */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <RefreshCw className="h-5 w-5 text-primary" />
                            Durum
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {result.status.map((status) => (
                              <div
                                key={status}
                                className="text-sm bg-green-500/10 text-green-600 px-3 py-2 rounded"
                              >
                                {status}
                              </div>
                            ))}
                            <div className="text-sm bg-muted px-3 py-2 rounded">
                              DNSSEC: {result.dnssec}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4 justify-center">
                      <Button variant="outline" onClick={() => setResult(null)}>
                        Yeni Sorgu
                      </Button>
                      <Button>Bu Domaini Transfer Et</Button>
                    </div>
                  </div>
                ) : null}
              </BlurFade>
            </div>
          </section>
        )}

        {/* Info Section */}
        {!result && !error && (
          <section className="py-16 md:py-24">
            <div className="container max-w-4xl">
              <BlurFade delay={0.1} inView>
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold tracking-tight">
                    WHOIS Nedir?
                  </h2>
                </div>
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground text-center mb-8">
                    WHOIS, domain adlarının kayıt bilgilerini sorgulamamızı
                    sağlayan bir protokoldür. Bu sorgu ile bir domainin kime ait
                    olduğunu, ne zaman kayıt edildiğini ve ne zaman sona
                    ereceğini öğrenebilirsiniz.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3 mt-8">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <User className="h-10 w-10 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Sahiplik Bilgisi</h3>
                      <p className="text-sm text-muted-foreground">
                        Domain sahibinin iletişim bilgileri (gizlilik koruması
                        yoksa)
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Calendar className="h-10 w-10 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Kayıt Tarihleri</h3>
                      <p className="text-sm text-muted-foreground">
                        Domainin ne zaman alındığı ve ne zaman biteceği
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Server className="h-10 w-10 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">DNS Bilgileri</h3>
                      <p className="text-sm text-muted-foreground">
                        Nameserver ve teknik yapılandırma bilgileri
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </BlurFade>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
