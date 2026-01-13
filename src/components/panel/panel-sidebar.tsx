"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  User,
  Package,
  Globe,
  Headphones,
  FileText,
  Shield,
  Server,
  HardDrive,
  BarChart3,
  Settings,
  Plus,
  List,
  CreditCard,
} from "lucide-react";

const menuGroups = [
  {
    id: "hesap",
    title: "Hesap Yönetimi",
    icon: User,
    items: [
      { title: "Profil Bilgileri", href: "/musteri/panel/ayarlar", icon: User },
      { title: "İletişim Bilgileri", href: "/musteri/panel/ayarlar", icon: Settings },
      { title: "Şifre Değiştir", href: "/musteri/panel/ayarlar", icon: Shield },
    ],
  },
  {
    id: "hizmetler",
    title: "Hizmetlerim",
    icon: Package,
    items: [
      { title: "Aktif Hizmetler", href: "/musteri/panel/hizmetlerim", icon: Package, badge: "12" },
      { title: "Alan Adları", href: "/musteri/panel/domainler", icon: Globe, badge: "8" },
      { title: "SSL Sertifikaları", href: "/musteri/panel/ssl", icon: Shield },
      { title: "Sunucular", href: "/musteri/panel/sunucular", icon: Server },
    ],
  },
  {
    id: "destek",
    title: "Destek",
    icon: Headphones,
    items: [
      { title: "Destek Talepleri", href: "/musteri/panel/destek", icon: List, badge: "1" },
      { title: "Yeni Destek Talebi", href: "/musteri/panel/destek", icon: Plus },
    ],
  },
  {
    id: "faturalar",
    title: "Faturalar",
    icon: FileText,
    items: [
      { title: "Tüm Faturalar", href: "/musteri/panel/faturalar", icon: FileText },
      { title: "Ödeme Yap", href: "/musteri/panel/faturalar", icon: CreditCard },
    ],
  },
  {
    id: "diger",
    title: "Diğer",
    icon: Settings,
    items: [
      { title: "Yedekleme", href: "/musteri/panel/yedekleme", icon: HardDrive },
      { title: "İstatistikler", href: "/musteri/panel/istatistikler", icon: BarChart3 },
    ],
  },
];

export function PanelSidebar() {
  const pathname = usePathname();

  // Find which group should be open by default
  const defaultOpen = menuGroups
    .filter((group) => group.items.some((item) => pathname.startsWith(item.href)))
    .map((group) => group.id);

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="lg:sticky lg:top-24">
        <Accordion
          type="multiple"
          defaultValue={defaultOpen.length > 0 ? defaultOpen : ["hizmetler"]}
          className="space-y-2"
        >
          {menuGroups.map((group) => (
            <AccordionItem
              key={group.id}
              value={group.id}
              className="border rounded-lg bg-background px-2"
            >
              <AccordionTrigger className="hover:no-underline py-3">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <group.icon className="h-4 w-4" />
                  {group.title}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1 pb-2">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center justify-between gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <span className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </aside>
  );
}
