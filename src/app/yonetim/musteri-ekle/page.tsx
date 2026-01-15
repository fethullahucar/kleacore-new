"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Save,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { BlurFade } from "@/components/magicui/blur-fade";

export default function AddCustomerPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Kişisel Bilgiler
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    // Şirket Bilgileri
    customerType: "individual", // individual | corporate
    companyName: "",
    taxNumber: "",
    taxOffice: "",
    // Adres Bilgileri
    address: "",
    city: "",
    district: "",
    postalCode: "",
    country: "Türkiye",
    // Hesap Ayarları
    status: "active",
    sendWelcomeEmail: true,
    notes: "",
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simüle edilmiş API çağrısı
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Başarılı kayıt sonrası yönlendirme
    router.push("/yonetim/musteriler");
  };

  const turkishCities = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin",
    "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa",
    "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan",
    "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta",
    "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
    "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla",
    "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop",
    "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van",
    "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak",
    "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
  ].sort();

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <BlurFade delay={0}>
        <Link
          href="/yonetim/musteriler"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Müşterilere Dön
        </Link>
      </BlurFade>

      {/* Page Header */}
      <BlurFade delay={0.1}>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Yeni Müşteri Ekle</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Sisteme yeni bir müşteri kaydı oluşturun</p>
        </div>
      </BlurFade>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Müşteri Tipi */}
            <BlurFade delay={0.2}>
              <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-900 dark:text-white flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Müşteri Tipi
                  </CardTitle>
                  <CardDescription className="text-zinc-500">
                    Müşteri bireysel mi yoksa kurumsal mı?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleInputChange("customerType", "individual")}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        formData.customerType === "individual"
                          ? "border-primary bg-primary/5"
                          : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
                      }`}
                    >
                      <User className={`h-6 w-6 mb-2 ${formData.customerType === "individual" ? "text-primary" : "text-zinc-500"}`} />
                      <p className={`font-medium ${formData.customerType === "individual" ? "text-primary" : "text-zinc-900 dark:text-white"}`}>
                        Bireysel
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">Kişisel müşteri hesabı</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange("customerType", "corporate")}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        formData.customerType === "corporate"
                          ? "border-primary bg-primary/5"
                          : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
                      }`}
                    >
                      <Building2 className={`h-6 w-6 mb-2 ${formData.customerType === "corporate" ? "text-primary" : "text-zinc-500"}`} />
                      <p className={`font-medium ${formData.customerType === "corporate" ? "text-primary" : "text-zinc-900 dark:text-white"}`}>
                        Kurumsal
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">Şirket hesabı</p>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>

            {/* Kişisel Bilgiler */}
            <BlurFade delay={0.3}>
              <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-900 dark:text-white flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Kişisel Bilgiler
                  </CardTitle>
                  <CardDescription className="text-zinc-500">
                    Müşterinin temel iletişim bilgileri
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-zinc-700 dark:text-zinc-300">
                        Ad <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Müşteri adı"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                        className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-zinc-700 dark:text-zinc-300">
                        Soyad <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Müşteri soyadı"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                        className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-zinc-700 dark:text-zinc-300">
                        <Mail className="inline h-4 w-4 mr-1" />
                        E-posta <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="ornek@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-zinc-700 dark:text-zinc-300">
                        <Phone className="inline h-4 w-4 mr-1" />
                        Telefon <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="0532 123 45 67"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                        className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>

            {/* Şirket Bilgileri - Kurumsal müşteri seçildiğinde göster */}
            {formData.customerType === "corporate" && (
              <BlurFade delay={0.35}>
                <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-zinc-900 dark:text-white flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Şirket Bilgileri
                    </CardTitle>
                    <CardDescription className="text-zinc-500">
                      Kurumsal müşteri için şirket detayları
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-zinc-700 dark:text-zinc-300">
                        Şirket Adı <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="companyName"
                        placeholder="Şirket adı"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        required={formData.customerType === "corporate"}
                        className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="taxNumber" className="text-zinc-700 dark:text-zinc-300">
                          Vergi Numarası <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="taxNumber"
                          placeholder="1234567890"
                          value={formData.taxNumber}
                          onChange={(e) => handleInputChange("taxNumber", e.target.value)}
                          required={formData.customerType === "corporate"}
                          className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="taxOffice" className="text-zinc-700 dark:text-zinc-300">
                          Vergi Dairesi
                        </Label>
                        <Input
                          id="taxOffice"
                          placeholder="Vergi dairesi adı"
                          value={formData.taxOffice}
                          onChange={(e) => handleInputChange("taxOffice", e.target.value)}
                          className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            )}

            {/* Adres Bilgileri */}
            <BlurFade delay={0.4}>
              <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-900 dark:text-white flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Adres Bilgileri
                  </CardTitle>
                  <CardDescription className="text-zinc-500">
                    Fatura ve teslimat adresi
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-zinc-700 dark:text-zinc-300">
                      Adres
                    </Label>
                    <Textarea
                      id="address"
                      placeholder="Sokak, mahalle, bina no, daire no..."
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500 min-h-20"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-zinc-700 dark:text-zinc-300">
                        İl
                      </Label>
                      <Select
                        value={formData.city}
                        onValueChange={(value) => handleInputChange("city", value)}
                      >
                        <SelectTrigger className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white">
                          <SelectValue placeholder="İl seçin" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                          {turkishCities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district" className="text-zinc-700 dark:text-zinc-300">
                        İlçe
                      </Label>
                      <Input
                        id="district"
                        placeholder="İlçe adı"
                        value={formData.district}
                        onChange={(e) => handleInputChange("district", e.target.value)}
                        className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="text-zinc-700 dark:text-zinc-300">
                        Posta Kodu
                      </Label>
                      <Input
                        id="postalCode"
                        placeholder="34000"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                        className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          </div>

          {/* Right Column - Settings & Actions */}
          <div className="space-y-6">
            {/* Hesap Durumu */}
            <BlurFade delay={0.45}>
              <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-900 dark:text-white text-base">Hesap Durumu</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-zinc-700 dark:text-zinc-300">Durum</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => handleInputChange("status", value)}
                    >
                      <SelectTrigger className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                        <SelectItem value="active">Aktif</SelectItem>
                        <SelectItem value="pending">Beklemede</SelectItem>
                        <SelectItem value="suspended">Askıda</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator className="bg-zinc-200 dark:bg-zinc-800" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">Hoş Geldin E-postası</p>
                      <p className="text-xs text-zinc-500">Kayıt sonrası otomatik gönder</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleInputChange("sendWelcomeEmail", !formData.sendWelcomeEmail)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.sendWelcomeEmail ? "bg-primary" : "bg-zinc-300 dark:bg-zinc-700"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.sendWelcomeEmail ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>

            {/* Notlar */}
            <BlurFade delay={0.5}>
              <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-900 dark:text-white text-base flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Notlar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Müşteri hakkında özel notlar..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500 min-h-24"
                  />
                </CardContent>
              </Card>
            </BlurFade>

            {/* Action Buttons */}
            <BlurFade delay={0.55}>
              <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <CardContent className="p-4 space-y-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Kaydediliyor...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Müşteriyi Kaydet
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/yonetim/musteriler")}
                    className="w-full border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  >
                    İptal
                  </Button>
                </CardContent>
              </Card>
            </BlurFade>
          </div>
        </div>
      </form>
    </div>
  );
}
