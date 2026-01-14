// ===========================================
// KLEACORE - Ürün Yönetimi Tip Tanımlamaları
// ===========================================

// -------------------
// Temel Tipler
// -------------------

export type ProductCategorySlug =
  | "hosting"
  | "vds"
  | "vps"
  | "server"
  | "domain"
  | "ssl"
  | "email";

export type BillingPeriod =
  | "monthly"
  | "quarterly"
  | "semiannual"
  | "yearly"
  | "biennial"
  | "triennial";

export type ProductStatus = "active" | "inactive" | "draft" | "archived";

export type OrderStatus =
  | "pending"
  | "approved"
  | "processing"
  | "completed"
  | "cancelled"
  | "refunded";

export type PromoCodeStatus = "active" | "inactive" | "expired";

// -------------------
// Ürün Kategorisi
// -------------------
export interface ProductCategory {
  id: string;
  slug: ProductCategorySlug;
  name: string;
  description: string;
  icon: string;
  displayOrder: number;
  productCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// -------------------
// Ürün Özelliği (Tanım)
// -------------------
export interface ProductFeature {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  unit: string;
  icon: string;
  isHighlighted: boolean;
  displayOrder: number;
  isActive: boolean;
}

// -------------------
// Ürün Özellik Değeri
// -------------------
export interface ProductFeatureValue {
  featureId: string;
  featureName: string;
  value: string | number;
  displayValue: string;
  isUnlimited: boolean;
}

// -------------------
// Kaynak Limitleri
// -------------------
export interface ProductResourceLimits {
  diskSpace?: number;
  bandwidth?: number;
  emailAccounts?: number;
  databases?: number;
  domains?: number;
  subdomains?: number;
  ftpAccounts?: number;
  cpuCores?: number;
  ram?: number;
  ipAddresses?: number;
  sslCertificates?: number;
  backupFrequency?: string;
  supportLevel?: string;
}

// -------------------
// Fiyat Dönemi
// -------------------
export interface PricingTier {
  id: string;
  productId: string;
  period: BillingPeriod;
  price: number;
  discountedPrice?: number;
  setupFee: number;
  renewalPrice: number;
  isDefault: boolean;
  isActive: boolean;
}

// -------------------
// Ürün / Paket
// -------------------
export interface Product {
  id: string;
  categoryId: string;
  categoryName: string;
  sku: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;

  // Özellikler
  features: ProductFeatureValue[];
  includedFeatures: string[];
  resourceLimits: ProductResourceLimits;

  // Fiyatlandırma
  pricingTiers: PricingTier[];
  basePrice: number;

  // Görünüm
  badge?: string;
  isPopular: boolean;
  displayOrder: number;

  // Stok
  stockQuantity: number;
  isInStock: boolean;

  // Yükseltme Kuralları
  upgradeToProducts: string[];
  downgradeToProducts: string[];

  // Durum
  status: ProductStatus;
  isVisible: boolean;

  // SEO
  metaTitle?: string;
  metaDescription?: string;

  // İstatistikler
  totalOrders: number;
  activeSubscriptions: number;
  totalRevenue: number;

  // Zaman Damgaları
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// -------------------
// Promosyon Kodu
// -------------------
export interface PromotionCode {
  id: string;
  code: string;
  name: string;
  description: string;

  // İndirim
  discountType: "percentage" | "fixed";
  discountValue: number;

  // Uygulanabilirlik
  applicableCategories: string[];
  applicableProducts: string[];
  applicablePeriods: BillingPeriod[];

  // Limitler
  maxUses: number;
  maxUsesPerCustomer: number;
  currentUses: number;

  // Geçerlilik
  validFrom: string;
  validUntil: string;

  // Koşullar
  minOrderAmount?: number;
  isFirstOrderOnly: boolean;
  isNewCustomerOnly: boolean;

  // Durum
  status: PromoCodeStatus;

  // Zaman Damgaları
  createdAt: string;
  updatedAt: string;
}

// -------------------
// Sipariş
// -------------------
export interface Order {
  id: string;
  orderNumber: string;

  // Müşteri
  customerId: string;
  customerName: string;
  customerEmail: string;

  // Ürün
  productId: string;
  productName: string;
  productSku: string;
  categoryId: string;
  categoryName: string;

  // Yapılandırma
  domain?: string;
  billingPeriod: BillingPeriod;
  quantity: number;

  // Fiyatlandırma
  basePrice: number;
  discountAmount: number;
  promoCodeId?: string;
  promoCode?: string;
  setupFee: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;

  // Durum & İş Akışı
  status: OrderStatus;
  approvedAt?: string;
  approvedBy?: string;
  processingStartedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  refundedAt?: string;
  refundAmount?: number;

  // İlişkili Kayıtlar
  serviceId?: string;
  invoiceId?: string;

  // Notlar
  customerNotes?: string;
  adminNotes?: string;

  // Zaman Damgaları
  createdAt: string;
  updatedAt: string;
}

// -------------------
// Sipariş Öğesi (Çoklu sipariş için)
// -------------------
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: number;
  discountAmount: number;
  totalPrice: number;
  configuration: Record<string, unknown>;
}

// -------------------
// Sipariş Aktivitesi
// -------------------
export interface OrderActivity {
  id: string;
  orderId: string;
  action: string;
  description: string;
  performedBy: string;
  performedAt: string;
  metadata?: Record<string, unknown>;
}

// -------------------
// Stok Uyarısı
// -------------------
export interface StockAlert {
  productId: string;
  productName: string;
  sku: string;
  currentStock: number;
  threshold: number;
  severity: "low" | "critical" | "out_of_stock";
}

// -------------------
// Dashboard İstatistikleri
// -------------------
export interface ProductDashboardStats {
  totalProducts: number;
  activeProducts: number;
  draftProducts: number;
  totalCategories: number;
  pendingOrders: number;
  processingOrders: number;
  completedOrdersToday: number;
  thisMonthRevenue: number;
  lastMonthRevenue: number;
  revenueGrowth: number;
}

// -------------------
// Form Tipleri
// -------------------
export interface ProductFormData {
  categoryId: string;
  sku: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  features: ProductFeatureValue[];
  includedFeatures: string[];
  resourceLimits: ProductResourceLimits;
  pricingTiers: Omit<PricingTier, "id" | "productId">[];
  badge?: string;
  isPopular: boolean;
  displayOrder: number;
  stockQuantity: number;
  upgradeToProducts: string[];
  downgradeToProducts: string[];
  status: ProductStatus;
  isVisible: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export interface CategoryFormData {
  slug: ProductCategorySlug;
  name: string;
  description: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
}

export interface PromotionCodeFormData {
  code: string;
  name: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  applicableCategories: string[];
  applicableProducts: string[];
  applicablePeriods: BillingPeriod[];
  maxUses: number;
  maxUsesPerCustomer: number;
  validFrom: string;
  validUntil: string;
  minOrderAmount?: number;
  isFirstOrderOnly: boolean;
  isNewCustomerOnly: boolean;
}
