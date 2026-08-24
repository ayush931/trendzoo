'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, Star, ShoppingBag, Eye, Flame, Check } from 'lucide-react';
import { Product, ProductVariant } from '../lib/types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const {
    formatPrice,
    addToCart,
    wishlist,
    toggleWishlist,
    setQuickViewProduct,
    playAudio,
  } = useShop();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.[0]
  );
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const isFavorited = wishlist.includes(product.id);
  const discountPercent = Math.round(
    ((product.originalPriceINR - product.priceINR) / product.originalPriceINR) * 100
  );

  const handleAddToCart = () => {
    addToCart(product, 1, selectedVariant);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1800);
  };

  return (
    <div className="group relative bg-white border-2 border-[#161B2E] rounded-3xl p-4 neo-shadow neo-shadow-hover transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Image Container */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#161B2E]/10 mb-4 cursor-pointer"
        onClick={() => {
          playAudio('pop');
          setQuickViewProduct(product);
        }}
      >
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full bg-[#0D1322] text-white text-[10px] font-black tracking-wide border border-white/20 shadow-sm">
              {product.badge}
            </span>
          )}
          <span className="px-2 py-0.5 rounded-full bg-[#FF2A85] text-white text-[10px] font-black self-start shadow-sm">
            -{discountPercent}% OFF
          </span>
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-md border-2 border-[#161B2E] neo-shadow-sm hover:scale-110 active:scale-90 transition-transform z-10 cursor-pointer"
          title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'text-[#FF2A85] fill-[#FF2A85]' : 'text-[#161B2E]'
            }`}
          />
        </button>

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              playAudio('pop');
              setQuickViewProduct(product);
            }}
            className="w-full py-2 rounded-xl bg-white/95 backdrop-blur-md border-2 border-[#161B2E] text-[#0D1322] text-xs font-black neo-shadow-sm flex items-center justify-center gap-1.5 hover:bg-[#FAF7F2] transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-2 flex-1 flex flex-col justify-between">
        
        {/* Rating & Viral Gauge */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 font-bold text-[#0D1322]">
            <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
            <span>{product.rating}</span>
            <span className="text-neutral-400 font-medium">({product.reviewCount})</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-black text-[#FF2A85] bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">
            <Flame className="w-3 h-3 fill-current" />
            <span>{product.viralScore}% Heat</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div>
          <h3
            onClick={() => {
              playAudio('pop');
              setQuickViewProduct(product);
            }}
            className="text-sm font-black text-[#0D1322] group-hover:text-[#FF2A85] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.title}
          </h3>
          {product.subtitle && (
            <p className="text-[11px] text-neutral-500 font-medium line-clamp-1 mt-0.5">
              {product.subtitle}
            </p>
          )}
        </div>

        {/* Color / Variant Swatches */}
        {product.variants && product.variants.length > 0 && (
          <div className="flex items-center gap-1.5 py-1">
            <span className="text-[10px] font-bold text-neutral-400">Variant:</span>
            <div className="flex items-center gap-1">
              {product.variants.map((v) => (
                <button
                  key={v.name}
                  onClick={() => {
                    playAudio('click');
                    setSelectedVariant(v);
                  }}
                  style={{ backgroundColor: v.colorHex }}
                  className={`w-4 h-4 rounded-full border-2 transition-transform cursor-pointer ${
                    selectedVariant?.name === v.name
                      ? 'border-[#0D1322] scale-125'
                      : 'border-transparent hover:scale-110'
                  }`}
                  title={v.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* Price & Add to Cart Button */}
        <div className="pt-2 flex items-center justify-between gap-2 border-t border-neutral-100">
          <div className="flex flex-col">
            <span className="text-base font-black text-[#0D1322]">
              {formatPrice(product.priceINR)}
            </span>
            <span className="text-[11px] text-neutral-400 line-through font-semibold -mt-1">
              {formatPrice(product.originalPriceINR)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded-2xl border-2 border-[#161B2E] text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              isAddedRecently
                ? 'bg-emerald-500 text-white'
                : 'bg-[#0D1322] text-white hover:bg-[#FF2A85] neo-shadow-sm active:scale-95'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
