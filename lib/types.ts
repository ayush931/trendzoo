export type CategoryId = 'all' | 'electronics' | 'decor' | 'clothing' | 'gifting' | 'steals';

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP';

export interface ProductVariant {
  name: string;
  colorHex: string;
  image?: string;
}

export interface ProductReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  likes: number;
}

export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  category: CategoryId;
  priceINR: number;
  originalPriceINR: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  badgeColor?: 'pink' | 'cyan' | 'orange' | 'purple' | 'yellow';
  viralScore: number; // 0 - 100%
  soldCount: number;
  stockLeft?: number;
  images: string[];
  description: string;
  features: string[];
  tags: string[];
  variants?: ProductVariant[];
  isFlashDrop?: boolean;
  flashEndsInSec?: number;
  reviews?: ProductReview[];
  videoThumbnail?: string;
  videoViews?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface DiscountCoupon {
  code: string;
  discountPercentage: number;
  minOrderINR: number;
  description: string;
}
