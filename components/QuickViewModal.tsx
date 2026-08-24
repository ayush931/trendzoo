'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw, Flame, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductVariant } from '../lib/types';

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    formatPrice,
    playAudio,
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    quickViewProduct?.variants?.[0]
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const isFavorited = wishlist.includes(quickViewProduct.id);
  const discountPercent = Math.round(
    ((quickViewProduct.originalPriceINR - quickViewProduct.priceINR) /
      quickViewProduct.originalPriceINR) *
      100
  );

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedVariant || quickViewProduct.variants?.[0]);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FAF7F2] border-[3px] border-[#161B2E] rounded-3xl neo-shadow-lg overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={() => {
            playAudio('click');
            setQuickViewProduct(null);
          }}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white border-2 border-[#161B2E] neo-shadow-sm hover:bg-[#FF2A85] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Images Showcase */}
        <div className="md:w-1/2 p-6 bg-white border-b-2 md:border-b-0 md:border-r-2 border-[#161B2E] flex flex-col justify-between">
          <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#161B2E] bg-neutral-100 mb-3">
            <Image
              src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
              alt={quickViewProduct.title}
              fill
              className="object-cover"
            />
            {quickViewProduct.badge && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0D1322] text-white text-xs font-black">
                {quickViewProduct.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {quickViewProduct.images.length > 1 && (
            <div className="flex gap-2">
              {quickViewProduct.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    playAudio('click');
                    setActiveImageIndex(i);
                  }}
                  className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 cursor-pointer ${
                    activeImageIndex === i ? 'border-[#FF2A85] neo-shadow-sm' : 'border-neutral-300'
                  }`}
                >
                  <Image src={img} alt="thumb" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto space-y-5 flex flex-col justify-between">
          
          <div className="space-y-4">
            {/* Category & Heat Score */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#FF2A85]">
                {quickViewProduct.category}
              </span>
              <div className="flex items-center gap-1 text-xs font-black text-[#FFA01E]">
                <Flame className="w-4 h-4 fill-current" />
                <span>{quickViewProduct.viralScore}% Viral Heat</span>
              </div>
            </div>

            {/* Title & Rating */}
            <div>
              <h2 className="text-2xl font-black text-[#0D1322] leading-tight">
                {quickViewProduct.title}
              </h2>
              <div className="flex items-center gap-2 mt-1.5 text-xs font-bold text-[#0D1322]">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                  ))}
                </div>
                <span>{quickViewProduct.rating}</span>
                <span className="text-neutral-400">({quickViewProduct.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 p-3 rounded-2xl bg-white border-2 border-[#161B2E] neo-shadow-sm">
              <span className="text-2xl font-black text-[#0D1322]">
                {formatPrice(quickViewProduct.priceINR)}
              </span>
              <span className="text-sm text-neutral-400 line-through font-bold">
                {formatPrice(quickViewProduct.originalPriceINR)}
              </span>
              <span className="ml-auto px-2.5 py-0.5 rounded-full bg-[#00D2B4] text-[#0D1322] text-xs font-black">
                Save {discountPercent}%
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed">
              {quickViewProduct.description}
            </p>

            {/* Key Features List */}
            <div className="space-y-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-[#0D1322]">
                Key Highlights:
              </span>
              <ul className="space-y-1">
                {quickViewProduct.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-semibold text-neutral-700">
                    <Check className="w-3.5 h-3.5 text-[#00D2B4] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Variants */}
            {quickViewProduct.variants && (
              <div className="space-y-2">
                <span className="text-xs font-black text-[#0D1322]">
                  Select Color: <span className="text-[#FF2A85]">{selectedVariant?.name || 'Default'}</span>
                </span>
                <div className="flex items-center gap-2">
                  {quickViewProduct.variants.map((v) => (
                    <button
                      key={v.name}
                      onClick={() => {
                        playAudio('click');
                        setSelectedVariant(v);
                      }}
                      style={{ backgroundColor: v.colorHex }}
                      className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                        selectedVariant?.name === v.name
                          ? 'border-[#0D1322] scale-125 neo-shadow-sm'
                          : 'border-white hover:scale-110'
                      }`}
                      title={v.name}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row: Quantity + Add To Cart + Wishlist */}
          <div className="space-y-3 pt-4 border-t border-neutral-200">
            <div className="flex items-center gap-3">
              {/* Quantity Controls */}
              <div className="flex items-center bg-white border-2 border-[#161B2E] rounded-2xl neo-shadow-sm p-1">
                <button
                  onClick={() => {
                    playAudio('tick');
                    setQuantity(Math.max(1, quantity - 1));
                  }}
                  className="w-8 h-8 rounded-xl bg-[#FAF7F2] hover:bg-neutral-200 font-black text-sm flex items-center justify-center cursor-pointer"
                >
                  -
                </button>
                <span className="w-10 text-center font-black text-sm">{quantity}</span>
                <button
                  onClick={() => {
                    playAudio('tick');
                    setQuantity(quantity + 1);
                  }}
                  className="w-8 h-8 rounded-xl bg-[#FAF7F2] hover:bg-neutral-200 font-black text-sm flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 rounded-2xl bg-[#0D1322] hover:bg-[#FF2A85] text-white border-2 border-[#161B2E] font-black text-xs uppercase tracking-wider neo-shadow neo-shadow-hover transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Bag • {formatPrice(quickViewProduct.priceINR * quantity)}</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className="p-3.5 rounded-2xl bg-white border-2 border-[#161B2E] neo-shadow-sm hover:bg-pink-50 transition-colors cursor-pointer"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'text-[#FF2A85] fill-[#FF2A85]' : 'text-[#0D1322]'}`} />
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="flex items-center justify-between text-[11px] font-bold text-neutral-500 pt-1">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#00D2B4]" /> Free Dispatch
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF2A85]" /> 100% Viral Guarantee
              </span>
              <span className="flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 text-[#FFA01E]" /> 7-Day Easy Return
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
