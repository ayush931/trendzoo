'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ProductVariant, CategoryId, CurrencyCode, DiscountCoupon } from '../lib/types';
import { CURRENCY_RATES } from '../lib/data';
import { playSound } from '../lib/sound';

interface ShopContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (priceINR: number) => string;
  
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  playAudio: (type: 'pop' | 'click' | 'chime' | 'tick' | 'swoosh' | 'win') => void;
  
  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;
  
  isRouletteOpen: boolean;
  setIsRouletteOpen: (open: boolean) => void;
  
  appliedCoupon: DiscountCoupon | null;
  applyCoupon: (coupon: DiscountCoupon | null) => void;
  
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  
  selectedCategory: CategoryId;
  setSelectedCategory: (cat: CategoryId) => void;
  
  cartSubtotalINR: number;
  discountAmountINR: number;
  cartTotalINR: number;
  freeShippingProgress: number; // 0 to 100%
  amountNeededForFreeShipping: number;
  
  // Bundle Builder
  bundleItems: Product[];
  toggleBundleItem: (product: Product) => void;
  clearBundle: () => void;
  addBundleToCart: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isRouletteOpen, setIsRouletteOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<DiscountCoupon | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [bundleItems, setBundleItems] = useState<Product[]>([]);

  // Load cart and wishlist from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('trenzoo_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('trenzoo_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedSound = localStorage.getItem('trenzoo_sound');
      if (savedSound !== null) setSoundEnabled(savedSound === 'true');
    } catch {
      // LocalStorage fallback
    }
  }, []);

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem('trenzoo_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('trenzoo_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('trenzoo_sound', String(soundEnabled));
    } catch {}
  }, [soundEnabled]);

  const playAudio = (type: 'pop' | 'click' | 'chime' | 'tick' | 'swoosh' | 'win') => {
    playSound(type, soundEnabled);
  };

  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
    playAudio('pop');
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant?.name === (variant?.name || product.variants?.[0]?.name)
      );

      const chosenVariant = variant || (product.variants && product.variants.length > 0 ? product.variants[0] : undefined);

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedVariant: chosenVariant }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    playAudio('click');
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    playAudio('tick');
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    playAudio('pop');
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const formatPrice = (priceINR: number) => {
    const rateObj = CURRENCY_RATES[currency] || CURRENCY_RATES.INR;
    const converted = priceINR * rateObj.rate;
    if (currency === 'INR') {
      return `₹${converted.toLocaleString('en-IN')}`;
    }
    return `${rateObj.symbol}${converted.toFixed(2)}`;
  };

  const cartSubtotalINR = cart.reduce(
    (total, item) => total + item.product.priceINR * item.quantity,
    0
  );

  const discountAmountINR = appliedCoupon
    ? Math.round((cartSubtotalINR * appliedCoupon.discountPercentage) / 100)
    : 0;

  const cartTotalINR = Math.max(0, cartSubtotalINR - discountAmountINR);

  const freeShippingThreshold = 999;
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotalINR / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotalINR);

  // Bundle builder logic
  const toggleBundleItem = (product: Product) => {
    playAudio('click');
    setBundleItems((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), product];
      }
      return [...prev, product];
    });
  };

  const clearBundle = () => {
    setBundleItems([]);
  };

  const addBundleToCart = () => {
    if (bundleItems.length < 3) return;
    playAudio('win');
    bundleItems.forEach((p) => {
      addToCart(p, 1);
    });
    // apply bundle coupon
    setAppliedCoupon({
      code: 'BUNDLE30',
      discountPercentage: 30,
      minOrderINR: 0,
      description: '30% Bundle Builder Discount'
    });
    setBundleItems([]);
    setIsCartOpen(true);
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        currency,
        setCurrency,
        formatPrice,
        soundEnabled,
        setSoundEnabled,
        playAudio,
        quickViewProduct,
        setQuickViewProduct,
        isRouletteOpen,
        setIsRouletteOpen,
        appliedCoupon,
        applyCoupon: setAppliedCoupon,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        cartSubtotalINR,
        discountAmountINR,
        cartTotalINR,
        freeShippingProgress,
        amountNeededForFreeShipping,
        bundleItems,
        toggleBundleItem,
        clearBundle,
        addBundleToCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
