import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail } from "lucide-react";

const footerLinks = {
  alanAdi: {
    title: "Alan Adı",
    links: [
      { name: "Domain Kaydı", href: "/domain/kayit" },
      { name: "Domain Transferi", href: "/domain/transfer" },
      { name: "Belgesiz .TR Domain", href: "/domain/belgesiz-tr" },
      { name: "Whois Sorgulama", href: "/domain/whois" },
    ],
  },
  hosting: {
    title: "Hosting",
    links: [
      { name: "Linux Hosting", href: "/hosting/linux" },
      { name: "WordPress Hosting", href: "/hosting/wordpress" },
      { name: "Kurumsal Hosting", href: "/hosting/kurumsal" },
      { name: "Reseller Hosting", href: "/hosting/reseller" },
    ],
  },
  sunucu: {
    title: "Sunucu",
    links: [
      { name: "VDS Sunucu", href: "/sunucu/vds" },
      { name: "VPS Sunucu", href: "/sunucu/vps" },
      { name: "Bulut Sunucu", href: "/sunucu/bulut" },
      { name: "Fiziksel Sunucu", href: "/sunucu/fiziksel" },
    ],
  },
  ssl: {
    title: "SSL Sertifikası",
    links: [
      { name: "Standart SSL", href: "/ssl/standart" },
      { name: "Wildcard SSL", href: "/ssl/wildcard" },
      { name: "EV (Greenbar) SSL", href: "/ssl/ev" },
      { name: "Kurumsal SSL", href: "/ssl/kurumsal" },
    ],
  },
  kurumsal: {
    title: "Kurumsal",
    links: [
      { name: "Hakkımızda", href: "/hakkimizda" },
      { name: "İletişim", href: "/iletisim" },
      { name: "Blog", href: "/blog" },
      { name: "Bilgi Bankası", href: "/bilgi-bankasi" },
      { name: "Destek Merkezi", href: "/musteri/destek" },
    ],
  },
};

const legalLinks = [
  { name: "Kullanıcı Sözleşmesi", href: "/yasal/kullanim-kosullari" },
  { name: "Gizlilik Sözleşmesi", href: "/yasal/gizlilik" },
  { name: "İade Koşulları", href: "/yasal/iade-kosullari" },
  { name: "Çerez Politikası", href: "/yasal/cerez" },
  { name: "KVKK Aydınlatma Metni", href: "/yasal/kvkk" },
];

export function Footer() {
  return (
    <footer className="relative bg-zinc-900 text-zinc-300 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Glow */}
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-zinc-600/30 rounded-full blur-[120px]" />
        <div className="absolute -top-20 right-1/4 w-72 h-72 bg-zinc-500/20 rounded-full blur-[100px]" />

        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Top Gradient Fade */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-500/40 to-transparent" />
      </div>

      <div className="container relative py-12 md:py-16">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-7">
          {/* Brand Card */}
          <div className="lg:col-span-2">
            <div className="rounded-xl bg-zinc-800/50 p-6">
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/logo.svg"
                  alt="KLEACORE"
                  width={140}
                  height={30}
                  className="h-7 w-auto"
                />
              </Link>

              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                <p className="text-zinc-400 leading-relaxed">
                  30 N Gould St Ste R, Sheridan, WY 82801, USA
                </p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-zinc-500" />
                  <span>+1 (307) 223-4050</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-zinc-500" />
                  <span>support@kleacore.com</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-700/50 text-zinc-400 hover:bg-primary hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-700/50 text-zinc-400 hover:bg-primary hover:text-white transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-700/50 text-zinc-400 hover:bg-primary hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-700/50 text-zinc-400 hover:bg-primary hover:text-white transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-700/50 text-zinc-400 hover:bg-primary hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-700/50 text-zinc-400 hover:bg-primary hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800">
        <div className="container py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-zinc-500">
              Copyright © {new Date().getFullYear()} KLEACORE. Tüm Hakları Saklıdır.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-500">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
