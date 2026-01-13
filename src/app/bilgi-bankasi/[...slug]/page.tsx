"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Clock,
  User,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Printer,
  ArrowLeft,
  FileText,
  BookOpen,
  Server,
  Globe,
  Shield,
  Mail,
  Database,
  Settings,
} from "lucide-react";

// Category data
const categoryData: Record<string, {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}> = {
  hosting: {
    title: "Hosting",
    description: "cPanel, FTP, veritabanı ve hosting yönetimi rehberleri",
    icon: Server,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  domain: {
    title: "Domain",
    description: "Alan adı kaydı, transfer ve DNS ayarları rehberleri",
    icon: Globe,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  ssl: {
    title: "SSL Sertifikası",
    description: "SSL kurulumu, yenileme ve sorun giderme rehberleri",
    icon: Shield,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  email: {
    title: "E-posta",
    description: "E-posta hesapları, yapılandırma ve sorun giderme",
    icon: Mail,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  sunucu: {
    title: "Sunucu",
    description: "VPS, VDS ve sunucu yönetimi rehberleri",
    icon: Database,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  teknik: {
    title: "Teknik Rehberler",
    description: "Kurulum, yapılandırma ve optimizasyon rehberleri",
    icon: Settings,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
};

// Articles data
const articlesData: Record<string, {
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
  relatedArticles: { title: string; href: string }[];
}> = {
  "hosting/cpanel-giris": {
    title: "cPanel'e Nasıl Giriş Yapılır?",
    category: "hosting",
    author: "Teknik Ekip",
    date: "10 Ocak 2024",
    readTime: "3 dk",
    content: `
## cPanel Nedir?

cPanel, web hosting hesabınızı yönetmek için kullanılan güçlü ve kullanıcı dostu bir kontrol panelidir. E-posta hesapları oluşturma, dosya yönetimi, veritabanı işlemleri ve daha fazlasını tek bir arayüzden yapabilirsiniz.

## cPanel'e Giriş Yapma

### Yöntem 1: Doğrudan URL ile Giriş

1. Tarayıcınızın adres çubuğuna aşağıdaki formatlardan birini yazın:
   - \`https://domainadiniz.com:2083\`
   - \`https://domainadiniz.com/cpanel\`

2. Karşınıza gelen giriş ekranında:
   - **Kullanıcı Adı**: Hosting kullanıcı adınız
   - **Şifre**: Hosting şifreniz

3. "Giriş Yap" butonuna tıklayın.

### Yöntem 2: Müşteri Paneli Üzerinden

1. [Müşteri Panelinize](/musteri/panel) giriş yapın
2. "Hizmetlerim" bölümüne gidin
3. İlgili hosting paketinizi seçin
4. "cPanel'e Giriş" butonuna tıklayın

## Giriş Bilgilerini Unuttum

Giriş bilgilerinizi unuttuysanız:

1. Müşteri panelinize giriş yapın
2. İlgili hosting hizmetini seçin
3. "Şifre Sıfırla" seçeneğini kullanın

Yeni şifreniz e-posta adresinize gönderilecektir.

## Güvenlik İpuçları

- Şifrenizi düzenli olarak değiştirin
- Güçlü şifreler kullanın (en az 12 karakter, büyük/küçük harf, rakam ve özel karakter)
- Paylaşılan bilgisayarlarda "Beni Hatırla" seçeneğini işaretlemeyin
- İşiniz bittiğinde mutlaka çıkış yapın
    `,
    relatedArticles: [
      { title: "FTP Bağlantısı Nasıl Yapılır?", href: "/bilgi-bankasi/hosting/ftp-baglanti" },
      { title: "WordPress Kurulumu", href: "/bilgi-bankasi/hosting/wordpress-kurulum" },
      { title: "E-posta Hesabı Oluşturma", href: "/bilgi-bankasi/email/hesap-olusturma" },
    ],
  },
  "hosting/wordpress-kurulum": {
    title: "WordPress Kurulumu (1-Tık)",
    category: "hosting",
    author: "Teknik Ekip",
    date: "8 Ocak 2024",
    readTime: "5 dk",
    content: `
## WordPress Nedir?

WordPress, dünyanın en popüler içerik yönetim sistemidir (CMS). Blog, kurumsal site, e-ticaret ve daha fazlası için kullanılabilir.

## Softaculous ile 1-Tık Kurulum

### Adım 1: cPanel'e Giriş

cPanel hesabınıza giriş yapın.

### Adım 2: Softaculous'u Bulun

1. cPanel ana sayfasında "Softaculous Apps Installer" simgesini bulun
2. Veya arama kutusuna "Softaculous" yazın

### Adım 3: WordPress'i Seçin

1. Softaculous açıldığında sol menüden "Blogs" kategorisini seçin
2. WordPress'e tıklayın
3. "Install Now" butonuna tıklayın

### Adım 4: Kurulum Ayarları

**Yazılım Kurulumu:**
- **Protokol**: https:// seçin (SSL aktifse)
- **Domain**: Kurulum yapılacak domain
- **Dizin**: Boş bırakın (ana dizine kurulum için)

**Site Ayarları:**
- **Site Adı**: Sitenizin adı
- **Site Açıklaması**: Kısa bir açıklama

**Yönetici Hesabı:**
- **Kullanıcı Adı**: admin yerine farklı bir isim seçin
- **Şifre**: Güçlü bir şifre belirleyin
- **E-posta**: Yönetici e-posta adresi

### Adım 5: Kurulumu Tamamla

"Install" butonuna tıklayın ve kurulumun tamamlanmasını bekleyin.

## Kurulum Sonrası

- **Site Adresi**: \`https://domainadiniz.com\`
- **Yönetim Paneli**: \`https://domainadiniz.com/wp-admin\`

## Sorun Giderme

### "Veritabanı bağlantı hatası" alıyorum

1. wp-config.php dosyasındaki veritabanı bilgilerini kontrol edin
2. Veritabanı kullanıcısının yetkileri kontrol edin

### Sayfa yüklenmiyor

1. .htaccess dosyasını yeniden oluşturun
2. PHP sürümünü kontrol edin (7.4+ önerilir)
    `,
    relatedArticles: [
      { title: "cPanel'e Nasıl Giriş Yapılır?", href: "/bilgi-bankasi/hosting/cpanel-giris" },
      { title: "SSL Sertifikası Kurulumu", href: "/bilgi-bankasi/ssl/kurulum" },
      { title: "PHP Sürümü Değiştirme", href: "/bilgi-bankasi/hosting/php-surum" },
    ],
  },
  "domain/dns-kayitlari": {
    title: "DNS Kayıtları Nasıl Düzenlenir?",
    category: "domain",
    author: "Teknik Ekip",
    date: "12 Ocak 2024",
    readTime: "7 dk",
    content: `
## DNS Nedir?

DNS (Domain Name System), domain adlarını IP adreslerine çeviren sistemdir. Web sitenize erişim, e-posta yönlendirme ve diğer servisler için DNS kayıtları kullanılır.

## DNS Kayıt Türleri

### A Kaydı
Domain adını IPv4 adresine yönlendirir.
\`\`\`
Örnek: example.com -> 203.0.113.42
\`\`\`

### AAAA Kaydı
Domain adını IPv6 adresine yönlendirir.

### CNAME Kaydı
Bir domain adını başka bir domain adına yönlendirir.
\`\`\`
Örnek: www.example.com -> example.com
\`\`\`

### MX Kaydı
E-posta sunucusunu belirtir.
\`\`\`
Örnek: example.com -> mail.example.com (öncelik: 10)
\`\`\`

### TXT Kaydı
Metin bilgisi saklar (SPF, DKIM, doğrulama kodları vb.)

### NS Kaydı
Domain için yetkili nameserver'ları belirtir.

## cPanel'de DNS Düzenleme

1. cPanel'e giriş yapın
2. "Zone Editor" veya "DNS Zone Editor" bulun
3. İlgili domain'i seçin
4. Kayıt eklemek için "+ Add Record" tıklayın
5. Kayıt türünü ve değerlerini girin
6. "Save" ile kaydedin

## Değişikliklerin Yayılması

DNS değişiklikleri genellikle 24-48 saat içinde tüm dünyada yayılır. Bu süre "DNS propagation" olarak adlandırılır.

### Propagation Kontrolü

- [whatsmydns.net](https://whatsmydns.net) ile kontrol edebilirsiniz
- Yerel DNS önbelleğini temizleyin: \`ipconfig /flushdns\` (Windows)
    `,
    relatedArticles: [
      { title: "Nameserver Değişikliği", href: "/bilgi-bankasi/domain/nameserver" },
      { title: "DKIM ve SPF Ayarları", href: "/bilgi-bankasi/email/dkim-spf" },
      { title: "SSL Sertifikası Kurulumu", href: "/bilgi-bankasi/ssl/kurulum" },
    ],
  },
  "ssl/kurulum": {
    title: "SSL Sertifikası Kurulumu",
    category: "ssl",
    author: "Teknik Ekip",
    date: "15 Ocak 2024",
    readTime: "4 dk",
    content: `
## SSL Sertifikası Nedir?

SSL (Secure Sockets Layer) sertifikası, web siteniz ile ziyaretçiler arasındaki iletişimi şifreler. HTTPS protokolü ile güvenli bağlantı sağlar.

## Neden SSL Gerekli?

- Veri güvenliği ve şifreleme
- Google SEO avantajı
- Ziyaretçi güveni (yeşil kilit simgesi)
- PCI DSS uyumluluğu (e-ticaret için)

## Let's Encrypt (Ücretsiz) SSL Kurulumu

### cPanel ile Otomatik Kurulum

1. cPanel'e giriş yapın
2. "SSL/TLS Status" bölümüne gidin
3. Domain'inizi seçin
4. "Run AutoSSL" butonuna tıklayın
5. Birkaç dakika içinde SSL aktif olacaktır

### Kurulum Sonrası

Sitenizin HTTPS ile açıldığını kontrol edin:
\`\`\`
https://domainadiniz.com
\`\`\`

## HTTPS Yönlendirmesi

Tüm HTTP trafiğini HTTPS'e yönlendirmek için .htaccess dosyasına ekleyin:

\`\`\`apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
\`\`\`

## Sorun Giderme

### "Güvenli değil" uyarısı

- Mixed content hatası olabilir (HTTP kaynaklar)
- SSL sertifikasının süresi dolmuş olabilir
- Domain adı sertifika ile eşleşmiyor olabilir

### Sertifika Yenilenmiyor

1. Domain'in sunucuya doğru yönlendiğini kontrol edin
2. .well-known/acme-challenge klasörünün erişilebilir olduğunu doğrulayın
    `,
    relatedArticles: [
      { title: "Let's Encrypt SSL Yenileme", href: "/bilgi-bankasi/ssl/lets-encrypt-yenileme" },
      { title: "DNS Kayıtları Nasıl Düzenlenir?", href: "/bilgi-bankasi/domain/dns-kayitlari" },
      { title: "WordPress Kurulumu", href: "/bilgi-bankasi/hosting/wordpress-kurulum" },
    ],
  },
  "email/hesap-olusturma": {
    title: "E-posta Hesabı Oluşturma",
    category: "email",
    author: "Teknik Ekip",
    date: "5 Ocak 2024",
    readTime: "4 dk",
    content: `
## cPanel ile E-posta Hesabı Oluşturma

### Adım 1: E-posta Hesapları Bölümü

1. cPanel'e giriş yapın
2. "Email" bölümünden "Email Accounts" seçin

### Adım 2: Yeni Hesap Oluştur

1. "+ Create" butonuna tıklayın
2. **Domain**: E-posta için domain seçin
3. **Username**: @ işaretinden önceki kısım (örn: info)
4. **Password**: Güçlü bir şifre belirleyin
5. **Storage Space**: Kota belirleyin (önerilen: 1GB+)

### Adım 3: Hesabı Oluştur

"+ Create" butonuna tıklayarak hesabı oluşturun.

## E-posta Erişim Yöntemleri

### Webmail

Tarayıcıdan erişim:
\`\`\`
https://domainadiniz.com/webmail
\`\`\`

### E-posta İstemcisi Ayarları

**Gelen Sunucu (IMAP):**
- Sunucu: mail.domainadiniz.com
- Port: 993 (SSL) veya 143
- Güvenlik: SSL/TLS

**Giden Sunucu (SMTP):**
- Sunucu: mail.domainadiniz.com
- Port: 465 (SSL) veya 587 (TLS)
- Kimlik doğrulama: Gerekli

## Mobil Cihazlarda Kurulum

### iPhone/iPad
1. Ayarlar > Mail > Hesaplar > Hesap Ekle
2. "Diğer" seçin
3. E-posta bilgilerini girin

### Android
1. Gmail veya E-posta uygulamasını açın
2. Hesap ekle > Diğer
3. IMAP seçin ve bilgileri girin
    `,
    relatedArticles: [
      { title: "DKIM ve SPF Ayarları", href: "/bilgi-bankasi/email/dkim-spf" },
      { title: "cPanel'e Nasıl Giriş Yapılır?", href: "/bilgi-bankasi/hosting/cpanel-giris" },
      { title: "DNS Kayıtları Nasıl Düzenlenir?", href: "/bilgi-bankasi/domain/dns-kayitlari" },
    ],
  },
};

// Category articles list
const categoryArticles: Record<string, { title: string; slug: string; description: string }[]> = {
  hosting: [
    { title: "cPanel'e Nasıl Giriş Yapılır?", slug: "cpanel-giris", description: "cPanel giriş yöntemleri ve güvenlik ipuçları" },
    { title: "WordPress Kurulumu (1-Tık)", slug: "wordpress-kurulum", description: "Softaculous ile kolay WordPress kurulumu" },
    { title: "FTP Bağlantısı Nasıl Yapılır?", slug: "ftp-baglanti", description: "FTP istemcisi ile sunucuya bağlanma" },
    { title: "Veritabanı Yedekleme", slug: "veritabani-yedekleme", description: "MySQL veritabanı yedekleme rehberi" },
    { title: "PHP Sürümü Değiştirme", slug: "php-surum", description: "cPanel'de PHP sürümü güncelleme" },
    { title: "cPanel Yedekleme Rehberi", slug: "cpanel-yedekleme", description: "Tam site yedeği alma ve geri yükleme" },
  ],
  domain: [
    { title: "DNS Kayıtları Nasıl Düzenlenir?", slug: "dns-kayitlari", description: "A, CNAME, MX ve diğer DNS kayıtları" },
    { title: "Nameserver Değişikliği", slug: "nameserver", description: "Domain nameserver güncelleme" },
  ],
  ssl: [
    { title: "SSL Sertifikası Kurulumu", slug: "kurulum", description: "Let's Encrypt SSL kurulum rehberi" },
    { title: "Let's Encrypt SSL Yenileme", slug: "lets-encrypt-yenileme", description: "Otomatik SSL yenileme ayarları" },
  ],
  email: [
    { title: "E-posta Hesabı Oluşturma", slug: "hesap-olusturma", description: "cPanel'de e-posta hesabı açma" },
    { title: "DKIM ve SPF Ayarları", slug: "dkim-spf", description: "E-posta güvenlik kayıtları" },
  ],
  sunucu: [
    { title: "VPS Sunucu Kurulumu", slug: "vps-kurulum", description: "İlk VPS kurulum adımları" },
    { title: "SSH Bağlantısı", slug: "ssh-baglanti", description: "SSH ile sunucuya bağlanma" },
  ],
  teknik: [
    { title: "Node.js Uygulaması Yayınlama", slug: "nodejs-deploy", description: "Node.js uygulaması hosting" },
  ],
};

export default function BilgiBankasiSlugPage() {
  const params = useParams();
  const slug = params.slug as string[];

  // Determine if this is a category page or article page
  const isCategory = slug.length === 1;
  const categorySlug = slug[0];
  const articleSlug = slug.length > 1 ? slug.join("/") : null;

  // Category page
  if (isCategory) {
    const category = categoryData[categorySlug];
    const articles = categoryArticles[categorySlug] || [];

    if (!category) {
      return (
        <div className="flex min-h-screen flex-col">
          <Topbar />
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Kategori Bulunamadı</h1>
              <Link href="/bilgi-bankasi">
                <Button>Bilgi Bankasına Dön</Button>
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      );
    }

    const CategoryIcon = category.icon;

    return (
      <div className="flex min-h-screen flex-col">
        <Topbar />
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
            <div className="container">
              <BlurFade delay={0.1} inView>
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <Link href="/bilgi-bankasi" className="hover:text-foreground">
                    Bilgi Bankası
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-foreground">{category.title}</span>
                </nav>

                <div className="flex items-center gap-4">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-xl ${category.bgColor}`}>
                    <CategoryIcon className={`h-8 w-8 ${category.color}`} />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                      {category.title}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      {category.description}
                    </p>
                  </div>
                </div>
              </BlurFade>
            </div>
          </section>

          {/* Articles List */}
          <section className="py-12 md:py-16">
            <div className="container">
              <BlurFade delay={0.2} inView>
                <div className="max-w-4xl">
                  <h2 className="text-xl font-semibold mb-6">
                    Makaleler ({articles.length})
                  </h2>
                  <div className="space-y-4">
                    {articles.map((article) => (
                      <Link
                        key={article.slug}
                        href={`/bilgi-bankasi/${categorySlug}/${article.slug}`}
                      >
                        <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
                          <CardContent className="p-5">
                            <div className="flex items-center gap-4">
                              <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                              <div className="flex-1">
                                <h3 className="font-medium group-hover:text-primary transition-colors">
                                  {article.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                  {article.description}
                                </p>
                              </div>
                              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              </BlurFade>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Article page
  const article = articleSlug ? articlesData[articleSlug] : null;
  const category = article ? categoryData[article.category] : null;

  if (!article || !category) {
    return (
      <div className="flex min-h-screen flex-col">
        <Topbar />
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Makale Bulunamadı</h1>
            <Link href="/bilgi-bankasi">
              <Button>Bilgi Bankasına Dön</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Topbar />
      <Header />
      <main className="flex-1">
        {/* Article Header */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <BlurFade delay={0.1} inView>
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link href="/bilgi-bankasi" className="hover:text-foreground">
                  Bilgi Bankası
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link
                  href={`/bilgi-bankasi/${article.category}`}
                  className="hover:text-foreground"
                >
                  {category.title}
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground truncate max-w-[200px]">
                  {article.title}
                </span>
              </nav>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime} okuma
                </span>
                <span>Güncelleme: {article.date}</span>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-8 md:py-12">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-4">
              {/* Main Content */}
              <BlurFade delay={0.2} inView className="lg:col-span-3">
                <Card>
                  <CardContent className="p-6 md:p-8">
                    <article className="prose prose-gray dark:prose-invert max-w-none">
                      {article.content.split('\n').map((line, idx) => {
                        if (line.startsWith('## ')) {
                          return <h2 key={idx} className="text-xl font-bold mt-8 mb-4">{line.replace('## ', '')}</h2>;
                        }
                        if (line.startsWith('### ')) {
                          return <h3 key={idx} className="text-lg font-semibold mt-6 mb-3">{line.replace('### ', '')}</h3>;
                        }
                        if (line.startsWith('```')) {
                          return null;
                        }
                        if (line.startsWith('- ')) {
                          return <li key={idx} className="ml-4">{line.replace('- ', '')}</li>;
                        }
                        if (line.match(/^\d+\. /)) {
                          return <li key={idx} className="ml-4 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
                        }
                        if (line.trim() === '') {
                          return <br key={idx} />;
                        }
                        return <p key={idx} className="mb-3 text-muted-foreground">{line}</p>;
                      })}
                    </article>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-4 mt-8 pt-8 border-t">
                      <span className="text-sm text-muted-foreground">Bu makale yardımcı oldu mu?</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Evet
                        </Button>
                        <Button variant="outline" size="sm">
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          Hayır
                        </Button>
                      </div>
                      <div className="flex gap-2 ml-auto">
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4 mr-1" />
                          Paylaş
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Printer className="h-4 w-4 mr-1" />
                          Yazdır
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>

              {/* Sidebar */}
              <BlurFade delay={0.3} inView className="space-y-6">
                {/* Related Articles */}
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      İlgili Makaleler
                    </h3>
                    <ul className="space-y-3">
                      {article.relatedArticles.map((related) => (
                        <li key={related.href}>
                          <Link
                            href={related.href}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                          >
                            <ChevronRight className="h-3 w-3" />
                            {related.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Need Help */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-5 text-center">
                    <h3 className="font-semibold mb-2">Yardıma mı ihtiyacınız var?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Teknik ekibimiz size yardımcı olmaya hazır.
                    </p>
                    <Link href="/musteri/panel/destek/yeni">
                      <Button size="sm" className="w-full">
                        Destek Talebi Oluştur
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Back Button */}
                <Link href={`/bilgi-bankasi/${article.category}`}>
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {category.title} Makaleleri
                  </Button>
                </Link>
              </BlurFade>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
