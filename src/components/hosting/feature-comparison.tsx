"use client";

import { Check, X } from "lucide-react";
import {
  Globe,
  Link2,
  HardDrive,
  Zap,
  Mail,
  Database,
  Lock,
  Cpu,
  MemoryStick,
  Monitor,
  Settings,
  Code,
  RefreshCw,
  Server,
  Download,
  LucideIcon,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ComparisonFeature {
  icon: LucideIcon;
  name: string;
  starter: string | boolean;
  professional: string | boolean;
  business: string | boolean;
  enterprise: string | boolean;
}

const features: ComparisonFeature[] = [
  { icon: Globe, name: "Web Sitesi", starter: "1 Adet", professional: "1 Adet", business: "1 Adet", enterprise: "1 Adet" },
  { icon: Link2, name: "Subdomain", starter: "5 Adet", professional: "5 Adet", business: "5 Adet", enterprise: "10 Adet" },
  { icon: HardDrive, name: "Disk Alanı", starter: "1 GB", professional: "2 GB", business: "3 GB", enterprise: "5 GB" },
  { icon: Zap, name: "Trafik", starter: "5 GB", professional: "10 GB", business: "15 GB", enterprise: "25 GB" },
  { icon: Mail, name: "E-Posta Adresi", starter: "2 Adet", professional: "5 Adet", business: "10 Adet", enterprise: "20 Adet" },
  { icon: Database, name: "MySQL", starter: "1 Adet", professional: "1 Adet", business: "1 Adet", enterprise: "3 Adet" },
  { icon: Lock, name: "Ücretsiz SSL", starter: "Let's Encrypt", professional: "Let's Encrypt", business: "Let's Encrypt", enterprise: "Let's Encrypt" },
  { icon: Cpu, name: "CPU", starter: "1 Core", professional: "1 Core", business: "1 Core", enterprise: "2 Core" },
  { icon: MemoryStick, name: "RAM", starter: "1 GB", professional: "1 GB", business: "2 GB", enterprise: "4 GB" },
  { icon: Monitor, name: "İşletim Sistemi", starter: "CloudLinux", professional: "CloudLinux", business: "CloudLinux", enterprise: "CloudLinux" },
  { icon: Settings, name: "Kontrol Panel", starter: "cPanel", professional: "cPanel", business: "cPanel", enterprise: "cPanel" },
  { icon: Code, name: "PHP Sürümleri", starter: "5.3 - 8.4", professional: "5.3 - 8.4", business: "5.3 - 8.4", enterprise: "5.3 - 8.4" },
  { icon: RefreshCw, name: "PHP Versiyon Değiştirici", starter: true, professional: true, business: true, enterprise: true },
  { icon: Server, name: "Web Server Yazılımı", starter: "LiteSpeed", professional: "LiteSpeed", business: "LiteSpeed", enterprise: "LiteSpeed" },
  { icon: Download, name: "Ücretsiz Yedekleme", starter: "Haftalık", professional: "Haftalık", business: "Haftalık", enterprise: "Günlük" },
];

function renderValue(value: string | boolean) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="h-5 w-5 text-green-500 mx-auto" />
    ) : (
      <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
    );
  }
  return <span className="font-medium">{value}</span>;
}

export function FeatureComparison() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[220px]">Özellik</TableHead>
            <TableHead className="text-center">Starter</TableHead>
            <TableHead className="text-center bg-primary/5">
              <div className="flex flex-col items-center">
                <span>Professional</span>
                <span className="text-xs text-primary font-normal">Popüler</span>
              </div>
            </TableHead>
            <TableHead className="text-center">Business</TableHead>
            <TableHead className="text-center">Enterprise</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.name}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <feature.icon className="h-4 w-4 text-primary" />
                  <span className="font-medium">{feature.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                {renderValue(feature.starter)}
              </TableCell>
              <TableCell className="text-center bg-primary/5">
                {renderValue(feature.professional)}
              </TableCell>
              <TableCell className="text-center">
                {renderValue(feature.business)}
              </TableCell>
              <TableCell className="text-center">
                {renderValue(feature.enterprise)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="border-t-2">
            <TableCell className="font-bold text-lg">Fiyat</TableCell>
            <TableCell className="text-center">
              <div className="font-bold text-xl">₺49</div>
              <div className="text-xs text-muted-foreground">/ay</div>
            </TableCell>
            <TableCell className="text-center bg-primary/5">
              <div className="font-bold text-xl text-primary">₺79</div>
              <div className="text-xs text-muted-foreground">/ay</div>
            </TableCell>
            <TableCell className="text-center">
              <div className="font-bold text-xl">₺119</div>
              <div className="text-xs text-muted-foreground">/ay</div>
            </TableCell>
            <TableCell className="text-center">
              <div className="font-bold text-xl">₺179</div>
              <div className="text-xs text-muted-foreground">/ay</div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
