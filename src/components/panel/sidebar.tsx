"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Globe,
  Shield,
  Server,
  FileText,
  Headphones,
  HardDrive,
  BarChart3,
  Settings,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard",
    href: "/musteri/panel",
    icon: LayoutDashboard,
  },
  {
    title: "Hizmetlerim",
    href: "/musteri/panel/hizmetlerim",
    icon: Package,
  },
  {
    title: "Domainler",
    href: "/musteri/panel/domainler",
    icon: Globe,
  },
  {
    title: "SSL Sertifikaları",
    href: "/musteri/panel/ssl",
    icon: Shield,
  },
  {
    title: "Sunucular",
    href: "/musteri/panel/sunucular",
    icon: Server,
  },
  {
    title: "Faturalar",
    href: "/musteri/panel/faturalar",
    icon: FileText,
  },
  {
    title: "Destek Talepleri",
    href: "/musteri/panel/destek",
    icon: Headphones,
  },
  {
    title: "Yedekleme",
    href: "/musteri/panel/yedekleme",
    icon: HardDrive,
  },
  {
    title: "İstatistikler",
    href: "/musteri/panel/istatistikler",
    icon: BarChart3,
  },
  {
    title: "Ayarlar",
    href: "/musteri/panel/ayarlar",
    icon: Settings,
  },
];

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ isCollapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col sticky top-20 h-[calc(100vh-10rem)] border-r bg-background transition-all duration-300 flex-shrink-0",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Toggle Button */}
        {onToggle && (
          <div className="flex justify-end p-2 border-b">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8"
            >
              <ChevronLeft
                className={cn(
                  "h-4 w-4 transition-transform",
                  isCollapsed && "rotate-180"
                )}
              />
            </Button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/musteri/panel" &&
                  pathname.startsWith(item.href));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      isCollapsed && "justify-center px-2"
                    )}
                    title={isCollapsed ? item.title : undefined}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="border-t p-2">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive",
              isCollapsed && "justify-center px-2"
            )}
            title={isCollapsed ? "Çıkış Yap" : undefined}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Çıkış Yap</span>}
          </Link>
        </div>
      </div>
    </aside>
  );
}
